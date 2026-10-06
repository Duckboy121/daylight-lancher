const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const { supportedVersion, jvmArguments, memory, instanceOptions, defaultMemory } = require('../src/instance-options');
const { localIndex, remoteSearch } = require('../src/catalog-search');
const { libraryAllowed } = require('../src/platform-libraries');
const { dependencyPlan } = require('../src/dependency-plan');
const { sessionLog } = require('../src/session-log');

function versionFixture(id,dependencies=[]) {
  return {id:id+'-v1',project_id:id,game_versions:['1.21.11'],loaders:['fabric'],dependencies,
    files:[{filename:id+'.jar',primary:true,hashes:{sha1:'a'.repeat(40)},url:'https://example.test/'+id}]};
}
test('default heap stays inside the validator limits on small and large PCs', () => {
  for (const total of [2, 3.8, 4, 7.8, 8, 12, 16, 24, 32, 64]) {
    const defaults=defaultMemory(total);
    assert.deepEqual(memory(defaults.min,defaults.max,total),defaults);
  }
  assert.deepEqual(defaultMemory(4),{min:2,max:3});
  assert.deepEqual(defaultMemory(32),{min:4,max:8});
});
function graphOptions(graph,extra={}) {
  return {version:'1.21.11',loader:'fabric',api:'https://example.test',fetchJson:async url=>{
    const path=new URL(url).pathname.split('/');return path[1]==='version'?Object.values(graph).find(v=>v.id===path[2]):[graph[path[2]]].filter(Boolean);
  },...extra};
}
test('dependency graph resolves required libraries before parent, skips optional, handles cycles',async()=>{
  const required=id=>({project_id:id,dependency_type:'required'});
  const graph={root:versionFixture('root',[required('api'),{project_id:'optional',dependency_type:'optional'}]),api:versionFixture('api',[required('root')])};
  assert.deepEqual((await dependencyPlan('root',graphOptions(graph))).map(i=>i.projectId),['api','root']);
  assert.deepEqual((await dependencyPlan('root',graphOptions(graph,{installed:{api:'api.jar'}}))).map(i=>i.projectId),['root']);
});
test('dependency graph rejects missing/incompatible and duplicate filenames before downloads',async()=>{
  const graph={root:versionFixture('root',[{project_id:'missing',dependency_type:'required'}])};
  await assert.rejects(dependencyPlan('root',graphOptions(graph)),/compatible/);
  graph.root.dependencies=[{project_id:'bad',dependency_type:'incompatible'}];
  await assert.rejects(dependencyPlan('root',graphOptions(graph,{installed:{bad:'bad.jar'}})),/Incompatible/);
  graph.root.dependencies=[{project_id:'api',version_id:'api-v1',dependency_type:'required'}];graph.api=versionFixture('api');
  await assert.rejects(dependencyPlan('root',graphOptions(graph,{installed:{api:'old.jar'},matchesInstalled:async()=>false})),/different version/);
  graph.api.files[0].filename=graph.root.files[0].filename;
  await assert.rejects(dependencyPlan('root',graphOptions(graph)),/share the filename/);
});
test('session logs batch output, redact secrets, flush on exit and retain previous session',async()=>{
  const directory=await fs.mkdtemp(path.join(os.tmpdir(),'daylight-log-test-'));
  try {
    await fs.writeFile(path.join(directory,'daylight-launcher.log'),'previous');
    const chunks=[];const log=await sessionLog(directory,s=>chunks.push(s),['secret-token']);
    log.write('hello secret-token');log.write('exited 0');log.end();
    assert.equal(chunks.length,1);assert(!chunks[0].includes('secret-token'));
    assert.equal(await fs.readFile(path.join(directory,'daylight-launcher.log.previous'),'utf8'),'previous');
     
    for(let i=0;i<40;i++){try{if((await fs.readFile(path.join(directory,'daylight-launcher.log'),'utf8')).includes('exited 0'))break;}catch{}await new Promise(r=>setTimeout(r,10));}
    assert((await fs.readFile(path.join(directory,'daylight-launcher.log'),'utf8')).includes('[redacted]'));
  } finally { await fs.rm(directory,{recursive:true,force:true}); }
});

test('native libraries honor OS, CPU and ordered rules on Intel and Apple Silicon', () => {
  const base={rules:[{action:'allow',os:{name:'osx'}}],name:'org.lwjgl:lwjgl:3.3.3:natives-macos'};
  assert.equal(libraryAllowed(base,'darwin','x64'),true);
  assert.equal(libraryAllowed(base,'darwin','arm64'),false);
  assert.equal(libraryAllowed({...base,name:base.name+'-arm64'},'darwin','arm64'),true);
  assert.equal(libraryAllowed(base,'win32','x64'),false);
  assert.equal(libraryAllowed({rules:[{action:'allow'},{action:'disallow',os:{name:'osx'}}]},'darwin','x64'),false);
  assert.equal(libraryAllowed({rules:[{action:'allow',os:{arch:'x86_64'}}]},'darwin','x64'),true);
});

test('version floor accepts all numeric releases from 1.19, including year-based releases', () => {
  for (const v of ['1.19','1.19.4','1.20','1.21.11','26.1','26.2']) assert.equal(supportedVersion(v),true,v);
  for (const v of ['1.8.9','1.18.2','24w10a','1.21-pre1','../1.21','',null]) assert.equal(supportedVersion(v),false,String(v));
});
test('heap limits and JVM quoting', () => {
  assert.deepEqual(memory(1,4,8),{ min:1,max:4 });
  for (const [min,max] of [[8,4],[0,4],[2,8],[NaN,4]]) assert.throws(() => memory(min,max,8));
  assert.deepEqual(jvmArguments('-XX:+UseG1GC -Dname="test instance"'),['-XX:+UseG1GC','-Dname=test instance']);
  for (const flag of ['-Xmx8G','-Xms2G','-XX:MaxRAMPercentage=90','-Ddaylight.session.secret=bad','-Dname="bad','-jar bad.jar']) assert.throws(() => jvmArguments(flag));
});
test('instance tags are normalized; blank memory inherits global settings', () => {
  assert.deepEqual(instanceOptions({ tags:'PvP, PvP, Friends', minRam:null }),{ tags:['PvP','Friends'], minRam:null,maxRam:null,jvmArgs:'' });
  assert.throws(() => instanceOptions({tags:'x'.repeat(25)}));
});
test('local search indexes separate instances, resource directories, and renamed jars without networking', async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(),'daylight-index-test-'));
  try {
    await fs.mkdir(path.join(dir,'a','mods'),{recursive:true});
    await fs.mkdir(path.join(dir,'a','resourcepacks','loose'),{recursive:true});
    await fs.writeFile(path.join(dir,'a','mods','renamed.JAR'),'fixture');
    await fs.writeFile(path.join(dir,'a','mods','partial.jar.partial'),'fixture');
    const rows = await localIndex([{id:'a',name:'Main'},{id:'b',name:'Empty'}],dir);
    assert.equal(rows.length,2); assert(rows.some(f=>f.title==='renamed.JAR' && f.kind==='mods'));
    assert(rows.every(f=>f.installed && f.packId==='a'));
  } finally { await fs.rm(dir,{recursive:true,force:true}); }
});
test('remote search coalesces requests without leaking target instance; filters loader and version', async () => {
  const urls=[];
  const search=remoteSearch(async url=>{urls.push(url); return {hits:[{project_id:'x',title:'Test'}]};},'https://example.test');
  const pack={id:'a',version:'1.21.11',loader:'fabric'};
  const [a,b]=await Promise.all([search('Sodium',pack), search('sodium',{...pack,id:'b'})]);
  assert.equal(urls.length,2); assert(a.every(h=>h.packId==='a')); assert(b.every(h=>h.packId==='b'));
  assert(decodeURIComponent(urls[0]).includes('categories:fabric')); assert(!decodeURIComponent(urls[1]).includes('categories:fabric'));
  assert(urls.every(url=>decodeURIComponent(url).includes('versions:1.21.11')));
});
test('failed remote queries can be retried', async () => {
  let failed=true;
  const search=remoteSearch(async()=>{if(failed) throw Error('offline');return {hits:[]};},'https://example.test');
  const pack={id:'a',version:'1.19',loader:'fabric'};
  await assert.rejects(search('q',pack));failed=false;assert.deepEqual(await search('q',pack),[]);
});

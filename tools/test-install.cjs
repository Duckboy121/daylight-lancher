const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const os=require('node:os');
const vm=require('node:vm');
const crypto=require('node:crypto');
const {createRequire}=require('node:module');

test('real install IPC stages dependencies, prevents repeat installs, and rejects corrupt downloads',async()=>{
 const temporary=fs.mkdtempSync(path.join(os.tmpdir(),'daylight-install-test-'));
 const handlers=new Map(),main=path.join(__dirname,'../src/main.js'),realRequire=createRequire(main);
 const source=fs.readFileSync(main,'utf8');
 const files={root:Buffer.from('root jar'),api:Buffer.from('api jar'),corrupt:Buffer.from('expected jar'),network:Buffer.from('network jar')};
 let downloads=0;
 const fetchMock=async url=>{
   const u=new URL(url), parts=u.pathname.split('/');
   if(u.hostname==='fixture.invalid'){
     downloads++;
     if(parts[1]==='network')throw Error('Fixture network failure');
     return new Response(parts[1]==='corrupt'?'wrong hash':files[parts[1]]);
   }
   if(parts[2]==='project'&&parts[4]==='version') {
     const id=parts[3];const bytes=files[id];
     return Response.json([{id:id+'-v1',project_id:id,game_versions:['1.21.11'],loaders:['fabric'],
       dependencies:id==='root'?[{project_id:'api',dependency_type:'required'}]:[],
       files:[{filename:id+'.jar',url:'https://fixture.invalid/'+id,hashes:{sha1:crypto.createHash('sha1').update(bytes).digest('hex')}}]}]);
   }
   throw Error('Unexpected network access: '+url);
 };
 const app={isPackaged:false,getPath:name=>path.join(temporary,name),requestSingleInstanceLock:()=>false,quit(){},on(){},getVersion:()=> 'test'};
 const context={console,process,Buffer,URL,AbortSignal,fetch:fetchMock,setTimeout,clearTimeout,__dirname:path.dirname(main),module:{exports:{}},require:name=>{
   if(name==='electron')return {app,ipcMain:{handle:(channel,fn)=>handlers.set(channel,fn),on(){}},nativeImage:{}};
   if(name==='electron-updater')return {autoUpdater:{}};
   if(name==='minecraft-launcher-core')return {Client:class {}};
   if(name==='msmc')return {Auth:class{},lexicon:{getCode:s=>s}};
   if(name==='./mod-catalog')return {...realRequire(name),installedProjects:async()=>({})};
   return realRequire(name);
 }};
 try {
   vm.runInNewContext(source+'\nconfig=loadConfig();',context,{filename:main});
   const invoke=(channel,...args)=>handlers.get(channel)(null,...args);
   assert.equal((await invoke('create-pack',{name:'Test',version:'1.18',loader:'fabric'})).ok,false);
   const installed=await invoke('install-mod',{projectId:'root',packId:'daylight'});
   assert.equal(installed.ok,true,installed.error);assert.equal(downloads,2);
   const mods=path.join(temporary,'appData','.daylight','packs','daylight','mods');
   assert.deepEqual(fs.readdirSync(mods).sort(),['api.jar','root.jar']);
   const again=await invoke('install-mod',{projectId:'root',packId:'daylight'});
   assert.equal(again.data.alreadyInstalled,true);assert.equal(downloads,2);
   const bad=await invoke('install-mod',{projectId:'corrupt',packId:'daylight'});
   assert.equal(bad.ok,false);assert.match(bad.error,/integrity/);
   assert.deepEqual(fs.readdirSync(mods).sort(),['api.jar','root.jar']);
   const manifest=JSON.parse(fs.readFileSync(path.join(mods,'../installed.json'),'utf8'));
   assert.equal(manifest.manual.root,'root.jar');assert.equal(manifest.manual.api,'api.jar');
   const failed=await invoke('install-mod',{projectId:'network',packId:'daylight'});
   assert.equal(failed.ok,false);assert.match(failed.error,/Fixture network failure/);
   assert.deepEqual(fs.readdirSync(mods).sort(),['api.jar','root.jar']);
 } finally {fs.rmSync(temporary,{recursive:true,force:true});}
});

test('packaged preview isolates config and worlds and cannot invoke the stable updater',async()=>{
 const temporary=fs.mkdtempSync(path.join(os.tmpdir(),'daylight-channel-test-'));
 const handlers=new Map(),main=path.join(__dirname,'../src/main.js'),realRequire=createRequire(main);
 const paths={appData:path.join(temporary,'appData'),userData:path.join(temporary,'stable-config')};
 const app={isPackaged:true,getPath:name=>paths[name],setPath:(name,value)=>{paths[name]=value;},
   requestSingleInstanceLock:()=>false,quit(){},on(){},getVersion:()=> '2.20.0-preview.1'};
 let updaterCalls=0;
 const context={console,process,Buffer,URL,AbortSignal,setTimeout,clearTimeout,__dirname:path.dirname(main),module:{exports:{}},require:name=>{
   if(name==='electron')return {app,ipcMain:{handle:(channel,fn)=>handlers.set(channel,fn),on(){}},nativeImage:{}};
   if(name==='electron-updater')return {autoUpdater:{checkForUpdates:()=>updaterCalls++,quitAndInstall:()=>updaterCalls++}};
   if(name==='minecraft-launcher-core')return {Client:class {}};
   if(name==='msmc')return {Auth:class{},lexicon:{getCode:s=>s}};
   return realRequire(name);
 }};
  
 context.process={...process,resourcesPath:path.join(__dirname,'..')};
 try {
   vm.runInNewContext(fs.readFileSync(main,'utf8')+'\nconfig=loadConfig();',context,{filename:main});
   const invoke=(channel,...args)=>handlers.get(channel)(null,...args);
   const env=(await invoke('get-env')).data;
   assert.equal(env.preview,true);
   assert.equal(env.root,path.join(paths.appData,'.daylight-preview'));
   assert.equal(paths.userData,path.join(paths.appData,'Daylight Preview'));
   assert(fs.existsSync(path.join(paths.userData,'config.json')));
   assert(!fs.existsSync(path.join(paths.appData,'.daylight')));
   assert(!fs.existsSync(path.join(temporary,'stable-config')));
   assert.equal((await invoke('check-updates')).ok,false);
   assert.equal((await invoke('install-update')).ok,false);
   assert.equal(updaterCalls,0);
   const build=require('./preview-builder.cjs');
   assert.equal(build.publish,null);
   assert.notEqual(build.appId,require('../package.json').build.appId);
 } finally {fs.rmSync(temporary,{recursive:true,force:true});}
});

test('normal release retains stable data paths and enables update IPC',async()=>{
 const temporary=fs.mkdtempSync(path.join(os.tmpdir(),'daylight-release-test-'));
 const handlers=new Map(),main=path.join(__dirname,'../src/main.js'),realRequire=createRequire(main);
 const paths={appData:path.join(temporary,'appData'),userData:path.join(temporary,'daylight-launcher')};
 const app={isPackaged:true,getPath:name=>paths[name],setPath(){throw Error('Release must not redirect settings');},
   requestSingleInstanceLock:()=>false,quit(){},on(){},getVersion:()=>require('../package.json').version};
 let checks=0,installs=0;
 const context={console,process:{...process,resourcesPath:path.join(__dirname,'..')},Buffer,URL,AbortSignal,setTimeout,clearTimeout,
   __dirname:path.dirname(main),module:{exports:{}},require:name=>{
    if(name==='electron')return {app,ipcMain:{handle:(channel,fn)=>handlers.set(channel,fn),on(){}},nativeImage:{}};
    if(name==='electron-updater')return {autoUpdater:{checkForUpdates:()=>{checks++;return {};},quitAndInstall:()=>{installs++;}}};
    if(name==='minecraft-launcher-core')return {Client:class {}};
    if(name==='msmc')return {Auth:class{},lexicon:{getCode:s=>s}};
    return realRequire(name);
   }};
 try {
  vm.runInNewContext(fs.readFileSync(main,'utf8')+'\nconfig=loadConfig();',context,{filename:main});
  const invoke=channel=>handlers.get(channel)(null);
  const env=(await invoke('get-env')).data;
  assert.equal(env.preview,false);
  assert.equal(env.root,path.join(paths.appData,'.daylight'));
  assert(fs.existsSync(path.join(paths.userData,'config.json')));
  assert.equal((await invoke('check-updates')).ok,true);
  assert.equal((await invoke('install-update')).ok,true);
  assert.equal(checks,1);assert.equal(installs,1);
 } finally {fs.rmSync(temporary,{recursive:true,force:true});}
});

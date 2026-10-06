const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const os=require('node:os');
const path=require('node:path');
const {parseJavaProperties,chooseJava,validateJava,javaCandidates}=require('../src/java-runtime');
const {libraryAllowed}=require('../src/platform-libraries');

test('Java properties normalize Oracle/OpenJDK CPU names and legacy versions',()=>{
 assert.deepEqual(parseJavaProperties(' java.version = 21.0.11\n os.arch = aarch64'),{major:21,version:'21.0.11',arch:'arm64'});
 assert.equal(parseJavaProperties(' java.version = 1.8.0_402\n os.arch = amd64').major,8);
 assert.throws(()=>parseJavaProperties('java missing'),/did not report/);
});
test('runtime selection skips wrong CPUs and too-new Java, preferring exact major',async()=>{
 const runtimes={intel:{major:21,arch:'x64',version:'21'},newer:{major:25,arch:'arm64',version:'25'},valid:{major:21,arch:'arm64',version:'21'},compatible:{major:22,arch:'arm64',version:'22'}};
 const probe=async name=>{if(!runtimes[name])throw Error('missing');return runtimes[name];};
 assert.equal(await chooseJava(['bad','intel','newer','compatible','valid'],21,23,'arm64',probe),'valid');
 assert.equal(await chooseJava(['intel','newer'],21,23,'arm64',probe),null);
 await assert.rejects(validateJava('intel',21,23,'arm64',probe),/needs arm64/);
 await assert.rejects(validateJava('newer',21,23,'arm64',probe),/needs Java/);
 assert.equal(await validateJava('intel',21,23,'x64',probe),'intel');
});
test('Java discovery understands macOS JDK bundles and Linux JRE layouts',async()=>{
 const root=await fs.mkdtemp(path.join(os.tmpdir(),'daylight-java-layout-'));
 try {
  const mac=path.join(root,'jdk-21.jdk','Contents','Home','bin','java');
  const linux=path.join(root,'temurin-17','bin','java');
  await fs.mkdir(path.dirname(mac),{recursive:true});await fs.writeFile(mac,'fixture');
  await fs.mkdir(path.dirname(linux),{recursive:true});await fs.writeFile(linux,'fixture');
  const discovered=await javaCandidates([root],'darwin');
  assert(discovered.includes(mac));assert(discovered.includes(linux));
  assert(!(await javaCandidates([root],'linux')).includes(mac));
 } finally {await fs.rm(root,{recursive:true,force:true});}
});
test('native classifiers cannot cross operating systems or CPU architectures',()=>{
 const lib=classifier=>({name:'org.lwjgl:lwjgl:3.3.3:'+classifier});
 assert(libraryAllowed(lib('natives-linux'),'linux','x64'));
 assert(!libraryAllowed(lib('natives-linux'),'linux','arm64'));
 assert(libraryAllowed(lib('natives-linux-arm64'),'linux','arm64'));
 assert(!libraryAllowed(lib('natives-windows-x86'),'win32','x64'));
 assert(!libraryAllowed(lib('natives-macos-arm64'),'linux','arm64'));
 assert(libraryAllowed({downloads:{artifact:{path:'org/lwjgl/lwjgl/3.3.3/lwjgl-3.3.3-natives-macos-arm64.jar'}}},'darwin','arm64'));
});
test('Mac and Linux build targets remain isolated previews with architecture-specific names',()=>{
 const cfg=require('./platform-preview-builder.cjs');
 assert.equal(cfg.publish,null);assert.equal(cfg.extraMetadata.version,'2.20.0-preview.2');
 assert.equal(cfg.appId,'gg.daylight.launcher.preview');
 assert(cfg.mac.artifactName.includes('${arch}'));assert(cfg.linux.artifactName.includes('${arch}'));
 assert.equal(cfg.linux.executableName,'daylight-preview');
 assert.equal(cfg.linux.desktop.entry.Name,'Daylight Preview');
});

test('normal builds keep stable identity and use the migrated update feed',()=>{
 const pkg=require('../package.json'),cfg=pkg.build;
 assert.equal(pkg.version,'2.20.2');assert.equal(pkg.name,'daylight-launcher');
 assert.equal(cfg.appId,'gg.daylight.launcher');assert.equal(cfg.productName,'Daylight');
 assert.deepEqual(cfg.publish,{provider:'github',owner:'Duckboy121',repo:'daylight-lancher'});
 assert.equal(cfg.extraResources[0].from,'out/release-bundled');
 assert.equal(cfg.linux.executableName,'daylight');
 for(const name of ['dist','dist:mac','dist:linux','dist:linux:portable']) {
  assert(!pkg.scripts[name].includes('preview'));assert(pkg.scripts[name].includes('--publish never'));
 }
 assert(cfg.mac.artifactName.includes('${arch}'));assert(cfg.linux.artifactName.includes('${arch}'));
});

test('release notes, publishing and Linux installation follow the repository move',async()=>{
 const root=path.join(__dirname,'..');
 const main=await fs.readFile(path.join(root,'src/main.js'),'utf8');
 const publish=await fs.readFile(path.join(root,'tools/publish-release.js'),'utf8');
 const install=await fs.readFile(path.join(root,'install.sh'),'utf8');
 assert(main.includes("require('../package.json').build.publish"));
 assert(main.includes('https://api.github.com/repos/${owner}/${repo}/releases?per_page=25'));
 assert(publish.includes("require('../package.json').build.publish"));
 assert(install.includes('REPO="daylight-lancher"'));
 for(const source of [main,publish,install])assert(!source.includes('Duckboy121/daylight-/'));
});

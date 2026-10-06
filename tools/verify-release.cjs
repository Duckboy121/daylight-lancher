const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const asar=require('@electron/asar'),yaml=require('js-yaml'),tar=require('tar');
const root=path.join(__dirname,'..'),pkg=require('../package.json'),platform=process.argv[2];
assert(['win','linux','mac'].includes(platform),'Specify win, linux or mac');
const output=path.join(root,pkg.build.directories.output);
const digest=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
function verifyResources(resources) {
 const archive=path.join(resources,'app.asar'),metadata=JSON.parse(asar.extractFile(archive,'package.json'));
 assert.equal(metadata.version,pkg.version);assert(!metadata.version.includes('-'));
 assert.equal(metadata.name,'daylight-launcher');assert.equal(metadata.productName,'Daylight');
 const feed=yaml.load(fs.readFileSync(path.join(resources,'app-update.yml'),'utf8'));
 assert.equal(feed.provider,'github');assert.equal(feed.owner,'Duckboy121');assert.equal(feed.repo,'daylight-lancher');
 function compare(directory) {
  for(const entry of fs.readdirSync(path.join(root,directory),{withFileTypes:true})) {
   const relative=path.join(directory,entry.name);
   if(entry.isDirectory())compare(relative);
   else assert(asar.extractFile(archive,relative).equals(fs.readFileSync(path.join(root,relative))),`Stale source: ${relative}`);
  }
 }
 compare('src');
 const bundles=fs.readdirSync(path.join(resources,'bundled')).filter(file=>file.endsWith('.jar'));
 assert.equal(bundles.length,28);
 for(const name of bundles)assert.equal(digest(path.join(resources,'bundled',name)),digest(path.join(root,'out/release-bundled',name)),`Stale mod: ${name}`);
 console.log(`PASS: ${resources}; normal Daylight ${metadata.version}, current source, stable update feed, 28 matching mods`);
}
async function main() {
 if(platform==='win') {
  verifyResources(path.join(output,'win-unpacked/resources'));
  const installer=`Daylight Setup ${pkg.version}.exe`;
  if(process.platform==='win32')assert.equal(digest(path.join(output,installer)),digest(path.join('C:/Users/Alexj/Documents/day',installer)));
 } else if(platform==='mac') {
  for(const arch of ['mac','mac-arm64'])verifyResources(path.join(output,arch,'Daylight.app/Contents/Resources'));
 } else {
  const unpacked=path.join(output,'linux-unpacked');verifyResources(path.join(unpacked,'resources'));
  const header=Buffer.alloc(20),fd=fs.openSync(path.join(unpacked,'daylight'),'r');fs.readSync(fd,header,0,20,0);fs.closeSync(fd);
  assert.equal(header.subarray(0,4).toString('hex'),'7f454c46');assert.equal(header.readUInt16LE(18),62);
  const name=`Daylight-${pkg.version}-linux-x64`,archive=path.join(output,name+'.tar.gz');
  const executable=new Set(['daylight','chrome-sandbox','chrome_crashpad_handler']),found=new Set();
  let verifiedAsar=false;
  await tar.list({file:archive,onReadEntry(entry) {
   const relative=entry.path.slice(name.length+1);
   assert(entry.path===name||entry.path.startsWith(name+'/'));
   if(executable.has(relative)){assert.equal(entry.mode&0o111,0o111,`Not executable: ${relative}`);found.add(relative);}
   if(relative==='resources/app.asar') {
    const hash=crypto.createHash('sha256');
    entry.on('data',chunk=>hash.update(chunk));
    entry.on('end',()=>{assert.equal(hash.digest('hex'),digest(path.join(unpacked,relative)));verifiedAsar=true;});
   }
   entry.resume();
  }});
  assert.equal(found.size,3);assert(verifiedAsar);
  if(process.platform==='win32')assert.equal(digest(archive),digest(path.join('C:/Users/Alexj/Documents/day',name+'.tar.gz')));
  console.log('PASS: Linux x64 ELF, tar executable permissions, archived application and share copy');
 }
}
main().catch(error=>{console.error(error);process.exitCode=1;});

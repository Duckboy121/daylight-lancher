 
 
const fs=require('node:fs');
const path=require('node:path');
const tar=require('tar');
const assert=require('node:assert/strict');
const asar=require('@electron/asar');
const pkg=require('../package.json'),config=pkg.build;
const root=path.join(__dirname,'..');
const output=path.join(root,config.directories.output),source=path.join(output,'linux-unpacked');
const version=JSON.parse(asar.extractFile(path.join(source,'resources/app.asar'),'package.json')).version;
assert.equal(version,pkg.version);
const name=`Daylight-${version}-linux-x64`,destination=path.join(output,name+'.tar.gz');
const binaries=new Set([config.linux.executableName,'chrome-sandbox','chrome_crashpad_handler']);
async function pack() {
 await tar.create({cwd:output,file:destination+'.partial',gzip:{level:6},portable:true,
  onWriteEntry(entry) {
   const relative=entry.path.replaceAll('\\','/').replace(/^linux-unpacked\/?/,'');
   entry.path=name+(relative?'/'+relative:'');
   entry.stat.mode=entry.type==='Directory'||binaries.has(relative)?0o755:0o644;
  }
 },['linux-unpacked']);
 const found=new Set();
 await tar.list({file:destination+'.partial',onReadEntry(entry) {
  const relative=entry.path.slice(name.length+1);
  if(binaries.has(relative)){assert.equal(entry.mode&0o111,0o111,`not executable: ${relative}`);found.add(relative);}
  entry.resume();
 }});
 assert.equal(found.size,binaries.size,'Linux executable missing from archive');
 fs.renameSync(destination+'.partial',destination);
 require('./after-build').default({artifactPaths:[destination]});
 console.log(`PASS: Linux portable archive contains all executable modes: ${destination}`);
}
pack().catch(error=>{console.error(error);process.exitCode=1;});

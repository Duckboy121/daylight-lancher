 
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const assert=require('node:assert/strict');
const asar=require('@electron/asar');
const root=path.join(__dirname,'..');
const config=require('./preview-builder.cjs');
const output=path.join(root,config.directories.output);
const resources=path.join(output,'win-unpacked/resources');
const archive=path.join(resources,'app.asar');
const metadata=JSON.parse(asar.extractFile(archive,'package.json'));
assert.equal(metadata.version,config.extraMetadata.version);
assert.equal(metadata.name,'daylight-preview');
assert.equal(metadata.productName,'Daylight Preview');
assert.equal(config.publish,null);
assert.equal(config.appId,'gg.daylight.launcher.preview');
function compareSource(directory) {
  for(const entry of fs.readdirSync(path.join(root,directory),{withFileTypes:true})) {
    const relative=path.join(directory,entry.name);
    if(entry.isDirectory())compareSource(relative);
    else assert(asar.extractFile(archive,relative).equals(fs.readFileSync(path.join(root,relative))),`stale packaged source: ${relative}`);
  }
}
compareSource('src');
const bundles=fs.readdirSync(path.join(root,'out/preview-bundled')).filter(name=>name.endsWith('.jar'));
for(const name of bundles) {
  assert(fs.readFileSync(path.join(resources,'bundled',name)).equals(fs.readFileSync(path.join(root,'out/preview-bundled',name))),`stale packaged mod: ${name}`);
}
assert.equal(bundles.length,28);
const installer=`Daylight Setup ${metadata.version}.exe`;
const digest=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const hash=digest(path.join(output,installer));
if(process.platform==='win32') {
  const share='C:\\Users\\Alexj\\Documents\\day';
  assert.equal(digest(path.join(share,installer)),hash,'share-folder installer differs');
  assert.equal(digest(path.join(share,'latest.yml')),'f46336d26948df32b6e00b709fe669d1b71e0a72c604513ccaf5a5a60c43a46d','stable update manifest changed since this preview began');
}
console.log(`PASS: ${installer}; current sources; ${bundles.length} matching mod jars; stable manifest unchanged`);
console.log(`SHA256 ${hash}`);

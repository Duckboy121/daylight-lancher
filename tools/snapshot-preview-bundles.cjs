 
 
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const {verify,versions}=require('./verify-mod-matrix.cjs');
const root=path.join(__dirname,'..'),source=path.join(root,'out/mod-matrix');
verify(source);
const target=path.join(root,'build/preview-bundled');
fs.mkdirSync(target,{recursive:true});
const manifest={minecraftVersions:versions,files:{}};
for(const version of versions) {
 const name=`daylight-mod-${version}.jar`,bytes=fs.readFileSync(path.join(source,name));
 fs.writeFileSync(path.join(target,name),bytes);
 manifest.files[name]=crypto.createHash('sha256').update(bytes).digest('hex');
}
fs.writeFileSync(path.join(target,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
console.log(`Snapshotted ${versions.length} tested preview bundles for native-host builds`);

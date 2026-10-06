const fs=require('node:fs');
const path=require('node:path');
const {verify,versions}=require('./verify-mod-matrix.cjs');
const preview=process.argv.includes('--preview');
const root=path.join(__dirname,'..'),target=path.join(root,preview?'out/preview-bundled':'out/release-bundled');
const local=path.join(root,'out/mod-matrix');
const portable=path.join(root,'build/preview-bundled');
const source=!process.argv.includes('--portable') && versions.every(v=>fs.existsSync(path.join(local,`daylight-mod-${v}.jar`)))?local:portable;
verify(source);
if(source===portable) {
 const {createHash}=require('node:crypto');
 const manifest=JSON.parse(fs.readFileSync(path.join(portable,'manifest.json'),'utf8'));
 for(const version of versions) {
  const name=`daylight-mod-${version}.jar`;
  if(createHash('sha256').update(fs.readFileSync(path.join(portable,name))).digest('hex')!==manifest.files[name])throw Error(`Bundle checksum mismatch: ${name}`);
 }
}
fs.mkdirSync(target,{recursive:true});
 
 
for(const version of ['1.18','1.18.1','1.18.2',...versions]) {
 const name=`daylight-mod-${version}.jar`;
 const directory=versions.includes(version)?source:path.join(root,'bundled');
 fs.copyFileSync(path.join(directory,name),path.join(target,name));
}
console.log(`Staged ${preview?'preview':'release'} bundles: ${target}`);

const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const yaml=require('js-yaml'),pkg=require('../package.json');
const platform=process.argv[2];
assert(['win','mac','linux'].includes(platform),'Specify win, mac or linux');
const output=path.join(__dirname,'..',pkg.build.directories.output);
const name=platform==='win'?'latest.yml':`latest-${platform}.yml`;
const manifestFile=path.join(output,name),manifest=yaml.load(fs.readFileSync(manifestFile,'utf8'));
assert.equal(manifest.version,pkg.version,'Update manifest is stale');
assert(!manifest.version.includes('-'),'Normal release required');
const files=fs.readdirSync(output),artifacts=[];
for(const entry of manifest.files) {
 const remote=decodeURIComponent(entry.url);
 assert.equal(path.basename(remote),remote,'Update asset must be a filename');
 const local=files.find(file=>file===remote||file.replace(/\s+/g,'-')===remote);
 assert(local,`Missing update asset ${remote}`);
 const full=path.join(output,local),data=fs.readFileSync(full);
 assert.equal(crypto.createHash('sha512').update(data).digest('base64'),entry.sha512,`Incorrect hash: ${local}`);
 if(entry.size!==undefined)assert.equal(data.length,entry.size);
 artifacts.push({source:full,name:remote});
 if(fs.existsSync(full+'.blockmap'))artifacts.push({source:full+'.blockmap',name:remote+'.blockmap'});
}
require('./after-build').default({artifactPaths:[manifestFile]});
if(process.platform==='win32') {
 const share=path.join('C:/Users/Alexj/Documents/day',`GitHub-${pkg.version}`);
 fs.mkdirSync(share,{recursive:true});
 for(const artifact of artifacts)fs.copyFileSync(artifact.source,path.join(share,artifact.name));
 fs.copyFileSync(manifestFile,path.join(share,name));
 console.log(`Matching GitHub upload filenames and metadata: ${share}`);
}
console.log(`PASS: ${name} matches version ${manifest.version} and every asset hash`);

const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const Zip=require('adm-zip');
const versions=['1.19','1.19.1','1.19.2','1.19.3','1.19.4','1.20','1.20.1','1.20.2','1.20.3','1.20.4','1.20.5','1.20.6','1.21','1.21.1','1.21.2','1.21.3','1.21.4','1.21.5','1.21.6','1.21.7','1.21.8','1.21.9','1.21.10','1.21.11','26.2'];
function verify(directory=path.join(__dirname,'../out/mod-matrix')) {
for(const version of versions){
 const filename=path.join(directory,`daylight-mod-${version}.jar`);
 assert(fs.existsSync(filename),`missing ${version}`);
 const jar=new Zip(filename),metadata=JSON.parse(jar.readAsText('fabric.mod.json'));
 const java=version==='26.2'?25:/^1\.(19|20)(\.[1-4])?$/.test(version)?17:21;
 assert.equal(metadata.depends.minecraft,version,`MC descriptor ${version}`);
 assert.equal(metadata.depends.java,`>=${java}`,`Java descriptor ${version}`);
 assert.equal(JSON.parse(jar.readAsText('daylight.client.mixins.json')).compatibilityLevel,`JAVA_${java}`,`Mixin Java ${version}`);
 const menu=jar.readFile('gg/daylight/client/gui/ClickGuiScreen.class');
 assert(menu.includes(Buffer.from('Grid: 8px [ON]')),`old module UI in ${version}`);
 assert(menu.readUInt16BE(6)<=java+44,`class targets too-new Java: ${version}`);
 if(['1.21','1.21.1','1.21.2','1.21.3','1.21.4','1.21.5'].includes(version)) {
  const crosshair=jar.readFile('gg/daylight/client/mixin/InGameHudCrosshairMixin.class');
  assert(crosshair?.includes(Buffer.from('(Lorg/spongepowered/asm/mixin/injection/callback/CallbackInfo;)V')),`crosshair hook captures an incompatible version-specific argument list: ${version}`);
 }
}
console.log(`PASS: all ${versions.length} jars have redesigned menus and matching Minecraft/Java metadata`);
}
if(require.main===module) verify(process.argv[2]);
module.exports={verify,versions};

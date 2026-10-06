const preview=require('./preview-builder.cjs');
module.exports={...preview,
  extraMetadata:{...preview.extraMetadata,version:'2.20.0-preview.2'},
  directories:{output:'out/platform-dist'},
  artifactName:'Daylight-Preview-${version}-${os}-${arch}.${ext}',
  mac:{...preview.mac,artifactName:'Daylight-Preview-${version}-mac-${arch}.${ext}'},
  linux:{...preview.linux,target:['AppImage','tar.gz'],executableName:'daylight-preview',
    artifactName:'Daylight-Preview-${version}-linux-${arch}.${ext}',
    desktop:{entry:{Name:'Daylight Preview',Comment:'Isolated Daylight test launcher'}}},
  publish:null
};

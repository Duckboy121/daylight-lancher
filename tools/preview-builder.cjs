const config=require('../package.json').build;
module.exports={...config,
  appId:'gg.daylight.launcher.preview',
  productName:'Daylight Preview',
  artifactName:'Daylight Setup ${version}.${ext}',
  directories:{output:'out/redesign-dist'},
  extraMetadata:{name:'daylight-preview',productName:'Daylight Preview',version:'2.20.0-preview.1'},
  extraResources:[{from:'out/preview-bundled',to:'bundled',filter:['*.jar']}],
  publish:null
};

const fs = require('fs');
const path = require('path');

async function sessionLog(directory, send, secrets = []) {
  await fs.promises.mkdir(directory,{recursive:true});
  const filename=path.join(directory,'daylight-launcher.log');
  try { await fs.promises.rename(filename,filename+'.previous'); } catch(e) { if(e.code!=='ENOENT') throw e; }
  const stream=fs.createWriteStream(filename);
  let buffer='',timer=null,bytes=0,blocked=false,ended=false,failed=false;
  stream.on('error',()=>{failed=true;});
  stream.on('drain',()=>{blocked=false;});
  const flush=()=>{timer=null;if(buffer){send(buffer);buffer='';}};
  return {
    write(value) {
      if(ended)return;
      let line=String(value).slice(0,64000);
      for(const secret of secrets)if(secret)line=line.split(secret).join('[redacted]');
      if(!line.endsWith('\n'))line+='\n';
      buffer=(buffer+line).slice(-128000);
      if(!timer)timer=setTimeout(flush,100);
      if(!failed&&!blocked&&bytes<5*1024*1024){bytes+=Buffer.byteLength(line);blocked=!stream.write(line);}
    },
    end() {if(ended)return;ended=true;clearTimeout(timer);flush();stream.end();}
  };
}
module.exports={sessionLog};

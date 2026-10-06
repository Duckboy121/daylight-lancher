 
const fs = require('fs');
const path = require('path');

const DEST = 'C:\\Users\\Alexj\\Documents\\day';

exports.default = function (buildResult) {
   
  if (process.platform !== 'win32') return [];
  fs.mkdirSync(DEST, { recursive: true });
  const copied = [];
  const copy = file => {
    const target = path.join(DEST, path.basename(file));
    if (/^latest.*\.yml$/.test(path.basename(file)) && fs.existsSync(target) && !fs.readFileSync(target).equals(fs.readFileSync(file))) {
      const backup = path.join(DEST, 'previous-update-files', new Date().toISOString().replace(/[:.]/g, '-'));
      fs.mkdirSync(backup, { recursive: true });
      fs.copyFileSync(target, path.join(backup, path.basename(file)));
      console.log('Backed up previous update manifest to ' + backup);
    }
    fs.copyFileSync(file, target);
    copied.push(target);
  };
  for (const file of buildResult.artifactPaths) {
    if (/\.(exe|blockmap|dmg|zip|AppImage|tar\.gz)$/i.test(file) || /^latest(?:-mac|-linux)?\.yml$/.test(path.basename(file))) {
      copy(file);
       
       
       
    }
  }
  if (copied.length) console.log('Copied update files to ' + DEST);
  return copied;
};

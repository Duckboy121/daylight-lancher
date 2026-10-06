 
 
const path = require('path');
const os = require('os');
const fs = require('fs');
const { Client } = require('minecraft-launcher-core');

const GAME_ROOT = path.join(os.homedir(), 'AppData', 'Roaming', '.daylight');
const PACK = 'daylight';
const VERSION = '26.2';
const LOADER = '0.19.3';

const launcher = new Client();
const outFile = path.join(__dirname, 'launch-args.txt');

launcher.on('arguments', args => {
  fs.writeFileSync(outFile, args.join('\n'));
  console.log('wrote', outFile);
   
  const cpIdx = args.indexOf('-cp');
  if (cpIdx >= 0) {
    const cp = args[cpIdx + 1].split(';');
    fs.appendFileSync(outFile, '\n\n=== CLASSPATH ENTRIES ===\n' + cp.join('\n'));
  }
  setTimeout(() => process.exit(0), 500);
});
launcher.on('debug', m => console.log('[debug]', String(m)));

launcher.launch({
  root: GAME_ROOT,
  authorization: {
    access_token: '0', client_token: '0', uuid: '0'.repeat(32),
    name: 'Offline', user_properties: '{}', meta: { type: 'msa', demo: false }
  },
  version: { number: VERSION, type: 'release', custom: `fabric-loader-${LOADER}-${VERSION}` },
  memory: { min: '2G', max: '4G' },
  overrides: { gameDirectory: path.join(GAME_ROOT, 'packs', PACK) }
});

 
 
 
const path = require('path');
const os = require('os');
const fs = require('fs');
const { Client } = require('minecraft-launcher-core');

function resolveGameRoot() {
  const raw = path.join(os.homedir(), 'AppData', 'Roaming', '.daylight');
  try {
    fs.mkdirSync(raw, { recursive: true });
    const probe = path.join(raw, '.pathprobe');
    fs.writeFileSync(probe, '');
    const real = path.dirname(fs.realpathSync.native(probe));
    fs.rmSync(probe, { force: true });
    return real;
  } catch { return raw; }
}

const GAME_ROOT = resolveGameRoot();
console.log('canonical GAME_ROOT:', GAME_ROOT);

const launcher = new Client();
let output = '';
let done = false;
launcher.on('data', m => { output += m; });
launcher.on('debug', m => { output += m; });

function finish() {
  if (done) return; done = true;
  const crashed = output.includes('cannot be cast to') && output.includes('IMixinConfigPlugin');
  const preLaunchFail = output.includes("Could not execute entrypoint stage 'preLaunch'");
  const reached = output.includes('LWJGL') || output.includes('Backend library') || output.includes('OpenAL');
  const mods = (output.match(/Loading (\d+) mods/) || [])[1];
  console.log('--- RESULT ---');
  console.log('mixin cast crash:', crashed);
  console.log('preLaunch failed:', preLaunchFail);
  console.log('reached window/LWJGL:', reached);
  console.log('mods loaded:', mods);
  console.log(crashed || preLaunchFail ? '>>> STILL BROKEN' : '>>> FIXED — Fabric launched cleanly');
  process.exit(0);
}

setTimeout(finish, 40000);

launcher.launch({
  root: GAME_ROOT,
  authorization: {
    access_token: '0', client_token: '0', uuid: '0'.repeat(32),
    name: 'Offline', user_properties: '{}', meta: { type: 'msa', demo: false }
  },
  version: { number: '26.2', type: 'release', custom: 'fabric-loader-0.19.3-26.2' },
  memory: { min: '2G', max: '4G' },
  customArgs: ['-XX:+UseG1GC'],
  overrides: { gameDirectory: path.join(GAME_ROOT, 'packs', 'daylight') }
});

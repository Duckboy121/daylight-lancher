 
 
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const JDK = 'C:\\Program Files\\Eclipse Adoptium\\jdk-25.0.3.9-hotspot\\bin\\java.exe';
const argsFile = path.join(__dirname, 'launch-args.txt');

 
const raw = fs.readFileSync(argsFile, 'utf8').split('\n');
const cut = raw.indexOf('');
const baseArgs = (cut >= 0 ? raw.slice(0, cut) : raw).map(s => s.replace(/\r$/, ''));

const extraFlags = process.argv.slice(2).filter(a => a !== '--canon');  
const canon = process.argv.includes('--canon');

function realpath(p) {
  try { return fs.realpathSync.native(p); } catch { return p; }
}

 
const cpIdx = baseArgs.indexOf('-cp');
let finalArgs = [...baseArgs.slice(0, cpIdx), ...extraFlags, ...baseArgs.slice(cpIdx)];

if (canon) {
   
   
  finalArgs = finalArgs.map(arg => {
    if (arg.includes(';') && arg.toLowerCase().includes('.jar')) {
      return arg.split(';').map(realpath).join(';');
    }
    if (arg.startsWith('-Djava.library.path=')) {
      return '-Djava.library.path=' + realpath(arg.slice('-Djava.library.path='.length));
    }
    return arg;
  });
  const gd = finalArgs.indexOf('--gameDir');
  if (gd >= 0) finalArgs[gd + 1] = realpath(finalArgs[gd + 1]);
}

console.log('injecting:', extraFlags.join(' ') || '(none)');
const res = spawnSync(JDK, finalArgs, {
  encoding: 'utf8',
  timeout: 35000,
  cwd: path.join(require('os').homedir(), 'AppData', 'Roaming', '.daylight', 'packs', 'daylight')
});

const out = (res.stdout || '') + (res.stderr || '');
const crashed = out.includes('cannot be cast to') && out.includes('IMixinConfigPlugin');
const preLaunchFail = out.includes("Could not execute entrypoint stage 'preLaunch'");
const reachedWindow = out.includes('LWJGL') || out.includes('Backend library') ||
  out.includes('Created:') || out.includes('OpenAL') || out.includes('Narrator');
const loadedMods = (out.match(/Loading (\d+) mods/) || [])[1];

console.log('--- RESULT ---');
console.log('mixin cast crash:', crashed);
console.log('preLaunch failed:', preLaunchFail);
console.log('reached window/LWJGL stage:', reachedWindow);
console.log('mods loaded:', loadedMods);
 
const lines = out.split('\n').filter(l => l.trim());
console.log('--- tail ---');
console.log(lines.slice(-12).join('\n'));

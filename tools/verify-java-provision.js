 
 
const path = require('path');
const os = require('os');
const fs = require('fs');
const { execFile, execFileSync } = require('child_process');
const { Client } = require('minecraft-launcher-core');

const NEED = 21;
const ROOT = (() => {
  const raw = path.join(os.homedir(), 'AppData', 'Roaming', '.daylight');
  fs.mkdirSync(raw, { recursive: true });
  const probe = path.join(raw, '.pathprobe');
  fs.writeFileSync(probe, '');
  const real = path.dirname(fs.realpathSync.native(probe));
  fs.rmSync(probe, { force: true });
  return real;
})();
const RUNTIME_DIR = path.join(ROOT, 'runtime');

function findManagedJava(need) {
  const base = path.join(RUNTIME_DIR, `jdk-${need}`);
  if (!fs.existsSync(base)) return null;
  const direct = path.join(base, 'bin', 'javaw.exe');
  if (fs.existsSync(direct)) return direct;
  for (const dir of fs.readdirSync(base)) {
    const nested = path.join(base, dir, 'bin', 'javaw.exe');
    if (fs.existsSync(nested)) return nested;
  }
  return null;
}

function extractZip(zip, dest) {
  return new Promise((resolve, reject) => {
    execFile('tar', ['-xf', zip, '-C', dest], err => {
      if (!err) return resolve();
      execFile('powershell', ['-NoProfile', '-Command',
        `Expand-Archive -LiteralPath "${zip}" -DestinationPath "${dest}" -Force`],
        err2 => err2 ? reject(err2) : resolve());
    });
  });
}

async function provision() {
   
  fs.rmSync(path.join(RUNTIME_DIR, `jdk-${NEED}`), { recursive: true, force: true });

  const url = `https://api.adoptium.net/v3/binary/latest/${NEED}/ga/windows/x64/jre/hotspot/normal/eclipse`;
  console.log('downloading JRE', NEED, 'from Adoptium…');
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const total = Number(res.headers.get('content-length')) || 0;
  fs.mkdirSync(RUNTIME_DIR, { recursive: true });
  const zipPath = path.join(RUNTIME_DIR, `jre-${NEED}.zip`);
  const out = fs.createWriteStream(zipPath);
  let got = 0, lastPct = -10;
  for await (const chunk of res.body) {
    got += chunk.length;
    out.write(chunk);
    const pct = total ? Math.floor(got / total * 100) : 0;
    if (pct >= lastPct + 25) { console.log(`  ${pct}% (${Math.round(got / 1048576)} MB)`); lastPct = pct; }
  }
  await new Promise(r => out.end(r));
  const destDir = path.join(RUNTIME_DIR, `jdk-${NEED}`);
  fs.mkdirSync(destDir, { recursive: true });
  await extractZip(zipPath, destDir);
  fs.rmSync(zipPath, { force: true });
  const exe = findManagedJava(NEED);
  if (!exe) throw new Error('javaw.exe not found after extraction');
  console.log('provisioned:', exe);
  const verOut = execFileSync(path.join(path.dirname(exe), 'java.exe'), ['-version'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  return exe;
}

async function main() {
  const javaPath = await provision();
  console.log('launching MC 1.21.11 with the downloaded JRE only…');

  const launcher = new Client();
  let output = '';
  launcher.on('data', m => { output += m; });
  launcher.on('debug', m => { output += m; });

  setTimeout(() => {
    const crashed = output.includes('cannot be cast to') || output.includes("Could not execute entrypoint");
    const reached = output.includes('LWJGL') || output.includes('Backend library') || output.includes('OpenAL');
    const mods = (output.match(/Loading (\d+) mods/) || [])[1];
    console.log('--- RESULT ---');
    console.log('mods loaded:', mods, '| crashed:', crashed, '| reached window:', reached);
    console.log(!crashed && reached ? '>>> FRESH-PC JAVA PROVISIONING WORKS' : '>>> BROKEN');
    process.exit(0);
  }, 90000);

  launcher.launch({
    root: ROOT,
    authorization: {
      access_token: '0', client_token: '0', uuid: '0'.repeat(32),
      name: 'Offline', user_properties: '{}', meta: { type: 'msa', demo: false }
    },
    version: { number: '1.21.11', type: 'release', custom: 'fabric-loader-0.19.3-1.21.11' },
    memory: { min: '2G', max: '4G' },
    javaPath,
    overrides: { gameDirectory: path.join(ROOT, 'packs', 'daylight') }
  });
}

main().catch(e => { console.error('FAILED:', e.message); process.exit(1); });

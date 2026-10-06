 
 
 
const path = require('path');
const os = require('os');
const fs = require('fs');
const { pipeline } = require('stream/promises');
const { Readable } = require('stream');
const { Client } = require('minecraft-launcher-core');

const MC = '1.21.11';
const PERF_MODS = ['fabric-api', 'sodium', 'lithium', 'ferrite-core', 'entityculling', 'immediatelyfast', 'krypton'];
const BUNDLED = path.join(__dirname, '..', 'bundled', 'daylight-mod-1.21.11.jar');

function resolveGameRoot() {
  const raw = path.join(os.homedir(), 'AppData', 'Roaming', '.daylight');
  fs.mkdirSync(raw, { recursive: true });
  const probe = path.join(raw, '.pathprobe');
  fs.writeFileSync(probe, '');
  const real = path.dirname(fs.realpathSync.native(probe));
  fs.rmSync(probe, { force: true });
  return real;
}

const ROOT = resolveGameRoot();
const PACK_DIR = path.join(ROOT, 'packs', 'daylight');
const MODS_DIR = path.join(PACK_DIR, 'mods');

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return res.json();
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download ${res.status}`);
  await pipeline(Readable.fromWeb(res.body), fs.createWriteStream(dest));
}

async function main() {
  console.log('root:', ROOT);
  fs.mkdirSync(MODS_DIR, { recursive: true });

   
  for (const f of fs.readdirSync(MODS_DIR)) fs.unlinkSync(path.join(MODS_DIR, f));

  for (const slug of PERF_MODS) {
    const versions = await fetchJson(
      `https://api.modrinth.com/v2/project/${slug}/version?game_versions=${encodeURIComponent(JSON.stringify([MC]))}&loaders=${encodeURIComponent(JSON.stringify(['fabric']))}`
    );
    if (!versions.length) { console.log(`  ${slug}: no ${MC} build, skipped`); continue; }
    const file = versions[0].files.find(f => f.primary) || versions[0].files[0];
    await download(file.url, path.join(MODS_DIR, file.filename));
    console.log(`  ${slug}: ${file.filename}`);
  }
  fs.copyFileSync(BUNDLED, path.join(MODS_DIR, 'daylight-mod.jar'));
  console.log('  daylight-mod.jar (1.21.11 build)');

   
  const loaders = await fetchJson('https://meta.fabricmc.net/v2/versions/loader');
  const loader = (loaders.find(l => l.stable) || loaders[0]).version;
  const id = `fabric-loader-${loader}-${MC}`;
  const jsonPath = path.join(ROOT, 'versions', id, `${id}.json`);
  if (!fs.existsSync(jsonPath)) {
    const profile = await fetchJson(`https://meta.fabricmc.net/v2/versions/loader/${MC}/${loader}/profile/json`);
    fs.mkdirSync(path.dirname(jsonPath), { recursive: true });
    fs.writeFileSync(jsonPath, JSON.stringify(profile, null, 2));
  }
  console.log('profile:', id);

  const launcher = new Client();
  let output = '';
  launcher.on('data', m => { output += m; });
  launcher.on('debug', m => { output += m; });

  setTimeout(() => {
    const castCrash = output.includes('cannot be cast to');
    const preLaunchFail = output.includes("Could not execute entrypoint");
    const reached = output.includes('LWJGL') || output.includes('Backend library') || output.includes('OpenAL');
    const mods = (output.match(/Loading (\d+) mods/) || [])[1];
    const daylight = output.includes('daylight');
    console.log('--- RESULT ---');
    console.log('mods loaded:', mods, '| daylight listed:', daylight);
    console.log('cast crash:', castCrash, '| preLaunch failed:', preLaunchFail);
    console.log('reached window/LWJGL:', reached);
    console.log(castCrash || preLaunchFail || !reached ? '>>> BROKEN' : '>>> 1.21.11 PACK LAUNCHES CLEANLY');
    const tail = output.split('\n').filter(l => l.includes('ERROR') || l.includes('Exception')).slice(0, 6);
    if (tail.length) console.log('errors:\n' + tail.join('\n'));
    process.exit(0);
  }, 120000);

  launcher.launch({
    root: ROOT,
    authorization: {
      access_token: '0', client_token: '0', uuid: '0'.repeat(32),
      name: 'Offline', user_properties: '{}', meta: { type: 'msa', demo: false }
    },
    version: { number: MC, type: 'release', custom: id },
    memory: { min: '2G', max: '4G' },
    customArgs: ['-XX:+UseG1GC'],
    overrides: { gameDirectory: PACK_DIR }
  });
}

main().catch(e => { console.error(e); process.exit(1); });

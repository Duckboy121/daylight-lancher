const { app, BrowserWindow, ipcMain, shell, Tray, Menu, nativeImage } = require('electron');
const path = require('path');
const fs = require('fs');
const http = require('http');
const crypto = require('crypto');
const { pipeline } = require('stream/promises');
const { Readable } = require('stream');
const { Client } = require('minecraft-launcher-core');
const { libraryAllowed } = require('./platform-libraries');
 
 
class PlatformClient extends Client {
  printVersion() {
    super.printVersion();
    this.handler.parseRule = library => !libraryAllowed(library);
  }
}
const { Auth, lexicon } = require('msmc');
const { autoUpdater } = require('electron-updater');
const { installedProjects, inPack } = require('./mod-catalog');
const { supportedVersion, jvmArguments, memory, instanceOptions, defaultMemory } = require('./instance-options');
const { localIndex, remoteSearch } = require('./catalog-search');
const { dependencyPlan } = require('./dependency-plan');
const { sessionLog } = require('./session-log');
const { chooseJava, validateJava, javaCandidates } = require('./java-runtime');

 
 
 
const IS_PREVIEW = app.getVersion().includes('-');
if (IS_PREVIEW) {
  const previewData = path.join(app.getPath('appData'), 'Daylight Preview');
  fs.mkdirSync(previewData, { recursive: true });
  app.setPath('userData', previewData);
}

 
 
 
 
 
 
 
function resolveGameRoot() {
  const raw = path.join(app.getPath('appData'), IS_PREVIEW ? '.daylight-preview' : '.daylight');
  try {
    fs.mkdirSync(raw, { recursive: true });
     
     
     
    const probe = path.join(raw, '.pathprobe');
    fs.writeFileSync(probe, '');
    const real = path.dirname(fs.realpathSync.native(probe));
    fs.rmSync(probe, { force: true });
    return real;
  } catch {
    return raw;
  }
}

const GAME_ROOT = resolveGameRoot();
 
 
 
 
const IS_SANDBOXED = /\\Packages\\/i.test(GAME_ROOT);
const PACKS_ROOT = path.join(GAME_ROOT, 'packs');
const CONFIG_PATH = path.join(app.getPath('userData'), 'config.json');
const BUNDLED_DIR = app.isPackaged
  ? path.join(process.resourcesPath, 'bundled')
  : path.join(__dirname, '..', 'bundled');

const FABRIC_META = 'https://meta.fabricmc.net/v2';
const MODRINTH_API = 'https://api.modrinth.com/v2';

 
const DEFAULT_MC_VERSION = '1.21.11';

 
 
const DAYLIGHT_JAR = 'daylight-mod.jar';

 
 
 
function modBuildFor(version) {
  const jar = `daylight-mod-${version}.jar`;
  return fs.existsSync(path.join(BUNDLED_DIR, jar)) ? jar : null;
}

 
 
 
const LOADERS = ['fabric', 'forge', 'neoforge'];
const LOADER_LABEL = { fabric: 'Fabric', forge: 'Forge', neoforge: 'NeoForge' };

 
 
 
const PERF_MODS = {
  fabric: ['fabric-api', 'sodium', 'lithium', 'ferrite-core', 'entityculling', 'immediatelyfast', 'krypton', 'badoptimizations'],
  forge: ['embeddium', 'ferrite-core', 'entityculling', 'immediatelyfast', 'modernfix'],
  neoforge: ['sodium', 'ferrite-core', 'entityculling', 'immediatelyfast', 'modernfix']
};

 
const JVM_FLAGS = [
  '-XX:+UseG1GC',
  '-XX:+ParallelRefProcEnabled',
  '-XX:MaxGCPauseMillis=50',
  '-XX:+UnlockExperimentalVMOptions',
  '-XX:G1NewSizePercent=20',
  '-XX:G1ReservePercent=20',
  '-XX:G1HeapRegionSize=32M',
  '-XX:+UseStringDeduplication'
];

 
 
const RAM = defaultMemory();

 
 
const BUILTIN_PACKS = {
  daylight: {
    name: 'Daylight',
    desc: 'Daylight modules, HUD & FPS boost'
  }
};

let win = null;
let minecraftToken = null;
let tokenTime = 0;  
let gameRunning = false;
let gameStarting = false;
let activePackId = null;
let gameProcess = null;

 

const defaultConfig = {
  selectedPack: 'daylight',
  packs: {},             
  minRam: RAM.min,
  maxRam: RAM.max,
  javaPath: '',
  azureClientId: '',
  accounts: [],          
  activeUuid: ''
};





function migrateModSwitch(cfg) {
  if (cfg.daylightMod !== false) { delete cfg.daylightMod; return cfg; }
  for (const id of Object.keys(cfg.packs || {})) {
    if (cfg.packs[id].daylightMod === undefined) cfg.packs[id].daylightMod = false;
  }
  delete cfg.daylightMod;
  return cfg;
}

function readConfigFile(p) {
  const raw = fs.readFileSync(p, 'utf8');
  if (!raw.trim()) throw new Error('empty config');
  return JSON.parse(raw);
}

 
 
function recoverOrphanPacks(cfg) {
  let recovered = 0;
  try {
    if (!fs.existsSync(PACKS_ROOT)) return 0;
    for (const dir of fs.readdirSync(PACKS_ROOT)) {
      if (!dir.startsWith('custom-')) continue;
      if (cfg.packs[dir]?.custom) continue;
      const full = path.join(PACKS_ROOT, dir);
      if (!fs.statSync(full).isDirectory()) continue;
      let version = DEFAULT_MC_VERSION;
      try {
        const man = JSON.parse(fs.readFileSync(path.join(full, 'installed.json'), 'utf8'));
        if (man.mcVersion) version = man.mcVersion;
      } catch {   }
      cfg.packs[dir] = { custom: true, name: dir.replace(/^custom-/, ''), version };
      recovered++;
    }
  } catch {   }
  return recovered;
}

function loadConfig() {
   
   
  let parsed = null;
  let usedBackup = false;
  try {
    parsed = readConfigFile(CONFIG_PATH);
  } catch {
    try { parsed = readConfigFile(CONFIG_PATH + '.bak'); usedBackup = true; } catch {   }
  }
  const cfg = { ...defaultConfig, ...(parsed || {}) };
  cfg.packs = cfg.packs || {};

   
   
  let removedLegacy = false;
  if (cfg.activeUuid && cfg.refreshToken) {
    delete cfg.refreshToken;
    removedLegacy = true;
  }

  migrateModSwitch(cfg);

  const recovered = recoverOrphanPacks(cfg);

   
   
  if (cfg.minRam === 2 && cfg.maxRam === 4 && RAM.max > 4) {
    cfg.minRam = RAM.min;
    cfg.maxRam = RAM.max;
  }

   
  if (!BUILTIN_PACKS[cfg.selectedPack] && !cfg.packs[cfg.selectedPack]?.custom) {
    cfg.selectedPack = 'daylight';
  }

   
   
  if (recovered > 0 || usedBackup || parsed === null || removedLegacy) {
    try { saveConfig(cfg); } catch {   }
  }
  return cfg;
}

 
 
function saveConfig(cfg) {
  fs.mkdirSync(path.dirname(CONFIG_PATH), { recursive: true });
  const data = JSON.stringify(cfg, null, 2);
  const tmp = CONFIG_PATH + '.tmp';
  fs.writeFileSync(tmp, data);
  try {
    if (fs.existsSync(CONFIG_PATH)) fs.copyFileSync(CONFIG_PATH, CONFIG_PATH + '.bak');
  } catch {   }
  fs.renameSync(tmp, CONFIG_PATH);  
}

let config = null;

 

const RUNTIME_DIR = path.join(GAME_ROOT, 'runtime');

 
const IS_WIN = process.platform === 'win32';
 
 
const JAVA_BIN = IS_WIN ? 'javaw.exe' : 'java';
 
const ADOPT_OS = IS_WIN ? 'windows' : process.platform === 'darwin' ? 'mac' : 'linux';
const ADOPT_ARCH = process.arch === 'arm64' ? 'aarch64' : 'x64';
const JRE_ARCHIVE_EXT = IS_WIN ? 'zip' : 'tar.gz';

 
function requiredJavaFor(mcVersion) {
  const head = Number(mcVersion.split('.')[0]);
  if (head >= 26) return 25;                     
  const m = mcVersion.match(/^1\.(\d+)(?:\.(\d+))?/);
  if (!m) return 21;
  const minor = Number(m[1]);
  const patch = Number(m[2] || 0);
  if (minor > 20 || (minor === 20 && patch >= 5)) return 21;
  if (minor >= 17) return 17;
  return 8;
}

 
 
function javaSearchRoots() {
  const home = require('os').homedir();
   
   
   
  const jetbrains = path.join(home, '.jdks');
  if (IS_WIN) {
    return [jetbrains, 'C:\\Program Files\\Eclipse Adoptium', 'C:\\Program Files\\Java',
      'C:\\Program Files\\Microsoft', 'C:\\Program Files\\Zulu'];
  }
  if (process.platform === 'darwin') {
    return [jetbrains, '/Library/Java/JavaVirtualMachines', path.join(home, 'Library/Java/JavaVirtualMachines'),
      '/opt/homebrew/opt/openjdk/libexec/openjdk.jdk', '/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk',
      '/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk'];
  }
   
  return [jetbrains, '/usr/lib/jvm', '/usr/lib64/jvm', '/opt/java', '/opt',
    path.join(home, '.sdkman/candidates/java')];
}

 
function javaBinIn(dir) {
  if (process.platform === 'darwin') {
    const nested = path.join(dir, 'Contents', 'Home', 'bin', JAVA_BIN);
    if (fs.existsSync(nested)) return nested;
  }
  return path.join(dir, 'bin', JAVA_BIN);
}

 
 
 
 
 
 
 
function maxJavaFor(mcVersion) {
  return Number(mcVersion.split('.')[0]) >= 26 ? 99 : 23;
}

async function findSystemJava(need, max) {
  return chooseJava(await javaCandidates(javaSearchRoots()), need, max);
}

 
async function findManagedJava(need, max, roots = [
  path.join(RUNTIME_DIR, `${ADOPT_OS}-${ADOPT_ARCH}`, `jdk-${need}`),
  path.join(RUNTIME_DIR, `jdk-${need}`)  
]) {
  return chooseJava(await javaCandidates(roots), need, max);
}

 
 
 
 
function extractArchive(archive, dest) {
  const { execFile } = require('child_process');
  return new Promise((resolve, reject) => {
    execFile('tar', ['-xf', archive, '-C', dest], { windowsHide: true }, err => {
      if (!err) return resolve();
      if (!IS_WIN) return reject(new Error('Could not extract Java runtime (tar failed): ' + err.message));
      execFile('powershell', ['-NoProfile', '-Command',
        `Expand-Archive -LiteralPath '${archive.replace(/'/g,"''")}' -DestinationPath '${dest.replace(/'/g,"''")}' -Force`], { windowsHide: true },
        err2 => err2 ? reject(new Error('Could not extract Java runtime: ' + err2.message)) : resolve());
    });
  });
}

 
 
 
async function ensureJava(mcVersion, progress) {
  const need = requiredJavaFor(mcVersion);
  const max = maxJavaFor(mcVersion);
  progress(`Checking Java ${need} (${process.arch})`, 0, 1);
  if (config.javaPath) return validateJava(config.javaPath, need, max);
  const found = await findManagedJava(need, max) || await findSystemJava(need, max);
  if (found) return found;

  progress(`Downloading Java ${need}`, 0, 1);
  const url = `https://api.adoptium.net/v3/binary/latest/${need}/ga/${ADOPT_OS}/${ADOPT_ARCH}/jre/hotspot/normal/eclipse`;
  const res = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(10 * 60 * 1000) });
  if (!res.ok) throw new Error(`Java ${need} download failed (HTTP ${res.status}) — set a Java path in Settings`);
  const total = Number(res.headers.get('content-length')) || 0;

  const runtimeBase = path.join(RUNTIME_DIR, `${ADOPT_OS}-${ADOPT_ARCH}`);
  await fs.promises.mkdir(runtimeBase, { recursive: true });
  const staging = await fs.promises.mkdtemp(path.join(runtimeBase, `install-${need}-`));
  const archivePath = path.join(staging, `runtime.${JRE_ARCHIVE_EXT}`);
  const extracted = path.join(staging, 'extracted');
  try {
    const { Transform } = require('stream');
    let got = 0;
    const meter = new Transform({ transform(chunk, encoding, done) {
      got += chunk.length;
      if (total) progress(`Downloading Java ${need}`, got, total);
      done(null, chunk);
    }});
    await pipeline(Readable.fromWeb(res.body), meter, fs.createWriteStream(archivePath));
    progress(`Installing Java ${need}`, 1, 1);
    await fs.promises.mkdir(extracted);
    await extractArchive(archivePath, extracted);
    const exe = await findManagedJava(need, max, [extracted]);
    if (!exe) throw new Error('Downloaded Java has no usable runtime for this CPU');
    const destination = path.join(runtimeBase, `jdk-${need}`);
    const previous = destination + '.previous-' + crypto.randomUUID();
    let backedUp = false;
    try { await fs.promises.rename(destination, previous); backedUp = true; }
    catch (err) { if (err.code !== 'ENOENT') throw err; }
    try { await fs.promises.rename(extracted, destination); }
    catch (err) { if (backedUp) await fs.promises.rename(previous, destination); throw err; }
     
    return path.join(destination, path.relative(extracted, exe));
  } finally { await fs.promises.rm(staging, { recursive: true, force: true }); }
}

 

function makeAuthManager() {
  if (config.azureClientId) {
    return new Auth({
      client_id: config.azureClientId,
      redirect: 'http://localhost',
      prompt: 'select_account'
    });
  }
  return new Auth('select_account');
}

function profileFromToken(token) {
  return { name: token.profile.name, uuid: token.profile.id };
}

function accountByUuid(uuid) {
  return config.accounts.find(a => a.uuid === uuid);
}

 
function listAccounts() {
  return config.accounts.map(a => ({
    uuid: a.uuid,
    name: a.name,
    active: a.uuid === config.activeUuid
  }));
}

 
 
async function addAccount() {
  const authManager = makeAuthManager();
  const xboxManager = await authManager.launch('electron');
  minecraftToken = await xboxManager.getMinecraft();
  tokenTime = Date.now();
  const profile = profileFromToken(minecraftToken);
  const refreshToken = xboxManager.save();
  const existing = accountByUuid(profile.uuid);
  if (existing) {
    existing.name = profile.name;
    existing.refreshToken = refreshToken;
  } else {
    config.accounts.push({ uuid: profile.uuid, name: profile.name, refreshToken });
  }
  config.activeUuid = profile.uuid;
  saveConfig(config);
  return profile;
}

 
async function switchAccount(uuid) {
  const acc = accountByUuid(uuid);
  if (!acc) throw new Error('Unknown account');
  const authManager = makeAuthManager();
  const xboxManager = await authManager.refresh(acc.refreshToken);
  minecraftToken = await xboxManager.getMinecraft();
  tokenTime = Date.now();
  acc.refreshToken = xboxManager.save();
  acc.name = minecraftToken.profile.name;
  config.activeUuid = uuid;
  saveConfig(config);
  return profileFromToken(minecraftToken);
}

function removeAccount(uuid) {
  config.accounts = config.accounts.filter(a => a.uuid !== uuid);
  if (config.activeUuid === uuid) {
    config.activeUuid = config.accounts[0]?.uuid || '';
    minecraftToken = null;
  }
  saveConfig(config);
}

async function trySilentLogin() {
   
   
  if (!config.activeUuid && config.refreshToken) {
    try {
      const xboxManager = await makeAuthManager().refresh(config.refreshToken);
      minecraftToken = await xboxManager.getMinecraft();
      tokenTime = Date.now();
      const profile = profileFromToken(minecraftToken);
      config.accounts.push({
        uuid: profile.uuid,
        name: profile.name,
        refreshToken: xboxManager.save()
      });
      config.activeUuid = profile.uuid;
      delete config.refreshToken;
      saveConfig(config);
      return profile;
    } catch {
      delete config.refreshToken;
      saveConfig(config);
      return null;
    }
  }

  if (!config.activeUuid) return null;
  try {
    return await switchAccount(config.activeUuid);
  } catch {
    return null;  
  }
}

 
 
 
async function fixSession() {
  if (config.activeUuid) {
    try {
      return await switchAccount(config.activeUuid);
    } catch {   }
  }
  return addAccount();
}

 
 
 
 
 
 
 
 
 
 
 
 
let bridgePort = 0;
const bridgeSecret = crypto.randomBytes(24).toString('hex');

 
function pemBody(pem) {
  return String(pem).replace(/-----[^-]+-----/g, '').replace(/\s+/g, '');
}











async function fetchCertificate() {
  if (!config.activeUuid) throw new Error('No account is signed in');
  await switchAccount(config.activeUuid);           
  const t = minecraftToken.mclc();
  const res = await fetch('https://api.minecraftservices.com/player/certificates', {
    method: 'POST',
    headers: { Authorization: `Bearer ${t.access_token}` }
  });
  if (!res.ok) throw new Error(`Mojang refused the certificate (HTTP ${res.status})`);
  const cert = await res.json();
  if (!cert.keyPair || !cert.publicKeySignatureV2) {
    throw new Error('Mojang returned no usable certificate');
  }
  return {
    uuid: t.uuid,
    expiresAt: Date.parse(cert.expiresAt),
     
     
    keySignature: cert.publicKeySignatureV2,
    publicKey: pemBody(cert.keyPair.publicKey),
    privateKey: pemBody(cert.keyPair.privateKey)
  };
}

function startSessionBridge() {
  const server = http.createServer((req, res) => {
    const reply = (obj) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(obj));
    };
    const known = ['/refresh-session', '/certificate'];
    if (req.method !== 'POST' || !known.includes(req.url)
        || req.headers['x-daylight-secret'] !== bridgeSecret) {
      res.writeHead(403);
      res.end();
      return;
    }
    (async () => {
      if (req.url === '/certificate') return fetchCertificate();
      if (!config.activeUuid) throw new Error('No account is signed in');
      await switchAccount(config.activeUuid);  
      const t = minecraftToken.mclc();
      return { accessToken: t.access_token, uuid: t.uuid, name: t.name };
    })()
      .then(data => reply({ ok: true, ...data }))
      .catch(err => reply({ ok: false, error: err.message || String(err) }));
  });
  server.on('error', () => { bridgePort = 0; });  
  server.listen(0, '127.0.0.1', () => { bridgePort = server.address().port; });
}

 

async function fetchJson(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
  return res.json();
}

const VERSIONS_CACHE = path.join(GAME_ROOT, 'versions-cache.json');

async function getGameVersions() {
  try {
    const versions = await fetchJson(`${FABRIC_META}/versions/game`);
    const stable = versions.filter(v => v.stable && supportedVersion(v.version)).map(v => v.version);
    try {
      fs.mkdirSync(GAME_ROOT, { recursive: true });
      fs.writeFileSync(VERSIONS_CACHE, JSON.stringify(stable));
    } catch {   }
    return stable;
  } catch (err) {
     
     
    try {
      return JSON.parse(fs.readFileSync(VERSIONS_CACHE, 'utf8')).filter(supportedVersion);
    } catch {
      throw err;
    }
  }
}

async function getLatestLoader() {
  const loaders = await fetchJson(`${FABRIC_META}/versions/loader`);
  const stable = loaders.find(l => l.stable) || loaders[0];
  return stable.version;
}

async function ensureFabricProfile(mcVersion) {
  const loaderVersion = await getLatestLoader();
  const id = `fabric-loader-${loaderVersion}-${mcVersion}`;
  const jsonPath = path.join(GAME_ROOT, 'versions', id, `${id}.json`);
  if (!fs.existsSync(jsonPath)) {
    const profile = await fetchJson(
      `${FABRIC_META}/versions/loader/${mcVersion}/${loaderVersion}/profile/json`
    );
    fs.mkdirSync(path.dirname(jsonPath), { recursive: true });
    fs.writeFileSync(jsonPath, JSON.stringify(profile, null, 2));
  }
  return id;
}

 
 
 
 
 
 
 
 
 
 
 

const FORGE_PROMOS = 'https://files.minecraftforge.net/net/minecraftforge/forge/promotions_slim.json';
const FORGE_MAVEN = 'https://maven.minecraftforge.net/net/minecraftforge/forge';
const NEOFORGE_MAVEN = 'https://maven.neoforged.net/releases/net/neoforged/neoforge';
const LOADERS_INDEX = path.join(GAME_ROOT, 'loaders.json');

function readLoadersIndex() {
  try {
    return JSON.parse(fs.readFileSync(LOADERS_INDEX, 'utf8'));
  } catch {
    return {};
  }
}

function writeLoadersIndex(index) {
  try {
    fs.writeFileSync(LOADERS_INDEX, JSON.stringify(index, null, 2));
  } catch {   }
}

 
 
async function resolveForgeVersion(mcVersion) {
  const promos = await fetchJson(FORGE_PROMOS);
  const v = promos?.promos?.[`${mcVersion}-recommended`] || promos?.promos?.[`${mcVersion}-latest`];
  if (!v) throw new Error(`Forge has no build for Minecraft ${mcVersion}`);
  return v;
}

 
async function resolveNeoForgeVersion(mcVersion) {
  const parts = mcVersion.split('.');
  if (parts[0] !== '1' || parts.length < 2) throw new Error(`NeoForge has no build for Minecraft ${mcVersion}`);
  const prefix = `${parts[1]}.${parts[2] || '0'}.`;

  const res = await fetch(`${NEOFORGE_MAVEN}/maven-metadata.xml`);
  if (!res.ok) throw new Error(`NeoForge version list unavailable (HTTP ${res.status})`);
  const xml = await res.text();
  const all = [...xml.matchAll(/<version>([^<]+)<\/version>/g)].map(m => m[1]);

  const stable = all.filter(v => v.startsWith(prefix) && !v.includes('beta'));
  const usable = stable.length ? stable : all.filter(v => v.startsWith(prefix));
  if (!usable.length) throw new Error(`NeoForge has no build for Minecraft ${mcVersion}`);

   
  usable.sort((a, b) => (parseInt(a.slice(prefix.length), 10) || 0) - (parseInt(b.slice(prefix.length), 10) || 0));
  return usable[usable.length - 1];
}

 
 
function ensureLauncherProfiles() {
  const p = path.join(GAME_ROOT, 'launcher_profiles.json');
  if (!fs.existsSync(p)) {
    fs.mkdirSync(GAME_ROOT, { recursive: true });
    fs.writeFileSync(p, JSON.stringify({ profiles: {}, settings: {}, version: 3 }, null, 2));
  }
}

function listVersionIds() {
  const dir = path.join(GAME_ROOT, 'versions');
  try {
    return fs.readdirSync(dir).filter(f => fs.existsSync(path.join(dir, f, `${f}.json`)));
  } catch {
    return [];
  }
}

 
 
function consoleJava(javaPath) {
  const alt = javaPath.replace(/javaw\.exe$/i, 'java.exe');
  return fs.existsSync(alt) ? alt : javaPath;
}

function runInstaller(javaPath, installerPath) {
  const { execFile } = require('child_process');
  return new Promise((resolve, reject) => {
    execFile(
      consoleJava(javaPath),
      ['-jar', installerPath, '--installClient', GAME_ROOT],
      { cwd: GAME_ROOT, maxBuffer: 16 * 1024 * 1024, windowsHide: true },
      (err, stdout, stderr) => {
        if (err) {
          const tail = String(stderr || stdout || '').trim().split('\n').slice(-6).join('\n');
          return reject(new Error(`Loader install failed:\n${tail || err.message}`));
        }
        resolve(String(stdout || ''));
      }
    );
  });
}






async function ensureLoaderProfile(pack, javaPath, progress) {
  if (pack.loader === 'fabric') return ensureFabricProfile(pack.version);

  const label = LOADER_LABEL[pack.loader];
  const key = `${pack.loader}-${pack.version}`;
  const index = readLoadersIndex();
  const known = index[key];
  if (known && fs.existsSync(path.join(GAME_ROOT, 'versions', known, `${known}.json`))) return known;

  progress(`Finding ${label} for ${pack.version}…`, 0, 1);
  const isNeo = pack.loader === 'neoforge';
  const loaderVersion = isNeo
    ? await resolveNeoForgeVersion(pack.version)
    : await resolveForgeVersion(pack.version);
  const installerUrl = isNeo
    ? `${NEOFORGE_MAVEN}/${loaderVersion}/neoforge-${loaderVersion}-installer.jar`
    : `${FORGE_MAVEN}/${pack.version}-${loaderVersion}/forge-${pack.version}-${loaderVersion}-installer.jar`;

  const cacheDir = path.join(GAME_ROOT, 'loader-installers');
  fs.mkdirSync(cacheDir, { recursive: true });
  const installerPath = path.join(cacheDir, path.basename(installerUrl));

  progress(`Downloading ${label} ${loaderVersion}…`, 0, 1);
  if (!fs.existsSync(installerPath)) await downloadFile(installerUrl, installerPath);

  progress(`Installing ${label} ${loaderVersion} (this takes a minute)…`, 0, 1);
  ensureLauncherProfiles();
  const before = new Set(listVersionIds());
  try {
    await runInstaller(javaPath, installerPath);
  } catch (err) {
     
    fs.rmSync(installerPath, { force: true });
    throw err;
  }

   
   
   
  const added = listVersionIds().filter(id => !before.has(id));
  const marker = isNeo ? 'neoforge' : 'forge';
  const expected = isNeo ? `neoforge-${loaderVersion}` : `${pack.version}-forge-${loaderVersion}`;
  const id = added.find(v => v.toLowerCase().includes(marker))
     
     
    || (fs.existsSync(path.join(GAME_ROOT, 'versions', expected, `${expected}.json`)) ? expected : null);
  if (!id) throw new Error(`${label} installed but no version profile appeared — check the launcher log`);

  index[key] = id;
  writeLoadersIndex(index);
  return id;
}

 
 
 
 
 
 
function loaderJvmArgs(versionId, mcVersion) {
  const jsonPath = path.join(GAME_ROOT, 'versions', versionId, `${versionId}.json`);
  let profile;
  try {
    profile = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  } catch {
    return [];
  }
  const jvm = profile.arguments && profile.arguments.jvm;
  if (!Array.isArray(jvm)) return [];
  const libDir = path.resolve(path.join(GAME_ROOT, 'libraries'));
  return jvm
     
    .filter(arg => typeof arg === 'string')
    .map(arg => arg
      .split('${library_directory}').join(libDir)
      .split('${classpath_separator}').join(path.delimiter)
      .split('${version_name}').join(mcVersion));
}

 

function packDef(id) {
  const builtin = BUILTIN_PACKS[id];
  const state = config.packs[id] || {};
  if (!builtin && !state.custom) return null;
  const version = builtin?.pinnedVersion || state.version || DEFAULT_MC_VERSION;
   
  const loader = builtin ? 'fabric' : (LOADERS.includes(state.loader) ? state.loader : 'fabric');
  const fabric = loader === 'fabric';
  return {
    id,
    tags: state.tags || [],
    artwork: state.artwork || '',
    minRam: state.minRam ?? null,
    maxRam: state.maxRam ?? null,
    effectiveMaxRam: state.maxRam ?? config.maxRam,
    jvmArgs: state.jvmArgs || '',
    name: builtin ? builtin.name : state.name,
    desc: builtin
      ? builtin.desc
      : (fabric ? 'Custom pack · Daylight + FPS mods included' : `Custom ${LOADER_LABEL[loader]} pack · FPS mods included`),
    version,
    loader,
    loaderLabel: LOADER_LABEL[loader],
    pinned: !!builtin?.pinnedVersion,
    modrinth: PERF_MODS[loader],
     
     
     
    bundled: fabric && state.daylightMod !== false,
    daylightMod: state.daylightMod !== false,
    builtin: !!builtin,
     
     
    hasMod: fabric && !!modBuildFor(version)
  };
}

function packDir(id) {
  return path.join(PACKS_ROOT, id);
}

function packModsDir(id) {
  return path.join(packDir(id), 'mods');
}

function packResourcePacksDir(id) {
  return path.join(packDir(id), 'resourcepacks');
}

function listPacks() {
  const ids = [...Object.keys(BUILTIN_PACKS), ...Object.keys(config.packs).filter(id => config.packs[id].custom)];
  return ids.map(id => {
    const def = packDef(id);
    const mods = listMods(id);
    return { ...def, modCount: mods.length, selected: config.selectedPack === id };
  });
}

function listMods(packId) {
  const dir = packModsDir(packId);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.jar'))
    .map(f => ({ file: f, builtin: f === DAYLIGHT_JAR }));
}

async function downloadFile(url, dest, sha1) {
  const temporary = dest + '.' + crypto.randomUUID() + '.partial';
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(300000) });
    if (!res.ok) throw new Error(`Download failed: HTTP ${res.status}`);
    await pipeline(Readable.fromWeb(res.body), fs.createWriteStream(temporary));
    if (sha1 && await fileHash(temporary) !== sha1) throw new Error('Downloaded file failed its integrity check');
    await fs.promises.rename(temporary, dest);
  } finally { await fs.promises.rm(temporary, { force: true }); }
}

 
 
function loadManifest(packId) {
  try {
    const m = JSON.parse(fs.readFileSync(path.join(packDir(packId), 'installed.json'), 'utf8'));
    m.files = m.files || {};
    m.removed = m.removed || [];  
    m.manual = m.manual || {};  
    return m;
  } catch {
    return { mcVersion: null, files: {}, removed: [], manual: {} };
  }
}

function saveManifest(packId, manifest) {
  const file=path.join(packDir(packId),'installed.json');
  fs.writeFileSync(file+'.tmp',JSON.stringify(manifest,null,2));
  fs.renameSync(file+'.tmp',file);
}

async function resolveModrinthFile(slug, mcVersion, loader = 'fabric') {
  const versions = await fetchJson(
    `${MODRINTH_API}/project/${slug}/version?game_versions=${encodeURIComponent(JSON.stringify([mcVersion]))}&loaders=${encodeURIComponent(JSON.stringify([loader]))}`
  );
  if (!versions.length) return null;
  return versions[0].files.find(f => f.primary) || versions[0].files[0];
}

 
 
function sameContents(a, b) {
  try {
    const ha = crypto.createHash('sha1').update(fs.readFileSync(a)).digest('hex');
    const hb = crypto.createHash('sha1').update(fs.readFileSync(b)).digest('hex');
    return ha === hb;
  } catch {
    return false;
  }
}

async function ensurePackReady(pack, progress) {
  const modsDir = packModsDir(pack.id);
  fs.mkdirSync(modsDir, { recursive: true });
  const manifest = loadManifest(pack.id);

   
   
  if (manifest.mcVersion && (manifest.mcVersion !== pack.version || (manifest.loader && manifest.loader !== pack.loader))) {
    for (const file of Object.values(manifest.files)) {
      const p = path.join(modsDir, file);
      if (fs.existsSync(p)) fs.unlinkSync(p);
    }
    manifest.files = {};
  }
  manifest.mcVersion = pack.version;
  manifest.loader = pack.loader;

  const slugs = pack.modrinth;
  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i];
    if (manifest.removed.includes(slug)) continue;  
    const existing = manifest.files[slug];
    if (existing && fs.existsSync(path.join(modsDir, existing))) continue;
    progress(`Installing ${slug} (${i + 1}/${slugs.length})`, i, slugs.length);
    const file = await resolveModrinthFile(slug, pack.version, pack.loader);
    if (!file) continue;  
    await downloadFile(file.url, path.join(modsDir, file.filename));
    manifest.files[slug] = file.filename;
  }

   
   
   
   
   
   
  const dest = path.join(modsDir, DAYLIGHT_JAR);
  const buildJar = modBuildFor(pack.version);
  if (pack.bundled && buildJar) {
    const src = path.join(BUNDLED_DIR, buildJar);
     
     
     
    if (fs.existsSync(src) && (!fs.existsSync(dest) || !sameContents(src, dest))) {
      fs.copyFileSync(src, dest);
    }
  } else if (fs.existsSync(dest)) {
    fs.unlinkSync(dest);
  }

  saveManifest(pack.id, manifest);
}

 

async function searchMods(query, packId) {
  const pack = packDef(packId || config.selectedPack);
  const manifest = loadManifest(pack.id);
  const modsDir = packModsDir(pack.id);
  const existing = await installedProjects(modsDir);
  const facets = JSON.stringify([
    ['project_type:mod'],
    [`categories:${pack.loader}`],
    [`versions:${pack.version}`]
  ]);
   
  const data = await fetchJson(
    `${MODRINTH_API}/search?query=${encodeURIComponent(query)}&limit=60&facets=${encodeURIComponent(facets)}`
  );
  return data.hits.map(h => ({
    id: h.project_id,
    title: h.title,
    description: h.description,
    downloads: h.downloads,
    icon: h.icon_url,
    installed: !!existing[h.project_id] || !!(manifest.files[h.slug] && fs.existsSync(path.join(modsDir, manifest.files[h.slug]))) || !!(manifest.manual[h.project_id]
      && fs.existsSync(path.join(modsDir, manifest.manual[h.project_id])))
  }));
}

 
 
 
 
 

async function searchResourcePacks(query, packId) {
  const pack = packDef(packId || config.selectedPack);
  const facets = JSON.stringify([
    ['project_type:resourcepack'],
    [`versions:${pack.version}`]
  ]);
   
  const data = await fetchJson(
    `${MODRINTH_API}/search?query=${encodeURIComponent(query)}&limit=60&facets=${encodeURIComponent(facets)}`
  );
  return data.hits.map(h => ({
    id: h.project_id,
    title: h.title,
    description: h.description,
    downloads: h.downloads,
    icon: h.icon_url
  }));
}

async function resolveResourcePackFile(projectId, mcVersion) {
  const versions = await fetchJson(
    `${MODRINTH_API}/project/${projectId}/version?game_versions=${encodeURIComponent(JSON.stringify([mcVersion]))}`
  );
  if (!versions.length) return null;
  return versions[0].files.find(f => f.primary) || versions[0].files[0];
}

async function installResourcePack(projectId, packId) {
  const pack = packDef(packId || config.selectedPack);
  const file = await resolveResourcePackFile(projectId, pack.version);
  if (!file) throw new Error('No build of this resource pack for ' + pack.version);
  const dir = packResourcePacksDir(pack.id);
  fs.mkdirSync(dir, { recursive: true });
  await downloadFile(file.url, path.join(dir, file.filename));
  return file.filename;
}

function listResourcePacks(packId) {
  const dir = packResourcePacksDir(packId);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.zip') || fs.statSync(path.join(dir, f)).isDirectory())
    .map(f => ({ file: f }));
}

async function installMod(projectId, packId) {
  const pack = packDef(packId || config.selectedPack);
  return inPack(pack.id, () => installModOnce(projectId, pack));
}

async function fileHash(file) {
  const hash = crypto.createHash('sha1');
  for await (const chunk of fs.createReadStream(file)) hash.update(chunk);
  return hash.digest('hex');
}

async function installModOnce(projectId, pack) {
  if (activePackId === pack.id) throw new Error('Close Minecraft before installing mods into this instance');
  const existing = await installedProjects(packModsDir(pack.id));
  const recorded = loadManifest(pack.id).manual[projectId];
  const current = existing[projectId] || (recorded && fs.existsSync(path.join(packModsDir(pack.id), recorded)) ? recorded : null);
  if (current) return { filename: current, alreadyInstalled: true };
  const modsDir = packModsDir(pack.id);
  const plan = await dependencyPlan(projectId, { version:pack.version,loader:pack.loader,fetchJson,api:MODRINTH_API,installed:existing,
    matchesInstalled:async (name,file) => await fileHash(path.join(modsDir,name)) === file.hashes.sha1 });
  await fs.promises.mkdir(modsDir, { recursive: true });
  const stage = await fs.promises.mkdtemp(path.join(modsDir,'.daylight-install-'));
  const added = [];
  try {
     
    let cursor = 0;
    const results = await Promise.allSettled(Array.from({length:Math.min(3,plan.length)},async()=>{
      while(cursor<plan.length){ const item=plan[cursor++]; await downloadFile(item.file.url,path.join(stage,item.file.filename),item.file.hashes.sha1); }
    }));
    const failed = results.find(result => result.status === 'rejected');
    if (failed) throw failed.reason;
    for (const item of plan) {
      const target=path.join(modsDir,item.file.filename);
      if(fs.existsSync(target)) {
        if(await fileHash(target)!==item.file.hashes.sha1) throw Error(`A different file named ${item.file.filename} already exists`);
      } else { await fs.promises.copyFile(path.join(stage,item.file.filename),target,fs.constants.COPYFILE_EXCL); added.push(target); }
    }
    const manifest=loadManifest(pack.id);
    for(const item of plan)manifest.manual[item.projectId]=item.file.filename;
    saveManifest(pack.id,manifest);
  } catch(err) {
    await Promise.all(added.map(file=>fs.promises.rm(file,{force:true})));
    throw err;
  } finally { await fs.promises.rm(stage,{recursive:true,force:true}); }
  const file = plan.find(item=>item.projectId===projectId)?.file || plan.at(-1)?.file;
  if (!file) throw new Error('No mod file was resolved');
  const alreadyInstalled = added.length === 0;

   
   
  const manifest = loadManifest(pack.id);
  manifest.manual[projectId] = file.filename;
  if (manifest.removed.length) {
    try {
      const { slug } = await fetchJson(`${MODRINTH_API}/project/${projectId}`);
      const i = manifest.removed.indexOf(slug);
      if (i !== -1) {
        manifest.removed.splice(i, 1);
        manifest.files[slug] = file.filename;
        saveManifest(pack.id, manifest);
      }
    } catch {   }
  }
  saveManifest(pack.id, manifest);
  return { filename: file.filename, alreadyInstalled };
}

 

 
function newPackId(name) {
  const base = 'custom-' + name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  let id = base || 'custom-pack';
  let n = 2;
  while (packDef(id)) id = `${base}-${n++}`;
  return id;
}

 
 
function unwrapSingleFolder(dir) {
  const entries = fs.readdirSync(dir);
  if (entries.length === 1) {
    const inner = path.join(dir, entries[0]);
    if (fs.statSync(inner).isDirectory()) return inner;
  }
  return dir;
}










async function importModpack(progress) {
  const { canceled, filePaths } = await require('electron').dialog.showOpenDialog(win, {
    title: 'Import a modpack',
    properties: ['openFile'],
    filters: [{ name: 'Modpacks', extensions: ['mrpack', 'zip'] }]
  });
  if (canceled) return null;

  const src = filePaths[0];
  const tmp = path.join(GAME_ROOT, 'import-' + Date.now());
  fs.mkdirSync(tmp, { recursive: true });

  try {
    progress('Reading pack…', 0, 1);
    await extractArchive(src, tmp);
    const root = unwrapSingleFolder(tmp);

    const mrIndex = path.join(root, 'modrinth.index.json');
    const cfManifest = path.join(root, 'manifest.json');

    let name = path.basename(src).replace(/\.(mrpack|zip)$/i, '');
    let version = DEFAULT_MC_VERSION;
    let loader = 'fabric';
    let files = [];
    let overrides = [];
    let note = '';

    if (fs.existsSync(mrIndex)) {
      const idx = JSON.parse(fs.readFileSync(mrIndex, 'utf8'));
      name = idx.name || name;
      version = idx.dependencies?.minecraft || version;
       
      if (idx.dependencies?.neoforge) loader = 'neoforge';
      else if (idx.dependencies?.forge) loader = 'forge';
      files = (idx.files || []).filter(f => f.downloads?.length);
      overrides = ['overrides', 'client-overrides'];
    } else if (fs.existsSync(cfManifest)) {
      const man = JSON.parse(fs.readFileSync(cfManifest, 'utf8'));
      name = man.name || name;
      version = man.minecraft?.version || version;
       
      const modLoader = man.minecraft?.modLoaders?.[0]?.id || '';
      if (modLoader.startsWith('neoforge')) loader = 'neoforge';
      else if (modLoader.startsWith('forge')) loader = 'forge';
      overrides = [man.overrides || 'overrides'];
      if (man.files?.length) {
        note = `${man.files.length} mods are listed by CurseForge project id, not a download URL — add them from the Mods tab.`;
      }
    } else {
       
      overrides = ['.'];
      if (!fs.existsSync(path.join(root, 'mods'))) {
        note = 'No mods folder found in that zip — check the pack contents.';
      }
    }

    const id = newPackId(name);
    const dir = packDir(id);
    fs.mkdirSync(dir, { recursive: true });

     
    for (const o of overrides) {
      const from = path.resolve(root, o);
      if (!fs.existsSync(from)) continue;
      for (const entry of fs.readdirSync(from)) {
         
        if (['modrinth.index.json', 'manifest.json', 'modlist.html'].includes(entry)) continue;
        fs.cpSync(path.join(from, entry), path.join(dir, entry), { recursive: true });
      }
    }

     
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      progress(`Downloading ${path.basename(f.path)} (${i + 1}/${files.length})`, i, files.length);
      const dest = path.join(dir, f.path);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      try {
        await downloadFile(f.downloads[0], dest);
      } catch {   }
    }

    config.packs[id] = { custom: true, name, version, loader };
    config.selectedPack = id;
    saveConfig(config);

    return { id, name, version, loader: LOADER_LABEL[loader], mods: listMods(id).length, note };
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

 

let releasesCache = null;
let releasesCacheAt = 0;
const RELEASES_TTL = 10 * 60 * 1000;  

 
async function getReleases() {
  if (releasesCache && Date.now() - releasesCacheAt < RELEASES_TTL) return releasesCache;
  const { owner, repo } = require('../package.json').build.publish;
  const data = await fetchJson(`https://api.github.com/repos/${owner}/${repo}/releases?per_page=25`);
  releasesCache = data
    .filter(r => !r.draft)
    .map(r => ({
      tag: r.tag_name,
      name: r.name || r.tag_name,
      date: r.published_at,
      body: (r.body || '').trim()
    }));
  releasesCacheAt = Date.now();
  return releasesCache;
}

 
async function importMods(packId) {
  const pack = packDef(packId || config.selectedPack);
  if (!pack) throw new Error('Unknown pack');
  const { canceled, filePaths } = await require('electron').dialog.showOpenDialog(win, {
    title: `Add mods to ${pack.name}`,
    properties: ['openFile', 'multiSelections'],
    filters: [{ name: 'Fabric mods', extensions: ['jar'] }]
  });
  if (canceled) return [];
  const modsDir = packModsDir(pack.id);
  fs.mkdirSync(modsDir, { recursive: true });
  const added = [];
  for (const src of filePaths) {
    if (!src.toLowerCase().endsWith('.jar')) continue;
    fs.copyFileSync(src, path.join(modsDir, path.basename(src)));
    added.push(path.basename(src));
  }
  return added;
}

 

 
 
const SESSION_ERROR_RE = /invalid session|invalidcredentialsexception|(status|http|error)\s*:?\s*401/i;

async function launchGame() {
  if (!minecraftToken) throw new Error('Not logged in');
  if (gameRunning || gameStarting) throw new Error('Minecraft is already running or starting');
  gameStarting = true;
  activePackId = config.selectedPack;
  try { return await launchSelectedGame(); }
  finally { gameStarting = false; if (!gameRunning) activePackId = null; }
}

async function launchSelectedGame() {
  let lastProgress = 0;
  const send = (ch, data) => {
    if (ch === 'launch-progress') {
      const now = Date.now();
      if (now - lastProgress < 80 && data.current !== data.total) return;
      lastProgress = now;
    }
    if (win && !win.isDestroyed()) win.webContents.send(ch, data);
  };
  const pack = packDef(config.selectedPack);
  if (!pack) throw new Error('No pack selected');
  const ram = memory(pack.minRam ?? config.minRam, pack.maxRam ?? config.maxRam);
  const flags = jvmArguments(pack.jvmArgs);

   
   
   
   
  if (config.activeUuid && Date.now() - tokenTime > 60 * 60 * 1000) {
    send('launch-progress', { label: 'Refreshing login…', current: 0, total: 1 });
    try {
      await switchAccount(config.activeUuid);
    } catch {   }
  }

  send('launch-progress', { label: 'Preparing pack…', current: 0, total: 1 });
  await inPack(pack.id, () => ensurePackReady(pack, (label, current, total) =>
    send('launch-progress', { label, current, total })
  ));

  const javaPath = await ensureJava(pack.version, (label, current, total) =>
    send('launch-progress', { label, current, total })
  );

   
   
  const versionId = await ensureLoaderProfile(pack, javaPath, (label, current, total) =>
    send('launch-progress', { label, current, total })
  );

  const launcher = new PlatformClient();
   
   
  let sessionErrorSent = false;
  const savedLog = await sessionLog(path.join(packDir(pack.id),'logs'), line => send('game-log',line), [bridgeSecret,minecraftToken.mclc().access_token]);
  const forwardLog = m => {
    const line = String(m);
    savedLog.write(line);
    if (!sessionErrorSent && SESSION_ERROR_RE.test(line)) {
      sessionErrorSent = true;
      send('session-invalid');
    }
  };
  launcher.on('debug', forwardLog);
  launcher.on('data', forwardLog);
  launcher.on('progress', e =>
    send('launch-progress', { label: `Downloading ${e.type}`, current: e.task, total: e.total })
  );
  launcher.on('download-status', e =>
    send('launch-progress', { label: `Downloading ${e.type}: ${e.name}`, current: e.current, total: e.total })
  );

   
   
   
  const bridgeArgs = bridgePort
    ? [`-Ddaylight.session.port=${bridgePort}`, `-Ddaylight.session.secret=${bridgeSecret}`]
    : [];

  const proc = await launcher.launch({
    root: GAME_ROOT,
    authorization: minecraftToken.mclc(),
    version: { number: pack.version, type: 'release', custom: versionId },
    memory: { min: `${Math.round(ram.min * 1024)}M`, max: `${Math.round(ram.max * 1024)}M` },
    customArgs: [...(flags.length ? flags : JVM_FLAGS), ...(process.platform === 'darwin' && Number(pack.version.split('.')[0]) >= 26 ? ['-XstartOnFirstThread'] : []), ...bridgeArgs, ...loaderJvmArgs(versionId, pack.version)],
    overrides: { gameDirectory: packDir(pack.id) },
    ...(javaPath ? { javaPath } : {})
  }).catch(err => { savedLog.end(); throw err; });

  if (!proc) { savedLog.end(); throw new Error('Failed to start Minecraft — check the instance logs'); }

  gameRunning = true;
  gameProcess = proc;
  send('game-state', 'running');
  proc.on('error', err => forwardLog(`Minecraft process error: ${err.message}`));
  proc.on('close', code => {
    gameRunning = false;
    gameProcess = null;
    activePackId = null;
    send('game-state', 'stopped');
    savedLog.write(`Minecraft exited with code ${code}`);
    savedLog.end();
    if (code !== 0) send('game-crash', { code, packName: pack.name });
  });
}

 

 
 
 
 
function describeError(err) {
  if (err instanceof Error && err.message) return err.message;
  if (typeof err === 'string') return lexicon.getCode(err);
  if (err && typeof err === 'object') {
    if (typeof err.ts === 'string') {
      const status = err.response && err.response.status;
      return lexicon.getCode(err.ts) + (status ? ` (HTTP ${status})` : '');
    }
    if (typeof err.message === 'string') return err.message;
    try {
      return JSON.stringify(err);
    } catch {   }
  }
  return String(err);
}

function handle(channel, fn) {
  ipcMain.handle(channel, async (_event, ...args) => {
    try {
      return { ok: true, data: await fn(...args) };
    } catch (err) {
      const message = describeError(err);
       
       
      writeStartupLog(`error ${channel}: ${message}`);
      return { ok: false, error: message };
    }
  });
}

handle('silent-login', () => trySilentLogin());
handle('list-accounts', () => listAccounts());
handle('add-account', () => addAccount());
handle('fix-session', () => fixSession());
handle('switch-account', uuid => switchAccount(uuid));
handle('remove-account', uuid => {
  removeAccount(uuid);
  return listAccounts();
});

handle('get-config', () => {
  const { accounts, activeUuid, refreshToken, ...visible } = config;
  return visible;
});
handle('set-config', updates => {
  const { accounts, activeUuid, refreshToken, packs, selectedPack, ...allowed } = updates;
  memory(allowed.minRam ?? config.minRam, allowed.maxRam ?? config.maxRam);
  config = { ...config, ...allowed };
  saveConfig(config);
});

handle('get-versions', () => getGameVersions());
const searchCatalog = remoteSearch(fetchJson, MODRINTH_API);
handle('local-index', () => localIndex(listPacks(), PACKS_ROOT));
handle('search-catalog', ({ query, packId }) => {
  const pack = packDef(packId);
  if (!pack) throw new Error('Select an instance first');
  return searchCatalog(query, pack);
});
handle('instance-options', ({ id, ...options }) => {
  if (!packDef(id)) throw new Error('Unknown instance');
  config.packs[id] = { ...config.packs[id], ...instanceOptions(options) };
  saveConfig(config);
});
handle('instance-artwork', async id => {
  if (!packDef(id)) throw new Error('Unknown instance');
  const { canceled, filePaths } = await require('electron').dialog.showOpenDialog(win, {
    title: 'Choose instance artwork', properties: ['openFile'], filters: [{ name: 'Images', extensions: ['png','jpg','jpeg','webp'] }]
  });
  if (canceled) return;
  const stat = await fs.promises.stat(filePaths[0]);
  if (stat.size > 12 * 1024 * 1024) throw new Error('Choose an image smaller than 12 MB');
  const art = nativeImage.createFromBuffer(await fs.promises.readFile(filePaths[0]));
  if (art.isEmpty()) throw new Error('This image could not be read');
  const dimensions=art.getSize();
  const ratio=Math.min(1,640/dimensions.width,360/dimensions.height);
  const artwork = art.resize({ width:Math.max(1,Math.round(dimensions.width*ratio)),height:Math.max(1,Math.round(dimensions.height*ratio)) }).toDataURL();
  config.packs[id] = { ...config.packs[id], artwork };
  saveConfig(config);
});
handle('open-instance-logs', async id => {
  if (!packDef(id)) throw new Error('Unknown instance');
  const dir = path.join(packDir(id), 'logs');
  await fs.promises.mkdir(dir, { recursive: true });
  return shell.openPath(dir);
});

handle('list-packs', () => listPacks());
 
 
 
handle('restore-packs', () => {
  config = loadConfig();
  writeStartupLog('restore-packs');
  return listPacks();
});
handle('select-pack', id => {
  if (!packDef(id)) throw new Error('Unknown pack');
  config.selectedPack = id;
  saveConfig(config);
});
handle('create-pack', ({ name, version, loader }) => {
  if (!supportedVersion(version)) throw new Error('Choose Minecraft 1.19 or newer');
  const id = 'custom-' + name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  if (!id || packDef(id)) throw new Error('A pack with that name already exists');
  config.packs[id] = { custom: true, name, version, loader: LOADERS.includes(loader) ? loader : 'fabric' };
  config.selectedPack = id;
  saveConfig(config);
  return id;
});
handle('import-modpack', () => {
  const send = (ch, data) => win && !win.isDestroyed() && win.webContents.send(ch, data);
  return importModpack((label, current, total) =>
    send('launch-progress', { label, current, total })
  );
});
handle('get-releases', () => getReleases());
handle('delete-pack', id => inPack(id, () => {
  if (activePackId === id) throw new Error('Close Minecraft before deleting its instance');
  if (!config.packs[id]?.custom) throw new Error('Built-in packs cannot be deleted');
  delete config.packs[id];
  if (config.selectedPack === id) config.selectedPack = 'daylight';
  saveConfig(config);
  fs.rmSync(packDir(id), { recursive: true, force: true });
}));
handle('get-loaders', () => LOADERS.map(id => ({ id, label: LOADER_LABEL[id] })));
handle('set-pack-loader', ({ id, loader }) => inPack(id, () => {
  if (activePackId === id) throw new Error('Close Minecraft before changing its loader');
  const def = packDef(id);
  if (!def) throw new Error('Unknown pack');
  if (def.builtin) throw new Error('Built-in packs always run on Fabric');
  if (!LOADERS.includes(loader)) throw new Error('Unknown mod loader');
  config.packs[id] = { ...config.packs[id], loader };
  saveConfig(config);
}));
handle('set-pack-mod', ({ id, enabled }) => {
  const def = packDef(id);
  if (!def) throw new Error('Unknown pack');
  config.packs[id] = { ...config.packs[id], daylightMod: !!enabled };
  saveConfig(config);
});
handle('set-pack-version', ({ id, version }) => inPack(id, () => {
  if (activePackId === id) throw new Error('Close Minecraft before changing its version');
  if (!supportedVersion(version)) throw new Error('Choose Minecraft 1.19 or newer');
  const def = packDef(id);
  if (!def) throw new Error('Unknown pack');
  if (def.pinned) throw new Error('This pack is pinned to ' + def.version);
  config.packs[id] = { ...config.packs[id], version };
  saveConfig(config);
}));

handle('launch', () => launchGame());
handle('search-mods', ({ query, packId }) => searchMods(query, packId));
handle('install-mod', ({ projectId, packId }) => installMod(projectId, packId));
handle('import-mods', packId => importMods(packId));
handle('list-mods', packId => listMods(packId || config.selectedPack));
handle('delete-mod', ({ filename, packId }) => {
  const base = path.basename(filename);
  if (base === DAYLIGHT_JAR) throw new Error('The Daylight mod is built-in and cannot be removed');
  const id = packId || config.selectedPack;
  const target = path.join(packModsDir(id), base);
  if (fs.existsSync(target)) fs.unlinkSync(target);

   
   
   
  const manifest = loadManifest(id);
  const slug = Object.keys(manifest.files).find(s => manifest.files[s] === base);
  const manualId = Object.keys(manifest.manual).find(id => manifest.manual[id] === base);
  if (slug) {
    delete manifest.files[slug];
    if (!manifest.removed.includes(slug)) manifest.removed.push(slug);
  }
  if (manualId) delete manifest.manual[manualId];
  if (slug || manualId) saveManifest(id, manifest);
});
handle('open-mods-folder', packId => {
  const dir = packModsDir(packId || config.selectedPack);
  fs.mkdirSync(dir, { recursive: true });
  shell.openPath(dir);
});

handle('search-resourcepacks', ({ query, packId }) => searchResourcePacks(query, packId));
handle('install-resourcepack', ({ projectId, packId }) => installResourcePack(projectId, packId));
handle('list-resourcepacks', packId => listResourcePacks(packId || config.selectedPack));
handle('delete-resourcepack', ({ filename, packId }) => {
  const base = path.basename(filename);
  const target = path.join(packResourcePacksDir(packId || config.selectedPack), base);
  if (fs.existsSync(target)) fs.rmSync(target, { recursive: true, force: true });
});
handle('open-resourcepacks-folder', packId => {
  const dir = packResourcePacksDir(packId || config.selectedPack);
  fs.mkdirSync(dir, { recursive: true });
  shell.openPath(dir);
});
handle('open-game-folder', () => {
  fs.mkdirSync(GAME_ROOT, { recursive: true });
  shell.openPath(GAME_ROOT);
});

handle('check-updates', () => {
  if (!app.isPackaged || app.getVersion().includes('-')) throw new Error('Automatic updates are disabled in this local preview. Install a tested release manually.');
  return autoUpdater.checkForUpdates();
});
handle('install-update', () => {
  if (!app.isPackaged || IS_PREVIEW) throw new Error('Automatic updates are disabled in this local preview.');
  return autoUpdater.quitAndInstall();
});
handle('get-app-version', () => app.getVersion());
handle('get-env', () => ({
  version: app.getVersion(),
  sandboxed: IS_SANDBOXED,
  preview: IS_PREVIEW,
  root: GAME_ROOT
}));

 

let tray = null;
let quitting = false;

function showWindow() {
  if (!win) return;
  if (win.isMinimized()) win.restore();
  win.show();
  win.focus();
   
   
  if (!win.webContents.isLoading()) win.webContents.send('refresh-data');
}

 
 
 
 
function writeStartupLog(event = 'startup') {
  try {
    const line = `[${new Date().toISOString()}] ${event} v${app.getVersion()} `
      + `exe=${process.execPath} root=${GAME_ROOT}${IS_SANDBOXED ? ' SANDBOXED' : ''} `
      + `packs=${Object.keys(config.packs || {}).join(',') || '(none)'} `
      + `accounts=${(config.accounts || []).length} selected=${config.selectedPack}\n`;
    fs.appendFileSync(path.join(app.getPath('userData'), 'startup.log'), line);
  } catch {   }
}

 
ipcMain.on('window-control', (_e, action) => {
  if (!win || win.isDestroyed()) return;
  if (action === 'minimize') win.minimize();
  else if (action === 'maximize') win.isMaximized() ? win.unmaximize() : win.maximize();
  else if (action === 'close') win.close();  
});

function createWindow() {
  win = new BrowserWindow({
    width: 1120,
    height: 710,
    minWidth: 940,
    minHeight: 620,
    backgroundColor: '#08090c',
    frame: false,             
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'assets', 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  win.loadFile(path.join(__dirname, 'renderer', 'index.html'));

   
  win.on('close', e => {
    if (!quitting) {
      e.preventDefault();
      win.hide();
    }
  });
}

function createTray() {
  const icon = nativeImage.createFromPath(path.join(__dirname, 'assets', 'tray.png'));
  tray = new Tray(icon);
  tray.setToolTip(IS_PREVIEW ? 'Daylight Preview' : 'Daylight');
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: IS_PREVIEW ? 'Open Daylight Preview' : 'Open Daylight', click: showWindow },
    { type: 'separator' },
    { label: 'Quit', click: () => { quitting = true; app.quit(); } }
  ]));
  tray.on('click', showWindow);
}

 

function initUpdater() {
  const send = (ch, data) => win && !win.isDestroyed() && win.webContents.send(ch, data);
  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = true;
  autoUpdater.on('update-available', info => send('update-available', info.version));
  autoUpdater.on('update-not-available', () => send('update-none'));
  autoUpdater.on('download-progress', p => send('update-progress', Math.round(p.percent)));
  autoUpdater.on('update-downloaded', info => send('update-ready', info.version));
  autoUpdater.on('error', err => send('update-error', String(err?.message || err)));
  autoUpdater.checkForUpdates().catch(() => {});
}

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  app.on('second-instance', showWindow);
  app.on('activate', () => { if (win) showWindow(); else createWindow(); });

  app.whenReady().then(() => {
    config = loadConfig();
    writeStartupLog();
    startSessionBridge();
    createWindow();
    createTray();
    if (app.isPackaged && !app.getVersion().includes('-')) initUpdater();
  });
}

app.on('before-quit', () => {
  quitting = true;
});

app.on('window-all-closed', () => {
  if (quitting) app.quit();
   
});

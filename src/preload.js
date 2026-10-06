const { contextBridge, ipcRenderer } = require('electron');

const invoke = (channel, ...args) => ipcRenderer.invoke(channel, ...args);
const on = (channel, cb) => ipcRenderer.on(channel, (_e, data) => cb(data));

contextBridge.exposeInMainWorld('daylight', {
  silentLogin: () => invoke('silent-login'),
  listAccounts: () => invoke('list-accounts'),
  addAccount: () => invoke('add-account'),
  switchAccount: uuid => invoke('switch-account', uuid),
  removeAccount: uuid => invoke('remove-account', uuid),
  fixSession: () => invoke('fix-session'),
  getConfig: () => invoke('get-config'),
  setConfig: updates => invoke('set-config', updates),
  getVersions: () => invoke('get-versions'),

  listPacks: () => invoke('list-packs'),
  localIndex: () => invoke('local-index'),
  searchCatalog: opts => invoke('search-catalog', opts),
  instanceOptions: opts => invoke('instance-options', opts),
  instanceArtwork: id => invoke('instance-artwork', id),
  openInstanceLogs: id => invoke('open-instance-logs', id),
  onGameCrash: cb => on('game-crash', cb),
  restorePacks: () => invoke('restore-packs'),
  importModpack: () => invoke('import-modpack'),
  getReleases: () => invoke('get-releases'),
  selectPack: id => invoke('select-pack', id),
  createPack: opts => invoke('create-pack', opts),
  deletePack: id => invoke('delete-pack', id),
  setPackVersion: opts => invoke('set-pack-version', opts),
  setPackLoader: opts => invoke('set-pack-loader', opts),
  setPackMod: opts => invoke('set-pack-mod', opts),
  getLoaders: () => invoke('get-loaders'),

  launch: () => invoke('launch'),
  searchMods: (query, packId) => invoke('search-mods', { query, packId }),
  installMod: (projectId, packId) => invoke('install-mod', { projectId, packId }),
  importMods: packId => invoke('import-mods', packId),
  listMods: packId => invoke('list-mods', packId),
  deleteMod: (filename, packId) => invoke('delete-mod', { filename, packId }),
  openModsFolder: packId => invoke('open-mods-folder', packId),
  openGameFolder: () => invoke('open-game-folder'),

  searchResourcePacks: (query, packId) => invoke('search-resourcepacks', { query, packId }),
  installResourcePack: (projectId, packId) => invoke('install-resourcepack', { projectId, packId }),
  listResourcePacks: packId => invoke('list-resourcepacks', packId),
  deleteResourcePack: (filename, packId) => invoke('delete-resourcepack', { filename, packId }),
  openResourcePacksFolder: packId => invoke('open-resourcepacks-folder', packId),

  checkUpdates: () => invoke('check-updates'),
  installUpdate: () => invoke('install-update'),
  getAppVersion: () => invoke('get-app-version'),
  getEnv: () => invoke('get-env'),
  windowControl: action => ipcRenderer.send('window-control', action),

  onProgress: cb => on('launch-progress', cb),
  onGameLog: cb => on('game-log', cb),
  onGameState: cb => on('game-state', cb),
  onSessionInvalid: cb => on('session-invalid', cb),
  onUpdateAvailable: cb => on('update-available', cb),
  onUpdateNone: cb => on('update-none', cb),
  onRefreshData: cb => on('refresh-data', cb),
  onUpdateProgress: cb => on('update-progress', cb),
  onUpdateReady: cb => on('update-ready', cb),
  onUpdateError: cb => on('update-error', cb)
});

const $ = id => document.getElementById(id);

let profile = null;
let launching = false;
let gameRunning = false;
let packs = [];
let versions = [];
 
 
let loaders = [{ id: 'fabric', label: 'Fabric' }];
let modsPackId = null;  

 

function toast(msg, isError = false) {
  const el = $('toast');
  el.textContent = msg;
  el.classList.toggle('error', isError);
  el.classList.remove('hidden');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.add('hidden'), 4000);
}

async function call(fn, ...args) {
  const res = await window.daylight[fn](...args);
  if (!res.ok) throw new Error(res.error);
  return res.data;
}

 
 
 
let logBuffer = '';
let logFlushTimer = null;
function flushLog() {
  logFlushTimer = null;
  const log = $('log');
  let text = log.textContent + logBuffer;
  logBuffer = '';
  if (text.length > 120000) text = text.slice(-90000);
  log.textContent = text;
  log.scrollTop = log.scrollHeight;
}
function appendLog(line) {
  logBuffer += line.endsWith('\n') ? line : line + '\n';
  if (logBuffer.length > 120000) logBuffer = logBuffer.slice(-90000);
  if (!logFlushTimer) logFlushTimer = setTimeout(flushLog, 150);
}

function selectedPack() {
  return packs.find(p => p.selected);
}

 

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    $('tab-' + btn.dataset.tab).classList.add('active');
    if (btn.dataset.tab === 'mods') refreshModsTab();
    if (btn.dataset.tab === 'resourcepacks') refreshRpTab();
    if (btn.dataset.tab === 'packs') renderPackGrid();
  });
});

 

document.querySelectorAll('.win-btn').forEach(btn => {
  btn.addEventListener('click', () => window.daylight.windowControl(btn.dataset.win));
});

 

let accounts = [];

function renderAccount() {
  $('acct-avatar').hidden = !profile;
  $('acct-avatar').src = profile
    ? `https://mc-heads.net/avatar/${profile.uuid}/28`
    : '';
  $('acct-name').textContent = profile ? profile.name : 'Not logged in';
  updatePlayButton();
}

function renderAccountMenu() {
  const listEl = $('acct-list');
  listEl.innerHTML = '';
  for (const acc of accounts) {
    const row = document.createElement('div');
    row.className = 'acct-row' + (acc.active ? ' active' : '');

    const img = document.createElement('img');
    img.src = `https://mc-heads.net/avatar/${acc.uuid}/24`;
    const name = document.createElement('span');
    name.className = 'acct-row-name';
    name.textContent = acc.name;
    row.append(img, name);

    if (acc.active) {
      const dot = document.createElement('span');
      dot.className = 'acct-active-dot';
      row.append(dot);
    }

    const remove = document.createElement('button');
    remove.className = 'acct-remove';
    remove.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
    remove.title = 'Remove account';
    remove.addEventListener('click', async e => {
      e.stopPropagation();
      accounts = await call('removeAccount', acc.uuid);
      if (acc.active) {
         
        const next = accounts.find(a => a.active);
        profile = next ? await call('switchAccount', next.uuid).catch(() => null) : null;
      }
      renderAccount();
      renderAccountMenu();
    });
    row.append(remove);

    if (!acc.active) {
      row.addEventListener('click', async () => {
        try {
          profile = await call('switchAccount', acc.uuid);
          accounts = await call('listAccounts');
          renderAccount();
          renderAccountMenu();
          closeAccountMenu();
          toast(`Switched to ${profile.name}`);
        } catch (err) {
          toast('Switch failed: ' + err.message, true);
        }
      });
    }
    listEl.append(row);
  }
}

function openAccountMenu() {
  renderAccountMenu();
  $('acct-menu').classList.remove('hidden');
}
function closeAccountMenu() {
  $('acct-menu').classList.add('hidden');
}

$('acct-current').addEventListener('click', e => {
  e.stopPropagation();
  $('acct-menu').classList.contains('hidden') ? openAccountMenu() : closeAccountMenu();
});
document.addEventListener('click', e => {
  if (!e.target.closest('.acct-switcher')) closeAccountMenu();
});

$('acct-add').addEventListener('click', async () => {
  try {
    $('acct-add').textContent = 'Signing in…';
    profile = await call('addAccount');
    accounts = await call('listAccounts');
    renderAccount();
    renderAccountMenu();
    toast(`Signed in as ${profile.name}`);
  } catch (err) {
     
    if (!/closed by user/i.test(err.message)) toast('Login failed: ' + err.message, true);
  } finally {
    $('acct-add').textContent = '+ Add account';
  }
});

 
 
async function fixSession(btn) {
  const oldText = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Fixing…';
  try {
    profile = await call('fixSession');
    accounts = await call('listAccounts');
    renderAccount();
    renderAccountMenu();
    $('session-bar').classList.add('hidden');
    if (gameRunning) {
      toast(`Session fixed for ${profile.name} — close and relaunch Minecraft to apply`);
    } else {
      toast(`Session fixed for ${profile.name} — launching…`);
      doLaunch();
    }
  } catch (err) {
    toast('Could not fix the session: ' + err.message, true);
  } finally {
    btn.disabled = false;
    btn.textContent = oldText;
  }
}

$('acct-fix').addEventListener('click', e => {
  e.stopPropagation();
  fixSession(e.currentTarget);
});
$('fix-session-btn').addEventListener('click', e => fixSession(e.currentTarget));

 
window.daylight.onSessionInvalid(() => {
  $('session-bar').classList.remove('hidden');
  toast('Minecraft reported an invalid session — click "Fix login" to repair it', true);
});

function updatePlayButton() {
  const btn = $('play-btn');
  if (gameRunning) {
    btn.disabled = true;
    btn.textContent = 'RUNNING…';
  } else if (launching) {
    btn.disabled = true;
    btn.textContent = 'LAUNCHING…';
  } else if (!profile) {
    btn.disabled = true;
    btn.textContent = 'LOG IN TO PLAY';
  } else {
    btn.disabled = false;
    btn.textContent = 'LAUNCH';
  }
}

 

async function refreshPacks() {
  packs = await call('listPacks');
  const select = $('pack-select');
  select.innerHTML = '';
  for (const p of packs) {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = p.name;
    select.append(opt);
  }
  const sel = selectedPack();
  if (sel) {
    select.value = sel.id;
    $('pack-version').textContent = `Minecraft ${sel.version} · ${sel.loaderLabel} · ${sel.modCount} mods`;
    $('selected-instance-name').textContent = sel.name;
  }
  renderDashboard();
  return packs.length;
}

 
 
async function refreshPacksReliable(tries = 6) {
  for (let i = 0; i < tries; i++) {
    try {
      const n = await refreshPacks();
      if (n > 0) return;
    } catch {   }
    await new Promise(r => setTimeout(r, 800));
  }
}

 
window.daylight.onRefreshData(async () => {
  await refreshPacksReliable();
  try {
    profile = await call('silentLogin');
    accounts = await call('listAccounts');
    renderAccount();
  } catch {   }
});

$('pack-select').addEventListener('change', async e => {
  await call('selectPack', e.target.value);
  await refreshPacks();
});

 
 
async function restorePacks(sourceBtn) {
  sourceBtn.disabled = true;
  sourceBtn.classList.add('spin');
  try {
    packs = await call('restorePacks');
    renderPackGrid();
    await refreshPacks();
    toast(`Packs restored — ${packs.length} pack${packs.length === 1 ? '' : 's'} found`);
  } catch (err) {
    toast('Restore failed: ' + err.message, true);
  } finally {
    sourceBtn.disabled = false;
    sourceBtn.classList.remove('spin');
  }
}
$('restore-packs-btn').addEventListener('click', e => restorePacks(e.currentTarget));
$('restore-packs-home').addEventListener('click', e => restorePacks(e.currentTarget));

 
$('import-pack-btn').addEventListener('click', async e => {
  const btn = e.currentTarget;
  btn.disabled = true;
  btn.textContent = 'Importing…';
  $('progress-wrap').classList.remove('hidden');
  try {
    const res = await call('importModpack');
    if (res) {
      toast(`Imported ${res.name} — Minecraft ${res.version}, ${res.mods} mods`);
      if (res.note) toast(res.note, true);
      await refreshPacks();
      renderPackGrid();
    }
  } catch (err) {
    toast('Import failed: ' + err.message, true);
  } finally {
    $('progress-wrap').classList.add('hidden');
    btn.disabled = false;
    btn.textContent = '↓ Import modpack';
  }
});

 

let releases = [];
let releaseIndex = 0;

function renderRelease() {
  if (!releases.length) return;
  const r = releases[releaseIndex];
  $('update-name').textContent = r.name;
  $('update-date').textContent = r.date ? new Date(r.date).toLocaleDateString() : '';
   
  $('update-body').textContent = r.body
    ? r.body.replace(/^#+\s*/gm, '').replace(/\*\*/g, '').trim()
    : 'No notes for this release.';
  $('update-count').textContent = `${releaseIndex + 1} / ${releases.length}`;
  $('update-newer').disabled = releaseIndex === 0;
  $('update-older').disabled = releaseIndex >= releases.length - 1;
  $('update-pager').classList.toggle('hidden', releases.length < 2);
}

$('update-newer').addEventListener('click', () => {
  if (releaseIndex > 0) { releaseIndex--; renderRelease(); }
});
$('update-older').addEventListener('click', () => {
  if (releaseIndex < releases.length - 1) { releaseIndex++; renderRelease(); }
});

async function loadReleases() {
  try {
    releases = await call('getReleases');
    if (releases.length) renderRelease();
    else { $('update-name').textContent = 'You’re all caught up'; $('update-body').textContent = 'Release notes will appear here.'; }
  } catch {
    $('update-name').textContent = 'Updates';
    $('update-body').textContent = 'Could not load release notes — check your connection.';
  }
}

function packCard(p) {
  const card = document.createElement('div');
  card.className = 'pack-card' + (p.selected ? ' selected' : '');

  const head = document.createElement('div');
  head.style.display = 'flex';
  head.style.justifyContent = 'space-between';
  head.style.alignItems = 'center';
  const h3 = document.createElement('h3');
  h3.textContent = p.name;
  head.append(h3);
  if (p.selected) {
    const badge = document.createElement('span');
    badge.className = 'pack-badge';
    badge.textContent = 'SELECTED';
    head.append(badge);
  }

  const desc = document.createElement('div');
  desc.className = 'pack-desc';
  desc.textContent = p.desc;

   
   
  if (!p.hasMod) {
    const warn = document.createElement('div');
    warn.className = 'pack-nomod';
    warn.textContent = p.loader === 'fabric'
      ? `No Daylight mod for ${p.version} — performance mods only`
      : `The Daylight mod is Fabric-only — this ${p.loaderLabel} pack gets performance mods only`;
    desc.append(warn);
  }

  const meta = document.createElement('div');
  meta.className = 'pack-meta';
  if (p.pinned) {
    meta.textContent = `Minecraft ${p.version} · ${p.loaderLabel} · ${p.modCount} mods`;
  } else {
    const label = document.createElement('span');
    label.textContent = 'MC';
    const verSel = document.createElement('select');
    for (const v of versions) {
      const opt = document.createElement('option');
      opt.value = v;
      opt.textContent = v;
      verSel.append(opt);
    }
    verSel.value = p.version;
    verSel.addEventListener('click', e => e.stopPropagation());
    verSel.addEventListener('change', async e => {
      try {
        await call('setPackVersion', { id: p.id, version: e.target.value });
        await refreshPacks();
        renderPackGrid();
      } catch (err) {
        toast(err.message, true);
      }
    });
    const count = document.createElement('span');
    count.textContent = `· ${p.modCount} mods`;
    meta.append(label, verSel, count);

     
     
    const loaderSel = document.createElement('select');
    for (const l of loaders) {
      const opt = document.createElement('option');
      opt.value = l.id;
      opt.textContent = l.label;
      loaderSel.append(opt);
    }
    loaderSel.value = p.loader;
     
    loaderSel.disabled = p.builtin;
    if (p.builtin) loaderSel.title = 'Built-in packs always run on Fabric';
    loaderSel.addEventListener('click', e => e.stopPropagation());
    loaderSel.addEventListener('change', async e => {
      try {
        await call('setPackLoader', { id: p.id, loader: e.target.value });
        await refreshPacks();
        renderPackGrid();
      } catch (err) {
        toast(err.message, true);
      }
    });
    meta.append(loaderSel);
  }

   
   
   
  if (p.loader === 'fabric' && p.hasMod) {
    const row = document.createElement('label');
    row.className = 'pack-mod';
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.checked = p.daylightMod !== false;
    row.append(box, document.createTextNode('Daylight mod'));
    row.addEventListener('click', e => e.stopPropagation());
    box.addEventListener('change', async e => {
      try {
        await call('setPackMod', { id: p.id, enabled: e.target.checked });
        await refreshPacks();
        renderPackGrid();
      } catch (err) {
        toast(err.message, true);
        e.target.checked = !e.target.checked;
      }
    });
    card.append(head, desc, meta, row);
  } else {
    card.append(head, desc, meta);
  }

  if (!p.builtin) {
    const actions = document.createElement('div');
    actions.className = 'pack-actions';
    const del = document.createElement('button');
    del.className = 'btn btn-small btn-danger';
    del.textContent = 'Delete';
    del.addEventListener('click', async e => {
      e.stopPropagation();
      if (!confirm(`Delete ${p.name} and all of its files, including worlds? This cannot be undone.`)) return;
      try {
        await call('deletePack', p.id);
        await refreshPacks();
        renderPackGrid();
      } catch (err) {
        toast(err.message, true);
      }
    });
    actions.append(del);
    card.append(actions);
  }

  card.addEventListener('click', async () => {
    await call('selectPack', p.id);
    await refreshPacks();
    renderPackGrid();
  });

  return card;
}

function renderPackGrid() {
  const grid = $('pack-grid');
  grid.innerHTML = '';
  for (const p of packs) grid.append(instanceCard(p));

  const add = document.createElement('div');
  add.className = 'pack-card new-pack';
  add.textContent = '+ New instance';
  add.addEventListener('click', () => {
    const verSel = $('new-pack-version');
    verSel.innerHTML = '';
    for (const v of (versions.length ? versions : ['1.21.11'])) {
      const opt = document.createElement('option');
      opt.value = v;
      opt.textContent = v;
      verSel.append(opt);
    }
    if (versions.includes('1.21.11')) verSel.value = '1.21.11';

    const loaderSel = $('new-pack-loader');
    loaderSel.innerHTML = '';
    for (const l of loaders) {
      const opt = document.createElement('option');
      opt.value = l.id;
      opt.textContent = l.label;
      loaderSel.append(opt);
    }
    loaderSel.value = 'fabric';
    const note = $('new-pack-note');
    const updateNote = () => {
      note.textContent = loaderSel.value === 'fabric'
        ? 'Includes the Daylight mod and the performance mod set.'
        : `${loaderSel.selectedOptions[0].textContent} packs get the performance mods — the Daylight mod is Fabric-only.`;
    };
    loaderSel.onchange = updateNote;
    updateNote();

    $('new-pack-name').value = '';
    $('pack-dialog').showModal();
  });
  grid.append(add);
}

$('pack-create-cancel').addEventListener('click', () => $('pack-dialog').close());
$('pack-create-ok').addEventListener('click', async () => {
  const name = $('new-pack-name').value.trim();
  if (!name) return toast('Give the pack a name', true);
  try {
    await call('createPack', {
      name,
      version: $('new-pack-version').value,
      loader: $('new-pack-loader').value
    });
    $('pack-dialog').close();
    await refreshPacks();
    renderPackGrid();
  } catch (err) {
    toast(err.message, true);
  }
});

 

async function doLaunch() {
  if (launching || gameRunning || !profile) return;
  launching = true;
  updatePlayButton();
  $('progress-wrap').classList.remove('hidden');
  logBuffer = '';
  $('log').textContent = '';
  $('log-card').classList.add('open');
  try {
    await call('launch');
  } catch (err) {
    toast('Launch failed: ' + err.message, true);
    appendLog('Launch failed: ' + err.message);
    launching = false;
    updatePlayButton();
  }
}

$('play-btn').addEventListener('click', doLaunch);

 

$('log-head').addEventListener('click', () => $('log-card').classList.toggle('open'));
$('log-clear').addEventListener('click', e => {
  e.stopPropagation();
  logBuffer = '';
  $('log').textContent = '';
});
$('log-settings').addEventListener('click', e => {
  e.stopPropagation();
  document.querySelector('.nav-btn[data-tab="settings"]').click();
});

window.daylight.onProgress(p => {
  const pct = p.total ? Math.min(100, Math.round((p.current / p.total) * 100)) : 0;
  $('progress-bar').style.width = pct + '%';
  $('progress-label').textContent = `${p.label} (${pct}%)`;
});

window.daylight.onGameLog(appendLog);

window.daylight.onGameState(state => {
  gameRunning = state === 'running';
  if (gameRunning) {
    launching = false;
    $('progress-bar').style.width = '100%';
    $('progress-label').textContent = 'Game running';
  } else {
    $('progress-wrap').classList.add('hidden');
  }
  updatePlayButton();
});

 

function modItem(children) {
  const li = document.createElement('li');
  li.className = 'mod-item';
  li.append(...children);
  return li;
}

 

const PER_PAGE = 20;

 
function resultCard(hit, onInstall) {
  const row = document.createElement('div');
  row.className = 'mod-item';

  const icon = document.createElement('img');
  icon.src = hit.icon || '';
  icon.alt = '';

  const meta = document.createElement('div');
  meta.className = 'mod-meta';
  const title = document.createElement('div');
  title.className = 'mod-title';
  title.textContent = hit.title;
  const desc = document.createElement('div');
  desc.className = 'mod-desc';
  const d = hit.description || '';
  desc.textContent = d.length > 90 ? d.slice(0, 90).trimEnd() + '…' : d;
  desc.title = d;
  meta.append(title, desc);

  const install = document.createElement('button');
  install.className = 'btn btn-small';
  install.disabled = !!hit.installed;
  install.textContent = hit.installed ? 'Installed' : 'Install';
  install.addEventListener('click', async () => {
    install.disabled = true;
    install.textContent = '…';
    try {
      await onInstall(hit.id);
      hit.installed = true;
      install.textContent = 'Installed';
    } catch (err) {
      toast(err.message, true);
      install.disabled = false;
      install.textContent = 'Install';
    }
  });

  row.append(icon, meta, install);
  return row;
}

 
 
function renderResultsPage(state, container, pager, onInstall) {
  container.innerHTML = '';
  const hits = state.hits;
  if (!hits.length) { pager.classList.add('hidden'); return; }
  const pageCount = Math.ceil(hits.length / PER_PAGE);
  state.page = Math.max(0, Math.min(state.page, pageCount - 1));
  for (const hit of hits.slice(state.page * PER_PAGE, state.page * PER_PAGE + PER_PAGE)) {
    container.append(resultCard(hit, onInstall));
  }

  pager.innerHTML = '';
  if (pageCount <= 1) { pager.classList.add('hidden'); return; }
  const prev = document.createElement('button');
  prev.textContent = 'Prev';
  prev.disabled = state.page === 0;
  prev.addEventListener('click', () => { state.page--; renderResultsPage(state, container, pager, onInstall); container.scrollIntoView({ block: 'nearest' }); });
  const info = document.createElement('span');
  info.className = 'pager-info';
  info.textContent = `Page ${state.page + 1} / ${pageCount}`;
  const next = document.createElement('button');
  next.textContent = 'Next';
  next.disabled = state.page >= pageCount - 1;
  next.addEventListener('click', () => { state.page++; renderResultsPage(state, container, pager, onInstall); container.scrollIntoView({ block: 'nearest' }); });
  pager.append(prev, info, next);
  pager.classList.remove('hidden');
}

function currentModsPack() {
  return packs.find(p => p.id === modsPackId) || selectedPack();
}

function refreshModsTab() {
  const select = $('mods-pack-select');
  if (!modsPackId || !packs.some(p => p.id === modsPackId)) {
    modsPackId = (selectedPack() || packs[0]).id;
  }
  select.innerHTML = '';
  for (const p of packs) {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = p.name;
    select.append(opt);
  }
  select.value = modsPackId;
  const pack = currentModsPack();
  $('mods-pack-version').textContent = pack ? `Minecraft ${pack.version}` : '';
  refreshInstalledMods();
  searchMods();
}

$('mods-pack-select').addEventListener('change', e => {
  modsPackId = e.target.value;
  const pack = currentModsPack();
  $('mods-pack-version').textContent = pack ? `Minecraft ${pack.version}` : '';
  $('mod-results').innerHTML = '';
  modSearch.hits = [];
  refreshInstalledMods();
  searchMods();
});

$('add-mod-btn').addEventListener('click', async () => {
  try {
    const added = await call('importMods', modsPackId);
    if (added.length) {
      toast(`Added ${added.length} mod${added.length > 1 ? 's' : ''} to ${currentModsPack().name}`);
      refreshInstalledMods();
      refreshPacks();
    }
  } catch (err) {
    toast(err.message, true);
  }
});

async function refreshInstalledMods() {
  const mods = await call('listMods', modsPackId);
  const list = $('mod-installed');
  list.innerHTML = '';
  if (!mods.length) {
    const li = document.createElement('li');
    li.className = 'mod-item';
    li.innerHTML = '<span class="mod-desc">No mods installed</span>';
    list.append(li);
    return;
  }
   
  mods.sort((a, b) => (b.builtin ? 1 : 0) - (a.builtin ? 1 : 0));
  for (const mod of mods) {
    const name = document.createElement('span');
    name.className = 'mod-file';
    name.textContent = mod.builtin ? 'Daylight (modules, HUD, freelook)' : mod.file;
    name.title = mod.file;

    if (mod.builtin) {
      const badge = document.createElement('span');
      badge.className = 'builtin-badge';
      badge.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg><span>Built-in</span>';
      list.append(modItem([name, badge]));
      continue;
    }

    const del = document.createElement('button');
    del.className = 'btn btn-small btn-danger';
    del.textContent = 'Remove';
    del.addEventListener('click', async () => {
      await call('deleteMod', mod.file, modsPackId);
      refreshInstalledMods();
      refreshPacks();
      searchMods();
    });

    list.append(modItem([name, del]));
  }
}

const modSearch = { hits: [], page: 0 };
async function searchMods() {
  const request = modSearch.request = (modSearch.request || 0) + 1;
  const targetPack = modsPackId;
  const query = $('mod-search').value.trim();
  const list = $('mod-results');
  const pager = $('mod-pager');
  list.innerHTML = '<div class="mod-item"><span class="mod-desc">Searching…</span></div>';
  pager.classList.add('hidden');
  try {
    const hits = await call('searchMods', query, targetPack);
    if (request !== modSearch.request) return;
    modSearch.hits = hits;
    modSearch.page = 0;
    if (!modSearch.hits.length) {
      list.innerHTML = '<div class="mod-item"><span class="mod-desc">No results for this version</span></div>';
      return;
    }
    renderResultsPage(modSearch, list, pager, async id => {
      const result = await call('installMod', id, targetPack);
      const file = result.filename;
      toast(`Installed ${file} → ${currentModsPack().name}`);
      refreshInstalledMods();
      refreshPacks();
    });
  } catch (err) {
    if (request !== modSearch.request) return;
    list.innerHTML = '';
    toast('Search failed: ' + err.message, true);
  }
}

$('mod-search-btn').addEventListener('click', searchMods);
$('mod-search').addEventListener('keydown', e => { if (e.key === 'Enter') searchMods(); });
$('open-mods-btn').addEventListener('click', () => call('openModsFolder', modsPackId));

 

let rpPackId = null;
const rpSearch = { hits: [], page: 0 };

function currentRpPack() {
  return packs.find(p => p.id === rpPackId) || selectedPack();
}

function refreshRpTab() {
  const select = $('rp-pack-select');
  if (!rpPackId || !packs.some(p => p.id === rpPackId)) {
    rpPackId = (selectedPack() || packs[0])?.id;
  }
  select.innerHTML = '';
  for (const p of packs) {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = p.name;
    select.append(opt);
  }
  if (rpPackId) select.value = rpPackId;
  const pack = currentRpPack();
  $('rp-pack-version').textContent = pack ? `Minecraft ${pack.version}` : '';
  refreshInstalledRp();
  searchResourcePacks();
}

$('rp-pack-select').addEventListener('change', e => {
  rpPackId = e.target.value;
  const pack = currentRpPack();
  $('rp-pack-version').textContent = pack ? `Minecraft ${pack.version}` : '';
  $('rp-results').innerHTML = '';
  $('rp-pager').classList.add('hidden');
  rpSearch.hits = [];
  refreshInstalledRp();
  searchResourcePacks();
});

async function refreshInstalledRp() {
  const installed = await call('listResourcePacks', rpPackId);
  const list = $('rp-installed');
  list.innerHTML = '';
  if (!installed.length) {
    const li = document.createElement('li');
    li.className = 'mod-item';
    li.innerHTML = '<span class="mod-desc">No resource packs installed</span>';
    list.append(li);
    return;
  }
  for (const rp of installed) {
    const name = document.createElement('span');
    name.className = 'mod-file';
    name.textContent = rp.file;
    name.title = rp.file;
    const del = document.createElement('button');
    del.className = 'btn btn-small btn-danger';
    del.textContent = 'Remove';
    del.addEventListener('click', async () => {
      await call('deleteResourcePack', rp.file, rpPackId);
      refreshInstalledRp();
    });
    list.append(modItem([name, del]));
  }
}

async function searchResourcePacks() {
  const request = rpSearch.request = (rpSearch.request || 0) + 1;
  const targetPack = rpPackId;
  const query = $('rp-search').value.trim();
  const list = $('rp-results');
  const pager = $('rp-pager');
  list.innerHTML = '<div class="mod-item"><span class="mod-desc">Searching…</span></div>';
  pager.classList.add('hidden');
  try {
    const hits = await call('searchResourcePacks', query, targetPack);
    if (request !== rpSearch.request) return;
    rpSearch.hits = hits;
    rpSearch.page = 0;
    if (!rpSearch.hits.length) {
      list.innerHTML = '<div class="mod-item"><span class="mod-desc">No results for this version</span></div>';
      return;
    }
    renderResultsPage(rpSearch, list, pager, async id => {
      const file = await call('installResourcePack', id, targetPack);
      toast(`Installed ${file} → ${packs.find(p => p.id === targetPack)?.name || targetPack}`);
      refreshInstalledRp();
    });
  } catch (err) {
    if (request !== rpSearch.request) return;
    list.innerHTML = '';
    toast('Search failed: ' + err.message, true);
  }
}

$('rp-search-btn').addEventListener('click', searchResourcePacks);
$('rp-search').addEventListener('keydown', e => { if (e.key === 'Enter') searchResourcePacks(); });
$('open-rp-btn').addEventListener('click', () => call('openResourcePacksFolder', rpPackId));

 

async function loadSettings() {
  const cfg = await call('getConfig');
  $('min-ram').value = cfg.minRam;
  $('max-ram').value = cfg.maxRam;
  $('java-path').value = cfg.javaPath;
  $('azure-id').value = cfg.azureClientId;
  const version = await call('getAppVersion');
  $('app-version').textContent = `(v${version})`;
  const sideVer = $('app-version-side');
  if (sideVer) sideVer.textContent = `Daylight v${version}`;
  if (version.includes('-')) {
    $('check-update-btn').disabled = true;
    $('update-status').textContent = 'Local preview — automatic updates disabled';
  }
}

$('save-settings').addEventListener('click', async () => {
  try {
  await call('setConfig', {
    minRam: Math.max(1, parseInt($('min-ram').value) || 2),
    maxRam: Math.max(1, parseInt($('max-ram').value) || 4),
    javaPath: $('java-path').value.trim(),
    azureClientId: $('azure-id').value.trim()
  });
  const note = $('settings-saved');
  note.classList.remove('hidden');
  setTimeout(() => note.classList.add('hidden'), 2000);
  await refreshPacks();
  } catch (err) { toast(err.message, true); }
});

$('open-game-dir').addEventListener('click', () => call('openGameFolder'));

 

$('check-update-btn').addEventListener('click', async () => {
  $('update-status').textContent = 'Checking…';
  try {
    await call('checkUpdates');
  } catch (err) {
    $('update-status').textContent = 'Check failed';
    toast(err.message, true);
  }
});

window.daylight.onUpdateAvailable(version => {
  $('update-status').textContent = `Downloading v${version}…`;
});

window.daylight.onUpdateNone(() => {
  $('update-status').textContent = 'Up to date';
});

window.daylight.onUpdateProgress(pct => {
  $('update-status').textContent = `Downloading update… ${pct}%`;
});

window.daylight.onUpdateReady(version => {
  $('update-status').textContent = `v${version} ready`;
  $('check-update-btn').textContent = 'Restart & update';
  $('check-update-btn').onclick = () => call('installUpdate');
  toast(`Update v${version} downloaded — restart to apply`);
});

window.daylight.onUpdateError(msg => {
  $('update-status').textContent = 'Update check failed';
});

 

 
 
async function loadVersions(attempt = 0) {
  try {
    try {
      const known = await call('getLoaders');
      if (known?.length) loaders = known;
    } catch {   }
    versions = await call('getVersions');
    if (versions.length) {
      if (document.getElementById('tab-packs').classList.contains('active')) renderPackGrid();
      return;
    }
  } catch {   }
  if (attempt < 6) setTimeout(() => loadVersions(attempt + 1), 5000);
}

(async function init() {
   
   
  try {
    const env = await call('getEnv');
    if (env.preview) {
      $('sandbox-badge').textContent = 'DAYLIGHT PREVIEW · separate instances';
      $('sandbox-badge').title = 'Local preview. Sign in separately; stable Daylight instances and worlds are untouched.';
    }
    if (env.sandboxed || env.preview) $('sandbox-badge').classList.remove('hidden');
  } catch {   }

   
   
   
  try { await loadSettings(); } catch {   }
  await refreshPacksReliable();

   
  loadVersions();
  loadReleases();

   
  try {
    profile = await call('silentLogin');
    accounts = await call('listAccounts');
  } catch {   }
  renderAccount();
})();

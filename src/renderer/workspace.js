 
function node(tag, cls, text) {
  const el = document.createElement(tag); if (cls) el.className = cls; if (text != null) el.textContent = text; return el;
}
function instanceCard(p) {
  const card = node('article', 'instance-card' + (p.selected ? ' selected' : ''));
  const art = node('div','instance-artwork');
  if (/^data:image\//.test(p.artwork || '')) { art.style.backgroundImage = `url("${p.artwork}")`; art.classList.add('custom-art'); }
  art.append(node('span','instance-label',p.selected ? '● SELECTED' : p.loaderLabel.toUpperCase()));
  const body = node('div','instance-body'), title = node('div','instance-title');
  const gear = node('button','instance-gear','⋯'); gear.title = `Settings for ${p.name}`; gear.setAttribute('aria-label',gear.title); gear.onclick = () => editInstance(p);
  title.append(node('h3','',p.name),gear);
  body.append(title,node('div','instance-meta',`${p.version} / ${p.loaderLabel} / ${p.modCount} mods`));
  const tags = node('div','instance-tags'); for (const tag of p.tags.length ? p.tags : [p.hasMod && p.daylightMod ? 'Daylight' : 'Custom']) tags.append(node('span','',tag));
  const bottom = node('div','instance-bottom'), select = node('button','instance-select',p.selected ? 'Selected ✓' : 'Select instance →');
  select.onclick = async () => { try { await call('selectPack',p.id); await refreshPacks(); renderPackGrid(); } catch(e) { toast(e.message,true); } };
  bottom.append(node('small','',`${p.effectiveMaxRam} GB RAM${p.jvmArgs ? ' · Custom JVM' : ''}`),select); body.append(tags,bottom); card.append(art,body); return card;
}
function renderDashboard() {
  const grid = document.getElementById('home-instance-grid'); grid.replaceChildren(...packs.map(instanceCard));
  document.getElementById('instance-count').textContent = String(packs.length);
}
let editingInstance;
async function editInstance(p) {
  editingInstance = p;
  $('instance-dialog-title').textContent = p.name; $('instance-error').textContent = '';
  $('instance-base-settings').replaceChildren(packCard(p));
  $('instance-tags').value = p.tags.join(', '); $('instance-jvm').value = p.jvmArgs;
  $('instance-memory-override').checked = p.minRam != null;
  $('instance-min').value = p.minRam ?? 2; $('instance-max').value = p.maxRam ?? p.effectiveMaxRam;
  updateMemoryFields(); $('instance-dialog').showModal();
}
function updateMemoryFields() { for (const id of ['instance-min','instance-max']) $(id).disabled = !$('instance-memory-override').checked; }
document.addEventListener('DOMContentLoaded', () => {
  $('new-instance-home').onclick = () => { renderPackGrid(); $('pack-grid').querySelector('.new-pack').click(); };
  $('instance-close').onclick = () => $('instance-dialog').close();
  $('instance-memory-override').onchange = updateMemoryFields;
  $('instance-art').onclick = async () => { try { await call('instanceArtwork',editingInstance.id); await refreshPacks(); renderPackGrid(); } catch(e) { $('instance-error').textContent = e.message; } };
  $('instance-logs').onclick = async () => { try { await call('openInstanceLogs',editingInstance.id); } catch(e) { $('instance-error').textContent = e.message; } };
  $('instance-save').onclick = async () => {
    try {
      await call('instanceOptions',{ id:editingInstance.id, tags:$('instance-tags').value, jvmArgs:$('instance-jvm').value,
        minRam:$('instance-memory-override').checked ? Number($('instance-min').value) : null,
        maxRam:$('instance-memory-override').checked ? Number($('instance-max').value) : null });
      await refreshPacks(); renderPackGrid(); $('instance-dialog').close(); toast('Instance settings saved');
    } catch(e) { $('instance-error').textContent = e.message; }
  };
  window.daylight.onGameCrash(({ code,packName }) => { toast(`${packName} exited unexpectedly (${code}). Open instance settings → Open logs.`,true); $('log-card').classList.add('open'); });
  setupGlobalSearch();
  document.querySelectorAll('.nav-btn').forEach(btn => btn.setAttribute('aria-label',btn.dataset.tip));
});

function setupGlobalSearch() {
  const dialog = $('global-search-dialog'), input = $('global-search'), results = $('global-results');
  let local = [], remote = [], generation = 0, openGeneration = 0, timer, remoteStatus = '', target;
  function section(label) { results.append(node('h4','',label)); }
  function hit(title, subtitle, action, badge) {
    const button = node('button','search-hit'), text = node('span','',title); text.append(node('small','',subtitle));
    button.append(text,node('em','',badge)); button.onclick = action; results.append(button);
  }
  function navigate(kind, packId, title = '') {
    dialog.close();
    if (kind === 'mods') { modsPackId = packId; $('mod-search').value = title; }
    else { rpPackId = packId; $('rp-search').value = title; }
    document.querySelector(`[data-tab="${kind}"]`).click();
  }
  function render() {
    results.replaceChildren(); const q = input.value.trim().toLowerCase();
    const instances = packs.filter(p => `${p.name} ${p.tags.join(' ')} ${p.version}`.toLowerCase().includes(q));
    if (instances.length) { section('INSTANCES'); for (const p of instances.slice(0,5)) hit(p.name,`${p.version} · ${p.loaderLabel}`,async () => { try { await call('selectPack',p.id); await refreshPacks(); dialog.close(); } catch(e) { toast(e.message,true); } },'Select'); }
    const files = local.filter(f => `${f.title} ${f.packName}`.toLowerCase().includes(q)).slice(0,14);
    if (files.length) { section('INSTALLED LOCALLY'); for (const f of files) hit(f.title,`${f.packName} · ${f.kind === 'mods' ? 'Mod' : 'Resource pack'}`,() => navigate(f.kind,f.packId),'Installed'); }
    section('MODRINTH · COMPATIBLE WITH ' + (target?.name || '').toUpperCase());
    for (const r of remote) hit(r.title,`${r.kind === 'mods' ? 'Mod / dependency' : 'Resource pack'} · ${r.description || ''}`,() => navigate(r.kind,target.id,r.title),'Browse →');
    if (remoteStatus) results.append(node('p','search-empty',remoteStatus));
  }
  function search() {
    const seq = ++generation; clearTimeout(timer); remote = []; remoteStatus = 'Searching Modrinth…'; render();
    timer = setTimeout(async () => {
      try { const found = await call('searchCatalog',{ query:input.value,packId:target.id }); if (seq !== generation || !dialog.open) return; remote = found; remoteStatus = found.length ? '' : 'No compatible projects found.'; }
      catch { if (seq !== generation) return; remoteStatus = 'Modrinth is unavailable. Your local files are still searchable.'; }
      render();
    },250);
  }
  async function open() {
    if (dialog.open) return;
    target = selectedPack(); if (!target) return;
    $('search-context').textContent = `All local instances · Remote target: ${target.name} / ${target.version} / ${target.loaderLabel}`;
    dialog.showModal(); input.value = ''; input.focus(); search();
    const opening = ++openGeneration;
    try { const index = await call('localIndex'); if (opening === openGeneration && dialog.open) { local = index; render(); } } catch(e) { toast('Local index: ' + e.message,true); }
  }
  input.oninput = search; $('global-search-open').onclick = open;
  $('global-search-close').onclick = () => dialog.close();
  dialog.addEventListener('close',() => { ++generation; ++openGeneration; clearTimeout(timer); });
  dialog.addEventListener('keydown',e => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    const buttons = [...results.querySelectorAll('button')]; if (!buttons.length) return;
    const i = buttons.indexOf(document.activeElement); buttons[(i + (e.key === 'ArrowDown' ? 1 : -1) + buttons.length) % buttons.length].focus(); e.preventDefault();
  });
  document.addEventListener('keydown',e => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); open(); } });
}

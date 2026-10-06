'use strict';
const fs = require('fs/promises');
const path = require('path');

 
async function localIndex(packs, root) {
  const rows = await Promise.all(packs.map(async pack => {
    const groups = await Promise.all(['mods', 'resourcepacks'].map(async kind => {
      try {
        const files = await fs.readdir(path.join(root, pack.id, kind), { withFileTypes: true });
        return files.filter(f => kind === 'mods' ? f.isFile() && /\.jar$/i.test(f.name) : f.isDirectory() || /\.zip$/i.test(f.name))
          .map(f => ({ title: f.name, packId: pack.id, packName: pack.name, kind, installed: true }));
      } catch (err) { if (err.code === 'ENOENT') return []; throw err; }
    }));
    return groups.flat();
  }));
  return rows.flat();
}

function remoteSearch(fetchJson, api) {
  const cache = new Map();
  return async (query, pack) => {
    const key = `${pack.version}:${pack.loader}:${String(query).slice(0, 160).trim().toLowerCase()}`;
    const cached = cache.get(key);
    if (cached && Date.now() - cached.time < 30000) return (await cached.promise).map(hit => ({ ...hit, packId: pack.id }));
    const promise = Promise.all(['mod', 'resourcepack'].map(async kind => {
      const facets = [[`project_type:${kind}`], [`versions:${pack.version}`]];
      if (kind === 'mod') facets.push([`categories:${pack.loader}`]);
      const data = await fetchJson(`${api}/search?query=${encodeURIComponent(String(query).slice(0,160))}&limit=8&facets=${encodeURIComponent(JSON.stringify(facets))}`);
      return data.hits.map(h => ({ id: h.project_id, title: h.title, description: h.description,
        kind: kind === 'mod' ? 'mods' : 'resourcepacks', packId: pack.id }));
    })).then(groups => groups.flat()).catch(err => { cache.delete(key); throw err; });
    if (cache.size >= 40) cache.delete(cache.keys().next().value);
    cache.set(key, { time: Date.now(), promise });
     
    return (await promise).map(hit => ({ ...hit, packId: pack.id }));
  };
}
module.exports = { localIndex, remoteSearch };

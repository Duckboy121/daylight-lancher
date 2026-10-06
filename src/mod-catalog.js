const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

 
const knownHashes = new Map();
async function installedProjects(dir, fetchImpl = fetch) {
  const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => /\.jar$/i.test(f)) : [];
  const byHash = new Map();
  for (const file of files) {
    const hash = crypto.createHash('sha1').update(await fs.promises.readFile(path.join(dir, file))).digest('hex');
    byHash.set(hash, file);
  }
  const unknown = [...byHash.keys()].filter(h => !knownHashes.has(h));
  if (unknown.length) {
    const res = await fetchImpl('https://api.modrinth.com/v2/version_files', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hashes: unknown, algorithm: 'sha1' })
    });
    if (!res.ok) throw new Error('Could not check installed mods. Please try again.');
    const versions = await res.json();
    for (const hash of unknown) knownHashes.set(hash, versions[hash]?.project_id || null);
  }
  const projects = {};
  for (const [hash, file] of byHash) {
    const id = knownHashes.get(hash);
    if (id) projects[id] = file;
  }
  return projects;
}

 
const pending = new Map();
function inPack(packId, action) {
  const previous = pending.get(packId) || Promise.resolve();
  const next = previous.catch(() => {}).then(action);
  pending.set(packId, next);
  return next.finally(() => { if (pending.get(packId) === next) pending.delete(packId); });
}
module.exports = { installedProjects, inPack };

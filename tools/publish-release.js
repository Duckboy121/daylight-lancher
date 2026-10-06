 
 
 
 
 
const fs = require('fs');
const path = require('path');

const { owner: OWNER, repo: REPO } = require('../package.json').build.publish;
const TOKEN = process.env.GH_TOKEN;
if (!TOKEN) { console.error('GH_TOKEN not set'); process.exit(1); }

const version = require('../package.json').version;
const tag = 'v' + version;

const gh = async (url, opts = {}) => {
  const res = await fetch(url.startsWith('http') ? url : `https://api.github.com/repos/${OWNER}/${REPO}${url}`, {
    ...opts,
    headers: {
      Authorization: `token ${TOKEN}`,
      Accept: 'application/vnd.github+json',
      ...(opts.headers || {})
    }
  });
  if (opts.method === 'DELETE') return null;
  return res.json();
};

async function main() {
  const releases = await gh('/releases');
  const drafts = releases.filter(r => r.tag_name === tag && r.draft);
  if (!drafts.length) { console.log(`no draft found for ${tag} — nothing to do`); return; }

   
  let main = drafts.find(r => r.assets.some(a => a.name === 'latest.yml'));
  if (!main) { console.error('no draft has latest.yml — aborting'); process.exit(1); }

   
  for (const dup of drafts.filter(r => r.id !== main.id)) {
    for (const asset of dup.assets) {
      if (main.assets.some(a => a.name === asset.name)) continue;
      const local = path.join(__dirname, '..', 'dist', asset.name.replace(/-/g, ' ').replace(' Setup ', ' Setup '));
       
      const distFile = fs.readdirSync(path.join(__dirname, '..', 'dist'))
        .find(f => f.replace(/\s/g, '-') === asset.name || f === asset.name);
      if (!distFile) { console.log(`  ! ${asset.name} not in dist, skipping`); continue; }
      const data = fs.readFileSync(path.join(__dirname, '..', 'dist', distFile));
      await fetch(`https://uploads.github.com/repos/${OWNER}/${REPO}/releases/${main.id}/assets?name=${encodeURIComponent(asset.name)}`, {
        method: 'POST',
        headers: { Authorization: `token ${TOKEN}`, 'Content-Type': 'application/octet-stream' },
        body: data
      });
      console.log(`  moved ${asset.name} -> main draft`);
    }
    await gh(`/releases/${dup.id}`, { method: 'DELETE' });
    console.log(`  deleted duplicate draft ${dup.id}`);
  }

   
   
  let notes = '';
  try {
    notes = require('child_process')
      .execSync('git log -1 --format=%B', { encoding: 'utf8' })
      .trim()
      .replace(/^v\d+\.\d+\.\d+:\s*/, '');
  } catch {   }

  const published = await gh(`/releases/${main.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ draft: false, name: `Daylight ${version}`, ...(notes ? { body: notes } : {}) })
  });
  console.log(`published ${published.tag_name} at ${published.html_url}`);
}

main().catch(e => { console.error(e); process.exit(1); });

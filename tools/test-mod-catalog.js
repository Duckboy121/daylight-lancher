const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const crypto = require('node:crypto');
const path = require('node:path');
const files = new Map([['renamed-old.jar', Buffer.from('old mod version')]]);
const hash = crypto.createHash('sha1').update(files.get('renamed-old.jar')).digest('hex');
const context = { module: { exports: {} }, require: name => name === 'fs' ? {
  existsSync: () => true, readdirSync: () => [...files.keys()],
  promises: { readFile: async p => files.get(path.basename(p)) }
} : require(name) };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../src/mod-catalog.js'), 'utf8'), context);
const { installedProjects, inPack } = context.module.exports;
(async () => {
  let requests = 0;
  const fetchMock = async (_url, options) => {
    requests++;
    assert.deepEqual(JSON.parse(options.body).hashes, [hash]);
    return { ok: true, json: async () => ({ [hash]: { project_id: 'project-one' } }) };
  };
  assert.equal((await installedProjects('mods', fetchMock))['project-one'], 'renamed-old.jar');
  assert.equal((await installedProjects('mods', fetchMock))['project-one'], 'renamed-old.jar');
  assert.equal(requests, 1);
  files.clear();
  assert.equal(Object.keys(await installedProjects('mods', fetchMock)).length, 0);
  let downloads = 0, installed = false;
  const install = async () => { if (!installed) { await new Promise(r => setTimeout(r, 10)); downloads++; installed = true; } };
  await Promise.all([inPack('pack', install), inPack('pack', install)]);
  assert.equal(downloads, 1);
  await assert.rejects(inPack('pack', async () => { throw new Error('failed'); }));
  assert.equal(await inPack('pack', async () => 'retry works'), 'retry works');
  console.log('PASS: existing/renamed jars, cached identity, removal, simultaneous installs, retry after failure');
})().catch(e => { console.error(e); process.exitCode = 1; });

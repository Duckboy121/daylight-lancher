'use strict';
 
 
async function dependencyPlan(root, { version, loader, fetchJson, api, installed = {}, matchesInstalled = async () => true }) {
  const planned = new Map(), order = [], incompatible = new Set();
  async function visit(projectId, pinnedId) {
    const key = projectId || `version:${pinnedId}`;
    if (!pinnedId && installed[projectId]) return;
    const data = pinnedId ? await fetchJson(`${api}/version/${encodeURIComponent(pinnedId)}`)
      : (await fetchJson(`${api}/project/${encodeURIComponent(projectId)}/version?game_versions=${encodeURIComponent(JSON.stringify([version]))}&loaders=${encodeURIComponent(JSON.stringify([loader]))}`))[0];
    if (!data || !data.game_versions?.includes(version) || !data.loaders?.includes(loader)) throw Error(`No compatible required dependency: ${key} (${version} / ${loader})`);
    const id = data.project_id;
    if (planned.has(id)) {
      if (pinnedId && planned.get(id).id !== pinnedId) throw Error(`Conflicting dependency versions for ${id}`);
      return;
    }
    if (planned.size >= 100) throw Error('Dependency graph exceeds 100 projects');
    const file = data.files?.find(f=>f.primary) || data.files?.[0];
    if (!file || !/^[^/\\:]+\.jar$/i.test(file.filename) || file.filename === '.' || !file.hashes?.sha1) throw Error(`Invalid mod file for ${id}`);
    planned.set(id,data);
    if (installed[id]) {
      if (!await matchesInstalled(installed[id],file)) throw Error(`A different version of dependency ${id} is installed. Remove it before installing this mod.`);
      return;
    }
    for (const dep of data.dependencies || []) {
      if (dep.dependency_type === 'incompatible' && dep.project_id) incompatible.add(dep.project_id);
      if (dep.dependency_type === 'required') {
        if (!dep.project_id && !dep.version_id) throw Error(`Install the external dependency ${dep.file_name || 'listed by this mod'} manually first`);
        await visit(dep.project_id,dep.version_id);
      }
    }
    order.push({ projectId:id,versionId:data.id,file });
  }
  await visit(root);
  for (const id of incompatible) if (installed[id] || planned.has(id)) throw Error(`Incompatible mod present: ${id}`);
  const names = new Set();
  for (const item of order) { if (names.has(item.file.filename)) throw Error(`Dependencies share the filename ${item.file.filename}`); names.add(item.file.filename); }
  return order;
}
module.exports = { dependencyPlan };

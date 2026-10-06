 
function libraryAllowed(library, platform = process.platform, arch = process.arch, release = require('os').release()) {
  const osName = {win32:'windows',darwin:'osx',linux:'linux'}[platform];
  const javaArch = {x64:'amd64',arm64:'aarch64',ia32:'x86'}[arch] || arch;
  let allowed = !library.rules?.length;
  for (const rule of library.rules || []) {
    if (rule.os?.name && rule.os.name !== osName) continue;
    if (rule.os?.arch && ![javaArch, arch, arch === 'x64' ? 'x86_64' : javaArch].some(a => new RegExp(`^(?:${rule.os.arch})$`).test(a))) continue;
    if (rule.os?.version && !new RegExp(rule.os.version).test(release)) continue;
    if (rule.features && Object.values(rule.features).some(Boolean)) continue;
    allowed = rule.action === 'allow';
  }
  if (!allowed) return false;
  const name = library.downloads?.artifact?.path || library.name || '';
  const native = /natives-(macos|osx|linux|windows)(?:-(arm64|aarch64|arm32|arm|x86|x64))?(?=[:/.]|-\d|$)/.exec(name);
  if (native) {
    const targetOs = {macos:'darwin',osx:'darwin',linux:'linux',windows:'win32'}[native[1]];
    const targetArch = {arm64:'arm64',aarch64:'arm64',arm32:'arm',arm:'arm',x86:'ia32',x64:'x64'}[native[2]] || 'x64';
    return platform === targetOs && arch === targetArch;
  }
  return true;
}
module.exports = { libraryAllowed };

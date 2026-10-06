'use strict';
const fs = require('node:fs/promises');
const path = require('node:path');
const { execFile } = require('node:child_process');
const cache = new Map();

function normalizeArch(arch) {
  return ({ amd64:'x64', x86_64:'x64', aarch64:'arm64', x86:'ia32', i386:'ia32' })[arch] || arch;
}
function parseJavaProperties(output) {
  const version = /(?:^|\n)\s*java\.version\s*=\s*([^\s]+)/.exec(output)?.[1];
  const arch = /(?:^|\n)\s*os\.arch\s*=\s*([^\s]+)/.exec(output)?.[1];
  if (!version || !arch) throw new Error('Java did not report its version and CPU architecture');
  const parts = version.split(/[._+-]/).map(Number);
  return { major: parts[0] === 1 ? parts[1] : parts[0], arch: normalizeArch(arch), version };
}
async function inspectJava(executable) {
   
  const probe = /javaw\.exe$/i.test(executable) ? executable.replace(/javaw\.exe$/i,'java.exe') : executable;
  const stat = await fs.stat(probe);
  const key = `${probe}:${stat.mtimeMs}:${stat.size}`;
  if (cache.has(key)) return cache.get(key);
  const result = new Promise((resolve,reject) => {
    execFile(probe,['-XshowSettings:properties','-version'],{windowsHide:true,timeout:8000,maxBuffer:128*1024},(error,stdout,stderr) => {
      if (error) return reject(new Error(`Could not run Java: ${error.message}`));
      try { resolve(parseJavaProperties(stdout+'\n'+stderr)); } catch (err) { reject(err); }
    });
  });
  if (cache.size >= 32) cache.delete(cache.keys().next().value);
  cache.set(key,result);
  try { return await result; } catch (error) { cache.delete(key); throw error; }
}
async function validateJava(executable, need, max, arch = process.arch, inspect = inspectJava) {
  const runtime = await inspect(executable);
  if (runtime.arch !== normalizeArch(arch)) throw new Error(`This launcher needs ${arch} Java, but the selected runtime is ${runtime.arch}. Choose a matching Java installation.`);
  if (runtime.major < need || runtime.major > max || (need < 17 && runtime.major !== need)) {
    throw new Error(`Minecraft needs Java ${need}${max === need ? '' : '–'+max}; selected Java is ${runtime.version}.`);
  }
  return executable;
}
async function chooseJava(candidates, need, max, arch = process.arch, inspect = inspectJava) {
  let best = null, bestMajor = Infinity;
  for (const executable of [...new Set(candidates)]) {
    try {
      const runtime = await inspect(executable);
      if (runtime.arch !== normalizeArch(arch) || runtime.major < need || runtime.major > max || (need < 17 && runtime.major !== need)) continue;
      if (runtime.major < bestMajor) { best = executable; bestMajor = runtime.major; }
      if (runtime.major === need) break;
    } catch {   }
  }
  return best;
}
async function javaCandidates(roots, platform = process.platform) {
  const bin = platform === 'win32' ? 'javaw.exe' : 'java';
  const dirs = [];
  for (const root of roots) {
    dirs.push(root);
    try { for (const child of await fs.readdir(root,{withFileTypes:true})) if(child.isDirectory() || child.isSymbolicLink()) dirs.push(path.join(root,child.name)); } catch {   }
  }
  const candidates = [];
  for (const dir of dirs) {
    const names = [path.join(dir,'bin',bin)];
    if(platform === 'darwin') names.unshift(path.join(dir,'Contents','Home','bin',bin));
    for (const name of names) { try { await fs.access(name); candidates.push(name); } catch {   } }
  }
  return candidates;
}
module.exports = {normalizeArch,parseJavaProperties,inspectJava,validateJava,chooseJava,javaCandidates};

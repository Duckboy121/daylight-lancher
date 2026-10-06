'use strict';
const os = require('os');

function defaultMemory(totalGb = os.totalmem() / 1024 ** 3) {
  const ceiling = Math.max(1, Math.floor(totalGb - 1));
  const max = Math.min(ceiling, totalGb >= 24 ? 8 : totalGb >= 12 ? 6 : 4);
  return { min: Math.min(max, totalGb >= 24 ? 4 : totalGb >= 12 ? 3 : 2), max };
}

function supportedVersion(value) {
  if (typeof value !== 'string' || !/^\d+\.\d+(?:\.\d+)?$/.test(value)) return false;
  const [major, minor] = value.split('.').map(Number);
  return major >= 26 || (major === 1 && minor >= 19);
}

 
function jvmArguments(value = '') {
  if (typeof value !== 'string' || value.length > 4096) throw new Error('JVM flags must be shorter than 4096 characters');
  const args = []; let word = '', quote = '';
  for (const c of value.trim()) {
    if (quote) { if (c === quote) quote = ''; else word += c; }
    else if (c === '"' || c === "'") quote = c;
    else if (/\s/.test(c)) { if (word) args.push(word); word = ''; }
    else word += c;
  }
  if (quote) throw new Error('Close the quote in your JVM flags');
  if (word) args.push(word);
  for (const arg of args) {
    if (!/^-(?:D|X)/.test(arg) || /^-Xm[sx]/i.test(arg) || /^-XX:(?:Initial|Max|Min)RAM/i.test(arg) || /^-Ddaylight\.session\./i.test(arg)) {
      throw new Error('Use -D, -X or -XX flags. Set heap size with the memory controls.');
    }
  }
  return args;
}

function memory(min, max, totalGb = os.totalmem() / 1024 ** 3) {
  const ceiling = Math.max(1, Math.floor(totalGb - 1));
  if (!Number.isFinite(min) || !Number.isFinite(max) || min < 0.5 || min > max || max > ceiling) {
    throw new Error(`Memory must be 0.5–${ceiling} GB, with minimum ≤ maximum (1 GB reserved for the OS).`);
  }
  return { min, max };
}

function instanceOptions(input) {
  const tags = [...new Set(String(input.tags || '').split(',').map(s => s.trim()).filter(Boolean))];
  if (tags.length > 6 || tags.some(s => s.length > 24)) throw new Error('Use up to 6 tags, each under 25 characters');
  const override = input.minRam !== null && input.minRam !== '' && input.minRam !== undefined;
  const ram = override ? memory(Number(input.minRam), Number(input.maxRam)) : { min: null, max: null };
  jvmArguments(input.jvmArgs || '');
  return { tags, minRam: ram.min, maxRam: ram.max, jvmArgs: input.jvmArgs || '' };
}

module.exports = { supportedVersion, jvmArguments, memory, instanceOptions, defaultMemory };

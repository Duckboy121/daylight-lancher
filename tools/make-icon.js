 
 
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

 

function drawIcon(S) {
  const buf = Buffer.alloc(S * S * 4);
  const cx = S / 2, cy = S / 2;
  const margin = S * 0.03;
  const corner = S * 0.22;
  const sunR = S * 0.24;
  const rayIn = S * 0.32;
  const rayOut = S * 0.44;
  const rayHalfAngle = 0.14;

  const bg = [13, 17, 25];         
  const sunIn = [255, 227, 122];   
  const sunOut = [245, 165, 36];   

  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      const i = (y * S + x) * 4;

       
      const qx = Math.max(Math.abs(x - cx) - (S / 2 - margin - corner), 0);
      const qy = Math.max(Math.abs(y - cy) - (S / 2 - margin - corner), 0);
      const rectDist = Math.sqrt(qx * qx + qy * qy) - corner;
      const rectA = clamp(0.5 - rectDist, 0, 1);
      if (rectA <= 0) continue;

      let r = bg[0], g = bg[1], b = bg[2];

      const dx = x - cx, dy = y - cy;
      const d = Math.sqrt(dx * dx + dy * dy);

       
      let sunA = clamp(sunR + 1 - d, 0, 1);

       
      if (sunA <= 0 && d > rayIn && d < rayOut) {
        const ang = Math.atan2(dy, dx);
        for (let k = 0; k < 8; k++) {
          let diff = Math.abs(ang - (k * Math.PI / 4 - Math.PI));
          diff = Math.min(diff, Math.PI * 2 - diff);
          if (diff < rayHalfAngle) {
            sunA = clamp((rayHalfAngle - diff) / rayHalfAngle * 3, 0, 1);
            break;
          }
        }
      }

      if (sunA > 0) {
        const t = clamp(d / sunR, 0, 1);
        const sr = sunIn[0] + (sunOut[0] - sunIn[0]) * t;
        const sg = sunIn[1] + (sunOut[1] - sunIn[1]) * t;
        const sb = sunIn[2] + (sunOut[2] - sunIn[2]) * t;
        r = r + (sr - r) * sunA;
        g = g + (sg - g) * sunA;
        b = b + (sb - b) * sunA;
      }

      buf[i] = Math.round(r);
      buf[i + 1] = Math.round(g);
      buf[i + 2] = Math.round(b);
      buf[i + 3] = Math.round(rectA * 255);
    }
  }
  return buf;
}

function clamp(v, lo, hi) {
  return v < lo ? lo : v > hi ? hi : v;
}

 

const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

function chunk(type, data) {
  const out = Buffer.alloc(8 + data.length + 4);
  out.writeUInt32BE(data.length, 0);
  out.write(type, 4, 'ascii');
  data.copy(out, 8);
  out.writeUInt32BE(crc32(out.subarray(4, 8 + data.length)), 8 + data.length);
  return out;
}

function encodePng(rgba, S) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(S, 0);
  ihdr.writeUInt32BE(S, 4);
  ihdr[8] = 8;    
  ihdr[9] = 6;    
  const raw = Buffer.alloc(S * (S * 4 + 1));
  for (let y = 0; y < S; y++) {
    raw[y * (S * 4 + 1)] = 0;  
    rgba.copy(raw, y * (S * 4 + 1) + 1, y * S * 4, (y + 1) * S * 4);
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0))
  ]);
}

 

function encodeIco(pngBuf) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);  
  header.writeUInt16LE(1, 4);  
  const entry = Buffer.alloc(16);
  entry[0] = 0;  
  entry[1] = 0;
  entry.writeUInt16LE(1, 4);   
  entry.writeUInt16LE(32, 6);  
  entry.writeUInt32LE(pngBuf.length, 8);
  entry.writeUInt32LE(22, 12);
  return Buffer.concat([header, entry, pngBuf]);
}

 

const root = path.join(__dirname, '..');
const png256 = encodePng(drawIcon(256), 256);
fs.mkdirSync(path.join(root, 'build'), { recursive: true });
fs.mkdirSync(path.join(root, 'src', 'assets'), { recursive: true });
fs.writeFileSync(path.join(root, 'build', 'icon.ico'), encodeIco(png256));
fs.writeFileSync(path.join(root, 'src', 'assets', 'icon.png'), png256);
fs.writeFileSync(path.join(root, 'src', 'assets', 'tray.png'), encodePng(drawIcon(32), 32));
 
fs.writeFileSync(path.join(root, 'build', 'icon.png'), encodePng(drawIcon(512), 512));
console.log('icons written: build/icon.ico, build/icon.png, src/assets/icon.png, src/assets/tray.png');

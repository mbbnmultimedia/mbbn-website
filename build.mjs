// Membangun website statis ke folder _site/ dari content/*.json + src/pages.mjs.
// Jalankan: npm run build   (tanpa dependensi tambahan)
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync } from 'node:fs';
import { layout } from './src/lib.mjs';
import * as pages from './src/pages.mjs';

const OUT = '_site';
const read = (name) => {
  try {
    return JSON.parse(readFileSync(`content/${name}.json`, 'utf8'));
  } catch (err) {
    throw new Error(`Gagal membaca content/${name}.json: ${err.message}`);
  }
};

const data = {
  S: read('settings'),
  D: read('beranda'),
  T: read('tentang'),
  P: read('pembelajaran'),
  K: read('kabar'),
  B: read('buletin'),
  A: read('alumni'),
  R: read('pendaftaran'),
  I: read('ikut-terlibat'),
};

const PAGES = [
  ['index.html', null, null, pages.beranda],
  ['tentang.html', 'Tentang Kami', 'tentang', pages.tentang],
  ['pembelajaran.html', 'Pembelajaran', 'pembelajaran', pages.pembelajaran],
  ['kabar.html', 'Kabar & Kegiatan', 'kabar', pages.kabar],
  ['suara-alumni.html', 'Suara Alumni', 'suara-alumni', pages.suaraAlumni],
  ['pendaftaran.html', 'Pendaftaran', 'pendaftaran', pages.pendaftaran],
  ['ikut-terlibat.html', 'Ikut Terlibat', 'ikut-terlibat', pages.ikutTerlibat],
  ['404.html', 'Halaman Tidak Ditemukan', null, pages.notFound],
];

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

for (const [file, title, active, render] of PAGES) {
  const html = layout({ S: data.S, title, active, body: render(data) });
  writeFileSync(`${OUT}/${file}`, html);
  console.log('✓', file);
}

cpSync('assets', `${OUT}/assets`, { recursive: true });
for (const f of ['_headers', 'robots.txt']) if (existsSync(f)) cpSync(f, `${OUT}/${f}`);
console.log(`Selesai: ${PAGES.length} halaman di ${OUT}/`);

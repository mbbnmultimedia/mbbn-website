// Helper dan layout bersama untuk semua halaman.

export const e = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Teks dengan **tebal**; baris kosong memisahkan paragraf.
export const inline = (s) => e(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>');
export const paras = (s, attrs = '') =>
  String(s ?? '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p${attrs}>${inline(p)}</p>`)
    .join('\n');

// Judul dengan bagian yang disorot (warna biru).
export const hl = (judul, sorot) => `${e(judul)}${sorot ? ` <em>${e(sorot)}</em>` : ''}`;

// Path gambar: URL penuh dibiarkan, path lokal dijadikan absolut dari akar situs.
export const src = (p) => (!p ? '' : /^(https?:)?\/\//.test(p) ? p : '/' + String(p).replace(/^\/+/, ''));

export const list = (arr) => (Array.isArray(arr) ? arr : []);

export const waLink = (S, msg) => `https://wa.me/${String(S.whatsapp).replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`;
export const igLink = (S) => `https://www.instagram.com/${String(S.instagram || '').replace(/^@/, '')}/`;
export const igHandle = (S) => '@' + String(S.instagram || '').replace(/^@/, '');
export const mapsLink = (S) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(S.alamat || '')}`;

const caret = '<svg class="caret" viewBox="0 0 10 10"><path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>';

const NAV = [
  { href: '/tentang.html', label: 'Tentang', key: 'tentang', sub: [
    ['/tentang.html', 'Tentang Kami'], ['/tentang.html#visi', 'Visi &amp; Misi'],
    ['/tentang.html#sejarah', 'Panggilan &amp; Sejarah'], ['/tentang.html#yayasan', 'Yayasan &amp; Gereja Naungan']] },
  { href: '/pembelajaran.html', label: 'Pembelajaran', key: 'pembelajaran', sub: [
    ['/pembelajaran.html#paud', 'PAUD / TK'], ['/pembelajaran.html#sd', 'SD (PKBM)'],
    ['/pembelajaran.html#pendekatan', 'Pendekatan Alkitabiah'], ['/pembelajaran.html#lulusan', 'Profil Lulusan']] },
  { href: '/kabar.html', label: 'Kabar &amp; Kegiatan', key: 'kabar' },
  { href: '/suara-alumni.html', label: 'Suara Alumni', key: 'suara-alumni' },
  { href: '/pendaftaran.html', label: 'Pendaftaran', key: 'pendaftaran' },
];

function header(active) {
  const items = NAV.map((n) => {
    const cls = n.key === active ? ' class="active"' : '';
    if (!n.sub) return `        <li><a href="${n.href}"${cls}>${n.label}</a></li>`;
    const sub = n.sub.map(([h, l]) => `            <li><a href="${h}">${l}</a></li>`).join('\n');
    return `        <li class="dd"><a href="${n.href}"${cls}>${n.label} ${caret}</a>\n          <ul class="drop">\n${sub}\n          </ul></li>`;
  }).join('\n');
  return `<header class="solid" id="hdr">
  <div class="wrap">
    <a href="/" class="brand" aria-label="Beranda">
      <img src="/assets/logo.png" alt="Logo Sekolah Mutiara Bagi Bangsa Nusantara">
      <b>Mutiara Bagi<br>Bangsa Nusantara</b>
    </a>
    <nav id="nav">
      <ul>
${items}
        <li class="cta"><a href="/ikut-terlibat.html"${active === 'ikut-terlibat' ? ' class="active"' : ''}>Ikut Terlibat</a></li>
      </ul>
    </nav>
    <button class="burger" id="burger" aria-label="Buka menu"><span></span><span></span><span></span></button>
  </div>
</header>`;
}

function footer(S) {
  return `<footer>
  <div class="wrap">
    <div class="cols">
      <div>
        <div class="fb"><img src="/assets/logo.png" alt=""><b>Sekolah Mutiara Bagi<br>Bangsa Nusantara</b></div>
        <p>${e(S.footer_lembaga)}<br>${e(S.alamat)}<br>${e(S.footer_naungan)}</p>
        <div class="soc">
          <a href="${e(igLink(S))}" target="_blank" rel="noopener" aria-label="Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="#fff"/></svg></a>
          <a href="https://wa.me/${e(S.whatsapp)}" target="_blank" rel="noopener" aria-label="WhatsApp"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2"/></svg></a>
          <a href="mailto:${e(S.email)}" aria-label="Email"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg></a>
        </div>
      </div>
      <div><h4>Tentang</h4><ul><li><a href="/tentang.html">Tentang Kami</a></li><li><a href="/tentang.html#visi">Visi &amp; Misi</a></li><li><a href="/tentang.html#sejarah">Panggilan &amp; Sejarah</a></li><li><a href="/tentang.html#yayasan">Yayasan &amp; Gereja Naungan</a></li></ul></div>
      <div><h4>Sekolah</h4><ul><li><a href="/pembelajaran.html">Pembelajaran</a></li><li><a href="/kabar.html">Kabar &amp; Kegiatan</a></li><li><a href="/suara-alumni.html">Suara Alumni</a></li></ul></div>
      <div><h4>Kontak</h4><ul><li><a href="https://wa.me/${e(S.whatsapp)}" target="_blank" rel="noopener">${e(S.whatsapp_tampil)}</a></li><li><span>${e(S.email)}</span></li><li><a href="/pendaftaran.html">Pendaftaran</a></li><li><a href="/ikut-terlibat.html">Ikut Terlibat →</a></li></ul></div>
    </div>
    <div class="bottom">
      <span>© <span id="yr"></span> ${e(S.nama_sekolah)} · Yayasan Dian Pelita Kasih</span>
      <a href="#beranda">Kembali ke atas ↑</a>
    </div>
  </div>
</footer>`;
}

export function closing(S) {
  const p = S.penutup || {};
  return `<section class="closing" style="padding-top:96px;background:#fff">
  <div class="wrap">
    <div class="box reveal">
      <div class="pat dots"></div>
      <h2>${hl(p.judul, p.judul_sorot)}</h2>
      <div class="btns">
        <a class="btn btn-white" href="/pendaftaran.html">Daftar Sekarang</a>
        <a class="btn btn-line" href="/pendaftaran.html#kunjungi">Kunjungi Kami</a>
        <a class="btn btn-line" href="/ikut-terlibat.html">Dukung MBBN</a>
      </div>
    </div>
  </div>
</section>`;
}

export function banner(crumb, b, extra = '', cls = '') {
  return `<section class="pbanner${cls ? ' ' + cls : ''}" id="beranda">
  <div class="pat dots"></div>
  <div class="wrap"${cls === 'reg' ? ' id="alur"' : ''}>
    <div class="crumb"><a href="/">Beranda</a><span>›</span>${e(crumb)}</div>
    <h1>${e(b.judul)}</h1>
    <p>${e(b.teks)}</p>
${extra}
  </div>
</section>`;
}

export function layout({ S, title, active, body }) {
  const pageTitle = title ? `${title} · Sekolah MBBN` : S.nama_sekolah;
  return `<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(pageTitle)}</title>
<meta name="description" content="${e(S.deskripsi_situs)}">
<link rel="icon" href="/assets/logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/style.css">
</head>
<body data-wa="${e(String(S.whatsapp).replace(/\D/g, ''))}" data-behold="${e(S.behold_feed_id || '')}">
${header(active)}
${body}
${footer(S)}
<a class="totop" id="totop" href="#beranda" aria-label="Kembali ke atas"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5"><path d="M6 15l6-6 6 6"/></svg></a>
<a class="wa" href="${e(waLink(S, 'Halo Sekolah MBBN, saya ingin bertanya.'))}" target="_blank" rel="noopener" aria-label="Chat WhatsApp"><svg width="30" height="30" viewBox="0 0 24 24" fill="#fff"><path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.3-.4.3-.4.7-1.4a.5.5 0 000-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.7 11.8 11.8 0 004.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 001.8-1.2 2.2 2.2 0 00.1-1.3c0-.1-.2-.2-.4-.3z"/></svg></a>
<script src="/assets/app.js"></script>
</body>
</html>
`;
}

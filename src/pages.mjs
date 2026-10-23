// Template tiap halaman. Desain ada di sini; isinya dari folder content/.
import { e, inline, paras, hl, src, list, waLink, igLink, igHandle, mapsLink, closing, banner } from './lib.mjs';

// ---------- potongan bersama ----------
function buletinBlock(K, B) {
  const items = list(B.items).filter((b) => b && b.link).slice(0, 3);
  const cards = items.map((b) => {
    const img = b.sampul ? `<img src="${e(src(b.sampul))}" alt="Sampul Buletin MBBN ${e(b.bulan)}" loading="lazy" onerror="this.remove()">` : '';
    return `        <a class="bcard" href="${e(b.link)}" target="_blank" rel="noopener"><div class="cv ph"><span><small>BULETIN MBBN</small>${e(b.bulan)}</span>${img}</div><div class="bt"><small>Edisi</small><b>${e(b.bulan)}</b><div class="bb"><span class="btn btn-blue sm">Baca buletin →</span></div></div></a>`;
  }).join('\n');
  return `<div class="bul reveal">
      <div class="bul-head"><div><span class="eyebrow">${e(K.buletin.label)}</span><h3>${e(K.buletin.judul)}</h3><p>${e(K.buletin.teks)}</p></div></div>
      <div class="bul-grid">
${cards}
      </div>
    </div>`;
}

const tgl = (t) => {
  const parts = String(t || '').trim().split(/\s+/);
  return parts.length > 1 ? `${e(parts.slice(0, -1).join(' '))}<br>${e(parts.at(-1))}` : e(t);
};
function newsCards(K, n) {
  return list(K.cadangan).slice(0, n).map((c) =>
    `      <article class="news reveal"><div class="im"><img src="${e(src(c.foto))}" alt="${e(c.judul)}">${c.tanggal ? `<time>${tgl(c.tanggal)}</time>` : ''}</div><div class="tx"><h3>${e(c.judul)}</h3><p>${e(c.teks)}</p></div></article>`
  ).join('\n');
}

const alumniInfo = (a) => [a.angkatan ? 'Angkatan ' + a.angkatan : '', a.kegiatan ? 'kini ' + a.kegiatan : ''].filter(Boolean).join(' · ');
const alumniPhoto = (a) => (a.foto ? `<img src="${e(src(a.foto))}" alt="${e(a.nama)}">` : e(String(a.nama || '?').charAt(0)));
const alumniItems = (A) => list(A.items).filter((a) => a && a.nama);

const ROHANI_ICONS = [
  '<path d="M12 6c-2-1.5-5-2-8-1.5v14c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5v-14c-3-.5-6 0-8 1.5z"/><path d="M12 6v14"/>',
  '<path d="M4 5h16v11H8l-4 4z"/><path d="M8 9h8M8 12h5"/>',
  '<path d="M12 21s-7-4.5-7-11a4 4 0 017-2.6A4 4 0 0119 10c0 6.5-7 11-7 11z"/>',
];

// ---------- BERANDA ----------
export function beranda({ S, D, P, K, B, A, T }) {
  const h = D.hero, t = D.tentang, j = D.jenjang, k = D.kabar, al = D.alumni;
  const misi = list(T.misi).map((m, i) => `        <div class="slide${i === 0 ? ' on' : ''}"><b>${String(i + 1).padStart(2, '0')}</b><p>${e(m.judul)}</p></div>`).join('\n');
  const stats = list(D.statistik).map((s) => {
    const v = String(s.angka || ''); const plus = /\+$/.test(v);
    return `      <div class="st reveal"><b>${e(v.replace(/\+$/, ''))}${plus ? '<sup>+</sup>' : ''}</b><span>${e(s.label)}</span></div>`;
  }).join('\n');
  const levels = [['paud', P.paud], ['sd', P.sd]].map(([id, x]) =>
    `      <a class="lv reveal" href="/pembelajaran.html#${id}"><img src="${e(src(x.foto))}" alt="${e(x.label)}"><div class="tx"><small>${e(x.label)}</small><h3>${e(x.judul_kartu)}</h3><p>${e(x.teks)}</p></div></a>`).join('\n');
  const a0 = alumniItems(A)[0];
  const alumniHome = a0
    ? `      <div class="vc-pics reveal">
        <div class="vc-pic on">${a0.foto ? `<img src="${e(src(a0.foto))}" alt="${e(a0.nama)}">` : '<img src="/assets/logo.png" alt="" style="height:auto;width:46%;align-self:center">'}</div>
      </div>
      <div class="reveal">
        <span class="eyebrow">${e(al.label)}</span>
        <div class="vt on" style="position:relative"><div class="q">“</div>
          <blockquote>${e(a0.kutipan)}</blockquote>
          <cite><b>${e(a0.nama)}</b><span>${e(alumniInfo(a0))}</span></cite>
        </div>
        <a href="/suara-alumni.html" class="btn btn-white" style="margin-top:22px">Baca cerita alumni lainnya →</a>
      </div>`
    : `      <div class="vc-pics reveal">
        <div class="vc-pic on alum-ph"><img src="/assets/logo.png" alt="" style="height:auto;width:46%;align-self:center"></div>
      </div>
      <div class="reveal">
        <span class="eyebrow">${e(al.label)}</span>
        <div class="vt on" style="position:relative">
          <blockquote>${e(al.teks_kosong)}</blockquote>
          <cite><b>${e(al.judul_kosong)}</b><span>${e(al.subjudul_kosong)}</span></cite>
        </div>
        <a href="/suara-alumni.html" class="btn btn-white" style="margin-top:22px">Lihat Suara Alumni →</a>
      </div>`;

  return `
<section class="hero" id="beranda">
  <div class="pat dots"></div><div class="pat b dots"></div>
  <div class="wrap">
    <div class="hero-txt">
      <div class="tag"><i>${e(h.label_tahun)}</i> ${e(h.label)}</div>
      <p class="hname">${e(h.nama)}</p>
      <h1>${e(h.judul)} <span>${e(h.judul_sorot)}</span></h1>
      ${h.ayat ? `<p class="hverse">${e(h.ayat)} <b>${e(h.ayat_ref)}</b></p>` : ''}
      <p class="lead">${e(h.teks)}</p>
      <div class="ctas">
        <a href="/pendaftaran.html" class="btn btn-white">${e(h.tombol_daftar)}</a>
        <a href="/pendaftaran.html#kunjungi" class="btn btn-line">${e(h.tombol_kunjungan)}</a>
      </div>
    </div>
    <div class="hero-media">
      <div class="hero-img">
        <div class="ph"><img src="${e(src(h.foto))}" alt="${e(h.foto_alt)}"></div>
      </div>
    </div>
  </div>
</section>

<section class="vision" id="visi">
  <div class="wrap">
    <div class="col reveal">
      <h3>Visi Kami</h3>
      <p class="big">“${e(T.visi.teks)} ${e(T.visi.teks_sorot)}”</p>
    </div>
    <div class="col reveal">
      <h3>Misi Kami</h3>
      <div class="slides" id="misi">
${misi}
      </div>
      <div class="pager" id="misiPager"></div>
    </div>
  </div>
</section>

<section class="about" id="tentang">
  <div class="wrap">
    <div class="pic reveal">
      <div class="main"><img src="${e(src(t.foto_besar))}" alt="Murid dan guru MBBN"></div>
      <div class="sm"><img src="${e(src(t.foto_kecil))}" alt="Kegiatan murid MBBN"></div>
    </div>
    <div class="reveal">
      <span class="eyebrow">${e(t.label)}</span>
      <h2 class="h2">${hl(t.judul, t.judul_sorot)}</h2>
      <p class="lead">${e(t.teks)}</p>
      <a href="/tentang.html" class="btn btn-navy" style="margin-top:26px">${e(t.tombol)}</a>
    </div>
  </div>
</section>

<section class="stats">
  <div class="pat dots"></div>
  <div class="wrap">
    <div class="grid">
${stats}
    </div>
  </div>
</section>

<section class="learn" id="pembelajaran">
  <div class="wrap">
    <div class="top">
      <div class="reveal">
        <span class="eyebrow">${e(j.label)}</span>
        <h2 class="h2" style="margin:0">${hl(j.judul, j.judul_sorot)}</h2>
      </div>
      <p class="lead reveal">${e(j.teks)}</p>
    </div>
    <div class="lv-grid">
${levels}
    </div>
    <div class="reveal" style="text-align:center"><a href="/pembelajaran.html" class="btn btn-navy">${e(j.tombol)}</a></div>
  </div>
</section>

<section id="kabar">
  <div class="wrap">
    <div class="news-top">
      <div class="reveal">
        <span class="eyebrow">${e(k.label)}</span>
        <h2 class="h2" style="margin:0">${e(k.judul)}</h2>
      </div>
      <a class="btn btn-navy reveal" href="/kabar.html">${e(k.tombol)}</a>
    </div>
    <div class="news-grid" data-igfeed="3">
${newsCards(K, 3)}
    </div>
    ${buletinBlock(K, B)}
  </div>
</section>

<section class="voices" id="suara">
  <div class="pat dots"></div>
  <div class="wrap">
    <div class="vc">
${alumniHome}
    </div>
  </div>
</section>

${closing(S)}
`;
}

// ---------- TENTANG ----------
export function tentang({ S, T }) {
  const s = T.sejarah, b = T.budaya, n = T.naungan;
  const timeline = list(s.timeline).map((x) => `          <li><b>${e(x.waktu)}</b><span>${e(x.teks)}</span></li>`).join('\n');
  const misi = list(T.misi).map((m, i) => `      <div class="mc reveal"><b>${String(i + 1).padStart(2, '0')}</b><h4>${e(m.judul)}</h4><p>${e(m.penjelasan)}</p></div>`).join('\n');
  const pilar = list(b.pilar).map((p) => `      <div class="pillar reveal"><h4>${e(p.judul)}</h4><p>${e(p.teks)}</p>${p.ayat ? `<p style="margin-top:12px;font-weight:600;color:var(--navy)">${e(p.ayat)} <span style="color:var(--blue-2)">${e(p.ayat_ref)}</span></p>` : ''}</div>`).join('\n');
  const nilai = list(b.nilai).map((v) => `<li>${e(v)}</li>`).join('');
  const y = n.yayasan, g = n.gereja;
  return `
${banner('Tentang Kami', T.banner)}

<section class="calling" id="sejarah" style="background:var(--sky)">
  <div class="wrap">
    <div class="grid">
      <div class="story reveal">
        <span class="eyebrow">${e(s.label)}</span>
        <h2 class="h2">${hl(s.judul, s.judul_sorot)}</h2>
        ${paras(s.isi)}
      </div>
      <div class="reveal">
        <div class="fire"><div class="pat dots"></div>
          <q>${e(s.ayat)}</q>
          <small>${e(String(s.ayat_ref || '').toUpperCase())}</small>
          <p>${e(s.ayat_catatan)}</p>
        </div>
        <ol class="timeline">
${timeline}
        </ol>
      </div>
    </div>
  </div>
</section>

<section class="vmfull" id="visi">
  <div class="pat dots"></div>
  <div class="wrap">
    <div class="reveal vtop">
      <span class="eyebrow">Visi</span>
      <p class="vbig">“${e(T.visi.teks)} <em>${e(T.visi.teks_sorot)}</em>”</p>
    </div>
    <span class="eyebrow reveal" style="margin-top:56px">Misi</span>
    <div class="mgrid">
${misi}
    </div>
  </div>
</section>

<section id="budaya">
  <div class="wrap">
    <div class="reveal" style="max-width:720px">
      <span class="eyebrow">${e(b.label)}</span>
      <h2 class="h2">${hl(b.judul, b.judul_sorot)}</h2>
      <p class="lead">${e(b.teks)}</p>
    </div>
    <div class="pillars">
${pilar}
    </div>
    <div class="chars reveal">
      <h4>${e(b.nilai_judul)}</h4>
      <p>${e(b.nilai_teks)}</p>
      <ol class="cgrid">${nilai}</ol>
    </div>
  </div>
</section>

<section id="yayasan" style="background:var(--sky)">
  <div class="wrap">
    <div class="reveal" style="max-width:720px;margin-bottom:40px">
      <span class="eyebrow">${e(n.label)}</span>
      <h2 class="h2">${hl(n.judul, n.judul_sorot)}</h2>
    </div>
    <div class="ngrid">
      <div class="nc reveal">
        <div class="nlogo">${y.logo ? `<img src="${e(src(y.logo))}" alt="Logo ${e(y.nama)}">` : ''}</div>
        <small>${e(y.label)}</small>
        <h3>${e(y.nama)}</h3>
        ${paras(y.isi)}
      </div>
      <div class="nc reveal">
        <div class="nlogo ic"><svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#1584c0" stroke-width="1.8" stroke-linecap="round"><path d="M12 2v6M9 5h6"/><path d="M5 22V12l7-4 7 4v10"/><path d="M10 22v-5h4v5"/></svg></div>
        <small>${e(g.label)}</small>
        <h3>${e(g.nama)}</h3>
        ${paras(g.isi)}
        <ul class="nlist">
${list(g.poin).map((p) => `          <li>${e(p)}</li>`).join('\n')}
        </ul>
        ${g.ayat ? `<p class="ref">${e(g.ayat)} <span>${e(g.ayat_ref)}</span></p>` : ''}
      </div>
    </div>
  </div>
</section>

${closing(S)}
`;
}

// ---------- PEMBELAJARAN ----------
export function pembelajaran({ S, P }) {
  const level = (id, x, rev, bg) => `<section id="${id}"${bg ? ' style="background:var(--sky)"' : ''}>
  <div class="wrap split2${rev ? ' rev' : ''}">
    <div class="sp-img reveal"><img src="${e(src(x.foto))}" alt="${e(x.label)}"></div>
    <div class="reveal">
      <span class="eyebrow">${e(x.label)}</span>
      <h2 class="h2">${hl(x.judul, x.judul_sorot)}</h2>
      <p class="lead">${e(x.teks)}</p>
      <ul class="ticks">
${list(x.poin).map((p) => `        <li>${e(p)}</li>`).join('\n')}
      </ul>
    </div>
  </div>
</section>`;
  const k = P.kurikulum, r = P.rohani, d = P.dasar, l = P.lulusan, g = P.guru;
  return `
${banner('Pembelajaran', P.banner)}

${level('paud', P.paud, false, false)}

${level('sd', P.sd, true, true)}

<section id="kurikulum">
  <div class="wrap">
    <div class="reveal" style="max-width:720px;margin-bottom:36px">
      <span class="eyebrow">${e(k.label)}</span>
      <h2 class="h2">${hl(k.judul, k.judul_sorot)}</h2>
    </div>
    <div class="curgrid">
${list(k.items).map((c) => `      <div class="cur reveal"><h4>${e(c.judul)}</h4><p>${e(c.teks)}</p></div>`).join('\n')}
    </div>

    <div class="reveal" style="max-width:720px;margin:72px 0 28px">
      <span class="eyebrow">${e(r.label)}</span>
      <h3 style="font-size:clamp(1.5rem,2.8vw,2rem)">${e(r.judul)}</h3>
    </div>
    <div class="approach">
${list(r.items).map((c, i) => `      <div class="ap reveal"><div class="ic"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round">${ROHANI_ICONS[i % 3]}</svg></div><h4>${e(c.judul)}</h4><p>${e(c.teks)}</p></div>`).join('\n')}
    </div>
  </div>
</section>

<section class="learn" id="pendekatan">
  <div class="wrap">
    <div class="basis reveal">
      <div>
        <span class="eyebrow">${e(d.label)}</span>
        <p class="verse">${e(d.ayat)}<small>${e(String(d.ayat_ref || '').toUpperCase())}</small></p>
      </div>
      <div>
        <p style="color:var(--muted);margin-bottom:16px">${e(d.pengantar)}</p>
        <ol>
${list(d.poin).map((p) => `          <li><div><b>${e(p.judul)}</b><span>${e(p.teks)}</span></div></li>`).join('\n')}
        </ol>
      </div>
    </div>
  </div>
</section>

<section class="grad" id="lulusan">
  <div class="pat dots"></div>
  <div class="wrap">
    <div class="reveal" style="max-width:700px">
      <span class="eyebrow">${e(l.label)}</span>
      <h2 class="h2">${e(l.judul)}</h2>
      <p class="lead">${e(l.teks)}</p>
    </div>
    <div class="grad-grid">
${list(l.items).map((p) => `      <div class="gp reveal"><h4>${e(p.judul)}</h4><p>${e(p.teks)}</p></div>`).join('\n')}
    </div>
  </div>
</section>

<section id="guru">
  <div class="wrap">
    <div class="reveal" style="max-width:720px">
      <span class="eyebrow">${e(g.label)}</span>
      <h2 class="h2">${hl(g.judul, g.judul_sorot)}</h2>
      <p class="lead">${e(g.teks)}</p>
    </div>
    <div class="roles">
${list(g.peran).map((p) => `      <div class="role reveal"><h4>${e(p.judul)}</h4><p>${e(p.teks)}</p>${p.ayat_ref ? `<small>${e(p.ayat_ref)}</small>` : ''}</div>`).join('\n')}
    </div>
  </div>
</section>

${closing(S)}
`;
}

// ---------- KABAR ----------
export function kabar({ S, K, B }) {
  return `
${banner('Kabar & Kegiatan', K.banner)}

<section id="buletin">
  <div class="wrap">
    ${buletinBlock(K, B)}
  </div>
</section>

<section id="berita" style="background:var(--sky)">
  <div class="wrap">
    <div class="news-top">
      <div class="reveal">
        <span class="eyebrow">${e(K.kegiatan.label)} ${e(igHandle(S))}</span>
        <h2 class="h2" style="margin:0">${e(K.kegiatan.judul)}</h2>
      </div>
    </div>
    <div class="news-grid" data-igfeed="5" data-keep=".ig">
${newsCards(K, 5)}
      <article class="news reveal ig"><div class="tx"><h3>${e(K.kartu_instagram.judul)}</h3><p>${e(K.kartu_instagram.teks)}</p><a class="btn btn-white sm" href="${e(igLink(S))}" target="_blank" rel="noopener">${e(igHandle(S))} →</a></div></article>
    </div>
  </div>
</section>

${closing(S)}
`;
}

// ---------- SUARA ALUMNI ----------
export function suaraAlumni({ S, A }) {
  const items = alumniItems(A);
  const cards = items.length
    ? items.map((a, k) => `      <article class="ac reveal"><div class="aph">${alumniPhoto(a)}</div><blockquote>${e(a.kutipan)}</blockquote><cite><b>${e(a.nama)}</b><span>${e(alumniInfo(a))}</span></cite>${a.cerita ? `<button type="button" class="btn btn-ghost sm more" data-story="s${k}">Baca selengkapnya →</button><div class="story-full" id="s${k}" hidden>${paras(a.cerita)}</div>` : ''}</article>`).join('\n')
    : `      <article class="ac empty">
        <div class="aph"><img src="/assets/logo.png" alt=""></div>
        <blockquote>${e(A.teks_kosong)}</blockquote>
        <cite><b>Sekolah MBBN</b><span>Sejak 2005</span></cite>
      </article>`;
  return `
${banner('Suara Alumni', A.banner)}

<section id="alumni">
  <div class="wrap">
    <div class="agrid">
${cards}
    </div>
  </div>
</section>

<section id="bagikan">
  <div class="wrap">
    <div class="share reveal">
      <div><h3>${e(A.ajakan.judul)}</h3><p>${e(A.ajakan.teks)}</p></div>
      <a class="btn btn-blue" href="${e(waLink(S, 'Halo Sekolah MBBN, saya alumni dan ingin berbagi cerita.'))}" target="_blank" rel="noopener">${e(A.ajakan.tombol)}</a>
    </div>
  </div>
</section>
<div class="modal" id="storyModal" hidden><div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="mName"><button type="button" class="modal-x" aria-label="Tutup">×</button><div class="m-head"><div class="aph" id="mPh"></div><div><b id="mName"></b><span id="mInfo"></span></div></div><div class="m-body" id="mBody"></div></div></div>

${closing(S)}
`;
}

// ---------- PENDAFTARAN ----------
export function pendaftaran({ S, R }) {
  const steps = `    <ol class="steps4">
${list(R.langkah).map((l, i) => `      <li class="reveal"><b>${i + 1}</b><h4>${e(l.judul)}</h4><p>${e(l.teks)}</p></li>`).join('\n')}
    </ol>`;
  const k = R.kontak, f = R.formulir;
  return `
${banner('Pendaftaran', R.banner, steps, 'reg')}

<section class="visit" id="kunjungi">
  <div class="wrap">
    <div class="reveal">
      <span class="eyebrow">${e(k.label)}</span>
      <h2 class="h2">${hl(k.judul, k.judul_sorot)}</h2>
      <ul class="info">
        <li><a href="${e(waLink(S, 'Halo Sekolah MBBN, saya ingin bertanya tentang pendaftaran.'))}" target="_blank" rel="noopener"><div class="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2"/></svg></div><div><strong>WhatsApp</strong><span>${e(S.whatsapp_tampil)}</span></div></a></li>
        <li><div class="it"><div class="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg></div><div><strong>Email</strong><span>${e(S.email)}</span></div></div></li>
        <li><a href="${e(mapsLink(S))}" target="_blank" rel="noopener"><div class="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M12 21s-7-6-7-11a7 7 0 0114 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg></div><div><strong>Lokasi</strong><span>${e(S.alamat)} · buka di Google Maps</span></div></a></li>
        <li><a href="${e(igLink(S))}" target="_blank" rel="noopener"><div class="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/></svg></div><div><strong>Instagram</strong><span>${e(igHandle(S))}</span></div></a></li>
      </ul>
    </div>
    <form class="card reveal" id="daftarForm">
      <h3>${e(f.judul)}</h3>
      <p class="sub">${e(f.teks)}</p>
      <div class="row2">
        <div><label for="dAnak">Nama calon murid</label><input id="dAnak" required></div>
        <div><label for="dJenjang">Jenjang</label><select id="dJenjang" required><option value="">Pilih…</option>${list(f.jenjang).map((j) => `<option>${e(j)}</option>`).join('')}</select></div>
      </div>
      <div class="row2">
        <div><label for="dUsia">Usia anak</label><input id="dUsia" placeholder="cth. 5 tahun"></div>
        <div><label for="dHp">No. WhatsApp orang tua</label><input id="dHp" type="tel" required></div>
      </div>
      <div><label for="dOrtu">Nama orang tua/wali</label><input id="dOrtu" required></div>
      <div><label for="dKeperluan">Keperluan</label><select id="dKeperluan"><option>Info pendaftaran &amp; biaya</option><option>Menjadwalkan kunjungan</option><option>Langsung mendaftar</option></select></div>
      <div><label for="dPesan">Pertanyaan (opsional)</label><textarea id="dPesan" rows="2"></textarea></div>
      <button class="btn btn-blue" type="submit">Siapkan pesan WhatsApp</button>
      <div class="wa-out" id="daftarOut" hidden><p>Pesan Anda sudah siap. Tekan tombol di bawah untuk membukanya di WhatsApp.</p><a class="btn btn-navy" id="daftarLink" href="#" target="_blank" rel="noopener">Buka WhatsApp →</a></div>
    </form>
  </div>
</section>

${closing(S)}
`;
}

// ---------- IKUT TERLIBAT ----------
export function ikutTerlibat({ S, I }) {
  const r = I.rekening, a = I.ajakan;
  const gform = a.google_form || waLink(S, 'Halo Sekolah MBBN, saya mau terlibat.');
  const accDigits = String(r.nomor || '').replace(/\D/g, '');
  return `
${banner('Ikut Terlibat', I.banner)}

<section class="give" id="terlibat" style="background:#fff">
  <div class="wrap">
    <div class="give-grid" style="margin-top:0">
${list(I.cara).map((c) => `      <div class="g reveal"><h3>${e(c.judul)}</h3><p>${e(c.teks)}</p><ul>${list(c.poin).map((p) => `<li>${e(p)}</li>`).join('')}</ul></div>`).join('\n')}
    </div>
  </div>
</section>

<section class="give" id="dukung">
  <div class="wrap">
    <div class="donate">
      <div class="bank reveal">
        <div><h3>${e(r.judul)}</h3><p style="margin-top:6px">${e(r.teks)}</p></div>
        <div>
          <div style="font-weight:700;color:#7cd2fb;letter-spacing:.1em;font-size:.85rem">${e(r.bank)}</div>
          <div class="acc" id="accNum">${e(r.nomor)}</div>
          <div style="margin-bottom:14px">a.n. <b style="color:#fff">${e(r.atas_nama)}</b></div>
          <button class="copy" id="copyAcc" type="button" data-acc="${e(accDigits)}">Salin nomor rekening</button>
        </div>
        ${r.qris ? `<div class="row">
          <img class="qr" src="${e(src(r.qris))}" alt="QRIS ${e(r.atas_nama)}">
          <div class="yay"><img src="/assets/uploads/logo_ydpk.webp" alt=""><span>${inline(r.qris_teks)}</span></div>
        </div>` : ''}
      </div>
      <div class="join reveal">
        <span class="eyebrow">${e(a.label)}</span>
        <h3>${e(a.judul)}</h3>
        <p>${e(a.teks)}</p>
        <div class="join-btns">
          <a class="btn btn-blue" href="${e(gform)}" target="_blank" rel="noopener">${e(a.tombol)}</a>
          <a class="btn btn-wa" href="${e(waLink(S, 'Halo Sekolah MBBN, saya ingin terlibat mendukung sekolah.'))}" target="_blank" rel="noopener"><svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2z"/></svg>Chat WhatsApp</a>
        </div>
        <p class="wa-num">WhatsApp sekolah: <b>${e(S.whatsapp_tampil)}</b></p>
      </div>
    </div>
  </div>
</section>
<div class="toast" id="toast">Nomor rekening disalin</div>

${closing(S)}
`;
}

// ---------- 404 ----------
export function notFound() {
  return `
<section class="pbanner" id="beranda" style="padding-bottom:96px">
  <div class="pat dots"></div>
  <div class="wrap">
    <div class="crumb"><a href="/">Beranda</a><span>›</span>Halaman tidak ditemukan</div>
    <h1>Halaman tidak ditemukan</h1>
    <p>Alamat yang Anda buka tidak tersedia atau sudah dipindahkan.</p>
    <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:26px"><a class="btn btn-white" href="/">Kembali ke Beranda</a><a class="btn btn-line" href="/pendaftaran.html">Pendaftaran</a></div>
  </div>
</section>
`;
}

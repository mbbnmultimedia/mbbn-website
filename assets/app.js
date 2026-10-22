(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var WA = '6285711060828';

  var yr = $('#yr'); if (yr) yr.textContent = new Date().getFullYear();

  // nav
  var nav = $('#nav'), burger = $('#burger');
  if (burger) burger.addEventListener('click', function () { nav.classList.toggle('open'); });
  var mobile = function () { return window.matchMedia('(max-width:1060px)').matches; };
  $$('#nav li.dd>a').forEach(function (a) {
    a.addEventListener('click', function (e) { if (mobile()) { e.preventDefault(); a.parentElement.classList.toggle('exp'); } });
  });

  // back to top
  var totop = $('#totop');
  if (totop) addEventListener('scroll', function () { totop.classList.toggle('show', scrollY > 700); }, { passive: true });

  // misi slider
  var slides = $$('#misi .slide'), pager = $('#misiPager');
  if (slides.length && pager) {
    var i = 0, timer;
    var go = function (k) { i = k; slides.forEach(function (el, j) { el.classList.toggle('on', j === k); }); $$('button', pager).forEach(function (b, j) { b.classList.toggle('on', j === k); }); };
    var reset = function () { clearInterval(timer); timer = setInterval(function () { go((i + 1) % slides.length); }, 5000); };
    slides.forEach(function (_, k) { var b = document.createElement('button'); b.type = 'button'; b.textContent = k + 1; b.setAttribute('aria-label', 'Misi ' + (k + 1)); b.onclick = function () { go(k); reset(); }; pager.appendChild(b); });
    go(0); reset();
  }


  // ===== Instagram feed (Behold.so) =====
  // Isi dengan Feed ID dari Behold.so, contoh: 'AbCdEf123456'. Kosong = tampilkan kartu cadangan.
  var BEHOLD_FEED_ID = '';
  var grids = $$('[data-igfeed]');
  if (BEHOLD_FEED_ID && grids.length && window.fetch) {
    var esc = function (s) { return String(s || '').replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
    var bulan = ['JAN','FEB','MAR','APR','MEI','JUN','JUL','AGU','SEP','OKT','NOV','DES'];
    fetch('https://feeds.behold.so/' + BEHOLD_FEED_ID).then(function (r) { if (!r.ok) throw 0; return r.json(); }).then(function (data) {
      var posts = Array.isArray(data) ? data : (data.posts || []);
      if (!posts.length) return;
      grids.forEach(function (g) {
        var n = +g.dataset.igfeed || 3, keep = g.dataset.keep ? $(g.dataset.keep, g) : null, html = '';
        posts.slice(0, n).forEach(function (p) {
          var cap = (p.prunedCaption || p.caption || '').replace(/\s+#\S+/g, '').trim();
          var lines = cap.split(/\n+/).filter(Boolean), title = lines[0] || 'Kegiatan Sekolah MBBN';
          if (title.length > 90) title = title.slice(0, 87).replace(/\s+\S*$/, '') + '…';
          var rest = lines.slice(1).join(' ');
          var img = (p.sizes && p.sizes.medium && p.sizes.medium.mediaUrl) || (p.mediaType === 'VIDEO' ? p.thumbnailUrl : p.mediaUrl) || p.thumbnailUrl || '';
          var d = new Date(p.timestamp), tm = isNaN(d) ? '' : d.getDate() + '<br>' + bulan[d.getMonth()];
          html += '<a class="news igpost" href="' + esc(p.permalink) + '" target="_blank" rel="noopener"><div class="im"><img src="' + esc(img) + '" alt="' + esc(title) + '" loading="lazy">' + (tm ? '<time>' + tm + '</time>' : '') + '</div><div class="tx"><h3>' + esc(title) + '</h3>' + (rest ? '<p>' + esc(rest) + '</p>' : '') + '<span class="iglink">Lihat di Instagram →</span></div></a>';
        });
        g.innerHTML = html;
        if (keep) g.appendChild(keep);
      });
    }).catch(function () { /* feed tidak tersedia: kartu cadangan tetap tampil */ });
  }

  // alumni stories
  var modal = $('#storyModal');
  if (modal) {
    var lastBtn = null;
    var close = function () { modal.hidden = true; document.body.style.overflow = ''; if (lastBtn) lastBtn.focus(); };
    $$('[data-story]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var card = btn.closest('.ac'), full = document.getElementById(btn.dataset.story);
        $('#mName').textContent = $('cite b', card).textContent;
        $('#mInfo').textContent = $('cite span', card).textContent;
        $('#mBody').innerHTML = full.innerHTML;
        var ph = $('.aph', card); $('#mPh').innerHTML = ph.innerHTML;
        lastBtn = btn; modal.hidden = false; document.body.style.overflow = 'hidden'; $('.modal-x', modal).focus();
      });
    });
    $('.modal-x', modal).addEventListener('click', close);
    modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden) close(); });
  }

  // lightbox
  var lb = $('#lb');
  if (lb) {
    $$('#gallery img').forEach(function (img) { img.addEventListener('click', function () { $('img', lb).src = img.src; lb.classList.add('open'); }); });
    lb.addEventListener('click', function () { lb.classList.remove('open'); });
  }

  // copy account number
  var copyBtn = $('#copyAcc'), toast = $('#toast');
  if (copyBtn) copyBtn.addEventListener('click', function () {
    var show = function (msg) { toast.textContent = msg; toast.classList.add('show'); setTimeout(function () { toast.classList.remove('show'); }, 1800); };
    var selectIt = function () { var r = document.createRange(); r.selectNodeContents($('#accNum')); var s = getSelection(); s.removeAllRanges(); s.addRange(r); show('Nomor terpilih, tekan salin'); };
    try { navigator.clipboard.writeText('0028017777').then(function () { show('Nomor rekening disalin'); }, selectIt); } catch (e) { selectIt(); }
  });

  var waUrl = function (lines) { return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(lines.join('\n')); };
  var val = function (id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; };

  // pendaftaran form
  var df = $('#daftarForm');
  if (df) df.addEventListener('submit', function (e) {
    e.preventDefault();
    var L = ['Halo Sekolah MBBN,', 'Saya ingin bertanya tentang pendaftaran:', '', 'Nama calon murid: ' + val('dAnak'), 'Jenjang: ' + val('dJenjang')];
    if (val('dUsia')) L.push('Usia: ' + val('dUsia'));
    L.push('Nama orang tua/wali: ' + val('dOrtu'), 'No. WhatsApp: ' + val('dHp'), 'Keperluan: ' + val('dKeperluan'));
    if (val('dPesan')) L.push('Pertanyaan: ' + val('dPesan'));
    $('#daftarLink').href = waUrl(L); $('#daftarOut').hidden = false;
  });

  // komitmen form
  var cf = $('#commitForm');
  if (cf) {
    var anak = $('#cAnak'), hint = $('#anakHint');
    var rp = function (n) { return 'Rp ' + n.toLocaleString('id-ID'); };
    var sync = function () {
      var v = $('input[name=komit]:checked').value, money = v === 'Orang Tua Asuh' || v === 'Donatur Operasional Sekolah';
      $('#fAnak').hidden = v !== 'Orang Tua Asuh';
      $('#fNominal').hidden = v !== 'Donatur Operasional Sekolah';
      $('#fFreq').hidden = !money; $('#detailRow').hidden = !money;
      hint.textContent = rp(800000 * Math.max(1, +anak.value || 1)) + ' / bulan';
    };
    $$('input[name=komit]').forEach(function (r) { r.addEventListener('change', sync); });
    anak.addEventListener('input', sync); sync();
    cf.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = $('input[name=komit]:checked').value;
      var L = ['Halo Sekolah MBBN / Yayasan Dian Pelita Kasih,', 'Saya ingin berkomitmen mendukung:', '', 'Nama: ' + val('cNama'), 'No. HP: ' + val('cHp')];
      if (val('cEmail')) L.push('Email: ' + val('cEmail'));
      L.push('Komitmen: ' + v);
      if (v === 'Orang Tua Asuh') L.push('Jumlah anak: ' + (anak.value || 1) + ' (' + hint.textContent + ')', 'Frekuensi: ' + val('cFreq'));
      if (v === 'Donatur Operasional Sekolah') L.push('Nominal: Rp ' + (val('cNominal') || '-'), 'Frekuensi: ' + val('cFreq'));
      if (val('cPesan')) L.push('Catatan: ' + val('cPesan'));
      $('#commitLink').href = waUrl(L); $('#commitOut').hidden = false;
    });
  }
})();

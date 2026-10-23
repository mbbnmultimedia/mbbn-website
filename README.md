# Website Sekolah Mutiara Bagi Bangsa Nusantara

Semua teks dan foto website diedit lewat **Pages CMS**. Desain ada di kode; isi ada di folder `content/`. Setiap kali konten disimpan, Cloudflare membangun ulang website (sekitar 1–2 menit).

## Struktur

```
content/          Isi website per halaman (JSON) — diedit lewat CMS
  beranda.json · tentang.json · pembelajaran.json · kabar.json · buletin.json
  alumni.json · pendaftaran.json · ikut-terlibat.json · settings.json
assets/           CSS, JS, logo
assets/uploads/   Foto yang bisa diganti lewat CMS
src/lib.mjs       Layout bersama (header, footer, helper)
src/pages.mjs     Template tiap halaman
build.mjs         Membangun website ke folder _site/
wrangler.jsonc    Konfigurasi Cloudflare Workers (menyajikan _site/)
.pages.yml        Konfigurasi menu & kolom di Pages CMS
```

## Mengedit konten (untuk staf)

1. Buka **app.pagescms.org** dan masuk dengan akun GitHub.
2. Pilih repo `mbbn-website`.
3. Pilih menu halaman di kiri: **Beranda, Tentang Kami, Pembelajaran, Kabar & Kegiatan, Buletin, Suara Alumni, Pendaftaran, Ikut Terlibat, Pengaturan Sekolah**.
4. Ubah teks atau unggah foto, lalu klik **Save**.
5. Tunggu 1–2 menit, lalu buka website (refresh dengan Ctrl+F5 bila perlu).

Tips:
- Teks panjang: pisahkan paragraf dengan **baris kosong**. Tulis `**kata**` untuk huruf tebal (hanya di kolom yang menyebutkannya).
- Foto: ikuti rasio yang disebut di label kolom (mis. 1:1 untuk foto hero). Kompres dulu ke lebar ±1200 px.
- Kolom "Judul (bagian berwarna biru)" adalah potongan judul yang tampil biru.
- Menambah editor: undang akun GitHub mereka di repo (Settings → Collaborators).

## Pengaturan Cloudflare (sekali saja)

Di proyek Worker `mbbn-website`: **Settings → Build**
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Root directory: `/`

Nama Worker harus sama dengan `name` di `wrangler.jsonc` (`mbbn-website`).

## Mencoba di komputer sendiri (opsional)

```bash
npm run build          # hasil di _site/
npx serve _site        # buka http://localhost:3000
```

Butuh Node.js 18 ke atas. Tidak ada dependensi yang perlu di-install.

## Mengubah desain

Tampilan ada di `assets/style.css`, struktur halaman di `src/pages.mjs`, layout bersama di `src/lib.mjs`. Setelah menambah kolom baru di template, tambahkan juga kolomnya di `.pages.yml` supaya muncul di CMS.

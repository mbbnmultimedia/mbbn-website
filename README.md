# Website Sekolah Mutiara Bagi Bangsa Nusantara

Website statis (HTML + CSS + JS) untuk Sekolah MBBN, di-hosting di **Cloudflare Pages** dari repo GitHub ini. Tidak ada proses build: file di repo inilah yang langsung tampil di website.

## Struktur

```
index.html            Beranda
tentang.html          Tentang Kami (sejarah, visi-misi, budaya, yayasan & gereja naungan)
pembelajaran.html     PAUD, SD (PKBM), kurikulum, dasar Alkitabiah, profil lulusan
kabar.html            Buletin + kegiatan terbaru (feed Instagram)
suara-alumni.html     Kesaksian alumni
pendaftaran.html      Alur pendaftaran + formulir ke WhatsApp
ikut-terlibat.html    Doa, dana, daya + rekening & QRIS
404.html              Halaman "tidak ditemukan"
assets/style.css      Semua tampilan
assets/app.js         Menu, slider misi, formulir WA, feed Instagram, dll.
assets/*.webp|png     Foto & logo
_headers              Aturan cache untuk Cloudflare Pages
```

## Deploy pertama kali

### 1. Buat repo di GitHub
1. Login ke github.com, klik **New repository**.
2. Nama: `mbbn-website` (bebas). Pilih **Private** atau **Public**. Jangan centang "Add a README".
3. Klik **Create repository**.
4. Di halaman repo kosong, klik **uploading an existing file**, lalu seret **seluruh isi folder ini** (bukan foldernya) ke browser, termasuk folder `assets`.
5. Klik **Commit changes**.

Atau lewat terminal:
```bash
cd mbbn-website
git init -b main
git add .
git commit -m "Website awal Sekolah MBBN"
git remote add origin https://github.com/<akun-anda>/mbbn-website.git
git push -u origin main
```

### 2. Sambungkan ke Cloudflare Pages
1. Login ke dash.cloudflare.com, buka **Workers & Pages**, lalu **Create**, pilih tab **Pages**, lalu **Connect to Git**.
2. Izinkan Cloudflare mengakses GitHub, pilih repo `mbbn-website`.
3. Pengaturan build:
   - Framework preset: **None**
   - Build command: *(kosongkan)*
   - Build output directory: `/`
4. Klik **Save and Deploy**. Dalam 1-2 menit website online di `https://<nama-proyek>.pages.dev`.

Setiap kali ada perubahan yang di-commit ke branch `main`, Cloudflare otomatis memperbarui website.

### 3. Domain (nanti)
Setelah domain (mis. `mbbn.sch.id`) aktif: di proyek Pages buka **Custom domains**, lalu **Set up a domain**, dan ikuti petunjuknya (arahkan nameserver domain ke Cloudflare).

## Mengubah konten yang sering diganti

| Yang diubah | File | Cari teks |
|---|---|---|
| Feed Instagram (Feed ID Behold.so) | `assets/app.js` | `var BEHOLD_FEED_ID = '';` |
| Link Google Form "Saya mau terlibat" | `ikut-terlibat.html` | `Saya mau terlibat` |
| Link 3 buletin terakhir | `index.html` dan `kabar.html` | `heyzine.com` |
| Nomor WhatsApp | semua file `.html` + `assets/app.js` | `6285711060828` |
| Kesaksian alumni | `suara-alumni.html` | `[Nama Alumni]` |

Di GitHub, buka file-nya, klik ikon pensil (Edit), ubah, lalu **Commit changes**. Website ikut berubah sekitar 1 menit kemudian.

> Rencana berikutnya: memasang CMS (Pages CMS) supaya konten bisa diubah lewat formulir tanpa menyentuh kode.

# Portofolio Interaktif - Syawal Okta Syahputra

![Portfolio Screenshot](https://github.com)

Selamat datang di repositori portofolio pribadi saya. Ini bukan sekadar portofolio statis biasa, melainkan sebuah aplikasi web dinamis dan interaktif yang dibangun dengan teknologi modern. Proyek ini dirancang untuk menampilkan keahlian, proyek, dan perjalanan saya di dunia teknologi, khususnya dalam bidang **Infrastruktur Jaringan, Administrasi Sistem, dan Keamanan Siber**.

**[🔗 Lihat Live Demo](https://portofolio.oktodev.me/)**

---

## ✨ Fitur Unggulan

Portofolio ini dilengkapi dengan berbagai fitur modern untuk memberikan pengalaman pengguna yang luar biasa:

- **🎨 Desain Modern & Responsif**: Dibuat dengan **Tailwind CSS**, memastikan tampilan yang sempurna di semua perangkat, dari desktop hingga mobile.
- **🌐 Dukungan Multi-Bahasa**: Pengguna dapat beralih antara Bahasa Indonesia (ID) dan Bahasa Inggris (EN) dengan mudah.
- **🚀 Animasi Halus**:
  - **Efek Ketik (Typing Effect)** pada nama di bagian hero.
  - **Animasi saat Scroll**: Elemen-elemen muncul secara elegan saat pengguna menggulir halaman, diimplementasikan dengan `IntersectionObserver`.
  - **Efek Cahaya Kursor**: Kursor mouse memancarkan cahaya gradien yang interaktif.
- **🤖 Asisten AI Chatbot**: Sebuah chatbot interaktif untuk membantu pengunjung menavigasi portofolio dan mendapatkan informasi dengan cepat.
- **✉️ Formulir Kontak Fungsional**: Terintegrasi dengan **EmailJS** untuk mengirim pesan langsung ke email saya.
- **🔍 Filter Proyek Dinamis**: Pengguna dapat memfilter daftar proyek berdasarkan kategori (Jaringan, Server, Keamanan, dll.) dengan animasi yang mulus.
- **📜 Navigasi Cerdas**:
  - Navigasi yang menyorot bagian aktif secara otomatis saat menggulir.
  - Efek _hover_ yang elegan pada menu navigasi desktop.
  - Tombol "Scroll to Top" yang muncul saat halaman digulir ke bawah.
- **💬 Carousel Testimonial**: Menampilkan ulasan dari rekan kerja atau mentor dengan transisi otomatis dan manual.
- **🔐 Modal Autentikasi**: Termasuk UI untuk modal Login, Sign Up, dan Lupa Password (saat ini masih berupa simulasi).
- **⚙️ State Management Efisien**: Menggunakan React Hooks (`useState`, `useEffect`, `useRef`, `useMemo`) untuk mengelola state aplikasi yang kompleks.

---

## 🛠️ Teknologi yang Digunakan

- **Frontend**: React.js
- **Styling**: Tailwind CSS
- **Ikon**: Lucide React
- **Layanan Email**: EmailJS
- **Deployment**: (Disarankan: Vercel, Netlify)

---

## 🚀 Instalasi dan Menjalankan Secara Lokal

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di lingkungan lokal Anda.

### 1. Prasyarat

Pastikan Anda telah menginstal Node.js (disarankan versi LTS) dan npm.

### 2. Clone Repositori

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 3. Instalasi Dependensi

```bash
npm install
```

### 4. Konfigurasi Environment Variables

Proyek ini menggunakan EmailJS untuk formulir kontak. Anda perlu membuat akun di EmailJS dan mendapatkan kredensial Anda.

1.  Buat file baru di root proyek dengan nama `.env`.
2.  Salin konten dari file `.env.example` (jika ada) atau tambahkan variabel berikut ke dalam file `.env` Anda:

    ```env
    VITE_EMAILJS_SERVICE_ID=YOUR_SERVICE_ID
    VITE_EMAILJS_TEMPLATE_ID=YOUR_TEMPLATE_ID
    VITE_EMAILJS_PUBLIC_KEY=YOUR_PUBLIC_KEY
    ```

3.  Ganti `YOUR_...` dengan kredensial yang Anda dapatkan dari dashboard EmailJS.

    > **Penting**: Saya telah memperbarui kode untuk menggunakan environment variables demi keamanan. Pastikan Anda menggunakan kode terbaru.

### 5. Menjalankan Server Development

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173` (atau port lain yang tersedia).

---

## 📦 Build untuk Produksi

Untuk membuat versi produksi dari aplikasi Anda:

```bash
npm run build
```

Perintah ini akan membuat folder `dist` yang berisi file statis yang siap untuk di-deploy.

---

## 🤝 Kontribusi

Saat ini, proyek ini adalah portofolio pribadi dan tidak secara aktif mencari kontribusi. Namun, jika Anda menemukan bug atau memiliki saran untuk perbaikan, jangan ragu untuk membuat *Issue*.

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah **Lisensi MIT**. Lihat file `LICENSE` untuk detail lebih lanjut.

---

Dibuat dengan ❤️ oleh **Syawal Okta Syahputra**.

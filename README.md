## Algorithm Performance Lab

### Eksperimen & Visualisasi Runtime Algoritma

## 📌 Deskripsi Proyek

Algorithm Performance Lab adalah aplikasi web interaktif yang digunakan untuk menganalisis dan membandingkan efisiensi algoritma dalam konteks pencarian toko terdekat berdasarkan koordinat geografis.

Proyek ini dikembangkan sebagai Tugas Besar Mata Kuliah Analisis Kompleksitas Algoritma (Semester Ganjil 2025/2026), dengan fokus pada perbandingan:

- Algoritma iteratif (O(n))

- Algoritma rekursif (O(n))

- Algoritma sorting bawaan JavaScript (Array.prototype.sort) dengan kompleksitas O(n log n)

Pengukuran performa dilakukan dengan berbagai ukuran dataset, disertai visualisasi runtime, analisis otomatis, dan representasi proses algoritma.

## 🎯 Tujuan

Tujuan utama dari proyek ini adalah:

- Membandingkan efisiensi algoritma iteratif dan rekursif dalam menyelesaikan permasalahan pencarian minimum.

- Menganalisis apakah algoritma sorting bawaan JavaScript merupakan solusi yang efisien untuk kasus pencarian toko terdekat.

- Memvisualisasikan perbedaan performa algoritma dalam berbagai ukuran dataset.

- Membantu pemahaman konsep kompleksitas waktu asimtotik melalui eksperimen langsung.

## 🧪 Studi Kasus

Studi kasus yang digunakan adalah:

Menentukan lokasi toko terdekat dari posisi pengguna berdasarkan koordinat lintang dan bujur.

Langkah umum yang dilakukan:

1. Menghitung jarak antara pengguna dan setiap toko menggunakan rumus Haversine.

2. Menentukan toko dengan jarak minimum menggunakan tiga pendekatan algoritmik:

   - Iteratif

   - Rekursif

   - Sorting (built-in javascript function)

## ✨ Fitur Utama

- 📊 Grafik Runtime Interaktif
  Menampilkan perbandingan waktu eksekusi algoritma berdasarkan ukuran dataset.

- 🎛️ Kontrol Eksperimen

  - Penentuan ukuran dataset

  - Jumlah iterasi benchmark

  - Pemilihan algoritma yang ditampilkan

- 🤖 Analisis Otomatis
  Insight berbasis hasil benchmark untuk membantu interpretasi performa algoritma.

- 🧩 Visualisasi Algoritma
  Representasi proses internal algoritma (iteratif, rekursif, dan sorting) menggunakan data sampel.

**Catatan:** Visualisasi algoritma bersifat representatif, sedangkan pengukuran runtime dilakukan pada seluruh dataset sesuai ukuran yang dipilih.

🛠️ Teknologi yang Digunakan

- Proyek ini dibangun menggunakan teknologi berikut:

- ⚡ Vite

- 🟦 TypeScript

- ⚛️ React

- 🎨 shadcn-ui

- 💨 Tailwind CSS

## 🚀 Menjalankan Proyek Secara Lokal

**Prasyarat**

    - Node.js (disarankan via nvm)

    - npm

Langkah Instalasi

```sh
# Clone repository

git clone https://github.com/Gebext/finpro-aka.git

# Masuk ke folder proyek

cd finpro-aka

# Install dependency

npm install

# Jalankan server development

npm run dev

Aplikasi akan berjalan di mode development dengan hot-reload.
```

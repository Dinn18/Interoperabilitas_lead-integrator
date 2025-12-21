# uas-interoperabilitas-kelompok-6
# Lead Integrator

## Deskripsi Proyek
Proyek ini merupakan sebuah **REST API berbasis Node.js dan Express.js** yang berfungsi untuk **mengintegrasikan data produk dari tiga vendor berbeda** dengan format data yang tidak seragam.  
API ini melakukan proses **fetch data, normalisasi struktur, dan penggabungan (merge)** sehingga menghasilkan data yang konsisten dan siap digunakan oleh aplikasi lain.

Vendor yang terlibat:
- **Vendor A** (Sistem Legacy)
- **Vendor B** (Sistem Modern)
- **Vendor C** (REST API Kuliner)

---

## Tujuan
- Mengintegrasikan data dari berbagai vendor dengan struktur berbeda
- Menyeragamkan atribut data produk
- Menyediakan endpoint API yang mudah dikonsumsi
- Menerapkan konsep **asynchronous programming** dan **Promise.all**

---

## Teknologi yang Digunakan
- Node.js
- Express.js
- Fetch API
- JavaScript (ES6)

---

## Struktur Data Hasil Normalisasi
Setiap data produk yang dikembalikan API memiliki format berikut:

```json
{
  "id": "string",
  "nama": "string",
  "harga_final": "number",
  "status": "Tersedia | Tidak Tersedia",
  "sumber": "Vendor A | Vendor B | Vendor C"
}

const express = require('express');
const app = express();
const PORT = 3000;

const URL_API_MHS1 = " https://api-vendor-a-warung-legacy.vercel.app/vendora/products"; // Virdan
const URL_API_MHS2 = " https://api-vendor-b-distro-modern.vercel.app/vendorb/products"; // Nuris
const URL_API_MHS3 = " https://api-vendor-c-resto-kuliner.vercel.app/vendorc/products"; // Firman Ardiyansyah

async function mahasiswa1() {
    const res = await fetch(URL_API_MHS1);
    const data = await res.json();
    const initialData = data.map(item => ({
        Id: item.kd_produk,
        nama: item.nm_brg,
        harga_final: parseInt(item.hrg, 10) * 0.9,
        status: (item.ket_stok == "ada") ? "Tersedia" : "Tidak Tersedia",
        sumber: "Vendor A"
    }));

    return initialData;
}

async function mahasiswa2() {
    const res = await fetch(URL_API_MHS2);
    const data = await res.json();
    const initialData = data.map(item => ({
        id: item.sku,
        nama: item.productName, 
        harga_final: item.price,
        status: item.isAvailable ? "Tersedia" : "Tidak Tersedia",
        sumber: "Vendor B"
    }));

    return initialData;
}

app.get('/', async (req, res) => {
    try {
        const [data_A, data_B, data_C] = await Promise.all([
            mahasiswa1(),
            mahasiswa2(),
            mahasiswa3()
        ]);
        const getAllData = [...data_A, ...data_B, ...data_C];

        res.json({kel6: 'Project Api Banyuwangi Market Place', data: getAllData});

    } catch (error) {
        res.status(500).send('Terjadi kesalahan: ' + error.message);
    }
});

async function mahasiswa3() {
     const res = await fetch(URL_API_MHS3);
     const data = await res.json();
     const initialData = data.map(item => ({
         id: item.id,
         nama: `${item.details.name}${item.details.category == "Food" ? " (Recommended)" : ""}`,
         harga_final: item.pricing.base_price,
         status: (item.stock <= 0) ? "TIdak Tersedia" : "Tersedia",
         sumber: "Vendor C",
     }));

     return initialData;
}


app.get('/vendor-a', async (req, res) => {
    try {
        const initialData = await mahasiswa1();
        res.json(initialData);
    } catch (error) {
        res.status(500).send('Terjadi kesalahan: ' + error.message);
    }
});

app.get('/vendor-b', async (req, res) => {
    try {
        const initialData = await mahasiswa2();
        res.json(initialData);
    } catch (error) {
        res.status(500).send('Terjadi kesalahan: ' + error.message);
    }
});

app.get('/vendor-c', async (req, res) => {
    try {
        const initialData = await mahasiswa3();
        res.json(initialData);
    } catch (error) {
        res.status(500).send('Terjadi kesalahan: ' + error.message);
    }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
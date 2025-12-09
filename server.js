const express = require('express');
const app = express();
const PORT = 3000;

const URL_API_MHS1 = " https://api-vendor-a-warung-legacy.vercel.app/vendora/products"; // Virdan
const URL_API_MHS2 = " https://api-vendor-b-distro-modern.vercel.app/vendorb/products"; // Nuris
const URL_API_MHS3 = " https://api-vendor-c-resto-kuliner.vercel.app/vendorc/products"; // Firman Ardiyansyah

async function getDataMahasiswa1() {
    const res = await fetch(URL_API_MHS1);
    const data = await res.json();
    const formattedData = data.map(item => ({
        Id: item.kd_produk,
        nama: item.nm_brg,
        harga_final: parseInt(item.hrg, 10) * 0.9,
        // harga final: item.hrg * 0.9,
        status: (item.ket_stok == "ada") ? "Tersedia" : "Tidak Tersedia",
        sumber: "Vendor A"
    }));

    return formattedData;
}

async function getDataMahasiswa2() {
    const res = await fetch(URL_API_MHS2);
    const data = await res.json();
    const formattedData = data.map(item => ({
        id: item.sku,
        nama: item.productName, 
        harga_final: item.price,
        status: item.isAvailable ? "Tersedia" : "Tidak Tersedia",
        sumber: "Vendor B"
    }));

    return formattedData;
}

app.get('/all-vendors', async (req, res) => {
    try {
        const [dataA, dataB, dataC] = await Promise.all([
            getDataMahasiswa1(),
            getDataMahasiswa2(),
            getDataMahasiswa3()
        ]);
        const allData = [...dataA, ...dataB, ...dataC];

        res.json({kel6: 'Project Api Banyuwangi Market Place', data: allData});

    } catch (error) {
        res.status(500).send('Terjadi kesalahan: ' + error.message);
    }
});

async function getDataMahasiswa3() {
     const res = await fetch(URL_API_MHS3);
     const data = await res.json();
     const formattedData = data.map(item => ({
         id: item.id,
         nama: `${item.details.name}${item.details.category == "Food" ? " (Recommended)" : ""}`,
         harga_final: item.pricing.base_price,
         status: (item.stock <= 0) ? "TIdak Tersedia" : "Tersedia",
         sumber: "Vendor C",
     }));

     return formattedData;
}


app.get('/vendor-a', async (req, res) => {
    try {
        const formattedData = await getDataMahasiswa1();
        res.json(formattedData);
    } catch (error) {
        res.status(500).send('Terjadi kesalahan: ' + error.message);
    }
});

app.get('/vendor-b', async (req, res) => {
    try {
        const formattedData = await getDataMahasiswa2();
        res.json(formattedData);
    } catch (error) {
        res.status(500).send('Terjadi kesalahan: ' + error.message);
    }
});

app.get('/vendor-c', async (req, res) => {
    try {
        const formattedData = await getDataMahasiswa3();
        res.json(formattedData);
    } catch (error) {
        res.status(500).send('Terjadi kesalahan: ' + error.message);
    }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
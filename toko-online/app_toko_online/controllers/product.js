var products = require('../data/products.json');
var Product = require('../models/products');

const index = async (req, res) => {
  try {
    const prod = await Product.find({});
    res.render('index', {
      title: 'Toko Online Sederhana - Ini dari Mongo DB',
      products: prod,
      query: "" 
    });
  } catch (err) {
    res.status(500).send("Gagal Memuat Produk");
  }
};

const detail = async(req, res) =>{
    try{
        const productId = req.params.id;
        const product = await Product.findById(productId);

        if(!product){
            return res.status(404).send('Produk Tidak Ditemukan!');
        }
        res.render('product-detail',
            {
                title : product.name,
                product : product
            }
        );
    }catch(err){
        res.status(404).send("Gagal Memuat Detail Produk");
    }
};

// Buat rest api
const apiall = async(req, res) => {
    try{
        const prod = await Product.find({});
        res.status(200).json(
            {
                status: true,
                message: "Data Produk Berhasil Diambil",
                data: prod
            }
        );
    }catch(err){
        res.status(500).json({
            status : false,
            message : "Gagal Memuat Produk"
        });
    }
};

module.exports = {index, detail, apiall};
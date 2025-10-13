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

const create = async(req,res) =>{
    try{
        // ambil data nya
        const newProduct = new Product({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            stock: req.body.stock || 0
        });

        // simpan ke db
        const product = await newProduct.save();

        // kirim respon
        res.status(200).json({
            status : true,
            message : "Produk berhasil disimpan",
            data: product
        });

    }catch(err){
        if(err.name === 'validationError'){
            res.status(400).json({
                status: false,
                message: err.message
            });
        }else{
            res.status(500).json({
                status: false,
                message: 'Internal Server Error'
            });
        }
    }
};

const detailproduk = async(req,res) =>{
    try{
        const productId = req.params.id;
        const product = await Product.findById(productId);

        if(!product){
            return res.status(404).json({
                status: false,
                message: "Produk Tidak Ditemukan"
            });
        }
        res.status(200).json({
            status: true,
            message: "Detail Produk Berhasil Diambil",
            data: product
        })
    }catch(err){
        res.status(500).json({
            status: false,
            message: "Gagal Memuat Detail Produk"
        });
    }
};

const update = async(req,res) =>{
    try{
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if(!product){
            res.status(404).json({
                status:false, message: "Produk Tidak Ditemukan",
            });
        }
        res.status(200).json({
            status: true, message:"Produk Berhasil Di Update", data:product
        });
    }catch(err){
        if(err.name === 'CastError'){
            res.status(400).json({
                status: false, message: "Format ID Tidak Valid"
            });
        }else if(err.name === 'ValidationError'){
            res.status(400).json({
                status: false, message: err.message
            });
        }else{
            res.status(500).json({
                status: false, message: 'Internal Server Error'
            });
        }
    }
};

const remove = async(req,res) =>{
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
         if(!product){
            res.status(404).json({
                status: false, message: "Produk Tidak Ditemukan",
            });
         }else{
            res.status(200).json({
                status: true, message: "Produk Berhasil Dihapus"
            });
         }
    }catch(err){
        if(err.name === 'CastError'){
            res.status(200).json({
                status: true, message: "Format ID Tidak Valid",
            });
         }else{
            res.status(500).json({
                status: false, message: "Internal Server Error"
            });
         }
    }
};

module.exports = {index, detail, apiall, create, detailproduk, update,remove};
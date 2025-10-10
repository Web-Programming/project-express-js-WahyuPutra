const mongoose = require("mongoose");

// buat schema produk
const ProductSchema = new mongoose.Schema({
    // tidak perlu buat properti id karena akan dibuat otomatis 
    // dengan nama _id
    name:{
        type : String,
        required: [true, "Nama Produk Harus Di Isi"],
        trim: true,
    },
    price:{
        type : Number,
        required: [true, "Harga Produk Harus Di Isi"],
        min: [1000, "Harga produk Minimal 1000"],
    },
    description:{
        type : String,
        required: [false],
    },
    stock:{
        type : Number,
        default: 0,
    },
    createat:{
        type : Date,
        default: Date.now7,
    },
});

const Product = mongoose.model('Product',ProductSchema);

module.exports = Product;
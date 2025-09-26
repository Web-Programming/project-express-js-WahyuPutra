var express = require('express');
var router = express.Router();
//var product = require("../data/products.json");
var produk = require("../data/produk.json");


router.get("/:id", function(req, res, next){
    const productId = parseInt(req.params.id); // tangkap id dari url
    const product = produk.find(p => p.id === productId);

    if(!product){
        return res.status(404).send('Produk Tidak Ditemukan');
    }

    res.render('product-detail',{
        title : product.name,
        product : product
    }
    );
});
module.exports = router;
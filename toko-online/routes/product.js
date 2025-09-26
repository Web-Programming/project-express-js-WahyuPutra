const express = require('express');
const router = express.Router();
const products = require("../data/products.json");

router.get("/:id", function(req, res, next){
    const productId = parseInt(req.params.id); // tangkap ID dari URL
    const product = products.find(p => p.id == productId);

    if(!product){
        return res.status(404).send("produk tidak ditemukan")
    }

    res.render('product-detail', {
        title: product.name,
        product
    })
})

module.exports = router;
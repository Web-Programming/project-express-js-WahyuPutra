const express = require('express');
const router = express.Router();
const products = require('../data/products.json');


router.get("/:id", function(req, res, next){
    const productId = parseInt(req.params.id); // tangkap ID dari URL
    const product = products.find(p => p.id == productId);

    if(!product){
        return res.status(404).send("produk tidak ditemukan")
    }

    res.render('product-detail', 
        {
            title: product.name,
            product: product,
        }
    );
});

// tambahan soal 3
router.get("/:productId/review/:reviewId", function(req, res, next){
    const productId = parseInt(req.params.productId);
    const reviewId = parseInt(req.params.reviewId);

    const product = products.find(p => p.id === productId);
    if (!product){
        return res.status(404).send("Produk Tidak Ditemukan");
    }

    const review = {
        id: reviewId,
        content: `Ini adalah review ${reviewId} untuk produk ${productId}`
    }

    res.render('review-detail', {
        title : `Ulasan ${reviewId} untuk Produk ${productId}`,
        product,
        review
    });
});

module.exports = router;
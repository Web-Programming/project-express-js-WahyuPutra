var express = require('express');
var router = express.Router();
//const products = require('../data/products.json');
//var Products = require("../models/products");
//const { products } = require('../controllers/main');
var productController = require("../controllers/product");

router.get("/apiall", productController.apiall);
router.get("/all", productController.index);
router.get("/:id", productController.detail);




module.exports = router;
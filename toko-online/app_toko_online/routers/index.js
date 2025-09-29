var express = require('express');
var router = express.Router();
var mainController = require("../controllers/main");
var products = require('../data/products.json');

/* GET search page. */
router.get('/search', function (req, res, next) {
  const q = req.query.q ? req.query.q.toLowerCase() : "";

  let filteredProducts;
  if (!q) {
    filteredProducts = mainController.products; // jika query kosong tampilkan semua
  } else {
    filteredProducts = mainController.products.filter(p =>
      p.name.toLowerCase().includes(q)
    );
  }

  res.render('index', {
    title: 'Hasil Pencarian',
    products: filteredProducts,
    query: q
  });
});

router.get("/", mainController.index);

module.exports = router;
var express = require('express');
var router = express.Router();
var produk = require('../data/produk.json');

// new
var fs = require('fs');
var path = require('path');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Toko Online Keren', produk: produk});
// });

// baca data json
const dataPath = path.join(__dirname, '../data/produk.json');
let products = [];

try {
  const rawData = fs.readFileSync(dataPath);
  products = JSON.parse(rawData);
} catch (err) {
  console.error("Gagal baca produk.json:", err);
}

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Toko Online Keren',
    products:produk });
});

module.exports = router;
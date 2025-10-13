const express = require("express");
const routers = express.Router();

const productController = require("../../controllers/product");

// url create - Post (/api/produk)
routers.post("/",productController.create)

// url read all - Get (/api/produk)
routers.get("/", productController.apiall);

// url read one - detail - Get (api/produk/id)
routers.get("/:id",productController.detailproduk);

// url update - Put (/api/produk/:id)
routers.put("/:id",productController.update);

// url delete -Delete (/api/produk/:id)
routers.delete("/:id",productController.remove);

module.exports = routers;
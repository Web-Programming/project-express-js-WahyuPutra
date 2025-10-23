const express = require("express");
const routers = express.Router();

const orderController = require("../../controllers/order");
const auth = require("../middleware/authMiddleware");

// url create - Post (/api/produk)
routers.post("/", auth.adminOnly, orderController.create)

// url read all - Get (/api/produk)
routers.get("/", orderController.all);

// url read one - detail - Get (api/produk/id)
routers.get("/:id",orderController.detailorder);

// url update - Put (/api/produk/:id)
routers.put("/:id",orderController.update);

// url delete -Delete (/api/produk/:id)
routers.delete("/:id",orderController.remove);

module.exports = routers;
const express = require("express");
const routers = express.Router();

const userController = require("../../controllers/user");

// url create - Post (/api/produk)
routers.post("/",userController.create)

// url read all - Get (/api/produk)
routers.get("/", userController.apiall);

// url read one - detail - Get (api/produk/id)
routers.get("/:id",userController.getById);

// url update - Put (/api/produk/:id)
routers.put("/:id",userController.update);

// url delete -Delete (/api/produk/:id)
routers.delete("/:id",userController.remove);

module.exports = routers;
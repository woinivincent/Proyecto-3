const express = require("express");
const productController = require("../controllers/product");
const md_authAdmin = require("../middlewares/authenticated");

const api = express.Router();

const multiparty = require("connect-multiparty");
const md_upload = multiparty({uploadDir: "./uploads/products"});

api.get("/products", productController.getProducts);
api.post("/product", [md_authAdmin.asureAuthAdmin, md_upload], productController.createProduct);
api.get("/product/:id", productController.getProduct);
api.put("/product/:id", [md_authAdmin.asureAuthAdmin], productController.updateProduct);
api.delete("/product/:id", [md_authAdmin.asureAuthAdmin], productController.deleteProduct);

module.exports = api;

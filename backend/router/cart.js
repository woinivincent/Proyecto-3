const express = require('express');
const cartController = require('../controllers/cart');
const md_auth = require("../middlewares/authenticated");
const api = express.Router();

// Ruta para agregar un producto al carrito del usuario autenticado
api.post("/cart/addProduct", [md_auth.asureAuth], cartController.agregarProductCart);

// Ruta para editar la cantidad de un producto en el carrito del usuario autenticado
api.put("/cart/:productId", [md_auth.asureAuth], cartController.editCartProduct);

// Ruta para eliminar un producto del carrito del usuario autenticado
api.delete("/cart/:productId", [md_auth.asureAuth], cartController.deleteCartProduct);

//Ruta para obtener el carrito completo
api.get("/cart", [md_auth.asureAuth], cartController.getCart);

//Ruta para obtener un producto especifico
api.get("/cart/:productId", [md_auth.asureAuth], cartController.getCartProduct);

// Ruta para incrementar la cantidad de un producto en el carrito
api.put('/cart/aumentar/:productId', [md_auth.asureAuth], cartController.aumentarCantidad);

// Ruta para disminuir la cantidad de un producto en el carrito
api.put('/cart/disminuir/:productId', [md_auth.asureAuth], cartController.disminuirCantidad);
// api.delete("/cart", [md_auth.asureAuth], cartController.clearCart);

module.exports = api;

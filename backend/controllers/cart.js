const Cart = require("../models/cart");
const Product = require("../models/product");

const agregarProductCart = async (req, res) => {
    const { user_id } = req.user;
    const { productId } = req.body;

    try {
        let cart = await Cart.findOne({ user: user_id });

        if (!cart) {
            cart = new Cart({ user: user_id, products: [] });
            await cart.save();
        }

        const existingProductIndex = cart.products.findIndex(item => item.product.equals(productId));

        if (existingProductIndex === -1) {
            cart = await Cart.findOneAndUpdate(
                { user: user_id }, // Buscar el carrito del usuario que no tenga ya el producto
                { $push: { products: { product: productId } } }, // Agregar el producto al array si no existe
                { new: true, upsert: true } // Devolver el carrito actualizado y crear uno nuevo si no existe
            );
            res.status(200).send({ msg: "Producto agregado al carrito", updatedCart: cart, append: true});
        } else {
            res.status(200).send({ msg: "El producto ya está en el carrito", append: false});
        }
    } catch (error) {
        res.status(500).send({ msg: "Error en el servidor", error });
    }
};

//Ver si podemos usarlo - Ya esta el Aumentar y el Disminuir, no haria falta
const editCartProduct = async (req, res) => {
    const { user_id } = req.user;
    const { productId, countProduct } = req.body;

    try {
        const updatedCart = await Cart.findOneAndUpdate(
            { user: user_id, "products.product": productId },
            { $set: { "products.$.quantity": countProduct } },
            { new: true }
        );

        if (!updatedCart) {
            return res.status(404).send({ msg: "Carrito no encontrado o producto no encontrado en el carrito" });
        }
        res.status(200).send({ msg: "Cantidad de producto en el carrito actualizada" });
    } catch (error) {
        res.status(500).send({ msg: "Error al actualizar cantidad del producto en el carrito", error });
    }
};

const deleteCartProduct = async (req, res) => {
    const { user_id } = req.user;
    const { productId } = req.params;

    try {
        // Buscar y eliminar el producto del carrito por su ID
        const cart = await Cart.findOneAndUpdate(
            { user: user_id, products: { $elemMatch: { product: productId } } },
            { $pull: { products: { product: productId } } },
            { new: true }
        );

        if (!cart) {
            return res.status(404).send({ msg: "Producto no encontrado" });
        }
        res.status(200).send({ msg: "Producto eliminado del carrito" });
    } catch (error) {
        res.status(500).send({ msg: "Error al eliminar producto del carrito", error });
    }
};

const getCart = async (req, res) => {
    const { user_id } = req.user;

    try {

        let cart = await Cart.findOne({ user: user_id });

        if (!cart) {
            cart = new Cart({ user: user_id, products: [] });
            await cart.save();
        } else {
            cart = await Cart.findOne({ user: user_id }).populate({
                path: 'products.product',
                select: '_id name image price description stock'
            });
        }

        const cartProducts = cart.products.map(cartProduct => ({
            _id: cartProduct.product._id,
            name: cartProduct.product.name,
            image: cartProduct.product.image,
            price: cartProduct.product.price,
            description: cartProduct.product.description,
            stock: cartProduct.product.stock,
            quantity: cartProduct.quantity
        }));

        res.status(200).send({ ...cart.toObject(), products: cartProducts });
    } catch (error) {
        res.status(500).send({ msg: "Error en el servidor", error });
    }
};


const getCartProduct = async (req, res) => {
    const { user_id } = req.user;
    const { productId } = req.params;

    try {
        const cart = await Cart.findOne({ user: user_id });
        if (!cart) {
            return res.status(404).send({ msg: "Carrito no encontrado" });
        }
        const productInfo = cart.products.find(item => item.product.equals(productId));
        if (!productInfo) {
            return res.status(404).send({ msg: "Producto no encontrado en el carrito" });
        }

        const product = await Product.findById(productInfo.product);
        if (!product) {
            return res.status(404).send({ msg: "Detalles del producto no encontrados" });
        }

        const productDetails = {
            _id: product._id,
            name: product.name,
            price: product.price,
            description: product.description,
            stock: product.stock,
            quantity: productInfo.quantity
        };

        res.status(200).send({ product: productDetails });
    } catch (error) {
        res.status(500).send({ msg: "Error en el servidor", error });
    }
};

const aumentarCantidad = async (req, res) => {
    const { user_id } = req.user;
    const { productId } = req.params;

    try {

        const cart = await Cart.findOne({ user: user_id, "products.product": productId });

        if (!cart) {
            return res.status(404).send({ msg: "Carrito no encontrado o producto no existente" });
        }

        const existingProduct = cart.products.find(item => item.product.equals(productId));
        const currentQuantity = existingProduct ? existingProduct.quantity : 0;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send({ msg: "Producto no encontrado" });
        }

        if (currentQuantity + 1 > product.stock) {
            return res.status(400).send({ msg: "La cantidad excede el stock disponible" });
        }

        const updatedCart = await Cart.findOneAndUpdate(
            { user: user_id, "products.product": productId },
            { $inc: { "products.$.quantity": 1 } },
            { new: true }
        );

        res.status(200).send({ msg: "Cantidad del producto aumentada en el carrito", cart: updatedCart });
    } catch (error) {
        res.status(500).send({ msg: "Error en el servidor", error });
    }
};

const disminuirCantidad = async (req, res) => {
    const { user_id } = req.user;
    const { productId } = req.params;

    try {
        const cart = await Cart.findOne({ user: user_id, "products.product": productId });

        if (!cart) {
            return res.status(404).send({ msg: "Carrito no encontrado o producto no existente" });
        }

        const existingProduct = cart.products.find(item => item.product.equals(productId));
        const currentQuantity = existingProduct ? existingProduct.quantity : 0;

        if (currentQuantity <= 0) {
            return res.status(400).send({ msg: "La cantidad ya es cero, no se puede disminuir más" });
        }

        const updatedCart = await Cart.findOneAndUpdate(
            { user: user_id, "products.product": productId },
            { $inc: { "products.$.quantity": -1 } },
            { new: true }
        );

        res.status(200).send({ msg: "Cantidad del producto disminuida en el carrito", cart: updatedCart });
    } catch (error) {
        res.status(500).send({ msg: "Error en el servidor", error });
    }
};

module.exports = {
    agregarProductCart,
    editCartProduct,
    deleteCartProduct,
    getCart,
    getCartProduct,
    aumentarCantidad,
    disminuirCantidad
};

require("dotenv").config();
const Product = require("../models/product");
const Cart = require("../models/cart");
const image = require("../utils/image");
const fs = require("fs");

const ipServer = process.env.IP_SERVER;
const port = process.env.PORT;
const apiVersion = process.env.API_VERSION;

const createProduct = async (req, res) => {
    const product = new Product();
    const params = req.body;

    product.name = params.name;
    product.price = params.price;
    product.description = params.description;
    product.stock = params.stock;



    if (req.files.image) {
        const imagePath = image.getFileName(req.files.image);
        product.image = imagePath;
    }

    try {
        await product.save();
        res.status(201).send({ msg: 'Producto creado exitosamente', product });
    } catch (error) {
        res.status(500).send({ msg: 'Error al crear el producto' });
    }
};

const getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById({ _id: id });
        if (!product) {
            res.status(400).send({ msg: "Producto no encontrado" });
        } else {
            res.status(200).send(product);
        }
    } catch (error) {
        res.status(400).send({ msg: "Error en el servidor!!!" });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const productData = req.body;

    try {
        const product = await Product.findByIdAndUpdate({ _id: id }, productData);
        if (product) {
            res.status(200).send({ msg: "Actualizacion del Producto Exitosa" });
        } else {
            res.status(400).send({ msg: "Producto no encontrado. !!!" });
        }
    } catch (error) {
        res.status(400).send({ msg: "Error en el servidor!!!" });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).send({ msg: "Producto no encontrado" });
        }
        const imageName = product.image;

        await Product.findByIdAndDelete(id);
        fs.unlinkSync(`./uploads/products/${imageName}`);

        // Eliminar todas las referencias del producto de los carritos de los usuarios
        await Cart.updateMany(
            { 'products.product': id },
            { $pull: { products: { product: id } } }
        );

        res.status(200).send({ msg: "Producto eliminado" });
    } catch (error) {
        res.status(400).send({ msg: "Error en el servidor!!!" });
    }
};

const getProducts = async (req, res) => {

    const page = parseInt(req.query.page) || 1; // Página actual, por defecto 1
    const limit = parseInt(req.query.limit) || 8; // Cantidad de productos por página, por defecto 8

    try {
        const count = await Product.countDocuments(); // Total de productos

        const totalPages = Math.ceil(count / limit); // Calcular el número total de páginas

        if (page < 1 || page > totalPages) {
            return res.status(404).send({ msg: "No hay productos disponibles en esta página" });
        }

        const hasNextPage = page < totalPages; // Verificar si hay una página siguiente
        const hasPrevPage = page > 1; // Verificar si hay una página anterior

        const nextPage = hasNextPage ? `http://${ipServer}:${port}/api/${apiVersion}/products?page=${page + 1}&limit=${limit}` : null;
        const prevPage = hasPrevPage ? `http://${ipServer}:${port}/api/${apiVersion}/products?page=${page - 1}&limit=${limit}` : null;

        const products = await Product.find()
            .limit(limit)
            .skip((page - 1) * limit)
            .exec();

        res.status(200).send({
            info: {
                count,
                pages: totalPages,
                next: nextPage,
                prev: prevPage,
                currentPage: page
            },
            products,
        });
    } catch (error) {
        res.status(500).send({ msg: error.message });
    }
};

module.exports = {
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    getProducts
};

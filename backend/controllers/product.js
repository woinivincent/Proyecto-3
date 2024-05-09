const Product = require("../models/product");
const image = require("../utils/image");

const createProduct = async (req, res) => {
    const product = new Product(req.body);

    if(req.files.image) {
        const imagePath = image.getFileName(req.files.image);
        product.image = imagePath;
    }

    try {
        await product.save();
        res.status(201).send({ message: 'Producto creado exitosamente', product });
    } catch (error) {
        res.status(500).send({ message: 'Error al crear el producto' });
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
        await Product.findByIdAndUpdate({ _id: id }, productData);
        res.status(200).send({ msg: "Actualizacion del Producto Exitosa" });
    } catch (error) {
        res.status(400).send({ msg: "Error en el servidor!!!" });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        await Product.findByIdAndDelete({ _id: id });
        res.status(200).send({ msg: "El producto a sido Eliminado. !!!" });
    } catch (error) {
        res.status(400).send({ msg: "Error en el servidor!!!" });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        res.status(400).send({ msg: "Error en el servidor!!!" });
    }
};

module.exports = { createProduct, getProduct, updateProduct, deleteProduct, getProducts };

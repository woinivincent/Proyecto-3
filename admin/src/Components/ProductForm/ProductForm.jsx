import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { addProductShop } from "../../api/addProductShop";
import './productForm.css';

const ProductForm = ({ onProductAdded }) => {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [stock, setStock] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log(file);
        setSelectedFile(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Crear un nuevo objeto FormData
            const formData = new FormData();
            formData.append('name', productName);
            formData.append('price', productPrice);
            formData.append('description', productDescription);
            formData.append('stock', stock);
            if (selectedFile) {
                formData.append('image', selectedFile);
            }

            const token = localStorage.getItem("accessAdmin");

            const product = await addProductShop(formData, token);

            onProductAdded(product);
            Swal.fire({
                title: "Producto Publicado",
                icon: "success",
                timer: 7000,
                showConfirmButton: false
            });
            navigate("/Products");
        } catch (error) {
            Swal.fire({
                title: "No pudimos cargar el Producto",
                text: "Intentalo de nuevo",
                icon: "error"
            });
            console.log("Error al cargar el Producto: ", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="product-form">
            <h2>Agregar Producto</h2>
            <div className="form-group">
                <label htmlFor="productName">Nombre del Producto:</label>
                <input
                    type="text"
                    id="productName"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="productPrice">Precio:</label>
                <input
                    type="number"
                    id="productPrice"
                    min={0}
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="stock">Stock:</label>
                <input
                    type="number"
                    id="stock"
                    value={stock}
                    min={0}
                    onChange={(e) => setStock(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="productDescription">Descripción:</label>
                <textarea
                    id="productDescription"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    required
                ></textarea>
            </div>
            <div className="agregarImagen">
                <label htmlFor="productoImg" className="file-upload-btn">
                    Seleccionar Archivo
                </label>
                <input type="file"
                    id="productoImg"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }} />
            </div>
            {selectedFile && (
                <div>
                    <p>Archivo seleccionado: {selectedFile.name}</p>
                </div>
            )}
            <button className="submitBtn" type="submit">Agregar Producto</button>
        </form>
    );
};

export default ProductForm;

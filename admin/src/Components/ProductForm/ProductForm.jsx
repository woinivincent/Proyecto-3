import React, { useState } from "react";
import './productForm.css'
const ProductForm = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  
    console.log("Producto Agregado:", {
      productName,
      productPrice,
      productDescription
    });

    setProductName("");
    setProductPrice("");
    setProductDescription("");
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);}

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
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
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
        style={{ display: 'none' }}   />
      </div>
      {selectedFile && (
        <div>
          <p>Archivo seleccionado: {selectedFile.name}</p>
          {/* Aquí puedes agregar más lógica para mostrar la imagen seleccionada */}
        </div>
      )}
      <button className="submitBtn" type="submit">Agregar Producto</button>
    </form>
  );
};

export default ProductForm;

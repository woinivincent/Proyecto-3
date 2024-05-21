import React, { useState, useEffect } from 'react';
import './ProductList.css'; // Asegúrate de importar tus estilos CSS
import productosData from '../productsData/products.json'; 
import { BsArrowRightShort } from "react-icons/bs";
import { BsArrowLeftShort } from "react-icons/bs";
import ProductForm from "../../Components/ProductForm/ProductForm"

import img from '../../images/PANIFICADOS_INTEGRALES-removebg-preview.png'

// Importa los datos del archivo JSON

const ProductList = () => {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false); // Estado para controlar si el formulario se muestra o no

  // Función para cargar los productos desde los datos importados
  const cargarProductos = () => {
    try {
      setLoading(true);
      setProductos(productosData.results);
      setNextPageUrl(productosData.info.next);
      setPrevPageUrl(productosData.info.prev);
    } catch (error) {
      console.error('Error al cargar los productos:', error);
      // Puedes mostrar un mensaje de error en la interfaz del usuario aquí
    } finally {
      setLoading(false);
    }
  };

  // Cuando el componente se monta, cargar los productos
  useEffect(() => {
    cargarProductos();
  }, []);

  const handleNextPage = () => {
    // Extraer el número de página actual del URL nextPageUrl
    const currentPage = parseInt(nextPageUrl.match(/(\d+)/)[0]);
    // Calcular el número de la página siguiente
    const nextPage = currentPage + 1;
    // Cargar la página siguiente
    cargarProductos(nextPage);
  };
  

  // Función para manejar la paginación hacia atrás


  const handlePrevPage = () => {
    // Extraer el número de página actual del URL prevPageUrl
    const currentPage = parseInt(prevPageUrl.match(/(\d+)/)[0]);
    // Calcular el número de la página anterior
    const prevPage = currentPage - 1;
    // Cargar la página anterior si el número de página es válido
    if (prevPage > 0) {
      cargarProductos(prevPage);
    }
  };

  // Función para agregar un producto al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, { ...producto, count: 1 }]);
    localStorage.setItem("carrito", JSON.stringify([...carrito, { ...producto, count: 1 }]));
  };

  // Función para mostrar u ocultar el formulario
  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="product-list-container">
      <div className='logo'>
        <img src={img} alt="Logo"/>
      </div>
      <button className="form__btn" onClick={handleToggleForm}>
        {showForm ? "Ocultar" : "Agregar Producto"} 
      </button>
      <div className="container__form">
        {showForm && <ProductForm />}
      </div>
      {loading ? (
        <div className="loader">Cargando...</div>
      ) : (
        <div className="product-list">
          {productos.length > 0 ? (
            productos.map(producto => (
              <div className="product-card" key={producto.id}>
                <img src={producto.img} alt={producto.nameProduct} />
                <h3 className="product-name">{producto.nameProduct}</h3>
                <p className="product-price">${producto.price}</p>
                <button className="add-to-cart-btn" onClick={() => agregarAlCarrito(producto)}>
                  Agregar al carrito
                </button>
              </div>
            ))
          ) : (
            <div className="main__store">No hay Productos para Mostrar</div>
          )}
        </div>
      )}

      <div className="pagination">
        <button className="page-btn" onClick={handlePrevPage} disabled={!prevPageUrl}>
          <BsArrowLeftShort className='icon' />Anterior
        </button>
        <button className="page-btn" onClick={handleNextPage} disabled={!nextPageUrl}>
          Siguiente <BsArrowRightShort className='icon' />
        </button>
      </div>
    </div>  
  );
};

export default ProductList;

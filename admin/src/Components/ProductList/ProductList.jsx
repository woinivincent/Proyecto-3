import React, { useState, useEffect } from 'react';
import { BsArrowRightShort } from "react-icons/bs";
import { BsArrowLeftShort } from "react-icons/bs";
import ProductForm from "../../Components/ProductForm/ProductForm"
import img from '../../images/PANIFICADOS_INTEGRALES-removebg-preview.png'
import { getFetchProductsAdmin } from '../../api/getFetchProductsAdmin';
import './ProductList.css';

// Importa los datos del archivo JSON

const ProductList = () => {
    const [productos, setProductos] = useState([]);
    const [info, setInfo] = useState({});
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);

    // Función para cargar los productos desde los datos importados
    const cargarProductos = async (url) => {
        try {
            setLoading(true);
            const productsData = await getFetchProductsAdmin(url);
            setProductos(productsData.products);
            setInfo(productsData.info);
        } catch (error) {
            console.error('Error al cargar los productos:', error);
            // Puedes mostrar un mensaje de error en la interfaz del usuario aquí
        } finally {
            setLoading(false);
        }
    };

    // Cuando el componente se monta, cargar los productos
    useEffect(() => {
        cargarProductos(`http://localhost:8080/api/v1/products`);
    }, []);

    const handleNextPage = () => {
        cargarProductos(info.next);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Función para manejar la paginación hacia atrás
    const handlePrevPage = () => {
        cargarProductos(info.prev);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    // Función para mostrar u ocultar el formulario
    const handleToggleForm = () => {
        setShowForm(!showForm);
    };

    const handleProductAdded = (newProduct) => {
        setProductos([...productos, newProduct]);
    };

    return (
        <div className="product-list-container">
            <div className='logo'>
                <img src={img} alt="Logo" />
            </div>
            <button className="form__btn" onClick={handleToggleForm}>
                {showForm ? "Ocultar" : "Agregar Producto"}
            </button>
            <div className="container__form">
                {showForm && <ProductForm onProductAdded={handleProductAdded}/>}
            </div>
            {loading ? (
                <div className="loader"></div>
            ) : (
                <div className="product-list">
                    {productos.length > 0 ? (
                        productos.map(producto => (
                            <div className="product-card" key={producto._id}>
                                <img src={`http://localhost:8080/${producto.image}`} alt={producto.name} />
                                <h3 className="product-name">{producto.name}</h3>
                                <p className="product-price">${producto.price}</p>
                            </div>
                        ))
                    ) : (
                        <div className="main__store">No hay Productos para Mostrar</div>
                    )}
                </div>
            )}

            <section className="pagination-container">
                <ul className="pagination">
                    <li className="page-item">
                        <button className="page-btn" onClick={handlePrevPage} disabled={!info.prev}>
                            <BsArrowLeftShort className='icon' />Anterior
                        </button>
                    </li>
                    <li className="page-item">
                        <button className="page-btn" onClick={handleNextPage} disabled={!info.next}>
                            Siguiente <BsArrowRightShort className='icon' />
                        </button>
                    </li>
                </ul>
            </section>
        </div>
    );
};

export default ProductList;


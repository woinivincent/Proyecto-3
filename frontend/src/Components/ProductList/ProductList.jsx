import React, { useState, useEffect, useContext } from 'react';
import './ProductList.css'; // Asegúrate de importar tus estilos CSS
import { getFetchProducts } from '../../api/getFetchProducts';
import { addFetchProductCart } from '../../api/addFecthProductCart.';
import { CarritoContext } from "../../Context/CarritoProvider";

const ProductList = () => {
    const { productosCart, setProductosCart } = useContext(CarritoContext);
    const [productos, setProductos] = useState([]);
    const [info, setInfo] = useState({});
    const [loading, setLoading] = useState(false);

    // Función para cargar los productos desde los datos importados
    const cargarProductos = async (url) => {
        try {
            setLoading(true);
            const productsData = await getFetchProducts(url);
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

    const agregarAlCarrito = async (event, producto) => {
        try {
            event.target.disabled = true;
            // Verificar si el producto ya está en el carrito
            const productExists = productosCart.some(item => item._id === producto._id);

            if (productExists) {
                console.log('Producto ya está en el carrito');
            } else {
                // Enviar la solicitud al servidor para agregar el producto al carrito
                const token = localStorage.getItem("access");
                const response = await addFetchProductCart(producto._id, token);

                if (response) {
                    // Si la solicitud al servidor se completa con éxito, actualizar el estado del carrito
                    setProductosCart(prevCart => [...prevCart, { ...producto, quantity: 1 }]);
                } else {
                    // Si la solicitud falla, mostrar un mensaje de error y no realizar cambios en el estado
                    console.error('Error al agregar producto al carrito:', 'No se pudo añadir al carrito en el servidor');
                }
            }
        } catch (error) {
            // Manejar cualquier error que ocurra durante el proceso
            console.error('Error al agregar producto al carrito:', error);
        }
    };

    return (
        <>
            {loading ? (
                <div className="loader"></div>
            ) : (
                <div className="container-products">
                    {productos.length > 0 ? (
                        productos.map(producto => (
                            <div className="product-card" key={producto._id}>
                                <img src={`http://localhost:8080/${producto.image}`} alt={producto.name} />
                                <h3 className="product-name">{producto.name}</h3>
                                <p className="product-price">${producto.price}</p>
                                <button type='button' className="add-to-cart-btn" onClick={(event) => agregarAlCarrito(event, producto)}>
                                    Agregar al carrito
                                </button>
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
                            <i className="bi bi-arrow-left"></i>
                        </button>
                    </li>
                    <li className="page-item" id="current">{info.currentPage}</li>
                    <li className="page-item">
                        <button className="page-btn" onClick={handleNextPage} disabled={!info.next}>
                            <i className="bi bi-arrow-right"></i>
                        </button>
                    </li>
                </ul>
            </section>
        </>
    );
};

export default ProductList;

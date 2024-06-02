import React, { useContext } from 'react';
import { CarritoContext } from '../../Context/CarritoProvider';
import { deleteProductCart } from "../../api/deleteProductCart"
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import './Cart.css';

const Cart = () => {
    const { productosCart, setProductosCart } = useContext(CarritoContext);

    const mostrarTotal = () => {
        const total = productosCart.reduce((acc, current) => acc + current.quantity * current.price, 0);
        return total.toFixed(3);
    };

    const incrementProductCount = async (id) => {
        try {
            const token = localStorage.getItem("access");
            const response = await fetch(`http://localhost:8080/api/v1/cart/aumentar/${id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                const index = productosCart.findIndex(producto => producto._id === id);
                if (index !== -1) {
                    const updatedProducts = [...productosCart];
                    const productToUpdate = updatedProducts[index];
                    if (productToUpdate.quantity < productToUpdate.stock) {
                        productToUpdate.quantity++;
                        setProductosCart(updatedProducts);
                    } else {
                        throw new Error('No hay suficiente stock disponible para este producto');
                    }
                } else {
                    throw new Error('Producto no encontrado en el carrito');
                }
            } else {
                throw new Error('Error al incrementar la cantidad del producto');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const decrementProductCount = async (id) => {
        try {
            const token = localStorage.getItem("access");
            const response = await fetch(`http://localhost:8080/api/v1/cart/disminuir/${id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                const index = productosCart.findIndex(producto => producto._id === id);
                if (index !== -1) {
                    const updatedProducts = [...productosCart];
                    const productToUpdate = updatedProducts[index];
                    if (productToUpdate.quantity > 1) {
                        productToUpdate.quantity--;
                        setProductosCart(updatedProducts);
                    } else {
                        throw new Error('La cantidad mínima de este producto en el carrito es 1');
                    }
                } else {
                    throw new Error('Producto no encontrado en el carrito');
                }
            } else {
                throw new Error('Error al decrementar la cantidad del producto');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const deleteProductFromCart = async (id) => {
        try {
            // Enviar la solicitud al servidor para eliminar el producto del carrito
            const token = localStorage.getItem("access");
            const response = await deleteProductCart(id, token);
            console.log(response);

            // Si la solicitud al servidor se completó con éxito, actualizar el estado del carrito
            // Buscar el índice del producto en el carrito
            const index = productosCart.findIndex(producto => producto._id === id);

            if (index !== -1) {
                // Eliminar el producto del array local
                const newCart = [...productosCart];
                newCart.splice(index, 1);

                // Actualizar el estado del carrito con la nueva copia
                setProductosCart(newCart);
            }
        } catch (error) {
            // Manejar cualquier error que ocurra durante la eliminación del producto
            console.error('Error al eliminar producto del carrito:', error);
        }
    };

    const finalizarCompra = () => {
        Swal.fire({
            title: "Compra Finalizada.!!!",
            text: "Gracias por confiar en nosotros.",
            icon: "success",
            timer: 5000,
            showConfirmButton: false
        });
    };


    const mostrarProductos = () => {
        if (productosCart.length === 0) {
            return (
                <h2 className="main__store" style={{ paddingTop: "7rem", paddingBottom: "7rem", textAlign: "center" }}>
                    No hay Productos en el Carrito
                </h2>
            );
        }

        return productosCart.map(producto => (
            <article key={producto._id} className="main__product" data-id={producto._id}>
                <div className="main__container-img-title">
                    <div className="main__container-product-img">
                        <img className="main__product-img" src={`http://localhost:8080/${producto.image}`} alt={producto.name} />
                    </div>
                    <div className="main__container-title-trash">
                        <h3 className="main__product-title">{producto.name}</h3>
                        <i className="bi bi-trash" onClick={() => deleteProductFromCart(producto._id)}></i>
                    </div>
                </div>
                <div className="main__container-count-price">
                    <div className="main__container-count">
                        <i className="bi bi-dash" onClick={() => decrementProductCount(producto._id)}></i>
                        <span className="main__count">{producto.quantity}</span>
                        <i className="bi bi-plus" onClick={() => incrementProductCount(producto._id)}></i>
                    </div>
                    <div className="main__container-price">
                        <p className="main__price">$<span>{producto.price.toFixed(3)}</span></p>
                    </div>
                </div>
            </article>
        ));
    };

    return (
        <>
            <main className="main">
                <h1 className="main__title">Mi Carrito</h1>
                <div className="main__container-products-total">
                    {
                        productosCart.length > 0 ? (
                            <section className="main__container-products">
                                {mostrarProductos()}
                            </section>
                        ) : (
                            <section className="main__container-products" style={{ width: "100%" }}>
                                {mostrarProductos()}
                            </section>
                        )
                    }
                    {productosCart.length > 0 && (
                        <section className="main__container-total">
                            <div className="main__subtotal">
                                <p className="main__subtotal-title">Subtotal:</p>
                                <p className="main__subtotal-price">$<span>{mostrarTotal()}</span></p>
                            </div>
                            <div className="main__total">
                                <p className="main__total-title">Total:</p>
                                <p className="main__total-price">$<span>{mostrarTotal()}</span></p>
                            </div>
                            <div className="main__finish">
                                <input className="main__btn-finish" type="submit" value="FINALIZAR COMPRA" onClick={() => finalizarCompra()} />
                                <Link className='main__link-finish' to='/products'>VER MÁS PRODUCTOS</Link>
                            </div>
                        </section>
                    )}
                </div>
            </main>
        </>
    );
};

export default Cart;

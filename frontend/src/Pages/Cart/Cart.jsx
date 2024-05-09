import React from "react";
import "./Cart.css";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carrito: [],
    };
  }

  componentDidMount() {
    this.mostrarProductos();
  }

  mostrarTotal = () => {
    const { carrito } = this.state;
    const productsTotal = document.querySelector('.main__container-total');
    const templateTotal = document.getElementById("total");

    const total = carrito.reduce((acc, current) => {
      return acc + current.count * current.price;
    }, 0);

    productsTotal.textContent = "";
    const totalResult = total.toFixed(3);
    const cloneTotal = templateTotal.content.cloneNode(true);
    cloneTotal.querySelector('.main__subtotal-price span').textContent = totalResult;
    cloneTotal.querySelector('.main__total-price span').textContent = totalResult;
    productsTotal.appendChild(cloneTotal);
  };

  mostrarProductos = () => {
    const productsSection = document.querySelector('.main__container-products');
    const templateProduct = document.getElementById("card-product");
    const fragment = document.createDocumentFragment();

    const { carrito } = this.state;
    productsSection.textContent = "";

    if (carrito.length !== 0) {
      carrito.forEach(producto => {
        const clone = templateProduct.content.cloneNode(true);
        clone.querySelector('.main__product').dataset.id = producto.id;
        clone.querySelector('.main__product-title').textContent = producto.nameProduct;
        clone.querySelector('.main__product-img').src = producto.img;
        clone.querySelector('.main__product-img').alt = producto.img;
        clone.querySelector('.main__price span').textContent = producto.price.toFixed(3);
        clone.querySelector('.main__count').textContent = producto.count;
        clone.querySelector('.bi-dash').dataset.id = producto.id;
        clone.querySelector('.bi-plus').dataset.id = producto.id;
        clone.querySelector('.bi-trash').dataset.id = producto.id;
        fragment.appendChild(clone);
      });
      productsSection.appendChild(fragment);
      this.mostrarTotal();
    } else {
      const h2 = document.createElement("h2");
      const containerBody = document.querySelector(".main__container-products-total");
      containerBody.style.flexDirection = "column";
      productsSection.style.width = "100%"
      h2.className = "main__store";
      h2.style.paddingTop = "7rem"
      h2.style.paddingBottom = "7rem"
      h2.style.textAlign = "center"
      h2.textContent = "No hay Productos en el Carrito"
      productsSection.appendChild(h2);
    }
  };

  incrementProductCount = (element) => {
    const productId = element.dataset.id;
    const { carrito } = this.state;
    const index = carrito.findIndex(producto => producto.id === parseInt(productId));
    if (index !== -1) {
      const producto = carrito[index];
      if (producto.count < producto.stock) {
        producto.count++;
        this.setState({ carrito });
      } else {
        alert("¡No puedes agregar más de este producto! Stock máximo alcanzado.");
      }
    }
  };

  decrementProductCount = (element) => {
    const productId = element.dataset.id;
    const { carrito } = this.state;
    const index = carrito.findIndex(producto => producto.id === parseInt(productId));
    if (index !== -1) {
      if (carrito[index].count > 1) {
        carrito[index].count--;
      } else {
        carrito.splice(index, 1);
      }
      this.setState({ carrito });
    }
  };

  deleteProduct = (element) => {
    const productId = parseInt(element.dataset.id);
    const { carrito } = this.state;
    const index = carrito.findIndex(producto => producto.id === productId);
    carrito.splice(index, 1);
    this.setState({ carrito });
  };

  handleProductClick = (event) => {
    const element = event.target;
    if (element.matches(".bi-plus")) {
      this.incrementProductCount(element);
    } else if (element.matches(".bi-dash")) {
      this.decrementProductCount(element);
    } else if (element.matches('.bi-trash')) {
      this.deleteProduct(element);
    }
  };

  handleFinishClick = (event) => {
    if (event.target.matches('.main__btn-finish')) {
      event.preventDefault();
      alert("¡Compra finalizada!");
    }
  };

  render() {
    return (
      <div>
       <main className="main__cart">
            <h1 className="main__title">Mi Carrito</h1>
            <div className="main__container-products-total">
                <section className="main__container-products">
                    <template id="card-product">
                        <article className="main__product">
                            <div className="main__container-img-title">
                                <div className="main__container-product-img">
                                    <img className="main__product-img" src="source" alt="description"/>
                                </div>
                                <div className="main__container-title-trash">
                                    <h3 className="main__product-title">Porción Maracuyá</h3>
                                    <i className="bi bi-trash" onClick={this.deleteProduct}></i>
                                </div>
                            </div>
                            <div className="main__container-count-price">
                                <div className="main__container-count">
                                    <i className="bi bi-dash" onClick={this.decrementProductCount}></i>
                                    <span className="main__count">12</span>
                                    <i className="bi bi-plus" onClick={this.incrementProductCount}></i>
                                </div>
                                <div className="main__container-price">
                                    <p className="main__price">$<span>312.97</span></p>
                                </div>
                            </div>
                        </article>
                    </template>
                </section>
                <section className="main__container-total">
                    <template id="total">
                        <div className="main__subtotal">
                            <p className="main__subtotal-title">Subtotal:</p>
                            <p className="main__subtotal-price">$<span>5.523.23</span></p>
                        </div>
                        <div className="main__total">
                            <p className="main__total-title">Total:</p>
                            <p className="main__total-price">$<span>5.523.23</span></p>
                        </div>
                        <div className="main__finish">
                            <input className="main__btn-finish" type="submit" value="FINALIZAR COMPRA"/>
                            <a className="main__link-finish" href="/Products">VER MÁS PRODUCTOS</a>
                        </div>
                    </template>
                </section>
            </div>
        </main>
      </div>
    );
  }
}

export default Cart;
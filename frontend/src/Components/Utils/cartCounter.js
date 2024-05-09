
export const getCartFromLocalStorage = () => {
    const cartData = localStorage.getItem("carrito");
    if (cartData) {
      const cart = JSON.parse(cartData);
      return cart.length;
    } else {
      return 0;
    }
  };
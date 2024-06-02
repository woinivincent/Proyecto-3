import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";

export const CarritoContext = createContext();

const CarritoProvider = ({ children }) => {
    const [productosCart, setProductosCart] = useState([]);
    const { user } = useContext(AuthContext);

    const fetchProductos = async (token) => {
        try {
            const params = {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            };
            const response = await fetch(`http://localhost:8080/api/v1/cart`, params);
            const data = await response.json();
            setProductosCart(data.products);
        } catch (error) {
            console.error("Error al Conectar");
        }

    };

    useEffect(() => {
        const token = localStorage.getItem("access");
        if (user && token) {
            fetchProductos(token);
        }
    }, [user]);

    const data = {
        productosCart,
        setProductosCart
    }

    return (
        <CarritoContext.Provider value={data}>
            {children}
        </CarritoContext.Provider>
    );
};

export default CarritoProvider;

import React, { useContext } from 'react';
import './Header.css'
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { CarritoContext } from '../../Context/CarritoProvider';
import { AuthContext } from '../../Context/AuthProvider';


function Header() {
    const { productosCart, setProductosCart } = useContext(CarritoContext);
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const logOut = () => {
        setUser(false);
        setProductosCart([]);
        navigate("/");
        localStorage.removeItem("access");
    };

    return (
        <header className="header">
            <nav className="nav">
                <div className="container-icon-list">
                    <i className="icon-list bi bi-list"></i>
                </div>
                <div className="social-icons">
                    <i className="bi bi-whatsapp"></i>
                    <i className="bi bi-instagram"></i>
                </div>
                <div className="container-logo">
                    <img className="logo" src="/images/PANIFICADOS INTEGRALES.png" alt="Logo" />
                </div>
                <div className="user">
                    <div className="user-container-register">
                        {
                            !user ? (
                                <>
                                    <Link className="user-account" to="/Register">CREAR CUENTA</Link>
                                    <Link className="user-sesion" to="/Login">INICIAR SESIÓN</Link>
                                </>

                            ) : (
                                <>
                                    <div className="header__count-logo-text">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="header__link-icon bi bi-person-circle" viewBox="0 0 16 16">
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
                                            <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"></path>
                                        </svg>
                                        <span className="header__count-text">{user.firstName}</span>
                                    </div>
                                    <div className='dropdown' onClick={logOut}>
                                        <span>LogOut</span>
                                    </div>
                                </>

                            )
                        }
                    </div>
                    <div className="user-container-cart">
                        <Link to="/Cart"><i className="user-cart bi bi-cart2"></i></Link>
                        <div className="container-count">
                            <span className="user-count">{productosCart.length}</span>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="tabs">
                <ul className="tabs-list">
                    <li className="tabs-list-item"><NavLink className="tabs-item-link" to="/">INICIO</NavLink></li>
                    <li className="tabs-list-item"><NavLink className="tabs-item-link" to="/Products">PRODUCTOS</NavLink></li>
                    <li className="tabs-list-item"><NavLink className="tabs-item-link" to="/Contact">CONTACTO</NavLink></li>
                    <li className="tabs-list-item"><NavLink className="tabs-item-link" to="/AboutUs">NOSOTROS</NavLink></li>
                </ul>
            </div>
        </header>
    );
}

export default Header;

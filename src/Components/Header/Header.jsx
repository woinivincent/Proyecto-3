import React from 'react';


function Header() {
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
                        <a className="user-account" href="/Register/Register.html">CREAR CUENTA</a>
                        <a className="user-sesion" href="/Login/Login.html">INICIAR SESIÓN</a>
                    </div>
                    <div className="user-container-cart">
                        <a href="Cart/cart.html"><i className="user-cart bi bi-cart2"></i></a>
                        <div className="container-count">
                            <span className="user-count">0</span>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="tabs">
                <ul className="tabs-list">
                    <li className="tabs-list-item"><a className="tabs-item-link" href="/Home/Home.jsx">INICIO</a></li>
                    <li className="tabs-list-item"><a className="tabs-item-link" href="/Products/products.html">PRODUCTOS</a></li>
                    <li className="tabs-list-item"><a className="tabs-item-link" href="/Contact/index.html">CONTACTO</a></li>
                    <li className="tabs-list-item"><a className="tabs-item-link" href="/About us/index.html">NOSOTROS</a></li>
                </ul>
            </div>
        </header>
    );
}

export default Header;

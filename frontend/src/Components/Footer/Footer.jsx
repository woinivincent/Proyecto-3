import React from 'react';
import './Footer.css'

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-links">
                <div className="footer-nav">
                    <h2 className="footer-title">NAVEGACIÓN</h2>
                    <ul className="footer-nav-list">
                        <li className="footer-item"><a className="footer-item-link" href="index.html">Inicio</a></li>
                        <li className="footer-item"><a className="footer-item-link" href="/">Productos</a></li>
                        <li className="footer-item"><a className="footer-item-link" href="Contact/index.html">Contacto</a></li>
                        <li className="footer-item"><a className="footer-item-link" href="About us/index.html">Nosotros</a></li>
                    </ul>
                </div>
                <div className="footer-contact">
                    <h2 className="footer-title">CONTACTANOS</h2>
                    <div className="footer-account">
                        <span className="footer-letter">@</span>
                        <a href="/" className="footer-email">panificadospatagonia@gmail.com.ar</a>
                    </div>
                </div>
                <div className="footer-socials-form">
                    <div className="footer-socials">
                        <h2 className="footer-title">REDES SOCIALES</h2>
                        <a href="/" className="footer-container-icon-social">
                            <i className="footer-icon-social bi bi-instagram"></i>
                        </a>
                    </div>
                    <div className="footer-container-form">
                        <h2 className="footer-title">NEWSLETTER</h2>
                        <form className="footer-form">
                            <input className="footer-input" type="text" placeholder="Email" />
                            <button type="submit" className="footer-container-icon">
                                <i className="footer-icon bi bi-send-fill"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="copy-right">
                <p className="copy-right-text-1">COPYRIGHT PANIFICADOS PATAGONIA - 2024. TODOS LOS DERECHOS RESERVADOS.</p>
                <div className="copy-right-container-text-2">
                    <p className="copy-right-text-2">DEFENSA DE LAS Y LOS CONSUMIDORES. PARA RECLAMOS</p>
                    <a className="copy-right-link" href="/">INGRESÁ ACÁ</a>
                </div>
                <a className="copy-right-link" href="/">BOTÓN DE ARREPENTIMIENTO</a>
            </div>
        </footer>
    );
}

export default Footer;
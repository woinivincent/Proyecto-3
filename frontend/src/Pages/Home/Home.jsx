
import React, { useEffect } from 'react';
import { initSlider } from "../../Components/Utils/Slider"; // Importa las funciones necesarias desde Slider.js
import './Home.css'



function Home() {
    // Utiliza useEffect para ejecutar las funciones cuando el componente se monte
    useEffect(() => {
        initSlider(); // Inicializa el slider
    }, []);
    return (
        <main className="main">
            <section className="container-slider">
                <div className="slider">
                    <img src="./images/63f7db8da8ea1.image.jpg" alt="slide1" />
                    <img src="./images/fb6625-splendid-table-brown-bread-kajakiki-istock-gettyimagesplus-lede.jpg" alt="slide2" />
                    <img src="./images/1-18.jpg" alt="slide3" />
                    <button className="prev"><i className="bi bi-chevron-left"></i></button>
                    <button className="next"><i className="bi bi-chevron-right"></i></button>
                </div>
            </section>
            <section className="container-info">
                <h2 className="info-title">¡RECORDÁ QUE TU COMPRA VA A ESTAR DISPONIBLE A PARTIR DE MAÑANA!</h2>
                <p className="info-body">Si necesitás tu pedido para hoy podés comunicarte al 387 589 213 para chequear disponibilidad</p>
            </section>
            <section className="container-categories-one">
                <div className="container-img-one">
                    <img className="categories-one-img" src="./img/img-3.png" alt="img-3.png" />
                    <h3 className="categories-one-title">Panes</h3>
                </div>
                <div className="container-img-one">
                    <img className="categories-one-img" src="./img/img-5.png" alt="img-5.png" />
                    <h3 className="categories-one-title">Tortas</h3>
                </div>
                <div className="container-img-one">
                    <img className="categories-one-img" src="./img/img-1.png" alt="img-4.png" />
                    <h3 className="categories-one-title">Salados</h3>
                </div>
            </section>
            <section className="container-categories-two">
                <div className="container-img-two">
                    <img className="categories-two-img" src="./img/img-4.png" alt="img-4.png" />
                    <h3 className="categories-two-title">Pre-cocidos</h3>
                </div>
                <div className="container-img-two">
                    <img className="categories-two-img" src="./img/img-7.png" alt="img-7.png" />
                    <h3 className="categories-two-title">Dulces</h3>
                </div>
            </section>
            <section className="container-home">
                <div className="container-home-img">
                    <img className="home-img" src="./img/img-8.png" alt="img-8.png" />
                </div>
                <div className="container-home-text">
                    <h2 className="home-title">PANIFICADOS PATAGONIA</h2>
                    <p className="home-paragraph">Más de 100 años horneando para nuestros vecinos en nuestras 9 sucursales.</p>
                    <a className="home-link" href="./Pages/Home">CONOCENOS</a>
                </div>
            </section>
        </main>
    );
}

export default Home;

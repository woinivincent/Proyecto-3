import React from "react";
import './Contact.css'
class Contact extends React.Component{
    render(){
        return(
            <main className="contact-main">
            <div className="contacto-info">
                <p><i className="bi bi-envelope-fill"></i>hola@clargentina.com.ar</p>
                <p><i className="bi bi-instagram"></i>Síguenos en Instagram</p>
            </div>
            <div className="formulario">
                <h2>Contáctanos</h2>
                <form id="contactForm" onsubmit="return validateForm()">
                    <label for="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" required />

                    <label for="email">Correo Electrónico:</label>
                    <input type="email" id="email" name="email" required />

                    <label for="telefono">Teléfono (Opcional):</label>
                    <input type="text" id="telefono" name="telefono" />

                    <label for="mensaje">Mensaje(Opcional):</label>
                    <textarea id="mensaje" name="mensaje" rows="4"></textarea>

                    <button type="submit" className="send-btn">ENVIAR</button>
                </form>
            </div>
        </main>
        )
    }
}

export default Contact
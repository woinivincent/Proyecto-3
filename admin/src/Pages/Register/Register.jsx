import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate desde react-router-dom
import './Register.css';

import img from '../../images/PANIFICADOS_INTEGRALES-removebg-preview.png'

const Register = () => {
    const [passwordVisible, setPasswordVisible] = useState({
        current: false,
        confirm: false
    });

    const navigate = useNavigate(); // Obtén la función navigate para redirigir al usuario

    const togglePasswordVisibility = (type) => {
        setPasswordVisible(prevState => ({
            ...prevState,
            [type]: !prevState[type]
        }));
    };

    const handlePasswordVisibility = (type) => {
        return passwordVisible[type] ? "text" : "password";
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes agregar la lógica para manejar el envío del formulario
        // Después de que se haya registrado correctamente, redirige al usuario al dashboard
        navigate('/dashboard');
    };

    return (
        <div>
            <main className="main__register">
                <img src={img} alt="Logo" />
                <h2>Bienvenido </h2>
                <p className="paragraph">Comprá más rápido y llevá el control de tus pedidos, ¡en un solo lugar!</p>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-container">
                        <label className="form-label" htmlFor="name">NOMBRE</label>
                        <input className="form-input-name" id="name" type="text" placeholder="ej.: María Perez" required autoComplete="off" />
                    </div>
                    <div className="form-container">
                        <label className="form-label" htmlFor="mobile-email">EMAIL</label>
                        <input className="form-input-name" id="mobile-email" type="email" placeholder="ej.: tunombre@email.com" autoComplete="off" />
                    </div>
                    <div className="form-container">
                        <label className="form-label" htmlFor="telefono">TELÉFONO (OPCIONAL)</label>
                        <input className="form-input-telephone" id="telefono" type="text" placeholder="ej.: 1123445567" autoComplete="off" />
                    </div>
                    <div className="form-container">
                        <label className="form-label" htmlFor="password">CONTRASEÑA</label>
                        <input className="form-input-password" type={handlePasswordVisibility("current")} id="password" name="password" autoComplete="off" />
                        <div className="password-icons">
                            <i className={`bi ${passwordVisible.current ? 'bi-eye' : 'bi-eye-slash'}`} onClick={() => togglePasswordVisibility('current')}></i>
                        </div>
                    </div>
                    <div className="form-container">
                        <label className="form-label" htmlFor="repassword">CONFIRMAR CONTRASEÑA</label>
                        <input className="form-input-repassword" type={handlePasswordVisibility("confirm")} id="repassword" name="repassword" autoComplete="off" />
                        <div className="password-icons">
                            <i className={`bi ${passwordVisible.confirm ? 'bi-eye' : 'bi-eye-slash'}`} onClick={() => togglePasswordVisibility('confirm')}></i>
                        </div>
                    </div>
                    <div className="form-container">
                        <input className="input-submit" type="submit" name="submit" id="submit" value="CREAR CUENTA" />
                    </div>
                    <div className="user-login">
                        <p className="login-paragraph">¿Ya tenés una cuenta?</p>
                        <Link className="login-link" to="/">Iniciá sesión</Link>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default Register;

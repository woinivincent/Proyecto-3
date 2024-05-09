import React, { useState } from 'react';
import './Register.css'

const Register = () => {
    const [passwordVisible, setPasswordVisible] = useState({
        current: false,
        confirm: false
    });

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
    };

    return (
        <div>
            <main className="main__register">
                <p className="paragraph">Comprá más rápido y llevá el control de tus pedidos, ¡en un solo lugar!</p>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-container">
                        <label className="form-label" htmlFor="name">NOMBRE</label>
                        <input className="form-input-name" id="name" type="text" placeholder="ej.: María Perez" required autoComplete="off"/>
                    </div>
                    <div className="form-container">
                        <label className="form-label" htmlFor="mobile-email">EMAIL</label>
                        <input className="form-input-name" id="mobile-email" type="email" placeholder="ej.: tunombre@email.com" autoComplete="off"/>
                    </div>
                    <div className="form-container">
                        <label className="form-label" htmlFor="telefono">TELÉFONO (OPCIONAL)</label>
                        <input className="form-input-telephone" id="telefono" type="text" placeholder="ej.: 1123445567" autoComplete="off"/>
                    </div>
                    <div className="form-container">
                        <label className="form-label" htmlFor="password">CONTRASEÑA</label>
                        <input className="form-input-password" type={handlePasswordVisibility("current")} id="password" name="password" autoComplete="off"/>
                        <div className="password-icons">
                            <i className={`bi ${passwordVisible.current ? 'bi-eye' : 'bi-eye-slash'}`} onClick={() => togglePasswordVisibility('current')}></i>
                        </div>
                    </div>
                    <div className="form-container">
                        <label className="form-label" htmlFor="repassword">CONFIRMAR CONTRASEÑA</label>
                        <input className="form-input-repassword" type={handlePasswordVisibility("confirm")} id="repassword" name="repassword" autoComplete="off"/>
                        <div className="password-icons">
                            <i className={`bi ${passwordVisible.confirm ? 'bi-eye' : 'bi-eye-slash'}`} onClick={() => togglePasswordVisibility('confirm')}></i>
                        </div>
                    </div>
                    <div className="form-container">
                        <input className="input-submit" type="submit" name="submit" id="submit" value="CREAR CUENTA"/>
                    </div>
                    <div className="user-login">
                        <p className="login-paragraph">¿Ya tenés una cuenta?</p>
                        <a className="login-link" href="../Login/Login.html">Iniciá sesión</a>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default Register;
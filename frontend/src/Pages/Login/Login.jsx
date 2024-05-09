
import './Login.css'
import React, { useState } from 'react';
import { validateLoginForm } from '../../Components/Utils/Validate'; // Asegúrate de importar desde la ubicación correcta
    const Login = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [error, setError] = useState('');
    
        const handleLogin = (event) => {
            event.preventDefault(); // Evita que el formulario se envíe por defecto
    
            const validationError = validateLoginForm(email, password);
            if (validationError) {
                setError(validationError);
            } else {
                // Si la validación es exitosa, puedes continuar con tu lógica de inicio de sesión
                console.log("Inicio de sesión exitoso");
            }
        };
    
        const togglePasswordVisibility = () => {
            const passwordInput = document.getElementById('password');
            const passwordType = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', passwordType);
        };
    
        return (
            <main className="main__login">
                <form className="form" onSubmit={handleLogin}>
                    <div className="form-container">
                        <label className="form-label" htmlFor="mobile-email">EMAIL</label>
                        <input className="form-input-name" id="mobile-email" type="email" placeholder="ej.: tunombre@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-container">
                        <label className="form-label" htmlFor="password">CONTRASEÑA</label>
                        <input className="form-input-password" type="password" id="password" name="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <div className="password-icons">
                            <i className="bi bi-eye-slash" id="hide-password" onClick={togglePasswordVisibility}></i>
                            <i className="bi bi-eye" id="show-password" onClick={togglePasswordVisibility}></i>
                        </div>
                        <a href="#">¿Olvidaste tu contraseña?</a>
                    </div>
                    <button className="login-btn" type="submit">INICIAR SESIÓN</button>
                </form>
                {error && <p>{error}</p>}
            </main>
        );
    };

    
    export default Login;
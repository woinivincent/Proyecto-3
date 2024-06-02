import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginFetch } from '../../api/loginFetch';
import { validateLoginForm } from '../../Components/Utils/Validate';
import img from '../../images/PANIFICADOS_INTEGRALES-removebg-preview.png'
import './Login.css';
import { AuthAdminContext } from '../../Context/AuthAdminContext';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { loginAdmin, admin } = useContext(AuthAdminContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (admin) {
            navigate("/Dashboard");
        }
    }, [admin]);

    const handleLogin = async (event) => {
        event.preventDefault(); // Evita que el formulario se envíe por defecto

        const validationError = validateLoginForm(email, password);
        if (validationError) {
            setError(validationError);
        } else {
            setError("");
            try {
                const { accessAdmin } = await loginFetch({ email, password });
                console.log("Daniel", accessAdmin);
                loginAdmin(accessAdmin);
                localStorage.setItem("accessAdmin", accessAdmin);
                setError("");
                navigate("/Dashboard");
            } catch (error) {
                setError("Error de Servidor");
            }
        }
    };

    const togglePasswordVisibility = () => {
        const passwordInput = document.getElementById('password');
        const passwordType = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', passwordType);
    };

    return (
        <main className="main__login">
            <img src={img} alt="Logo" />
            <h2>Bienvenido </h2>
            <form className="form" onSubmit={handleLogin}>
                <div className="form-container">
                    <label className="form-label" htmlFor="mobile-email">EMAIL</label>
                    <input className="form-input-name" id="mobile-email" type="email" placeholder="ej.: tunombre@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-container">
                    <label className="form-label" htmlFor="password">CONTRASEÑA</label>
                    <input className="form-input-password" type="password" id="password" name="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete='false' />
                    <div className="password-icons">
                        <i className="bi bi-eye-slash" id="hide-password" onClick={togglePasswordVisibility}></i>
                        <i className="bi bi-eye" id="show-password" onClick={togglePasswordVisibility}></i>
                    </div>
                    <Link to='/register'>¿Olvidaste tu contraseña?</Link>
                </div>
                <button className="login-btn" type="submit">INICIAR SESIÓN</button>
            </form>
            {error && <p>{error}</p>}
        </main>
    );
};

export default Login;

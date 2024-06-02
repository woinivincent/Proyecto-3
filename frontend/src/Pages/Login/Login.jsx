import './Login.css';
import React, { useContext, useEffect, useState } from 'react';
import { loginFetch } from "../../api/loginFetch";
import { validateLoginForm } from '../../Components/Utils/Validate'; // Asegúrate de importar desde la ubicación correcta
import { AuthContext } from '../../Context/AuthProvider';
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { login, user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(()=>{
        if(user) {
            navigate("/");
        }
    });

    const handleLogin = async (event) => {
        event.preventDefault(); // Evita que el formulario se envíe por defecto

        const validationError = validateLoginForm(email, password);
        if (validationError) {
            setError(validationError);
        } else {
            setError("");
            try {
                const { access } = await loginFetch({ email, password });
                login(access);
                localStorage.setItem("access", access);
                setError("");
                navigate("/");
            } catch (error) {
                setError("Error de Servidor");
            }
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <main className="main__login">
            <form className="form" onSubmit={handleLogin}>
                <div className="form-container">
                    <label className="form-label" htmlFor="mobile-email">EMAIL</label>
                    <input className="form-input-name" id="mobile-email" type="email" name="email" placeholder="ej.: tunombre@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-container">
                    <label className="form-label" htmlFor="password">CONTRASEÑA</label>
                    <input
                        className="form-input-password"
                        type={passwordVisible ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="off"
                    />
                    <div className="password-icons-login" onClick={togglePasswordVisibility}>
                        <i className={`bi ${passwordVisible ? 'bi-eye' : 'bi-eye-slash'}`}></i>
                    </div>
                    <Link to={"/ForgotPass"}>¿Olvidaste tu contraseña?</Link>
                </div>
                <button className="login-btn" type="submit">INICIAR SESIÓN</button>
            </form>
            {error && <p>{error}</p>}
        </main>
    );
};

export default Login;

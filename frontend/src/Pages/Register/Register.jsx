import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { registerFetch } from '../../api/registerFetch';
import Swal from "sweetalert2";
import './Register.css';
import { AuthContext } from '../../Context/AuthProvider';

const Register = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        tel: ""
    });


    useEffect(() => {
        if (user) {
            navigate("/");
        }
    });


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

    const modificarCampo = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await registerFetch(formData);
            if (response.ok) {
                Swal.fire({
                    title: "Registramos tus Datos con Exito",
                    text: "Podras acceder a tu cuenta con tu correo y contraseña",
                    icon: "success",
                    timer: 7000,
                    showConfirmButton: false
                });
                navigate("/Login");
            } else {
                Swal.fire({
                    title: "No pudimos realizar el Registro",
                    text: "Intentalo de nuevo proporsionando datos correctos",
                    icon: "error"
                });
            }
        } catch (error) {
            console.log("Error al registrar Usuario. !!!");
        }
    };

    return (
        <>
            <main className="main__register">
                <p className="paragraph">Comprá más rápido y llevá el control de tus pedidos, ¡en un solo lugar!</p>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-container">
                        <label className="form-label" htmlFor="name">NOMBRE</label>
                        <input className="form-input-name" value={formData.firstName} onChange={modificarCampo} name="firstName" id="name" type="text" placeholder="ej.: María Perez" autoComplete="off" required />
                    </div>
                    <div className="form-container">
                        <label className="form-label" htmlFor="mobile-email">EMAIL</label>
                        <input className="form-input-name" value={formData.email} onChange={modificarCampo} name="email" id="mobile-email" type="email" placeholder="ej.: tunombre@email.com" autoComplete="off" />
                    </div>
                    <div className="form-container">
                        <label className="form-label" htmlFor="telefono">TELÉFONO (OPCIONAL)</label>
                        <input className="form-input-telephone" value={formData.tel} onChange={modificarCampo} name="tel" id="telefono" type="text" placeholder="ej.: 1123445567" autoComplete="off" />
                    </div>
                    <div className="form-container">
                        <label className="form-label" htmlFor="password">CONTRASEÑA</label>
                        <input className="form-input-password" value={formData.password} onChange={modificarCampo} type={handlePasswordVisibility("current")} id="password" name="password" autoComplete="off" />
                        <div className="password-icons">
                            <i className={`bi ${passwordVisible.current ? 'bi-eye' : 'bi-eye-slash'}`} onClick={() => togglePasswordVisibility('current')}></i>
                        </div>
                    </div>
                    <div className="form-container">
                        <label className="form-label" htmlFor="passwordConfirmation">CONFIRMAR CONTRASEÑA</label>
                        <input className="form-input-repassword" value={formData.passwordConfirmation} onChange={modificarCampo} type={handlePasswordVisibility("confirm")} id="passwordConfirmation" name="passwordConfirmation" autoComplete="off" />
                        <div className="password-icons">
                            <i className={`bi ${passwordVisible.confirm ? 'bi-eye' : 'bi-eye-slash'}`} onClick={() => togglePasswordVisibility('confirm')}></i>
                        </div>
                    </div>
                    <div className="form-container">
                        <input className="input-submit" type="submit" name="submit" id="submit" value="CREAR CUENTA" />
                    </div>
                    <div className="user-login">
                        <p className="login-paragraph">¿Ya tenés una cuenta?</p>
                        <Link className="login-link" to="/Login">Iniciá sesión</Link>
                    </div>
                </form>
            </main>
        </>
    );
};

export default Register;

import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import "./ResetPass.css"

export const ResetPass = () => {
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { token } = useParams();


    const handleSubmitForm = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setIsSubmitted(true);
        try {
            const params = {
                method: "POST",
                body: JSON.stringify({
                    password: password
                }),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                }
            };
            const data = await fetch(`http://localhost:8080/api/v1/reset-pass/${token}`, params);
            console.log(data);
            window.location.href = "http://localhost:3001/Login";
        } catch (error) {
            console.log("Error");
        } finally {
            setIsSubmitting(false); // Restablecer el estado de envío después de completar la solicitud
        }
    };

    return (
        <>
            <main className="main__reset">
                <form className="form-reset" onSubmit={handleSubmitForm}>
                    <div className="form-reset-container">
                        <label className="form-reset-label" htmlFor="mobile-email">NUEVA CONTRASEÑA:</label>
                        <input className="form-reset-input-name" id="mobile-email" type="password" name="password" placeholder="Ingrese su nueva contraseña..." value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className="login-btn" type="submit" disabled={isSubmitted}>
                        {isSubmitting ? 'Redireccionando...' : 'CAMBIAR CONTRASEÑA'} {/* Mostrar texto diferente mientras se envía */}
                    </button>
                </form>
            </main>
        </>
    )
};

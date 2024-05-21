export const validateLoginForm = (email, password) => {
    if (email.trim() === "") {
        return "Por favor, ingrese su correo electrónico";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return "Ingrese un correo electrónico válido";
    }

    if (password.trim() === "") {
        return "Por favor, ingrese su contraseña";
    }

    return null; // Retorna null si la validación es exitosa
};
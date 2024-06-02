require("dotenv").config();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('../models/user');
const transporter = require("../utils/email");
const fs = require('fs');
const path = require('path');
const EMAIL = process.env.EMAIL;

const forgotPassWord = async (req, res) => {
    const { email } = req.body;

    try {
        // Buscar usuario por correo electrónico
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send({ msg: "Usuario no encontrado" });
        }

        // Generar y guardar token de restablecimiento de contraseña
        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // Expira en 1 hora
        await user.save();

        const resetPasswordTemplate = fs.readFileSync(path.resolve(__dirname, '../template/resetPassword.html'), 'utf8');

        const mailOptions = {
            from: EMAIL,
            to: user.email,
            subject: 'Recuperación de contraseña',
            html: resetPasswordTemplate.replace('{{ userName }}', user.firstName).replace('{{ resetPasswordLink }}', `http://localhost:3000/ResetPass/${token}`)
        };

        await transporter.sendMail(mailOptions);
        res.status(200).send({ msg: "Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: "Error en el servidor" });
    }
};

const resetPassWord = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    console.log(password);

    try {
        // Buscar usuario por token de restablecimiento de contraseña
        const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });

        console.log(user);
        if (!user) {
            return res.status(400).send({ msg: "Token inválido o expirado" });
        }

        // Hash de la nueva contraseña
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Actualizar contraseña
        user.password = hashedPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        res.status(200).send({ msg: "Contraseña restablecida exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: "Error en el servidor" });
    }
};

module.exports = {
    forgotPassWord,
    resetPassWord
};

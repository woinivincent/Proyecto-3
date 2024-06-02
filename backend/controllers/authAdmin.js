const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");


async function register(req, res) {
    const { name, email, password, passwordConfirmation } = req.body;

    if (!email) res.status(400).send({ msg: "El email es obligatorio!!!" });
    if (!password) res.status(400).send({ msg: "La contraseña es obligatoria!!!" });
    if (!passwordConfirmation) res.status(400).send({ msg: "La contraseña de confimacion es obligatoria!!!" });
    if (password !== passwordConfirmation) res.status(400).send({ msg: "Las contraseñas no coinciden. !!!" });

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const admin = new Admin({
        name: name,
        email: email.toLowerCase(),
        password: hashPassword
    });

    try {
        await admin.save();
        res.status(200).send({ msg: "Usuario Guardado" });
    } catch (error) {
        res.status(400).send({ msg: "Error al crear el usuario", error });
    }
}

async function login(req, res) {
    const { email, password } = req.body;
    if (!email) res.status(400).send({ msg: "El email es obligatorio!!!" });
    if (!password) res.status(400).send({ msg: "La contraseña es obligatoria!!!" });

    try {
        const admin = await Admin.findOne({ email: email.toLowerCase() });
        const check = await bcrypt.compare(password, admin.password);
        const { role } = admin;

        if (!check) {
            res.status(400).send({ msg: "Contraseña Incorrecta" });
        } else if (role !== "superadmin" && role !== "admin" && role !== "moderator") {
            res.status(400).send({ msg: "No eres Admin" });
        } else {
            res.status(200).send({ accessAdmin: jwt.createAccessTokenAdmin(admin) });
        }
    } catch (error) {
        res.status(500).send({ msg: "Error en el servidor" });
    }
}

module.exports = { register, login };

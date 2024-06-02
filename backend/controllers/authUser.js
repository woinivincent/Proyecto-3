const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");

async function register(req, res) {
    const { firstName, email, password, passwordConfirmation, tel } = req.body;

    if (!email) return res.status(400).send({ msg: "El email es obligatorio!!!" });
    if (!password) return res.status(400).send({ msg: "La contraseña es obligatoria!!!" });
    if (!passwordConfirmation) return res.status(400).send({ msg: "La contraseña de confimacion es obligatoria!!!" });
    if (password !== passwordConfirmation) return res.status(400).send({ msg: "Las contraseñas no coninciden. !!!" });

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const user = new User({
        firstName: firstName,
        email: email.toLowerCase(),
        password: hashPassword,
        tel: tel
    });

    try {
        await user.save();
        res.status(200).send({ msg: "Usuario Guardado", ok: true });
    } catch (error) {
        res.status(400).send({ msg: "Error al crear el usuario", error });
    }
}

async function login(req, res) {
    const { email, password } = req.body;
    if (!email) return res.status(400).send({ msg: "El email es obligatorio!!!" });
    if (!password) return res.status(400).send({ msg: "La contraseña es obligatoria!!!" });

    try {
        const user = await User.findOne({ email: email.toLowerCase() });
        const check = await bcrypt.compare(password, user.password);

        if (!check) {
            res.status(400).send({ msg: "Contraseña Incorrecta" });
        } else {
            res.status(200).send({ access: jwt.createAccessToken(user) });
        }
    } catch (error) {
        res.status(500).send({ msg: "Error en el servidor" });
    }
}

module.exports = { register, login };

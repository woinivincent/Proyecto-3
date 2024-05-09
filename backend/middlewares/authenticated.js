const jwt = require("../utils/jwt");
function asureAuth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ msg: "La peticion no tiene la cabecera" });
    }

    const token = req.headers.authorization.replace("Bearer ", "");

    try {
        const payload = jwt.decode(token);

        const { exp, role } = payload;
        const currentData = new Date().getTime();

        if (exp <= currentData) {
            return res.status(400).send({ msg: "El token ha expirado" });
        } else if(role !== "user") {
            return res.status(400).send({msg: "No tienes permiso de User"});
        }
        req.user = payload;
        next();
    } catch (error) {
        return res.status(400).send({ msg: "El token invalido" });
    }
}

function asureAuthAdmin(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ msg: "La peticion no tiene la cabecera" });
    }

    const token = req.headers.authorization.replace("Bearer ", "");

    try {
        const payload = jwt.decode(token);

        const { exp, role } = payload;
        const currentData = new Date().getTime();

        if (exp <= currentData) {
            return res.status(400).send({ msg: "El token ha expirado" });
        } else if(role !== "superadmin" && role !== "admin" && role !== "moderator") {
            return res.status(400).send({msg: "No tienes permiso de Administrador"});
        }
        req.admin = payload;
        next();
    } catch (error) {
        return res.status(400).send({ msg: "El token invalido" });
    }
}

module.exports = { asureAuth, asureAuthAdmin }

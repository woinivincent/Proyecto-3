const Admin = require("../models/admin");

async function getMe(req, res) {
    const { admin_id } = req.admin;

    const admin = await Admin.findById(admin_id);

    if (!admin) {
        res.status(400).send({ msg: "No se ha encontrado al Usuario" });
    } else {
        res.status(200).send(admin);
    }
}

module.exports = { getMe};

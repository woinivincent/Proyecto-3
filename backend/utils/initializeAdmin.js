const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");

async function initializeSuperAdmin() {
    const existingSuperAdmin = await Admin.findOne({ role: "superadmin" });
    if (!existingSuperAdmin) {
        const superAdminData = {
            name: 'SuperAdmin',
            email: 'admin@example.com',
            password: 'team1234567',
            role: 'superadmin',
            active: true
        };

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(superAdminData.password, salt);
        superAdminData.password = hashPassword;

        const superadmin = new Admin(superAdminData);

        try {
            await superadmin.save();
            console.log('Superadmin creado exitosamente');
        } catch (error) {
            console.error('Error al crear el Superadmin:', error);
        }
    } else {
        console.log('Ya existe un Superadmin en la base de datos');
    }
}

module.exports = { initializeSuperAdmin };

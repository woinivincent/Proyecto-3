require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
const { initializeSuperAdmin } = require("./utils/initializeAdmin");

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const ipServer = process.env.IP_SERVER;
const apiVersion = process.env.API_VERSION;
const Port = process.env.PORT;

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/`);
        console.log("La conexion a la base de datos ha sido Exitosa.!!!");
        app.listen(Port, () => {
            console.log("==================================");
            console.log("=============API-REST=============");
            console.log("==================================");
            console.log(`http://${ipServer}:${Port}/api/${apiVersion}/`);
        });
    } catch (error) {
        console.error("Error al conectar a la base de datos", error);
    }
};

connectDB();
initializeSuperAdmin();

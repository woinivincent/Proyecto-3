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
      const dbName = process.env.DB_NAME || 'tuBaseDeDatos'; 
      const uri = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}`;
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Conexión a la base de datos exitosa!");
      
      const server = app.listen(process.env.PORT || 3000, () => {
        console.log(`Servidor corriendo en el puerto ${server.address().port}`);
      });
    } catch (error) {
      console.error("Error al conectar a la base de datos:", error);
    }
  };
connectDB();
initializeSuperAdmin();

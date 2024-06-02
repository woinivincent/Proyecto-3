require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const apiVersion = process.env.API_VERSION;
const app = express();


//Configuracion Header HTTP - CORS
app.use(cors());

//Importar Rutas
const authAdminRoutes = require("./router/authAdmin");
const authUserRoutes = require("./router/authUser");
const userRoutes = require("./router/user");
const adminRoutes = require("./router/admin");
const productRoutes = require("./router/product");
const cartRoutes = require("./router/cart");
const passwordResetRoutes = require("./router/passwordReset");

//Configuracion de Body-Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Configurar Static Folder
app.use(express.static("uploads"));

//Configurar Rutas
app.use(`/api/${apiVersion}`, authAdminRoutes);
app.use(`/api/${apiVersion}`, authUserRoutes);
app.use(`/api/${apiVersion}`, userRoutes);
app.use(`/api/${apiVersion}`, adminRoutes);
app.use(`/api/${apiVersion}`, productRoutes);
app.use(`/api/${apiVersion}`, cartRoutes);
app.use(`/api/${apiVersion}`, passwordResetRoutes);

module.exports = app;

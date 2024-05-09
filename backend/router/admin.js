const express = require("express");
const AdminController = require("../controllers/admin");
const md_authAdmin = require("../middlewares/authenticated");
const api = express.Router();

api.get("/admin/me", [md_authAdmin.asureAuthAdmin], AdminController.getMe);

module.exports = api;

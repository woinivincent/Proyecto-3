const express = require("express");
const passResetController = require("../controllers/passwordReset");

const api = express.Router();

api.post("/forgot-pass", passResetController.forgotPassWord);
api.post("/reset-pass/:token", passResetController.resetPassWord);

module.exports = api;

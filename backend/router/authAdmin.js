const express = require('express');
const api = express.Router();
const adminAuthController = require('../controllers/authAdmin');

api.post('/admin/register', adminAuthController.register);
api.post('/admin/login', adminAuthController.login);


module.exports = api;

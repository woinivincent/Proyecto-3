require("dotenv").config();
const nodemailer = require('nodemailer');

const EMAIL = process.env.EMAIL;
const PASS_EMAIL = process.env.PASS_EMAIL;

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: EMAIL,
        pass: PASS_EMAIL
    }
});

module.exports = transporter;

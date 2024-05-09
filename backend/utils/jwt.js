const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET_KEY_USER = process.env.JWT_SECRET_KEY_USER;
const JWT_SECRET_KEY_ADMIN = process.env.JWT_SECRET_KEY_ADMIN;

function createAccessToken(user) {
    const expToken = new Date();
    expToken.setHours(expToken.getHours() + 3);

    const payload = {
        token_type: 'access',
        user_id: user._id,
        role: user.role,
        iat: Date.now(),
        exp: expToken.getTime()
    };

    return jwt.sign(payload, JWT_SECRET_KEY_USER);
}
function createAccessTokenAdmin(admin) {
    const expToken = new Date();
    expToken.setHours(expToken.getHours() + 3);

    const payload = {
        token_type: 'access',
        admin_id: admin._id,
        role: admin.role,
        iat: Date.now(),
        exp: expToken.getTime()
    };

    return jwt.sign(payload, JWT_SECRET_KEY_ADMIN);
}

function decode(token) {
    return jwt.decode(token, JWT_SECRET_KEY_USER, true);
}
function decodeAdmin(token) {
    return jwt.decode(token, JWT_SECRET_KEY_ADMIN, true);
}

module.exports = { createAccessToken, decode, createAccessTokenAdmin, decodeAdmin };

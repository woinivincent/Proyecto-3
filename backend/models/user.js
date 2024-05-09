const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    tel: {
        type: String
    },
    role: {
        type: String,
        default: "user",
    }
});

module.exports = mongoose.model("User", UserSchema);

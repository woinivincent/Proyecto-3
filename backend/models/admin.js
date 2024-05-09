const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ['superadmin', 'admin', 'moderator', "pending"],
        default: 'pending'
    },
    active: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Admin', adminSchema);

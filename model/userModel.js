const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required:true,
    },
    email: {
        type: String,
    },
    phone: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Number,
        default: 0,
    },
    isBlocked: {
        type: Boolean,
        default:false,
    },
});

module.exports = mongoose.model("User", userSchema);
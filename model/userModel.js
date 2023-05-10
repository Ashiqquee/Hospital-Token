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
    isBlocked: {
        type: Boolean,
        default:false,
    },
});

User = mongoose.model("User", userSchema);

module.exports = User;
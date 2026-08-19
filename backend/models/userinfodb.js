const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profile_photo: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("UserInfo", userSchema)
const mongoose = require('mongoose')

let otpSchema = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    otp: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: { expires: 300 }
    },
    profile_photo: {
        type: String
    }
})

module.exports = mongoose.model("Otp", otpSchema);
const mongoose = require('mongoose')

let trackSchema = new mongoose.Schema({
    creator: {
        type: String,
        required: true
    },
    track_details: [
        {
            latitude: {
                type: Number,
                required: true
            },
            longitude: {
                type: Number,
                required: true
            },
            timestamp: {
                type: String,
                required: true
            }
        }
    ],
    track_name: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    public: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Tracks", trackSchema)
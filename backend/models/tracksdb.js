const mongoose = require('mongoose')
require('dotenv').config()

const mongoURI = process.env.MONGODB_URI.replace("<db_name>", "tracks_MAP_db")
const tracksdb = mongoose.createConnection(mongoURI)

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

let Tracks = tracksdb.model("Tracks", trackSchema)

module.exports = Tracks
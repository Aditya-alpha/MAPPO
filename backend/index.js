const express = require('express')
const cors = require('cors')
const sendEmail = require("./email/email")
const UserInfo = require("./models/userinfodb")
const Otp = require("./models/otpdb")
const Tracks = require("./models/tracksdb")
const bcrypt = require('bcrypt')
require("dotenv").config()
const multer = require('multer')
const cloudinary = require("./uploadProfilePhoto")
const { CloudinaryStorage } = require('multer-storage-cloudinary')

const app = express()

const corsOptions = {
    origin: [`http://localhost:5173`,`https://map-nine-rosy.vercel.app/`],
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true
}

const PORT = process.env.PORT

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'posts',
        allowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'mp4', 'mov', 'avi', 'mkv', 'webm', 'pdf', 'zip', 'txt'],
        resource_type: 'auto'
    },
});

const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 1024 } })

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors(corsOptions))

app.get("/", () => {
    console.log("Hello")
})

app.post("/signup", async (req, res) => {
    let { username, email, password, profile_photo } = req.body
    try {
        let isUser = await UserInfo.findOne({ $or: [{ username: username }, { email: email }] })
        if (isUser) {
            if (isUser.username === username) {
                res.status(408).send({ "message": "Username already exists." })
                return
            }
            if (isUser.email === email) {
                res.status(409).send({ "message": "Email already in use. You can login using this email" })
                return
            }
        }
        let otp = Math.floor(100000 + Math.random() * 900000)
        await sendEmail(email, otp)
        let hashedPassword = await bcrypt.hash(password, 10)
        await Otp.findOneAndUpdate({ email: email }, { username: username, email: email, password: hashedPassword, otp: otp, profile_photo: profile_photo }, { upsert: true, new: true })
        return res.status(200).json("Success")
    }
    catch (error) {
        return res.status(500).json("Internal server error")
    }
})

app.post("/signup/otp", async (req, res) => {
    let { email, enteredOtp } = req.body
    try {
        let otpdata = await Otp.findOne({ email: email })
        console.log(email, otpdata, enteredOtp)
        if (otpdata.otp === parseInt(enteredOtp)) {
            let data = await UserInfo.create({
                username: otpdata.username,
                email: otpdata.email,
                password: otpdata.password,
                profile_photo: otpdata.profile_photo
            })
            await Otp.deleteOne({ email })
            res.status(200).send(data)
        }
        else {
            res.status(403).send("Incorrect OTP")
        }
    }
    catch (error) {
        console.log(error)
        res.send("Internal server error")
    }
})

app.post("/signup/resend-otp", async (req, res) => {
    let { email } = req.body
    try {
        let otpData = await Otp.findOne({ email: email })
        if (!otpData) {
            return res.status(404).send({ message: "No OTP request found for this email. Please sign up again." })
        }
        let otpsent = Math.floor(100000 + Math.random() * 900000)
        await sendEmail(email, otpsent)
        await Otp.findOneAndUpdate(
            { email: email },
            { otp: otpsent, createdAt: new Date() },
            { new: true }
        )
        res.status(200).send({ message: "New OTP sent successfully" })
    }
    catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }
})

app.post("/login", async (req, res) => {
    let { email, password } = req.body
    try {
        let isUser = await UserInfo.findOne({ email })
        if (!isUser) {
            return res.status(404).send({ message: "User not found" })
        }
        const isPasswordValid = await bcrypt.compare(password, isUser.password);
        if (!isPasswordValid) {
            return res.status(403).send({ message: "Password is incorrect" });
        }
        return res.status(200).send(isUser)
    }
    catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }
})

app.post("/login/forgotpassword", async (req, res) => {
    let { email } = req.body
    try {
        let otpsent = Math.floor(100000 + Math.random() * 900000)
        await sendEmail(email, otpsent)
        await Otp.findOneAndUpdate({ email: email }, { email: email, otp: otpsent }, { upsert: true, new: true })
        res.status(200).send("Email sent")
    }
    catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }
})

app.post("/login/forgotpassword/verify", async (req, res) => {
    let { email, enteredotp } = req.body
    try {
        let otpdata = await Otp.findOne({ email: email })
        if (otpdata.otp === parseInt(enteredotp)) {
            await Otp.deleteOne({ email })
            res.status(200).send("Otp verified")
        }
        else {
            res.status(403).send("Incorrect OTP")
        }
    }
    catch (error) {
        res.send("Internal server error")
    }
})

app.post("/login/updatepassword", async (req, res) => {
    const newPassword = req.body.newPassword
    const email = req.body.email
    try {
        let userData = await UserInfo.findOne({ email: email })
        if (userData) {
            const hashedPassword = await bcrypt.hash(newPassword, 10)
            await UserInfo.findOneAndUpdate({ email: email }, { $set: { password: hashedPassword } }, { new: true })
            res.status(200).send("Password updated successfully")
        }
        else {
            res.status(403).send("User not found")
        }
    }
    catch (error) {
        res.send("Internal server error")
    }
})

app.post("/:username/tracking", async (req, res) => {
    let { username } = req.params
    let { positions, trackName } = req.body
    try {
        await Tracks.create({
            creator: username,
            track_details: positions,
            track_name: trackName
        })
        res.status(200).send({ message: "Track saved successfully." })
    }
    catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }
})

app.get("/:username/tracks", async (req, res) => {
    let { username } = req.params
    try {
        let data = await Tracks.find({creator: username}).select("createdAt track_details track_name public")
        res.status(200).send(data)
    }
    catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }
})

app.get("/:username/tracks/:track_id", async (req, res) => {
    let { track_id } = req.params
    try {
        let data = await Tracks.findOne({_id: track_id}).select("createdAt track_details track_name public")
        res.status(200).send(data)
    }
    catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }
})

app.patch("/:username/tracks", async (req, res) => {
    let { track_id, public } = req.body
    try {
        let data = await Tracks.findOneAndUpdate({_id: track_id}, {public: public}, {new: true}).select("createdAt track_details track_name public")
        res.status(200).send(data)
    }
    catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }
})

app.delete("/:username/tracks", async (req, res) => {
    let { track_id } = req.body
    try {
        await Tracks.findOneAndDelete({_id: track_id})
        res.status(200).send({ message: "Track deleted successfully !"})
    }
    catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }
})

app.get("/:username/search-tracks", async (req, res) => {
    try {
        let data = await Tracks.find({public: true}).select("createdAt track_details track_name")
        res.status(200).send(data)
    }
    catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }
})

app.post("/:username/search-tracks", async (req, res) => {
    let { targetSearch } = req.body
    try {
        let data = await Tracks.find({track_name: {$regex: targetSearch, $options: 'i'}, public: true}).select("createdAt track_details track_name")
        res.status(200).send(data)
    }
    catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }
})

app.get("/:username/profile", async (req, res) => {
    let { username } = req.params
    try {
        let data = await UserInfo.findOne({ username }).select("username email profile_photo")
        res.status(200).send(data)
    }
    catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }
})

app.post("/:username/profile", upload.single("profile_photo"), async (req, res) => {
    let { username } = req.params
    let profile_photo = req.file.path
    try {
        let data = await UserInfo.findOneAndUpdate({ username }, { profile_photo }, { new: true })
        res.status(200).send(data)
    }
    catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }
})

app.post("/:username/profile/updatepassword", async (req, res) => {
    let { username } = req.params
    let oldpassword = req.body.oldPassword
    let newpassword = req.body.newPassword
    try {
        let userData = await UserInfo.findOne({ username: username })
        if (!userData) {
            return res.status(404).send({ message: "User not found." });
        }
        const isPasswordValid = await bcrypt.compare(oldpassword, userData.password);
        if (!isPasswordValid) {
            return res.status(403).send({ message: "Old password is incorrect." });
        }
        const hashedNewPassword = await bcrypt.hash(newpassword, 10)
        await UserInfo.findOneAndUpdate({ username: username }, { password: hashedNewPassword }, { new: true })
        res.status(200).send({ message: "Password updated successfully." })

    }
    catch (error) {
        res.status(500).send({ message: "Internal server error. Please try again later." })
    }
})

app.listen(PORT, () => {
    console.log("Server is listening...")
})
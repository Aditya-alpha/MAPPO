const express = require('express')
const cors = require('cors')
const sendEmail = require("./email/email")
const UserInfo = require("./models/userinfodb")
const Otp = require("./models/otpdb")
const bcrypt = require('bcrypt')
require("dotenv").config()

const app = express()

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true
}

const PORT = process.env.PORT || 3000

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
    let { email } = req.body;
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

app.listen(PORT, () => {
    console.log("Server is listening...")
})
import { useState } from "react"
import { RxCross2 } from "react-icons/rx"
import { useNavigate } from "react-router-dom"

export default function Login() {

    let navigate = useNavigate()

    let [userInfo, setUserInfo] = useState({
        email: "",
        password: ""
    })

    function handleInputChange(event) {
        setUserInfo((prev) => ({ ...prev, [event.target.name]: event.target.value }))
    }

    function handleForgotPassword() {
        if (!userInfo.email.trim()) {
            alert("Please enter your email address before proceeding.")
            return
        }
        else {
            navigate("/login/forgotpassword")
            window.localStorage.setItem("email", userInfo.email)
        }
    }

    async function handleLogin(e) {
        e.preventDefault()
        let areAllFieldsFilled = Object.values(userInfo).some((value) => value.trim() === "")
        if (areAllFieldsFilled) {
            alert("Please fill out all fields before proceeding.")
            return
        }
        if (!userInfo.email.includes("@gmail.com")) {
            alert("Email must be a valid Gmail address (e.g., example@gmail.com).")
            return
        }
        if (userInfo.password.length < 8) {
            alert("Password must contain atleast 8 characters.")
            return
        }
        try {
            const response = await fetch("http://localhost:8000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userInfo)
            })
            if (response.ok) {
                const data = await response.json()
                window.localStorage.setItem("username", data.username)
                window.localStorage.setItem("email", data.email)
                window.localStorage.setItem("isSignedin", true)
                window.localStorage.setItem("profile_photo", data.profile_photo)
                alert("Signin successful !")
                navigate("/")
            }
            if (response.status === 403) {
                alert("The password is incorrect. Try again.")
            }
            if (response.status === 404) {
                alert("User not found. Please Sign up first.")
                navigate("/signup")
            }
        }
        catch (error) {
            alert("An error occurred during sign-in. Please try again.");
            navigate("/")
        }
    }

    return (
        <div className="h-screen w-full flex justify-center items-center bg-[#1db1ff]">
            <div className="h-[480px] w-[420px] rounded-lg py-4 px-5 bg-sky-300 shadow-2xl hover:scale-105 transition-all duration-300 max-sm:mx-4">
                <div className="flex justify-between">
                    <p className="font-medium text-3xl">Log in</p>
                    <RxCross2 onClick={() => navigate("/")} className="text-3xl mt-1 -mr-1 cursor-pointer hover:scale-125 transition-all duration-300" />
                </div>
                <form method="post" action="/login" className="mt-6">
                    <input autoFocus type="text" name="email" value={userInfo.email} onChange={handleInputChange} placeholder="Email" className="block h-12 w-full px-3 rounded-md placeholder:text-black placeholder:opacity-70 border-2 border-black mt-8 outline-none" />
                    <input type="password" name="password" value={userInfo.password} onChange={handleInputChange} placeholder="Password" className="block h-12 w-full px-3 rounded-md placeholder:text-black placeholder:opacity-70 border-2 border-black mt-8 outline-none" />
                    <div className="flex mt-4 font-medium justify-between" >
                        <p onClick={handleForgotPassword} className="cursor-pointer hover:underline">Forgot password?</p>
                        <p onClick={() => navigate("/signup")} className="cursor-pointer hover:underline" >New User?&nbsp; Sign up!</p>
                    </div>
                    <button onClick={handleLogin} className="h-12 w-full mt-6 hover:text-2xl transition-all duration-200 rounded-full border-2 border-black bg-white text-black text-xl font-semibold" >Log in</button>
                </form>
                <div className="flex items-center mt-6">
                    <hr className="flex-grow" />
                    <p className="px-3 font-medium -mt-1">or</p>
                    <hr className="flex-grow" />
                </div>
                <button className="h-12 w-full mt-6 hover:text-lg transition-all duration-200 rounded-full font-medium border-[2px] border-black bg-white">Sign in with Google</button>
            </div>
        </div>
    )
}
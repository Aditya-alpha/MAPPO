import { useState } from "react"
import { RxCross2 } from "react-icons/rx"
import { FaArrowRight, FaGoogle } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"

export default function Login() {
    const navigate = useNavigate()

    const [userInfo, setUserInfo] = useState({
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

        navigate("/login/forgotpassword")
        window.localStorage.setItem("email", userInfo.email)
    }

    async function handleLogin(e) {
        e.preventDefault()

        const areAllFieldsFilled = Object.values(userInfo).some(
            (value) => value.trim() === ""
        )

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
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userInfo)
                }
            )

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
        } catch (error) {
            alert("An error occurred during sign-in. Please try again.")
            navigate("/")
        }
    }

    return (
        <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#07090d] px-6 text-white">

            <div className="absolute left-[10%] top-[15%] h-[350px] w-[350px] rounded-full bg-cyan-500/[0.05] blur-[130px]" />
            <div className="absolute bottom-[5%] right-[10%] h-[300px] w-[300px] rounded-full bg-blue-500/[0.04] blur-[130px]" />

            <div className="relative grid w-full max-w-6xl overflow-hidden border border-white/[0.08] bg-[#0a0d12] lg:grid-cols-2">

                <div className="hidden flex-col justify-between border-r border-white/[0.08] p-12 lg:flex xl:p-16">

                    <div>
                        <span className="text-2xl font-bold tracking-[-0.04em]">
                            MAP<span className="text-cyan-400">PO</span>
                        </span>

                        <div className="mt-24">
                            <span className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-cyan-400">
                                <span className="h-px w-8 bg-cyan-400" />
                                Welcome back
                            </span>

                            <h1 className="mt-8 text-6xl font-bold leading-[0.9] tracking-[-0.06em]">
                                Continue
                                <br />
                                your
                                <br />
                                <span className="text-white/25">
                                    journey.
                                </span>
                            </h1>

                            <p className="mt-8 max-w-sm text-sm leading-7 text-white/40">
                                Sign in to access your routes, continue
                                tracking your adventures and discover new
                                paths.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-white/25">
                        <span className="h-2 w-2 rounded-full bg-cyan-400" />
                        Explore without limits
                    </div>
                </div>

                <div className="relative p-7 sm:p-10 lg:p-12 xl:p-16">

                    <button
                        onClick={() => navigate("/")}
                        className="cursor-pointer absolute right-7 top-7 text-white/30 transition-colors duration-300 hover:text-white sm:right-10 sm:top-10 lg:right-12 lg:top-12"
                    >
                        <RxCross2 className="text-2xl" />
                    </button>

                    <div className="lg:hidden">
                        <span className="text-2xl font-bold tracking-[-0.04em]">
                            MAP<span className="text-cyan-400">PO</span>
                        </span>
                    </div>

                    <div className="mt-16 lg:mt-12">

                        <span className="text-[10px] uppercase tracking-[0.3em] text-cyan-400">
                            Account access
                        </span>

                        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">
                            Log in
                        </h2>

                        <p className="mt-3 text-sm text-white/35">
                            Enter your credentials to continue.
                        </p>

                        <form onSubmit={handleLogin} className="mt-10">

                            <div>
                                <label className="mb-3 block text-xs font-medium uppercase tracking-[0.15em] text-white/40">
                                    Email
                                </label>

                                <input
                                    autoFocus
                                    type="text"
                                    name="email"
                                    value={userInfo.email}
                                    onChange={handleInputChange}
                                    placeholder="you@gmail.com"
                                    className="h-13 w-full border-b border-white/15 bg-transparent px-0 text-sm text-white outline-none transition-colors duration-300 placeholder:text-white/20 focus:border-cyan-400"
                                />
                            </div>

                            <div className="mt-8">
                                <label className="mb-3 block text-xs font-medium uppercase tracking-[0.15em] text-white/40">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    value={userInfo.password}
                                    onChange={handleInputChange}
                                    placeholder="Enter your password"
                                    className="h-13 w-full border-b border-white/15 bg-transparent px-0 text-sm text-white outline-none transition-colors duration-300 placeholder:text-white/20 focus:border-cyan-400"
                                />
                            </div>

                            <div className="mt-5 flex items-center justify-between text-xs">
                                <button
                                    type="button"
                                    onClick={handleForgotPassword}
                                    className="text-white/40 transition-colors duration-300 hover:text-cyan-400"
                                >
                                    Forgot password?
                                </button>

                                <button
                                    type="button"
                                    onClick={() => navigate("/signup")}
                                    className="cursor-pointer text-white/40 transition-colors duration-300 hover:text-white"
                                >
                                    New user? <span className="text-cyan-400">Sign up</span>
                                </button>
                            </div>

                            <button
                                type="submit"
                                className="cursor-pointer group mt-10 flex h-13 w-full items-center justify-center gap-4 bg-cyan-400 text-sm font-semibold uppercase tracking-[0.15em] text-black transition-all duration-300 hover:bg-cyan-300"
                            >
                                Log in
                                <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                            </button>

                        </form>

                        <div className="my-8 flex items-center gap-4">
                            <span className="h-px flex-1 bg-white/[0.08]" />
                            <span className="text-[10px] uppercase tracking-[0.2em] text-white/20">
                                or
                            </span>
                            <span className="h-px flex-1 bg-white/[0.08]" />
                        </div>

                        <button
                            type="button"
                            className="cursor-pointer flex h-13 w-full items-center justify-center gap-3 border border-white/10 text-sm font-medium text-white/60 transition-all duration-300 hover:border-white/30 hover:text-white"
                        >
                            <FaGoogle className="text-sm" />
                            Continue with Google
                        </button>

                        <p className="mt-8 text-center text-[10px] leading-5 text-white/20">
                            By continuing, you agree to use MAPPO responsibly
                            and keep your account information secure.
                        </p>

                    </div>
                </div>
            </div>
        </main>
    )
}
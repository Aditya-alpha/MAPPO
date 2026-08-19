import { useState } from "react"
import { RxCross2 } from "react-icons/rx"
import { FaArrowRight, FaGoogle, FaUserPlus } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"
import default_profile_photo from "../images/default_profile.png"

export default function Signup() {
    const navigate = useNavigate()

    const [userInfo, setUserInfo] = useState({
        username: "",
        email: "",
        password: "",
        profile_photo: default_profile_photo
    })

    const [loading, setLoading] = useState(false)

    function handleInputChange(event) {
        setUserInfo((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    async function handleSignup(e) {
        e.preventDefault()

        if (
            !userInfo.username.trim() ||
            !userInfo.email.trim() ||
            !userInfo.password.trim()
        ) {
            alert("Please fill out all fields before proceeding.")
            return
        }

        if (!userInfo.email.endsWith("@gmail.com")) {
            alert("Email must be a valid Gmail address (e.g., example@gmail.com).")
            return
        }

        if (userInfo.password.length < 8) {
            alert("Password must contain atleast 8 characters.")
            return
        }

        setLoading(true)

        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/signup`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userInfo)
                }
            )

            const data = await response.json()

            if (response.ok) {
                window.localStorage.setItem("username", userInfo.username)
                window.localStorage.setItem("email", userInfo.email)
                window.localStorage.setItem("profile_photo", userInfo.profile_photo)

                navigate("/signup/otp")
            } else if (response.status === 408) {
                alert(data.message)
            } else if (response.status === 409) {
                alert(data.message)
            } else {
                alert("An unexpected error occured.")
            }
        } catch (error) {
            alert("An error occurred during sign-up. Please refresh and try again.")
            navigate("/")
        } finally {
            setLoading(false)
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
                                Join MAPPO
                            </span>

                            <h1 className="mt-8 text-6xl font-bold leading-[0.9] tracking-[-0.06em]">
                                Start
                                <br />
                                your
                                <br />
                                <span className="text-white/25">
                                    journey.
                                </span>
                            </h1>

                            <p className="mt-8 max-w-sm text-sm leading-7 text-white/40">
                                Create your MAPPO account and start tracking,
                                organizing and sharing the routes that make
                                your journeys memorable.
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

                        <div className="flex h-12 w-12 items-center justify-center border border-white/10 text-cyan-400">
                            <FaUserPlus />
                        </div>

                        <span className="mt-8 block text-[10px] uppercase tracking-[0.3em] text-cyan-400">
                            Create account
                        </span>

                        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">
                            Sign up
                        </h2>

                        <p className="mt-3 text-sm text-white/35">
                            Create your account to get started.
                        </p>

                        <form
                            onSubmit={handleSignup}
                            className="mt-9"
                        >

                            <div>
                                <label className="mb-3 block text-xs font-medium uppercase tracking-[0.15em] text-white/40">
                                    Username
                                </label>

                                <input
                                    autoFocus
                                    type="text"
                                    name="username"
                                    value={userInfo.username}
                                    onChange={handleInputChange}
                                    placeholder="Choose a username"
                                    className="h-12 w-full border-b border-white/15 bg-transparent px-0 text-sm text-white outline-none transition-colors duration-300 placeholder:text-white/20 focus:border-cyan-400"
                                />
                            </div>

                            <div className="mt-7">
                                <label className="mb-3 block text-xs font-medium uppercase tracking-[0.15em] text-white/40">
                                    Email
                                </label>

                                <input
                                    type="text"
                                    name="email"
                                    value={userInfo.email}
                                    onChange={handleInputChange}
                                    placeholder="you@gmail.com"
                                    className="h-12 w-full border-b border-white/15 bg-transparent px-0 text-sm text-white outline-none transition-colors duration-300 placeholder:text-white/20 focus:border-cyan-400"
                                />
                            </div>

                            <div className="mt-7">
                                <label className="mb-3 block text-xs font-medium uppercase tracking-[0.15em] text-white/40">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    value={userInfo.password}
                                    onChange={handleInputChange}
                                    placeholder="Create a password"
                                    className="h-12 w-full border-b border-white/15 bg-transparent px-0 text-sm text-white outline-none transition-colors duration-300 placeholder:text-white/20 focus:border-cyan-400"
                                />
                            </div>

                            <p className="mt-4 text-xs text-white/25">
                                Password must contain at least 8 characters.
                            </p>

                            <button
                                type="submit"
                                disabled={loading}
                                className="cursor-pointer group mt-7 flex h-13 w-full items-center justify-center gap-4 bg-cyan-400 text-sm font-semibold uppercase tracking-[0.15em] text-black transition-all duration-300 hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {loading ? "Creating account..." : "Create account"}

                                {!loading && (
                                    <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                                )}
                            </button>

                        </form>

                        <div className="my-7 flex items-center gap-4">
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

                        <p className="mt-7 text-center text-xs text-white/30">
                            Already have an account?{" "}
                            <button
                                type="button"
                                onClick={() => navigate("/login")}
                                className="cursor-pointer text-cyan-400 transition-colors duration-300 hover:text-cyan-300"
                            >
                                Log in
                            </button>
                        </p>

                    </div>

                </div>

            </div>
        </main>
    )
}   
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FaArrowRight } from "react-icons/fa6"
import { Context } from "../App"
import logo from "../images/MAPPO_logo.png"

export default function Navbar() {
    const navigate = useNavigate()
    const [isSignedin, setIsSignedin, showSidebar] = useContext(Context)
    const username = window.localStorage.getItem("username")

    useEffect(() => {
        setIsSignedin(window.localStorage.getItem("isSignedin"))
    }, [])

    return (
        <nav className="sticky top-0 z-50 h-20 w-full border-b border-white/[0.08] bg-[#07090d]/90 px-6 backdrop-blur-xl sm:px-10 lg:px-16">
            <div className="mx-auto flex h-full max-w-7xl items-center justify-between">

                <img
                    src={logo}
                    alt="MAPPO"
                    onClick={() => navigate("/")}
                    className="h-12 w-24 cursor-pointer object-contain transition-opacity duration-300 hover:opacity-80"
                />

                {!showSidebar && (
                    <div className="hidden items-center gap-10 md:flex">
                        <button
                            onClick={() => navigate("/")}
                            className="cursor-pointer text-sm text-white/60 transition-colors duration-300 hover:text-white"
                        >
                            Home
                        </button>

                        <button
                            onClick={() => navigate("/about")}
                            className="cursor-pointer text-sm text-white/60 transition-colors duration-300 hover:text-white"
                        >
                            About
                        </button>

                        <button
                            onClick={() => navigate("/help")}
                            className="cursor-pointer text-sm text-white/60 transition-colors duration-300 hover:text-white"
                        >
                            Help
                        </button>
                    </div>
                )}

                {isSignedin ? (
                    <button
                        onClick={() => navigate(`/${username}/profile`)}
                        className="cursor-pointer group flex items-center gap-3 border border-white/10 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:border-cyan-400 hover:text-cyan-400"
                    >
                        Profile
                        <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                ) : (
                    <button
                        onClick={() => navigate("/login")}
                        className="cursor-pointer group flex items-center gap-3 border border-cyan-400 bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-transparent hover:text-cyan-400"
                    >
                        Login
                        <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                )}
            </div>
        </nav>
    )
}
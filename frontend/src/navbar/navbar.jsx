import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Context } from "../App"
import logo from "../images/MAPPO_logo.png"

export default function Navbar() {

    let navigate = useNavigate()
    let [isSignedin, setIsSignedin, showSidebar] = useContext(Context)
    let username = window.localStorage.getItem("username")

    useEffect(() => {
        setIsSignedin(window.localStorage.getItem("isSignedin"))
    }, [])

    return (
        <div className="flex h-16 w-full justify-between px-20 items-center font-semibold text-lg bg-[#1db1ff] pr-40" >
            <img src={logo} onClick={() => navigate("/")} className="h-12 w-24 cursor-pointer" />
            <div className="flex gap-12" >
            {!showSidebar &&
                <div className="flex gap-12" >
                    <div onClick={() => navigate("/")} className="hover:scale-125 transition-all duration-200 cursor-pointer" >Home</div>
                    <div onClick={() => navigate("/about")} className="hover:scale-125 transition-all duration-200 cursor-pointer" >About</div>
                    <div onClick={() => navigate("/help")} className="hover:scale-125 transition-all duration-200 cursor-pointer" >Help</div>
                </div>
            }
            {isSignedin ?
                    <div onClick={() => navigate(`/${username}/profile`)} className="hover:scale-125 transition-all duration-200 cursor-pointer">Profile</div>
                    :
                    <div onClick={() => navigate("/login")} className="hover:scale-125 transition-all duration-200 cursor-pointer">Login</div>
            }
            </div>
        </div>
    )
}
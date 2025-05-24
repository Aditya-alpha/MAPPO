import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Context } from "./App"

export default function Navbar() {

    let navigate = useNavigate()
    let [isSignedin, setIsSignedin] = useContext(Context)
    let username = window.localStorage.getItem("username")

    useEffect(() => {
        setIsSignedin(window.localStorage.getItem("isSignedin"))
    }, [])

    return (
        <div className="flex w-full justify-between px-20 py-4 font-semibold text-lg bg-gradient-to-b from-blue-400 to-blue-200" >
            <div onClick={() => navigate("/")} className="cursor-pointer" >Mappo</div>
            <div className="flex w-2/5 justify-between gap-4" >
                <div onClick={() => navigate("/")} className="cursor-pointer" >Home</div>
                <div onClick={() => navigate("/about")} className="cursor-pointer" >About</div>
                <div onClick={() => navigate("/help")} className="cursor-pointer" >Help</div>
                <div onClick={() => {isSignedin ? navigate(`/${username}/tracking`) : (alert("Please Login/SignUp"), navigate("/login"))}} className="cursor-pointer" >Tracking</div>
                {isSignedin && <div onClick={() => navigate(`/${username}/tracks`)} className="cursor-pointer" >My tracks</div>}
                {isSignedin ?
                    <div onClick={() => navigate(`/${username}/profile`)} className="cursor-pointer">Profile</div>
                    :
                    <div onClick={() => navigate("/login")} className="cursor-pointer">Login</div>
                }
            </div>
        </div>
    )
}
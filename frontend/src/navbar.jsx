import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Context } from "./App"

export default function Navbar() {

    let navigate = useNavigate()
    let [isSignedin, setIsSignedin] = useContext(Context)

    useEffect(() => {
        setIsSignedin(window.localStorage.getItem("isSignedin"))
    }, [])

    return (
        <div className="flex w-full justify-between px-20 py-4 font-semibold text-lg bg-gradient-to-b from-blue-400 to-blue-200" >
            <div onClick={() => navigate("/")} className="cursor-pointer" >Mappo</div>
            <div className="flex w-2/5 justify-between pl-36" >
                <div onClick={() => navigate("/")} className="cursor-pointer" >Home</div>
                <div onClick={() => navigate("/about")} className="cursor-pointer" >About</div>
                <div onClick={() => navigate("/help")} className="cursor-pointer" >Help</div>
                {isSignedin ?
                    <div onClick={() => navigate("/profile")} className="cursor-pointer">Profile</div>
                    :
                    <div onClick={() => navigate("/signup")} className="cursor-pointer">Signup</div>
                }
            </div>
        </div>
    )
}
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
            {isSignedin ?
                    <div onClick={() => navigate(`/${username}/profile`)} className="cursor-pointer">Profile</div>
                    :
                    <div onClick={() => navigate("/login")} className="cursor-pointer">Login</div>
            }
        </div>
    )
}
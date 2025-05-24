import { useEffect, useState } from "react";
import Navbar from "../navbar";
import { useParams } from "react-router-dom";


export default function Profile() {

    let [userInfo, setUserInfo] = useState({})
    let {username} = useParams()

    async function handleFetchUserInfo() {
        try {
            let response = await fetch(`http://localhost:8000/${username}/profile`, {
                method: "GET"
            })
            if (response.ok) {
                let data = await response.json()
                setUserInfo(data)
            }
        }
        catch (error) {
            alert("An error occured, please refresh and try again")
        }
    }

    useEffect(() => {
        handleFetchUserInfo()
    }, [username])

    return (
        <div className="h-screen w-full bg-blue-200" >
            <Navbar />
            <div className="h-1/3 w-full relative">
                <div className="h-full w-full bg-blue-400" ></div>
                <img src={userInfo.profile_photo} alt="profile_photo" className="h-60 w-60 rounded-full cursor-pointer absolute top-32 left-28 p-1 bg-blue-500" /></div>
            <div className="mt-36 pl-[125px] text-xl font-medium space-y-1" >
                <p>{userInfo.username}</p>
                <p>{userInfo.email}</p>
                <p className="w-44 hover:underline hover:scale-110 transition-all duration-200 cursor-pointer" >Change password</p>
                <label htmlFor="profile" className="w-52 block hover:underline hover:scale-110 transition-all duration-200 cursor-pointer" >Change profile photo</label>
                <input id="profile" type="file" className="hidden" />
                <div className="flex gap-8" >
                    <button>Change Now</button>
                    <button>Cancel</button>
                </div>
                <p className="w-20 text-red-600 hover:underline hover:scale-125 transition-all duration-200 cursor-pointer" >Log out</p>
            </div>
        </div>
    )
}
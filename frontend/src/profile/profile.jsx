import { useNavigate } from "react-router-dom"
import Navbar from "../navbar/navbar"
import { useEffect, useState } from "react"
import default_profile_photo from "../images/default_profile.png"

export default function Profile() {

    let navigate = useNavigate()
    let username = window.localStorage.getItem("username")

    let [userData, setUserData] = useState({
        username: "",
        email: "",
        profile_photo: ""
    })

    let [newProfilePhoto, setNewProfilePhoto] = useState("")

    async function handleFetch() {
        try {
            let response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${username}/profile`, {
                method: "GET"
            })
            if (response.ok) {
                let data = await response.json()
                setUserData(data)
                window.localStorage.setItem("email", data.email)
            }
        }
        catch (error) {
            alert("An error occured, please refresh and try again")
        }
    }

    useEffect(() => {
        handleFetch()
    }, [username, newProfilePhoto])

    function selectProfilePhoto(e) {
        setNewProfilePhoto(e.target.files[0])
    }

    async function handleUpdateProfilePhoto() {
        let formData = new FormData()
        formData.append("profile_photo", newProfilePhoto)
        try {
            let response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${username}/profile`, {
                method: "POST",
                body: formData
            })
            if (response.ok) {
                let data = await response.json()
                setUserData(data)
                setNewProfilePhoto("")
                handleFetch()
                alert("Profile photo updated succesfully !")
            }
        }
        catch (error) {
            alert("An error occured, please refresh and try again")
        }
    }

    return (
        <div className="h-screen w-full bg-[#1db1ff]">
            <Navbar />
            <div className="h-1/3 w-full relative">
                <div className="h-full w-full bg-sky-600" ></div>
                <img src={userData?.profile_photo || default_profile_photo} alt="profile_photo" className="h-60 w-60 rounded-full cursor-pointer absolute top-32 left-28 p-2 bg-sky-600" />
            </div>
            <div className="mt-36 pl-[125px] text-xl font-medium space-y-2" >
                <p>Username: &nbsp;{userData.username}</p>
                <p>Email: &nbsp;{userData.email}</p>
                <p onClick={() => { navigate(`/${username}/profile/updatepassword`) }} className="w-44 hover:underline hover:scale-110 transition-all duration-200 cursor-pointer" >Change password</p>
                <label htmlFor="profile" className="w-52 block hover:underline hover:scale-110 transition-all duration-200 cursor-pointer" >Change profile photo</label>
                <input onChange={selectProfilePhoto} id="profile" type="file" className="hidden" />
                {newProfilePhoto &&
                    <div className="flex gap-8" >
                        <button onClick={handleUpdateProfilePhoto} className="cursor-pointer" >Change Now</button>
                        <button onClick={() => setNewProfilePhoto("")} >Cancel</button>
                    </div>
                }
                <p onClick={() => { localStorage.clear(); navigate("/") }} className="w-20 hover:underline hover:scale-125 transition-all duration-200 cursor-pointer" >Log out</p>
            </div>
        </div>
    )
}
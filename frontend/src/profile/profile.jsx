import { useNavigate } from "react-router-dom"
import Navbar from "../navbar/navbar"
import { useEffect, useState } from "react"
import { FaCamera, FaLock, FaArrowRight, FaRightFromBracket } from "react-icons/fa6"
import { RxCross2 } from "react-icons/rx"
import default_profile_photo from "../images/default_profile.png"

export default function Profile() {
    const navigate = useNavigate()
    const username = window.localStorage.getItem("username")

    const [userData, setUserData] = useState({
        username: "",
        email: "",
        profile_photo: ""
    })

    const [newProfilePhoto, setNewProfilePhoto] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleFetch() {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/${username}/profile`,
                {
                    method: "GET"
                }
            )

            if (response.ok) {
                const data = await response.json()
                setUserData(data)
                window.localStorage.setItem("email", data.email)
                window.localStorage.setItem("profile_photo", data.profile_photo)
            }
        } catch (error) {
            alert("An error occured, please refresh and try again")
        }
    }

    useEffect(() => {
        handleFetch()
    }, [username])

    function selectProfilePhoto(e) {
        if (e.target.files?.[0]) {
            setNewProfilePhoto(e.target.files[0])
        }
    }

    async function handleUpdateProfilePhoto() {
        if (!newProfilePhoto) return

        setLoading(true)

        const formData = new FormData()
        formData.append("profile_photo", newProfilePhoto)

        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/${username}/profile`,
                {
                    method: "POST",
                    body: formData
                }
            )

            if (response.ok) {
                const data = await response.json()

                setUserData(data)
                window.localStorage.setItem("profile_photo", data.profile_photo)
                setNewProfilePhoto("")

                alert("Profile photo updated successfully!")
            } else {
                alert("Unable to update profile photo.")
            }
        } catch (error) {
            alert("An error occured, please try again")
        } finally {
            setLoading(false)
        }
    }

    function handleLogout() {
        localStorage.clear()
        navigate("/")
    }

    return (
        <main className="min-h-screen w-full bg-[#07090d] text-white">

            <Navbar />

            <div className="relative overflow-hidden border-b border-white/[0.08]">

                <div className="absolute left-[15%] top-[-180px] h-[400px] w-[400px] rounded-full bg-cyan-500/[0.05] blur-[140px]" />

                <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16">

                    <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">

                        <div>

                            <span className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-cyan-400">
                                <span className="h-px w-8 bg-cyan-400" />
                                Account
                            </span>

                            <h1 className="mt-5 text-5xl font-bold tracking-[-0.06em] sm:text-6xl">
                                Profile
                            </h1>

                            <p className="mt-4 max-w-xl text-sm leading-7 text-white/35">
                                Manage your account information, profile photo
                                and security settings.
                            </p>

                        </div>

                        <div className="text-left sm:text-right">

                            <p className="text-[10px] uppercase tracking-[0.25em] text-white/25">
                                MAPPO member
                            </p>

                            <p className="mt-2 text-sm font-medium text-white/60">
                                @{userData.username}
                            </p>

                        </div>

                    </div>

                </div>

            </div>

            <div className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-16">

                <div className="grid gap-6 lg:grid-cols-[280px_1fr]">

                    <section className="border border-white/[0.08] bg-[#0a0d12] p-7">

                        <div className="flex flex-col items-center text-center">

                            <div className="relative">

                                <img
                                    src={userData?.profile_photo || default_profile_photo}
                                    alt="profile_photo"
                                    className="h-40 w-40 rounded-full border border-white/10 object-cover p-1"
                                />

                                <label
                                    htmlFor="profile"
                                    className="absolute bottom-1 right-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-black bg-cyan-400 text-black transition-all duration-300 hover:bg-cyan-300"
                                >
                                    <FaCamera className="text-sm" />
                                </label>

                                <input
                                    onChange={selectProfilePhoto}
                                    id="profile"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                />

                            </div>

                            <h2 className="mt-6 text-xl font-semibold">
                                {userData.username}
                            </h2>

                            <p className="mt-2 max-w-full truncate text-xs text-white/30">
                                {userData.email}
                            </p>

                            <div className="mt-6 h-px w-full bg-white/[0.08]" />

                            <p className="mt-5 text-[10px] uppercase tracking-[0.2em] text-white/20">
                                Profile picture
                            </p>

                            <p className="mt-2 text-xs leading-5 text-white/30">
                                Use a clear image to personalize your profile.
                            </p>

                        </div>

                    </section>

                    <section className="border border-white/[0.08] bg-[#0a0d12]">

                        <div className="border-b border-white/[0.08] p-7 sm:p-9">

                            <span className="text-[10px] uppercase tracking-[0.25em] text-cyan-400">
                                Personal information
                            </span>

                            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
                                Account details
                            </h2>

                        </div>

                        <div className="grid sm:grid-cols-2">

                            <div className="border-b border-white/[0.08] p-7 sm:border-r sm:p-9">
                                <p className="text-[10px] uppercase tracking-[0.2em] text-white/25">
                                    Username
                                </p>

                                <p className="mt-3 text-sm font-medium text-white/80">
                                    {userData.username || "—"}
                                </p>
                            </div>

                            <div className="border-b border-white/[0.08] p-7 sm:p-9">
                                <p className="text-[10px] uppercase tracking-[0.2em] text-white/25">
                                    Email address
                                </p>

                                <p className="mt-3 truncate text-sm font-medium text-white/80">
                                    {userData.email || "—"}
                                </p>
                            </div>

                        </div>

                        {newProfilePhoto && (

                            <div className="border-b border-white/[0.08] bg-cyan-400/[0.03] p-7 sm:p-9">

                                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                                    <div>
                                        <p className="text-sm font-medium text-white">
                                            New profile photo selected
                                        </p>

                                        <p className="mt-1 text-xs text-white/30">
                                            {newProfilePhoto.name}
                                        </p>
                                    </div>

                                    <div className="flex gap-3">

                                        <button
                                            onClick={() => setNewProfilePhoto("")}
                                            className="flex h-10 items-center gap-2 border border-white/10 px-4 text-xs font-medium text-white/50 transition-all duration-300 hover:border-white/30 hover:text-white"
                                        >
                                            <RxCross2 />
                                            Cancel
                                        </button>

                                        <button
                                            onClick={handleUpdateProfilePhoto}
                                            disabled={loading}
                                            className="flex h-10 items-center gap-2 bg-cyan-400 px-5 text-xs font-semibold text-black transition-all duration-300 hover:bg-cyan-300 disabled:opacity-50"
                                        >
                                            {loading ? "Updating..." : "Update photo"}
                                            {!loading && <FaArrowRight />}
                                        </button>

                                    </div>

                                </div>

                            </div>

                        )}

                        <div className="p-7 sm:p-9">

                            <p className="text-[10px] uppercase tracking-[0.25em] text-cyan-400">
                                Security
                            </p>

                            <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                                <div className="flex items-center gap-4">

                                    <div className="flex h-11 w-11 items-center justify-center border border-white/10 text-cyan-400">
                                        <FaLock />
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium">
                                            Password
                                        </p>

                                        <p className="mt-1 text-xs text-white/30">
                                            Keep your account credentials secure.
                                        </p>
                                    </div>

                                </div>

                                <button
                                    onClick={() =>
                                        navigate(`/${username}/profile/updatepassword`)
                                    }
                                    className="cursor-pointer group flex items-center gap-3 text-xs font-medium text-white/50 transition-colors duration-300 hover:text-cyan-400"
                                >
                                    Change password
                                    <FaArrowRight className="text-[10px] transition-transform duration-300 group-hover:translate-x-1" />
                                </button>

                            </div>

                        </div>

                    </section>

                </div>

                <div className="mt-6 flex justify-end">

                    <button
                        onClick={handleLogout}
                        className="cursor-pointer group flex items-center gap-3 border border-white/[0.08] px-5 py-3 text-xs font-medium text-white/35 transition-all duration-300 hover:border-red-400/30 hover:text-red-400"
                    >
                        <FaRightFromBracket className="text-xs" />
                        Log out
                    </button>

                </div>

            </div>

        </main>
    )
}
import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { RxCross2 } from "react-icons/rx"
import { FaArrowRight, FaLock } from "react-icons/fa6"

export default function UpdatePassword() {
    const navigate = useNavigate()
    const { username } = useParams()

    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    })

    const [loading, setLoading] = useState(false)

    function setData(event) {
        setPasswordData((currData) => ({
            ...currData,
            [event.target.name]: event.target.value
        }))
    }

    async function updatePassword(e) {
        e.preventDefault()

        if (!passwordData.oldPassword.trim()) {
            alert("Please enter your current password.")
            return
        }

        if (passwordData.newPassword.length < 8) {
            alert("Password must have atleast 8 characters.")
            return
        }

        if (passwordData.newPassword !== passwordData.confirmNewPassword) {
            alert("Make sure the new passwords match.")
            return
        }

        setLoading(true)

        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/${username}/profile/updatepassword`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(passwordData)
                }
            )

            if (response.status === 200) {
                alert("Password updated successfully!")
                navigate(`/${username}/profile`)
            } else {
                alert("Old password is incorrect.")
            }
        } catch (error) {
            alert("An error occured. Please try again later.")
        } finally {
            setLoading(false)
        }
    }

    function handleCross() {
        navigate(`/${username}/profile`)
    }

    return (
        <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#07090d] px-6 text-white">

            <div className="absolute left-[10%] top-[15%] h-[350px] w-[350px] rounded-full bg-cyan-500/[0.05] blur-[130px]" />
            <div className="absolute bottom-[5%] right-[10%] h-[300px] w-[300px] rounded-full bg-blue-500/[0.04] blur-[130px]" />

            <div className="relative grid w-full max-w-5xl overflow-hidden border border-white/[0.08] bg-[#0a0d12] lg:grid-cols-2">

                <div className="hidden flex-col justify-between border-r border-white/[0.08] p-12 lg:flex xl:p-16">

                    <div>

                        <span className="text-2xl font-bold tracking-[-0.04em]">
                            MAP<span className="text-cyan-400">PO</span>
                        </span>

                        <div className="mt-24">

                            <span className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-cyan-400">
                                <span className="h-px w-8 bg-cyan-400" />
                                Security
                            </span>

                            <h1 className="mt-8 text-6xl font-bold leading-[0.9] tracking-[-0.06em]">
                                Protect
                                <br />
                                your
                                <br />
                                <span className="text-white/25">
                                    account.
                                </span>
                            </h1>

                            <p className="mt-8 max-w-sm text-sm leading-7 text-white/40">
                                Update your password regularly to keep your
                                MAPPO account and personal information secure.
                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-white/25">
                        <span className="h-2 w-2 rounded-full bg-cyan-400" />
                        Account security
                    </div>

                </div>

                <div className="relative p-7 sm:p-10 lg:p-12 xl:p-16">

                    <button
                        onClick={handleCross}
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
                            <FaLock />
                        </div>

                        <span className="mt-8 block text-[10px] uppercase tracking-[0.3em] text-cyan-400">
                            Security settings
                        </span>

                        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">
                            Change password
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-white/40">
                            Enter your current password and choose a new one.
                        </p>

                        <form
                            onSubmit={updatePassword}
                            className="mt-10"
                        >

                            <div>
                                <label className="mb-3 block text-xs font-medium uppercase tracking-[0.15em] text-white/40">
                                    Current password
                                </label>

                                <input
                                    autoFocus
                                    type="password"
                                    name="oldPassword"
                                    placeholder="Enter current password"
                                    value={passwordData.oldPassword}
                                    onChange={setData}
                                    className="h-13 w-full border-b border-white/15 bg-transparent px-0 text-sm text-white outline-none transition-colors duration-300 placeholder:text-white/20 focus:border-cyan-400"
                                />
                            </div>

                            <div className="mt-8">
                                <label className="mb-3 block text-xs font-medium uppercase tracking-[0.15em] text-white/40">
                                    New password
                                </label>

                                <input
                                    type="password"
                                    name="newPassword"
                                    placeholder="Enter new password"
                                    value={passwordData.newPassword}
                                    onChange={setData}
                                    className="h-13 w-full border-b border-white/15 bg-transparent px-0 text-sm text-white outline-none transition-colors duration-300 placeholder:text-white/20 focus:border-cyan-400"
                                />
                            </div>

                            <div className="mt-8">
                                <label className="mb-3 block text-xs font-medium uppercase tracking-[0.15em] text-white/40">
                                    Confirm password
                                </label>

                                <input
                                    type="password"
                                    name="confirmNewPassword"
                                    placeholder="Confirm new password"
                                    value={passwordData.confirmNewPassword}
                                    onChange={setData}
                                    className="h-13 w-full border-b border-white/15 bg-transparent px-0 text-sm text-white outline-none transition-colors duration-300 placeholder:text-white/20 focus:border-cyan-400"
                                />
                            </div>

                            <div className="mt-6 border border-white/[0.08] bg-white/[0.02] p-4">
                                <p className="text-xs leading-6 text-white/30">
                                    Your new password must contain at least
                                    8 characters and should be different from
                                    your current password.
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="cursor-pointer group mt-8 flex h-13 w-full items-center justify-center gap-4 bg-cyan-400 text-sm font-semibold uppercase tracking-[0.15em] text-black transition-all duration-300 hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {loading ? "Updating..." : "Update password"}

                                {!loading && (
                                    <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                                )}
                            </button>

                        </form>

                        <button
                            onClick={() =>
                                navigate(`/${username}/profile/forgotpassword`)
                            }
                            className="cursor-pointer mt-8 w-full text-center text-xs text-white/30 transition-colors duration-300 hover:text-cyan-400"
                        >
                            Forgot your current password?
                        </button>

                    </div>

                </div>

            </div>

        </main>
    )
}
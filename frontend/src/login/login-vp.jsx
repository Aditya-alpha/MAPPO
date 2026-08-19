import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { RxCross2 } from "react-icons/rx"
import { FaArrowRight, FaEnvelope } from "react-icons/fa6"

export default function VerifyOtp() {
    const navigate = useNavigate()
    const email = window.localStorage.getItem("email")

    const [enteredotp, setEnteredotp] = useState("")

    function handleCross() {
        window.localStorage.removeItem("email")
        navigate("/login")
    }

    async function handleSubmit(e) {
        e.preventDefault()

        if (!enteredotp.trim()) {
            alert("Please enter the OTP.")
            return
        }

        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/login/forgotpassword/verify`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, enteredotp })
                }
            )

            if (response.ok) {
                alert("Otp verified.")
                navigate("/login/updatepassword")
            } else {
                alert("Incorrect OTP.")
            }
        } catch (error) {
            alert("An error occured. Please try again.")
        }
    }

    return (
        <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#07090d] px-6 text-white">

            <div className="absolute left-[15%] top-[20%] h-[300px] w-[300px] rounded-full bg-cyan-500/[0.05] blur-[130px]" />
            <div className="absolute bottom-[10%] right-[15%] h-[250px] w-[250px] rounded-full bg-blue-500/[0.04] blur-[130px]" />

            <div className="relative w-full max-w-4xl border border-white/[0.08] bg-[#0a0d12]">

                <div className="grid lg:grid-cols-2">

                    <div className="hidden border-r border-white/[0.08] p-12 lg:flex lg:flex-col lg:justify-between xl:p-16">

                        <div>
                            <span className="text-2xl font-bold tracking-[-0.04em]">
                                MAP<span className="text-cyan-400">PO</span>
                            </span>

                            <div className="mt-24">

                                <span className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-cyan-400">
                                    <span className="h-px w-8 bg-cyan-400" />
                                    Security check
                                </span>

                                <h1 className="mt-8 text-6xl font-bold leading-[0.9] tracking-[-0.06em]">
                                    Verify
                                    <br />
                                    your
                                    <br />
                                    <span className="text-white/25">
                                        identity.
                                    </span>
                                </h1>

                                <p className="mt-8 max-w-sm text-sm leading-7 text-white/40">
                                    We've sent a verification code to your
                                    email. Enter it to continue securely.
                                </p>

                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-white/25">
                            <span className="h-2 w-2 rounded-full bg-cyan-400" />
                            Secure account recovery
                        </div>

                    </div>

                    <div className="relative p-7 sm:p-10 lg:p-12 xl:p-16">

                        <button
                            onClick={handleCross}
                            className="cursor-pointer absolute right-7 top-7 text-white/30 transition-colors duration-300 hover:text-white sm:right-10 sm:top-10"
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
                                <FaEnvelope />
                            </div>

                            <span className="mt-8 block text-[10px] uppercase tracking-[0.3em] text-cyan-400">
                                Email verification
                            </span>

                            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">
                                Enter OTP
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-white/35">
                                Enter the verification code sent to
                            </p>

                            <p className="mt-1 max-w-full truncate text-sm font-medium text-white/70">
                                {email || "your email address"}
                            </p>

                            <form onSubmit={handleSubmit} className="mt-10">

                                <label className="mb-3 block text-xs font-medium uppercase tracking-[0.15em] text-white/40">
                                    Verification code
                                </label>

                                <input
                                    autoFocus
                                    type="text"
                                    inputMode="numeric"
                                    maxLength="6"
                                    value={enteredotp}
                                    onChange={(e) =>
                                        setEnteredotp(
                                            e.target.value.replace(/\D/g, "")
                                        )
                                    }
                                    placeholder="000000"
                                    className="h-16 w-full border-b border-white/15 bg-transparent text-center text-3xl font-semibold tracking-[0.5em] text-white outline-none transition-colors duration-300 placeholder:text-white/10 focus:border-cyan-400"
                                />

                                <p className="mt-4 text-xs text-white/25">
                                    Enter the 6-digit code from your email.
                                </p>

                                <button
                                    type="submit"
                                    className="cursor-pointer group mt-10 flex h-13 w-full items-center justify-center gap-4 bg-cyan-400 text-sm font-semibold uppercase tracking-[0.15em] text-black transition-all duration-300 hover:bg-cyan-300"
                                >
                                    Verify OTP
                                    <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                                </button>

                            </form>

                            <button
                                onClick={handleCross}
                                className="cursor-pointer mt-8 w-full text-center text-xs text-white/30 transition-colors duration-300 hover:text-white"
                            >
                                Cancel and return to login
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        </main>
    )
}
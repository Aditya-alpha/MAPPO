import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { RxCross2 } from "react-icons/rx"
import { FaArrowRight, FaEnvelope } from "react-icons/fa6"

export default function VerifyProfileOtp() {
    const navigate = useNavigate()

    const email = window.localStorage.getItem("email")
    const username = window.localStorage.getItem("username")

    const [enteredotp, setEnteredotp] = useState("")
    const [isResending, setIsResending] = useState(false)
    const [loading, setLoading] = useState(false)

    function handleCross() {
        navigate(`/${username}/profile/updatepassword`)
    }

    async function handleSubmit(e) {
        e.preventDefault()

        if (!enteredotp.trim()) {
            alert("Please enter the OTP.")
            return
        }

        setLoading(true)

        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/login/forgotpassword/verify`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        enteredotp
                    })
                }
            )

            if (response.ok) {
                alert("OTP verified.")
                navigate(`/${username}/profile/changepassword`)
            } else {
                alert("Incorrect OTP.")
            }
        } catch (error) {
            alert("An error occured. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    async function handleResendOtp() {
        setIsResending(true)

        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/login/forgotpassword`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email })
                }
            )

            if (response.ok) {
                alert("A new OTP has been sent to your email.")
            } else {
                alert("Unable to resend OTP. Please try again.")
            }
        } catch (error) {
            alert("An error occurred while resending OTP.")
        } finally {
            setIsResending(false)
        }
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
                                Verification
                            </span>

                            <h1 className="mt-8 text-6xl font-bold leading-[0.9] tracking-[-0.06em]">
                                Confirm
                                <br />
                                your
                                <br />
                                <span className="text-white/25">
                                    identity.
                                </span>
                            </h1>

                            <p className="mt-8 max-w-sm text-sm leading-7 text-white/40">
                                Enter the verification code sent to your email
                                to continue resetting your MAPPO password.
                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-white/25">
                        <span className="h-2 w-2 rounded-full bg-cyan-400" />
                        Secure verification
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
                            <FaEnvelope />
                        </div>

                        <span className="mt-8 block text-[10px] uppercase tracking-[0.3em] text-cyan-400">
                            OTP verification
                        </span>

                        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">
                            Enter your code
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-white/40">
                            We've sent a verification code to your registered
                            email address.
                        </p>

                        <p className="mt-2 max-w-full truncate text-sm font-medium text-white/60">
                            {email}
                        </p>

                        <form
                            onSubmit={handleSubmit}
                            className="mt-10"
                        >

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
                                Enter the 6-digit code sent to your email.
                            </p>

                            <button
                                type="submit"
                                disabled={loading}
                                className="cursor-pointer group mt-8 flex h-13 w-full items-center justify-center gap-4 bg-cyan-400 text-sm font-semibold uppercase tracking-[0.15em] text-black transition-all duration-300 hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {loading ? "Verifying..." : "Verify code"}

                                {!loading && (
                                    <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                                )}
                            </button>

                        </form>

                        <div className="mt-8 flex items-center justify-between border-t border-white/[0.08] pt-6">

                            <span className="text-xs text-white/25">
                                Didn't receive the code?
                            </span>

                            <button
                                onClick={handleResendOtp}
                                disabled={isResending}
                                className="cursor-pointer text-xs font-medium text-cyan-400 transition-colors duration-300 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                {isResending
                                    ? "Resending..."
                                    : "Resend OTP"}
                            </button>

                        </div>

                        <button
                            onClick={handleCross}
                            className="cursor-pointer mt-8 w-full text-center text-xs text-white/30 transition-colors duration-300 hover:text-white"
                        >
                            Cancel and return to security settings
                        </button>

                    </div>

                </div>

            </div>

        </main>
    )
}
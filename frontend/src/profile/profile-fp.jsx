import { useNavigate } from "react-router-dom"
import { RxCross2 } from "react-icons/rx"
import { FaArrowRight, FaEnvelope } from "react-icons/fa6"

export default function ForgotProfilePassword() {
    const navigate = useNavigate()

    const username = window.localStorage.getItem("username")
    const email = window.localStorage.getItem("email")

    function maskEmail(value) {
        if (!value) return ""

        const [name, domain] = value.split("@")

        if (!name || !domain) return value

        const visible = name.slice(0, 2)
        return `${visible}${"*".repeat(Math.max(name.length - 2, 2))}@${domain}`
    }

    function handleCross() {
        navigate(`/${username}/profile/updatepassword`)
    }

    async function handleProceed() {
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
                navigate(`/${username}/profile/forgotpassword/verify`)
            } else {
                alert("Failed to send OTP.")
                navigate(`/${username}/profile/updatepassword`)
            }
        } catch (error) {
            alert("An error occurred. Please try again.")
            navigate(`/${username}/profile/updatepassword`)
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
                                Account recovery
                            </span>

                            <h1 className="mt-8 text-6xl font-bold leading-[0.9] tracking-[-0.06em]">
                                Reset
                                <br />
                                your
                                <br />
                                <span className="text-white/25">
                                    access.
                                </span>
                            </h1>

                            <p className="mt-8 max-w-sm text-sm leading-7 text-white/40">
                                Verify your identity using the email associated
                                with your MAPPO account.
                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-white/25">
                        <span className="h-2 w-2 rounded-full bg-cyan-400" />
                        Secure recovery
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
                            Password recovery
                        </span>

                        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">
                            Verify your identity
                        </h2>

                        <p className="mt-4 max-w-md text-sm leading-7 text-white/40">
                            We'll send a one-time verification code to the
                            email address associated with your account.
                        </p>

                        <div className="mt-8 border border-white/[0.08] bg-white/[0.02] p-5">

                            <p className="text-[10px] uppercase tracking-[0.2em] text-white/25">
                                Verification email
                            </p>

                            <p className="mt-3 truncate text-sm font-medium text-white/70">
                                {maskEmail(email)}
                            </p>

                        </div>

                        <button
                            onClick={handleProceed}
                            className="cursor-pointer group mt-8 flex h-13 w-full items-center justify-center gap-4 bg-cyan-400 text-sm font-semibold uppercase tracking-[0.15em] text-black transition-all duration-300 hover:bg-cyan-300"
                        >
                            Send verification code
                            <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                        </button>

                        <button
                            onClick={handleCross}
                            className="cursor-pointer mt-8 w-full text-center text-xs text-white/30 transition-colors duration-300 hover:text-white"
                        >
                            Back to change password
                        </button>

                    </div>

                </div>

            </div>

        </main>
    )
}
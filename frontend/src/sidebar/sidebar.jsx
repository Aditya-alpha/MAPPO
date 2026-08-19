import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Context } from "../App"
import { RxCross2 } from "react-icons/rx"
import { FaHouse, FaCompass, FaRoute, FaMapLocationDot, FaCircleInfo, FaCircleQuestion, FaChevronRight } from "react-icons/fa6"

const Sidebar = ({ showSidebar, setShowSidebar, handleTouchStart, handleTouchEnd }) => {
    const navigate = useNavigate()
    const [isSignedin, setIsSignedin] = useContext(Context)
    const username = window.localStorage.getItem("username")

    useEffect(() => {
        setIsSignedin(window.localStorage.getItem("isSignedin"))
    }, [])

    const closeSidebar = () => setShowSidebar(false)

    const handleNavigation = (path) => {
        navigate(path)
        closeSidebar()
    }

    return (
        <div
            className="relative z-50"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div
                className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-all duration-300 ${showSidebar ? "visible opacity-100" : "invisible opacity-0"}`}
                onClick={closeSidebar}
            />

            <aside
                className={`fixed left-0 top-0 z-50 flex h-full w-[290px] flex-col border-r border-white/[0.08] bg-[#080b10] text-white shadow-2xl transition-transform duration-300 ease-out ${showSidebar ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-6">
                    <div>
                        <p className="text-2xl font-bold tracking-[-0.05em]">
                            MAP<span className="text-cyan-400">PO</span>
                        </p>
                        <p className="mt-1 text-[9px] uppercase tracking-[0.3em] text-white/30">
                            Explore beyond limits
                        </p>
                    </div>

                    <button
                        onClick={closeSidebar}
                        className="flex h-9 w-9 items-center justify-center border border-white/10 text-white/40 transition-all duration-300 hover:border-cyan-400/30 hover:text-cyan-400"
                    >
                        <RxCross2 className="text-xl" />
                    </button>
                </div>

                <div className="flex-1 px-4 py-8">

                    <p className="mb-4 px-4 text-[9px] font-semibold uppercase tracking-[0.3em] text-white/25">
                        Navigation
                    </p>

                    <div className="space-y-1">

                        <button
                            onClick={() => handleNavigation("/")}
                            className="cursor-pointer group flex w-full items-center gap-4 px-4 py-3.5 text-left text-sm text-white/55 transition-all duration-300 hover:bg-white/[0.04] hover:text-white"
                        >
                            <FaHouse className="text-sm text-white/30 transition-colors group-hover:text-cyan-400" />
                            <span>Home</span>
                            <FaChevronRight className="ml-auto text-[9px] text-white/10 transition-all group-hover:translate-x-1 group-hover:text-cyan-400" />
                        </button>

                        <button
                            onClick={() => handleNavigation("/about")}
                            className="cursor-pointer group flex w-full items-center gap-4 px-4 py-3.5 text-left text-sm text-white/55 transition-all duration-300 hover:bg-white/[0.04] hover:text-white"
                        >
                            <FaCircleInfo className="text-sm text-white/30 transition-colors group-hover:text-cyan-400" />
                            <span>About</span>
                            <FaChevronRight className="ml-auto text-[9px] text-white/10 transition-all group-hover:translate-x-1 group-hover:text-cyan-400" />
                        </button>

                        <button
                            onClick={() => handleNavigation("/help")}
                            className="cursor-pointer group flex w-full items-center gap-4 px-4 py-3.5 text-left text-sm text-white/55 transition-all duration-300 hover:bg-white/[0.04] hover:text-white"
                        >
                            <FaCircleQuestion className="text-sm text-white/30 transition-colors group-hover:text-cyan-400" />
                            <span>Help & Support</span>
                            <FaChevronRight className="ml-auto text-[9px] text-white/10 transition-all group-hover:translate-x-1 group-hover:text-cyan-400" />
                        </button>

                    </div>

                    <p className="mb-4 mt-10 px-4 text-[9px] font-semibold uppercase tracking-[0.3em] text-white/25">
                        Your journey
                    </p>

                    <div className="space-y-1">

                        <button
                            onClick={() => {
                                if (isSignedin) {
                                    handleNavigation(`/${username}/tracking`)
                                } else {
                                    alert("Please Login/SignUp")
                                    handleNavigation("/login")
                                }
                            }}
                            className="cursor-pointer group flex w-full items-center gap-4 px-4 py-3.5 text-left text-sm text-white/55 transition-all duration-300 hover:bg-white/[0.04] hover:text-white"
                        >
                            <FaRoute className="text-sm text-white/30 transition-colors group-hover:text-cyan-400" />
                            <span>Track Route</span>
                            <FaChevronRight className="ml-auto text-[9px] text-white/10 transition-all group-hover:translate-x-1 group-hover:text-cyan-400" />
                        </button>

                        {isSignedin && (
                            <>
                                <button
                                    onClick={() => handleNavigation(`/${username}/tracks`)}
                                    className="cursor-pointer group flex w-full items-center gap-4 px-4 py-3.5 text-left text-sm text-white/55 transition-all duration-300 hover:bg-white/[0.04] hover:text-white"
                                >
                                    <FaMapLocationDot className="text-sm text-white/30 transition-colors group-hover:text-cyan-400" />
                                    <span>My Tracks</span>
                                    <FaChevronRight className="ml-auto text-[9px] text-white/10 transition-all group-hover:translate-x-1 group-hover:text-cyan-400" />
                                </button>

                                <button
                                    onClick={() => handleNavigation(`/${username}/search-tracks`)}
                                    className="cursor-pointer group flex w-full items-center gap-4 px-4 py-3.5 text-left text-sm text-white/55 transition-all duration-300 hover:bg-white/[0.04] hover:text-white"
                                >
                                    <FaCompass className="text-sm text-white/30 transition-colors group-hover:text-cyan-400" />
                                    <span>Explore Tracks</span>
                                    <FaChevronRight className="ml-auto text-[9px] text-white/10 transition-all group-hover:translate-x-1 group-hover:text-cyan-400" />
                                </button>
                            </>
                        )}

                    </div>

                </div>

                <div className="border-t border-white/[0.08] p-5">

                    {isSignedin ? (
                        <button
                            onClick={() => handleNavigation(`/${username}/profile`)}
                            className="cursor-pointer group flex w-full items-center gap-3 border border-white/[0.06] bg-white/[0.02] p-3 text-left transition-all duration-300 hover:border-cyan-400/20 hover:bg-cyan-400/[0.03]"
                        >
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400/10 text-xs font-bold text-cyan-400">
                                {username?.charAt(0).toUpperCase()}
                            </div>

                            <div className="min-w-0">
                                <p className="truncate text-xs font-medium text-white/70">
                                    {username}
                                </p>
                                <p className="mt-1 text-[9px] uppercase tracking-wider text-white/25">
                                    View profile
                                </p>
                            </div>

                            <FaChevronRight className="ml-auto text-[9px] text-white/20 transition-transform group-hover:translate-x-1" />
                        </button>
                    ) : (
                        <button
                            onClick={() => handleNavigation("/login")}
                            className="cursor-pointer flex w-full items-center justify-center gap-3 bg-cyan-400 px-4 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-black transition-all duration-300 hover:bg-cyan-300"
                        >
                            Sign in
                            <FaChevronRight className="text-[9px]" />
                        </button>
                    )}

                </div>
            </aside>

            <button
                onClick={() => setShowSidebar(!showSidebar)}
                className={`cursor-pointer fixed left-0 top-1/2 z-50 flex h-12 w-11 -translate-y-1/2 items-center justify-center border border-white/10 bg-[#0a0d12] text-white/50 shadow-xl transition-all duration-300 hover:w-14 hover:border-cyan-400/30 hover:text-cyan-400 ${showSidebar ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"}`}
            >
                <div className="space-y-1">
                    <span className="block h-px w-4 bg-current" />
                    <span className="block h-px w-4 bg-current" />
                    <span className="block h-px w-4 bg-current" />
                </div>
            </button>
        </div>
    )
}

export default Sidebar
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import {
    FaArrowRight,
    FaLocationArrow,
    FaRoute,
    FaShareNodes,
    FaCompass,
} from "react-icons/fa6"

import img1 from "../images/1.png"
import img2 from "../images/2.png"
import img3 from "../images/3.png"
import img4 from "../images/4.png"

import { Context } from "../App"

export default function Homebody() {
    const navigate = useNavigate()
    const username = window.localStorage.getItem("username")
    const [isSignedin, , , setShowSidebar] = useContext(Context)

    const goToTracking = () => {
        if (isSignedin) {
            navigate(`/${username}/tracking`)
        } else {
            alert("Please Login/SignUp")
            navigate("/login")
        }
        setShowSidebar(false)
    }

    const goToTracks = () => {
        navigate(`/${username}/tracks`)
        setShowSidebar(false)
    }

    const features = [
        {
            icon: <FaLocationArrow />,
            title: "Real-time tracking",
            description: "Record your movement continuously and capture your route as you explore."
        },
        {
            icon: <FaRoute />,
            title: "Route management",
            description: "Keep your saved journeys organized and easily revisit routes whenever you want."
        },
        {
            icon: <FaShareNodes />,
            title: "Share your journey",
            description: "Publish your routes and let other explorers discover places through your experience."
        },
        {
            icon: <FaCompass />,
            title: "Discover routes",
            description: "Explore routes shared by the community and find new destinations to visit."
        }
    ]

    const sections = [
        {
            number: "01",
            label: "TRACK",
            title: "Know exactly",
            highlight: "where you've been.",
            description: "Start a journey and let the tracker record your route in real time. Whether you're walking through a city, cycling across town or exploring a trail, your path stays with you.",
            image: img1,
            action: goToTracking,
            button: "Start tracking"
        },
        {
            number: "02",
            label: "SHARE",
            title: "Turn your routes",
            highlight: "into experiences.",
            description: "Your journey doesn't have to end when you reach your destination. Upload your route and share it with the community so others can explore it themselves.",
            image: img2,
            action: goToTracks,
            button: "Explore community"
        },
        {
            number: "03",
            label: "MANAGE",
            title: "Everything you've",
            highlight: "explored, organized.",
            description: "Access all your uploaded routes from a single place. Revisit previous journeys, manage your routes and keep your travel history organized.",
            image: img3,
            action: goToTracks,
            button: "Manage routes"
        },
        {
            number: "04",
            label: "DISCOVER",
            title: "Find paths",
            highlight: "worth taking.",
            description: "Discover new destinations and routes shared by fellow explorers. Search for places, browse community tracks and find your next adventure.",
            image: img4,
            action: goToTracks,
            button: "Discover routes"
        }
    ]

    return (
        <main className="min-h-screen overflow-hidden bg-[#07090d] text-white">
            <section className="relative border-b border-white/[0.08]">
                <div className="absolute inset-0">
                    <div className="absolute left-[10%] top-[20%] h-[300px] w-[300px] rounded-full bg-cyan-500/[0.06] blur-[120px]" />
                    <div className="absolute bottom-0 right-[10%] h-[250px] w-[250px] rounded-full bg-blue-500/[0.05] blur-[120px]" />
                </div>

                <div className="relative mx-auto max-w-7xl px-6 pb-28 pt-20 sm:px-10 lg:px-16 lg:pb-36 lg:pt-28">
                    <div className="flex items-center gap-3">
                        <span className="h-px w-8 bg-cyan-400" />
                        <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-cyan-400">
                            Intelligent Route Tracking
                        </span>
                    </div>

                    <div className="mt-10 max-w-6xl">
                        <h1 className="text-6xl font-bold leading-[0.9] tracking-[-0.06em] sm:text-7xl lg:text-[8rem]">
                            Explore
                            <br />
                            <span className="text-white/30">without limits.</span>
                        </h1>

                        <div className="mt-12 grid gap-10 border-t border-white/[0.08] pt-8 lg:grid-cols-12">
                            <div className="lg:col-span-6">
                                <p className="max-w-xl text-lg leading-8 text-white/50">
                                    A smarter way to track, manage and share your journeys. Capture your routes in real-time and discover new paths from explorers around the world.
                                </p>
                            </div>

                            <div className="flex items-end lg:col-span-6 lg:justify-end">
                                <button
                                    onClick={goToTracking}
                                    className="group cursor-pointer flex items-center gap-5 border border-cyan-400 bg-cyan-400 px-7 py-4 text-sm font-semibold uppercase tracking-wider text-black transition-all duration-300 hover:bg-transparent hover:text-cyan-400"
                                >
                                    Start exploring
                                    <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-b border-white/[0.08]">
                <div className="mx-auto grid max-w-7xl grid-cols-2 px-6 sm:px-10 lg:grid-cols-4 lg:px-16">
                    <div className="border-r border-white/[0.08] py-12 pr-6 lg:py-16">
                        <p className="text-3xl font-semibold sm:text-4xl">Real-time</p>
                        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/30">Route tracking</p>
                    </div>

                    <div className="border-r-0 border-white/[0.08] py-12 pl-6 lg:border-r lg:px-8 lg:py-16">
                        <p className="text-3xl font-semibold sm:text-4xl">GPS</p>
                        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/30">Location based</p>
                    </div>

                    <div className="border-r border-white/[0.08] py-12 pr-6 lg:px-8 lg:py-16">
                        <p className="text-3xl font-semibold sm:text-4xl">Community</p>
                        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/30">Shared journeys</p>
                    </div>

                    <div className="py-12 pl-6 lg:py-16 lg:pl-8">
                        <p className="text-3xl font-semibold sm:text-4xl">One place</p>
                        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/30">Your routes</p>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-28 sm:px-10 lg:px-16">
                <div className="max-w-2xl">
                    <span className="text-[11px] uppercase tracking-[0.3em] text-cyan-400">
                        Everything you need
                    </span>

                    <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                        Built around
                        <br />
                        <span className="text-white/30">your journey.</span>
                    </h2>
                </div>

                <div className="mt-20 grid border-l border-t border-white/[0.08] sm:grid-cols-2">
                    {features.map((feature, index) => (
                        <div
                            key={feature.title}
                            className="group border-b border-r border-white/[0.08] p-8 transition-colors duration-300 hover:bg-white/[0.025] sm:p-10 lg:p-12"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex h-11 w-11 items-center justify-center border border-white/10 text-cyan-400">
                                    {feature.icon}
                                </div>

                                <span className="font-mono text-xs text-white/20">
                                    0{index + 1}
                                </span>
                            </div>

                            <h3 className="mt-10 text-xl font-semibold">
                                {feature.title}
                            </h3>

                            <p className="mt-4 max-w-sm text-sm leading-7 text-white/40">
                                {feature.description}
                            </p>

                            <div className="mt-8 h-px w-8 bg-cyan-400 transition-all duration-300 group-hover:w-16" />
                        </div>
                    ))}
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
                {sections.map((section, index) => (
                    <article
                        key={section.number}
                        className="grid min-h-[650px] items-center gap-12 border-t border-white/[0.08] py-24 lg:grid-cols-12 lg:gap-20"
                    >
                        <div className={`lg:col-span-5 ${index % 2 !== 0 ? "lg:order-2" : ""}`}>
                            <div className="flex items-center gap-4">
                                <span className="font-mono text-sm text-cyan-400">
                                    {section.number}
                                </span>

                                <span className="h-px w-8 bg-white/20" />

                                <span className="text-[10px] font-medium tracking-[0.3em] text-white/30">
                                    {section.label}
                                </span>
                            </div>

                            <h2 className="mt-8 text-5xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-6xl">
                                {section.title}
                                <br />
                                <span className="text-white/25">
                                    {section.highlight}
                                </span>
                            </h2>

                            <p className="mt-8 max-w-md text-base leading-8 text-white/45">
                                {section.description}
                            </p>

                            <button
                                onClick={section.action}
                                className="group cursor-pointer mt-10 flex items-center gap-4 border-b border-white/20 pb-2 text-sm font-medium transition-all duration-300 hover:border-cyan-400 hover:text-cyan-400"
                            >
                                {section.button}
                                <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-2" />
                            </button>
                        </div>

                        <div className={`lg:col-span-7 ${index % 2 !== 0 ? "lg:order-1" : ""}`}>
                            <div className="relative overflow-hidden">
                                <div className="absolute left-5 top-5 z-10 font-mono text-xs text-white/40">
                                    / {section.number}
                                </div>

                                <img
                                    src={section.image}
                                    alt={section.title}
                                    className="h-[380px] w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 sm:h-[480px] lg:h-[560px]"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
                            </div>
                        </div>
                    </article>
                ))}
            </section>

            <section className="border-y border-white/[0.08] bg-[#0a0d12]">
                <div className="mx-auto max-w-7xl px-6 py-28 sm:px-10 lg:px-16">
                    <div className="grid gap-16 lg:grid-cols-12">
                        <div className="lg:col-span-4">
                            <span className="text-[11px] uppercase tracking-[0.3em] text-cyan-400">
                                Simple by design
                            </span>

                            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
                                From starting point
                                <br />
                                to destination.
                            </h2>
                        </div>

                        <div className="lg:col-span-8">
                            <div className="divide-y divide-white/[0.08]">
                                {[
                                    ["01", "Start a journey", "Begin tracking and let the system capture your route as you move."],
                                    ["02", "Build your route", "Your GPS coordinates are recorded to create an accurate representation of your journey."],
                                    ["03", "Save & share", "Keep your route private or share it with the community."],
                                    ["04", "Discover", "Explore routes from other users and find inspiration for your next journey."]
                                ].map(([number, title, description]) => (
                                    <div
                                        key={number}
                                        className="grid gap-4 py-8 sm:grid-cols-[60px_200px_1fr] sm:items-start"
                                    >
                                        <span className="font-mono text-xs text-cyan-400">
                                            {number}
                                        </span>

                                        <h3 className="font-medium">
                                            {title}
                                        </h3>

                                        <p className="text-sm leading-7 text-white/40">
                                            {description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden px-6 py-32 text-center sm:px-10 lg:py-44">
                <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.06] blur-[130px]" />

                <div className="relative">
                    <span className="text-[11px] uppercase tracking-[0.4em] text-cyan-400">
                        Your next journey starts here
                    </span>

                    <h2 className="mx-auto mt-7 max-w-5xl text-5xl font-bold leading-[0.9] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
                        WHERE WILL
                        <br />
                        YOU GO NEXT?
                    </h2>

                    <p className="mx-auto mt-8 max-w-lg text-base leading-7 text-white/40">
                        Track the journey. Keep the memories. Share the route.
                    </p>

                    <button
                        onClick={goToTracking}
                        className="cursor-pointer mt-10 inline-flex items-center gap-4 border border-white/20 px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-400 hover:text-black"
                    >
                        Start your journey
                        <FaArrowRight />
                    </button>
                </div>
            </section>
        </main>
    )
}
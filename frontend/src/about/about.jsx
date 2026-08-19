import Navbar from "../navbar/navbar"
import { FaLocationArrow, FaRoute, FaShareNodes, FaShieldHalved } from "react-icons/fa6"

export default function About() {
    const features = [
        {
            icon: <FaLocationArrow />,
            number: "01",
            title: "Real-time tracking",
            description: "Track your movement using GPS and record your journey as you explore new places."
        },
        {
            icon: <FaRoute />,
            number: "02",
            title: "Route management",
            description: "Store, organize and revisit your journeys from a single, simple interface."
        },
        {
            icon: <FaShareNodes />,
            number: "03",
            title: "Share your routes",
            description: "Publish your tracks and give other explorers the opportunity to experience your journey."
        },
        {
            icon: <FaShieldHalved />,
            number: "04",
            title: "Privacy first",
            description: "You remain in control of your routes and decide what you want to share with the community."
        }
    ]

    return (
        <div className="min-h-screen overflow-hidden bg-[#07090d] text-white">
            <Navbar />

            <main>

                <section className="relative border-b border-white/[0.08]">
                    <div className="absolute left-[15%] top-[20%] h-[300px] w-[300px] rounded-full bg-cyan-500/[0.05] blur-[130px]" />

                    <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
                        <div className="max-w-5xl">
                            <div className="flex items-center gap-3">
                                <span className="h-px w-8 bg-cyan-400" />
                                <span className="text-[11px] uppercase tracking-[0.3em] text-cyan-400">
                                    About MAPPO
                                </span>
                            </div>

                            <h1 className="mt-10 text-6xl font-bold leading-[0.9] tracking-[-0.06em] sm:text-7xl lg:text-[8rem]">
                                Explore.
                                <br />
                                <span className="text-white/25">Remember.</span>
                                <br />
                                Share.
                            </h1>

                            <p className="mt-12 max-w-2xl text-lg leading-8 text-white/45">
                                MAPPO is a route tracking and exploration platform
                                designed to help you record your journeys, manage
                                your routes and discover paths shared by a growing
                                community of explorers.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
                    <div className="grid gap-16 lg:grid-cols-12">

                        <div className="lg:col-span-4">
                            <span className="text-[11px] uppercase tracking-[0.3em] text-cyan-400">
                                The idea
                            </span>

                            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
                                More than
                                <br />
                                <span className="text-white/25">
                                    just a tracker.
                                </span>
                            </h2>
                        </div>

                        <div className="space-y-8 lg:col-span-7 lg:col-start-6">
                            <p className="text-xl leading-9 text-white/65">
                                Every journey tells a story. MAPPO was created
                                to make those stories easier to capture,
                                organize and share.
                            </p>

                            <p className="text-base leading-8 text-white/40">
                                Whether you're hiking through the mountains,
                                cycling through a city or simply exploring a
                                new neighborhood, MAPPO lets you turn your
                                movement into a route that you can revisit
                                whenever you want.
                            </p>

                            <p className="text-base leading-8 text-white/40">
                                At the same time, MAPPO connects individual
                                journeys into a community where explorers can
                                discover new routes and experiences from
                                people around the world.
                            </p>
                        </div>

                    </div>
                </section>

                <section className="border-y border-white/[0.08] bg-[#0a0d12]">
                    <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-16 lg:py-32">

                        <div className="max-w-2xl">
                            <span className="text-[11px] uppercase tracking-[0.3em] text-cyan-400">
                                What MAPPO offers
                            </span>

                            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                                Everything you need
                                <br />
                                <span className="text-white/25">
                                    for the journey.
                                </span>
                            </h2>
                        </div>

                        <div className="mt-20 grid border-l border-t border-white/[0.08] sm:grid-cols-2">
                            {features.map((feature) => (
                                <div
                                    key={feature.number}
                                    className="group border-b border-r border-white/[0.08] p-8 transition-colors duration-300 hover:bg-white/[0.02] sm:p-10 lg:p-12"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex h-11 w-11 items-center justify-center border border-white/10 text-cyan-400">
                                            {feature.icon}
                                        </div>

                                        <span className="font-mono text-xs text-white/20">
                                            {feature.number}
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

                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-16 lg:py-32">

                    <div className="grid gap-16 lg:grid-cols-12">

                        <div className="lg:col-span-5">
                            <span className="text-[11px] uppercase tracking-[0.3em] text-cyan-400">
                                Why MAPPO
                            </span>

                            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
                                Built for people
                                <br />
                                who love to
                                <br />
                                <span className="text-white/25">
                                    explore.
                                </span>
                            </h2>
                        </div>

                        <div className="lg:col-span-6 lg:col-start-7">
                            <div className="border-l border-cyan-400 pl-8">
                                <p className="text-xl leading-9 text-white/65">
                                    MAPPO brings tracking, route management
                                    and community discovery together in one
                                    platform.
                                </p>

                                <p className="mt-8 text-base leading-8 text-white/40">
                                    Instead of simply recording where you go,
                                    MAPPO focuses on what you can do with
                                    those journeys afterwards — revisit them,
                                    organize them, share them and use them to
                                    discover somewhere new.
                                </p>
                            </div>
                        </div>

                    </div>

                </section>

                <section className="border-y border-white/[0.08] bg-[#0a0d12]">
                    <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-16 lg:py-32">

                        <div className="grid gap-16 lg:grid-cols-12">

                            <div className="lg:col-span-4">
                                <span className="text-[11px] uppercase tracking-[0.3em] text-cyan-400">
                                    Privacy
                                </span>

                                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                                    Your journey.
                                    <br />
                                    <span className="text-white/25">
                                        Your control.
                                    </span>
                                </h2>
                            </div>

                            <div className="lg:col-span-7 lg:col-start-6">
                                <p className="text-lg leading-8 text-white/55">
                                    Your location and routes are personal.
                                    MAPPO is designed around giving you
                                    control over the information you choose
                                    to share.
                                </p>

                                <div className="mt-10 grid gap-8 sm:grid-cols-2">
                                    <div className="border-t border-white/[0.08] pt-5">
                                        <p className="text-sm font-medium">
                                            Controlled sharing
                                        </p>
                                        <p className="mt-2 text-sm leading-6 text-white/35">
                                            Decide which journeys you want to
                                            make available to the community.
                                        </p>
                                    </div>

                                    <div className="border-t border-white/[0.08] pt-5">
                                        <p className="text-sm font-medium">
                                            Secure storage
                                        </p>
                                        <p className="mt-2 text-sm leading-6 text-white/35">
                                            Your route data is stored securely
                                            and associated with your account.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </section>

                <section className="relative overflow-hidden px-6 py-32 text-center sm:px-10 lg:py-40">

                    <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.05] blur-[130px]" />

                    <div className="relative">
                        <span className="text-[11px] uppercase tracking-[0.4em] text-cyan-400">
                            MAPPO
                        </span>

                        <h2 className="mx-auto mt-7 max-w-4xl text-5xl font-bold leading-[0.9] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
                            EVERY PATH
                            <br />
                            HAS A STORY.
                        </h2>

                        <p className="mx-auto mt-8 max-w-lg text-base leading-7 text-white/40">
                            Start recording yours.
                        </p>
                    </div>

                </section>

                <footer className="border-t border-white/[0.08] px-6 py-8 sm:px-10 lg:px-16">
                    <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-xs text-white/25 sm:flex-row">
                        <p>© 2026 MAPPO</p>
                        <p>Built for explorers everywhere.</p>
                    </div>
                </footer>

            </main>
        </div>
    )
}
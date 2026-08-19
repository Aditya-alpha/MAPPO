import Navbar from "../navbar/navbar"
import {
    FaCircleQuestion,
    FaLocationArrow,
    FaRoute,
    FaTrashCan,
    FaLock,
    FaEnvelope
} from "react-icons/fa6"

export default function Help() {
    const faqs = [
        {
            icon: <FaLocationArrow />,
            question: "Do I need an account to use MAPPO?",
            answer: "Yes. You need to be logged in to start tracking journeys, save routes and manage your uploaded tracks."
        },
        {
            icon: <FaRoute />,
            question: "How do I start tracking a route?",
            answer: "Log in to your MAPPO account and open the Tracking page from your profile. Start tracking to begin recording your journey."
        },
        {
            icon: <FaTrashCan />,
            question: "Can I delete my uploaded tracks?",
            answer: "Yes. Open My Tracks from your profile, select the route you want to manage and delete it from your collection."
        },
        {
            icon: <FaLock />,
            question: "Are my routes publicly visible?",
            answer: "Routes are shared with the community only when you choose to make them available. You remain in control of your shared journeys."
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
                                    Support Center
                                </span>
                            </div>

                            <h1 className="mt-10 text-6xl font-bold leading-[0.9] tracking-[-0.06em] sm:text-7xl lg:text-[8rem]">
                                Need
                                <br />
                                <span className="text-white/25">
                                    some help?
                                </span>
                            </h1>

                            <p className="mt-12 max-w-2xl text-lg leading-8 text-white/45">
                                Find answers to common questions, learn how
                                MAPPO works and get help with tracking,
                                managing and sharing your routes.
                            </p>

                        </div>
                    </div>
                </section>


                <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-16 lg:py-32">

                    <div className="grid gap-16 lg:grid-cols-12">

                        <div className="lg:col-span-4">

                            <span className="text-[11px] uppercase tracking-[0.3em] text-cyan-400">
                                Getting started
                            </span>

                            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
                                Start your
                                <br />
                                journey in
                                <br />
                                <span className="text-white/25">
                                    four steps.
                                </span>
                            </h2>

                        </div>


                        <div className="lg:col-span-7 lg:col-start-6">

                            <div className="divide-y divide-white/[0.08]">

                                <div className="grid gap-4 py-8 sm:grid-cols-[60px_1fr]">

                                    <span className="font-mono text-xs text-cyan-400">
                                        01
                                    </span>

                                    <div>
                                        <h3 className="text-lg font-medium">
                                            Create an account
                                        </h3>

                                        <p className="mt-3 text-sm leading-7 text-white/40">
                                            Sign up for MAPPO or log in to your
                                            existing account to access your
                                            tracking and route management
                                            features.
                                        </p>
                                    </div>

                                </div>


                                <div className="grid gap-4 py-8 sm:grid-cols-[60px_1fr]">

                                    <span className="font-mono text-xs text-cyan-400">
                                        02
                                    </span>

                                    <div>
                                        <h3 className="text-lg font-medium">
                                            Start tracking
                                        </h3>

                                        <p className="mt-3 text-sm leading-7 text-white/40">
                                            Open the Tracking page and start
                                            recording your journey using
                                            location-based tracking.
                                        </p>
                                    </div>

                                </div>


                                <div className="grid gap-4 py-8 sm:grid-cols-[60px_1fr]">

                                    <span className="font-mono text-xs text-cyan-400">
                                        03
                                    </span>

                                    <div>
                                        <h3 className="text-lg font-medium">
                                            Save your route
                                        </h3>

                                        <p className="mt-3 text-sm leading-7 text-white/40">
                                            Once your journey is complete,
                                            save your route so you can revisit
                                            and manage it later.
                                        </p>
                                    </div>

                                </div>


                                <div className="grid gap-4 py-8 sm:grid-cols-[60px_1fr]">

                                    <span className="font-mono text-xs text-cyan-400">
                                        04
                                    </span>

                                    <div>
                                        <h3 className="text-lg font-medium">
                                            Share and discover
                                        </h3>

                                        <p className="mt-3 text-sm leading-7 text-white/40">
                                            Share your routes with the
                                            community or discover journeys
                                            created by other explorers.
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>


                <section className="border-y border-white/[0.08] bg-[#0a0d12]">

                    <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-16 lg:py-32">

                        <div className="max-w-2xl">

                            <span className="text-[11px] uppercase tracking-[0.3em] text-cyan-400">
                                Frequently asked
                            </span>

                            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                                Common questions.
                            </h2>

                            <p className="mt-5 text-base leading-7 text-white/40">
                                Everything you need to know about using MAPPO
                                and managing your journeys.
                            </p>

                        </div>


                        <div className="mt-20 grid border-l border-t border-white/[0.08] sm:grid-cols-2">

                            {faqs.map((faq, index) => (

                                <div
                                    key={faq.question}
                                    className="group border-b border-r border-white/[0.08] p-8 transition-colors duration-300 hover:bg-white/[0.02] sm:p-10 lg:p-12"
                                >

                                    <div className="flex items-start justify-between">

                                        <div className="flex h-11 w-11 items-center justify-center border border-white/10 text-cyan-400">
                                            {faq.icon}
                                        </div>

                                        <span className="font-mono text-xs text-white/20">
                                            0{index + 1}
                                        </span>

                                    </div>

                                    <h3 className="mt-10 text-lg font-semibold">
                                        {faq.question}
                                    </h3>

                                    <p className="mt-4 text-sm leading-7 text-white/40">
                                        {faq.answer}
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
                                Still need help?
                            </span>

                            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
                                We're here to
                                <br />
                                <span className="text-white/25">
                                    help you move.
                                </span>
                            </h2>

                        </div>


                        <div className="lg:col-span-6 lg:col-start-7">

                            <div className="border-l border-cyan-400 pl-8">

                                <div className="flex h-12 w-12 items-center justify-center border border-white/10 text-cyan-400">
                                    <FaEnvelope />
                                </div>

                                <h3 className="mt-8 text-xl font-semibold">
                                    Contact support
                                </h3>

                                <p className="mt-4 max-w-md text-sm leading-7 text-white/40">
                                    If you are experiencing an issue that isn't
                                    covered here, reach out to our support team
                                    and we'll help you get back on track.
                                </p>

                                <a
                                    href="mailto:support@mappo.com"
                                    className="mt-8 inline-flex items-center border-b border-white/20 pb-2 text-sm font-medium transition-colors duration-300 hover:border-cyan-400 hover:text-cyan-400"
                                >
                                    support@mappo.com
                                </a>

                            </div>

                        </div>

                    </div>

                </section>


                <section className="relative overflow-hidden border-t border-white/[0.08] px-6 py-32 text-center sm:px-10 lg:py-40">

                    <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.05] blur-[130px]" />

                    <div className="relative">

                        <span className="text-[11px] uppercase tracking-[0.4em] text-cyan-400">
                            MAPPO SUPPORT
                        </span>

                        <h2 className="mx-auto mt-7 max-w-4xl text-5xl font-bold leading-[0.9] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
                            KEEP
                            <br />
                            EXPLORING.
                        </h2>

                        <p className="mx-auto mt-8 max-w-lg text-base leading-7 text-white/40">
                            Your next route is waiting.
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
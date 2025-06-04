import Navbar from "../navbar/navbar"

export default function Help() {
    return (
        <div className="min-h-screen bg-[#1db1ff] text-black">
            <Navbar />
            <div className="px-10 py-12 max-w-5xl mx-auto space-y-10">
                <h1 className="text-4xl font-bold text-center underline decoration-sky-700">Help & Support</h1>

                <section>
                    <h2 className="text-2xl font-bold text-sky-900 mb-4">💡 Getting Started</h2>
                    <ul className="list-disc list-inside space-y-2 text-lg font-medium">
                        <li>To begin tracking, create an account or log in to MAPPO.</li>
                        <li>Go to your profile and start recording your travel route from the <span className="font-bold">Tracking</span> page.</li>
                        <li>After tracking, you can save and upload your route to share it with others.</li>
                        <li>Visit <span className="font-bold">My Tracks</span> to view or manage your saved paths.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-sky-900 mb-4">❓ Frequently Asked Questions</h2>
                    <div className="space-y-4 text-lg font-medium">
                        <div>
                            <p className="font-semibold">Q: Do I need to be logged in to use MAPPO?</p>
                            <p>A: Yes, login is required to track and save routes.</p>
                        </div>
                        <div>
                            <p className="font-semibold">Q: Can I delete my uploaded tracks?</p>
                            <p>A: Absolutely! Go to <span className="font-semibold">My Tracks</span> and select the route you want to manage.</p>
                        </div>
                        <div>
                            <p className="font-semibold">Q: Will others see my tracks?</p>
                            <p>A: Tracks are publicly viewable only if you choose to share them.</p>
                        </div>
                        <div>
                            <p className="font-semibold">Q: What if I forget my password?</p>
                            <p>A: Go to the login page and use the <span className="font-semibold">Forgot Password</span> option (if available), or contact support.</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-sky-900 mb-4">📞 Contact Support</h2>
                    <p className="text-lg font-medium">
                        If you’re facing issues or need help that isn't covered above, feel free to reach out to us at:
                    </p>
                    <p className="text-lg font-bold mt-2">✉️ support@mappo.com</p>
                </section>

                <div className="text-center pt-10 text-lg font-medium">
                    <p>We're here to help you navigate better 🚀</p>
                </div>
            </div>
        </div>
    )
}

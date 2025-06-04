import Navbar from "../navbar/navbar"

export default function About() {
    return (
        <div className="min-h-screen bg-[#1db1ff] text-black">
            <Navbar />
            <div className="px-10 py-12 space-y-10 max-w-5xl mx-auto">
                <h1 className="text-4xl font-bold text-center underline decoration-sky-700">About MAPPO</h1>
                <p className="text-lg font-medium leading-relaxed">
                    <span className="font-bold">MAPPO</span> is your personal route tracker, explorer, and community companion — built to enhance your adventures and make your journeys memorable. Whether you're hiking in the hills, cycling through the city, or exploring a hidden trail, MAPPO helps you capture, share, and relive your paths.
                </p>
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-sky-900">🌍 What You Can Do</h2>
                    <ul className="list-disc list-inside space-y-2 text-lg font-medium">
                        <li><span className="font-bold">Track your routes</span> in real-time using GPS and interactive maps.</li>
                        <li><span className="font-bold">Upload and share</span> your paths with others to inspire their adventures.</li>
                        <li><span className="font-bold">View and manage</span> your uploaded tracks in one place — delete or revisit them anytime.</li>
                        <li><span className="font-bold">Explore community tracks</span> from people all over the world.</li>
                    </ul>
                </div>
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-sky-900">🚀 Why MAPPO?</h2>
                    <p className="text-lg font-medium">
                        We believe in making travel more meaningful and connected. MAPPO isn’t just a tool — it’s a platform for explorers, creators, and everyday wanderers to map their memories and share their world.
                    </p>
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-sky-900">🔒 Privacy & Security</h2>
                    <p className="text-lg font-medium">
                        Your data is important. MAPPO stores your tracks securely and gives you full control over what you share.
                    </p>
                </div>
                <div className="text-center pt-8">
                    <p className="text-lg font-medium">Made with ❤️ for explorers everywhere.</p>
                    <p className="text-sm text-gray-700">© 2025 MAPPO. All rights reserved.</p>
                </div>
            </div>
        </div>
    )
}

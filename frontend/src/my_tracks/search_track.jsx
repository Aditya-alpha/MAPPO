import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Navbar from "../navbar/navbar"
import { MapContainer, TileLayer, Polyline } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { FiSearch, FiMap, FiCalendar } from "react-icons/fi"

export default function SearchTracks() {
    let navigate = useNavigate()
    let { username } = useParams()
    let [targetSearch, setTargetSearch] = useState("")
    let [tracks, setTracks] = useState([])

    async function handleFetchTracks() {
        try {
            let response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${username}/search-tracks`, {
                method: "GET"
            })

            if (response.ok) {
                let data = await response.json()
                setTracks(data)
            }
        }
        catch (error) {
            alert("An error occured, please refresh and try again")
        }
    }

    useEffect(() => {
        handleFetchTracks()
    }, [username])

    async function handleSearch(e) {
        let value = e.target.value
        setTargetSearch(value)

        try {
            let response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${username}/search-tracks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    targetSearch: value.trim()
                })
            })

            if (response.ok) {
                let data = await response.json()
                setTracks(data)
            }
        }
        catch (error) {
            alert("An error occured, please refresh and try again")
        }
    }

    return (
        <div className="min-h-screen bg-[#070b14] text-white">
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-10">

                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center">
                            <FiSearch className="text-blue-400 text-xl" />
                        </div>

                        <span className="text-blue-400 font-medium tracking-wide">
                            EXPLORE
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                        Discover Tracks
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Explore routes shared by the MAPPO community.
                    </p>
                </div>

                <div className="relative max-w-3xl mb-10">
                    <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 text-xl" />

                    <input
                        type="text"
                        value={targetSearch}
                        autoFocus
                        onChange={handleSearch}
                        placeholder="Search tracks by name..."
                        className="w-full h-14 rounded-2xl bg-white/[0.04] border border-white/10 pl-14 pr-5 text-white placeholder:text-slate-500 outline-none focus:border-blue-400/50 focus:bg-white/[0.06] transition"
                    />
                </div>

                {tracks.length === 0 && (
                    <div className="min-h-[350px] rounded-3xl border border-white/10 bg-white/[0.02] flex flex-col items-center justify-center text-center">
                        <div className="h-16 w-16 rounded-2xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center mb-5">
                            <FiMap className="text-blue-400 text-2xl" />
                        </div>

                        <h2 className="text-xl font-semibold">
                            No tracks found
                        </h2>

                        <p className="text-slate-500 mt-2">
                            Try searching with a different track name.
                        </p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {tracks.map(track => {
                        let polylinePositions = track.track_details.map(point => [
                            point.latitude,
                            point.longitude
                        ])

                        let n = polylinePositions[Math.floor(polylinePositions.length / 2)]

                        return (
                            <div
                                key={track._id}
                                onClick={() => navigate(`/${username}/tracks/${track._id}`)}
                                className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0d1422] hover:border-blue-400/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                            >
                                <div className="h-52 overflow-hidden bg-slate-900">
                                    <MapContainer
                                        className="z-10"
                                        zoom={11}
                                        center={n}
                                        style={{ height: "100%", width: "100%" }}
                                        scrollWheelZoom={false}
                                        dragging={false}
                                        zoomControl={false}
                                    >
                                        <TileLayer
                                            attribution="&copy; OpenStreetMap contributors"
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />

                                        <Polyline
                                            positions={polylinePositions}
                                            color="#38bdf8"
                                            weight={5}
                                        />
                                    </MapContainer>
                                </div>

                                <div className="p-5">
                                    <h2 className="text-lg font-semibold truncate group-hover:text-blue-400 transition">
                                        {track.track_name}
                                    </h2>

                                    <div className="flex items-center gap-2 text-sm text-slate-500 mt-3">
                                        <FiCalendar />
                                        {new Date(track.createdAt).toLocaleDateString()}
                                    </div>

                                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/10">
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <FiMap />
                                            Community route
                                        </div>

                                        <span className="text-blue-400 text-sm font-medium group-hover:translate-x-1 transition">
                                            View →
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}
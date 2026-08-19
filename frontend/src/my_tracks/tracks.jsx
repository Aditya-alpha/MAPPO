import { useNavigate, useParams } from "react-router-dom"
import Navbar from "../navbar/navbar"
import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Polyline } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { BsToggle2Off, BsToggle2On } from "react-icons/bs"
import { RiDeleteBin5Fill } from "react-icons/ri"
import { FaRoute, FaArrowRight, FaGlobe, FaLock } from "react-icons/fa6"

export default function Tracks() {
    const navigate = useNavigate()
    const { username } = useParams()
    const [tracks, setTracks] = useState([])
    const [loading, setLoading] = useState(true)

    async function handleFetchTracks() {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${username}/tracks`, {
                method: "GET"
            })

            if (response.ok) {
                const data = await response.json()
                setTracks(data)
            }
        } catch (error) {
            alert("An error occured, please refresh and try again")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        handleFetchTracks()
    }, [username])

    async function handleUpdateTrack(trackId, currentValue, e) {
        e.stopPropagation()

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${username}/tracks`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    track_id: trackId,
                    public: !currentValue
                })
            })

            if (response.ok) {
                const data = await response.json()

                setTracks(prevTracks =>
                    prevTracks.map(track =>
                        track._id === trackId
                            ? { ...track, public: data.public }
                            : track
                    )
                )
            }
        } catch (error) {
            alert("An error occured, please refresh and try again")
        }
    }

    async function handleDeleteTrack(trackId, e) {
        e.stopPropagation()

        const confirmed = window.confirm("Are you sure you want to delete this track?")

        if (!confirmed) return

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${username}/tracks`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    track_id: trackId
                })
            })

            if (response.ok) {
                setTracks(prevTracks =>
                    prevTracks.filter(track => track._id !== trackId)
                )
                alert("Track deleted successfully!")
            } else {
                alert("Failed to delete the track. Try again.")
            }
        } catch (error) {
            alert("An error occured, please refresh and try again")
        }
    }

    return (
        <div className="min-h-screen w-full bg-[#07090d] text-white">

            <Navbar />

            <main className="mx-auto max-w-[1500px] px-6 py-12 sm:px-10 lg:px-16">

                <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">

                    <div>
                        <div className="mb-5 flex items-center gap-3">
                            <span className="h-px w-8 bg-cyan-400" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-400">
                                Route library
                            </span>
                        </div>

                        <h1 className="text-4xl font-bold tracking-[-0.05em] sm:text-5xl">
                            My Tracks
                        </h1>

                        <p className="mt-4 max-w-xl text-sm leading-7 text-white/35">
                            Manage, explore and share the routes you've recorded
                            with MAPPO.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 border border-white/[0.08] bg-white/[0.02] px-5 py-3">
                        <FaRoute className="text-cyan-400" />
                        <div>
                            <p className="text-lg font-semibold">
                                {tracks.length}
                            </p>
                            <p className="text-[9px] uppercase tracking-[0.2em] text-white/30">
                                Saved routes
                            </p>
                        </div>
                    </div>

                </div>

                {loading ? (

                    <div className="flex min-h-[400px] items-center justify-center">
                        <div className="text-center">
                            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-cyan-400" />
                            <p className="mt-5 text-xs uppercase tracking-[0.2em] text-white/30">
                                Loading routes
                            </p>
                        </div>
                    </div>

                ) : tracks.length === 0 ? (

                    <div className="flex min-h-[500px] flex-col items-center justify-center border border-dashed border-white/[0.1] bg-white/[0.015] text-center">

                        <div className="flex h-16 w-16 items-center justify-center border border-cyan-400/20 bg-cyan-400/[0.04] text-cyan-400">
                            <FaRoute className="text-xl" />
                        </div>

                        <h2 className="mt-7 text-2xl font-semibold tracking-[-0.03em]">
                            No tracks yet
                        </h2>

                        <p className="mt-3 max-w-md text-sm leading-6 text-white/30">
                            Start recording your first journey and it will
                            appear here for you to manage and revisit.
                        </p>

                        <button
                            onClick={() => navigate(`/${username}/tracking`)}
                            className="mt-8 flex items-center gap-3 bg-cyan-400 px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-black transition-all duration-300 hover:bg-cyan-300"
                        >
                            Start tracking
                            <FaArrowRight className="text-[10px]" />
                        </button>

                    </div>

                ) : (

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

                        {tracks.map(track => {

                            const polylinePositions = track.track_details.map(
                                point => [point.latitude, point.longitude]
                            )

                            const middlePoint =
                                polylinePositions[
                                    Math.floor(polylinePositions.length / 2)
                                ]

                            return (

                                <article
                                    key={track._id}
                                    onClick={() =>
                                        navigate(`/${username}/tracks/${track._id}`)
                                    }
                                    className="group cursor-pointer overflow-hidden border border-white/[0.08] bg-[#0a0d12] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
                                >

                                    <div className="relative h-56 overflow-hidden bg-[#11151b]">

                                        <MapContainer
                                            className="z-10 h-full w-full"
                                            zoom={11}
                                            center={middlePoint}
                                            style={{
                                                height: "100%",
                                                width: "100%"
                                            }}
                                            zoomControl={false}
                                            dragging={false}
                                            scrollWheelZoom={false}
                                            doubleClickZoom={false}
                                            touchZoom={false}
                                        >
                                            <TileLayer
                                                attribution="&copy; OpenStreetMap contributors"
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            />

                                            <Polyline
                                                positions={polylinePositions}
                                                color="#06b6d4"
                                                weight={4}
                                            />
                                        </MapContainer>

                                        <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                                        <div className="absolute left-4 top-4 z-30 flex items-center gap-2 border border-black/10 bg-black/70 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-md">
                                            <FaRoute className="text-cyan-400" />
                                            Route
                                        </div>

                                    </div>

                                    <div className="p-5">

                                        <div className="flex items-start justify-between gap-4">

                                            <div className="min-w-0">
                                                <h2 className="truncate text-lg font-semibold tracking-[-0.02em] text-white">
                                                    {track.track_name}
                                                </h2>

                                                <p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-white/25">
                                                    Created{" "}
                                                    {new Date(
                                                        track.createdAt
                                                    ).toLocaleDateString()}
                                                </p>
                                            </div>

                                            <div
                                                onClick={e =>
                                                    handleUpdateTrack(
                                                        track._id,
                                                        track.public,
                                                        e
                                                    )
                                                }
                                                className="flex shrink-0 items-center gap-2"
                                            >
                                                <span className="text-[9px] uppercase tracking-[0.15em] text-white/25">
                                                    {track.public
                                                        ? "Public"
                                                        : "Private"}
                                                </span>

                                                {track.public ? (
                                                    <BsToggle2On className="text-2xl text-cyan-400 transition-transform duration-200 hover:scale-110" />
                                                ) : (
                                                    <BsToggle2Off className="text-2xl text-white/25 transition-transform duration-200 hover:scale-110" />
                                                )}
                                            </div>

                                        </div>

                                        <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">

                                            <div className="flex items-center gap-2 text-white/25">
                                                {track.public ? (
                                                    <FaGlobe className="text-[10px]" />
                                                ) : (
                                                    <FaLock className="text-[10px]" />
                                                )}

                                                <span className="text-[10px] uppercase tracking-[0.12em]">
                                                    {track.public
                                                        ? "Visible to community"
                                                        : "Only you can see this"}
                                                </span>
                                            </div>

                                            <button
                                                onClick={e =>
                                                    handleDeleteTrack(
                                                        track._id,
                                                        e
                                                    )
                                                }
                                                className="flex h-8 w-8 items-center justify-center text-white/20 transition-all duration-300 hover:bg-red-500/10 hover:text-red-400"
                                            >
                                                <RiDeleteBin5Fill className="text-sm" />
                                            </button>

                                        </div>

                                        <div className="mt-4 flex items-center justify-end gap-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-cyan-400 opacity-0 transition-all duration-300 group-hover:opacity-100">
                                            View route
                                            <FaArrowRight className="text-[8px] transition-transform group-hover:translate-x-1" />
                                        </div>

                                    </div>

                                </article>

                            )
                        })}

                    </div>

                )}

            </main>

        </div>
    )
}
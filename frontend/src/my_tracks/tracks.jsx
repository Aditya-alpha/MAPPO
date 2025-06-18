import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../navbar/navbar";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { BsToggle2Off, BsToggle2On } from "react-icons/bs";
import { RiDeleteBin5Fill } from "react-icons/ri";


export default function Tracks() {
    let navigate = useNavigate()
    let { username } = useParams()
    let [tracks, setTracks] = useState([])

    async function handleFetchTracks() {
        try {
            let response = await fetch(`${process.env.VITE_BACKEND_URL}/${username}/tracks`, {
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

    async function handleUpdateTrack(trackId, currentValue, e) {
        e.stopPropagation()
        try {
            let response = await fetch(`${process.env.VITE_BACKEND_URL}/${username}/tracks`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ track_id: trackId, public: !currentValue })
            })
            if (response.ok) {
                let data = await response.json()
                setTracks(prevTracks => prevTracks.map(track => track._id === trackId ? { ...track, public: data.public } : track))
            }
        }
        catch (error) {
            alert("An error occured, please refresh and try again")
        }
    }

    async function handleDeleteTrack(trackId, e) {
        e.stopPropagation()
        try {
            let response = await fetch(`${process.env.VITE_BACKEND_URL}/${username}/tracks`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ track_id: trackId })
            })
            if (response.ok) {
                handleFetchTracks()
                alert("Track deleted successfully !")
            }
            else {
                alert("Failed to delete the track. Try again.")
            }
        }
        catch (error) {
            alert("An error occured, please refresh and try again")
        }
    }

    return (
        <div className="h-full w-full min-h-screen bg-[#1db1ff]" >
            <Navbar />
            <div className="px-20 flex flex-wrap gap-x-2 gap-y-12 mt-12 pb-28" >
                {tracks.map(track => {
                    let polylinePositions = track.track_details.map(point => [point.latitude, point.longitude])
                    let n = polylinePositions[polylinePositions.length / 2]
                    return (
                        <div onClick={() => navigate(`/${username}/tracks/${track._id}`)} key={track._id} className="bg-sky-600 h-64 w-80 p-3 rounded-lg cursor-pointer" >
                            <div className="bg-white h-40 w-full m-auto mb-2" >
                                <MapContainer className="z-10" zoom={11} center={n} style={{ height: "100%", width: "100%" }}>
                                    <TileLayer
                                        attribution="&copy; OpenStreetMap contributors"
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

                                    />
                                    <Polyline positions={polylinePositions} color="blue" />
                                </MapContainer>
                            </div>
                            <div className="font-semibold" >
                                <div className="flex justify-between" >
                                    <p>Track name: {track.track_name}</p>
                                    <div onClick={(e) => handleUpdateTrack(track._id, track.public, e)} className="relative group" >
                                        <p className="absolute -bottom-6 -right-28 bg-black text-white rounded text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap" >You can make this map public or private</p>
                                        <p className="absolute -bottom-11 -right-16 bg-black text-white rounded-b text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap" >Current status: {track.public ? "Public" : "Private"}</p>
                                        {track.public ? <BsToggle2On className="text-3xl" /> : <BsToggle2Off className="text-3xl" />}
                                    </div>
                                </div>
                                <div className="flex justify-between mt-2" >
                                    <p>Created on: {new Date(track.createdAt).toLocaleString()}</p>
                                    <RiDeleteBin5Fill onClick={(e) => handleDeleteTrack(track._id, e)} className="text-2xl" />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
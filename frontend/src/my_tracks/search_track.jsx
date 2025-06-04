import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../navbar/navbar";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";


export default function SearchTracks() {

    let navigate = useNavigate()
    let { username } = useParams()
    let [targetSearch, setTargetSearch] = useState("")
    let [tracks, setTracks] = useState([])

    async function handleFetchTracks() {
        try {
            let response = await fetch(`http://localhost:8000/${username}/search-tracks`, {
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
        setTargetSearch(e.target.value)
        try {
            let response = await fetch(`http://localhost:8000/${username}/search-tracks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ targetSearch: e.target.value.trim() })
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
        <div className="h-full w-full min-h-screen bg-[#1db1ff]" >
            <Navbar />
            <div className="w-full px-20 flex flex-wrap gap-7 gap-y-12 mt-12 pb-28" >
                <div className="w-full flex px-40 font-medium items-center" >
                    <p className="w-1/5 text-2xl" >Search Tracks</p>
                    <input type="text" value={targetSearch} autoFocus onChange={(e) => handleSearch(e)} className="w-4/5 bg-sky-600 px-8 py-2 text-lg rounded-lg outline-none shadow-xl" />
                </div>
                <div className="px-12 flex flex-wrap gap-7 gap-y-12 mt-12 pb-28" >
                    {tracks.length !== 0 && tracks.map(track => {
                        let polylinePositions = track.track_details.map(point => [point.latitude, point.longitude])
                        let n = polylinePositions[polylinePositions.length / 2]
                        return (
                            <div onClick={() => navigate(`/${username}/tracks/${track._id}`)} key={track._id} className="bg-sky-600 h-60 w-72 p-3 rounded-lg cursor-pointer" >
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
                                    <p>Track name: {track.track_name}</p>
                                    <p>Created on: {new Date(track.createdAt).toLocaleString()}</p>
                                </div>
                            </div>
                        )
                    })}
                    {tracks.length === 0 && 
                        <div className="text-white text-xl w-full text-center mt-10">
                            No tracks found
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
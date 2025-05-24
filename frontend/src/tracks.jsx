import { useParams } from "react-router-dom";
import Navbar from "./navbar";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";


export default function Tracks() {

    let { username } = useParams()
    let [tracks, setTracks] = useState([])

    async function handleFetchTracks() {
        try {
            let response = await fetch(`http://localhost:8000/${username}/tracks`, {
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

    return (
        <div className="h-screen w-full bg-blue-200" >
            <Navbar />
            <div className="px-20 flex flex-wrap gap-[72px] mt-12" >
                {tracks.map(track => {
                    let polylinePositions = track.track_details.map(point => [point.latitude, point.longitude])
                    return (
                    <div key={track._id} className="bg-blue-300 h-60 w-72 p-3 rounded-lg" >
                        <div className="bg-white h-40 w-60 m-auto mb-2" >
                            <MapContainer zoom={10} style={{ height: "100%", width: "100%" }} >
                                <TileLayer
                                    attribution="&copy; OpenStreetMap contributors"
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Polyline positions={polylinePositions} color="blue" />
                            </MapContainer>
                        </div>
                        <div className="w-64 m-auto" >
                            <p>Track name: {track.track_name}</p>
                            <p>Created on: {new Date(track.createdAt).toLocaleString()}</p>
                        </div>
                    </div>
                )})}
            </div>
        </div>
    )
}
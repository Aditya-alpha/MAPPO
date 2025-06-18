import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Polyline, useMap, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

function RecenterMap({ lat, lng, autoCenter }) {
    const map = useMap();
    const [lastCenter, setLastCenter] = useState([null, null]);

    useEffect(() => {
        if (
            autoCenter &&
            (lastCenter[0] !== lat || lastCenter[1] !== lng)
        ) {
            map.setView([lat, lng]);
            setLastCenter([lat, lng]);
        }
    }, [lat, lng, autoCenter, lastCenter, map]);

    return null;
}

export default function ShowTrack() {

    const navigate = useNavigate()
    const { username } = useParams()
    const { track_id } = useParams()
    const [track, setTrack] = useState({})
    const [autoCenter, setAutoCenter] = useState(true);
    const [rotateWithOrientation, setRotateWithOrientation] = useState(false);
    const [compassHeading, setCompassHeading] = useState(0);
    const [polylinePositions, setPolylinePositions] = useState([])

    useEffect(() => {
        const handleOrientation = (event) => {
            const heading = event.alpha; // 0–360 degrees
            if (heading !== null) {
                setCompassHeading(heading);
            }

            // Optional: rotate map view if orientation mode is on
            if (rotateWithOrientation) {
                const mapPane = document.querySelector('.leaflet-map-pane');
                if (mapPane) {
                    mapPane.style.transform = `rotate(${-heading}deg)`;
                }
            }
        };

        window.addEventListener("deviceorientationabsolute", handleOrientation, true);
        window.addEventListener("deviceorientation", handleOrientation, true);

        return () => {
            window.removeEventListener("deviceorientationabsolute", handleOrientation);
            window.removeEventListener("deviceorientation", handleOrientation);
            const mapPane = document.querySelector('.leaflet-map-pane');
            if (mapPane) mapPane.style.transform = "rotate(0deg)";
        };
    }, [rotateWithOrientation]);

    async function handleFetch() {
        try {
            let response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${username}/tracks/${track_id}`, {
                method: "GET"
            })
            if (response.ok) {
                let data = await response.json()
                setTrack(data)
                setPolylinePositions(data.track_details.map(pos => [pos.latitude, pos.longitude]))
            }
        }
        catch (error) {
            alert("An error occured, please refresh and try again")
        }
    }

    useEffect(() => {
        handleFetch()
    }, [username])

    return (
        <div className="h-screen flex flex-col relative" >
            <div className="absolute bg-gray-500/20 text-black/100 bottom-4 left-4 p-3 rounded text-sm font-semibold z-50">
                <div className="mt-2 flex items-center space-x-2">
                    <div className="w-6 h-6 relative">
                        <div
                            className="w-full h-full transform origin-center"
                            style={{ transform: `rotate(${compassHeading}deg)` }}
                        >
                            <svg viewBox="0 0 100 100" className="w-full h-full">
                                <polygon points="50,0 40,100 50,80 60,100" fill="red" />
                            </svg>
                        </div>
                    </div>
                    <p className="text-xs text-gray-600">Heading: {Math.round(compassHeading)}°</p>
                </div>
                <p>Track name: {track.track_name}</p>
                <p>Created at: {new Date (track.createdAt).toLocaleString()}</p>
                <p>Status: {track.public ? "Public" : "Private"}</p>
            </div>
            <div className="absolute top-4 right-4 space-y-2 z-50 flex flex-col items-end font-medium">
                <button
                    onClick={() => setAutoCenter((prev) => !prev)}
                    className="bg-yellow-500 hover:bg-yellow-600 px-6 py-2 rounded-md text-white"
                >
                    Auto-Center: {autoCenter ? "On" : "Off"}
                </button>
                <button
                    onClick={() => setRotateWithOrientation((prev) => !prev)}
                    className="bg-purple-500 hover:bg-purple-600 px-6 py-2 rounded-md text-white"
                >
                    Orientation: {rotateWithOrientation ? "Device" : "North-Up"}
                </button>
            </div>
            {polylinePositions.length > 0 &&
                <div className="flex-1 z-40">
                    <MapContainer
                        center={polylinePositions[polylinePositions.length / 2]}
                        zoom={13}
                        style={{ height: "100%", width: "100%" }}
                    >
                        <TileLayer
                            attribution="&copy; OpenStreetMap contributors"
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {autoCenter && (
                            <RecenterMap
                                lat={polylinePositions[polylinePositions.length / 2][0]}
                                lng={polylinePositions[polylinePositions.length / 2][1]}
                                autoCenter={autoCenter}
                            />
                        )}
                        {polylinePositions.length > 1 && (
                            <>
                                <Marker position={polylinePositions[0]}>
                                    <Popup>Start</Popup>
                                </Marker>

                                <Marker position={polylinePositions[polylinePositions.length - 1]}>
                                    <Popup>End</Popup>
                                </Marker>

                                <Polyline positions={polylinePositions} color="blue" />
                            </>
                        )}
                    </MapContainer>
                </div>
            }
            <button onClick={() => navigate(-1)} className="absolute bottom-4 right-4 z-50 bg-teal-800 hover:bg-teal-900 px-6 py-2 rounded-md text-white font-medium" >Go Back</button>
        </div>
    )
}
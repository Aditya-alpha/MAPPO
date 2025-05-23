import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:"https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
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

function TrackerPage() {
    const [tracking, setTracking] = useState(false);
    const [position, setPosition] = useState({
        latitude: 23.0707,
        longitude: 80.0982,
        timestamp: "Unknown",
    });
    const [positions, setPositions] = useState([]);
    const [autoCenter, setAutoCenter] = useState(true);
    const [rotateWithOrientation, setRotateWithOrientation] = useState(false);
    const [compassHeading, setCompassHeading] = useState(0);

    useEffect(() => {
        navigator.permissions?.query({ name: "geolocation" }).then((result) => {
            if (result.state === "denied") {
                alert("Location permission is denied. Please enable it in settings.");
            }
        });
    }, []);

    useEffect(() => {
        let intervalId;

        if (tracking) {
            intervalId = setInterval(() => {
                navigator.geolocation.getCurrentPosition(
                    (pos) => {
                        const newPos = {
                            latitude: pos.coords.latitude,
                            longitude: pos.coords.longitude,
                            timestamp: new Date(pos.timestamp).toLocaleString(),
                        };
                        console.log("New position detected:", newPos);
                        setPosition((prev) => {
                            if (
                                prev.latitude !== newPos.latitude ||
                                prev.longitude !== newPos.longitude
                            ) {
                                setPositions((prevPositions) => [...prevPositions, newPos]);
                                return newPos;
                            }
                            return prev;
                        });
                    },
                    (error) => console.error("Geolocation error:", error),
                    { enableHighAccuracy: true }
                );
            }, 5000);
        }
        if (!tracking && positions.length > 0) {
            console.log("Final positions array after tracking stopped:", positions);
        }
        return () => clearInterval(intervalId);
    }, [tracking]);

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


    const polylinePositions = positions.map((pos) => [pos.latitude, pos.longitude]);

    return (
        <div className="h-screen flex flex-col relative">
            <div className="absolute bg-gray-500/20 text-black/100 bottom-4 left-4 p-3 rounded text-sm z-50">
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
                <p>Tracking: <strong>{tracking ? "Active" : "Stopped"}</strong></p>
                <p>Current Location: {position.latitude !== 23.0707 && position.longitude !== 80.0982 ? `${position.latitude}, ${position.longitude}` : `Unknown`}</p>
                <p>Last Updated: {position.timestamp}</p>
            </div>
           <div className="absolute top-4 right-4 space-y-2 z-50 flex flex-col items-end">
                <button
                    onClick={() => setTracking(true)}
                    className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-md text-white"
                >
                    Start
                </button>
                <button
                    onClick={() => setTracking(false)}
                    className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-md text-white"
                >
                    Stop
                </button>
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
            <div className="flex-1 z-40">
                <MapContainer
                    center={[23.0707, 80.0982]}
                    zoom={5}
                    style={{ height: "100%", width: "100%" }}
                >
                    <TileLayer
                        attribution="&copy; OpenStreetMap contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {autoCenter && (
                        <RecenterMap
                            lat={position.latitude}
                            lng={position.longitude}
                            autoCenter={autoCenter}
                        />
                    )}
                    {positions.length > 1 && (
                        <>
                            {positions.slice(0, -1).map((pos, index) => (
                                <Marker
                                    key={index}
                                    position={[pos.latitude, pos.longitude]}
                                />
                            ))}
                            <Polyline positions={polylinePositions} color="blue" />
                        </>
                    )}
                </MapContainer>
            </div>
        </div>
    );
}

export default TrackerPage;
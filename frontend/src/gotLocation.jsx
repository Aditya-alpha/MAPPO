import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet"
import "leaflet/dist/leaflet.css"


export default function GotLocation() {

  let [position, setPosition] = useState({
    latitude: 23.0707,
    longitude: 80.0982,
    timestamp: "00/00/00"
  })

  let [rec, setRec] = useState(false)
  let [posArr, setPosArr] = useState([])
  let [coordinates, setCoordinates] = useState([])

  useEffect(() => {
    if (rec) {
      setTimeout(handlePosition, 3000)
    }
    else {
      posArr = posArr.slice(1)
      console.log(posArr)
      console.log(coordinates)
    }
  })

  function gotLocation(pos) {
    let newPosition = {
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
      timestamp: new Date(pos.timestamp).toLocaleString()
    }
    setPosition(newPosition)
    setPosArr(prev => [...prev, newPosition])
    setCoordinates(posArr.map(coordinate => [coordinate.latitude, coordinate.longitude]))
  }

  function errorLocation(error) {
    console.log(error)
  }

  function handlePosition() {
    navigator.geolocation.getCurrentPosition(gotLocation, errorLocation)
  }

  return (
    <div className="h-screen w-full">
      <div className="h-full w-full bg-blue-200 px-20 text-lg font-medium flex justify-center items-center" >
        <div className="h-2/3 w-1/3 flex flex-col justify-between bg-blue-300 rounded-lg px-12 pt-12 pb-40 shadow-xl" >
          <button onClick={() => setRec(true)} className="bg-blue-400 p-2 rounded-md mx-28" >Start</button>
          <button onClick={() => setRec(false)} className="bg-blue-400 p-2 rounded-md mx-28" >Stop</button>
        </div>
      </div>
      <div className="h-full px-20 bg-blue-200" >
        <MapContainer center={[parseFloat(position.latitude), parseFloat(position.longitude)]} zoom={5} className="h-full" >
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
          {/* <TileLayer attribution='&copy; <a href="https://carto.com/attributions">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" /> */}
          {position.latitude !== 23.0707 && position.longitude !== 80.0982 && <Marker position={[parseFloat(position.latitude), parseFloat(position.longitude)]} />}
          <Polyline positions={coordinates} pathOptions={{ color: "blue", weight: 4 }} />
        </MapContainer>
      </div>
    </div>
  );
}
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import img1 from "../images/1.png"
import img2 from "../images/2.png"
import img3 from "../images/3.png"
import img4 from "../images/4.png"
import { Context } from "../App"

export default function Homebody() {

    let navigate = useNavigate()
    let username = window.localStorage.getItem("username")
    let [isSignedin, setIsSignedin, showSidebar, setShowSidebar] = useContext(Context)
    
    return (
        <div className="bg-[#1db1ff] flex flex-col px-20 py-10 space-y-20 text-xl font-semibold text-black scroll-smooth" >
            <div className="flex gap-36 text-justify items-center bg-sky-400 hover:bg-sky-500 transition-all duration-300 p-8 rounded-xl shadow-xl" >
                <div className="flex flex-col gap-6 items-start" >
                    <p>Plan and record your travel route effortlessly. Whether it’s a city stroll or a mountain hike, our smart tracker logs your path in real-time.</p>
                    <button onClick={() => { isSignedin ? navigate(`/${username}/tracking`) : (alert("Please Login/SignUp"), navigate("/login")), setShowSidebar(false) }} className="bg-sky-600 px-3 py-1 rounded-lg border-2 border-black hover:bg-sky-700 transition-all cursor-pointer" >Click here</button>
                </div>
                <img src={img1} alt="image1" className="h-72 w-2/5 border-2 border-gray-500 self-end rounded-lg shadow-xl hover:scale-105 transition duration-300" />
            </div>
            <div className="flex gap-36 text-justify items-center bg-sky-400 hover:bg-sky-500 transition-all duration-300 p-8 rounded-xl shadow-xl" >
                <img src={img2} alt="image2" className="h-72 w-2/5 border-2 border-gray-500 rounded-lg shadow-xl hover:scale-105 transition duration-300" />
                <div className="flex flex-col gap-6 items-start" >
                    <p>Turn your paths into shared adventures. Upload your routes for the community so others can explore the world the way you did.</p>
                    <button onClick={() => { navigate(`/${username}/tracks`), setShowSidebar(false) }} className="bg-sky-600 px-3 py-1 rounded-lg border-2 border-black hover:bg-sky-700 transition-all cursor-pointer" >Click here</button>
                </div>
            </div>
            <div className="flex gap-36 text-justify items-center bg-sky-400 hover:bg-sky-500 transition-all duration-300 p-8 rounded-xl shadow-xl" >
                <div className="flex flex-col gap-6 items-start" >
                    <p>Keep all your tracks organized and accessible. View every route you’ve uploaded in one place – edit, delete, or revisit anytime.</p>
                    <button onClick={() => { navigate(`/${username}/tracks`), setShowSidebar(false) }} className="bg-sky-600 px-3 py-1 rounded-lg border-2 border-black hover:bg-sky-700 transition-all cursor-pointer" >Click here</button>
                </div>
                <img src={img3} alt="image3" className="h-72 w-2/5 border-2 border-gray-500 self-end rounded-lg shadow-xl hover:scale-105 transition duration-300" />
            </div>
            <div className="flex gap-36 text-justify items-center bg-sky-400 hover:bg-sky-500 transition-all duration-300 p-8 rounded-xl shadow-xl" >
                <img src={img4} alt="image4" className="h-72 w-2/5 border-2 border-gray-500 rounded-lg shadow-xl hover:scale-105 transition duration-300" />
                <div className="flex flex-col gap-6 items-start" >
                    <p>Discover new destinations and paths. Search for locations or browse tracks shared by fellow explorers from around the world.</p>
                    <button className="bg-sky-600 px-3 py-1 rounded-lg border-2 border-black hover:bg-sky-700 transition-all cursor-pointer" >Click here</button>
                </div>
            </div>
        </div>
    )
}
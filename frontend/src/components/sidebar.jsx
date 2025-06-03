import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../App";
const Sidebar = ({ showSidebar, setShowSidebar, handleTouchStart, handleTouchEnd }) => {
  const navigate = useNavigate();
  let [isSignedin, setIsSignedin] = useContext(Context)
  let username = window.localStorage.getItem("username")

  useEffect(() => {
    setIsSignedin(window.localStorage.getItem("isSignedin"))
  }, [])

  return (
    <div
      className="relative z-50"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >2
      <div
        className={`fixed left-0 top-0 h-full bg-gray-800 text-white transition-transform duration-300 ease-in-out transform w-64 z-50 ${showSidebar ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-4 pt-20">
          <div className="space-y-4">
            <button onClick={() => { navigate("/"), setShowSidebar(false) }} className="px-4 py-2 bg-transparent text-white rounded-lg w-full cursor-pointer"> Home </button>
            <button onClick={() => { navigate("/about"), setShowSidebar(false) }} className="px-4 py-2 bg-transparent text-white rounded-lg w-full cursor-pointer"> About </button>
            <button onClick={() => { navigate("/help"), setShowSidebar(false) }} className="px-4 py-2 bg-transparent text-white rounded-lg w-full cursor-pointer"> Help </button>
            <button onClick={() => { isSignedin ? navigate(`/${username}/tracking`) : (alert("Please Login/SignUp"), navigate("/login")), setShowSidebar(false) }} className="px-4 py-2 bg-transparent text-white rounded-lg w-full cursor-pointer"> Tracking </button>
            {isSignedin && <button onClick={() => { navigate(`/${username}/tracks`), setShowSidebar(false) }} className="px-4 py-2 bg-transparent text-white rounded-lg w-full cursor-pointer"> My Tracks </button>}
          </div>
        </div>
      </div>
      <button onClick={() => setShowSidebar(!showSidebar)} className="fixed left-0 top-4 bg-blue-500 text-white p-4 rounded-r-full z-50 cursor-pointer">
        {showSidebar ? "Close Sidebar" : "Open Sidebar"}
      </button>
    </div>
  );
}

export default Sidebar;

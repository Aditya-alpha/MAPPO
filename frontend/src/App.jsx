import React, { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TrackerPage from './components/tracker';
import Home from './homepage';
import Login from './login/login';
import Signup from './signup/signup';
import SignupOTP from './signup/signup-otp';
import Profile from './profile/profile';
import Tracks from './my_tracks/tracks';
import ShowTrack from './my_tracks/show_track';
import Sidebar from "./components/sidebar";
import useSwipe from "./components/swipe";

export const Context = React.createContext()

function App() {
    let [isSignedin, setIsSignedin] = useState(false)
    const [showSidebar, setShowSidebar] = useState(false);
    const openSidebar = () => setShowSidebar(true);
    const closeSidebar = () => setShowSidebar(false);
    const { handleTouchStart, handleTouchEnd } = useSwipe(openSidebar, closeSidebar);

    return (
        <Context.Provider value={[isSignedin, setIsSignedin]} >
            <Router>
                <div className="relative">
                    <Sidebar 
                    showSidebar={showSidebar}
                    setShowSidebar={setShowSidebar}
                    handleTouchStart={handleTouchStart}
                    handleTouchEnd={handleTouchEnd}
                    />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/signup/otp" element={<SignupOTP />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/:username/tracking" element={<TrackerPage />} />
                        <Route path="/:username/profile" element={<Profile />} />
                        <Route path="/:username/tracks" element={<Tracks />} />
                        <Route path="/:username/tracks/:track_id" element={<ShowTrack />} />
                    </Routes>
                </div>
            </Router>
        </Context.Provider>
    )
}

export default App;

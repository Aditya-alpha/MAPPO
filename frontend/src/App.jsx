import React, { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TrackerPage from './tracking/tracker';
import Home from './home/homepage';
import Login from './login/login';
import Signup from './signup/signup';
import SignupOTP from './signup/signup-otp';
import Profile from './profile/profile';
import Tracks from './my_tracks/tracks';
import ShowTrack from './my_tracks/show_track';
import Sidebar from "./sidebar/sidebar";
import useSwipe from "./sidebar/swipe";
import ForgotPassword from './login/login-fp';
import VerifyOtp from './login/login-vp';
import ChangePassword from './login/login-up';
import UpdatePassword from './profile/profile-up';
import ForgotProfilePassword from './profile/profile-fp';
import VerifyProfileOtp from './profile/profile-vp';
import ChangeProfilePassword from './profile/profile-cp';
import About from './about/about'
import Help from './help/help';
import SearchTracks from './my_tracks/search_track';

export const Context = React.createContext()

function App() {
    let [isSignedin, setIsSignedin] = useState(false)
    const [showSidebar, setShowSidebar] = useState(false);
    const openSidebar = () => setShowSidebar(true);
    const closeSidebar = () => setShowSidebar(false);
    const { handleTouchStart, handleTouchEnd } = useSwipe(openSidebar, closeSidebar);

    return (
        <Context.Provider value={[isSignedin, setIsSignedin, showSidebar, setShowSidebar]} >
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
                        <Route path="/login/forgotpassword" element={<ForgotPassword />} />
                        <Route path="/login/forgotpassword/verify" element={<VerifyOtp />} />
                        <Route path="/login/updatepassword" element={<ChangePassword />} />
                        <Route path="/:username/tracking" element={<TrackerPage />} />
                        <Route path="/:username/search-tracks" element={<SearchTracks />} />
                        <Route path="/:username/profile" element={<Profile />} />
                        <Route path="/:username/profile/updatepassword" element={<UpdatePassword />} />
                        <Route path="/:username/profile/forgotpassword" element={<ForgotProfilePassword />} />
                        <Route path="/:username/profile/forgotpassword/verify" element={<VerifyProfileOtp />} />
                        <Route path="/:username/profile/changepassword" element={<ChangeProfilePassword />} />
                        <Route path="/:username/tracks" element={<Tracks />} />
                        <Route path="/:username/tracks/:track_id" element={<ShowTrack />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/help" element={<Help />} />
                    </Routes>
                </div>
            </Router>
        </Context.Provider>
    )
}

export default App;

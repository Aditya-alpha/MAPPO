import React, { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TrackerPage from './components/tracker';
import Home from './homepage';
import Login from './login/login';
import Signup from './signup/signup';
import SignupOTP from './signup/signup-otp';
import Profile from './profile/profile';
import Tracks from './tracks';

export const Context = React.createContext()

function App() {
    let [isSignedin, setIsSignedin] = useState(false)
    return (
        <Context.Provider value={[isSignedin, setIsSignedin]} >
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signup/otp" element={<SignupOTP />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/:username/tracking" element={<TrackerPage />} />
                    <Route path="/:username/profile" element={<Profile />} />
                    <Route path="/:username/tracks" element={<Tracks />} />
                </Routes>
            </Router>
        </Context.Provider>
    )
}

export default App;

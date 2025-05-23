import React, { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TrackerPage from './components/tracker';
import Home from './homepage';
import Login from './login/login';
import Signup from './signup/signup';
import SignupOTP from './signup/signup-otp';

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
                    <Route path="/tracking" element={<TrackerPage />} />
                </Routes>
            </Router>
        </Context.Provider>
    )
}

export default App;

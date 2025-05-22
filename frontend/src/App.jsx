import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GotLocation from './gotLocation';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<GotLocation/>} />
            </Routes>
        </Router>
    )
}

export default App;

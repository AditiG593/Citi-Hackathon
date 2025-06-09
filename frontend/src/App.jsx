import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import TrackerPage from "./pages/TrackerPage";
// import TrackerPage from "./pages/TrackerPage"; // Uncomment if exists
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        { <Route path="/tracker" element={<TrackerPage />} /> }
      </Routes>
    </Router>
  );
}

export default App;

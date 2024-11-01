import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./components/auth";
import FlightList from "./components/listaVuelos";
import Reservation from "./components/reservacion";

function App() {
    const [authenticated, setAuthenticated] = useState(!!localStorage.getItem("token"));
    const userId = localStorage.getItem("userId");
    return (
        <Router>
            <Routes>
                <Route path="/" element={!authenticated ? <Auth setAuthenticated={setAuthenticated} /> : <FlightList userId={userId} />} />
                <Route path="/reservas" element={<Reservation userId={userId} />} />
            </Routes>
        </Router>
    );
}

export default App;

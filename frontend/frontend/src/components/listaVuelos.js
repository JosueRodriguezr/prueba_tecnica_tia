import React, { useState } from "react";
import { buscarVuelos } from "../services/vueloService";
import { logout } from "../services/authService";
import { createReservation } from "../services/reservaService";
import { useNavigate  } from "react-router-dom"; 

const FlightList = ({ userId, userName }) => {
    const [origen, setOrigen] = useState("");
    const [destino, setDestino] = useState("");
    const [fecha, setFecha] = useState("");
    const [flights, setFlights] = useState([]);
    const navigate  = useNavigate ();

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const result = await buscarVuelos(origen, destino, fecha);
            
            if (result.data.length === 0) {
                alert("No se encontraron vuelos con los parametros ingresados");
                return;
            }
            setFlights(result.data);
        } catch (error) {
            console.error("Error al buscar vuelos:", error);
            alert("Hubo un problema al buscar vuelos");
        }
    };

    const handleReserve = async (vueloId) => {
        try {
            await createReservation(vueloId, userId);
            alert("Reserva realizada con éxito");
            setFlights(prevFlights =>
                prevFlights.map(flight =>
                    flight._id === vueloId ? { ...flight, disponibilidad: false } : flight
                )
            );
        } catch (error) {
            console.error("Error al reservar:", error);
            alert("Hubo un problema al realizar la reserva");
        }
    };
    const handleGoToReservations = () => {
        navigate("/reservas");
    };

    const handleGoToHome = () => {
        logout();
        navigate("/");
        window.location.reload();
    };
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px", backgroundColor: "#f1f1f1" }}>
                <div>
                    <span>Usuario: {userName} (ID: {userId})</span>
                </div>
                <div>
                    <button onClick={handleGoToReservations}>Mis Reservas</button>
                    <button onClick={handleGoToHome}>Cerrar Sesión</button>
                </div>
            </div>
            <form onSubmit={handleSearch}>
                <input placeholder="Origen" value={origen} onChange={(e) => setOrigen(e.target.value)} />
                <input placeholder="Destino" value={destino} onChange={(e) => setDestino(e.target.value)} />
                <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
                <button type="submit">Buscar Vuelos</button>
            </form>
            <ul>
            {flights.map((vuelo) => (
                <li key={vuelo._id}>
                    {vuelo.origen} a {vuelo.destino} el {vuelo.fecha} a las {vuelo.horario}
                    <button 
                        onClick={() => handleReserve(vuelo._id)} 
                        disabled={!vuelo.disponibilidad}
                    >
                        Reservar
                    </button>
                </li>
            ))}
            </ul>
        </div>
    );
};

export default FlightList;

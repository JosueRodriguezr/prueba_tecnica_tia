import React, { useState, useEffect } from "react";
import { cancelReservation, getUserReservations } from "../services/reservaService";
import { useNavigate  } from "react-router-dom"; 
import { buscarVueloById } from "../services/vueloService";

const Reservation = ({ userId }) => {
    const [reservasConDetalles, setReservations] = useState([]);
    const navigate  = useNavigate ();

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const result = await getUserReservations(userId);
                if (Array.isArray(result.data.reservas)) {
                    const detailsPromises = result.data.reservas.map(async (reserva) => {
                        const vuelo = await buscarVueloById(reserva.vueloId);
                        const vueloArray = vuelo.data ? [vuelo.data] : [];
                        return { ...reserva, vuelo: vueloArray };
                    });

                    const reservasConDetalles = await Promise.all(detailsPromises);
                    setReservations(reservasConDetalles);
                } else {
                    console.error("El resultado no es un array:", result.data.reservas);
                    setReservations([]); 
                } 
            }  catch (error) {
                console.error("Error al obtener reservas:", error);
                setReservations([]);
            }
                
        };
        fetchReservations();
    }, [userId]);

    const handleCancel = async (id) => {
        try {
            await cancelReservation(id);
            setReservations(prevReservations =>
                prevReservations.map(reserva =>
                    reserva._id === id ? { ...reserva, estado: 'cancelado' } : reserva
                )
            );
            alert("Reserva cancelada con éxito.");
        } catch (error) {
            console.error("Error al cancelar la reserva:", error);
            alert("Error al cancelar la reserva.");
        }
    };  

    const handleGoToVuelos = () => {
        navigate("/");
    }
    return (
        <div>
            <h2>Mis Reservas</h2>
            <button onClick={handleGoToVuelos}>Reservar Vuelos</button>
            <ul>
                {reservasConDetalles.map((res) => (
                    <li key={res._id}>
                        Vuelo ID: {res.vueloId} | Estado: {res.estado}
                        <div>
                            <strong>Detalles del Vuelo:</strong>
                            {Array.isArray(res.vuelo) && res.vuelo.length > 0 ? ( 
                                res.vuelo.map((resA) => (
                                    <div key={resA._id || resA.horario}>
                                        <p>Hora: {resA.horario || 'Información no disponible'}</p>
                                        <p>Aeropuerto de Origen: {resA.origen || 'Información no disponible'}</p>
                                        <p>Aeropuerto de Destino: {resA.destino || 'Información no disponible'}</p>
                                        <p>Fecha: {resA.fecha || 'Información no disponible'}</p>
                                        
                                    </div>
                                ))
                            ) : (
                                <p>No hay detalles del vuelo disponibles.</p>
                            )}
                        </div>
                        <button onClick={() => handleCancel(res._id)}
                            disabled={res.estado === 'cancelado'}>Cancelar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default Reservation;

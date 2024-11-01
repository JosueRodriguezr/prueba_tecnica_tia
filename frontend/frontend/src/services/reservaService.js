import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const authHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const createReservation = (vueloId, usuarioId) =>
    axios.post(`${API_URL}/reservas`, { vueloId, usuarioId }, authHeader());

export const cancelReservation = (id) =>
    axios.delete(`${API_URL}/reservas/${id}`, authHeader());

export const getUserReservations = (usuarioId) =>
    axios.get(`${API_URL}/usuarios/${usuarioId}/reservas`, authHeader());

import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const buscarVuelos = (origen, destino, fecha) =>
    axios.get(`${API_URL}/vuelos`, { params: { origen, destino, fecha } });

export const buscarVueloById = ( id ) =>
    axios.get(`${API_URL}/vuelos/${id}`);


import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = process.env.REACT_APP_API_URL;

export const register = (nombre, correo, password) =>
    axios.post(`${API_URL}/auth/signup`, { nombre, correo, password });
export const login = async (correo, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, { correo, password });
    if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        const decodedToken = jwtDecode(response.data.token);
        localStorage.setItem("userId", decodedToken.userId);
    }
    return response.data;
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    
};

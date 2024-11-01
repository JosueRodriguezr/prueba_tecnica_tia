import React, { useState } from "react";
import { register, login } from "../services/authService";

const Auth = ({ setAuthenticated }) => {
    const [isRegister, setIsRegister] = useState(true);
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");

    const handleAuth = async (e) => {
        e.preventDefault();
        try {
            if (isRegister) {
                await register(nombre, correo, password);
                alert("Usuario registrado!");
            } else {
                await login(correo, password);
                setAuthenticated(true);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Fallo en autenticación");
        }
    };

    return (
        <form onSubmit={handleAuth}>
            {isRegister && <input placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />}
            <input placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
            <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">{isRegister ? "Registrarse" : "Iniciar Sesión"}</button>
            <button type="button" onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? "Ya tienes cuenta? Inicia sesión" : "No tienes cuenta? Regístrate"}
            </button>
        </form>
    );
};

export default Auth;

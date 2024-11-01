require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { mongoConnect } = require("./config/mongo.db");
const authRoutes = require("./routes/auth");
const vueloRoutes = require("./routes/vuelosRoute");
const reservaRoutes = require("./routes/reservasRoute");
const usuarioRoutes = require("./routes/userRoute");

const app = express();

const startServer = async () => {
    await mongoConnect(); 

    app.use(cors({
        origin: "*" 
    }));
    app.use(express.json());
    app.use("/api/auth", authRoutes);
    app.use("/api/vuelos", vueloRoutes);
    app.use("/api/reservas", reservaRoutes);
    app.use("/api/usuarios", usuarioRoutes);

};

startServer();

module.exports = app;

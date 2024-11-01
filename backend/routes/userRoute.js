const express = require("express");
const { listarReservasUsuario } = require("../controllers/reservaController");
const router = express.Router();

router.get("/:usuarioId/reservas", listarReservasUsuario);
module.exports = router;
const express = require("express");
const { crearReserva, cancelarReserva, listarReservasUsuario } = require("../controllers/reservaController");
const router = express.Router();

router.post("/", crearReserva);
router.delete("/:id", cancelarReserva);
//router.get("/usuario/:usuarioId", listarReservasUsuario);

module.exports = router;

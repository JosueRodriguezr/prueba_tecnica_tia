const express = require("express");
const { buscarVuelos , buscarVueloById } = require("../controllers/vueloController");
const router = express.Router();

router.get("/", buscarVuelos);
router.get("/:id", buscarVueloById);
module.exports = router;
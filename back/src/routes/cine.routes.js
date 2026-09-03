// ============================================================
// Rutas del cine
// ============================================================
const express = require("express");
const router = express.Router();

const { obtenerInicio, obtenerFunciones, comprarEntradas } = require("../controllers/cine.controller");

// GET  /api/inicio    -> cartelera + funciones + resumen (Promise.all)
router.get("/inicio", obtenerInicio);

// GET  /api/funciones -> solo la grilla (para refrescar tras comprar)
router.get("/funciones", obtenerFunciones);

// POST /api/entradas  -> compra { idFuncion, cliente, cantidad }
router.post("/entradas", comprarEntradas);

module.exports = router;

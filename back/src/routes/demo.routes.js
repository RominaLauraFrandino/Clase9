// ============================================================
// Rutas de la demo secuencial vs paralelo
// ============================================================
const express = require("express");
const router = express.Router();

const { demoSecuencial, demoParalelo } = require("../controllers/demo.controller");

// GET /api/demo/secuencial -> 3 consultas lentas una tras otra (~3 s)
router.get("/secuencial", demoSecuencial);

// GET /api/demo/paralelo   -> las mismas 3 con Promise.all (~1 s)
router.get("/paralelo", demoParalelo);

module.exports = router;

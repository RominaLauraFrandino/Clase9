// ============================================================
// Servidor principal - Cine Avenida
// Clase 09: Asincronía en profundidad
// ============================================================
const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "../.env") });

const logger = require("./middlewares/logger");
const cineRoutes = require("./routes/cine.routes");
const demoRoutes = require("./routes/demo.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);   // los milisegundos que muestra son la evidencia de hoy

// Rutas de la API
app.use("/api", cineRoutes);        // /api/inicio, /api/funciones, /api/entradas
app.use("/api/demo", demoRoutes);   // /api/demo/secuencial, /api/demo/paralelo

app.get("/", (req, res) => {
  res.send("API Cine Avenida funcionando");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

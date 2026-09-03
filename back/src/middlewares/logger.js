// ============================================================
// Middleware de registro (Clase 08). Hoy es la herramienta de
// medición: los milisegundos que muestra son la evidencia de la
// diferencia entre secuencial y paralelo.
// ============================================================
function logger(req, res, next) {
  const inicio = Date.now();

  res.on("finish", () => {
    const ms = Date.now() - inicio;
    console.log(`${req.method} ${req.originalUrl} -> ${res.statusCode} (${ms} ms)`);
  });

  next();
}

module.exports = logger;

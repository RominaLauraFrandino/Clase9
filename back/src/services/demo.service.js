// ============================================================
// SERVICIO DE DEMOSTRACIÓN - secuencial vs paralelo
// usp_DemoLento tarda 1 segundo a propósito (WAITFOR DELAY).
// Estas dos funciones ejecutan TRES llamadas a ese SP:
//   - enSecuencia: una tras otra  -> ~3 segundos
//   - enParalelo:  las tres juntas -> ~1 segundo
// El middleware logger muestra los milisegundos de cada endpoint:
// esa es la prueba visible de la clase.
// ============================================================
const { getConnection } = require("../config/db");

async function consultaLenta() {
  const pool = await getConnection();
  await pool.request().execute("usp_DemoLento");
}

// SECUENCIAL: cada await FRENA hasta que el anterior termina.
// Total ≈ 1s + 1s + 1s = 3 segundos.
async function enSecuencia() {
  const inicio = Date.now();

  await consultaLenta();
  await consultaLenta();
  await consultaLenta();

  return { modo: "secuencial", milisegundos: Date.now() - inicio };
}

// PARALELO: las tres promesas se crean YA (arrancan las tres),
// y Promise.all espera a que terminen todas.
// Total ≈ el más lento de los tres = 1 segundo.
async function enParalelo() {
  const inicio = Date.now();

  await Promise.all([
    consultaLenta(),
    consultaLenta(),
    consultaLenta()
  ]);

  return { modo: "paralelo", milisegundos: Date.now() - inicio };
}

module.exports = { enSecuencia, enParalelo };

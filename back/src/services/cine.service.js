// ============================================================
// CAPA DE SERVICIOS - Cine Avenida
// El protagonista de hoy: obtenerInicio(), que trae tres
// resultados INDEPENDIENTES en paralelo con Promise.all.
// ============================================================
const { sql, getConnection } = require("../config/db");

async function cartelera() {
  const pool = await getConnection();
  const resultado = await pool.request().execute("usp_Cartelera");
  return resultado.recordset;
}

async function funciones() {
  const pool = await getConnection();
  const resultado = await pool.request().execute("usp_ListarFunciones");
  return resultado.recordset;
}

async function resumen() {
  const pool = await getConnection();
  const resultado = await pool.request().execute("usp_ResumenVentas");
  return resultado.recordset[0];
}

// ------------------------------------------------------------
// La pantalla de inicio necesita TRES resultados que no dependen
// entre sí. En vez de esperarlos de a uno (secuencial), se lanzan
// los tres juntos y se espera a que TODOS terminen: Promise.all.
// El tiempo total es el de la consulta MÁS LENTA, no la suma.
// ------------------------------------------------------------
async function obtenerInicio() {
  const [datosCartelera, datosFunciones, datosResumen] = await Promise.all([
    cartelera(),
    funciones(),
    resumen()
  ]);

  return {
    cartelera: datosCartelera,
    funciones: datosFunciones,
    resumen: datosResumen
  };
}

// Compra de entradas (las reglas viven en el SP)
async function comprar({ idFuncion, cliente, cantidad }) {
  const pool = await getConnection();
  const resultado = await pool.request()
    .input("IdFuncion", sql.Int, idFuncion)
    .input("Cliente", sql.NVarChar(100), cliente)
    .input("Cantidad", sql.Int, cantidad)
    .execute("usp_ComprarEntradas");
  return resultado.recordset[0];   // { idEntrada, total }
}

module.exports = { cartelera, funciones, resumen, obtenerInicio, comprar };

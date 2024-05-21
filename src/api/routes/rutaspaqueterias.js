const express = require("express");
const router = express.Router();
const cache = require("./cache");
const {
  getOficinas,
  getEnvios,
  getEnviosPorTipo,
  getEnviosPorCliente,
  getEnviosPorOficina,
  getEnviosEntregados,
  getEnviosTerrestres,
  getEnviosExpressPorOficina,
  getOficina,
  getCliente,
  getTipoEnvio,
  getEnvio,
  getClientes,
  getTipoEnvios,
  getEnviosAll,
  createAll,
  createOficina,
  createCliente,
  createTipoEnvio,
  createEnvio,
  updateOficina,
  updateCliente,
  updateTipoEnvio,
  updateEnvio,
  deleteOficina,
  deleteCliente,
  deleteTipoEnvio,
  deleteEnvio,
} = require("../controllers/paqueterias.controllers");

//QUERYS
// Q1. Listar los datos de todas las oficinas.
router.get("/oficinas", cache, getOficinas);
// Q2. Listar los envíos realizados en determinada oficina con estatus en tránsito.
router.get("/oficinas/:id/envios", cache, getEnvios);
// Q3. Listar los envíos que utilizan un tipo específico de envío.
router.get("/envios/:tipo", cache, getEnviosPorTipo);
// Q4. Listar los envíos realizados por un cliente en específico en todas las oficinas.
router.get("/envios/cliente/:curp", cache, getEnviosPorCliente);
// Q5. Listar los clientes que han realizado envíos en una determinada oficina.
router.get("/envios/oficina/:id", cache, getEnviosPorOficina);
// Q6. Listar los envíos de todas las oficinas con estatus de entregado.
router.get("/envios/estatus/entregado", cache, getEnviosEntregados);
// Q7. Listar los clientes y sus envíos que se han remitido por el servicio terrestre considerando todas las oficinas.
router.get("/envios/tipo/terrestre", cache, getEnviosTerrestres);
// Q8. Listar los clientes y sus envíos se han remitido por el servicio express considerando una oficina en específico.
router.get(
  "/envios/tipo/express/origen/:oficina",
  cache,
  getEnviosExpressPorOficina
);

//GET
router.get("/oficinas/:ID", cache, getOficina);
router.get("/clientes/:CURP", cache, getCliente);
router.get("/tiposenvio/:ID", cache, getTipoEnvio);
router.get("/envios/one/:id", cache, getEnvio);
//GETALL
router.get("/clientes", cache, getClientes);
router.get("/tiposenvio", cache, getTipoEnvios);
router.get("/envios", cache, getEnviosAll);

//POST
router.post("/all", cache, createAll);
router.post("/oficinas", cache, createOficina);
router.post("/clientes", cache, createCliente);
router.post("/tiposenvio", cache, createTipoEnvio);
router.post("/envios", cache, createEnvio);

//PUT
router.put("/oficinas/:ID", cache, updateOficina);
router.put("/clientes/:CURP", cache, updateCliente);
router.put("/tiposenvio/:ID", cache, updateTipoEnvio);
router.put("/envios/one/:id", cache, updateEnvio);

//DELETE
router.delete("/oficinas/:ID", cache, deleteOficina);
router.delete("/clientes/:CURP", cache, deleteCliente);
router.delete("/tiposenvio/:ID", cache, deleteTipoEnvio);
router.delete("/envios/one/:id", cache, deleteEnvio);

module.exports = router;

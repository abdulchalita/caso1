const mongoose = require("mongoose");

// Define el esquema para Oficinas
const OficinaSchema = new mongoose.Schema({
  ID: {
    type: String,
    required: true,
  },
  Nombre: {
    type: String,
    required: true,
  },
  Direccion: {
    Calle: {
      type: String,
      required: true,
    },
    Numero: {
      type: String,
      required: true,
    },
    Ciudad: {
      type: String,
      required: true,
    },
    CodigoPostal: {
      type: String,
      required: true,
    },
  },
  Telefono: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
});

// Define el esquema para Clientes
const ClienteSchema = new mongoose.Schema({
  CURP: {
    type: String,
    required: true,
  },
  Nombre: {
    type: String,
    required: true,
  },
  Apellidos: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
});

// Define el esquema para Tipos de Envío
const TipoEnvioSchema = new mongoose.Schema({
  ID: {
    type: String,
    required: true,
  },
  Descripcion: {
    type: String,
    required: true,
  },
  PrecioPorKm: {
    type: Number,
    required: true,
  },
  TiempoEntregaEstimado: {
    type: String,
    required: true,
  },
});

// Define el esquema para Envíos
const EnvioSchema = new mongoose.Schema({
  FechaEnvio: {
    type: Date,
    required: true,
  },
  Origen: {
    type: String,
    required: true,
  },
  Destino: {
    type: String,
    required: true,
  },
  TipoEnvio: {
    type: String,
    required: true,
  },
  Cliente: {
    type: String,
    required: true,
  },
  Peso: {
    type: Number,
    required: true,
  },
  Dimensiones: {
    Alto: {
      type: Number,
      required: true,
    },
    Ancho: {
      type: Number,
      required: true,
    },
    Largo: {
      type: Number,
      required: true,
    },
  },
  CostoTotal: {
    type: Number,
    required: true,
  },
  Estatus: {
    type: String,
    required: true,
  },
});

// Crea los modelos a partir de los esquemas
const Oficina = mongoose.model("Oficina", OficinaSchema);
const Cliente = mongoose.model("Cliente", ClienteSchema);
const TipoEnvio = mongoose.model("TipoEnvio", TipoEnvioSchema, "tiposenvio");
const Envio = mongoose.model("Envio", EnvioSchema);

module.exports = { Oficina, Cliente, TipoEnvio, Envio };

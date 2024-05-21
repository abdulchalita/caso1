const { Oficina, Cliente, TipoEnvio, Envio } = require("../models/paqueterias");

//QUERYS
const getOficinas = async (req, res) => {
  try {
    const oficinas = await Oficina.find({});
    res.json(oficinas);
  } catch (error) {
    res.status(500).send("Hubo un error al obtener las oficinas");
  }
};

const getEnvios = async (req, res) => {
  try {
    const id = req.params.id;
    const envios = await Envio.aggregate([
      {
        $lookup: {
          from: "oficinas",
          localField: "Origen",
          foreignField: "ID",
          as: "OficinaOrigen",
        },
      },
      {
        $lookup: {
          from: "oficinas",
          localField: "Destino",
          foreignField: "ID",
          as: "OficinaDestino",
        },
      },
      {
        $lookup: {
          from: "clientes",
          localField: "Cliente",
          foreignField: "CURP",
          as: "cliente",
        },
      },
      {
        $lookup: {
          from: "tiposenvio",
          localField: "TipoEnvio",
          foreignField: "ID",
          as: "tipoEnvio",
        },
      },
      {
        $match: {
          Origen: id,
          Estatus: "tránsito",
        },
      },
      {
        $project: {
          _id: 0,
          Envio: {
            ID: "$_id",
            FechaEnvio: "$FechaEnvio",
            Peso: "$Peso",
            Dimensiones: "$Dimensiones",
            CostoTotal: "$CostoTotal",
            Estatus: "$Estatus",
            Detail: {
              OficinaOrigen: {
                Nombre: { $arrayElemAt: ["$OficinaOrigen.Nombre", 0] },
                Direccion: { $arrayElemAt: ["$OficinaOrigen.Direccion", 0] },
                Telefono: { $arrayElemAt: ["$OficinaOrigen.Telefono", 0] },
                Email: { $arrayElemAt: ["$OficinaOrigen.Email", 0] },
              },
              OficinaDestino: {
                Nombre: { $arrayElemAt: ["$OficinaDestino.Nombre", 0] },
                Direccion: { $arrayElemAt: ["$OficinaDestino.Direccion", 0] },
                Telefono: { $arrayElemAt: ["$OficinaDestino.Telefono", 0] },
                Email: { $arrayElemAt: ["$OficinaDestino.Email", 0] },
              },
              Cliente: {
                Nombre: { $arrayElemAt: ["$cliente.Nombre", 0] },
                Apellidos: { $arrayElemAt: ["$cliente.Apellidos", 0] },
                Email: { $arrayElemAt: ["$cliente.Email", 0] },
              },
              TipoEnvio: {
                Descripcion: { $arrayElemAt: ["$tipoEnvio.Descripcion", 0] },
                PrecioPorKm: { $arrayElemAt: ["$tipoEnvio.PrecioPorKm", 0] },
                TiempoEntregaEstimado: {
                  $arrayElemAt: ["$tipoEnvio.TiempoEntregaEstimado", 0],
                },
              },
            },
          },
        },
      },
    ]);
    res.json(envios);
  } catch (error) {
    res.status(500).send("Hubo un error al obtener los envíos");
  }
};

const getEnviosPorTipo = async (req, res) => {
  try {
    const tipo = req.params.tipo;
    const envios = await Envio.aggregate([
      {
        $lookup: {
          from: "oficinas",
          localField: "Origen",
          foreignField: "ID",
          as: "OficinaOrigen",
        },
      },
      {
        $lookup: {
          from: "oficinas",
          localField: "Destino",
          foreignField: "ID",
          as: "OficinaDestino",
        },
      },
      {
        $lookup: {
          from: "clientes",
          localField: "Cliente",
          foreignField: "CURP",
          as: "cliente",
        },
      },
      {
        $lookup: {
          from: "tiposenvio",
          localField: "TipoEnvio",
          foreignField: "ID",
          as: "tipoEnvio",
        },
      },
      {
        $match: {
          "tipoEnvio.Descripcion": tipo,
        },
      },
      {
        $project: {
          _id: 0,
          Envio: {
            ID: "$_id",
            FechaEnvio: "$FechaEnvio",
            Peso: "$Peso",
            Dimensiones: "$Dimensiones",
            CostoTotal: "$CostoTotal",
            Estatus: "$Estatus",
            Detail: {
              OficinaOrigen: {
                Nombre: { $arrayElemAt: ["$OficinaOrigen.Nombre", 0] },
                Direccion: { $arrayElemAt: ["$OficinaOrigen.Direccion", 0] },
                Telefono: { $arrayElemAt: ["$OficinaOrigen.Telefono", 0] },
                Email: { $arrayElemAt: ["$OficinaOrigen.Email", 0] },
              },
              OficinaDestino: {
                Nombre: { $arrayElemAt: ["$OficinaDestino.Nombre", 0] },
                Direccion: { $arrayElemAt: ["$OficinaDestino.Direccion", 0] },
                Telefono: { $arrayElemAt: ["$OficinaDestino.Telefono", 0] },
                Email: { $arrayElemAt: ["$OficinaDestino.Email", 0] },
              },
              Cliente: {
                Nombre: { $arrayElemAt: ["$cliente.Nombre", 0] },
                Apellidos: { $arrayElemAt: ["$cliente.Apellidos", 0] },
                Email: { $arrayElemAt: ["$cliente.Email", 0] },
              },
              TipoEnvio: {
                Descripcion: { $arrayElemAt: ["$tipoEnvio.Descripcion", 0] },
                PrecioPorKm: { $arrayElemAt: ["$tipoEnvio.PrecioPorKm", 0] },
                TiempoEntregaEstimado: {
                  $arrayElemAt: ["$tipoEnvio.TiempoEntregaEstimado", 0],
                },
              },
            },
          },
        },
      },
    ]);
    res.json(envios);
  } catch (error) {
    res.status(500).send("Hubo un error al obtener los envíos");
  }
};

const getEnviosPorCliente = async (req, res) => {
  try {
    const curp = req.params.curp;
    const envios = await Envio.aggregate([
      {
        $lookup: {
          from: "oficinas",
          localField: "Origen",
          foreignField: "ID",
          as: "OficinaOrigen",
        },
      },
      {
        $lookup: {
          from: "oficinas",
          localField: "Destino",
          foreignField: "ID",
          as: "OficinaDestino",
        },
      },
      {
        $lookup: {
          from: "clientes",
          localField: "Cliente",
          foreignField: "CURP",
          as: "cliente",
        },
      },
      {
        $lookup: {
          from: "tiposenvio",
          localField: "TipoEnvio",
          foreignField: "ID",
          as: "tipoEnvio",
        },
      },
      {
        $match: {
          "cliente.CURP": curp,
        },
      },
      {
        $project: {
          _id: 0,
          Envio: {
            ID: "$_id",
            FechaEnvio: "$FechaEnvio",
            Peso: "$Peso",
            Dimensiones: "$Dimensiones",
            CostoTotal: "$CostoTotal",
            Estatus: "$Estatus",
            Detail: {
              OficinaOrigen: {
                Nombre: { $arrayElemAt: ["$OficinaOrigen.Nombre", 0] },
                Direccion: { $arrayElemAt: ["$OficinaOrigen.Direccion", 0] },
                Telefono: { $arrayElemAt: ["$OficinaOrigen.Telefono", 0] },
                Email: { $arrayElemAt: ["$OficinaOrigen.Email", 0] },
              },
              OficinaDestino: {
                Nombre: { $arrayElemAt: ["$OficinaDestino.Nombre", 0] },
                Direccion: { $arrayElemAt: ["$OficinaDestino.Direccion", 0] },
                Telefono: { $arrayElemAt: ["$OficinaDestino.Telefono", 0] },
                Email: { $arrayElemAt: ["$OficinaDestino.Email", 0] },
              },
              Cliente: {
                Nombre: { $arrayElemAt: ["$cliente.Nombre", 0] },
                Apellidos: { $arrayElemAt: ["$cliente.Apellidos", 0] },
                Email: { $arrayElemAt: ["$cliente.Email", 0] },
              },
              TipoEnvio: {
                Descripcion: { $arrayElemAt: ["$tipoEnvio.Descripcion", 0] },
                PrecioPorKm: { $arrayElemAt: ["$tipoEnvio.PrecioPorKm", 0] },
                TiempoEntregaEstimado: {
                  $arrayElemAt: ["$tipoEnvio.TiempoEntregaEstimado", 0],
                },
              },
            },
          },
        },
      },
    ]);
    res.json(envios);
  } catch (error) {
    res.status(500).send("Hubo un error al obtener los envíos");
  }
};

const getEnviosPorOficina = async (req, res) => {
  try {
    const id = req.params.id;
    const envios = await Envio.aggregate([
      {
        $lookup: {
          from: "oficinas",
          localField: "Origen",
          foreignField: "ID",
          as: "OficinaOrigen",
        },
      },
      {
        $lookup: {
          from: "oficinas",
          localField: "Destino",
          foreignField: "ID",
          as: "OficinaDestino",
        },
      },
      {
        $lookup: {
          from: "clientes",
          localField: "Cliente",
          foreignField: "CURP",
          as: "cliente",
        },
      },
      {
        $lookup: {
          from: "tiposenvio",
          localField: "TipoEnvio",
          foreignField: "ID",
          as: "tipoEnvio",
        },
      },
      {
        $match: {
          Origen: id,
        },
      },
      {
        $project: {
          _id: 0,
          Envio: {
            ID: "$_id",
            FechaEnvio: "$FechaEnvio",
            Peso: "$Peso",
            Dimensiones: "$Dimensiones",
            CostoTotal: "$CostoTotal",
            Estatus: "$Estatus",
            Detail: {
              OficinaOrigen: {
                Nombre: { $arrayElemAt: ["$OficinaOrigen.Nombre", 0] },
                Direccion: { $arrayElemAt: ["$OficinaOrigen.Direccion", 0] },
                Telefono: { $arrayElemAt: ["$OficinaOrigen.Telefono", 0] },
                Email: { $arrayElemAt: ["$OficinaOrigen.Email", 0] },
              },
              OficinaDestino: {
                Nombre: { $arrayElemAt: ["$OficinaDestino.Nombre", 0] },
                Direccion: { $arrayElemAt: ["$OficinaDestino.Direccion", 0] },
                Telefono: { $arrayElemAt: ["$OficinaDestino.Telefono", 0] },
                Email: { $arrayElemAt: ["$OficinaDestino.Email", 0] },
              },
              Cliente: {
                Nombre: { $arrayElemAt: ["$cliente.Nombre", 0] },
                Apellidos: { $arrayElemAt: ["$cliente.Apellidos", 0] },
                Email: { $arrayElemAt: ["$cliente.Email", 0] },
              },
              TipoEnvio: {
                Descripcion: { $arrayElemAt: ["$tipoEnvio.Descripcion", 0] },
                PrecioPorKm: { $arrayElemAt: ["$tipoEnvio.PrecioPorKm", 0] },
                TiempoEntregaEstimado: {
                  $arrayElemAt: ["$tipoEnvio.TiempoEntregaEstimado", 0],
                },
              },
            },
          },
        },
      },
    ]);
    res.json(envios);
  } catch (error) {
    res.status(500).send("Hubo un error al obtener los envíos");
  }
};

const getEnviosEntregados = async (req, res) => {
  try {
    const envios = await Envio.aggregate([
      {
        $lookup: {
          from: "oficinas",
          localField: "Origen",
          foreignField: "ID",
          as: "OficinaOrigen",
        },
      },
      {
        $lookup: {
          from: "oficinas",
          localField: "Destino",
          foreignField: "ID",
          as: "OficinaDestino",
        },
      },
      {
        $lookup: {
          from: "clientes",
          localField: "Cliente",
          foreignField: "CURP",
          as: "cliente",
        },
      },
      {
        $lookup: {
          from: "tiposenvio",
          localField: "TipoEnvio",
          foreignField: "ID",
          as: "tipoEnvio",
        },
      },
      {
        $match: {
          Estatus: "entregado",
        },
      },
      {
        $project: {
          _id: 0,
          Envio: {
            ID: "$_id",
            FechaEnvio: "$FechaEnvio",
            Peso: "$Peso",
            Dimensiones: "$Dimensiones",
            CostoTotal: "$CostoTotal",
            Estatus: "$Estatus",
            Detail: {
              OficinaOrigen: {
                Nombre: { $arrayElemAt: ["$OficinaOrigen.Nombre", 0] },
                Direccion: { $arrayElemAt: ["$OficinaOrigen.Direccion", 0] },
                Telefono: { $arrayElemAt: ["$OficinaOrigen.Telefono", 0] },
                Email: { $arrayElemAt: ["$OficinaOrigen.Email", 0] },
              },
              OficinaDestino: {
                Nombre: { $arrayElemAt: ["$OficinaDestino.Nombre", 0] },
                Direccion: { $arrayElemAt: ["$OficinaDestino.Direccion", 0] },
                Telefono: { $arrayElemAt: ["$OficinaDestino.Telefono", 0] },
                Email: { $arrayElemAt: ["$OficinaDestino.Email", 0] },
              },
              Cliente: {
                Nombre: { $arrayElemAt: ["$cliente.Nombre", 0] },
                Apellidos: { $arrayElemAt: ["$cliente.Apellidos", 0] },
                Email: { $arrayElemAt: ["$cliente.Email", 0] },
              },
              TipoEnvio: {
                Descripcion: { $arrayElemAt: ["$tipoEnvio.Descripcion", 0] },
                PrecioPorKm: { $arrayElemAt: ["$tipoEnvio.PrecioPorKm", 0] },
                TiempoEntregaEstimado: {
                  $arrayElemAt: ["$tipoEnvio.TiempoEntregaEstimado", 0],
                },
              },
            },
          },
        },
      },
    ]);
    res.json(envios);
  } catch (error) {
    res.status(500).send("Hubo un error al obtener los envíos");
  }
};

const getEnviosTerrestres = async (req, res) => {
  try {
    const envios = await Envio.aggregate([
      {
        $lookup: {
          from: "oficinas",
          localField: "Origen",
          foreignField: "ID",
          as: "OficinaOrigen",
        },
      },
      {
        $lookup: {
          from: "oficinas",
          localField: "Destino",
          foreignField: "ID",
          as: "OficinaDestino",
        },
      },
      {
        $lookup: {
          from: "clientes",
          localField: "Cliente",
          foreignField: "CURP",
          as: "cliente",
        },
      },
      {
        $lookup: {
          from: "tiposenvio",
          localField: "TipoEnvio",
          foreignField: "ID",
          as: "tipoEnvio",
        },
      },
      {
        $match: {
          "tipoEnvio.Descripcion": "Terrestre",
        },
      },
      {
        $project: {
          _id: 0,
          Envio: {
            ID: "$_id",
            FechaEnvio: "$FechaEnvio",
            Peso: "$Peso",
            Dimensiones: "$Dimensiones",
            CostoTotal: "$CostoTotal",
            Estatus: "$Estatus",
            Detail: {
              OficinaOrigen: {
                Nombre: { $arrayElemAt: ["$OficinaOrigen.Nombre", 0] },
                Direccion: { $arrayElemAt: ["$OficinaOrigen.Direccion", 0] },
                Telefono: { $arrayElemAt: ["$OficinaOrigen.Telefono", 0] },
                Email: { $arrayElemAt: ["$OficinaOrigen.Email", 0] },
              },
              OficinaDestino: {
                Nombre: { $arrayElemAt: ["$OficinaDestino.Nombre", 0] },
                Direccion: { $arrayElemAt: ["$OficinaDestino.Direccion", 0] },
                Telefono: { $arrayElemAt: ["$OficinaDestino.Telefono", 0] },
                Email: { $arrayElemAt: ["$OficinaDestino.Email", 0] },
              },
              Cliente: {
                Nombre: { $arrayElemAt: ["$cliente.Nombre", 0] },
                Apellidos: { $arrayElemAt: ["$cliente.Apellidos", 0] },
                Email: { $arrayElemAt: ["$cliente.Email", 0] },
              },
              TipoEnvio: {
                Descripcion: { $arrayElemAt: ["$tipoEnvio.Descripcion", 0] },
                PrecioPorKm: { $arrayElemAt: ["$tipoEnvio.PrecioPorKm", 0] },
                TiempoEntregaEstimado: {
                  $arrayElemAt: ["$tipoEnvio.TiempoEntregaEstimado", 0],
                },
              },
            },
          },
        },
      },
    ]);
    res.json(envios);
  } catch (error) {
    res.status(500).send("Hubo un error al obtener los envíos");
  }
};

const getEnviosExpressPorOficina = async (req, res) => {
  try {
    const oficina = req.params.oficina;
    const envios = await Envio.aggregate([
      {
        $lookup: {
          from: "oficinas",
          localField: "Origen",
          foreignField: "ID",
          as: "OficinaOrigen",
        },
      },
      {
        $lookup: {
          from: "oficinas",
          localField: "Destino",
          foreignField: "ID",
          as: "OficinaDestino",
        },
      },
      {
        $lookup: {
          from: "clientes",
          localField: "Cliente",
          foreignField: "CURP",
          as: "cliente",
        },
      },
      {
        $lookup: {
          from: "tiposenvio",
          localField: "TipoEnvio",
          foreignField: "ID",
          as: "tipoEnvio",
        },
      },
      {
        $match: {
          "tipoEnvio.Descripcion": "Express",
          Origen: oficina,
        },
      },
      {
        $project: {
          _id: 0,
          Envio: {
            ID: "$_id",
            FechaEnvio: "$FechaEnvio",
            Peso: "$Peso",
            Dimensiones: "$Dimensiones",
            CostoTotal: "$CostoTotal",
            Estatus: "$Estatus",
            Detail: {
              OficinaOrigen: {
                Nombre: { $arrayElemAt: ["$OficinaOrigen.Nombre", 0] },
                Direccion: { $arrayElemAt: ["$OficinaOrigen.Direccion", 0] },
                Telefono: { $arrayElemAt: ["$OficinaOrigen.Telefono", 0] },
                Email: { $arrayElemAt: ["$OficinaOrigen.Email", 0] },
              },
              OficinaDestino: {
                Nombre: { $arrayElemAt: ["$OficinaDestino.Nombre", 0] },
                Direccion: { $arrayElemAt: ["$OficinaDestino.Direccion", 0] },
                Telefono: { $arrayElemAt: ["$OficinaDestino.Telefono", 0] },
                Email: { $arrayElemAt: ["$OficinaDestino.Email", 0] },
              },
              Cliente: {
                Nombre: { $arrayElemAt: ["$cliente.Nombre", 0] },
                Apellidos: { $arrayElemAt: ["$cliente.Apellidos", 0] },
                Email: { $arrayElemAt: ["$cliente.Email", 0] },
              },
              TipoEnvio: {
                Descripcion: { $arrayElemAt: ["$tipoEnvio.Descripcion", 0] },
                PrecioPorKm: { $arrayElemAt: ["$tipoEnvio.PrecioPorKm", 0] },
                TiempoEntregaEstimado: {
                  $arrayElemAt: ["$tipoEnvio.TiempoEntregaEstimado", 0],
                },
              },
            },
          },
        },
      },
    ]);
    res.json(envios);
  } catch (error) {
    res.status(500).send("Hubo un error al obtener los envíos");
  }
};

//GET
const getOficina = async (req, res) => {
  try {
    const oficina = await Oficina.findOne({ ID: req.params.ID });
    if (oficina == null) {
      return res.status(404).json({ message: "Cannot find oficina" });
    }
    res.status(200).json(oficina);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findOne({ CURP: req.params.CURP });
    if (cliente == null) {
      return res.status(404).json({ message: "Cannot find cliente" });
    }
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTipoEnvio = async (req, res) => {
  try {
    const tipoEnvio = await TipoEnvio.findOne({ ID: req.params.ID });
    if (tipoEnvio == null) {
      return res.status(404).json({ message: "Cannot find tipoEnvio" });
    }
    res.status(200).json(tipoEnvio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEnvio = async (req, res) => {
  try {
    const envio = await Envio.findById(req.params.id);
    if (envio == null) {
      return res.status(404).json({ message: "Cannot find envio" });
    }
    res.status(200).json(envio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find({});
    res.json(clientes);
  } catch (error) {
    res.status(500).send("Hubo un error al obtener los clientes");
  }
};

const getTipoEnvios = async (req, res) => {
  try {
    const tipo = await TipoEnvio.find({});
    res.json(tipo);
  } catch (error) {
    res.status(500).send("Hubo un error al obtener los tipos de envios");
  }
};
const getEnviosAll = async (req, res) => {
  try {
    const envio = await Envio.find({});
    res.json(envio);
  } catch (error) {
    res.status(500).send("Hubo un error al obtener los envios");
  }
};

//POST
const createAll = async (req, res) => {
  try {
    const { oficinas, clientes, tipoEnvios, envios } = req.body;

    const savedOficinas = await Oficina.insertMany(oficinas);
    const savedClientes = await Cliente.insertMany(clientes);
    const savedTipoEnvios = await TipoEnvio.insertMany(tipoEnvios);
    const savedEnvios = await Envio.insertMany(envios);

    res.status(201).json({
      oficinas: savedOficinas,
      clientes: savedClientes,
      tipoEnvios: savedTipoEnvios,
      envios: savedEnvios,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createOficina = async (req, res) => {
  try {
    const savedOficinas = await Oficina.insertMany(req.body);
    res.status(201).json(savedOficinas);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createCliente = async (req, res) => {
  try {
    const savedClientes = await Cliente.insertMany(req.body);
    res.status(201).json(savedClientes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createTipoEnvio = async (req, res) => {
  try {
    const savedTipoEnvios = await TipoEnvio.insertMany(req.body);
    res.status(201).json(savedTipoEnvios);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createEnvio = async (req, res) => {
  try {
    const savedEnvios = await Envio.insertMany(req.body);
    res.status(201).json(savedEnvios);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//PUT
const updateOficina = async (req, res) => {
  try {
    const updatedOficina = await Oficina.findOneAndUpdate(
      { ID: req.params.ID },
      req.body,
      { new: true }
    );
    res.status(200).json(updatedOficina);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateCliente = async (req, res) => {
  try {
    const updatedCliente = await Cliente.findOneAndUpdate(
      { CURP: req.params.CURP },
      req.body,
      { new: true }
    );
    res.status(200).json(updatedCliente);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateTipoEnvio = async (req, res) => {
  try {
    const updatedTipoEnvio = await TipoEnvio.findOneAndUpdate(
      { ID: req.params.ID },
      req.body,
      { new: true }
    );
    res.status(200).json(updatedTipoEnvio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateEnvio = async (req, res) => {
  try {
    const updatedEnvio = await Envio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedEnvio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//DELETE
const deleteOficina = async (req, res) => {
  try {
    const deletedOficina = await Oficina.findOneAndDelete({
      ID: req.params.ID,
    });
    res.status(200).json(deletedOficina);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCliente = async (req, res) => {
  try {
    const deletedCliente = await Cliente.findOneAndDelete({
      CURP: req.params.CURP,
    });
    res.status(200).json(deletedCliente);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTipoEnvio = async (req, res) => {
  try {
    const deletedTipoEnvio = await TipoEnvio.findOneAndDelete({
      ID: req.params.ID,
    });
    res.status(200).json(deletedTipoEnvio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteEnvio = async (req, res) => {
  try {
    const deletedEnvio = await Envio.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedEnvio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
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
};

const mongoose = require("mongoose"); // Módulo para interactuar con MongoDB
const redis = require("redis"); // Módulo para interactuar con Redis
const Docker = require("dockerode");

async function connect() {
  try {
    // Conexión a MongoDB
    await mongoose.connect(
      "mongodb://mongo01:27017,mongo02:27017,mongo03:27017/EmpresaPaqueteria?replicaSet=replica01"
    );
    console.log("Conectado a MongoDB ReplicaSet"); // Mensaje de éxito en la conexión
  } catch (error) {
    console.error("Error al conectar a MongoDB ReplicaSet:", error); // Mensaje de error en la conexión
  }

  // Configuración de Redis
  const redisClient = redis.createClient({
    url: `redis://redis02:6379`,
  });

  redisClient.on("error", (err) => {
    console.error("Error en la conexión a Redis:", err); // Mensaje de error en la conexión a Redis
  });

  redisClient
    .connect()
    .then(() => {
      console.log("Conectado a Redis");
    })
    .catch((err) => {
      console.error("No se pudo conectar a Redis:", err);
    });

  // Crear una instancia de Docker
  const docker = new Docker({ socketPath: "/var/run/docker.sock" });

  // Listar todos los contenedores
  docker.listContainers((err, containers) => {
    if (err) {
      console.error(`Error al listar contenedores: ${err.message}`);
      return;
    }

  // Buscar el contenedor que incluye "mongo-init-replica" en su nombre
    const containerInfo = containers.find((container) =>
      container.Names.some((name) => name.includes("mongo-init-replica"))
    );

    if (!containerInfo) {
      console.log("No se encontró ningún contenedor mongo-init-replica");
      return;
    }

    const containerId = containerInfo.Id;

    // Eliminar el contenedor
    docker.getContainer(containerId).remove({ force: true }, (err, data) => {
      if (err) {
        console.error(
          `Error al eliminar el contenedor ${containerInfo.Names}: ${err.message}`
        );
      } else {
        console.log(`Contenedor ${containerInfo.Names} eliminado`);
      }
    });
  });

  // Exportamos las instancias de mongoose y redisClient para usarlas en otras partes de la aplicación
  return { mongoose, redisClient };
}

module.exports = { connect };

// Importa el módulo express, que es un marco de aplicación web para Node.js
const express = require("express");

// Crea una nueva aplicación Express
const app = express();

// Importa el módulo body-parser, que analiza los cuerpos de las solicitudes entrantes en un middleware
const bodyParser = require("body-parser");

// Importa el módulo de conexión a la base de datos
const db = require("./connection");

// Importa y configura el middleware CORS
const cors = require("cors");
app.use(cors());

// Define el puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3000;

// Importa los módulos de rutas personalizadas para manejar las solicitudes a las rutas de alumnos y materias
const rutaPaqueterias = require("./api/routes/rutaspaqueterias");

// Configura los middlewares de la aplicación
// bodyParser.urlencoded analiza los cuerpos de las solicitudes con payloads urlencoded
// bodyParser.json analiza los cuerpos de las solicitudes con payloads JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configura las rutas de la aplicación
// Las solicitudes a '/api' serán manejadas por los módulos de rutas importados
app.use("/tecnm", rutaPaqueterias);

// Conecta a la base de datos e inicia el conjunto de réplicas
db.connect();

// Inicia el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log("Server en http://localhost:" + PORT);
});

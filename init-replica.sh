#!/bin/bash

echo "Esperando a que MongoDB esté listo..."

until mongosh --host mongo01 --eval "print(\"conexion exitosa\")"; do
    sleep 5
done

echo "Inicializando el replicaset..."

mongosh --host mongo01 <<EOF
rs.initiate({
  _id: 'replica01',
  members: [
    { _id: 0, host: 'mongo01:27017' },
    { _id: 1, host: 'mongo02:27017' },
    { _id: 2, host: 'mongo03:27017' }
  ]
})
EOF

echo "Replicaset inicializado."

echo "Esperando a que mongo01 se convierta en primario..."

until mongosh --host mongo01 --eval "rs.isMaster().ismaster" | grep -q "true"; do
    sleep 5
done

echo "mongo01 es ahora el nodo primario. Esperando 5 segundos adicionales..."

sleep 5

echo "mongo01 es ahora el nodo primario."

# echo "Insercion de escenario de datos."
# mongosh --host mongo01 <<EOF
# use("EmpresaPaqueteria")

# // Colección Oficinas
# db.oficinas.insertMany([
#   {
#     _id: ObjectId("111111111111111111111111"),
#     ID: "OF001",
#     Nombre: "Oficina Central",
#     Direccion: {
#       Calle: "Av. Principal",
#       Numero: "123",
#       Ciudad: "Ciudad de México",
#       CodigoPostal: "12345",
#     },
#     Telefono: "555-123-4567",
#     Email: "info@oficinacentral.com",
#   },
#   {
#     _id: ObjectId("222222222222222222222222"),
#     ID: "OF002",
#     Nombre: "Oficina Guadalajara",
#     Direccion: {
#       Calle: "Av. Revolución",
#       Numero: "456",
#       Ciudad: "Guadalajara",
#       CodigoPostal: "45678",
#     },
#     Telefono: "555-234-5678",
#     Email: "info@oficinaguadalajara.com",
#   },
#   {
#     _id: ObjectId("333333333333333333333333"),
#     ID: "OF003",
#     Nombre: "Oficina Monterrey",
#     Direccion: {
#       Calle: "Av. Industria",
#       Numero: "789",
#       Ciudad: "Monterrey",
#       CodigoPostal: "78901",
#     },
#     Telefono: "555-345-6789",
#     Email: "info@oficinamonterrey.com",
#   },
#   {
#     _id: ObjectId("444444444444444444444444"),
#     ID: "OF004",
#     Nombre: "Oficina Puebla",
#     Direccion: {
#       Calle: "Av. Reforma",
#       Numero: "012",
#       Ciudad: "Puebla",
#       CodigoPostal: "01234",
#     },
#     Telefono: "555-456-7890",
#     Email: "info@oficinapuebla.com",
#   },
#   {
#     _id: ObjectId("555555555555555555555555"),
#     ID: "OF005",
#     Nombre: "Oficina Querétaro",
#     Direccion: {
#       Calle: "Av. Constituyentes",
#       Numero: "345",
#       Ciudad: "Querétaro",
#       CodigoPostal: "34567",
#     },
#     Telefono: "555-567-8901",
#     Email: "info@oficinaqueretaro.com",
#   },
# ])

# // Colección Clientes
# db.clientes.insertMany([
#   {
#     _id: ObjectId("111111111111111111111111"),
#     CURP: "ABC123456DEF789GH",
#     Nombre: "Juan",
#     Apellidos: "Pérez",
#     Email: "juan.perez@example.com",
#   },
#   {
#     _id: ObjectId("222222222222222222222222"),
#     CURP: "DEF234567GHI890JK",
#     Nombre: "María",
#     Apellidos: "González",
#     Email: "maria.gonzalez@example.com",
#   },
#   {
#     _id: ObjectId("333333333333333333333333"),
#     CURP: "GHI345678JKL901LM",
#     Nombre: "Carlos",
#     Apellidos: "Rodríguez",
#     Email: "carlos.rodriguez@example.com",
#   },
#   {
#     _id: ObjectId("444444444444444444444444"),
#     CURP: "JKL456789LMN012NO",
#     Nombre: "Ana",
#     Apellidos: "Martínez",
#     Email: "ana.martinez@example.com",
#   },
#   {
#     _id: ObjectId("555555555555555555555555"),
#     CURP: "LMN567890NOP123PQ",
#     Nombre: "Jorge",
#     Apellidos: "Hernández",
#     Email: "jorge.hernandez@example.com",
#   },
#   {
#     _id: ObjectId("666666666666666666666666"),
#     CURP: "NOP678901PQR234QR",
#     Nombre: "Sofía",
#     Apellidos: "López",
#     Email: "sofia.lopez@example.com",
#   },
#   {
#     _id: ObjectId("777777777777777777777777"),
#     CURP: "PQR789012QRS345ST",
#     Nombre: "Luis",
#     Apellidos: "Torres",
#     Email: "luis.torres@example.com",
#   },
#   {
#     _id: ObjectId("888888888888888888888888"),
#     CURP: "QRS890123STU456TU",
#     Nombre: "Patricia",
#     Apellidos: "Ramírez",
#     Email: "patricia.ramirez@example.com",
#   },
#   {
#     _id: ObjectId("999999999999999999999999"),
#     CURP: "STU901234TUV567UV",
#     Nombre: "Ricardo",
#     Apellidos: "Flores",
#     Email: "ricardo.flores@example.com",
#   },
#   {
#     _id: ObjectId("101010101010101010101010"),
#     CURP: "TUV012345UVW678VW",
#     Nombre: "Laura",
#     Apellidos: "Morales",
#     Email: "laura.morales@example.com",
#   },
# ])

# // Colección Tipos de Envío
# db.tiposenvio.insertMany([
#   {
#     _id: ObjectId("111111111111111111111111"),
#     ID: "TE001",
#     Descripcion: "Terrestre",
#     PrecioPorKm: 5.0,
#     TiempoEntregaEstimado: "2 días",
#   },
#   {
#     _id: ObjectId("222222222222222222222222"),
#     ID: "TE002",
#     Descripcion: "Aereo",
#     PrecioPorKm: 6.0,
#     TiempoEntregaEstimado: "3 días",
#   },
#   {
#     _id: ObjectId("333333333333333333333333"),
#     ID: "TE003",
#     Descripcion: "Express",
#     PrecioPorKm: 7.0,
#     TiempoEntregaEstimado: "1 día",
#   },
# ])

# // Colección Envíos
# db.envios.insertMany([
#   {
#     _id: ObjectId("111111111111111111111111"),
#     FechaEnvio: "2022-10-24",
#     Origen: "OF001",
#     Destino: "OF002",
#     TipoEnvio: "TE001",
#     Cliente: "ABC123456DEF789GH",
#     Peso: 10,
#     Dimensiones: {
#       Alto: 20,
#       Ancho: 30,
#       Largo: 40,
#     },
#     CostoTotal: 200.0,
#     Estatus: "pendiente",
#   },
#   {
#     _id: ObjectId("222222222222222222222222"),
#     FechaEnvio: "2022-10-25",
#     Origen: "OF002",
#     Destino: "OF003",
#     TipoEnvio: "TE002",
#     Cliente: "DEF234567GHI890JK",
#     Peso: 15,
#     Dimensiones: {
#       Alto: 25,
#       Ancho: 35,
#       Largo: 45,
#     },
#     CostoTotal: 250.0,
#     Estatus: "tránsito",
#   },
#   {
#     _id: ObjectId("333333333333333333333333"),
#     FechaEnvio: "2022-10-26",
#     Origen: "OF003",
#     Destino: "OF004",
#     TipoEnvio: "TE003",
#     Cliente: "GHI345678JKL901LM",
#     Peso: 20,
#     Dimensiones: {
#       Alto: 30,
#       Ancho: 40,
#       Largo: 50,
#     },
#     CostoTotal: 300.0,
#     Estatus: "entregado",
#   },
#   {
#     _id: ObjectId("444444444444444444444444"),
#     FechaEnvio: "2022-10-27",
#     Origen: "OF004",
#     Destino: "OF005",
#     TipoEnvio: "TE001",
#     Cliente: "JKL456789LMN012NO",
#     Peso: 25,
#     Dimensiones: {
#       Alto: 35,
#       Ancho: 45,
#       Largo: 55,
#     },
#     CostoTotal: 350.0,
#     Estatus: "pendiente",
#   },
#   {
#     _id: ObjectId("555555555555555555555555"),
#     FechaEnvio: "2022-10-28",
#     Origen: "OF005",
#     Destino: "OF001",
#     TipoEnvio: "TE002",
#     Cliente: "LMN567890NOP123PQ",
#     Peso: 30,
#     Dimensiones: {
#       Alto: 40,
#       Ancho: 50,
#       Largo: 60,
#     },
#     CostoTotal: 400.0,
#     Estatus: "tránsito",
#   },
#   {
#     _id: ObjectId("666666666666666666666666"),
#     FechaEnvio: "2022-10-29",
#     Origen: "OF001",
#     Destino: "OF002",
#     TipoEnvio: "TE003",
#     Cliente: "NOP678901PQR234QR",
#     Peso: 35,
#     Dimensiones: {
#       Alto: 45,
#       Ancho: 55,
#       Largo: 65,
#     },
#     CostoTotal: 450.0,
#     Estatus: "entregado",
#   },
#   {
#     _id: ObjectId("777777777777777777777777"),
#     FechaEnvio: "2022-10-30",
#     Origen: "OF002",
#     Destino: "OF003",
#     TipoEnvio: "TE001",
#     Cliente: "PQR789012QRS345ST",
#     Peso: 40,
#     Dimensiones: {
#       Alto: 50,
#       Ancho: 60,
#       Largo: 70,
#     },
#     CostoTotal: 500.0,
#     Estatus: "pendiente",
#   },
#   {
#     _id: ObjectId("888888888888888888888888"),
#     FechaEnvio: "2022-10-31",
#     Origen: "OF003",
#     Destino: "OF004",
#     TipoEnvio: "TE002",
#     Cliente: "QRS890123STU456TU",
#     Peso: 45,
#     Dimensiones: {
#       Alto: 55,
#       Ancho: 65,
#       Largo: 75,
#     },
#     CostoTotal: 550.0,
#     Estatus: "tránsito",
#   },
#   {
#     _id: ObjectId("999999999999999999999999"),
#     FechaEnvio: "2022-11-01",
#     Origen: "OF004",
#     Destino: "OF005",
#     TipoEnvio: "TE003",
#     Cliente: "STU901234TUV567UV",
#     Peso: 50,
#     Dimensiones: {
#       Alto: 60,
#       Ancho: 70,
#       Largo: 80,
#     },
#     CostoTotal: 600.0,
#     Estatus: "entregado",
#   },
#   {
#     _id: ObjectId("101010101010101010101010"),
#     FechaEnvio: "2022-11-02",
#     Origen: "OF005",
#     Destino: "OF001",
#     TipoEnvio: "TE001",
#     Cliente: "TUV012345UVW678VW",
#     Peso: 55,
#     Dimensiones: {
#       Alto: 70,
#       Ancho: 80,
#       Largo: 90,
#     },
#     CostoTotal: 650.0,
#     Estatus: "pendiente",
#   },
#   {
#     _id: ObjectId("121212121212121212121212"),
#     FechaEnvio: "2022-11-09",
#     Origen: "OF003",
#     Destino: "OF001",
#     TipoEnvio: "TE003",
#     Cliente: "GHI345678JKL901LM",
#     Peso: 90,
#     Dimensiones: { Alto: 110, Ancho: 120, Largo: 130 },
#     CostoTotal: 1000.0,
#     Estatus: "tránsito",
#   },
#   {
#     _id: ObjectId("131313131313131313131313"),
#     FechaEnvio: "2022-11-10",
#     Origen: "OF003",
#     Destino: "OF002",
#     TipoEnvio: "TE003",
#     Cliente: "JKL456789LMN012NO",
#     Peso: 95,
#     Dimensiones: { Alto: 115, Ancho: 125, Largo: 135 },
#     CostoTotal: 1050.0,
#     Estatus: "entregado",
#   },
# ])
# EOF
# echo "Escenario de datos configurado."

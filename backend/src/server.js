const express = require("express");
const cors = require("cors");
require("dotenv").config();

const conectarDB = require("./config/db");

const productosRoutes = require("./routes/productos.routes");
const categoriasRoutes = require("./routes/categorias.routes");
const usuariosRoutes = require("./routes/usuarios.routes");

const app = express();

const PORT = process.env.PORT || 3000;

conectarDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    mensaje: "API del Sistema de Inventario funcionando correctamente",
    endpoints: [
      "GET /productos",
      "GET /productos/:id",
      "GET /categorias",
      "GET /categorias/:id",
      "GET /usuarios",
      "GET /usuarios/:id"
    ]
  });
});

app.use("/productos", productosRoutes);
app.use("/categorias", categoriasRoutes);
app.use("/usuarios", usuariosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
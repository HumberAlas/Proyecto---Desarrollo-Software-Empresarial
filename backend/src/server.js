const express = require("express");
const cors = require("cors");
require("dotenv").config();

const conectarDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const productosRoutes = require("./routes/productos.routes");
const categoriasRoutes = require("./routes/categorias.routes");
const usuariosRoutes = require("./routes/usuarios.routes");
const auxiliaresRoutes = require("./routes/auxiliares.routes");
const carritoRoutes = require("./routes/carrito.routes");
const imagenesProductoRoutes = require("./routes/imagenesProducto.routes");
const favoritosRoutes = require("./routes/favoritos.routes");
const metodosPagoRoutes = require("./routes/metodosPago.routes");

const app = express();
const PORT = process.env.PORT || 3000;

conectarDB();

const seedInicial = require("./seed/seedInicial");

conectarDB().then(() => {
  seedInicial();
});

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.get("/", (req, res) => {
  res.json({
    mensaje: "API del Sistema de Inventario funcionando correctamente",
    rutasCompatibles: [
      "POST /usuarios/AutenticarUsuario",
      "POST /usuarios/AutenticarAdministrador",
      "POST /usuarios/CrearUsuario",
      "GET /usuarios",
      "GET /productos/ObtenerTodos",
      "GET /productos/ObtenerporId/:id",
      "POST /productos/InsertarProducto",
      "POST /productos/RegistrarConImagenes",
      "PUT /productos/ActualizarProducto",
      "DELETE /productos/EliminarporId/:id",
      "GET /auxiliares/categorias/todas",
      "GET /auxiliares/marcas/todas",
      "GET /auxiliares/proveedores/todos"
    ]
  });
});

app.use("/auth", authRoutes);
app.use("/productos", productosRoutes);
app.use("/categorias", categoriasRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/carrito", carritoRoutes);
app.use("/auxiliares", auxiliaresRoutes);
app.use("/imagenesProducto", imagenesProductoRoutes);
app.use("/favoritos", favoritosRoutes);
app.use("/metodosPago", metodosPagoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
const express = require("express");
const Producto = require("../models/producto.model");

const verificarToken = require("../middleware/auth.middleware");
const verificarAdmin = require("../middleware/admin.middleware");
const validarIpPermitida = require("../middleware/ip.middleware");

const router = express.Router();

function mapProducto(producto) {
  return {
    productoId: producto._id,
    ProductoId: producto._id,
    nombre: producto.nombre,
    Nombre: producto.nombre,
    descripcion: producto.descripcion,
    Descripcion: producto.descripcion,
    precio: producto.precio,
    Precio: producto.precio,
    stock: producto.stock,
    Stock: producto.stock,
    categoriaId: producto.categoriaId,
    CategoriaId: producto.categoriaId,
    marcaId: producto.marcaId,
    MarcaId: producto.marcaId,
    proveedorId: producto.proveedorId,
    ProveedorId: producto.proveedorId,
    imagen: producto.imagen,
    Imagen: producto.imagen,
    estado: producto.estado,
    Estado: producto.estado
  };
}

// GET moderno
router.get("/", async (req, res) => {
  try {
    const productos = await Producto.find({ estado: true });
    res.json({
      mensaje: "Listado de productos obtenido correctamente",
      total: productos.length,
      data: productos
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener productos", error: error.message });
  }
});

// GET compatible con backend anterior
router.get("/ObtenerTodos", async (req, res) => {
  try {
    const productos = await Producto.find({ estado: true });
    res.json(productos.map(mapProducto));
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener productos", error: error.message });
  }
});

// GET con imagen principal compatible
router.get("/conImagenPrincipal", async (req, res) => {
  try {
    const productos = await Producto.find({ estado: true });
    res.json(productos.map(mapProducto));
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener productos", error: error.message });
  }
});

// GET por ID compatible
router.get("/ObtenerporId/:id", async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);

    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    res.json(mapProducto(producto));
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener producto", error: error.message });
  }
});

// GET moderno por ID
router.get("/:id", async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);

    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    res.json({
      mensaje: "Producto encontrado correctamente",
      data: producto
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener producto", error: error.message });
  }
});

// POST compatible con frontend anterior
router.post("/InsertarProducto", verificarToken, async (req, res) => {
  try {
    const producto = await Producto.create({
      nombre: req.body.nombre || req.body.Nombre,
      descripcion: req.body.descripcion || req.body.Descripcion || "",
      precio: req.body.precio || req.body.Precio,
      stock: req.body.stock || req.body.Stock,
      categoriaId: req.body.categoriaId || req.body.CategoriaId,
      marcaId: req.body.marcaId || req.body.MarcaId,
      proveedorId: req.body.proveedorId || req.body.ProveedorId,
      imagen: req.body.imagen || req.body.Imagen || "",
      estado: true
    });

    res.status(201).json({
      mensaje: "Producto insertado",
      data: mapProducto(producto)
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al insertar producto", error: error.message });
  }
});

// POST compatible con RegistrarConImagenes, sin manejo real de archivo todavía
router.post("/RegistrarConImagenes", validarIpPermitida,
  verificarToken,
  verificarAdmin,
  async (req, res) => {
    try {
      const producto = await Producto.create({
        nombre: req.body.nombre || req.body.Nombre,
        descripcion: req.body.descripcion || req.body.Descripcion || "",
        precio: req.body.precio || req.body.Precio,
        stock: req.body.stock || req.body.Stock,
        categoriaId: req.body.categoriaId || req.body.CategoriaId,
        marcaId: req.body.marcaId || req.body.MarcaId,
        proveedorId: req.body.proveedorId || req.body.ProveedorId,
        imagen: req.body.imagen || req.body.Imagen || "",
        estado: true
      });

      res.status(201).json({
        mensaje: "Producto guardado correctamente",
        data: mapProducto(producto)
      });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al registrar producto", error: error.message });
    }
  });

// PUT compatible
router.put("/ActualizarProducto", 
  validarIpPermitida,
  verificarToken,
  verificarAdmin, 
  async (req, res) => {
  try {
    const id = req.body.productoId || req.body.ProductoId || req.body._id;

    const producto = await Producto.findByIdAndUpdate(
      id,
      {
        nombre: req.body.nombre || req.body.Nombre,
        descripcion: req.body.descripcion || req.body.Descripcion || "",
        precio: req.body.precio || req.body.Precio,
        stock: req.body.stock || req.body.Stock,
        categoriaId: req.body.categoriaId || req.body.CategoriaId,
        marcaId: req.body.marcaId || req.body.MarcaId,
        proveedorId: req.body.proveedorId || req.body.ProveedorId,
        imagen: req.body.imagen || req.body.Imagen || "",
      },
      { new: true }
    );

    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    res.json({
      mensaje: "Producto actualizado",
      data: mapProducto(producto)
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar producto", error: error.message });
  }
});

// DELETE compatible
router.delete("/EliminarporId/:id", 
  validarIpPermitida,
  verificarToken,
  verificarAdmin, 
  async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(
      req.params.id,
      { estado: false },
      { new: true }
    );

    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    res.json({ mensaje: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar producto", error: error.message });
  }
});

module.exports = router;
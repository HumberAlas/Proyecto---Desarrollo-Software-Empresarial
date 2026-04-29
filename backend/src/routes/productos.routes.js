const express = require("express");
const Producto = require("../models/producto.model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const productos = await Producto.find();

    res.json({
      mensaje: "Listado de productos obtenido correctamente",
      total: productos.length,
      data: productos
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener productos",
      error: error.message
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);

    if (!producto) {
      return res.status(404).json({
        mensaje: "Producto no encontrado"
      });
    }

    res.json({
      mensaje: "Producto encontrado correctamente",
      data: producto
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener el producto",
      error: error.message
    });
  }
});

module.exports = router;
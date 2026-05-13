const express = require("express");

const Categoria = require("../models/categoria.model");
const Marca = require("../models/marca.model");
const Proveedor = require("../models/proveedor.model");
const EstadoProducto = require("../models/estadoProducto.model");

const router = express.Router();

router.get("/categorias/todas", async (req, res) => {
  try {
    const categorias = await Categoria.find().sort({ CategoriaID: 1 });

    res.json({
      mensaje: "Categorías obtenidas correctamente",
      total: categorias.length,
      data: categorias
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener categorías",
      error: error.message
    });
  }
});

router.get("/marcas/todas", async (req, res) => {
  try {
    const marcas = await Marca.find().sort({ MarcaID: 1 });

    res.json({
      mensaje: "Marcas obtenidas correctamente",
      total: marcas.length,
      data: marcas
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener marcas",
      error: error.message
    });
  }
});

router.get("/proveedores/todos", async (req, res) => {
  try {
    const proveedores = await Proveedor.find().sort({ ProveedorID: 1 });

    res.json({
      mensaje: "Proveedores obtenidos correctamente",
      total: proveedores.length,
      data: proveedores
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener proveedores",
      error: error.message
    });
  }
});

router.get("/estados-producto/todos", async (req, res) => {
  try {
    const estados = await EstadoProducto.find().sort({ EstadoProductoId: 1 });

    res.json({
      mensaje: "Estados de producto obtenidos correctamente",
      total: estados.length,
      data: estados
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener estados de producto",
      error: error.message
    });
  }
});

module.exports = router;
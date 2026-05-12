const express = require("express");
const Categoria = require("../models/categoria.model");
const Marca = require("../models/marca.model");
const Proveedor = require("../models/proveedor.model");

const router = express.Router();

router.get("/categorias/todas", async (req, res) => {
  try {
    const categorias = await Categoria.find({ estado: true });

    res.json(categorias.map(c => ({
      categoriaId: c._id,
      CategoriaId: c._id,
      nombre: c.nombre,
      Nombre: c.nombre,
      descripcion: c.descripcion,
      Descripcion: c.descripcion
    })));
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener categorías", error: error.message });
  }
});

router.get("/marcas/todas", async (req, res) => {
  try {
    const marcas = await Marca.find({ estado: true });

    res.json(marcas.map(m => ({
      marcaId: m._id,
      MarcaId: m._id,
      nombre: m.nombre,
      Nombre: m.nombre
    })));
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener marcas", error: error.message });
  }
});

router.get("/proveedores/todos", async (req, res) => {
  try {
    const proveedores = await Proveedor.find({ estado: true });

    res.json(proveedores.map(p => ({
      proveedorId: p._id,
      ProveedorId: p._id,
      nombre: p.nombre,
      Nombre: p.nombre,
      telefono: p.telefono,
      Telefono: p.telefono,
      correo: p.correo,
      Correo: p.correo
    })));
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener proveedores", error: error.message });
  }
});

module.exports = router;
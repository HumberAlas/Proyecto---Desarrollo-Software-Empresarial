const express = require("express");
const Usuario = require("../models/usuario.model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const usuarios = await Usuario.find();

    res.json({
      mensaje: "Listado de usuarios obtenido correctamente",
      total: usuarios.length,
      data: usuarios
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener usuarios",
      error: error.message
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);

    if (!usuario) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado"
      });
    }

    res.json({
      mensaje: "Usuario encontrado correctamente",
      data: usuario
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener el usuario",
      error: error.message
    });
  }
});

module.exports = router;

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario.model");
const verificarToken = require("../middleware/auth.middleware");
const validarIpPermitida = require("../middleware/ip.middleware");

const router = express.Router();

router.get("/", verificarToken, async (req, res) => {
  try {
    const usuarios = await Usuario.find().select("-password");

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

router.post("/CrearUsuario", async (req, res) => {
  try {
    const nombre = req.body.nombre || req.body.Nombre;
    const correo = req.body.correo || req.body.Correo;
    const password = req.body.password || req.body.Password || req.body.contrasena || req.body.Contrasena;
    const rol = req.body.rol || req.body.Rol || "Cliente";

    if (!nombre || !correo || !password) {
      return res.status(400).json({
        mensaje: "Nombre, correo y contraseña son obligatorios."
      });
    }

    const existe = await Usuario.findOne({ correo: correo.toLowerCase() });

    if (existe) {
      return res.status(400).json({
        mensaje: "El correo ya está registrado."
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const usuario = await Usuario.create({
      nombre,
      correo: correo.toLowerCase(),
      password: passwordHash,
      rol
    });

    res.status(201).json({
      mensaje: "Usuario creado correctamente",
      usuarioId: usuario._id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol
    });

  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear usuario",
      error: error.message
    });
  }
});

router.post("/AutenticarUsuario", async (req, res) => {
  try {
    const correo = req.body.correo || req.body.Correo;
    const password = req.body.password || req.body.Password || req.body.contrasena || req.body.Contrasena;

    if (!correo || !password) {
      return res.status(400).json({
        mensaje: "Correo y contraseña son obligatorios."
      });
    }

    const usuario = await Usuario.findOne({ correo: correo.toLowerCase() });

    if (!usuario) {
      return res.status(401).json({
        mensaje: "Credenciales inválidas."
      });
    }

    const passwordValida = await bcrypt.compare(password, usuario.password);

    if (!passwordValida) {
      return res.status(401).json({
        mensaje: "Credenciales inválidas."
      });
    }

    const token = jwt.sign(
      {
        id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "2h"
      }
    );

    res.json({
      mensaje: "Autenticación correcta",
      token,
      usuarioId: usuario._id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol
    });

  } catch (error) {
    res.status(500).json({
      mensaje: "Error al autenticar usuario",
      error: error.message
    });
  }
});

router.post("/AutenticarAdministrador", validarIpPermitida, async (req, res) => {
  try {
    const correo = req.body.correo || req.body.Correo;
    const password = req.body.password || req.body.Password || req.body.contrasena || req.body.Contrasena;

    if (!correo || !password) {
      return res.status(400).json({
        mensaje: "Correo y contraseña son obligatorios."
      });
    }

    const usuario = await Usuario.findOne({ correo: correo.toLowerCase() });

    if (!usuario) {
      return res.status(401).json({
        mensaje: "Credenciales inválidas."
      });
    }

    const passwordValida = await bcrypt.compare(password, usuario.password);

    if (!passwordValida) {
      return res.status(401).json({
        mensaje: "Credenciales inválidas."
      });
    }

    if (usuario.rol !== "Administrador") {
      return res.status(403).json({
        mensaje: "Acceso denegado"
      });
    }

    const token = jwt.sign(
      {
        id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "2h"
      }
    );

    res.json({
      mensaje: "Autenticación de administrador correcta",
      token,
      usuarioId: usuario._id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol
    });

  } catch (error) {
    res.status(500).json({
      mensaje: "Error al autenticar administrador",
      error: error.message
    });
  }
});

router.get("/ObtenerUsuarioPorId/:id", verificarToken, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select("-password");

    if (!usuario) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado."
      });
    }

    res.json({
      mensaje: "Usuario obtenido correctamente.",
      data: usuario
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener usuario.",
      error: error.message
    });
  }
});

router.put("/ActualizarUsuario", verificarToken, async (req, res) => {
  try {
    const usuarioId = req.body.UsuarioID || req.body.usuarioId || req.usuario.id;

    const usuario = await Usuario.findByIdAndUpdate(
      usuarioId,
      {
        nombre: req.body.nombre,
        correo: req.body.correo,
        direccion: req.body.direccion,
        contacto: req.body.contacto
      },
      { new: true }
    ).select("-password");

    if (!usuario) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado."
      });
    }

    res.json({
      mensaje: "Usuario actualizado correctamente.",
      data: usuario
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar usuario.",
      error: error.message
    });
  }
});

router.put("/CambiarPassword", verificarToken, async (req, res) => {
  try {
    const bcrypt = require("bcryptjs");

    const usuarioId = req.body.UsuarioID || req.body.usuarioId || req.usuario.id;
    const passwordActual = req.body.passwordActual;
    const nuevaPassword = req.body.nuevaPassword;

    if (!passwordActual || !nuevaPassword) {
      return res.status(400).json({
        mensaje: "Debe ingresar la contraseña actual y la nueva contraseña."
      });
    }

    const usuario = await Usuario.findById(usuarioId);

    if (!usuario) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado."
      });
    }

    const passwordValida = await bcrypt.compare(passwordActual, usuario.password);

    if (!passwordValida) {
      return res.status(401).json({
        mensaje: "La contraseña actual es incorrecta."
      });
    }

    usuario.password = await bcrypt.hash(nuevaPassword, 10);
    await usuario.save();

    res.json({
      mensaje: "Contraseña actualizada correctamente."
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al cambiar contraseña.",
      error: error.message
    });
  }
});

module.exports = router;
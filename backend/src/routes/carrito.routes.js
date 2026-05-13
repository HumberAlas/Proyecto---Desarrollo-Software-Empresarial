const express = require("express");

const Carrito = require("../models/carrito.model");
const Producto = require("../models/producto.model");
const EstadoProducto = require("../models/estadoProducto.model");
const Usuario = require("../models/usuario.model");

const verificarToken = require("../middleware/auth.middleware");
const verificarAdmin = require("../middleware/admin.middleware");
const validarIpPermitida = require("../middleware/ip.middleware");

const router = express.Router();

async function mapearItemCarrito(item) {
  const producto = await Producto.findOne({ ProductoID: item.ProductoID });
  const estado = await EstadoProducto.findOne({
    EstadoProductoId: item.EstadoProductoId
  });

  return {
    _id: item._id,
    CarritoID: item.CarritoID,
    UsuarioID: item.UsuarioID,
    ProductoID: item.ProductoID,
    NombreProducto: producto ? producto.Nombre : "",
    Imagen: producto ? producto.Imagen : "",
    Cantidad: item.Cantidad,
    PrecioUnitario: item.PrecioUnitario,
    FechaCompra: item.FechaCompra,
    EstadoProductoId: item.EstadoProductoId,
    EstadoProducto: estado ? estado.NombreEstado : ""
  };
}

router.post("/agregar", verificarToken, async (req, res) => {
  try {
    const usuarioId = req.body.UsuarioID || req.usuario.id;
    const productoId = Number(req.body.ProductoID || req.body.productoId);
    const cantidad = Number(req.body.Cantidad || req.body.cantidad || 1);

    const producto = await Producto.findOne({ ProductoID: productoId });

    if (!producto) {
      return res.status(404).json({
        mensaje: "Producto no encontrado"
      });
    }

    const itemExistente = await Carrito.findOne({
      UsuarioID: usuarioId,
      ProductoID: productoId,
      EstadoProductoId: 1
    });

    if (itemExistente) {
      itemExistente.Cantidad += cantidad;
      await itemExistente.save();

      return res.json({
        mensaje: "Cantidad actualizada en carrito",
        data: itemExistente
      });
    }

    const ultimoItem = await Carrito.findOne().sort({ CarritoID: -1 });
    const nuevoCarritoID = ultimoItem ? ultimoItem.CarritoID + 1 : 1;

    const item = await Carrito.create({
      CarritoID: nuevoCarritoID,
      UsuarioID: usuarioId,
      ProductoID: productoId,
      Cantidad: cantidad,
      PrecioUnitario: producto.Precio,
      FechaCompra: null,
      EstadoProductoId: 1
    });

    res.status(201).json({
      mensaje: "Producto agregado al carrito",
      data: item
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al agregar producto al carrito",
      error: error.message
    });
  }
});

router.get("/usuario/:usuarioId/pendientes", verificarToken, async (req, res) => {
  try {
    const items = await Carrito.find({
      UsuarioID: req.params.usuarioId,
      EstadoProductoId: 1
    }).sort({ CarritoID: 1 });

    const data = await Promise.all(items.map((item) => mapearItemCarrito(item)));

    res.json({
      mensaje: "Carrito pendiente obtenido correctamente",
      total: data.length,
      data
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener carrito pendiente",
      error: error.message
    });
  }
});

router.get("/usuario/:usuarioId/pedidos", verificarToken, async (req, res) => {
  try {
    const items = await Carrito.find({
      UsuarioID: req.params.usuarioId,
      EstadoProductoId: { $in: [2, 3, 4] }
    }).sort({ FechaCompra: -1 });

    const data = await Promise.all(items.map((item) => mapearItemCarrito(item)));

    res.json({
      mensaje: "Pedidos activos obtenidos correctamente",
      total: data.length,
      data
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener pedidos activos",
      error: error.message
    });
  }
});

router.get("/usuario/:usuarioId/historial", verificarToken, async (req, res) => {
  try {
    const items = await Carrito.find({
      UsuarioID: req.params.usuarioId,
      EstadoProductoId: 5
    }).sort({ FechaCompra: -1 });

    const data = await Promise.all(items.map((item) => mapearItemCarrito(item)));

    res.json({
      mensaje: "Historial obtenido correctamente",
      total: data.length,
      data
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener historial",
      error: error.message
    });
  }
});

router.put("/finalizar-compra/:usuarioId", verificarToken, async (req, res) => {
  try {
    const resultado = await Carrito.updateMany(
      {
        UsuarioID: req.params.usuarioId,
        EstadoProductoId: 1
      },
      {
        EstadoProductoId: 2,
        FechaCompra: new Date()
      }
    );

    res.json({
      mensaje: "Compra finalizada correctamente",
      data: resultado
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al finalizar compra",
      error: error.message
    });
  }
});

router.get(
  "/admin/pedidos",
  validarIpPermitida,
  verificarToken,
  verificarAdmin,
  async (req, res) => {
    try {
      const items = await Carrito.find({
        EstadoProductoId: { $in: [2, 3, 4, 5] }
      }).sort({ FechaCompra: -1 });

      const data = [];

      for (const item of items) {
        const usuario = await Usuario.findById(item.UsuarioID).select("-password");
        const itemMapeado = await mapearItemCarrito(item);

        data.push({
          ...itemMapeado,
          Usuario: usuario
            ? {
                _id: usuario._id,
                nombre: usuario.nombre,
                correo: usuario.correo
              }
            : null
        });
      }

      res.json({
        mensaje: "Pedidos administrativos obtenidos correctamente",
        total: data.length,
        data
      });
    } catch (error) {
      res.status(500).json({
        mensaje: "Error al obtener pedidos administrativos",
        error: error.message
      });
    }
  }
);

router.put(
  "/avanzar-estado/:carritoId",
  validarIpPermitida,
  verificarToken,
  verificarAdmin,
  async (req, res) => {
    try {
      const item = await Carrito.findOne({
        $or: [
          { _id: req.params.carritoId.match(/^[0-9a-fA-F]{24}$/) ? req.params.carritoId : null },
          { CarritoID: Number(req.params.carritoId) }
        ]
      });

      if (!item) {
        return res.status(404).json({
          mensaje: "Pedido no encontrado"
        });
      }

      if (item.EstadoProductoId < 5) {
        item.EstadoProductoId += 1;
      }

      if (!item.FechaCompra) {
        item.FechaCompra = new Date();
      }

      await item.save();

      res.json({
        mensaje: "Estado del pedido actualizado correctamente",
        data: item
      });
    } catch (error) {
      res.status(500).json({
        mensaje: "Error al avanzar estado del pedido",
        error: error.message
      });
    }
  }
);

module.exports = router;
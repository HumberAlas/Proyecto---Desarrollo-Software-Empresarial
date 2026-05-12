const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    descripcion: {
      type: String,
      trim: true
    },
    precio: {
      type: Number,
      required: true,
      min: 0
    },
    stock: {
      type: Number,
      required: true,
      min: 0
    },
    categoriaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categoria"
    },
    marcaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Marca"
    },
    proveedorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Proveedor"
    },
    imagen: {
      type: String,
      default: ""
    },
    estado: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Producto", productoSchema);
const mongoose = require("mongoose");

const proveedorSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    telefono: {
      type: String,
      default: ""
    },
    correo: {
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

module.exports = mongoose.model("Proveedor", proveedorSchema);
<<<<<<< HEAD
const mongoose = require("mongoose");

const metodoPagoSchema = new mongoose.Schema(
  {
    MetodoPagoID: {
      type: Number,
      required: true,
      unique: true
    },
    UsuarioID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true
    },
    TipoTarjeta: {
      type: String,
      enum: ["Crédito", "Débito"],
      required: true
    },
    Titular: {
      type: String,
      required: true,
      trim: true
    },
    UltimosDigitos: {
      type: String,
      required: true,
      maxlength: 4
    },
    Expiracion: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

=======
const mongoose = require("mongoose");

const metodoPagoSchema = new mongoose.Schema(
  {
    MetodoPagoID: {
      type: Number,
      required: true,
      unique: true
    },
    UsuarioID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true
    },
    TipoTarjeta: {
      type: String,
      enum: ["Crédito", "Débito"],
      required: true
    },
    Titular: {
      type: String,
      required: true,
      trim: true
    },
    UltimosDigitos: {
      type: String,
      required: true,
      maxlength: 4
    },
    Expiracion: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

>>>>>>> 2d2df73c1ec3a3bb4ba8321b4b3c7d3ee12d8ba7
module.exports = mongoose.model("MetodoPago", metodoPagoSchema);
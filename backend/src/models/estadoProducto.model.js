<<<<<<< HEAD
const mongoose = require("mongoose");

const estadoProductoSchema = new mongoose.Schema(
  {
    EstadoProductoId: {
      type: Number,
      required: true,
      unique: true
    },
    NombreEstado: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

=======
const mongoose = require("mongoose");

const estadoProductoSchema = new mongoose.Schema(
  {
    EstadoProductoId: {
      type: Number,
      required: true,
      unique: true
    },
    NombreEstado: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

>>>>>>> 2d2df73c1ec3a3bb4ba8321b4b3c7d3ee12d8ba7
module.exports = mongoose.model("EstadoProducto", estadoProductoSchema);
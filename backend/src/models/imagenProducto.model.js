<<<<<<< HEAD
const mongoose = require("mongoose");

const imagenProductoSchema = new mongoose.Schema(
  {
    IdImagen: {
      type: Number,
      required: true,
      unique: true
    },
    ProductoID: {
      type: Number,
      required: true
    },
    UrlImagen: {
      type: String,
      required: true
    },
    EsPrincipal: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

=======
const mongoose = require("mongoose");

const imagenProductoSchema = new mongoose.Schema(
  {
    IdImagen: {
      type: Number,
      required: true,
      unique: true
    },
    ProductoID: {
      type: Number,
      required: true
    },
    UrlImagen: {
      type: String,
      required: true
    },
    EsPrincipal: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

>>>>>>> 2d2df73c1ec3a3bb4ba8321b4b3c7d3ee12d8ba7
module.exports = mongoose.model("ImagenProducto", imagenProductoSchema);
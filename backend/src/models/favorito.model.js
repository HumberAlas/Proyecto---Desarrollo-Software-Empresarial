<<<<<<< HEAD
const mongoose = require("mongoose");

const favoritoSchema = new mongoose.Schema(
  {
    FavoritoID: {
      type: Number,
      required: true,
      unique: true
    },
    UsuarioID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true
    },
    ProductoID: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

favoritoSchema.index(
  {
    UsuarioID: 1,
    ProductoID: 1
  },
  {
    unique: true
  }
);

=======
const mongoose = require("mongoose");

const favoritoSchema = new mongoose.Schema(
  {
    FavoritoID: {
      type: Number,
      required: true,
      unique: true
    },
    UsuarioID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true
    },
    ProductoID: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

favoritoSchema.index(
  {
    UsuarioID: 1,
    ProductoID: 1
  },
  {
    unique: true
  }
);

>>>>>>> 2d2df73c1ec3a3bb4ba8321b4b3c7d3ee12d8ba7
module.exports = mongoose.model("Favorito", favoritoSchema);
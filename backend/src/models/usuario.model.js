const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    correo: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true
    },
    password: {
      type: String,
<<<<<<< HEAD
      required: function () {
        return this.metodoLogin !== "Google";
      },
      default: null
=======
      required: true
>>>>>>> 2d2df73c1ec3a3bb4ba8321b4b3c7d3ee12d8ba7
    },
    rol: {
      type: String,
      enum: ["Cliente", "Administrador", "Product Owner", "Scrum Master", "Developer"],
      default: "Cliente"
<<<<<<< HEAD
    },
    googleId: {
      type: String,
      default: null
    },
    metodoLogin: {
      type: String,
      enum: ["Propio", "Google"],
      default: "Propio"
=======
>>>>>>> 2d2df73c1ec3a3bb4ba8321b4b3c7d3ee12d8ba7
    }

  },
  {
    timestamps: true
  }
);

<<<<<<< HEAD
module.exports = mongoose.model("Usuario", usuarioSchema);
=======
module.exports = mongoose.model("Usuario", usuarioSchema);

>>>>>>> 2d2df73c1ec3a3bb4ba8321b4b3c7d3ee12d8ba7

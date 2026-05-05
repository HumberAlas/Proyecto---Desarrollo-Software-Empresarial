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
      lowercase: true
    },
    rol: {
      type: String,
      required: true,
      enum: ["Product Owner", "Scrum Master", "Developer", "Administrador"]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Usuario", usuarioSchema);
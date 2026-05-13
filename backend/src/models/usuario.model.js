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
      required: true
    },
    rol: {
      type: String,
      enum: ["Cliente", "Administrador", "Product Owner", "Scrum Master", "Developer"],
      default: "Cliente"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Usuario", usuarioSchema);

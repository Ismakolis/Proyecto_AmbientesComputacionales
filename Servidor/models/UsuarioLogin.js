// models/UsuarioLogin.js

const mongoose = require('mongoose');

const usuarioLoginSchema = mongoose.Schema({
  correo: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  telefono: { type: String },  
  rol: { type: String, default: 'cliente' }
}, {
  collection: 'usuarios',
  timestamps: true
});
module.exports = mongoose.model('UsuarioLogin', usuarioLoginSchema);

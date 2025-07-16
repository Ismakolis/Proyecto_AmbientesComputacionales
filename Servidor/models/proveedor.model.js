const mongoose = require('mongoose');

const ProveedorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  telefono: { type: String },
  email: { type: String },
  direccion: { type: String }
});

module.exports = mongoose.model('Proveedor', ProveedorSchema);

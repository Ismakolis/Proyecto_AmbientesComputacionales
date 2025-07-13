const mongoose = require('mongoose');

const categoriaSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: false
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
}
});

module.exports = mongoose.model('Categoria', categoriaSchema);

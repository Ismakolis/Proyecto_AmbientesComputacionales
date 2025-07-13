const mongoose =  require('mongoose');

const ProductoSchemas = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    oferta: {
        type: Number
    },
    descripcion: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria', 
        required: true
    },
    imagen: {
        type: String 
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Producto', ProductoSchemas);

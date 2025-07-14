const mongoose = require('mongoose');

const CarritoSchema = mongoose.Schema({
    producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    fechaAgregado: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Carrito', CarritoSchema);

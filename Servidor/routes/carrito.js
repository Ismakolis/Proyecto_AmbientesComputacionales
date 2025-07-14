const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');
const verificarToken = require('../middleware/auth');

// Rutas específicas primero
router.delete('/vaciar', carritoController.vaciarCarrito);

// Rutas con parámetros dinámicos después
router.post('/', carritoController.agregarAlCarrito);
router.get('/', carritoController.obtenerCarrito);
router.delete('/:id', carritoController.eliminarDelCarrito);
router.put('/:id', carritoController.cambiarCantidad);

module.exports = router;

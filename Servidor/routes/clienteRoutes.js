const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// Obtener todos los clientes
router.get('/', clienteController.obtenerClientes);

// Obtener clientes por rol (cliente o admin)
router.get('/rol/:rol', clienteController.obtenerClientesPorRol);

// Actualizar cliente
router.put('/:id', clienteController.actualizarCliente);

// Eliminar cliente
router.delete('/:id', clienteController.eliminarCliente);

module.exports = router;

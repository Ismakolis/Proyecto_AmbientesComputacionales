//rutas para el producto
const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');


//api/misProductos
// traer los datos de los productos mediante un get (producto controller)
router.get('/',productosController.obtenerProductos);
// Obtener productos por categoría
router.get('/categoria/:idCategoria', productosController.obtenerProductosPorCategoria);


module.exports = router;
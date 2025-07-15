//rutas para misProductos
const express = require('express');
const router = express.Router();
const usuarioRegistroController = require('../controllers/usuarioRegistroController');

router.post('/register', usuarioRegistroController.crearUsuario);
//  Ruta para obtener un usuario por ID
router.get('/get/:id', usuarioRegistroController.obtenerUsuarioPorId);
// **AGREGA ESTA RUTA PARA ACTUALIZAR:**
router.put('/update/:id', usuarioRegistroController.actualizarUsuario);

module.exports = router;
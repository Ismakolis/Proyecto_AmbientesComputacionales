//rutas para misProductos
const express = require('express');
const router = express.Router();
const usuarioLoginController = require('../controllers/usuarioLoginController');

//api/productos
// routes/usuarioLogin.js

router.post('/login', usuarioLoginController.loginUsuario);


module.exports = router;
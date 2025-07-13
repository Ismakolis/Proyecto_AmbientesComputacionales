const express = require('express');
const router = express.Router();

const verificarToken = require('../middleware/auth');
const usuarioController = require('../controllers/usuarioController');


router.get('/usuarios', usuarioController.getUsuarios);

router.get('/usuarios/:correo', usuarioController.getUsuarioPorCorreo);

router.get('/usuarioSesion', verificarToken, usuarioController.getUsuarioSesion);

module.exports = router;

const express = require('express');
const router = express.Router();
const PagoController = require('../controllers/pagoController');


// Ruta POST para iniciar el pago
router.post('/pago', PagoController.generarPago);

module.exports = router;

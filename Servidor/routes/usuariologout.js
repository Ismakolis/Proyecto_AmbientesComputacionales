const express = require('express');
const router = express.Router();
const usariologoutController = require('../controllers/logoutController');


router.post('/', usariologoutController.logoutUsuario);


module.exports = router;
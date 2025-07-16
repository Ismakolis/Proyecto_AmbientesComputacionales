const express = require('express');
const router = express.Router();
const proveedorCtrl = require('../controllers/proveedor.controller');

router.get('/', proveedorCtrl.obtenerProveedores);
router.post('/', proveedorCtrl.crearProveedor);
router.put('/:id', proveedorCtrl.actualizarProveedor);
router.delete('/:id', proveedorCtrl.eliminarProveedor);

module.exports = router;

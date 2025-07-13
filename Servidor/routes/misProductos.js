//rutas para misProductos
const express = require('express');
const router = express.Router();
const misProductosController = require('../controllers/misProductosController');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir: './uploads' }); // Carpeta donde guardarás imágenes
const path = require('path');
const fs = require('fs');


//api/productos
//enviar o ingresar un producto a la base de datos mediante un post (producto controller)
router.post('/', misProductosController.crearProducto);

// traer los datos de los productos mediante un get (producto controller)
router.get('/',misProductosController.obtenerProductos);
// actualñizar productos
router.put('/:id',misProductosController.actualizarProducto);
//obtener producto por su id 
router.get('/:id',misProductosController.obtenerProducto);
//eliminar el producto
router.delete('/:id',misProductosController.eliminarProducto);
// subir imagenes
router.post('/subir-imagen/:id', multipartMiddleware, misProductosController.subirImagen);
// obtener imagenes
router.get('/get-imagen/:imagen', (req, res) => {
    const imagen = req.params.imagen;
    const ruta = path.resolve('./uploads/' + imagen);

    fs.exists(ruta, (exists) => {
        if (exists) {
            res.sendFile(ruta);
        } else {
            res.status(404).send({ message: 'La imagen no existe' });
        }
    });
});




module.exports = router;

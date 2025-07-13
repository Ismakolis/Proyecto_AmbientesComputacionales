const Producto = require("../models/Producto");
const fs = require('fs');
const path = require('path');


exports.crearProducto = async (req, res) => {
    try {
        let producto;
        //creamos nuestro producto
        producto = new Producto(req.body);

        await producto.save();
        res.send(producto);

    } catch (error) {
        console.log(error);
        res.status(500).send('HUBO UN ERROR')
    }

}

exports.obtenerProductos = async (req, res) => {

    try {
    
        const productos = await Producto.find().populate('categoria');
        res.json(productos)

    } catch (error) {
        console.log(error);
        res.status(500).send('HUBO UN ERROR')
    }
}

exports.actualizarProducto = async (req, res) => {
    try {
        const { nombre, oferta, descripcion, precio, stock } = req.body;
        let producto = await Producto.findById(req.params.id);

        if (!producto) {
            res.status(404).json({ msg: 'No existe el producto' })
        }
        producto.nombre = nombre;
        producto.oferta = oferta;
        producto.descripcion = descripcion;
        producto.precio = precio;
        producto.stock = stock;

        producto = await Producto.findOneAndUpdate({ _id: req.params.id }, producto, { new: true })
        res.json(producto);

    } catch (error) {
        console.log(error);
        res.status(500).send('HUBO UN ERROR')
    }
}

exports.obtenerProducto = async (req, res) => {
    try {

        let producto = await Producto.findById(req.params.id);

        if (!producto) {
            res.status(404).json({ msg: 'No existe el producto' })
        }
        res.json(producto);

    } catch (error) {
        console.log(error);
        res.status(500).send('HUBO UN ERROR')
    }
}

exports.eliminarProducto = async (req, res) => {
    try {

        let producto = await Producto.findById(req.params.id);

        if (!producto) {
            res.status(404).json({ msg: 'No existe el producto' })
        }

        await Producto.findOneAndDelete({ _id: req.params.id });
        res.json({ msg: 'Producto eliminado con exito' });

    } catch (error) {
        console.log(error);
        res.status(500).send('HUBO UN ERROR')
    }
}

exports.subirImagen = async (req, res) => {
    const productoId = req.params.id;

    if (!req.files || !req.files.imagen) {
        return res.status(400).send({ message: 'No se ha subido ninguna imagen' });
    }

    const filePath = req.files.imagen.path;
    const fileSplit = filePath.split(/[\/\\]/); // compatible Windows/Linux
    const fileName = fileSplit[fileSplit.length - 1];

    const extSplit = fileName.split('\.');
    const fileExt = extSplit[extSplit.length - 1].toLowerCase();

    if (!['png', 'jpg', 'jpeg', 'gif'].includes(fileExt)) {
        fs.unlink(filePath, () => {});
        return res.status(400).send({ message: 'Extensión de archivo no válida' });
    }

    try {
        const producto = await Producto.findByIdAndUpdate(
            productoId,
            { imagen: fileName },
            { new: true }
        );

        if (!producto) {
            fs.unlink(filePath, () => {});
            return res.status(404).send({ message: 'Producto no encontrado' });
        }

        return res.status(200).send({ producto });

    } catch (error) {
        fs.unlink(filePath, () => {});
        return res.status(500).send({ message: 'Error al subir la imagen', error });
    }
}
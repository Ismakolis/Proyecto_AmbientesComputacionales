const Producto = require("../models/Producto");

exports.obtenerProductos = async (req, res) => {

    try {

        const productos = await Producto.find();
        res.json(productos)

    } catch (error) {
        console.log(error);
        res.status(500).send('HUBO UN ERROR')
    }
    
}

exports.obtenerProductosPorCategoria = async (req, res) => {
    try {
        const { idCategoria } = req.params;

        const productos = await Producto.find({ categoria: idCategoria }).populate('categoria');

        res.json(productos);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al obtener productos por categoría');
    }
};


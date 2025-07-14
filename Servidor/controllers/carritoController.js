const Carrito = require('../models/Carrito');
const Producto = require('../models/Producto');

exports.agregarAlCarrito = async (req, res) => {
    const { productoId, cantidad } = req.body;

    try {
        const producto = await Producto.findById(productoId);
        if (!producto || producto.stock < cantidad) {
            return res.status(400).json({ msg: 'Stock insuficiente o producto no existe' });
        }

        producto.stock -= cantidad;
        await producto.save();

        let item = await Carrito.findOne({ producto: productoId });
        if (item) {
            item.cantidad += cantidad;
        } else {
            item = new Carrito({ producto: productoId, cantidad });
        }
        await item.save();

        res.json(item);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

exports.obtenerCarrito = async (req, res) => {
    try {
        const items = await Carrito.find().populate('producto');
        res.json(items);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

exports.eliminarDelCarrito = async (req, res) => {
  try {
    const item = await Carrito.findById(req.params.id);
    
    // Si no existe el item en el carrito, solo respondemos con mensaje
    if (!item) {
      return res.status(404).json({ msg: 'Item no encontrado, posiblemente ya fue eliminado' });
    }

    const producto = await Producto.findById(item.producto);

    // Si no existe el producto relacionado, eliminamos el item para limpiar carrito
    if (!producto) {
      await Carrito.findByIdAndDelete(req.params.id);
      return res.status(200).json({ msg: 'Producto no encontrado, item eliminado del carrito para limpieza' });
    }

    // Si todo está bien, restauramos stock y eliminamos item
    producto.stock += item.cantidad;
    await producto.save();

    await Carrito.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Item eliminado del carrito correctamente' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};



exports.cambiarCantidad = async (req, res) => {
    const { cantidad } = req.body;

    try {
        let item = await Carrito.findById(req.params.id);
        if (!item) return res.status(404).json({ msg: 'Item no encontrado' });

        const producto = await Producto.findById(item.producto);
        const diferencia = cantidad - item.cantidad;

        if (producto.stock < diferencia) return res.status(400).json({ msg: 'Stock insuficiente' });

        producto.stock -= diferencia;
        await producto.save();

        item.cantidad = cantidad;
        await item.save();

        res.json(item);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};
exports.vaciarCarrito = async (req, res) => {
  try {

    await Carrito.deleteMany();

    res.json({ msg: 'Carrito vaciado correctamente y productos descontados del stock' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al vaciar el carrito');
  }
};


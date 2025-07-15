const Cliente = require('../models/UsuarioLogin');

// Obtener todos los clientes (incluye administradores)
exports.obtenerClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find().select('-contrasena');
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener clientes', error });
  }
};

// Filtrar por rol (cliente o admin)
exports.obtenerClientesPorRol = async (req, res) => {
  try {
    const rol = req.params.rol;
    const clientes = await Cliente.find({ rol }).select('-contrasena');
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener clientes por rol', error });
  }
};

// Actualizar cliente
exports.actualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, correo, telefono, rol } = req.body;

    const clienteActualizado = await Cliente.findByIdAndUpdate(
      id,
      { nombre, apellido, correo, telefono, rol },
      { new: true, runValidators: true }
    ).select('-contrasena');

    if (!clienteActualizado) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    res.json(clienteActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar cliente', error });
  }
};

// Eliminar cliente
exports.eliminarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const clienteEliminado = await Cliente.findByIdAndDelete(id);

    if (!clienteEliminado) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    res.json({ mensaje: 'Cliente eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar cliente', error });
  }
};

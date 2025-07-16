const Proveedor = require('../models/proveedor.model');

exports.obtenerProveedores = async (req, res) => {
  const proveedores = await Proveedor.find();
  res.json(proveedores);
};

exports.crearProveedor = async (req, res) => {
  const nuevoProveedor = new Proveedor(req.body);
  await nuevoProveedor.save();
  res.json({ mensaje: 'Proveedor creado' });
};

exports.actualizarProveedor = async (req, res) => {
  await Proveedor.findByIdAndUpdate(req.params.id, req.body);
  res.json({ mensaje: 'Proveedor actualizado' });
};

exports.eliminarProveedor = async (req, res) => {
  await Proveedor.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Proveedor eliminado' });
};

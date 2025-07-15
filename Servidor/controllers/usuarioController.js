const UsuarioLogin = require('../models/UsuarioLogin');


exports.getUsuarios = async (req, res) => {
  try {
    const usuarios = await UsuarioLogin.find({}, '-contrasena'); 
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
};

exports.getUsuarioSesion = async (req, res) => {
  try {
    const usuario = await UsuarioLogin.findById(req.usuario.id).select('-contrasena');
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuario de la sesión', error });
  }
};


exports.getUsuarioPorCorreo = async (req, res) => {
  const correo = req.params.correo;
  try {
    const usuario = await UsuarioLogin.findOne({ correo }, '-contrasena');
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar usuario', error });
  }
};
exports.obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await UsuarioLogin.findById(req.params.id).select('-contrasena');
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener usuario' });
  }
};

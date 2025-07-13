const UsuarioLogin = require ("../models/UsuarioLogin");
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.loginUsuario = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    const usuario = await UsuarioLogin.findOne({ correo });
    if (!usuario) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

    const passwordMatch = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!passwordMatch) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

    //  Crear token
    const token = jwt.sign(
      { id: usuario._id, correo: usuario.correo },
      process.env.JWT_SECRET || 'clave_por_defecto',
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    //  Enviar cookie segura
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'Strict',
      maxAge: 60 * 60 * 1000,
        path: '/'
    });

   
    res.json({
      usuario: {
        correo: usuario.correo,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        telefono: usuario.telefono,
        rol: usuario.rol
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('Hubo un error en el servidor');
  }
};

exports.getUsuarioSesion = async (req, res) => {
  try {
    const usuario = await UsuarioLogin.findById(req.usuario.id).select('-contrasena');
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuario', error });
  }
};

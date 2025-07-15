const bcrypt = require('bcryptjs');
const UsuarioLogin = require("../models/UsuarioLogin");

exports.crearUsuario = async (req, res) => {
    try {
        const { correo, contrasena, nombre, apellido, telefono } = req.body;

        if (!correo || !contrasena || !nombre || !apellido) {
            return res.status(400).json({ mensaje: 'Todos los campos obligatorios deben estar completos' });
        }

        const usuarioExistente = await UsuarioLogin.findOne({ correo });
        if (usuarioExistente) {
            return res.status(400).json({ mensaje: 'El usuario ya existe' });
        }

        const salt = await bcrypt.genSalt(10);
        const contrasenaHasheada = await bcrypt.hash(contrasena, salt);

        const nuevoUsuario = new UsuarioLogin({
            correo,
            contrasena: contrasenaHasheada,
            nombre,
            apellido,
            telefono
        });

        await nuevoUsuario.save();

        res.status(201).json({ mensaje: 'Usuario registrado correctamente', usuario: nuevoUsuario });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Hubo un error en el servidor' });
    }
};
// Obtener un usuario por su ID
exports.obtenerUsuarioPorId = async (req, res) => {
    try {
      const usuario = await UsuarioLogin.findById(req.params.id).select('-contrasena');
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
      res.json(usuario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener el usuario' });
    }
  };
  exports.actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const datosActualizados = req.body;
  
    try {
      const usuarioActualizado = await UsuarioLogin.findByIdAndUpdate(id, datosActualizados, { new: true });
      if (!usuarioActualizado) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
      res.json(usuarioActualizado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al actualizar el usuario' });
    }
  };
  
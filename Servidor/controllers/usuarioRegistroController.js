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

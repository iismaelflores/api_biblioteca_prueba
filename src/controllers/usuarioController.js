const Usuario = require('../models/usuarioModel');

// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear un nuevo usuario
const crearUsuario = async (req, res) => {
  const usuario = new Usuario({
    nombre: req.body.nombre,
    email: req.body.email,
    edad: req.body.edad
  });

  try {
    const nuevoUsuario = await usuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Obtener un usuario por ID
const obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (usuario === null) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Actualizar un usuario por ID
const actualizarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (usuario === null) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    if (req.body.nombre != null) {
      usuario.nombre = req.body.nombre;
    }
    if (req.body.email != null) {
      usuario.email = req.body.email;
    }
    if (req.body.edad != null) {
      usuario.edad = req.body.edad;
    }
    const usuarioActualizado = await usuario.save();
    res.json(usuarioActualizado);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar un usuario por ID
const eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (usuario === null) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    await usuario.deleteOne();
    res.json({ message: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  obtenerUsuarios,
  crearUsuario,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario
};
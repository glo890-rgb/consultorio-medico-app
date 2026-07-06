const express = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const router = express.Router();

// Registro
router.post('/registro', async (req, res) => {
  try {
    const { nombre, apellido, email, contraseña, telefono, tipo, especialidad, numeroLicencia } = req.body;

    // Validaciones básicas
    if (!nombre || !apellido || !email || !contraseña || !telefono || !tipo) {
      return res.status(400).json({ 
        success: false,
        error: 'Por favor completa todos los campos requeridos' 
      });
    }

    // Verificar si el email ya existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ 
        success: false,
        error: 'El email ya está registrado' 
      });
    }

    // Validaciones específicas para doctores
    if (tipo === 'doctor') {
      if (!especialidad || !numeroLicencia) {
        return res.status(400).json({ 
          success: false,
          error: 'Los doctores deben proporcionar especialidad y número de licencia' 
        });
      }
    }

    // Crear nuevo usuario
    const usuario = new Usuario({
      nombre,
      apellido,
      email,
      contraseña,
      telefono,
      tipo,
      ...(tipo === 'doctor' && { 
        especialidad, 
        numeroLicencia,
        precioConsulta: 50 
      })
    });

    await usuario.save();

    // Generar token JWT
    const token = jwt.sign(
      { id: usuario._id, tipo: usuario.tipo, nombre: usuario.nombreCompleto },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.status(201).json({
      success: true,
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombreCompleto,
        email: usuario.email,
        tipo: usuario.tipo,
        especialidad: usuario.especialidad
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, contraseña } = req.body;

    if (!email || !contraseña) {
      return res.status(400).json({ 
        success: false,
        error: 'Por favor ingresa email y contraseña' 
      });
    }

    // Buscar usuario y obtener contraseña (normalmente no se retorna)
    const usuario = await Usuario.findOne({ email }).select('+contraseña');

    if (!usuario || !await usuario.compararContraseña(contraseña)) {
      return res.status(401).json({ 
        success: false,
        error: 'Email o contraseña incorrectos' 
      });
    }

    if (usuario.estado === 'suspendido') {
      return res.status(403).json({ 
        success: false,
        error: 'Tu cuenta ha sido suspendida' 
      });
    }

    // Generar token
    const token = jwt.sign(
      { id: usuario._id, tipo: usuario.tipo, nombre: usuario.nombreCompleto },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.json({
      success: true,
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombreCompleto,
        apellido: usuario.apellido,
        email: usuario.email,
        tipo: usuario.tipo,
        especialidad: usuario.especialidad
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

module.exports = router;

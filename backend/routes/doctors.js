const express = require('express');
const Usuario = require('../models/Usuario');
const Resena = require('../models/Resena');
const Cita = require('../models/Cita');
const { verificarToken, verificarDoctor } = require('../middleware/auth');
const router = express.Router();

// Obtener todos los doctores
router.get('/', async (req, res) => {
  try {
    const { especialidad } = req.query;
    
    const filtro = { tipo: 'doctor', estado: 'activo' };
    if (especialidad) {
      filtro.especialidad = especialidad;
    }

    const doctors = await Usuario.find(filtro)
      .select('-contraseña -stripeCustomerId')
      .sort({ calificacion: -1 });

    res.json({ 
      success: true,
      total: doctors.length,
      doctores: doctors 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

// Obtener doctor por ID con sus reseñas
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Usuario.findById(req.params.id)
      .select('-contraseña -stripeCustomerId')
      .populate('historicoMedico');

    if (!doctor || doctor.tipo !== 'doctor') {
      return res.status(404).json({ 
        success: false,
        error: 'Doctor no encontrado' 
      });
    }

    const resenas = await Resena.find({ doctor: req.params.id })
      .sort({ createdAt: -1 });
    
    const citasCompletadas = await Cita.countDocuments({
      doctor: req.params.id,
      estado: 'completada'
    });

    res.json({
      success: true,
      doctor,
      resenas,
      citasCompletadas
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

// Actualizar perfil del doctor
router.put('/:id', verificarToken, verificarDoctor, async (req, res) => {
  try {
    if (req.usuarioId !== req.params.id) {
      return res.status(403).json({ 
        success: false,
        error: 'No autorizado' 
      });
    }

    const camposActualizables = [
      'biografia',
      'precioConsulta',
      'horarioDisponible',
      'foto'
    ];

    const actualizacion = {};
    camposActualizables.forEach(campo => {
      if (req.body[campo] !== undefined) {
        actualizacion[campo] = req.body[campo];
      }
    });

    const doctor = await Usuario.findByIdAndUpdate(
      req.params.id,
      actualizacion,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      mensaje: 'Perfil actualizado exitosamente',
      doctor
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

// Obtener especialidades disponibles
router.get('/especialidades/lista', async (req, res) => {
  try {
    const especialidades = [
      'Cardiología',
      'Dermatología',
      'Neurología',
      'Pediatría',
      'Psiquiatría',
      'Oftalmología',
      'Otorrinolaringología',
      'Urología',
      'Gastroenterología',
      'Neumología',
      'Medicina General'
    ];

    res.json({
      success: true,
      especialidades
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

module.exports = router;

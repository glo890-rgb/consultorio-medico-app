const express = require('express');
const Resena = require('../models/Resena');
const Usuario = require('../models/Usuario');
const { verificarToken } = require('../middleware/auth');
const router = express.Router();

// Crear reseña
router.post('/', verificarToken, async (req, res) => {
  try {
    const { doctor, calificacion, comentario, cita } = req.body;

    if (!doctor || !calificacion || !comentario) {
      return res.status(400).json({
        success: false,
        error: 'Por favor completa todos los campos requeridos'
      });
    }

    if (calificacion < 1 || calificacion > 5) {
      return res.status(400).json({
        success: false,
        error: 'La calificación debe estar entre 1 y 5'
      });
    }

    // Obtener información del paciente y doctor
    const paciente = await Usuario.findById(req.usuarioId);
    const doctorObj = await Usuario.findById(doctor);

    if (!doctorObj) {
      return res.status(404).json({
        success: false,
        error: 'Doctor no encontrado'
      });
    }

    // Verificar si ya existe una reseña de este paciente para este doctor
    const resenaExistente = await Resena.findOne({
      paciente: req.usuarioId,
      doctor
    });

    if (resenaExistente) {
      return res.status(400).json({
        success: false,
        error: 'Ya has dejado una reseña para este doctor'
      });
    }

    const resena = new Resena({
      paciente: req.usuarioId,
      nombrePaciente: paciente.nombreCompleto,
      doctor,
      nombreDoctor: doctorObj.nombreCompleto,
      calificacion,
      comentario,
      cita
    });

    await resena.save();

    // Actualizar calificación promedio del doctor
    const resenas = await Resena.find({ doctor });
    const promedio = resenas.reduce((sum, r) => sum + r.calificacion, 0) / resenas.length;
    await Usuario.findByIdAndUpdate(doctor, { calificacion: promedio.toFixed(1) });

    res.status(201).json({
      success: true,
      mensaje: 'Reseña creada exitosamente',
      resena
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Obtener reseñas de un doctor
router.get('/doctor/:doctorId', async (req, res) => {
  try {
    const resenas = await Resena.find({ doctor: req.params.doctorId })
      .populate('paciente', 'nombre apellido foto')
      .sort({ createdAt: -1 });

    const promedioCalificacion = resenas.length > 0
      ? (resenas.reduce((sum, r) => sum + r.calificacion, 0) / resenas.length).toFixed(1)
      : 0;

    res.json({
      success: true,
      total: resenas.length,
      promedioCalificacion,
      resenas
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Obtener reseñas del paciente
router.get('/', verificarToken, async (req, res) => {
  try {
    const resenas = await Resena.find({ paciente: req.usuarioId })
      .populate('doctor', 'nombre apellido especialidad')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      total: resenas.length,
      resenas
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Actualizar reseña
router.put('/:id', verificarToken, async (req, res) => {
  try {
    const resena = await Resena.findById(req.params.id);

    if (!resena) {
      return res.status(404).json({
        success: false,
        error: 'Reseña no encontrada'
      });
    }

    if (resena.paciente.toString() !== req.usuarioId) {
      return res.status(403).json({
        success: false,
        error: 'No tienes permiso para actualizar esta reseña'
      });
    }

    if (req.body.calificacion) {
      if (req.body.calificacion < 1 || req.body.calificacion > 5) {
        return res.status(400).json({
          success: false,
          error: 'La calificación debe estar entre 1 y 5'
        });
      }
      resena.calificacion = req.body.calificacion;
    }

    if (req.body.comentario) {
      resena.comentario = req.body.comentario;
    }

    await resena.save();

    // Actualizar calificación promedio del doctor
    const resenas = await Resena.find({ doctor: resena.doctor });
    const promedio = resenas.reduce((sum, r) => sum + r.calificacion, 0) / resenas.length;
    await Usuario.findByIdAndUpdate(resena.doctor, { calificacion: promedio.toFixed(1) });

    res.json({
      success: true,
      mensaje: 'Reseña actualizada exitosamente',
      resena
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Eliminar reseña
router.delete('/:id', verificarToken, async (req, res) => {
  try {
    const resena = await Resena.findById(req.params.id);

    if (!resena) {
      return res.status(404).json({
        success: false,
        error: 'Reseña no encontrada'
      });
    }

    if (resena.paciente.toString() !== req.usuarioId) {
      return res.status(403).json({
        success: false,
        error: 'No tienes permiso para eliminar esta reseña'
      });
    }

    const doctorId = resena.doctor;
    await Resena.findByIdAndDelete(req.params.id);

    // Recalcular calificación promedio del doctor
    const resenas = await Resena.find({ doctor: doctorId });
    const promedio = resenas.length > 0
      ? (resenas.reduce((sum, r) => sum + r.calificacion, 0) / resenas.length).toFixed(1)
      : 5;
    await Usuario.findByIdAndUpdate(doctorId, { calificacion: promedio });

    res.json({
      success: true,
      mensaje: 'Reseña eliminada exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
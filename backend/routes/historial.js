const express = require('express');
const HistoricoMedico = require('../models/HistoricoMedico');
const { verificarToken, verificarDoctor } = require('../middleware/auth');
const router = express.Router();

// Crear historial médico (solo doctores)
router.post('/', verificarToken, verificarDoctor, async (req, res) => {
  try {
    const { paciente, diagnostico, sintomas, tratamiento, medicinas, alergias, examenesRecomendados, notasAdicionales, cita } = req.body;

    if (!paciente || !diagnostico || !tratamiento) {
      return res.status(400).json({
        success: false,
        error: 'Por favor completa los campos requeridos'
      });
    }

    // Obtener información del doctor y paciente
    const Usuario = require('../models/Usuario');
    const doctor = await Usuario.findById(req.usuarioId);
    const pacienteObj = await Usuario.findById(paciente);

    if (!pacienteObj) {
      return res.status(404).json({
        success: false,
        error: 'Paciente no encontrado'
      });
    }

    const historial = new HistoricoMedico({
      paciente,
      nombrePaciente: pacienteObj.nombreCompleto,
      doctor: req.usuarioId,
      nombreDoctor: doctor.nombreCompleto,
      especialidadDoctor: doctor.especialidad,
      diagnostico,
      sintomas,
      tratamiento,
      medicinas,
      alergias,
      examenesRecomendados,
      notasAdicionales,
      cita
    });

    await historial.save();

    // Agregar al histórico del paciente
    await Usuario.findByIdAndUpdate(paciente, {
      $push: { historicoMedico: historial._id }
    });

    res.status(201).json({
      success: true,
      mensaje: 'Historial médico creado exitosamente',
      historial
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Obtener historial médico del paciente
router.get('/', verificarToken, async (req, res) => {
  try {
    const historial = await HistoricoMedico.find({ paciente: req.usuarioId })
      .populate('doctor', 'nombre apellido especialidad')
      .sort({ fecha: -1 });

    res.json({
      success: true,
      total: historial.length,
      historial
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Obtener historial por ID
router.get('/:id', verificarToken, async (req, res) => {
  try {
    const historial = await HistoricoMedico.findById(req.params.id)
      .populate('paciente', 'nombre apellido email')
      .populate('doctor', 'nombre apellido especialidad');

    if (!historial) {
      return res.status(404).json({
        success: false,
        error: 'Historial no encontrado'
      });
    }

    // Verificar permisos
    if (historial.paciente._id.toString() !== req.usuarioId &&
        historial.doctor._id.toString() !== req.usuarioId) {
      return res.status(403).json({
        success: false,
        error: 'No tienes permiso para ver este historial'
      });
    }

    res.json({
      success: true,
      historial
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Actualizar historial (solo el doctor que lo creó)
router.put('/:id', verificarToken, verificarDoctor, async (req, res) => {
  try {
    const historial = await HistoricoMedico.findById(req.params.id);

    if (!historial) {
      return res.status(404).json({
        success: false,
        error: 'Historial no encontrado'
      });
    }

    if (historial.doctor.toString() !== req.usuarioId) {
      return res.status(403).json({
        success: false,
        error: 'No tienes permiso para actualizar este historial'
      });
    }

    const camposActualizables = ['diagnostico', 'tratamiento', 'medicinas', 'alergias', 'examenesRecomendados', 'notasAdicionales'];

    camposActualizables.forEach(campo => {
      if (req.body[campo] !== undefined) {
        historial[campo] = req.body[campo];
      }
    });

    await historial.save();

    res.json({
      success: true,
      mensaje: 'Historial actualizado exitosamente',
      historial
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Obtener historial médico de un paciente (solo para el doctor que lo atiende)
router.get('/paciente/:pacienteId', verificarToken, verificarDoctor, async (req, res) => {
  try {
    const historial = await HistoricoMedico.find({
      paciente: req.params.pacienteId,
      doctor: req.usuarioId
    }).sort({ fecha: -1 });

    res.json({
      success: true,
      total: historial.length,
      historial
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
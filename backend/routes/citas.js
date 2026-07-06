const express = require('express');
const Cita = require('../models/Cita');
const Usuario = require('../models/Usuario');
const { verificarToken } = require('../middleware/auth');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

// Crear nueva cita
router.post('/', verificarToken, async (req, res) => {
  try {
    const { doctor, fecha, motivo, duracion, precio } = req.body;

    if (!doctor || !fecha || !motivo) {
      return res.status(400).json({ 
        success: false,
        error: 'Por favor completa los campos requeridos' 
      });
    }

    // Obtener información del paciente y doctor
    const paciente = await Usuario.findById(req.usuarioId);
    const doctorObj = await Usuario.findById(doctor);

    if (!doctorObj || doctorObj.tipo !== 'doctor') {
      return res.status(404).json({ 
        success: false,
        error: 'Doctor no encontrado' 
      });
    }

    const cita = new Cita({
      paciente: req.usuarioId,
      nombrePaciente: paciente.nombreCompleto,
      doctor,
      nombreDoctor: doctorObj.nombreCompleto,
      especialidadDoctor: doctorObj.especialidad,
      fecha,
      motivo,
      duracion: duracion || 30,
      precio: precio || doctorObj.precioConsulta,
      estado: 'pendiente',
      pagoPendiente: true
    });

    await cita.save();

    res.status(201).json({
      success: true,
      mensaje: 'Cita agendada exitosamente',
      cita
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

// Obtener citas del usuario (paciente o doctor)
router.get('/', verificarToken, async (req, res) => {
  try {
    const { estado, desde, hasta } = req.query;
    
    const filtro = {
      $or: [
        { paciente: req.usuarioId },
        { doctor: req.usuarioId }
      ]
    };

    if (estado) {
      filtro.estado = estado;
    }

    if (desde || hasta) {
      filtro.fecha = {};
      if (desde) filtro.fecha.$gte = new Date(desde);
      if (hasta) filtro.fecha.$lte = new Date(hasta);
    }

    const citas = await Cita.find(filtro)
      .populate('paciente', 'nombre apellido email telefono foto')
      .populate('doctor', 'nombre apellido especialidad foto precioConsulta')
      .sort({ fecha: 1 });

    res.json({
      success: true,
      total: citas.length,
      citas
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

// Obtener cita por ID
router.get('/:id', verificarToken, async (req, res) => {
  try {
    const cita = await Cita.findById(req.params.id)
      .populate('paciente', 'nombre apellido email telefono')
      .populate('doctor', 'nombre apellido especialidad');

    if (!cita) {
      return res.status(404).json({ 
        success: false,
        error: 'Cita no encontrada' 
      });
    }

    // Verificar que el usuario tenga acceso
    if (cita.paciente._id.toString() !== req.usuarioId && 
        cita.doctor._id.toString() !== req.usuarioId) {
      return res.status(403).json({ 
        success: false,
        error: 'No tienes permiso para ver esta cita' 
      });
    }

    res.json({
      success: true,
      cita
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

// Actualizar cita
router.put('/:id', verificarToken, async (req, res) => {
  try {
    const cita = await Cita.findById(req.params.id);

    if (!cita) {
      return res.status(404).json({ 
        success: false,
        error: 'Cita no encontrada' 
      });
    }

    // Verificar permisos
    if (cita.paciente.toString() !== req.usuarioId && 
        cita.doctor.toString() !== req.usuarioId) {
      return res.status(403).json({ 
        success: false,
        error: 'No tienes permiso para actualizar esta cita' 
      });
    }

    const camposActualizables = ['estado', 'notas', 'sintomas', 'diagnostico', 'receta'];
    
    camposActualizables.forEach(campo => {
      if (req.body[campo] !== undefined) {
        cita[campo] = req.body[campo];
      }
    });

    if (req.body.estado === 'completada') {
      cita.completedAt = new Date();
    }

    await cita.save();

    res.json({
      success: true,
      mensaje: 'Cita actualizada exitosamente',
      cita
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

// Generar enlace de videollamada
router.post('/:id/videollamada', verificarToken, async (req, res) => {
  try {
    const cita = await Cita.findById(req.params.id);

    if (!cita) {
      return res.status(404).json({ 
        success: false,
        error: 'Cita no encontrada' 
      });
    }

    if (cita.estado !== 'confirmada') {
      return res.status(400).json({ 
        success: false,
        error: 'La cita debe estar confirmada para iniciar videollamada' 
      });
    }

    // Generar enlace único
    const videoCallLink = `https://videocall.consultorio.app/${uuidv4()}`;
    cita.videoCallLink = videoCallLink;
    await cita.save();

    res.json({
      success: true,
      videoCallLink,
      mensaje: 'Enlace de videollamada generado'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

// Cancelar cita
router.post('/:id/cancelar', verificarToken, async (req, res) => {
  try {
    const cita = await Cita.findById(req.params.id);

    if (!cita) {
      return res.status(404).json({ 
        success: false,
        error: 'Cita no encontrada' 
      });
    }

    if (cita.estado === 'completada') {
      return res.status(400).json({ 
        success: false,
        error: 'No puedes cancelar una cita ya completada' 
      });
    }

    cita.estado = 'cancelada';
    await cita.save();

    res.json({
      success: true,
      mensaje: 'Cita cancelada exitosamente',
      cita
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

module.exports = router;

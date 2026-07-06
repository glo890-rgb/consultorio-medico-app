const express = require('express');
const Pago = require('../models/Pago');
const Cita = require('../models/Cita');
const Usuario = require('../models/Usuario');
const { verificarToken } = require('../middleware/auth');
const router = express.Router();

// Crear intento de pago
router.post('/crear-intento', verificarToken, async (req, res) => {
  try {
    const { citaId, monto, moneda } = req.body;

    const cita = await Cita.findById(citaId);

    if (!cita) {
      return res.status(404).json({
        success: false,
        error: 'Cita no encontrada'
      });
    }

    if (cita.paciente.toString() !== req.usuarioId) {
      return res.status(403).json({
        success: false,
        error: 'No tienes permiso para pagar esta cita'
      });
    }

    // Aquí se integraría con Stripe
    // Por ahora simulamos un ID de intento
    const clientSecret = `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    res.json({
      success: true,
      clientSecret,
      monto,
      moneda: moneda || 'USD'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Confirmar pago
router.post('/confirmar', verificarToken, async (req, res) => {
  try {
    const { citaId, monto, stripePaymentId, metodo } = req.body;

    const cita = await Cita.findById(citaId);

    if (!cita) {
      return res.status(404).json({
        success: false,
        error: 'Cita no encontrada'
      });
    }

    // Crear registro de pago
    const pago = new Pago({
      cita: citaId,
      paciente: req.usuarioId,
      nombrePaciente: cita.nombrePaciente,
      doctor: cita.doctor,
      nombreDoctor: cita.nombreDoctor,
      monto,
      estado: 'completado',
      stripePaymentId,
      metodo: metodo || 'tarjeta'
    });

    await pago.save();

    // Actualizar cita
    cita.pagada = true;
    cita.pagoPendiente = false;
    cita.estado = 'confirmada';
    await cita.save();

    res.json({
      success: true,
      mensaje: 'Pago realizado exitosamente',
      pago
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Obtener pagos del usuario
router.get('/', verificarToken, async (req, res) => {
  try {
    const { estado } = req.query;

    const filtro = {
      $or: [
        { paciente: req.usuarioId },
        { doctor: req.usuarioId }
      ]
    };

    if (estado) {
      filtro.estado = estado;
    }

    const pagos = await Pago.find(filtro)
      .populate('cita')
      .populate('paciente', 'nombre apellido')
      .populate('doctor', 'nombre apellido')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      total: pagos.length,
      pagos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Obtener ingresos del doctor
router.get('/ingresos/resumen', verificarToken, async (req, res) => {
  try {
    const pagos = await Pago.find({
      doctor: req.usuarioId,
      estado: 'completado'
    });

    const totalIngresos = pagos.reduce((sum, pago) => sum + pago.monto, 0);
    const cantidadPagos = pagos.length;

    res.json({
      success: true,
      totalIngresos,
      cantidadPagos,
      promedioXPago: cantidadPagos > 0 ? (totalIngresos / cantidadPagos).toFixed(2) : 0
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.module = router;
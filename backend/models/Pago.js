const mongoose = require('mongoose');

const pagoSchema = new mongoose.Schema({
  cita: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cita',
    required: true
  },
  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: [true, 'El paciente es requerido']
  },
  nombrePaciente: {
    type: String,
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: [true, 'El doctor es requerido']
  },
  nombreDoctor: {
    type: String,
    required: true
  },
  monto: {
    type: Number,
    required: [true, 'El monto es requerido']
  },
  moneda: {
    type: String,
    default: 'USD'
  },
  estado: {
    type: String,
    enum: ['pendiente', 'completado', 'fallido', 'reembolsado'],
    default: 'pendiente'
  },
  stripePaymentId: String,
  metodo: {
    type: String,
    enum: ['tarjeta', 'paypal', 'transferencia', 'otro'],
    default: 'tarjeta'
  },
  descripcion: String,
  comprobante: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Índices
pagoSchema.index({ paciente: 1, createdAt: -1 });
pagoSchema.index({ doctor: 1, createdAt: -1 });
pagoSchema.index({ estado: 1 });

const Pago = mongoose.model('Pago', pagoSchema);

module.exports = Pago;

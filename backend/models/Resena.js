const mongoose = require('mongoose');

const resenaSchema = new mongoose.Schema({
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
  calificacion: {
    type: Number,
    required: [true, 'La calificación es requerida'],
    min: 1,
    max: 5
  },
  comentario: {
    type: String,
    required: [true, 'El comentario es requerido'],
    maxlength: [500, 'El comentario no puede exceder 500 caracteres']
  },
  cita: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cita'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Índices
resenaSchema.index({ doctor: 1 });
resenaSchema.index({ paciente: 1 });

const Resena = mongoose.model('Resena', resenaSchema);

module.exports = Resena;

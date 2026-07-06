const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema({
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
  especialidadDoctor: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    required: [true, 'La fecha es requerida'],
    validate: {
      validator: function(v) {
        return v > new Date();
      },
      message: 'La fecha debe ser futura'
    }
  },
  duracion: {
    type: Number,
    default: 30,
    required: true
  },
  estado: {
    type: String,
    enum: ['pendiente', 'confirmada', 'completada', 'cancelada', 'no_asistio'],
    default: 'pendiente'
  },
  motivo: {
    type: String,
    required: [true, 'El motivo de la consulta es requerido'],
    maxlength: [500, 'El motivo no puede exceder 500 caracteres']
  },
  notas: String,
  precio: {
    type: Number,
    default: 50,
    required: true
  },
  pagada: {
    type: Boolean,
    default: false
  },
  pagoPendiente: Boolean,
  videoCallLink: String,
  videoRecording: String,
  sintomas: [String],
  receta: String,
  diagnostico: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Índices para búsquedas rápidas
citaSchema.index({ paciente: 1, fecha: 1 });
citaSchema.index({ doctor: 1, fecha: 1 });
citaSchema.index({ estado: 1 });

const Cita = mongoose.model('Cita', citaSchema);

module.exports = Cita;

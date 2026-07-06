const mongoose = require('mongoose');

const historicoMedicoSchema = new mongoose.Schema({
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
    default: Date.now
  },
  diagnostico: {
    type: String,
    required: [true, 'El diagnóstico es requerido']
  },
  sintomas: [{
    type: String,
    maxlength: 100
  }],
  tratamiento: {
    type: String,
    required: true
  },
  medicinas: [{
    nombre: {
      type: String,
      required: true
    },
    dosis: String,
    frecuencia: String,
    duracion: String,
    notas: String
  }],
  alergias: [String],
  presion: String,
  temperatura: String,
  peso: Number,
  altura: Number,
  indiceIMC: Number,
  examenesRecomendados: [String],
  notasAdicionales: String,
  adjuntos: [{
    nombre: String,
    url: String,
    tipo: String
  }],
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
historicoMedicoSchema.index({ paciente: 1, fecha: -1 });
historicoMedicoSchema.index({ doctor: 1, fecha: -1 });

const HistoricoMedico = mongoose.model('HistoricoMedico', historicoMedicoSchema);

module.exports = HistoricoMedico;

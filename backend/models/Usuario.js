const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true,
    minlength: [2, 'El nombre debe tener al menos 2 caracteres']
  },
  apellido: {
    type: String,
    required: [true, 'El apellido es requerido'],
    trim: true,
    minlength: [2, 'El apellido debe tener al menos 2 caracteres']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'El email es requerido'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor ingresa un email válido']
  },
  contraseña: {
    type: String,
    required: [true, 'La contraseña es requerida'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
    select: false
  },
  telefono: {
    type: String,
    required: [true, 'El teléfono es requerido'],
    match: [/^[0-9]{7,15}$/, 'Por favor ingresa un teléfono válido']
  },
  tipo: {
    type: String,
    enum: {
      values: ['paciente', 'doctor', 'admin'],
      message: 'El tipo debe ser paciente, doctor o admin'
    },
    default: 'paciente'
  },
  // Campos específicos para doctores
  especialidad: {
    type: String,
    required: function() { return this.tipo === 'doctor'; },
    enum: [
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
    ]
  },
  numeroLicencia: {
    type: String,
    required: function() { return this.tipo === 'doctor'; },
    unique: true,
    sparse: true
  },
  experiencia: {
    type: Number, // en años
    default: 0
  },
  biografia: {
    type: String,
    maxlength: [500, 'La biografía no puede exceder 500 caracteres']
  },
  foto: {
    type: String,
    default: null
  },
  calificacion: {
    type: Number,
    default: 5,
    min: 1,
    max: 5
  },
  precioConsulta: {
    type: Number,
    default: 50,
    required: function() { return this.tipo === 'doctor'; }
  },
  horarioDisponible: {
    lunes: { inicio: String, fin: String },
    martes: { inicio: String, fin: String },
    miercoles: { inicio: String, fin: String },
    jueves: { inicio: String, fin: String },
    viernes: { inicio: String, fin: String },
    sabado: { inicio: String, fin: String },
    domingo: { inicio: String, fin: String }
  },
  stripeCustomerId: String,
  historicoMedico: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HistoricoMedico'
  }],
  citasCompletadas: {
    type: Number,
    default: 0
  },
  estado: {
    type: String,
    enum: ['activo', 'inactivo', 'suspendido'],
    default: 'activo'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Middleware para encriptar contraseña antes de guardar
usuarioSchema.pre('save', async function(next) {
  if (!this.isModified('contraseña')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.contraseña = await bcrypt.hash(this.contraseña, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar contraseñas
usuarioSchema.methods.compararContraseña = async function(contraseñaIngresada) {
  return await bcrypt.compare(contraseñaIngresada, this.contraseña);
};

// Método para obtener nombre completo
usuarioSchema.virtual('nombreCompleto').get(function() {
  return `${this.nombre} ${this.apellido}`;
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;

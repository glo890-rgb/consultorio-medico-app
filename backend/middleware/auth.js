const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ 
      success: false,
      error: 'Token no proporcionado' 
    });
  }
  
  jwt.verify(token, process.env.JWT_SECRET || 'secret_key', (err, decoded) => {
    if (err) {
      return res.status(403).json({ 
        success: false,
        error: 'Token inválido o expirado' 
      });
    }
    req.usuarioId = decoded.id;
    req.usuarioTipo = decoded.tipo;
    next();
  });
};

const verificarDoctor = (req, res, next) => {
  if (req.usuarioTipo !== 'doctor' && req.usuarioTipo !== 'admin') {
    return res.status(403).json({ 
      success: false,
      error: 'Solo los doctores pueden acceder a este recurso' 
    });
  }
  next();
};

const verificarPaciente = (req, res, next) => {
  if (req.usuarioTipo !== 'paciente' && req.usuarioTipo !== 'admin') {
    return res.status(403).json({ 
      success: false,
      error: 'Solo los pacientes pueden acceder a este recurso' 
    });
  }
  next();
};

module.exports = { verificarToken, verificarDoctor, verificarPaciente };

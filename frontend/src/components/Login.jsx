import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

function Login({ onLoginSuccess, onNotificacion }) {
  const [vistaLogin, setVistaLogin] = useState(true);
  const [cargando, setCargando] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    contraseña: '',
    telefono: '',
    tipo: 'paciente',
    especialidad: '',
    numeroLicencia: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setCargando(true);
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email: formData.email,
        contraseña: formData.contraseña
      });
      localStorage.setItem('token', response.data.token);
      onLoginSuccess(response.data.token);
      onNotificacion('¡Bienvenido!', 'success');
    } catch (error) {
      onNotificacion(error.response?.data?.error || 'Error en el login', 'error');
    } finally {
      setCargando(false);
    }
  };

  const handleSubmitRegistro = async (e) => {
    e.preventDefault();
    setCargando(true);
    try {
      if (formData.tipo === 'doctor' && (!formData.especialidad || !formData.numeroLicencia)) {
        onNotificacion('Los doctores deben llenar especialidad y número de licencia', 'error');
        setCargando(false);
        return;
      }

      const response = await axios.post(`${API_URL}/auth/registro`, formData);
      localStorage.setItem('token', response.data.token);
      onLoginSuccess(response.data.token);
      onNotificacion('¡Registro exitoso! Bienvenido', 'success');
    } catch (error) {
      onNotificacion(error.response?.data?.error || 'Error en el registro', 'error');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>🏥 ConsultorioMedico+</h1>
        {vistaLogin ? (
          <>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmitLogin}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="contraseña"
                placeholder="Contraseña"
                value={formData.contraseña}
                onChange={handleChange}
                required
              />
              <button type="submit" disabled={cargando}>
                {cargando ? 'Ingresando...' : 'Ingresar'}
              </button>
            </form>
            <p className="switch-auth">
              ¿No tienes cuenta?{' '}
              <button onClick={() => setVistaLogin(false)} className="link-btn">
                Regístrate aquí
              </button>
            </p>
          </>
        ) : (
          <>
            <h2>Registrarse</h2>
            <form onSubmit={handleSubmitRegistro}>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="apellido"
                placeholder="Apellido"
                value={formData.apellido}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="contraseña"
                placeholder="Contraseña"
                value={formData.contraseña}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="telefono"
                placeholder="Teléfono"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
              <select name="tipo" value={formData.tipo} onChange={handleChange}>
                <option value="paciente">Soy Paciente</option>
                <option value="doctor">Soy Doctor</option>
              </select>
              {formData.tipo === 'doctor' && (
                <>
                  <select
                    name="especialidad"
                    value={formData.especialidad}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona especialidad</option>
                    <option value="Cardiología">Cardiología</option>
                    <option value="Dermatología">Dermatología</option>
                    <option value="Neurología">Neurología</option>
                    <option value="Pediatría">Pediatría</option>
                    <option value="Psiquiatría">Psiquiatría</option>
                    <option value="Medicina General">Medicina General</option>
                  </select>
                  <input
                    type="text"
                    name="numeroLicencia"
                    placeholder="Número de Licencia"
                    value={formData.numeroLicencia}
                    onChange={handleChange}
                    required
                  />
                </>
              )}
              <button type="submit" disabled={cargando}>
                {cargando ? 'Registrando...' : 'Registrarse'}
              </button>
            </form>
            <p className="switch-auth">
              ¿Ya tienes cuenta?{' '}
              <button onClick={() => setVistaLogin(true)} className="link-btn">
                Inicia sesión aquí
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/DoctoresList.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

function DoctoresList({ token, onNotificacion, onVistaChange }) {
  const [doctores, setDoctores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [especialidadFiltro, setEspecialidadFiltro] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [doctorSeleccionado, setDoctorSeleccionado] = useState(null);
  const [formCita, setFormCita] = useState({
    fecha: '',
    motivo: ''
  });

  useEffect(() => {
    cargarDoctores();
  }, [especialidadFiltro]);

  const cargarDoctores = async () => {
    try {
      const url = especialidadFiltro
        ? `${API_URL}/doctors?especialidad=${especialidadFiltro}`
        : `${API_URL}/doctors`;
      const response = await axios.get(url);
      setDoctores(response.data.doctores || []);
    } catch (error) {
      onNotificacion('Error al cargar doctores', 'error');
    } finally {
      setCargando(false);
    }
  };

  const handleAgendarCita = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}/citas`,
        {
          doctor: doctorSeleccionado._id,
          fecha: formCita.fecha,
          motivo: formCita.motivo,
          duracion: 30
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onNotificacion('¡Cita agendada exitosamente!', 'success');
      setMostrarFormulario(false);
      setFormCita({ fecha: '', motivo: '' });
    } catch (error) {
      onNotificacion(error.response?.data?.error || 'Error al agendar cita', 'error');
    }
  };

  if (cargando) return <div className="loading">Cargando doctores...</div>;

  return (
    <section className="doctores-section">
      <h2>👨‍⚕️ Nuestros Doctores</h2>

      <div className="filtros">
        <select
          value={especialidadFiltro}
          onChange={(e) => setEspecialidadFiltro(e.target.value)}
        >
          <option value="">Todas las especialidades</option>
          <option value="Cardiología">Cardiología</option>
          <option value="Dermatología">Dermatología</option>
          <option value="Medicina General">Medicina General</option>
          <option value="Psiquiatría">Psiquiatría</option>
        </select>
      </div>

      {mostrarFormulario && doctorSeleccionado && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Agendar cita con Dr. {doctorSeleccionado.nombreCompleto}</h3>
            <form onSubmit={handleAgendarCita}>
              <div className="form-group">
                <label>Fecha y Hora</label>
                <input
                  type="datetime-local"
                  value={formCita.fecha}
                  onChange={(e) => setFormCita({ ...formCita, fecha: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Motivo de consulta</label>
                <textarea
                  value={formCita.motivo}
                  onChange={(e) => setFormCita({ ...formCita, motivo: e.target.value })}
                  required
                  rows="4"
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary">Agendar</button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setMostrarFormulario(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="doctores-grid">
        {doctores.map((doctor) => (
          <div key={doctor._id} className="doctor-card">
            <div className="doctor-header">
              <h3>{doctor.nombreCompleto}</h3>
              <span className="rating">⭐ {doctor.calificacion}/5</span>
            </div>
            <p><strong>Especialidad:</strong> {doctor.especialidad}</p>
            <p><strong>Experiencia:</strong> {doctor.experiencia} años</p>
            <p><strong>Consulta:</strong> ${doctor.precioConsulta}</p>
            {doctor.biografia && <p><strong>Biografía:</strong> {doctor.biografia}</p>}
            <button
              onClick={() => {
                setDoctorSeleccionado(doctor);
                setMostrarFormulario(true);
              }}
              className="btn-agendar"
            >
              Agendar cita
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DoctoresList;

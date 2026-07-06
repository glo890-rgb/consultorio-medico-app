import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CitaDetail.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

function CitaDetail({ token, onNotificacion, usuarioInfo }) {
  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtroEstado, setFiltroEstado] = useState('');

  useEffect(() => {
    cargarCitas();
  }, []);

  const cargarCitas = async () => {
    try {
      const response = await axios.get(`${API_URL}/citas`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCitas(response.data.citas || []);
    } catch (error) {
      onNotificacion('Error al cargar citas', 'error');
    } finally {
      setCargando(false);
    }
  };

  const iniciarVideollamada = async (citaId) => {
    try {
      const response = await axios.post(
        `${API_URL}/citas/${citaId}/videollamada`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      window.open(response.data.videoCallLink, '_blank');
    } catch (error) {
      onNotificacion('Error al generar videollamada', 'error');
    }
  };

  const cancelarCita = async (citaId) => {
    if (window.confirm('¿Estás seguro de que deseas cancelar esta cita?')) {
      try {
        await axios.post(
          `${API_URL}/citas/${citaId}/cancelar`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        onNotificacion('Cita cancelada', 'success');
        cargarCitas();
      } catch (error) {
        onNotificacion('Error al cancelar cita', 'error');
      }
    }
  };

  const citasFiltradas = filtroEstado
    ? citas.filter((c) => c.estado === filtroEstado)
    : citas;

  if (cargando) return <div className="loading">Cargando citas...</div>;

  return (
    <section className="citas-section">
      <h2>📅 Mis Citas</h2>

      <div className="filtros">
        <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
          <option value="">Todos los estados</option>
          <option value="pendiente">Pendiente</option>
          <option value="confirmada">Confirmada</option>
          <option value="completada">Completada</option>
          <option value="cancelada">Cancelada</option>
        </select>
      </div>

      {citasFiltradas.length === 0 ? (
        <p className="no-data">No hay citas con el filtro seleccionado</p>
      ) : (
        <div className="citas-list">
          {citasFiltradas.map((cita) => (
            <div key={cita._id} className="cita-card">
              <div className="cita-header">
                <h3>
                  {usuarioInfo?.tipo === 'doctor'
                    ? `Paciente: ${cita.nombrePaciente}`
                    : `Doctor: ${cita.nombreDoctor}`}
                </h3>
                <span className={`status ${cita.estado}`}>{cita.estado.toUpperCase()}</span>
              </div>
              <p><strong>📅 Fecha:</strong> {new Date(cita.fecha).toLocaleString('es-ES')}</p>
              <p><strong>⏱️ Duración:</strong> {cita.duracion} minutos</p>
              <p><strong>💵 Precio:</strong> ${cita.precio}</p>
              <p><strong>💳 Pagada:</strong> {cita.pagada ? '✅ Sí' : '❌ No'}</p>
              <p><strong>📝 Motivo:</strong> {cita.motivo}</p>

              {cita.estado === 'confirmada' && (
                <button
                  onClick={() => iniciarVideollamada(cita._id)}
                  className="btn-video"
                >
                  📹 Iniciar Videollamada
                </button>
              )}

              {cita.estado !== 'completada' && cita.estado !== 'cancelada' && (
                <button
                  onClick={() => cancelarCita(cita._id)}
                  className="btn-cancelar"
                >
                  ❌ Cancelar Cita
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default CitaDetail;

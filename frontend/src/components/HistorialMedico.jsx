import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/HistorialMedico.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

function HistorialMedico({ token, onNotificacion }) {
  const [historial, setHistorial] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [detalleAbierto, setDetalleAbierto] = useState(null);

  useEffect(() => {
    cargarHistorial();
  }, []);

  const cargarHistorial = async () => {
    try {
      const response = await axios.get(`${API_URL}/historial`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHistorial(response.data.historial || []);
    } catch (error) {
      onNotificacion('Error al cargar historial', 'error');
    } finally {
      setCargando(false);
    }
  };

  if (cargando) return <div className="loading">Cargando historial...</div>;

  return (
    <section className="historial-section">
      <h2>📄 Historial Médico</h2>

      {historial.length === 0 ? (
        <p className="no-data">No hay registros en tu historial médico</p>
      ) : (
        <div className="historial-list">
          {historial.map((item) => (
            <div key={item._id} className="historial-card">
              <div className="historial-header">
                <h3>Consulta con Dr. {item.nombreDoctor}</h3>
                <p className="date">{new Date(item.fecha).toLocaleString('es-ES')}</p>
              </div>

              <div className="historial-content">
                <p><strong>🔍 Diagnóstico:</strong> {item.diagnostico}</p>
                {item.sintomas && item.sintomas.length > 0 && (
                  <p><strong>🤒 Síntomas:</strong> {item.sintomas.join(', ')}</p>
                )}
                <p><strong>💊 Tratamiento:</strong> {item.tratamiento}</p>

                {item.medicinas && item.medicinas.length > 0 && (
                  <div className="medicinas">
                    <strong>💊 Medicinas Prescritas:</strong>
                    <ul>
                      {item.medicinas.map((med, i) => (
                        <li key={i}>
                          {med.nombre} - {med.dosis} - {med.frecuencia} por {med.duracion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {item.alergias && item.alergias.length > 0 && (
                  <p><strong>⚠️ Alergias:</strong> {item.alergias.join(', ')}</p>
                )}

                {item.examenesRecomendados && item.examenesRecomendados.length > 0 && (
                  <p><strong>🧪 Exámenes Recomendados:</strong> {item.examenesRecomendados.join(', ')}</p>
                )}

                {item.notasAdicionales && (
                  <p><strong>📝 Notas Adicionales:</strong> {item.notasAdicionales}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default HistorialMedico;

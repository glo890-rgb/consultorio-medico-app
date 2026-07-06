import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Pagos.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

function Pagos({ token, onNotificacion }) {
  const [pagos, setPagos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtroEstado, setFiltroEstado] = useState('');

  useEffect(() => {
    cargarPagos();
  }, []);

  const cargarPagos = async () => {
    try {
      let url = `${API_URL}/pagos`;
      if (filtroEstado) {
        url += `?estado=${filtroEstado}`;
      }
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPagos(response.data.pagos || []);
    } catch (error) {
      onNotificacion('Error al cargar pagos', 'error');
    } finally {
      setCargando(false);
    }
  };

  const pagosFiltrados = filtroEstado
    ? pagos.filter((p) => p.estado === filtroEstado)
    : pagos;

  if (cargando) return <div className="loading">Cargando pagos...</div>;

  return (
    <section className="pagos-section">
      <h2>💳 Historial de Pagos</h2>

      <div className="filtros">
        <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
          <option value="">Todos los estados</option>
          <option value="completado">Completado</option>
          <option value="pendiente">Pendiente</option>
          <option value="fallido">Fallido</option>
        </select>
      </div>

      {pagosFiltrados.length === 0 ? (
        <p className="no-data">No hay pagos registrados</p>
      ) : (
        <div className="pagos-list">
          {pagosFiltrados.map((pago) => (
            <div key={pago._id} className="pago-card">
              <div className="pago-header">
                <h4>Pago - {pago.nombrePaciente} → {pago.nombreDoctor}</h4>
                <span className={`status ${pago.estado}`}>{pago.estado.toUpperCase()}</span>
              </div>
              <p><strong>💵 Monto:</strong> ${pago.monto} {pago.moneda}</p>
              <p><strong>💳 Método:</strong> {pago.metodo}</p>
              <p><strong>📅 Fecha:</strong> {new Date(pago.createdAt).toLocaleString('es-ES')}</p>
              {pago.descripcion && <p><strong>Descripción:</strong> {pago.descripcion}</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Pagos;

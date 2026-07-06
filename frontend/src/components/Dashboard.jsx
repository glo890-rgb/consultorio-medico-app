import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

function Dashboard({ token, usuarioInfo }) {
  const [stats, setStats] = useState({
    totalCitas: 0,
    citasProximas: 0,
    ingresos: 0
  });
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarEstadisticas();
  }, []);

  const cargarEstadisticas = async () => {
    try {
      const response = await axios.get(`${API_URL}/citas`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const citas = response.data.citas || [];
      const citasProximas = citas.filter(
        (c) => new Date(c.fecha) > new Date() && c.estado !== 'cancelada'
      ).length;

      setStats({
        totalCitas: citas.length,
        citasProximas,
        ingresos: 0
      });
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
    } finally {
      setCargando(false);
    }
  };

  if (cargando) return <div className="loading">Cargando...</div>;

  return (
    <section className="dashboard">
      <h2>📊 Mi Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.totalCitas}</h3>
          <p>Citas Totales</p>
        </div>
        <div className="stat-card">
          <h3>{stats.citasProximas}</h3>
          <p>Citas Próximas</p>
        </div>
        <div className="stat-card">
          <h3>⭐ 5.0</h3>
          <p>Mi Calificación</p>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;

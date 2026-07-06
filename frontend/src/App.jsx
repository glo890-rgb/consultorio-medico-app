import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import DoctoresList from './components/DoctoresList';
import CitaDetail from './components/CitaDetail';
import HistorialMedico from './components/HistorialMedico';
import Pagos from './components/Pagos';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [usuarioInfo, setUsuarioInfo] = useState(null);
  const [vista, setVista] = useState('dashboard');
  const [cargando, setCargando] = useState(false);
  const [notificacion, setNotificacion] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        setUsuarioInfo(decoded);
      } catch (error) {
        console.error('Error al decodificar token:', error);
        localStorage.removeItem('token');
        setToken(null);
      }
    }
  }, [token]);

  const mostrarNotificacion = (mensaje, tipo = 'success') => {
    setNotificacion({ mensaje, tipo });
    setTimeout(() => setNotificacion(null), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUsuarioInfo(null);
    setVista('dashboard');
  };

  if (!token) {
    return (
      <Login
        onLoginSuccess={(newToken) => {
          localStorage.setItem('token', newToken);
          setToken(newToken);
          mostrarNotificacion('¡Bienvenido!', 'success');
        }}
        onNotificacion={mostrarNotificacion}
      />
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-left">
          <h1>🏥 ConsultorioMedico+</h1>
          {usuarioInfo && <p className="user-name">Hola, {usuarioInfo.nombre}</p>}
        </div>
        <nav className="nav-menu">
          <button
            onClick={() => setVista('dashboard')}
            className={vista === 'dashboard' ? 'active' : ''}
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => setVista('doctores')}
            className={vista === 'doctores' ? 'active' : ''}
          >
            👨‍⚕️ Doctores
          </button>
          <button
            onClick={() => setVista('citas')}
            className={vista === 'citas' ? 'active' : ''}
          >
            📅 Mis Citas
          </button>
          {usuarioInfo?.tipo !== 'doctor' && (
            <button
              onClick={() => setVista('historial')}
              className={vista === 'historial' ? 'active' : ''}
            >
              📄 Historial
            </button>
          )}
          <button
            onClick={() => setVista('pagos')}
            className={vista === 'pagos' ? 'active' : ''}
          >
            💳 Pagos
          </button>
          <button onClick={handleLogout} className="logout-btn">
            🚪 Cerrar sesión
          </button>
        </nav>
      </header>

      {notificacion && (
        <div className={`notificacion ${notificacion.tipo}`}>
          {notificacion.mensaje}
        </div>
      )}

      <main className="main-content">
        {cargando && <div className="loading">Cargando...</div>}

        {vista === 'dashboard' && (
          <Dashboard token={token} usuarioInfo={usuarioInfo} />
        )}
        {vista === 'doctores' && (
          <DoctoresList
            token={token}
            onNotificacion={mostrarNotificacion}
            onVistaChange={setVista}
          />
        )}
        {vista === 'citas' && (
          <CitaDetail
            token={token}
            onNotificacion={mostrarNotificacion}
            usuarioInfo={usuarioInfo}
          />
        )}
        {vista === 'historial' && (
          <HistorialMedico token={token} onNotificacion={mostrarNotificacion} />
        )}
        {vista === 'pagos' && (
          <Pagos token={token} onNotificacion={mostrarNotificacion} />
        )}
      </main>
    </div>
  );
}

export default App;

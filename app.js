// API Configuration
const API_URL = 'http://localhost:3000/api';

// State Management
let currentToken = localStorage.getItem('token');
let currentUser = null;
let allDoctores = [];
let allCitas = [];
let allHistorial = [];
let allPagos = [];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    if (currentToken) {
        try {
            const decoded = JSON.parse(atob(currentToken.split('.')[1]));
            currentUser = decoded;
            showDashboard();
            loadInitialData();
        } catch (error) {
            console.error('Token inválido:', error);
            logout();
        }
    }
});

// ===== AUTENTICACIÓN =====
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const contraseña = document.getElementById('login-password').value;

    fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, contraseña })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem('token', data.token);
            currentToken = data.token;
            currentUser = data.usuario;
            showNotificacion('¡Bienvenido!', 'success');
            showDashboard();
            loadInitialData();
        } else {
            showNotificacion(data.error || 'Error en login', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotificacion('Error de conexión', 'error');
    });
}

function handleRegister(event) {
    event.preventDefault();
    const formData = {
        nombre: document.getElementById('register-nombre').value,
        apellido: document.getElementById('register-apellido').value,
        email: document.getElementById('register-email').value,
        contraseña: document.getElementById('register-password').value,
        telefono: document.getElementById('register-telefono').value,
        tipo: document.getElementById('register-tipo').value
    };

    if (formData.tipo === 'doctor') {
        formData.especialidad = document.getElementById('register-especialidad').value;
        formData.numeroLicencia = document.getElementById('register-licencia').value;
    }

    fetch(`${API_URL}/auth/registro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem('token', data.token);
            currentToken = data.token;
            currentUser = data.usuario;
            showNotificacion('¡Registro exitoso!', 'success');
            showDashboard();
            loadInitialData();
        } else {
            showNotificacion(data.error || 'Error en registro', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotificacion('Error de conexión', 'error');
    });
}

function logout() {
    localStorage.removeItem('token');
    currentToken = null;
    currentUser = null;
    document.getElementById('login-screen').classList.add('active');
    document.getElementById('dashboard-screen').classList.remove('active');
    document.getElementById('login-email').value = '';
    document.getElementById('login-password').value = '';
}

// ===== NAVEGACIÓN =====
function showDashboard() {
    document.getElementById('login-screen').classList.remove('active');
    document.getElementById('dashboard-screen').classList.add('active');
    document.getElementById('user-name').textContent = `Hola, ${currentUser.nombre}`;
    
    // Mostrar/Ocultar campos según tipo de usuario
    if (currentUser.tipo === 'doctor') {
        document.getElementById('nav-historial').style.display = 'none';
        document.getElementById('ingresos-card').style.display = 'block';
    } else {
        document.getElementById('nav-historial').style.display = 'block';
        document.getElementById('ingresos-card').style.display = 'none';
    }
}

function showView(viewName) {
    // Ocultar todas las vistas
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });

    // Activar vista seleccionada
    document.getElementById(`view-${viewName}`).classList.add('active');

    // Actualizar botones de navegación
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`nav-${viewName}`).classList.add('active');

    // Cargar datos si es necesario
    if (viewName === 'doctores') {
        loadDoctores();
    } else if (viewName === 'citas') {
        loadCitas();
    } else if (viewName === 'historial') {
        loadHistorial();
    } else if (viewName === 'pagos') {
        loadPagos();
    }
}

// ===== CARGA DE DATOS =====
function loadInitialData() {
    loadDashboardStats();
}

function loadDashboardStats() {
    fetch(`${API_URL}/citas`, {
        headers: { 'Authorization': `Bearer ${currentToken}` }
    })
    .then(res => res.json())
    .then(data => {
        if (data.success && data.citas) {
            allCitas = data.citas;
            const totalCitas = allCitas.length;
            const citasProximas = allCitas.filter(c => new Date(c.fecha) > new Date() && c.estado !== 'cancelada').length;
            
            document.getElementById('total-citas').textContent = totalCitas;
            document.getElementById('citas-proximas').textContent = citasProximas;
        }
    })
    .catch(error => console.error('Error:', error));
}

function loadDoctores() {
    fetch(`${API_URL}/doctors`)
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        console.log('Respuesta de doctores:', data);
        if (data.success && data.doctores) {
            allDoctores = data.doctores;
            renderDoctores(allDoctores);
        } else if (data.doctores) {
            allDoctores = data.doctores;
            renderDoctores(allDoctores);
        } else {
            throw new Error('No se encontraron doctores en la respuesta');
        }
    })
    .catch(error => {
        console.error('Error cargando doctores:', error);
        showNotificacion('Error al cargar doctores: ' + error.message, 'error');
        const grid = document.getElementById('doctores-grid');
        if (grid) {
            grid.innerHTML = '<p class="no-data">Error al cargar doctores. Verifica que el servidor esté activo.</p>';
        }
    });
}

function loadCitas() {
    fetch(`${API_URL}/citas`, {
        headers: { 'Authorization': `Bearer ${currentToken}` }
    })
    .then(res => res.json())
    .then(data => {
        if (data.success && data.citas) {
            allCitas = data.citas;
            renderCitas(allCitas);
        } else if (data.citas) {
            allCitas = data.citas;
            renderCitas(allCitas);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotificacion('Error al cargar citas', 'error');
    });
}

function loadHistorial() {
    fetch(`${API_URL}/historial`, {
        headers: { 'Authorization': `Bearer ${currentToken}` }
    })
    .then(res => res.json())
    .then(data => {
        if (data.success && data.historial) {
            allHistorial = data.historial;
            renderHistorial(allHistorial);
        } else if (data.historial) {
            allHistorial = data.historial;
            renderHistorial(allHistorial);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotificacion('Error al cargar historial', 'error');
    });
}

function loadPagos() {
    fetch(`${API_URL}/pagos`, {
        headers: { 'Authorization': `Bearer ${currentToken}` }
    })
    .then(res => res.json())
    .then(data => {
        if (data.success && data.pagos) {
            allPagos = data.pagos;
            renderPagos(allPagos);
        } else if (data.pagos) {
            allPagos = data.pagos;
            renderPagos(allPagos);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotificacion('Error al cargar pagos', 'error');
    });
}

// ===== RENDER FUNCTIONS =====
function renderDoctores(doctores) {
    const grid = document.getElementById('doctores-grid');
    if (!grid) return;
    
    grid.innerHTML = '';

    if (!doctores || doctores.length === 0) {
        grid.innerHTML = '<p class="no-data">No hay doctores disponibles</p>';
        return;
    }

    doctores.forEach(doctor => {
        const card = document.createElement('div');
        card.className = 'doctor-card';
        const nombreCompleto = doctor.nombreCompleto || `${doctor.nombre} ${doctor.apellido}`;
        card.innerHTML = `
            <div class="doctor-header">
                <h3>${nombreCompleto}</h3>
                <span class="rating">⭐ ${doctor.calificacion || 5}/5</span>
            </div>
            <p><strong>Especialidad:</strong> ${doctor.especialidad}</p>
            <p><strong>Experiencia:</strong> ${doctor.experiencia || 0} años</p>
            <p><strong>Consulta:</strong> $${doctor.precioConsulta || 50}</p>
            ${doctor.biografia ? `<p><strong>Biografía:</strong> ${doctor.biografia}</p>` : ''}
            <button class="btn-agendar" onclick="abrirModalCita('${doctor._id}', '${nombreCompleto.replace(/'/g, "\\'")}')">Agendar cita</button>
        `;
        grid.appendChild(card);
    });
}

function renderCitas(citas) {
    const list = document.getElementById('citas-list');
    if (!list) return;
    
    list.innerHTML = '';

    if (!citas || citas.length === 0) {
        list.innerHTML = '<p class="no-data">No hay citas</p>';
        return;
    }

    citas.forEach(cita => {
        const card = document.createElement('div');
        card.className = 'cita-card';
        const nombrePersona = currentUser.tipo === 'doctor' ? cita.nombrePaciente : cita.nombreDoctor;
        card.innerHTML = `
            <div class="cita-header">
                <h3>${nombrePersona}</h3>
                <span class="status ${cita.estado}">${cita.estado}</span>
            </div>
            <p><strong>📅 Fecha:</strong> ${new Date(cita.fecha).toLocaleString('es-ES')}</p>
            <p><strong>⏱️ Duración:</strong> ${cita.duracion} minutos</p>
            <p><strong>💵 Precio:</strong> $${cita.precio}</p>
            <p><strong>💳 Pagada:</strong> ${cita.pagada ? '✅ Sí' : '❌ No'}</p>
            <p><strong>📝 Motivo:</strong> ${cita.motivo}</p>
            ${cita.estado === 'confirmada' ? `<button class="btn-video" onclick="iniciarVideollamada('${cita._id}')">📹 Videollamada</button>` : ''}
            ${cita.estado !== 'completada' && cita.estado !== 'cancelada' ? `<button class="btn-cancelar" onclick="cancelarCita('${cita._id}')">Cancelar</button>` : ''}
        `;
        list.appendChild(card);
    });
}

function renderHistorial(historial) {
    const list = document.getElementById('historial-list');
    if (!list) return;
    
    list.innerHTML = '';

    if (!historial || historial.length === 0) {
        list.innerHTML = '<p class="no-data">No hay registros en tu historial médico</p>';
        return;
    }

    historial.forEach(item => {
        const card = document.createElement('div');
        card.className = 'historial-card';
        card.innerHTML = `
            <div class="historial-header">
                <h3>Consulta con Dr. ${item.nombreDoctor}</h3>
                <p class="date">${new Date(item.fecha).toLocaleString('es-ES')}</p>
            </div>
            <div class="historial-content">
                <p><strong>🔍 Diagnóstico:</strong> ${item.diagnostico}</p>
                ${item.sintomas && item.sintomas.length > 0 ? `<p><strong>🤒 Síntomas:</strong> ${item.sintomas.join(', ')}</p>` : ''}
                <p><strong>💊 Tratamiento:</strong> ${item.tratamiento}</p>
                ${item.medicinas && item.medicinas.length > 0 ? `
                    <div class="medicinas">
                        <strong>💊 Medicinas Prescritas:</strong>
                        <ul>
                            ${item.medicinas.map(med => `<li>${med.nombre} - ${med.dosis} - ${med.frecuencia} por ${med.duracion}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                ${item.alergias && item.alergias.length > 0 ? `<p><strong>⚠️ Alergias:</strong> ${item.alergias.join(', ')}</p>` : ''}
                ${item.examenesRecomendados && item.examenesRecomendados.length > 0 ? `<p><strong>🧪 Exámenes:</strong> ${item.examenesRecomendados.join(', ')}</p>` : ''}
                ${item.notasAdicionales ? `<p><strong>📝 Notas:</strong> ${item.notasAdicionales}</p>` : ''}
            </div>
        `;
        list.appendChild(card);
    });
}

function renderPagos(pagos) {
    const list = document.getElementById('pagos-list');
    if (!list) return;
    
    list.innerHTML = '';

    if (!pagos || pagos.length === 0) {
        list.innerHTML = '<p class="no-data">No hay pagos registrados</p>';
        return;
    }

    pagos.forEach(pago => {
        const card = document.createElement('div');
        card.className = 'pago-card';
        card.innerHTML = `
            <div class="pago-header">
                <h4>Pago - ${pago.nombrePaciente} → ${pago.nombreDoctor}</h4>
                <span class="status ${pago.estado}">${pago.estado}</span>
            </div>
            <p><strong>💵 Monto:</strong> $${pago.monto} ${pago.moneda || 'USD'}</p>
            <p><strong>💳 Método:</strong> ${pago.metodo}</p>
            <p><strong>📅 Fecha:</strong> ${new Date(pago.createdAt).toLocaleString('es-ES')}</p>
            ${pago.descripcion ? `<p><strong>Descripción:</strong> ${pago.descripcion}</p>` : ''}
        `;
        list.appendChild(card);
    });
}

// ===== FILTROS =====
function filtrarDoctores() {
    const especialidad = document.getElementById('filtro-especialidad').value;
    const filtrados = especialidad 
        ? allDoctores.filter(d => d.especialidad === especialidad)
        : allDoctores;
    renderDoctores(filtrados);
}

function filtrarCitas() {
    const estado = document.getElementById('filtro-citas').value;
    const filtrados = estado
        ? allCitas.filter(c => c.estado === estado)
        : allCitas;
    renderCitas(filtrados);
}

function filtrarPagos() {
    const estado = document.getElementById('filtro-pagos').value;
    const filtrados = estado
        ? allPagos.filter(p => p.estado === estado)
        : allPagos;
    renderPagos(filtrados);
}

// ===== MODALES Y FUNCIONES =====
function toggleDoctorFields() {
    const tipo = document.getElementById('register-tipo').value;
    const doctorFields = document.getElementById('doctor-fields');
    doctorFields.style.display = tipo === 'doctor' ? 'block' : 'none';
}

function switchToRegister() {
    document.getElementById('login-form').classList.remove('active');
    document.getElementById('register-form').classList.add('active');
}

function switchToLogin() {
    document.getElementById('register-form').classList.remove('active');
    document.getElementById('login-form').classList.add('active');
}

function abrirModalCita(doctorId, doctorName) {
    document.getElementById('modal-doctor-name').textContent = `Agendar cita con Dr. ${doctorName}`;
    document.getElementById('cita-doctor-id').value = doctorId;
    document.getElementById('modal-cita').classList.add('show');
}

function cerrarModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
}

function agendarCita(event) {
    event.preventDefault();
    const citaData = {
        doctor: document.getElementById('cita-doctor-id').value,
        fecha: document.getElementById('cita-fecha').value,
        motivo: document.getElementById('cita-motivo').value,
        duracion: 30
    };

    fetch(`${API_URL}/citas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentToken}`
        },
        body: JSON.stringify(citaData)
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            showNotificacion('¡Cita agendada exitosamente!', 'success');
            cerrarModal('modal-cita');
            document.querySelector('form[onsubmit="agendarCita(event)"]').reset();
            loadDashboardStats();
        } else {
            showNotificacion(data.error || 'Error al agendar cita', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotificacion('Error de conexión', 'error');
    });
}

function iniciarVideollamada(citaId) {
    fetch(`${API_URL}/citas/${citaId}/videollamada`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${currentToken}` }
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            window.open(data.videoCallLink, '_blank');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotificacion('Error al generar videollamada', 'error');
    });
}

function cancelarCita(citaId) {
    if (confirm('¿Estás seguro de que deseas cancelar esta cita?')) {
        fetch(`${API_URL}/citas/${citaId}/cancelar`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${currentToken}` }
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                showNotificacion('Cita cancelada', 'success');
                loadCitas();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showNotificacion('Error al cancelar cita', 'error');
        });
    }
}

// ===== NOTIFICACIONES =====
function showNotificacion(mensaje, tipo = 'success') {
    const notif = document.getElementById('notificacion');
    notif.textContent = mensaje;
    notif.className = `notificacion show ${tipo}`;
    
    setTimeout(() => {
        notif.classList.remove('show');
    }, 3000);
}

// Cerrar modal al hacer clic fuera
window.onclick = function(event) {
    const modal = document.getElementById('modal-cita');
    if (event.target == modal) {
        cerrarModal('modal-cita');
    }
};

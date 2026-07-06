# 🏥 ConsultorioMedico+ - Guía Rápida de Instalación

## ⚡ INSTALACIÓN RÁPIDA (5 MINUTOS)

### 1. **Requisitos Previos**
- Node.js v14+ (https://nodejs.org/)
- MongoDB (local o en la nube)
- Un navegador web

### 2. **Instalar Backend**

```bash
cd backend
npm install
```

### 3. **Configurar Backend (.env)**

Crea un archivo `backend/.env` con:

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/consultorio
JWT_SECRET=tu_clave_secreta_aqui
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
```

### 4. **Iniciar Backend**

```bash
cd backend
npm start
# O para desarrollo con auto-reload:
npm run dev
```

Debería ver:
```
✅ Conectado a MongoDB
🚀 Servidor corriendo en puerto 3000
```

### 5. **Usar Frontend HTML**

Simplemente abre el archivo `index.html` en tu navegador:

```bash
# Opción 1: Doble clic en index.html
# Opción 2: Con servidor local
cd .
python -m http.server 8000
# Luego ve a: http://localhost:8000
```

## 📝 Usuarios de Prueba

### Crear un Paciente
1. Haz clic en "Regístrate aquí"
2. Llena los datos:
   - **Nombre:** Juan
   - **Apellido:** Pérez
   - **Email:** juan@example.com
   - **Contraseña:** 123456
   - **Teléfono:** +34123456789
   - **Tipo:** Soy Paciente
3. Clic en "Registrarse"

### Crear un Doctor
1. Haz clic en "Regístrate aquí"
2. Llena los datos:
   - **Nombre:** Carlos
   - **Apellido:** García
   - **Email:** carlos@example.com
   - **Contraseña:** 123456
   - **Teléfono:** +34987654321
   - **Tipo:** Soy Doctor
   - **Especialidad:** Medicina General
   - **Número de Licencia:** DOC123456
3. Clic en "Registrarse"

## 🎯 Funcionalidades Principales

### Para Pacientes:
- ✅ Ver todos los doctores disponibles
- ✅ Filtrar por especialidad
- ✅ Agendar citas
- ✅ Ver historial médico
- ✅ Ver registro de pagos
- ✅ Dejar reseñas

### Para Doctores:
- ✅ Recibir solicitudes de citas
- ✅ Crear historial médico de pacientes
- ✅ Ver pagos recibidos
- ✅ Gestionar disponibilidad

## 📱 API Endpoints Principales

```
# Autenticación
POST /api/auth/login
POST /api/auth/registro

# Doctores
GET /api/doctors
GET /api/doctors/:id
PUT /api/doctors/:id

# Citas
GET /api/citas
POST /api/citas
PUT /api/citas/:id
POST /api/citas/:id/videollamada
POST /api/citas/:id/cancelar

# Historial Médico
GET /api/historial
POST /api/historial
GET /api/historial/:id
PUT /api/historial/:id

# Pagos
GET /api/pagos
POST /api/pagos/crear-intento
POST /api/pagos/confirmar

# Reseñas
GET /api/resenas/doctor/:doctorId
POST /api/resenas
PUT /api/resenas/:id
DELETE /api/resenas/:id
```

## 🐛 Solución de Problemas

### "Error de conexión a MongoDB"
- Asegúrate que MongoDB está corriendo
- Verifica la URI en `.env`

### "CORS Error"
- Verifica que CORS_ORIGIN en `.env` incluya `http://localhost:3000`

### "Puerto 3000 ya en uso"
- Cambia PORT en `.env` a otro puerto (ej: 3001)

## 📁 Estructura del Proyecto

```
consultorio-medico-app/
├── backend/
│   ├── models/
│   │   ├── Usuario.js
│   │   ├── Cita.js
│   │   ├── HistoricoMedico.js
│   │   ├── Pago.js
│   │   └── Resena.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── doctors.js
│   │   ├── citas.js
│   │   ├── historial.js
│   │   ├── pagos.js
│   │   └── resenas.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── index.html (Frontend HTML puro)
├── styles.css
├── app.js
└── README.md
```

## 🚀 Próximas Características

- [ ] Integración con Stripe para pagos reales
- [ ] Videollamadas con Twilio
- [ ] Sistema de notificaciones por email/SMS
- [ ] Cancelación automática de citas no pagadas
- [ ] Dashboard avanzado para doctores
- [ ] Reportes y estadísticas
- [ ] App móvil React Native

## 📞 Soporte

Para reportar bugs o sugerencias, abre un issue en GitHub.

## 📄 Licencia

MIT - Libre para usar y modificar

---

**¡Felicidades! Ya tienes tu plataforma de telemedicina funcionando! 🎉**

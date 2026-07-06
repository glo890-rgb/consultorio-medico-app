# ConsultorioMedico+ - Plataforma de Telemedicina

## 🏥 Descripción

ConsultorioMedico+ es una plataforma completa de telemedicina que permite a pacientes agendar citas con doctores, realizar pagos, acceder a historial médico digital y comunicarse a través de videollamadas.

## ✨ Características Principales

### 👤 Gestión de Usuarios
- Registro de pacientes y doctores
- Autenticación segura con JWT
- Perfiles personalizables
- Sistema de calificaciones

### 📅 Agendamiento de Citas
- Buscar doctores por especialidad
- Agendar citas con disponibilidad
- Estados de cita (pendiente, confirmada, completada, cancelada)
- Recordatorios automáticos

### 💳 Sistema de Pagos
- Pagos seguros con Stripe
- Historial de transacciones
- Múltiples métodos de pago
- Comprobantes digitales

### 🎥 Videollamadas
- Llamadas integradas directamente en la plataforma
- Grabación de consultas
- Chat en tiempo real

### 📋 Historial Médico Digital
- Diagnósticos y tratamientos
- Prescripción digital de medicinas
- Registro de alergias
- Exámenes recomendados

### ⭐ Sistema de Reseñas
- Calificación de doctores (1-5 estrellas)
- Comentarios de pacientes
- Promedio de calificaciones

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **JWT** - Autenticación
- **Stripe** - Pagos en línea
- **Twilio** - Videollamadas

### Frontend
- **HTML5** - Estructura
- **CSS3** - Estilos responsive
- **Vanilla JavaScript** - Lógica de cliente
- **Axios** - Solicitudes HTTP

## 📦 Instalación

Ver [INSTALACION.md](INSTALACION.md) para instrucciones detalladas.

### Instalación Rápida

```bash
# 1. Backend
cd backend
npm install
cp .env.example .env
npm start

# 2. Frontend
# Abre index.html en tu navegador
```

## 🎯 Funcionalidades por Rol

### Paciente
- Ver lista de doctores especializados
- Agendar citas
- Realizar pagos
- Ver historial médico
- Dejar reseñas
- Acceder a videollamadas

### Doctor
- Recibir solicitudes de citas
- Crear/actualizar historial médico
- Ver ingresos
- Gestionar disponibilidad
- Consultar pacientes

### Admin
- Gestionar usuarios
- Monitorear transacciones
- Ver reportes
- Suspender cuentas

## 🔐 Seguridad

- Contraseñas encriptadas con bcrypt
- Tokens JWT con expiración
- Validación de datos en servidor
- CORS configurado
- Sanitización de inputs

## 📊 API Documentation

Todos los endpoints requieren autenticación (excepto login/registro):

```bash
Header: Authorization: Bearer {token}
```

Ver endpoints disponibles en `backend/routes/`

## 🚀 Deployment

### Backend (Heroku/Railway)
```bash
npm install -g heroku-cli
heroku login
heroku create tu-app-nombre
git push heroku main
```

### Frontend (Vercel/Netlify)
```bash
npm install -g vercel
vercel
```

## 📝 Variables de Entorno

```env
# Backend
PORT=3000
MONGODB_URI=mongodb://...
JWT_SECRET=tu_clave_secreta
STRIPE_SECRET_KEY=sk_test_...
CORS_ORIGIN=http://localhost:3000

# Frontend
REACT_APP_API_URL=http://localhost:3000/api
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_...
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

MIT License - ver LICENSE.md

## 👨‍💻 Autor

glo890-rgb

## 🙏 Agradecimientos

- MongoDB
- Express.js
- Stripe
- Twilio

## 📞 Contacto

Para soporte: glo.890@gmail.com

---

**¡Gracias por usar ConsultorioMedico+! 🏥**

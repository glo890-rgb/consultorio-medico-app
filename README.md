# 🏥 ConsultorioMedico+ - Plataforma Integral de Telemedicina

Sistema completo de consultorio médico online similar a Doctoralia con pagos, videollamadas e historial médico.

## 🚀 Características

- ✅ Autenticación segura con JWT
- ✅ Sistema de pagos con Stripe
- ✅ Videollamadas integradas
- ✅ Historial médico completo
- ✅ Gestión de citas
- ✅ Reseñas y calificaciones
- ✅ Dashboard con estadísticas
- ✅ UI/UX moderno y responsive

## 📋 Requisitos

- Node.js v14+
- MongoDB local o en la nube
- Cuentas en:
  - [Stripe](https://stripe.com) (para pagos)
  - [Twilio](https://twilio.com) (para videollamadas)

## 🛠️ Instalación

### 1. Backend

```bash
cd backend
npm install
npm run dev
```

### 2. Frontend

```bash
cd frontend
npm install
npm start
```

## 🔑 Configuración de Variables de Entorno

### Backend (.env)
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/consultorio
JWT_SECRET=tu_clave_secreta_muy_segura_aqui
STRIPE_SECRET_KEY=sk_test_xxxxx
TWILIO_ACCOUNT_SID=xxxxx
TWILIO_AUTH_TOKEN=xxxxx
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:3000/api
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_xxxxx
```

## 📚 Estructura del Proyecto

```
consultorio-medico-app/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── package.json
└── README.md
```

## 💡 Uso Rápido

1. **Registrarse** como Paciente o Doctor
2. **Ver doctores disponibles**
3. **Agendar cita** seleccionando fecha y especialidad
4. **Realizar pago** con tarjeta de crédito
5. **Iniciar videollamada** en la fecha/hora programada
6. **Ver historial médico** con diagnósticos y medicinas

## 🔐 Seguridad

- Contraseñas encriptadas con bcrypt
- Tokens JWT para autenticación
- Validación de datos en servidor
- CORS configurado

## 📞 Soporte

Para reportar bugs o sugerencias, abre un issue en GitHub.

## 📄 Licencia

MIT

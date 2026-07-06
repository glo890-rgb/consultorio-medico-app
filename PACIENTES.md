# 📋 LISTA DE PACIENTES DISPONIBLES

## 👤 Pacientes en la Plataforma

### 1. **Juan Pérez García**
- **Email:** juan.perez@email.com
- **Teléfono:** +34612345601
- **Edad:** 35 años
- **Estado:** Activo

---

### 2. **María López Fernández**
- **Email:** maria.lopez@email.com
- **Teléfono:** +34612345602
- **Edad:** 28 años
- **Estado:** Activo

---

### 3. **Antonio Martínez Rodríguez**
- **Email:** antonio.martinez@email.com
- **Teléfono:** +34612345603
- **Edad:** 42 años
- **Estado:** Activo

---

### 4. **Carmen González Sánchez**
- **Email:** carmen.gonzalez@email.com
- **Teléfono:** +34612345604
- **Edad:** 31 años
- **Estado:** Activo

---

### 5. **Carlos Hernández Jiménez**
- **Email:** carlos.hernandez@email.com
- **Teléfono:** +34612345605
- **Edad:** 45 años
- **Estado:** Activo

---

### 6. **Laura Vázquez Torres**
- **Email:** laura.vazquez@email.com
- **Teléfono:** +34612345606
- **Edad:** 26 años
- **Estado:** Activo

---

### 7. **Miguel Álvarez Moreno**
- **Email:** miguel.alvarez@email.com
- **Teléfono:** +34612345607
- **Edad:** 38 años
- **Estado:** Activo

---

### 8. **Isabel Castillo Ruiz**
- **Email:** isabel.castillo@email.com
- **Teléfono:** +34612345608
- **Edad:** 52 años
- **Estado:** Activo

---

### 9. **Francisco Domínguez Pérez**
- **Email:** francisco.dominguez@email.com
- **Teléfono:** +34612345609
- **Edad:** 47 años
- **Estado:** Activo

---

### 10. **Rosa García López**
- **Email:** rosa.garcia@email.com
- **Teléfono:** +34612345610
- **Edad:** 33 años
- **Estado:** Activo

---

### 11. **Pedro Flores Vargas**
- **Email:** pedro.flores@email.com
- **Teléfono:** +34612345611
- **Edad:** 56 años
- **Estado:** Activo

---

### 12. **Silvia Reyes Muñoz**
- **Email:** silvia.reyes@email.com
- **Teléfono:** +34612345612
- **Edad:** 29 años
- **Estado:** Activo

---

### 13. **Diego Navarro Gómez**
- **Email:** diego.navarro@email.com
- **Teléfono:** +34612345613
- **Edad:** 40 años
- **Estado:** Activo

---

### 14. **Marta Santos Cárdenas**
- **Email:** marta.santos@email.com
- **Teléfono:** +34612345614
- **Edad:** 37 años
- **Estado:** Activo

---

### 15. **Javier Rivas Cordero**
- **Email:** javier.rivas@email.com
- **Teléfono:** +34612345615
- **Edad:** 44 años
- **Estado:** Activo

---

## 🚀 Cómo Insertar los Pacientes

### Opción 1: Usar el Script de Seed

```bash
cd backend
node seed-patients.js
```

Esto insertará automáticamente los 15 pacientes en MongoDB.

### Opción 2: Inserción Manual a través de la UI

1. Abre la plataforma en tu navegador
2. Haz clic en "Regístrate aquí"
3. Selecciona "Soy Paciente"
4. Llena los datos con la información de un paciente
5. Haz clic en "Registrarse"

## 📊 Resumen de Pacientes

| # | Nombre | Email | Teléfono | Estado |
|---|---|---|---|---|
| 1 | Juan Pérez García | juan.perez@email.com | +34612345601 | ✅ Activo |
| 2 | María López Fernández | maria.lopez@email.com | +34612345602 | ✅ Activo |
| 3 | Antonio Martínez Rodríguez | antonio.martinez@email.com | +34612345603 | ✅ Activo |
| 4 | Carmen González Sánchez | carmen.gonzalez@email.com | +34612345604 | ✅ Activo |
| 5 | Carlos Hernández Jiménez | carlos.hernandez@email.com | +34612345605 | ✅ Activo |
| 6 | Laura Vázquez Torres | laura.vazquez@email.com | +34612345606 | ✅ Activo |
| 7 | Miguel Álvarez Moreno | miguel.alvarez@email.com | +34612345607 | ✅ Activo |
| 8 | Isabel Castillo Ruiz | isabel.castillo@email.com | +34612345608 | ✅ Activo |
| 9 | Francisco Domínguez Pérez | francisco.dominguez@email.com | +34612345609 | ✅ Activo |
| 10 | Rosa García López | rosa.garcia@email.com | +34612345610 | ✅ Activo |
| 11 | Pedro Flores Vargas | pedro.flores@email.com | +34612345611 | ✅ Activo |
| 12 | Silvia Reyes Muñoz | silvia.reyes@email.com | +34612345612 | ✅ Activo |
| 13 | Diego Navarro Gómez | diego.navarro@email.com | +34612345613 | ✅ Activo |
| 14 | Marta Santos Cárdenas | marta.santos@email.com | +34612345614 | ✅ Activo |
| 15 | Javier Rivas Cordero | javier.rivas@email.com | +34612345615 | ✅ Activo |

## 💡 Credenciales para Pruebas

Todos los pacientes comparten la misma contraseña para pruebas:
- **Contraseña:** `123456`

**Ejemplo de Login:**
```
Email: juan.perez@email.com
Contraseña: 123456
```

## 🌈 Flujo de Pruebas Recomendado

### 1. **Crear Pacientes y Doctores**
```bash
# En la carpeta backend
node seed-doctors.js
node seed-patients.js
```

### 2. **Iniciar la Plataforma**
```bash
# Terminal 1: Backend
cd backend
npm start

# Terminal 2: Frontend
# Abre index.html en tu navegador
```

### 3. **Probar Funcionalidades**
- 🚪 Login como paciente
- 👨‍⚕️ Ver lista de doctores
- 📅 Agendar cita
- 💳 Ver pagos
- 📄 Ver historial médico

## 📞 Contacto de Pacientes

Para contactar directamente con los pacientes o enviar notificaciones, usa los números de teléfono o emails listados arriba.

---

**✨ ¡Ya tienes 15 pacientes listos para usar en tu plataforma!**

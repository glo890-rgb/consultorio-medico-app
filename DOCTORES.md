# 📋 LISTA DE DOCTORES DISPONIBLES

## 👨‍⚕️ Doctores en la Plataforma

### 1. **Dr. Carlos García López**
- **Especialidad:** Medicina General
- **Experiencia:** 15 años
- **Precio Consulta:** $50
- **Calificación:** ⭐⭐⭐⭐⭐ 4.8/5
- **Email:** carlos.garcia@consultorio.com
- **Teléfono:** +34912345601
- **Biografía:** Médico general con 15 años de experiencia en atención primaria. Especializado en diagnóstico y tratamiento de enfermedades comunes.

---

### 2. **Dra. María Rodríguez Pérez**
- **Especialidad:** Cardiología
- **Experiencia:** 20 años
- **Precio Consulta:** $80
- **Calificación:** ⭐⭐⭐⭐⭐ 4.9/5
- **Email:** maria.rodriguez@consultorio.com
- **Teléfono:** +34912345602
- **Biografía:** Cardióloga especializada en enfermedades del corazón y prevención cardiovascular. Miembro de la Sociedad Española de Cardiología.

---

### 3. **Dr. Juan Fernández Martínez**
- **Especialidad:** Dermatología
- **Experiencia:** 12 años
- **Precio Consulta:** $70
- **Calificación:** ⭐⭐⭐⭐ 4.7/5
- **Email:** juan.fernandez@consultorio.com
- **Teléfono:** +34912345603
- **Biografía:** Dermatólogo especializado en tratamiento de acné, psoriasis y otras enfermedades de la piel. Utiliza tecnología láser de última generación.

---

### 4. **Dra. Ana Sánchez González**
- **Especialidad:** Pediatría
- **Experiencia:** 18 años
- **Precio Consulta:** $60
- **Calificación:** ⭐⭐⭐⭐⭐ 4.9/5
- **Email:** ana.sanchez@consultorio.com
- **Teléfono:** +34912345604
- **Biografía:** Pediatra dedicada a la salud infantil desde recién nacidos hasta adolescentes. Experta en vacunación y desarrollo infantil.

---

### 5. **Dr. Roberto López Jiménez**
- **Especialidad:** Neurología
- **Experiencia:** 22 años
- **Precio Consulta:** $85
- **Calificación:** ⭐⭐⭐⭐⭐ 4.8/5
- **Email:** roberto.lopez@consultorio.com
- **Teléfono:** +34912345605
- **Biografía:** Neurólogo especializado en migrañas, Parkinson y Alzheimer. Autor de varios artículos científicos en neurología.

---

### 6. **Dra. Patricia Martínez Ruiz**
- **Especialidad:** Psiquiatría
- **Experiencia:** 16 años
- **Precio Consulta:** $75
- **Calificación:** ⭐⭐⭐⭐ 4.6/5
- **Email:** patricia.martinez@consultorio.com
- **Teléfono:** +34912345606
- **Biografía:** Psiquiatra especializada en depresión, ansiedad y trastornos del sueño. Utiliza psicoterapia cognitivo-conductual.

---

### 7. **Dr. David Álvarez Herrera**
- **Especialidad:** Oftalmología
- **Experiencia:** 19 años
- **Precio Consulta:** $80
- **Calificación:** ⭐⭐⭐⭐⭐ 4.9/5
- **Email:** david.alvarez@consultorio.com
- **Teléfono:** +34912345607
- **Biografía:** Oftalmólogo especializado en cirugía de cataratas y corrección láser de miopía. Director de clínica oftalmológica.

---

### 8. **Dra. Claudia Gómez Flores**
- **Especialidad:** Otorrinolaringología
- **Experiencia:** 14 años
- **Precio Consulta:** $65
- **Calificación:** ⭐⭐⭐⭐ 4.7/5
- **Email:** claudia.gomez@consultorio.com
- **Teléfono:** +34912345608
- **Biografía:** Especialista en enfermedades de oído, nariz y garganta. Experta en cirugía endoscópica.

---

### 9. **Dr. Fernando Castillo Moreno**
- **Especialidad:** Urología
- **Experiencia:** 21 años
- **Precio Consulta:** $90
- **Calificación:** ⭐⭐⭐⭐⭐ 4.8/5
- **Email:** fernando.castillo@consultorio.com
- **Teléfono:** +34912345609
- **Biografía:** Urólogo especializado en cálculos renales y próstata. Pionero en técnicas minimamente invasivas.

---

### 10. **Dra. Elena Vargas López**
- **Especialidad:** Gastroenterología
- **Experiencia:** 17 años
- **Precio Consulta:** $75
- **Calificación:** ⭐⭐⭐⭐ 4.7/5
- **Email:** elena.vargas@consultorio.com
- **Teléfono:** +34912345610
- **Biografía:** Gastroenteróloga especializada en endoscopia y tratamiento de enfermedades digestivas. Experta en colon irritable.

---

### 11. **Dr. Guillermo Torres Reyes**
- **Especialidad:** Neumología
- **Experiencia:** 19 años
- **Precio Consulta:** $70
- **Calificación:** ⭐⭐⭐⭐⭐ 4.8/5
- **Email:** guillermo.torres@consultorio.com
- **Teléfono:** +34912345611
- **Biografía:** Neumólogo especializado en asma, EPOC y enfermedades respiratorias. Investigador activo en medicina pulmonar.

---

## 🚀 Cómo Insertar los Doctores en la Base de Datos

### Opción 1: Usar el Script de Seed

```bash
cd backend
node seed-doctors.js
```

Esto insertará automáticamente los 11 doctores en MongoDB.

### Opción 2: Inserción Manual

1. Abre el archivo `backend/seed-doctors.js`
2. Copia la lista de doctores
3. Usa Postman o Thunder Client para hacer POST a `/api/auth/registro` con cada doctor

## 📊 Resumen de Especialidades

| Especialidad | Doctor | Precio | Rating |
|---|---|---|---|
| Medicina General | Dr. Carlos García López | $50 | 4.8 ⭐ |
| Cardiología | Dra. María Rodríguez Pérez | $80 | 4.9 ⭐ |
| Dermatología | Dr. Juan Fernández Martínez | $70 | 4.7 ⭐ |
| Pediatría | Dra. Ana Sánchez González | $60 | 4.9 ⭐ |
| Neurología | Dr. Roberto López Jiménez | $85 | 4.8 ⭐ |
| Psiquiatría | Dra. Patricia Martínez Ruiz | $75 | 4.6 ⭐ |
| Oftalmología | Dr. David Álvarez Herrera | $80 | 4.9 ⭐ |
| Otorrinolaringología | Dra. Claudia Gómez Flores | $65 | 4.7 ⭐ |
| Urología | Dr. Fernando Castillo Moreno | $90 | 4.8 ⭐ |
| Gastroenterología | Dra. Elena Vargas López | $75 | 4.7 ⭐ |
| Neumología | Dr. Guillermo Torres Reyes | $70 | 4.8 ⭐ |

## 💡 Credenciales para Pruebas

Todos los doctores comparten la misma contraseña para pruebas:
- **Contraseña:** `123456`

**Ejemplo de Login:**
```
Email: carlos.garcia@consultorio.com
Contraseña: 123456
```

## 📞 Contacto de Doctores

Para contactar directamente con los doctores o para hacer citas de emergencia, usa los números de teléfono listados arriba.

---

**✨ ¡Todos nuestros doctores están certificados y cuentan con amplia experiencia!**

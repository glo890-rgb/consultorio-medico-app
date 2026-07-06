// Script para insertar doctores de ejemplo en la base de datos
// Usa: node seed-doctors.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

const Usuario = require('./models/Usuario');

const doctoresEjemplo = [
    {
        nombre: 'Carlos",
        apellido: 'García López',
        email: 'carlos.garcia@consultorio.com',
        contraseña: '123456',
        telefono: '+34912345601',
        tipo: 'doctor',
        especialidad: 'Medicina General',
        numeroLicencia: 'MED001234',
        experiencia: 15,
        biografia: 'Médico general con 15 años de experiencia en atención primaria. Especializado en diagnóstico y tratamiento de enfermedades comunes.',
        precioConsulta: 50,
        calificacion: 4.8
    },
    {
        nombre: 'María',
        apellido: 'Rodríguez Pérez',
        email: 'maria.rodriguez@consultorio.com',
        contraseña: '123456',
        telefono: '+34912345602',
        tipo: 'doctor',
        especialidad: 'Cardiología',
        numeroLicencia: 'CARD001234',
        experiencia: 20,
        biografia: 'Cardióloga especializada en enfermedades del corazón y prevención cardiovascular. Miembro de la Sociedad Española de Cardiología.',
        precioConsulta: 80,
        calificacion: 4.9
    },
    {
        nombre: 'Juan',
        apellido: 'Fernández Martínez',
        email: 'juan.fernandez@consultorio.com',
        contraseña: '123456',
        telefono: '+34912345603',
        tipo: 'doctor',
        especialidad: 'Dermatología',
        numeroLicencia: 'DERM001234',
        experiencia: 12,
        biografia: 'Dermatólogo especializado en tratamiento de acné, psoriasis y otras enfermedades de la piel. Utiliza tecnología láser de última generación.',
        precioConsulta: 70,
        calificacion: 4.7
    },
    {
        nombre: 'Ana',
        apellido: 'Sánchez González',
        email: 'ana.sanchez@consultorio.com',
        contraseña: '123456',
        telefono: '+34912345604',
        tipo: 'doctor',
        especialidad: 'Pediatría',
        numeroLicencia: 'PED001234',
        experiencia: 18,
        biografia: 'Pediatra dedicada a la salud infantil desde recién nacidos hasta adolescentes. Experta en vacunación y desarrollo infantil.',
        precioConsulta: 60,
        calificacion: 4.9
    },
    {
        nombre: 'Roberto',
        apellido: 'López Jiménez',
        email: 'roberto.lopez@consultorio.com',
        contraseña: '123456',
        telefono: '+34912345605',
        tipo: 'doctor',
        especialidad: 'Neurología',
        numeroLicencia: 'NEUR001234',
        experiencia: 22,
        biografia: 'Neurólogo especializado en migrañas, Parkinson y Alzheimer. Autor de varios artículos científicos en neurología.',
        precioConsulta: 85,
        calificacion: 4.8
    },
    {
        nombre: 'Patricia',
        apellido: 'Martínez Ruiz',
        email: 'patricia.martinez@consultorio.com',
        contraseña: '123456',
        telefono: '+34912345606',
        tipo: 'doctor',
        especialidad: 'Psiquiatría',
        numeroLicencia: 'PSIQ001234',
        experiencia: 16,
        biografia: 'Psiquiatra especializada en depresión, ansiedad y trastornos del sueño. Utiliza psicoterapia cognitivo-conductual.',
        precioConsulta: 75,
        calificacion: 4.6
    },
    {
        nombre: 'David',
        apellido: 'Álvarez Herrera',
        email: 'david.alvarez@consultorio.com',
        contraseña: '123456',
        telefono: '+34912345607',
        tipo: 'doctor',
        especialidad: 'Oftalmología',
        numeroLicencia: 'OFTA001234',
        experiencia: 19,
        biografia: 'Oftalmólogo especializado en cirugía de cataratas y corrección láser de miopía. Director de clínica oftalmológica.',
        precioConsulta: 80,
        calificacion: 4.9
    },
    {
        nombre: 'Claudia',
        apellido: 'Gómez Flores',
        email: 'claudia.gomez@consultorio.com',
        contraseña: '123456',
        telefono: '+34912345608',
        tipo: 'doctor',
        especialidad: 'Otorrinolaringología',
        numeroLicencia: 'ORL001234',
        experiencia: 14,
        biografia: 'Especialista en enfermedades de oído, nariz y garganta. Experta en cirugía endoscópica.',
        precioConsulta: 65,
        calificacion: 4.7
    },
    {
        nombre: 'Fernando',
        apellido: 'Castillo Moreno',
        email: 'fernando.castillo@consultorio.com',
        contraseña: '123456',
        telefono: '+34912345609',
        tipo: 'doctor',
        especialidad: 'Urología',
        numeroLicencia: 'UROL001234',
        experiencia: 21,
        biografia: 'Urólogo especializado en cálculos renales y próstata. Pionero en técnicas minimamente invasivas.',
        precioConsulta: 90,
        calificacion: 4.8
    },
    {
        nombre: 'Elena',
        apellido: 'Vargas López',
        email: 'elena.vargas@consultorio.com',
        contraseña: '123456',
        telefono: '+34912345610',
        tipo: 'doctor',
        especialidad: 'Gastroenterología',
        numeroLicencia: 'GAST001234',
        experiencia: 17,
        biografia: 'Gastroenteróloga especializada en endoscopia y tratamiento de enfermedades digestivas. Experta en colon irritable.',
        precioConsulta: 75,
        calificacion: 4.7
    },
    {
        nombre: 'Guillermo',
        apellido: 'Torres Reyes',
        email: 'guillermo.torres@consultorio.com',
        contraseña: '123456',
        telefono: '+34912345611',
        tipo: 'doctor',
        especialidad: 'Neumología',
        numeroLicencia: 'NEUMOL001234',
        experiencia: 19,
        biografia: 'Neumólogo especializado en asma, EPOC y enfermedades respiratorias. Investigador activo en medicina pulmonar.',
        precioConsulta: 70,
        calificacion: 4.8
    }
];

async function seedDoctores() {
    try {
        // Conectar a MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/consultorio', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('✅ Conectado a MongoDB');

        // Limpiar doctores existentes
        await Usuario.deleteMany({ tipo: 'doctor' });
        console.log('🗑️ Doctores previos eliminados');

        // Insertar nuevos doctores
        for (const doctor of doctoresEjemplo) {
            const nuevoDoctor = new Usuario(doctor);
            await nuevoDoctor.save();
            console.log(`✅ Doctor creado: Dr. ${doctor.nombre} ${doctor.apellido} (${doctor.especialidad})`);
        }

        console.log(`\n🎉 Se crearon ${doctoresEjemplo.length} doctores exitosamente!`);
        console.log('\n📝 Doctores disponibles:');
        console.log('═══════════════════════════════════════════════════════════════');
        
        doctoresEjemplo.forEach((doc, index) => {
            console.log(`${index + 1}. Dr. ${doc.nombre} ${doc.apellido}`);
            console.log(`   📋 Especialidad: ${doc.especialidad}`);
            console.log(`   📧 Email: ${doc.email}`);
            console.log(`   💰 Precio: $${doc.precioConsulta}`);
            console.log(`   ⭐ Calificación: ${doc.calificacion}/5`);
            console.log('───────────────────────────────────────────────────────────────');
        });

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

seedDoctores();

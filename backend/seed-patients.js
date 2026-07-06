// Script para insertar pacientes de ejemplo en la base de datos
// Usa: node seed-patients.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

const Usuario = require('./models/Usuario');

const pacientesEjemplo = [
    {
        nombre: 'Juan',
        apellido: 'Pérez García',
        email: 'juan.perez@email.com',
        contraseña: '123456',
        telefono: '+34612345601',
        tipo: 'paciente'
    },
    {
        nombre: 'María',
        apellido: 'López Fernández',
        email: 'maria.lopez@email.com',
        contraseña: '123456',
        telefono: '+34612345602',
        tipo: 'paciente'
    },
    {
        nombre: 'Antonio',
        apellido: 'Martínez Rodríguez',
        email: 'antonio.martinez@email.com',
        contraseña: '123456',
        telefono: '+34612345603',
        tipo: 'paciente'
    },
    {
        nombre: 'Carmen',
        apellido: 'González Sánchez',
        email: 'carmen.gonzalez@email.com',
        contraseña: '123456',
        telefono: '+34612345604',
        tipo: 'paciente'
    },
    {
        nombre: 'Carlos',
        apellido: 'Hernández Jiménez',
        email: 'carlos.hernandez@email.com',
        contraseña: '123456',
        telefono: '+34612345605',
        tipo: 'paciente'
    },
    {
        nombre: 'Laura',
        apellido: 'Vázquez Torres',
        email: 'laura.vazquez@email.com',
        contraseña: '123456',
        telefono: '+34612345606',
        tipo: 'paciente'
    },
    {
        nombre: 'Miguel',
        apellido: 'Álvarex Moreno',
        email: 'miguel.alvarez@email.com',
        contraseña: '123456',
        telefono: '+34612345607',
        tipo: 'paciente'
    },
    {
        nombre: 'Isabel',
        apellido: 'Castillo Ruiz',
        email: 'isabel.castillo@email.com',
        contraseña: '123456',
        telefono: '+34612345608',
        tipo: 'paciente'
    },
    {
        nombre: 'Francisco',
        apellido: 'Domínguez Pérez',
        email: 'francisco.dominguez@email.com',
        contraseña: '123456',
        telefono: '+34612345609',
        tipo: 'paciente'
    },
    {
        nombre: 'Rosa',
        apellido: 'García López',
        email: 'rosa.garcia@email.com',
        contraseña: '123456',
        telefono: '+34612345610',
        tipo: 'paciente'
    },
    {
        nombre: 'Pedro',
        apellido: 'Flores Vargas',
        email: 'pedro.flores@email.com',
        contraseña: '123456',
        telefono: '+34612345611',
        tipo: 'paciente'
    },
    {
        nombre: 'Silvia',
        apellido: 'Reyes Muñoz',
        email: 'silvia.reyes@email.com',
        contraseña: '123456',
        telefono: '+34612345612',
        tipo: 'paciente'
    },
    {
        nombre: 'Diego',
        apellido: 'Navarro Gómez',
        email: 'diego.navarro@email.com',
        contraseña: '123456',
        telefono: '+34612345613',
        tipo: 'paciente'
    },
    {
        nombre: 'Marta',
        apellido: 'Santos Cárdenas',
        email: 'marta.santos@email.com',
        contraseña: '123456',
        telefono: '+34612345614',
        tipo: 'paciente'
    },
    {
        nombre: 'Javier',
        apellido: 'Rivas Cordero',
        email: 'javier.rivas@email.com',
        contraseña: '123456',
        telefono: '+34612345615',
        tipo: 'paciente'
    }
];

async function seedPacientes() {
    try {
        // Conectar a MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/consultorio', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('✅ Conectado a MongoDB');

        // Limpiar pacientes existentes
        await Usuario.deleteMany({ tipo: 'paciente' });
        console.log('🗑️ Pacientes previos eliminados');

        // Insertar nuevos pacientes
        for (const paciente of pacientesEjemplo) {
            const nuevoPaciente = new Usuario(paciente);
            await nuevoPaciente.save();
            console.log(`✅ Paciente creado: ${paciente.nombre} ${paciente.apellido}`);
        }

        console.log(`\n🎉 Se crearon ${pacientesEjemplo.length} pacientes exitosamente!`);
        console.log('\n📝 Pacientes disponibles:');
        console.log('═══════════════════════════════════════════════════════════════');
        
        pacientesEjemplo.forEach((pac, index) => {
            console.log(`${index + 1}. ${pac.nombre} ${pac.apellido}`);
            console.log(`   📧 Email: ${pac.email}`);
            console.log(`   📱 Teléfono: ${pac.telefono}`);
            console.log('───────────────────────────────────────────────────────────────');
        });

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

seedPacientes();

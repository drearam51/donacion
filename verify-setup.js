#!/usr/bin/env node

/**
 * Script de verificación de instalación
 * Ejecutar: node verify-setup.js
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔍 Verificando instalación de WebAR Donación de Órganos...\n');

let errors = 0;
let warnings = 0;

// Helper functions
function checkExists(filepath, description) {
  if (fs.existsSync(filepath)) {
    console.log(`✅ ${description}: ${filepath}`);
    return true;
  } else {
    console.log(`❌ ${description} NO encontrado: ${filepath}`);
    errors++;
    return false;
  }
}

function checkFileContent(filepath, description, minSize = 10) {
  if (fs.existsSync(filepath)) {
    const stats = fs.statSync(filepath);
    if (stats.size > minSize) {
      console.log(`✅ ${description} (${stats.size} bytes)`);
      return true;
    } else {
      console.log(`⚠️  ${description} parece vacío (${stats.size} bytes)`);
      warnings++;
      return false;
    }
  } else {
    console.log(`❌ ${description} NO encontrado`);
    errors++;
    return false;
  }
}

// 1. Verificar archivos principales
console.log('📁 Verificando estructura de archivos:\n');

checkExists('package.json', 'package.json');
checkExists('server.js', 'server.js');
checkExists('.env', '.env o .env.example');
checkExists('.gitignore', '.gitignore');

// 2. Verificar carpeta public
console.log('\n📂 Verificando carpeta public:\n');

checkExists('public', 'Carpeta public');
checkExists('public/index.html', 'index.html');
checkExists('public/ar.html', 'ar.html');
checkExists('public/css', 'Carpeta css');
checkExists('public/css/styles.css', 'styles.css');
checkExists('public/js', 'Carpeta js');
checkExists('public/js/ar-events.js', 'ar-events.js');

// 3. Verificar marcadores
console.log('\n🎯 Verificando marcadores:\n');

const markers = ['heart', 'kidney', 'lung', 'eye', 'liver'];
const markerPath = 'public/markers';

if (fs.existsSync(markerPath)) {
  markers.forEach(marker => {
    const filepath = path.join(markerPath, `${marker}.patt`);
    checkFileContent(filepath, `Marcador ${marker}.patt`, 100);
  });
} else {
  console.log(`❌ Carpeta de marcadores no encontrada: ${markerPath}`);
  errors++;
}

// 4. Verificar node_modules
console.log('\n📦 Verificando dependencias:\n');

if (fs.existsSync('node_modules')) {
  console.log('✅ node_modules existe');
  
  const requiredModules = ['express', 'mongoose', 'cors', 'dotenv', 'body-parser'];
  requiredModules.forEach(mod => {
    if (fs.existsSync(path.join('node_modules', mod))) {
      console.log(`✅ ${mod} instalado`);
    } else {
      console.log(`❌ ${mod} NO instalado`);
      errors++;
    }
  });
} else {
  console.log('❌ node_modules NO encontrado');
  console.log('   Ejecuta: npm install');
  errors++;
}

// 5. Verificar .env
console.log('\n⚙️  Verificando configuración:\n');

if (fs.existsSync('.env')) {
  const envContent = fs.readFileSync('.env', 'utf8');
  
  if (envContent.includes('MONGODB_URI')) {
    console.log('✅ MONGODB_URI configurado en .env');
    
    if (envContent.includes('mongodb://localhost') || envContent.includes('mongodb+srv://')) {
      console.log('✅ URI de MongoDB parece válido');
    } else {
      console.log('⚠️  MONGODB_URI puede no ser válido');
      warnings++;
    }
  } else {
    console.log('❌ MONGODB_URI no encontrado en .env');
    errors++;
  }
} else {
  console.log('⚠️  Archivo .env no encontrado');
  console.log('   Copia .env.example a .env y configura tu MONGODB_URI');
  warnings++;
}

// 6. Verificar documentación
console.log('\n📚 Verificando documentación:\n');

checkExists('README.md', 'README.md');
checkExists('QUICKSTART.md', 'QUICKSTART.md');
checkExists('MARCADORES.md', 'MARCADORES.md');

// 7. Resumen
console.log('\n' + '='.repeat(50));
console.log('📊 RESUMEN:');
console.log('='.repeat(50) + '\n');

if (errors === 0 && warnings === 0) {
  console.log('🎉 ¡Todo perfecto! Tu instalación está completa.\n');
  console.log('📝 Próximos pasos:');
  console.log('   1. Genera los marcadores (lee MARCADORES.md)');
  console.log('   2. Configura MongoDB en .env');
  console.log('   3. Ejecuta: npm start');
  console.log('   4. Abre: http://localhost:3000\n');
} else {
  if (errors > 0) {
    console.log(`❌ ${errors} error(es) encontrado(s)`);
  }
  if (warnings > 0) {
    console.log(`⚠️  ${warnings} advertencia(s)`);
  }
  
  console.log('\n📝 Acciones requeridas:');
  if (!fs.existsSync('node_modules')) {
    console.log('   • Ejecuta: npm install');
  }
  if (!fs.existsSync('.env')) {
    console.log('   • Copia .env.example a .env');
    console.log('   • Configura MONGODB_URI en .env');
  }
  
  const markerIssues = markers.some(m => {
    const filepath = path.join(markerPath, `${m}.patt`);
    return !fs.existsSync(filepath) || fs.statSync(filepath).size < 100;
  });
  
  if (markerIssues) {
    console.log('   • Genera marcadores reales (lee MARCADORES.md)');
  }
  
  console.log('');
}

// 8. Test de Node.js
console.log('🔧 Verificando entorno:\n');

console.log(`✅ Node.js: ${process.version}`);
console.log(`✅ Platform: ${process.platform}`);
console.log(`✅ Architecture: ${process.arch}`);

const majorVersion = parseInt(process.version.split('.')[0].substring(1));
if (majorVersion < 14) {
  console.log('⚠️  Node.js version < 14. Recomendado: Node.js 14+');
  warnings++;
} else {
  console.log('✅ Node.js version compatible');
}

console.log('\n' + '='.repeat(50));
console.log('¿Necesitas ayuda? Lee README.md o QUICKSTART.md');
console.log('='.repeat(50) + '\n');

// Exit code
process.exit(errors > 0 ? 1 : 0);

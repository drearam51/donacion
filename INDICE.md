# 📖 Índice de Documentación - WebAR Donación de Órganos

## 🚀 Por Dónde Empezar

### Si tienes 5 minutos:
→ Lee **[QUICKSTART.md](./QUICKSTART.md)**

### Si quieres entender todo:
→ Lee **[README.md](./README.md)**

### Si tienes problemas en iOS:
→ Lee **[IOS-SAFARI.md](./IOS-SAFARI.md)**

---

## 📚 Documentación Completa

### 1. Guías de Instalación

#### 📄 [README.md](./README.md) (Página principal)
**Qué contiene:**
- Descripción completa del proyecto
- Características implementadas
- Requisitos previos
- Instalación paso a paso
- Uso de la aplicación
- Estructura del proyecto
- Personalización
- API endpoints
- Troubleshooting básico
- Deployment básico
- Próximos pasos opcionales

**Cuándo leer:** Primera vez que ves el proyecto

---

#### ⚡ [QUICKSTART.md](./QUICKSTART.md) (Setup en 5 minutos)
**Qué contiene:**
- Setup rápido paso a paso
- Configuración MongoDB (local y Atlas)
- Generar marcadores (resumen)
- Ejecutar localmente
- Probar en iPhone
- Verificación rápida
- Problemas comunes
- Checklist pre-testing
- Comandos útiles

**Cuándo leer:** Quieres empezar YA sin leer todo

---

### 2. Guías de Marcadores AR

#### 🎯 [MARCADORES.md](./MARCADORES.md) (Tutorial completo)
**Qué contiene:**
- Qué son los marcadores AR
- Herramienta recomendada (AR.js Marker Training)
- Paso a paso detallado para generar cada marcador
- Preparar imágenes base
- Imprimir correctamente
- Tips para mejores marcadores
- Buenas prácticas y qué evitar
- Alternativa con marcadores predefinidos
- Testing de marcadores
- Troubleshooting específico de detección

**Cuándo leer:** Necesitas generar los archivos .patt

---

#### 🎨 [ALTERNATIVAS-MARCADORES.md](./ALTERNATIVAS-MARCADORES.md) (Opciones rápidas)
**Qué contiene:**
- Opción 1: Marcadores predefinidos (Hiro, Kanji)
- Opción 2: Generador AR.js (recomendado)
- Opción 3: Crear con emojis (método rápido)
- Opción 4: QR-like custom markers
- Opción 5: Barcode markers (más simple)
- Comparación de opciones
- Recomendaciones por caso de uso
- Script de actualización para barcodes
- Descarga rápida de marcadores listos

**Cuándo leer:** Tienes problemas generando marcadores personalizados o quieres opciones más fáciles

---

### 3. Guías de Testing

#### ✅ [TESTING.md](./TESTING.md) (Checklist completo)
**Qué contiene:**
- Tests locales (backend y frontend)
- Tests de API con curl
- Tests de frontend en browser
- Tests de marcadores
- Tests de base de datos
- Tests móviles iOS Safari (detallado)
- Tests Android Chrome
- Tests de regresión
- Tests de errores y edge cases
- Checklist final pre-lanzamiento
- Métricas de éxito
- Automated testing (opcional)

**Cuándo leer:** Antes de desplegar o presentar, o si algo no funciona

---

### 4. Guías de Compatibilidad iOS

#### 🍎 [IOS-SAFARI.md](./IOS-SAFARI.md) (Troubleshooting iOS)
**Qué contiene:**
- Limitaciones importantes de iOS Safari
- HTTPS obligatorio (explicación)
- No WebXR en Safari
- Permisos de cámara específicos
- Configuración optimizada para iOS
- 6 problemas comunes con soluciones:
  1. Cámara no funciona
  2. Marcador no detecta
  3. Tracking inestable
  4. Performance lenta
  5. Overlay mal posicionado
  6. Scroll/zoom no deseado
- Testing en iOS (dispositivo físico, simulator)
- Remote debugging Mac + iPhone
- Console logs útiles
- Checklist iOS-específico
- Recursos adicionales

**Cuándo leer:** La app no funciona en iPhone o Safari

---

### 5. Guías de Deployment

#### 🚀 [DEPLOYMENT.md](./DEPLOYMENT.md) (Poner en producción)
**Qué contiene:**
- Opción 1: Railway (recomendado, más fácil)
- Opción 2: Render (free tier permanente)
- Opción 3: Heroku (pago)
- Opción 4: Vercel (solo frontend)
- Opción 5: VPS (Digital Ocean, etc.)
- Checklist pre-deployment
- Testing en producción
- Seguridad básica (rate limiting, helmet, etc.)
- Monitoring (logs, alertas)
- Debug en producción
- Costos estimados
- Recursos útiles

**Cuándo leer:** Quieres poner la app online con HTTPS

---

### 6. Documentación Técnica

#### 📋 [RESUMEN-EJECUTIVO.md](./RESUMEN-EJECUTIVO.md) (Vista general)
**Qué contiene:**
- Entregables completados
- Funcionalidades implementadas
- Documentación completa
- Requisitos técnicos cumplidos
- Stack tecnológico
- Características UX
- Testing y calidad
- Estadísticas del proyecto
- Estado de preparación
- Costo estimado
- Escalabilidad
- Valor académico
- Conclusión final

**Cuándo leer:** Quieres una vista ejecutiva de todo el proyecto

---

## 🛠️ Archivos de Código

### Backend

#### [server.js](./server.js)
- Servidor Express completo
- Configuración MongoDB
- Schemas de base de datos
- 3 endpoints API
- Dashboard admin
- Error handling

### Frontend

#### [public/index.html](./public/index.html)
- Landing page completa
- Hero section
- Explicación de la experiencia
- Descarga de marcadores
- Formulario de registro
- Stats de impacto
- JavaScript para formulario

#### [public/ar.html](./public/ar.html)
- Experiencia AR completa
- Configuración A-Frame + AR.js
- 5 marcadores configurados
- Modelos 3D (primitivas)
- Overlay UI
- Permission screen
- Error screen
- Estilos inline

#### [public/css/styles.css](./public/css/styles.css)
- Estilos de landing page
- Diseño responsive
- Cards y botones
- Formulario
- Animaciones
- Safe areas para móvil

#### [public/js/ar-events.js](./public/ar-events.js)
- Estado global de AR
- Detección de dispositivo
- Storytelling por órgano
- Event handlers (markerFound, markerLost)
- Registro de interacciones
- Manejo de overlay
- Prevención de zoom/scroll iOS
- Error handling

### Utilidades

#### [verify-setup.js](./verify-setup.js)
- Script de verificación de instalación
- Chequea archivos necesarios
- Verifica dependencias
- Valida configuración .env
- Verifica marcadores
- Resumen con acciones requeridas

Ejecutar con: `npm run verify`

---

## 📁 Archivos de Configuración

### [package.json](./package.json)
- Dependencias del proyecto
- Scripts npm (start, dev, verify)
- Metadata del proyecto
- Versiones de Node.js requeridas

### [.env.example](./.env.example)
- Template de variables de entorno
- URI de MongoDB
- Puerto del servidor
- Instrucciones de uso

### [.gitignore](./.gitignore)
- node_modules/
- .env
- Archivos de sistema
- Logs

---

## 🗂️ Estructura de Carpetas

```
/donacion
├── public/
│   ├── index.html              ← Landing page
│   ├── ar.html                 ← Experiencia AR
│   ├── css/
│   │   └── styles.css          ← Estilos principales
│   ├── js/
│   │   └── ar-events.js        ← Lógica AR
│   ├── markers/
│   │   ├── heart.patt          ← Marcador corazón
│   │   ├── kidney.patt         ← Marcador riñón
│   │   ├── lung.patt           ← Marcador pulmón
│   │   ├── eye.patt            ← Marcador ojo
│   │   └── liver.patt          ← Marcador hígado
│   └── models/
│       └── README.md           ← Info sobre modelos 3D
├── server.js                   ← Backend Express
├── package.json                ← Dependencias
├── verify-setup.js             ← Script verificación
├── .env.example                ← Template config
├── .gitignore                  ← Git ignore
├── README.md                   ← Documentación principal
├── QUICKSTART.md               ← Setup rápido
├── MARCADORES.md               ← Tutorial marcadores
├── ALTERNATIVAS-MARCADORES.md  ← Opciones marcadores
├── TESTING.md                  ← Guía de testing
├── DEPLOYMENT.md               ← Guía deployment
├── IOS-SAFARI.md               ← Troubleshooting iOS
├── RESUMEN-EJECUTIVO.md        ← Resumen proyecto
└── INDICE.md                   ← Este archivo
```

---

## 🎯 Guía de Uso según Situación

### "Nunca he visto este proyecto"
1. Lee [RESUMEN-EJECUTIVO.md](./RESUMEN-EJECUTIVO.md) (5 min)
2. Lee [README.md](./README.md) (15 min)
3. Ejecuta `npm run verify`

### "Quiero correrlo YA"
1. Lee [QUICKSTART.md](./QUICKSTART.md) (5 min)
2. Ejecuta comandos indicados
3. Si hay error, busca en la sección correspondiente

### "Necesito generar marcadores"
1. Lee [MARCADORES.md](./MARCADORES.md) (tutorial completo)
2. O lee [ALTERNATIVAS-MARCADORES.md](./ALTERNATIVAS-MARCADORES.md) (opciones rápidas)
3. Elige el método que prefieras

### "No funciona en iPhone"
1. Lee [IOS-SAFARI.md](./IOS-SAFARI.md) completo
2. Sigue troubleshooting específico
3. Verifica checklist iOS

### "Quiero desplegarlo online"
1. Lee [DEPLOYMENT.md](./DEPLOYMENT.md)
2. Elige plataforma (Railway recomendado)
3. Sigue pasos para esa plataforma

### "Algo no funciona"
1. Lee [TESTING.md](./TESTING.md)
2. Ejecuta `npm run verify`
3. Busca tu problema en README.md → Troubleshooting
4. Si es iOS: [IOS-SAFARI.md](./IOS-SAFARI.md)

### "¿Qué hago después de instalar?"
1. Genera marcadores ([MARCADORES.md](./MARCADORES.md))
2. Testea local ([TESTING.md](./TESTING.md))
3. Testea en móvil con ngrok
4. Despliega ([DEPLOYMENT.md](./DEPLOYMENT.md))

---

## 📊 Métricas de Documentación

**Total de documentación:**
- 8 archivos Markdown
- ~50 páginas de contenido
- ~15,000 palabras
- 100+ código examples
- 50+ comandos shell
- 20+ troubleshooting solutions

**Tiempo estimado de lectura:**
- Lectura rápida (QUICKSTART): 5 min
- Lectura completa (README): 15 min
- Todo el proyecto: 2-3 horas

---

## 🔗 Links Rápidos

### Herramientas Externas Necesarias

- **Generar marcadores:** https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html
- **MongoDB Atlas:** https://www.mongodb.com/cloud/atlas
- **ngrok (HTTPS local):** https://ngrok.com/download
- **Railway (deployment):** https://railway.app/
- **Render (deployment):** https://render.com/

### Recursos de Aprendizaje

- **A-Frame Docs:** https://aframe.io/docs/
- **AR.js Docs:** https://ar-js-org.github.io/AR.js-Docs/
- **Express Docs:** https://expressjs.com/
- **Mongoose Docs:** https://mongoosejs.com/

---

## ✅ Checklist de Documentación Leída

Marca lo que ya leíste:

- [ ] README.md (principal)
- [ ] QUICKSTART.md (setup rápido)
- [ ] MARCADORES.md (generar marcadores)
- [ ] ALTERNATIVAS-MARCADORES.md (opciones fáciles)
- [ ] TESTING.md (testing completo)
- [ ] DEPLOYMENT.md (poner online)
- [ ] IOS-SAFARI.md (troubleshooting iOS)
- [ ] RESUMEN-EJECUTIVO.md (vista general)
- [ ] INDICE.md (este archivo)

---

## 🎓 Conclusión

Esta documentación te guía desde cero hasta tener el MVP completo corriendo en producción, con soporte específico para iOS Safari y troubleshooting detallado para cada problema común.

**Empieza por [QUICKSTART.md](./QUICKSTART.md) si tienes prisa.**
**Empieza por [README.md](./README.md) si quieres entender todo.**

¡Éxito con tu proyecto! 💚

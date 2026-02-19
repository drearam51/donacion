# 🚀 LÉEME PRIMERO - Primeros Pasos

## 👋 ¡Bienvenido al Proyecto WebAR Donación de Órganos!

Este es un MVP (Producto Mínimo Viable) funcional de Realidad Aumentada Web.

---

## ⚡ Start Aquí (3 Pasos Rápidos)

### 1️⃣ Instala Dependencias
```bash
npm install
```

### 2️⃣ Verifica Instalación
```bash
npm run verify
```

### 3️⃣ Inicia el Servidor
```bash
npm start
```

**✅ Listo!** Abre http://localhost:3000

---

## 📋 Antes de Probar en Móvil

### ⚠️ IMPORTANTE: Necesitas 3 cosas

#### 1. Configurar MongoDB
```bash
# Copia el template
copy .env.example .env

# Edita .env y agrega tu URI de MongoDB:
# Opción A: MongoDB Atlas (gratis) - https://mongodb.com/atlas
# Opción B: MongoDB local - mongodb://localhost:27017/donacion-organos
```

#### 2. Imprimir Marcadores AR (patrones barcode)
```bash
# El proyecto usa marcadores Barcode (patrones puros, más fiables que imágenes)

# Descarga e imprime las 5 imágenes desde:
# public/markers/BARCODES-IMPRIMIR.md

# O descarga directamente desde los links de ALTERNATIVAS-MARCADORES.md (Opción 5)
```

#### 3. Usar HTTPS (para iOS Safari)
```bash
# iOS Safari REQUIERE HTTPS para acceder a cámara

# Instala ngrok: https://ngrok.com/download
ngrok http 3000

# Obtendrás URL como: https://abc123.ngrok.app
# Abre esa URL en tu iPhone
```

---

## 📖 ¿Qué Leer Ahora?

### Si tienes 5 minutos:
→ **[QUICKSTART.md](./QUICKSTART.md)**

### Si quieres entender todo:
→ **[README.md](./README.md)**

### Si algo no funciona:
→ **[TESTING.md](./TESTING.md)**

### Si no funciona en iPhone:
→ **[IOS-SAFARI.md](./IOS-SAFARI.md)**

### Ver toda la documentación:
→ **[INDICE.md](./INDICE.md)**

---

## 🎯 Estructura del Proyecto (Simplificada)

```
donacion/
├── 📱 Frontend
│   ├── public/index.html          Landing page
│   ├── public/ar.html             Experiencia AR
│   ├── public/css/styles.css      Estilos
│   └── public/js/ar-events.js     Lógica AR
│
├── 🔧 Backend
│   └── server.js                  API + MongoDB
│
├── 📚 Documentación
│   ├── README.md                  ⭐ Principal
│   ├── QUICKSTART.md              ⚡ Setup rápido
│   ├── MARCADORES.md              🎯 Tutorial AR
│   └── ... (10 guías más)
│
└── ⚙️ Configuración
    ├── package.json               Dependencias
    ├── .env.example               Config template
    └── verify-setup.js            Script verificación
```

---

## 🎮 Comandos Disponibles

```bash
npm start          # Iniciar servidor
npm run dev        # Desarrollo con auto-reload
npm run verify     # Verificar instalación
npm run help       # Ver ayuda
```

---

## ✅ Checklist Rápido

Marca lo que ya hiciste:

- [ ] `npm install` ejecutado
- [ ] `npm run verify` sin errores
- [ ] `.env` creado y configurado
- [ ] MongoDB URI configurado
- [ ] `npm start` corriendo
- [ ] http://localhost:3000 funciona
- [ ] Marcadores generados (.patt)
- [ ] Marcadores impresos en papel
- [ ] ngrok instalado (para móvil)
- [ ] Probado en iPhone Safari

---

## 🆘 Problemas Comunes

### "Cannot find module 'express'"
```bash
npm install
```

### "Error conectando a MongoDB"
```bash
# Verifica .env
# Si usas Atlas: permite IP 0.0.0.0/0
# Si usas local: ejecuta mongod
```

### "Cámara no funciona en iPhone"
```bash
# DEBES usar HTTPS:
ngrok http 3000
# Abre URL https:// en Safari iOS
```

### "Marcador no detecta"
```bash
# 1. Genera marcadores reales (lee MARCADORES.md)
# 2. Imprime en papel (no funciona en pantalla)
# 3. Buena iluminación
# 4. Distancia 20-40cm
```

---

## 🎓 Flujo de Trabajo Completo

```
1. Instalar → npm install
2. Verificar → npm run verify
3. Configurar → .env con MongoDB
4. Generar → Marcadores AR (.patt)
5. Imprimir → Marcadores en papel
6. Ejecutar → npm start
7. Probar → http://localhost:3000
8. Mobile → ngrok http 3000
9. Testing → iPhone Safari
10. Deploy → Ver DEPLOYMENT.md
```

---

## 💡 Tips Importantes

### ✅ Hazlo en este orden:
1. Primero corre local (sin móvil)
2. Verifica que la web carga
3. Luego genera marcadores
4. Luego prueba en móvil

### ⚠️ Recuerda:
- iOS Safari **requiere HTTPS**
- Marcadores **deben estar impresos**
- MongoDB **debe estar conectado**
- `.env` **no está en Git** (crea el tuyo)

---

## 🎯 Objetivo del MVP

Este proyecto demuestra:
- ✅ WebAR marker-based funcional
- ✅ Detección de 5 órganos diferentes
- ✅ Compatible iOS Safari y Android
- ✅ Backend Node.js + MongoDB
- ✅ Sin instalación de app
- ✅ Storytelling educativo

---

## 📊 Estado del Proyecto

```
✅ Código: 100% completo
✅ Documentación: 100% completa
✅ Testing: Guías completas
✅ Deployment: Guías completas
⚠️  Marcadores: Debes generarlos
⚠️  MongoDB: Debes configurarlo
```

---

## 🚀 Siguiente Paso

**Ejecuta ahora:**

```bash
npm run verify
```

Este comando verificará automáticamente tu instalación y te dirá qué falta.

---

## 📞 ¿Necesitas Ayuda?

1. Ejecuta: `npm run verify`
2. Lee: [QUICKSTART.md](./QUICKSTART.md)
3. Si error específico: busca en [README.md](./README.md) → Troubleshooting
4. Si es iOS: [IOS-SAFARI.md](./IOS-SAFARI.md)
5. Para todo: [INDICE.md](./INDICE.md)

---

## 🎉 ¡Éxito!

Una vez que todo funcione, tendrás:
- 🌐 Web funcionando en local
- 📱 App AR en tu móvil
- 🫀 5 órganos detectables
- 📊 Estadísticas en /admin
- 💾 Datos en MongoDB

---

**¿Listo? Empieza con: `npm install` → `npm run verify` → `npm start`**

**Lee [QUICKSTART.md](./QUICKSTART.md) para el setup completo en 5 minutos.**

💚 ¡Mucha suerte con tu proyecto!

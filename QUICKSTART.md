# 🎯 Guía Rápida de Inicio

## ⚡ Setup en 5 minutos

### 1️⃣ Instalar dependencias

```bash
npm install
```

### 2️⃣ Configurar MongoDB

**Opción A - MongoDB Atlas (Recomendado, gratis):**

1. Ve a https://www.mongodb.com/cloud/atlas
2. Crea cuenta gratuita
3. Crea un cluster (elige región más cercana)
4. En "Database Access": crea un usuario con password
5. En "Network Access": permite acceso desde cualquier IP (0.0.0.0/0)
6. Click en "Connect" → "Connect your application"
7. Copia el connection string

**Opción B - MongoDB Local:**

```bash
# Windows (con chocolatey)
choco install mongodb

# Mac
brew install mongodb-community

# Iniciar MongoDB
mongod
```

### 3️⃣ Crear archivo .env

```bash
# Copia el ejemplo
copy .env.example .env

# Edita .env con tu connection string
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/donacion-organos
PORT=3000
```

### 4️⃣ Generar marcadores

**IMPORTANTE:** Los marcadores actuales son placeholders. Necesitas generar los reales:

1. Ve a: https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html

2. Para cada órgano:
   - Busca una imagen simple del órgano (o usa emojis en grande)
   - Sube la imagen al generador
   - Click en "Download Marker"
   - Guarda el .patt en `/public/markers/`
   - **IMPORTANTE:** También descarga la imagen del marcador para imprimir

3. Imprime los 5 marcadores en papel blanco A4

### 5️⃣ Ejecutar localmente

```bash
npm start
```

Abre: http://localhost:3000

### 6️⃣ Probar en iPhone (requiere HTTPS)

**Usar ngrok:**

```bash
# Descarga ngrok: https://ngrok.com/download
# Descomprime y ejecuta:
ngrok http 3000
```

Obtendrás una URL como: `https://abc123.ngrok-free.app`

Abre esa URL en tu iPhone con Safari.

---

## 🔍 Verificación rápida

✅ **Backend funciona:** http://localhost:3000 muestra la página principal
✅ **MongoDB conectado:** Console muestra "✅ MongoDB conectado correctamente"
✅ **AR funciona:** http://localhost:3000/ar.html pide permiso de cámara
✅ **API funciona:** http://localhost:3000/api/stats devuelve JSON

---

## 🚨 Problemas comunes

### "Cannot find module 'express'"
```bash
npm install
```

### "Error conectando a MongoDB"
- Verifica que el URI en `.env` es correcto
- Si usas Atlas, verifica que permitiste acceso desde cualquier IP
- Si usas local, verifica que `mongod` está corriendo

### "Cámara no funciona en iPhone"
- DEBES usar HTTPS (ngrok, localtunnel, etc.)
- Safari es obligatorio (Chrome iOS no funciona bien con AR.js)

### "Marcador no se detecta"
- Genera marcadores reales (no uses los placeholders)
- Imprime en papel (no funciona en pantalla)
- Buena iluminación
- Distancia 20-40cm

---

## 📋 Checklist antes de probar en móvil

- [ ] `npm install` ejecutado
- [ ] `.env` configurado con MongoDB URI
- [ ] `npm start` corriendo sin errores
- [ ] MongoDB conectado (ver console logs)
- [ ] Marcadores .patt generados y guardados
- [ ] Marcadores impresos en papel
- [ ] ngrok (u otro) corriendo con HTTPS
- [ ] Probar en Safari iOS (no Chrome)

---

## 🎓 Comandos útiles

```bash
# Instalar
npm install

# Ejecutar
npm start

# Ejecutar con auto-reload (desarrollo)
npm run dev

# Ver logs de MongoDB (si usas local)
mongod --dbpath /path/to/data

# Exponer a HTTPS con ngrok
ngrok http 3000

# Exponer con localtunnel
npx localtunnel --port 3000
```

---

## 📞 Soporte

Si algo no funciona:

1. Revisa los logs en la consola del servidor
2. Revisa la consola del navegador (F12)
3. Verifica que todos los archivos estén en su lugar
4. Lee el README.md completo

---

**¡Listo! En 5 minutos deberías tener el MVP corriendo localmente.**

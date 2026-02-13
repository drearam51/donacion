# 🫀 WebAR Donación de Órganos - MVP

[![Status](https://img.shields.io/badge/status-MVP%20Complete-success)]()
[![Version](https://img.shields.io/badge/version-1.0.0-blue)]()
[![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)]()
[![License](https://img.shields.io/badge/license-MIT-orange)]()

MVP funcional de Realidad Aumentada Web (WebAR) para concientizar sobre la donación de órganos. Compatible con iOS Safari y Android Chrome sin necesidad de instalar una app.

---

## 🚀 Inicio Rápido

```bash
# 1. Instalar
npm install

# 2. Verificar
npm run verify

# 3. Configurar MongoDB (edita .env)
cp .env.example .env

# 4. Ejecutar
npm start

# ✅ Abre: http://localhost:3000
```

**📱 Para móvil (requiere HTTPS):**
```bash
# Instala ngrok: https://ngrok.com/download
ngrok http 3000
# Abre la URL https:// en tu iPhone Safari
```

**👉 Lee [START-HERE.md](./START-HERE.md) para guía completa de inicio**

---

## 📖 Navegación Rápida

**🚀 Para empezar:**
- [START-HERE.md](./START-HERE.md) - **LEE ESTO PRIMERO**
- [QUICKSTART.md](./QUICKSTART.md) - Setup en 5 minutos
- [verify-setup.js](./verify-setup.js) - Ejecuta `npm run verify`

**📚 Documentación completa:**
- [INDICE.md](./INDICE.md) - Índice de toda la documentación
- [ESTRUCTURA.md](./ESTRUCTURA.md) - Estructura del proyecto
- [INVENTARIO.md](./INVENTARIO.md) - Inventario completo de archivos
- [RESUMEN-EJECUTIVO.md](./RESUMEN-EJECUTIVO.md) - Vista ejecutiva

**🎯 Guías específicas:**
- [MARCADORES.md](./MARCADORES.md) - Generar marcadores AR
- [ALTERNATIVAS-MARCADORES.md](./ALTERNATIVAS-MARCADORES.md) - Opciones fáciles
- [TESTING.md](./TESTING.md) - Testing completo
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Desplegar online
- [IOS-SAFARI.md](./IOS-SAFARI.md) - Troubleshooting iOS

**📝 Otros:**
- [CHANGELOG.md](./CHANGELOG.md) - Historial de versiones
- [LICENSE](./LICENSE) - Licencia MIT

---

## 🎯 Características

- ✅ **WebAR marker-based** usando A-Frame + AR.js
- ✅ **Compatible con iOS Safari** (requiere HTTPS)
- ✅ **5 órganos diferentes** con storytelling dinámico
- ✅ **Backend Node.js + Express + MongoDB**
- ✅ **Registro de interacciones** y estadísticas
- ✅ **Sin frameworks pesados** - Solo vanilla JS

## 📋 Requisitos Previos

- Node.js 14+ instalado
- MongoDB (local o MongoDB Atlas)
- HTTPS para pruebas en móvil (usar ngrok, localtunnel, o similar)
- Marcadores impresos (ver carpeta `/public/markers`)

## 🚀 Instalación y Configuración

### 1. Clonar e instalar dependencias

```bash
cd donacion
npm install
```

### 2. Configurar MongoDB

Opción A - MongoDB Local:
```bash
# Asegúrate de tener MongoDB corriendo localmente
mongod
```

Opción B - MongoDB Atlas (recomendado):
1. Crea una cuenta gratuita en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un cluster gratuito
3. Obtén tu connection string
4. Crea un archivo `.env`:

```bash
cp .env.example .env
```

Edita `.env` y agrega tu URI:
```
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/donacion-organos
PORT=3000
```

### 3. Ejecutar el servidor

```bash
npm start
```

El servidor estará corriendo en `http://localhost:3000`

## 📱 Pruebas en iOS Safari (IMPORTANTE)

iOS Safari **requiere HTTPS** para acceder a la cámara. Para probar en iPhone:

### Opción 1: ngrok (Recomendado)

```bash
# Instalar ngrok: https://ngrok.com/download
ngrok http 3000
```

Obtendrás una URL HTTPS como: `https://abc123.ngrok.io`

### Opción 2: localtunnel

```bash
npm install -g localtunnel
lt --port 3000
```

### Opción 3: Cloudflare Tunnel

```bash
# Instalar cloudflared
cloudflared tunnel --url http://localhost:3000
```

## 🖨️ Preparar los Marcadores

**CRÍTICO:** Necesitas crear e imprimir los archivos `.patt` de marcadores.

### Generar marcadores personalizados:

1. Ve a [AR.js Marker Training](https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html)

2. Sube 5 imágenes diferentes (una por órgano):
   - Corazón (imagen/emoji de corazón)
   - Riñón 
   - Pulmón
   - Ojo
   - Hígado

3. Descarga cada archivo `.patt` generado

4. Guarda los archivos en `/public/markers/`:
   ```
   /public/markers/
     heart.patt
     kidney.patt
     lung.patt
     eye.patt
     liver.patt
   ```

5. **Imprime también las imágenes de los marcadores** en papel blanco (tamaño A4 recomendado)

### Alternativa rápida (testing):

Puedes usar marcadores predefinidos de AR.js temporalmente:
- Descarga Hiro marker: https://github.com/AR-js-org/AR.js/blob/master/data/images/hiro.png
- Repite 5 veces con diferentes orientaciones/colores

## 🧪 Uso de la Aplicación

### 1. Acceder desde el navegador

En tu móvil (con HTTPS):
```
https://tu-url-ngrok.ngrok.io
```

### 2. Flujo de usuario

1. Usuario visita la página principal
2. Lee sobre la experiencia AR
3. Descarga/imprime los marcadores
4. Click en "Iniciar Experiencia AR"
5. Permitir acceso a la cámara
6. Apuntar cámara a un marcador impreso
7. Ver modelo 3D y storytelling
8. Click en CTA para registrarse

### 3. Estructura de URLs

- `/` - Página principal
- `/ar` - Experiencia AR (requiere HTTPS en móvil)
- `/admin` - Dashboard de estadísticas

## 📂 Estructura del Proyecto

```
/donacion
  /public
    index.html          # Página principal
    ar.html            # Experiencia AR
    /models            # Modelos 3D (opcional, usando primitivas por ahora)
    /markers           # Archivos .patt de marcadores
      heart.patt
      kidney.patt
      lung.patt
      eye.patt
      liver.patt
    /css
      styles.css       # Estilos principales
    /js
      ar-events.js     # Lógica de eventos AR
  server.js            # Backend Express
  package.json
  .env.example
  README.md
```

## 🔧 Personalización

### Agregar modelos 3D reales

Por defecto usa primitivas de A-Frame. Para usar modelos GLB:

1. Descarga modelos 3D optimizados (<2MB):
   - [Sketchfab](https://sketchfab.com/) (busca "heart 3d model")
   - [Clara.io](https://clara.io/)

2. Guarda en `/public/models/`

3. Modifica `ar.html` en la sección `<a-assets>`:

```html
<a-assets>
  <a-asset-item id="heart-model" src="/models/heart.glb"></a-asset-item>
</a-assets>
```

4. Cambia las entidades en los marcadores:

```html
<a-marker type="pattern" url="/markers/heart.patt">
  <a-entity 
    gltf-model="#heart-model" 
    scale="0.5 0.5 0.5" 
    position="0 0.5 0"
    animation="property: rotation; to: 0 360 0; loop: true; dur: 8000">
  </a-entity>
</a-marker>
```

### Modificar storytelling

Edita el objeto `organStories` en `/public/js/ar-events.js`:

```javascript
const organStories = {
  heart: {
    title: '🫀 Tu título personalizado',
    text: 'Tu historia personalizada...',
    cta: 'Texto del botón'
  },
  // ... más órganos
};
```

## 📊 API Endpoints

### POST `/api/interaction`
Registra cuando un usuario detecta un marcador.

```json
{
  "organ": "heart",
  "device": "iOS",
  "sessionId": "session_123456"
}
```

### POST `/api/register`
Registra un nuevo usuario interesado.

```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "consentimiento": true
}
```

### GET `/api/stats`
Obtiene estadísticas de uso.

```json
{
  "success": true,
  "stats": {
    "totalInteractions": 150,
    "totalRegistrations": 45,
    "byOrgan": [
      { "_id": "heart", "count": 50 },
      { "_id": "kidney", "count": 30 }
    ]
  }
}
```

## 🐛 Troubleshooting

### "No se puede acceder a la cámara"
- ✅ Verifica que estás usando HTTPS (obligatorio en iOS)
- ✅ Revisa permisos de cámara en Configuración del navegador
- ✅ Cierra otras apps que usen la cámara

### "Marcador no detectado"
- ✅ Asegúrate de tener buena iluminación
- ✅ El marcador debe estar impreso (no en pantalla)
- ✅ Mantén distancia de 20-40cm
- ✅ El marcador debe estar plano, sin arrugas

### "Error de MongoDB"
- ✅ Verifica que MongoDB esté corriendo
- ✅ Revisa la URI en `.env`
- ✅ Verifica conexión a internet (si usas Atlas)

### iOS Safari no carga AR
- ✅ HTTPS es obligatorio
- ✅ Usa Safari (no Chrome iOS)
- ✅ Actualiza a iOS 11+
- ✅ Limpia caché del navegador

## 🚀 Deployment

### Heroku

```bash
# Instalar Heroku CLI
heroku create tu-app-webar
heroku config:set MONGODB_URI="tu_uri_mongodb_atlas"
git push heroku main
heroku open
```

### Vercel

```bash
npm i -g vercel
vercel
```

Nota: Vercel requiere configuración especial para Express. Considera usar Vercel solo para frontend y Railway/Render para backend.

### Railway

1. Conecta tu repo a Railway
2. Agrega variable de entorno `MONGODB_URI`
3. Deploy automático

## 📈 Próximos Pasos (Opcional)

- [ ] Agregar modelos 3D GLB optimizados
- [ ] Implementar analytics con Google Analytics
- [ ] Agregar animaciones más realistas (latido de corazón)
- [ ] Soporte multi-idioma
- [ ] Panel admin con autenticación
- [ ] Exportar estadísticas a CSV
- [ ] Notificaciones push (PWA)

## 📄 Licencia

MIT License - Proyecto educativo

## 👨‍💻 Soporte

Para problemas o preguntas, abre un issue en el repositorio.

---

**🎯 MVP Funcional - Prioriza estabilidad sobre estética**

Este es un proyecto académico demostrativo. No está optimizado para producción.

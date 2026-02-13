# ✅ Testing Checklist - WebAR Donación de Órganos

## 🧪 Tests Locales

### 1. Setup Básico

```bash
# Test 1: Dependencias instaladas
npm list express mongoose
# Esperado: Versiones mostradas sin errores

# Test 2: MongoDB conectado
npm start
# Esperado en console: "✅ MongoDB conectado correctamente"
```

### 2. Backend Tests

#### Test API - Stats
```bash
# Terminal
curl http://localhost:3000/api/stats

# Esperado:
{
  "success": true,
  "stats": {
    "totalInteractions": 0,
    "totalRegistrations": 0,
    "byOrgan": []
  }
}
```

#### Test API - Interaction
```bash
curl -X POST http://localhost:3000/api/interaction \
  -H "Content-Type: application/json" \
  -d '{"organ":"heart","device":"iOS","sessionId":"test123"}'

# Esperado:
{
  "success": true,
  "message": "Interacción registrada",
  "organ": "heart"
}
```

#### Test API - Register
```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Test User","email":"test@example.com","consentimiento":true}'

# Esperado:
{
  "success": true,
  "message": "Registro exitoso"
}
```

### 3. Frontend Tests (Browser)

#### Página Principal
- [ ] Abre http://localhost:3000
- [ ] Verifica que carga sin errores
- [ ] Botón "Iniciar Experiencia AR" visible
- [ ] Formulario de registro funciona
- [ ] Estilos CSS aplicados correctamente

#### Página AR
- [ ] Abre http://localhost:3000/ar
- [ ] Pantalla de permisos aparece
- [ ] Click en "Iniciar Experiencia"
- [ ] Navegador pide permiso de cámara
- [ ] Después de permitir, cámara se activa
- [ ] Status muestra "🔍 Buscando marcador..."

#### Console Tests
Abre DevTools (F12) → Console:

```javascript
// Test 1: AR.js cargado
console.log(typeof AFRAME !== 'undefined');
// Esperado: true

// Test 2: Estado inicial
console.log(state);
// Esperado: Object con sessionId, isARActive, etc.

// Test 3: Simular detección (con cámara activa)
// Apunta a un marcador y observa console logs
// Esperado: "✅ Marcador detectado: [organ]"
```

### 4. Marcadores Tests

**Checklist:**
- [ ] 5 archivos .patt en `/public/markers/`
- [ ] Cada archivo tiene contenido (no placeholder)
- [ ] Marcadores impresos en papel
- [ ] Buena iluminación para testing
- [ ] Distancia 20-40cm funciona
- [ ] Cada marcador muestra órgano diferente

**Test rápido:**
1. Abre `/ar` en navegador
2. Permite cámara
3. Apunta a cada marcador
4. Verifica:
   - Status cambia a "✅ [Órgano] detectado!"
   - Modelo 3D aparece sobre marcador
   - Overlay con historia se muestra
   - Console log: "✅ Marcador detectado: [organ]"

### 5. Database Tests

#### Verificar MongoDB
```bash
# Si usas MongoDB local:
mongosh
use donacion-organos
db.interactions.find()
db.registrations.find()

# Esperado: Documentos de tus pruebas
```

#### Verificar Stats en Admin
- [ ] Abre http://localhost:3000/admin
- [ ] Ve estadísticas de interacciones
- [ ] Ve número de registros
- [ ] Números coinciden con base de datos

---

## 📱 Tests Móviles (iOS Safari)

### Prerequisitos
- [ ] Servidor corriendo con HTTPS (ngrok/localtunnel)
- [ ] iPhone con iOS 11+
- [ ] Safari como navegador
- [ ] Marcadores impresos listos

### Tests iOS

#### Test 1: Carga básica
- [ ] Abre `https://tu-url.ngrok.app` en Safari iOS
- [ ] Página carga sin errores SSL
- [ ] Estilos se ven correctamente
- [ ] Botones son responsive

#### Test 2: Permisos cámara
- [ ] Click "Iniciar Experiencia AR"
- [ ] Safari muestra popup de permisos
- [ ] Click "Permitir"
- [ ] Cámara se activa correctamente
- [ ] Vista preview de cámara visible

#### Test 3: Detección de marcadores
Para cada marcador:
- [ ] Apunta cámara al marcador impreso
- [ ] Marcador detectado en <3 segundos
- [ ] Modelo 3D renderiza suavemente
- [ ] Overlay aparece con animación
- [ ] Texto legible en móvil
- [ ] Botones funcionan (no hay problemas de tap)

#### Test 4: Tracking
- [ ] Mueve el marcador lentamente
- [ ] Modelo 3D sigue el marcador
- [ ] Sin lag perceptible
- [ ] Si pierdes marcador, status cambia
- [ ] Re-detección funciona

#### Test 5: Interacciones
- [ ] Click en botón CTA del overlay
- [ ] Redirige correctamente
- [ ] Formulario es usable en móvil
- [ ] Teclado no oculta inputs
- [ ] Submit funciona
- [ ] Mensaje de éxito aparece

#### Test 6: Performance
- [ ] App no se crashea después de 5 minutos
- [ ] No se calienta excesivamente
- [ ] Batería drena razonablemente
- [ ] Memoria estable (no leaks)

---

## 🤖 Tests Android (Chrome)

### Tests Android

#### Test 1: Carga y permisos
- [ ] Abre en Chrome Android
- [ ] Permite cámara
- [ ] Vista funciona correctamente

#### Test 2: Detección
- [ ] Marcadores detectan correctamente
- [ ] Performance fluida
- [ ] UI responsive

---

## 🔍 Tests de Regresión

Cuando hagas cambios, vuelve a ejecutar:

### Quick Test (5 min)
```bash
# 1. Server starts
npm start

# 2. Homepage loads
curl http://localhost:3000 | grep "Donación de Órganos"

# 3. API works
curl http://localhost:3000/api/stats | grep "success"

# 4. AR page loads
curl http://localhost:3000/ar | grep "a-scene"
```

### Full Test (20 min)
- [ ] Todos los tests de Backend
- [ ] Todos los tests de Frontend (desktop)
- [ ] Test de un marcador en móvil
- [ ] Test de registro de usuario

---

## 🐛 Tests de Errores

### Test: MongoDB desconectado
```bash
# Detén MongoDB
# Reinicia servidor
npm start

# Esperado: 
# "❌ Error conectando a MongoDB"
# Servidor sigue corriendo pero APIs fallan gracefully
```

### Test: Cámara bloqueada
- [ ] Bloquea permisos de cámara en Safari
- [ ] Intenta abrir /ar
- [ ] Esperado: Pantalla de error clara
- [ ] Mensaje instructivo

### Test: Marcador no encontrado
- [ ] Apunta cámara a superficie blanca
- [ ] Esperado: Status "🔍 Buscando marcador..."
- [ ] No crashes
- [ ] Performance estable

### Test: Red lenta
- [ ] Chrome DevTools → Network → Slow 3G
- [ ] Recarga página
- [ ] Esperado: Carga eventualmente
- [ ] Sin errores fatales

---

## ✅ Checklist Final Pre-Lanzamiento

### Funcionalidad
- [ ] 5 marcadores funcionan correctamente
- [ ] Storytelling aparece para cada órgano
- [ ] Registro de usuarios funciona
- [ ] Stats se actualizan correctamente
- [ ] Admin panel accesible

### Performance
- [ ] Página carga en <3 segundos
- [ ] AR se inicializa en <5 segundos
- [ ] Detección de marcador <3 segundos
- [ ] Tracking fluido (>20 FPS)
- [ ] Sin memory leaks después de 10 min

### Compatibilidad
- [ ] iOS Safari 11+
- [ ] Android Chrome 80+
- [ ] Desktop Chrome/Firefox (para admin)
- [ ] HTTPS funciona correctamente

### UX
- [ ] Botones suficientemente grandes (44x44px mín)
- [ ] Texto legible en móvil
- [ ] Errores muestran mensajes claros
- [ ] Loading states visibles
- [ ] No elementos ocultos por el notch

### Seguridad (Básica para MVP)
- [ ] `.env` no está en git
- [ ] No hay API keys expuestas en frontend
- [ ] MongoDB no acepta conexiones sin autenticación
- [ ] CORS configurado apropiadamente

---

## 📊 Métricas de Éxito

Tu MVP debe cumplir:

✅ **Backend:**
- Uptime > 95%
- Response time < 500ms
- 0 crashes fatales

✅ **Frontend:**
- Lighthouse Score > 70
- Mobile-friendly test pasa
- No errores de console en producción

✅ **AR:**
- Detección exitosa > 80% del tiempo (con marcadores correctos)
- Tracking estable > 90% del tiempo
- Compatible con iOS Safari y Android Chrome

---

## 🎓 Automated Testing (Opcional)

Para proyectos más serios:

```javascript
// test/api.test.js
const request = require('supertest');
const app = require('../server');

describe('API Tests', () => {
  test('GET /api/stats returns stats', async () => {
    const res = await request(app).get('/api/stats');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  test('POST /api/interaction creates interaction', async () => {
    const res = await request(app)
      .post('/api/interaction')
      .send({ organ: 'heart', device: 'iOS', sessionId: 'test' });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
```

```bash
npm install --save-dev jest supertest
npm test
```

---

**¡Testing completo! Estás listo para desplegar. 🚀**

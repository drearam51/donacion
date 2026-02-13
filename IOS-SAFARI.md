# 🍎 Guía Específica iOS Safari - WebAR

## ⚠️ Limitaciones Importantes de iOS Safari

Safari en iOS tiene restricciones específicas para WebAR que debes conocer:

### 1. HTTPS Obligatorio
- ✅ **DEBE** usar HTTPS
- ❌ `http://` NO funcionará para acceso a cámara
- ❌ `localhost` NO funciona en iOS (a diferencia de Android)

### 2. No WebXR
- ❌ Safari NO soporta WebXR API
- ✅ AR.js con marker-based funciona
- ✅ A-Frame funciona

### 3. Permisos de Cámara
- Primera vez requiere interacción del usuario (tap/click)
- No puede auto-iniciar cámara
- Permiso se mantiene solo durante la sesión

### 4. Restricciones de Video
- Requiere atributo `playsinline` (AR.js lo maneja)
- Algunas resoluciones pueden no ser soportadas
- iOS puede limitar calidad para ahorrar batería

---

## 🔧 Configuración Optimizada para iOS

### Meta Tags Importantes

Ya incluidos en `ar.html`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
```

### A-Frame Scene Configuración

```html
<a-scene
  embedded
  arjs="sourceType: webcam; debugUIEnabled: false;"
  vr-mode-ui="enabled: false"
  renderer="logarithmicDepthBuffer: true; precision: medium;">
```

**Por qué:**
- `embedded`: Permite overlay HTML sobre AR
- `vr-mode-ui: false`: Desactiva botón VR (no relevante para iOS)
- `precision: medium`: Balance entre calidad y performance en móvil

---

## 🐛 Problemas Comunes iOS y Soluciones

### Problema 1: "Cámara no funciona"

**Síntomas:**
- Pantalla negra después de permitir cámara
- Error en console: "NotAllowedError"
- Nada pasa después de click en "Iniciar"

**Soluciones:**

#### A. Verifica HTTPS
```bash
# Debe ser https://, NO http://
# ✅ Correcto:
https://abc123.ngrok.app/ar

# ❌ Incorrecto:
http://abc123.ngrok.app/ar
http://localhost:3000/ar
http://192.168.1.100:3000/ar
```

#### B. Limpia permisos de Safari
1. Safari → Configuración → Privacidad
2. "Borrar historial y datos de sitios"
3. Intenta de nuevo

#### C. Verifica versión iOS
```javascript
// Mínimo iOS 11
const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
const iOSVersion = navigator.userAgent.match(/OS (\d+)_/);
console.log('iOS Version:', iOSVersion ? iOSVersion[1] : 'N/A');
// Debe ser >= 11
```

#### D. Prueba con getUserMedia manual
```javascript
// Test en console:
navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
  .then(stream => {
    console.log('✅ Cámara funciona', stream);
    stream.getTracks().forEach(t => t.stop());
  })
  .catch(err => {
    console.error('❌ Error:', err.name, err.message);
  });
```

**Errores comunes:**
- `NotAllowedError`: Usuario denegó permiso o no es HTTPS
- `NotFoundError`: No hay cámara (simulador?)
- `NotReadableError`: Cámara en uso por otra app

---

### Problema 2: "Marcador no detecta"

**Síntomas:**
- Cámara funciona
- Status siempre en "Buscando marcador..."
- Modelo 3D nunca aparece

**Soluciones:**

#### A. Verifica iluminación
- ✅ Luz brillante, uniforme
- ❌ Evita contraluz
- ❌ Evita sombras fuertes
- ✅ Luz natural o LED blanco

#### B. Mejora calidad del marcador
```javascript
// En ar.html, ajusta parámetros del marker:
<a-marker 
  type="pattern" 
  url="/markers/heart.patt"
  smooth="true"
  smoothCount="10"        // Aumenta para más estabilidad
  smoothTolerance="0.01"  // Reduce para más sensibilidad
  smoothThreshold="5">    // Ajusta según necesites
</a-marker>
```

**Valores recomendados iOS:**
- `smoothCount`: 5-10 (menor = más responsive, mayor = más estable)
- `smoothTolerance`: 0.01-0.05
- `smoothThreshold`: 2-5

#### C. Verifica tamaño del marcador
- Mínimo: 8cm x 8cm impreso
- Óptimo: 10-15cm x 10-15cm
- Distancia: 20-50cm de la cámara

#### D. Verifica que marcador sea único
```bash
# Cada .patt debe ser diferente
# No copies el mismo archivo 5 veces

# Verifica:
ls -l public/markers/
# Tamaños deben ser diferentes si son marcadores diferentes
```

---

### Problema 3: "Tracking inestable / jittery"

**Síntomas:**
- Modelo 3D "vibra" o se mueve erráticamente
- Pierde tracking constantemente

**Soluciones:**

#### A. Aumenta smooth parameters
```html
<a-marker 
  smooth="true"
  smoothCount="10"
  smoothTolerance="0.01"
  smoothThreshold="5">
```

#### B. Estabiliza el marcador físico
- Usa papel rígido o cartón
- Pega a superficie plana
- Evita arrugas o dobleces
- No sostengas con mano temblorosa

#### C. Mejora condiciones
- Iluminación más estable (evita fluorescentes que parpadean)
- Reduce movimiento de cámara
- Mantén distancia constante

#### D. Reduce complejidad del modelo
```html
<!-- Usa primitivas simples para mejor performance -->
<a-entity
  geometry="primitive: sphere; radius: 0.3"
  material="color: #e74c3c"
  <!-- Evita demasiadas animaciones simultáneas -->
  animation="property: rotation; to: 0 360 0; loop: true; dur: 8000">
</a-entity>
```

---

### Problema 4: "Performance lenta"

**Síntomas:**
- FPS bajo (<20)
- Lag al detectar marcador
- Calentamiento del dispositivo
- Drenaje rápido de batería

**Soluciones:**

#### A. Optimiza renderer
```html
<a-scene
  renderer="
    antialias: false;
    precision: mediump;
    logarithmicDepthBuffer: true;
    maxCanvasWidth: 1920;
    maxCanvasHeight: 1920;">
</a-scene>
```

#### B. Reduce geometría
```html
<!-- ❌ Malo para iOS: -->
<a-entity 
  geometry="primitive: sphere; radius: 0.3; segmentsWidth: 64; segmentsHeight: 64">
</a-entity>

<!-- ✅ Bueno para iOS: -->
<a-entity 
  geometry="primitive: sphere; radius: 0.3; segmentsWidth: 16; segmentsHeight: 16">
</a-entity>
```

#### C. Limita animaciones
```javascript
// Pausa animaciones cuando marcador no visible
marker.addEventListener('markerLost', () => {
  const entity = marker.querySelector('a-entity');
  entity.setAttribute('animation', 'enabled', false);
});

marker.addEventListener('markerFound', () => {
  const entity = marker.querySelector('a-entity');
  entity.setAttribute('animation', 'enabled', true);
});
```

#### D. Usa throttling para analytics
```javascript
// En ar-events.js
let lastInteractionTime = 0;
const THROTTLE_MS = 5000; // 5 segundos

function registerInteraction(organ) {
  const now = Date.now();
  if (now - lastInteractionTime < THROTTLE_MS) {
    console.log('⏱️ Throttled');
    return;
  }
  lastInteractionTime = now;
  
  // ... código existente de registro
}
```

---

### Problema 5: "Overlay no visible o mal posicionado"

**Síntomas:**
- Texto del overlay no se ve
- Botones detrás de la cámara
- z-index no funciona

**Soluciones:**

#### A. Verifica z-index y pointer-events
```css
#overlay {
  position: fixed;
  z-index: 9999;  /* Muy alto */
  pointer-events: none;  /* Deja pasar clicks excepto en elementos específicos */
}

#storyOverlay {
  pointer-events: auto;  /* Este sí acepta clicks */
}
```

#### B. Usa backdrop-filter con cuidado
```css
/* Safari iOS soporta backdrop-filter pero puede ser lento */
#storyOverlay {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px); /* Safari prefix */
}

/* Si hay performance issues, simplifica: */
#storyOverlay {
  background: rgba(255, 255, 255, 0.98); /* Más opaco, sin blur */
}
```

#### C. Safe area para iPhone con notch
```css
#storyOverlay {
  bottom: 20px;
  bottom: calc(20px + env(safe-area-inset-bottom)); /* Respeta notch */
  left: 20px;
  left: calc(20px + env(safe-area-inset-left));
  right: 20px;
  right: calc(20px + env(safe-area-inset-right));
}
```

---

### Problema 6: "Scroll inesperado / zoom no deseado"

**Síntomas:**
- Al tocar la pantalla hace zoom
- Scroll vertical durante AR
- Gestos no esperados

**Soluciones:**

Ya incluido en `ar-events.js`:

```javascript
// Prevenir zoom en iOS
document.addEventListener('gesturestart', function(e) {
  e.preventDefault();
}, false);

// Prevenir scroll bounce
document.addEventListener('touchmove', function(e) {
  if (state.isARActive) {
    e.preventDefault();
  }
}, { passive: false });
```

Si no funciona, agrega CSS:

```css
body {
  touch-action: none;
  overscroll-behavior: none;
  -webkit-user-select: none;
  user-select: none;
}
```

---

## 📱 Testing en iOS

### Opción 1: Dispositivo físico (Recomendado)

**Setup:**
```bash
# 1. Servidor local
npm start

# 2. Exponer con HTTPS
ngrok http 3000

# 3. URL en iPhone Safari
https://abc123.ngrok-free.app/ar
```

### Opción 2: iOS Simulator (Limitado)

⚠️ **Limitación:** Simulator NO tiene cámara, AR no funcionará.

Útil solo para:
- Verificar layout
- Probar formularios
- Verificar estilos responsive

**Setup:**
```bash
# Requiere Xcode (Mac only)
open -a Simulator

# Safari en simulator
Safari → Develop → Simulator → Inspect Element
```

### Opción 3: BrowserStack / Sauce Labs

Para testing en múltiples dispositivos iOS sin tenerlos físicamente:
- https://www.browserstack.com/ (pago, trial gratis)
- https://saucelabs.com/ (pago, trial gratis)

---

## 🔍 Debug Tools para iOS Safari

### Remote Debugging (Mac + iPhone)

1. **En iPhone:**
   - Ajustes → Safari → Avanzado
   - Activar "Web Inspector"

2. **En Mac:**
   - Safari → Preferences → Advanced
   - Activar "Show Develop menu"
   - Conecta iPhone con cable
   - Safari → Develop → [Tu iPhone] → [Tu página]

3. **Debug:**
   - Console logs visibles en Mac
   - Inspect elements
   - Ver network requests
   - JavaScript debugging

### Console Logs

Agrega debugging en `ar-events.js`:

```javascript
// Log detallado para iOS
console.log('🍎 iOS Version:', /OS (\d+)_(\d+)/.exec(navigator.userAgent));
console.log('📱 User Agent:', navigator.userAgent);
console.log('📷 Media Devices:', 'mediaDevices' in navigator);
console.log('🎥 getUserMedia:', 'getUserMedia' in navigator.mediaDevices);

// Log cuando AR.js detecta cosas
AFRAME.registerComponent('log-marker', {
  init: function() {
    this.el.addEventListener('markerFound', () => {
      console.log('🎯 Marker found', this.el.id);
    });
    this.el.addEventListener('markerLost', () => {
      console.log('❌ Marker lost', this.el.id);
    });
  }
});
```

Úsalo en `ar.html`:

```html
<a-marker type="pattern" url="/markers/heart.patt" log-marker>
  <!-- ... -->
</a-marker>
```

---

## 📊 Checklist iOS-Specific

Antes de decir "no funciona en iOS":

- [ ] ✅ Estás usando **HTTPS** (no http://)
- [ ] ✅ Estás usando **Safari** (no Chrome iOS)
- [ ] ✅ iOS versión >= 11
- [ ] ✅ Permisos de cámara permitidos
- [ ] ✅ No hay otra app usando la cámara
- [ ] ✅ Marcadores correctamente generados e impresos
- [ ] ✅ Buena iluminación (no oscuro)
- [ ] ✅ Distancia apropiada (20-50cm)
- [ ] ✅ Papel plano (no arrugado)
- [ ] ✅ A-Frame y AR.js cargados correctamente
- [ ] ✅ No hay errores en console
- [ ] ✅ Network requests exitosas (200 OK)

---

## 🎓 Recursos Adicionales

- [AR.js iOS Issues](https://github.com/AR-js-org/AR.js/issues?q=is%3Aissue+iOS)
- [Safari Web APIs](https://webkit.org/status/)
- [iOS Safari Media Capture](https://webkit.org/blog/6784/new-video-policies-for-ios/)
- [A-Frame Mobile Best Practices](https://aframe.io/docs/1.4.0/introduction/developing-with-mobile.html)

---

## 💡 Tips Finales

1. **Siempre testea en dispositivo real** - Simuladores no funcionan para AR
2. **Usa ngrok pro** ($5/mes) para dominio fijo y no tener que re-compartir URL
3. **Battery warning** - AR drena batería rápido, avisa a los usuarios
4. **Fallback** - Considera agregar video demo si AR no funciona
5. **Analytics** - Trackea qué % de usuarios iOS completan la experiencia

---

**¡iOS Safari puede ser complicado, pero con esta guía tu WebAR funcionará! 🎯**

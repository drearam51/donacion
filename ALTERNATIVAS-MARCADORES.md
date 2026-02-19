# 🎨 Alternativas de Marcadores AR.js

## Opción 1: Marcadores Predefinidos de AR.js (Más Fácil)

Si tienes problemas generando marcadores personalizados, AR.js incluye marcadores predefinidos que puedes usar temporalmente.

### Marcador HIRO

**Descargar:**
- Pattern: https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/data/patt.hiro
- Imagen: https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png

**Usar en ar.html:**

```html
<a-marker preset="hiro">
  <a-entity
    geometry="primitive: sphere; radius: 0.3"
    material="color: #e74c3c"
    position="0 0.5 0">
  </a-entity>
</a-marker>
```

### Marcador KANJI

**Descargar:**
- Pattern: https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/data/patt.kanji
- Imagen: https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/kanji.png

**Usar en ar.html:**

```html
<a-marker preset="kanji">
  <a-entity
    geometry="primitive: box; width: 0.4; height: 0.6; depth: 0.3"
    material="color: #8e44ad"
    position="0 0.5 0">
  </a-entity>
</a-marker>
```

### Implementación Rápida con Presets

Si quieres empezar rápido sin generar marcadores:

```html
<!-- En ar.html, reemplaza todos los markers por: -->

<!-- Corazón - Hiro -->
<a-marker preset="hiro">
  <a-entity
    geometry="primitive: sphere; radius: 0.3"
    material="color: #e74c3c"
    position="0 0.5 0"
    animation="property: scale; to: 1.1 1.1 1.1; dir: alternate; loop: true; dur: 1000">
  </a-entity>
</a-marker>

<!-- Riñón - Kanji -->
<a-marker preset="kanji">
  <a-entity
    geometry="primitive: box; width: 0.4; height: 0.6; depth: 0.3"
    material="color: #8e44ad"
    position="0 0.5 0">
  </a-entity>
</a-marker>

<!-- Para los otros 3, tendrías que usar custom patterns -->
```

**Limitación:** AR.js solo tiene 2 presets (hiro y kanji), necesitarás generar los otros 3.

---

## Opción 2: Generador AR.js Marker Training (Recomendado)

**URL:** https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html

### Imágenes Recomendadas para Cada Órgano

#### 🫀 Corazón
**Buscar en Google:**
- "heart icon simple black white"
- "anatomical heart silhouette"

**Características:**
- Alto contraste
- Fondo blanco
- Forma distintiva
- Sin demasiados detalles

**Ejemplo de búsqueda:**
```
site:flaticon.com heart icon simple
```

#### 🫘 Riñón
**Buscar:**
- "kidney icon simple"
- "kidney bean shape"

**Alternativa:**
- Usa emoji 🫘 en grande (captura pantalla)

#### 🫁 Pulmón
**Buscar:**
- "lungs icon simple"
- "respiratory system icon"

#### 👁️ Ojo
**Buscar:**
- "eye icon simple"
- "eye outline"

**Más fácil:**
- Emoji 👁️ en grande

#### 🟤 Hígado
**Buscar:**
- "liver icon simple"
- "liver organ outline"

---

## Opción 3: Crear Marcadores con Emojis (Método Rápido)

### Paso a Paso

1. **Crear imagen de emoji grande**

Abre este HTML en navegador:

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { 
      display: flex; 
      align-items: center; 
      justify-content: center; 
      height: 100vh; 
      background: white;
      margin: 0;
    }
    .emoji { 
      font-size: 400px; 
      user-select: none;
    }
  </style>
</head>
<body>
  <div class="emoji">🫀</div>
</body>
</html>
```

2. **Capturar pantalla**
   - Zoom 100%
   - Screenshot solo del emoji
   - Guardar como PNG

3. **Subir al generador**
   - Abrir: https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html
   - Upload tu imagen
   - Download .patt

4. **Repetir para cada órgano**
   - 🫀 → heart.patt
   - 🫘 → kidney.patt (o usar 🫘)
   - 🫁 → lung.patt
   - 👁️ → eye.patt
   - 🦴 → liver.patt (no hay emoji de hígado, usa hueso)

---

## Opción 4: Usar QR-like Custom Markers

### Generar con texto/números

Si te resulta difícil con imágenes, puedes crear marcadores basados en patrones simples:

**Herramienta online:**
https://au.gmented.com/app/marker/marker.php

**Pasos:**
1. Ingresa texto: "HEART", "KIDNEY", etc.
2. Download pattern file (.patt)
3. Download marker image (para imprimir)
4. Renombra y guarda en `/public/markers/`

---

## Opción 5: Barcode Markers (Más Simple)

AR.js también soporta barcode markers que son más fáciles de generar.

### Cambiar a barcode en ar.html:

```html
<a-scene
  arjs="sourceType: webcam; detectionMode: mono_and_matrix; matrixCodeType: 3x3;">

<!-- Barcode markers -->
<a-marker type="barcode" value="0">
  <!-- Corazón -->
  <a-entity geometry="primitive: sphere" material="color: red"></a-entity>
</a-marker>

<a-marker type="barcode" value="1">
  <!-- Riñón -->
  <a-entity geometry="primitive: box" material="color: purple"></a-entity>
</a-marker>

<a-marker type="barcode" value="2">
  <!-- Pulmón -->
  <a-entity geometry="primitive: cylinder" material="color: blue"></a-entity>
</a-marker>

<a-marker type="barcode" value="3">
  <!-- Ojo -->
  <a-entity geometry="primitive: sphere" material="color: teal"></a-entity>
</a-marker>

<a-marker type="barcode" value="4">
  <!-- Hígado -->
  <a-entity geometry="primitive: dodecahedron" material="color: brown"></a-entity>
</a-marker>

</a-scene>
```

### Generar barcodes:

**Usar esta herramienta:**
https://au.gmented.com/app/marker/marker.php

O descargar desde [artoolkit-barcode-markers-collection](https://github.com/nicolocarpignoli/artoolkit-barcode-markers-collection) (tipo 3x3):
- Barcode 0: https://github.com/nicolocarpignoli/artoolkit-barcode-markers-collection/raw/master/3x3/0.png
- Barcode 1: https://github.com/nicolocarpignoli/artoolkit-barcode-markers-collection/raw/master/3x3/1.png
- Barcode 2: https://github.com/nicolocarpignoli/artoolkit-barcode-markers-collection/raw/master/3x3/2.png
- Barcode 3: https://github.com/nicolocarpignoli/artoolkit-barcode-markers-collection/raw/master/3x3/3.png
- Barcode 4: https://github.com/nicolocarpignoli/artoolkit-barcode-markers-collection/raw/master/3x3/4.png

**Ventajas:**
- ✅ Fácil de generar
- ✅ Alta tasa de detección
- ✅ No necesitas Marker Training

**Desventajas:**
- ❌ Menos "personalizado"
- ❌ Estética industrial

---

## Comparación de Opciones

| Opción | Dificultad | Detección | Personalización | Tiempo |
|--------|------------|-----------|-----------------|--------|
| Presets (Hiro/Kanji) | Muy fácil | Excelente | Ninguna | 5 min |
| Custom Patterns | Media | Buena | Total | 30 min |
| Emoji-based | Fácil | Buena | Buena | 20 min |
| QR-like text | Fácil | Excelente | Media | 15 min |
| Barcodes | Muy fácil | Excelente | Baja | 10 min |

---

## Recomendación por Caso de Uso

### Para MVP rápido (testing):
→ **Usar barcodes** (Opción 5)

### Para proyecto académico:
→ **Emoji-based** (Opción 3) o **Custom patterns** (Opción 2)

### Para producción:
→ **Custom patterns profesionales** con imágenes diseñadas

---

## Script de Actualización para Barcodes

Si decides usar barcodes en lugar de custom patterns:

### Actualizar ar.html:

```javascript
// En ar-events.js, actualiza también los IDs:

function initializeMarkers() {
  const markers = [
    { id: 'marker-0', organ: 'heart' },
    { id: 'marker-1', organ: 'kidney' },
    { id: 'marker-2', organ: 'lung' },
    { id: 'marker-3', organ: 'eye' },
    { id: 'marker-4', organ: 'liver' }
  ];
  
  // ... resto del código
}
```

### Actualizar HTML:

Busca y reemplaza en `ar.html`:

```html
<!-- Antes: -->
<a-marker id="marker-heart" type="pattern" url="/markers/heart.patt">

<!-- Después: -->
<a-marker id="marker-0" type="barcode" value="0">
```

Repite para todos los marcadores.

---

## 📥 Descarga Rápida de Marcadores

Para facilitarte la vida, aquí están links directos:

### Barcode Markers (Listos para usar):
```bash
# Desde artoolkit-barcode-markers-collection (tipo 3x3)
curl -L -o barcode-0.png https://github.com/nicolocarpignoli/artoolkit-barcode-markers-collection/raw/master/3x3/0.png
curl -L -o barcode-1.png https://github.com/nicolocarpignoli/artoolkit-barcode-markers-collection/raw/master/3x3/1.png
curl -L -o barcode-2.png https://github.com/nicolocarpignoli/artoolkit-barcode-markers-collection/raw/master/3x3/2.png
curl -L -o barcode-3.png https://github.com/nicolocarpignoli/artoolkit-barcode-markers-collection/raw/master/3x3/3.png
curl -L -o barcode-4.png https://github.com/nicolocarpignoli/artoolkit-barcode-markers-collection/raw/master/3x3/4.png
```

### Preset Markers:
```bash
curl -o hiro.png https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png
curl -o kanji.png https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/kanji.png
```

---

## Conclusión

**Para empezar YA:**
1. Usa barcodes (descarga las imágenes arriba)
2. Imprime las 5 imágenes
3. Actualiza `ar.html` para usar `type="barcode"`
4. ¡Funciona!

**Para proyecto más profesional:**
1. Crea imágenes personalizadas (emojis o iconos)
2. Genera .patt con Marker Training
3. Testea y ajusta parámetros
4. Imprime en alta calidad

**🎯 Ambos enfoques funcionan perfectamente para tu MVP.**

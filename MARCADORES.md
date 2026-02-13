# 📝 Tutorial: Cómo Generar Marcadores AR.js

## 🎯 ¿Qué son los marcadores?

Los marcadores son imágenes especiales que AR.js usa para detectar donde colocar los modelos 3D. Son similares a los códigos QR pero optimizados para realidad aumentada.

## 🛠️ Herramienta Recomendada

**AR.js Marker Training Tool**
https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html

## 📋 Paso a Paso

### 1️⃣ Preparar las imágenes base

Necesitas 5 imágenes diferentes, una para cada órgano. Pueden ser:

**Opción A - Usar emojis (más fácil):**
- 🫀 Corazón
- 🫘 Riñón  
- 🫁 Pulmón
- 👁️ Ojo
- 🟤 Hígado (o usar 🦴)

Cómo obtener emojis grandes:
1. Ve a https://emojipedia.org/
2. Busca el emoji
3. Click derecho → "Guardar imagen"
4. O haz screenshot del emoji en grande

**Opción B - Usar imágenes simples:**
- Busca en Google Images "heart icon simple"
- Descarga imágenes con:
  - Fondo blanco
  - Alto contraste
  - Formas simples (no muy detalladas)
  - Tamaño mínimo 512x512px

### 2️⃣ Generar marcador para CORAZÓN

1. Abre: https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html

2. Click en "Upload Image"

3. Selecciona tu imagen de corazón

4. Espera unos segundos mientras procesa

5. Verás dos botones:
   - **"Download Marker"** → Descarga el archivo `.patt`
   - **"Download Image"** → Descarga la imagen del marcador para imprimir

6. Descarga AMBOS archivos

7. Renombra el `.patt` a `heart.patt`

8. Guarda `heart.patt` en: `c:\Users\andrea.ramirez\Documents\donacion\public\markers\heart.patt`

9. Guarda también la imagen (JPG/PNG) para imprimirla después

### 3️⃣ Repetir para los otros 4 órganos

Repite el proceso para:

- **Riñón** → `kidney.patt`
- **Pulmón** → `lung.patt`
- **Ojo** → `eye.patt`
- **Hígado** → `liver.patt`

### 4️⃣ Verificar archivos

Tu carpeta `/public/markers/` debe tener:

```
/public/markers/
  ✅ heart.patt
  ✅ kidney.patt
  ✅ lung.patt
  ✅ eye.patt
  ✅ liver.patt
```

Cada archivo debe tener contenido (no ser placeholder).

### 5️⃣ Imprimir los marcadores

**IMPORTANTE:** AR.js necesita los marcadores IMPRESOS en papel. No funciona apuntando a una pantalla.

1. Abre las imágenes descargadas (no los .patt)
2. Imprime en papel blanco, preferiblemente mate
3. Tamaño recomendado: 8x8 cm mínimo
4. **Tip:** Imprime varios de cada uno por si se dañan

**Especificaciones de impresión:**
- ✅ Papel blanco mate (mejor detección)
- ✅ Impresión a color
- ✅ Calidad alta
- ❌ No papel brillante
- ❌ No en pantalla

### 6️⃣ Probar los marcadores

1. Ejecuta el servidor: `npm start`
2. Abre: http://localhost:3000/ar.html
3. Permite acceso a la cámara
4. Apunta a un marcador impreso
5. Deberías ver el modelo 3D aparecer

## 🎨 Tips para mejores marcadores

### ✅ Buenas prácticas:

- Usa imágenes con alto contraste
- Fondos blancos o transparentes
- Formas simples y reconocibles
- Tamaño mínimo 512x512px
- Cada marcador debe ser DIFERENTE
- Evita imágenes muy complejas

### ❌ Evita:

- Imágenes muy pequeñas (<256px)
- Fondos complejos o con patrones
- Imágenes muy similares entre sí
- Fotografías realistas (usa iconos/ilustraciones)
- Mucho texto o detalles finos

## 🔄 Alternativa: Usar marcadores predefinidos

Si tienes problemas generando marcadores, puedes usar temporalmente marcadores predefinidos de AR.js:

### Marcador HIRO (para testing rápido)

1. Descarga: https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/data/patt.hiro

2. Guárdalo 5 veces con nombres diferentes:
   ```
   heart.patt
   kidney.patt
   lung.patt
   eye.patt
   liver.patt
   ```

3. Descarga la imagen del marcador: https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png

4. Imprime 5 copias

**Limitación:** Todos los marcadores serán iguales, así que solo funcionará uno a la vez.

## 🧪 Testing de marcadores

### Checklist de prueba:

1. **Iluminación:**
   - [ ] Probado con luz natural
   - [ ] Probado con luz artificial
   - [ ] Sin reflejos en el papel

2. **Distancia:**
   - [ ] Funciona a 20cm
   - [ ] Funciona a 40cm
   - [ ] Funciona a 60cm

3. **Ángulo:**
   - [ ] Funciona frontal
   - [ ] Funciona con leve inclinación
   - [ ] Se pierde en ángulos extremos (esperado)

4. **Tracking:**
   - [ ] Detecta rápidamente
   - [ ] Mantiene tracking al mover
   - [ ] Re-detecta después de perderlo

## 🎓 Recursos adicionales

- **AR.js Documentation:** https://ar-js-org.github.io/AR.js-Docs/
- **Marker Generator:** https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html
- **AR.js GitHub:** https://github.com/AR-js-org/AR.js

## 🆘 Problemas comunes

### "El marcador no se detecta"
- Verifica buena iluminación
- Asegúrate que esté impreso (no en pantalla)
- Prueba con mayor contraste
- Revisa que el .patt esté en la carpeta correcta

### "Detecta pero pierde tracking rápido"
- Usa papel más rígido
- Evita arrugas o dobleces
- Mejora la iluminación
- Ajusta `smoothCount` y `smoothTolerance` en ar.html

### "Todos los marcadores detectan el mismo órgano"
- Verifica que cada .patt sea diferente
- Regenera marcadores con imágenes más distintas
- Revisa que los archivos no estén duplicados

---

**¡Listo! Con tus marcadores generados e impresos, tu WebAR está completo.**

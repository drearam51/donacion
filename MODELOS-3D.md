# Modelos 3D para Experiencia AR

El proyecto muestra **modelos 3D anatómicos reales** al escanear cada marcador, con animaciones de movimiento.

## Órganos y animaciones

| Marcador | Órgano | Animación |
|----------|--------|-----------|
| Barcode 0 | Corazón | Rotación + latido (scale pulse) |
| Barcode 1 | Riñón | Rotación + flotación suave |
| Barcode 2 | Pulmón | Rotación + "respiración" (scale) |
| Barcode 3 | Ojo | Rotación lenta |
| Barcode 4 | Hígado | Rotación + flotación suave |

## Fuente actual: HuBMAP CCF

Los modelos vienen de [HuBMAP CCF 3D Reference Library](https://hubmapconsortium.github.io/ccf/pages/ccf-3d-reference-library.html) (CC BY 4.0):

- Corazón: VH_F_Heart.glb
- Riñón: VH_F_Kidney_L.glb
- Pulmón: VH_F_Lung.glb
- Ojo: VH_F_Eye_L.glb
- Hígado: VH_F_Liver.glb

Por defecto se cargan desde GitHub. La primera vez puede tardar unos segundos (cada modelo ~1-3 MB).

## Si los modelos no cargan (CORS o lentitud)

Descarga los modelos localmente:

### Opción A: Script PowerShell (Windows)

```powershell
cd public\models
Invoke-WebRequest -Uri "https://github.com/hubmapconsortium/ccf-releases/raw/main/v1.2/models/VH_F_Heart.glb" -OutFile "heart.glb"
Invoke-WebRequest -Uri "https://github.com/hubmapconsortium/ccf-releases/raw/main/v1.2/models/VH_F_Kidney_L.glb" -OutFile "kidney.glb"
Invoke-WebRequest -Uri "https://github.com/hubmapconsortium/ccf-releases/raw/main/v1.2/models/VH_F_Lung.glb" -OutFile "lung.glb"
Invoke-WebRequest -Uri "https://github.com/hubmapconsortium/ccf-releases/raw/main/v1.2/models/VH_F_Eye_L.glb" -OutFile "eye.glb"
Invoke-WebRequest -Uri "https://github.com/hubmapconsortium/ccf-releases/raw/main/v1.2/models/VH_F_Liver.glb" -OutFile "liver.glb"
```

Luego edita `ar.html` y cambia las URLs por rutas locales:
```html
<a-asset-item id="heart-model" src="/models/heart.glb"></a-asset-item>
```

### Opción B: Descarga manual

1. Ve a: https://github.com/hubmapconsortium/ccf-releases/tree/main/v1.2/models
2. Descarga: VH_F_Heart.glb, VH_F_Kidney_L.glb, VH_F_Lung.glb, VH_F_Eye_L.glb, VH_F_Liver.glb
3. Renómbralos a: heart.glb, kidney.glb, lung.glb, eye.glb, liver.glb
4. Guárdalos en: `public/models/`
5. Actualiza las URLs en `ar.html` a `/models/heart.glb` etc.

## Ajustar escala o posición

Si el modelo se ve muy grande, pequeño o mal orientado, edita en `ar.html`:

```html
scale="0.2 0.2 0.2"   <!-- Aumenta o disminuye el valor -->
position="0 0.5 0"    <!-- Y: altura sobre el marcador -->
rotation="0 0 0"      <!-- Orientación si hace falta -->
```

## Alternativas (modelos más ligeros)

Para móviles lentos, puedes usar modelos más simples desde:

- **Sketchfab**: https://sketchfab.com (busca "heart", "kidney" etc., filtra por "Downloadable")
- **Poly Pizza**: https://poly.pizza (modelos libres, formato GLB)

Descarga en GLB, guarda en `public/models/` y actualiza las rutas en `ar.html`.

## Añadir animación tipo latido

El corazón ya tiene animación de latido. Para otros órganos, usa el mismo patrón:

```html
animation__pulse="property: scale; from: 0.2 0.2 0.2; to: 0.22 0.22 0.22; dir: alternate; loop: true; dur: 1000; easing: easeInOutSine"
```

- `dur`: duración en ms (700 = latido rápido, 2500 = respiración lenta)
- `from`/`to`: valores de escala

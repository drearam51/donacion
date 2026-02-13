# 🚀 Guía de Deployment

## Opciones de Despliegue

Este MVP puede desplegarse en múltiples plataformas. Aquí están las opciones recomendadas:

---

## 1. Railway (Recomendado - Más fácil)

**Ventajas:**
- ✅ Deployment automático desde Git
- ✅ HTTPS incluido gratis
- ✅ Variables de entorno fáciles
- ✅ Free tier generoso
- ✅ Compatible con MongoDB Atlas

### Pasos:

1. **Crear cuenta en Railway**
   - Ve a https://railway.app/
   - Regístrate con GitHub

2. **Nuevo proyecto**
   - Click "New Project"
   - "Deploy from GitHub repo"
   - Selecciona tu repositorio

3. **Configurar variables**
   - Click en tu servicio
   - Tab "Variables"
   - Agregar:
     ```
     MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/donacion
     PORT=3000
     ```

4. **Deploy automático**
   - Railway detecta Node.js automáticamente
   - Ejecuta `npm install && npm start`
   - Obtendrás una URL HTTPS automática

5. **Listo**
   - Tu app estará en: `https://tu-app.up.railway.app`

---

## 2. Render

**Ventajas:**
- ✅ Free tier permanente
- ✅ HTTPS gratis
- ✅ Fácil configuración

### Pasos:

1. **Crear cuenta en Render**
   - Ve a https://render.com/
   - Regístrate con GitHub

2. **Nuevo Web Service**
   - "New" → "Web Service"
   - Conecta tu repositorio
   - Configuración:
     ```
     Name: donacion-webar
     Environment: Node
     Build Command: npm install
     Start Command: npm start
     ```

3. **Variables de entorno**
   - En "Environment"
   - Agregar: `MONGODB_URI`

4. **Deploy**
   - Click "Create Web Service"
   - Espera 5-10 minutos
   - Tu app estará en: `https://donacion-webar.onrender.com`

⚠️ **Nota:** El free tier de Render puede dormir después de 15 minutos sin uso.

---

## 3. Heroku

**Ventajas:**
- ✅ Muy popular
- ✅ Buena documentación
- ✅ HTTPS incluido

**Desventajas:**
- ❌ Free tier ya no existe (desde Nov 2022)
- ❌ Mínimo $5/mes

### Pasos:

1. **Instalar Heroku CLI**
   ```bash
   # Windows
   winget install Heroku.HerokuCLI
   
   # Mac
   brew install heroku/brew/heroku
   ```

2. **Login y crear app**
   ```bash
   heroku login
   heroku create donacion-webar
   ```

3. **Configurar MongoDB**
   ```bash
   heroku config:set MONGODB_URI="mongodb+srv://..."
   ```

4. **Deploy**
   ```bash
   git push heroku main
   heroku open
   ```

---

## 4. Vercel (Solo Frontend)

Vercel NO es ideal para este proyecto porque no maneja bien Express.js.

**Alternativa:** Usa Vercel solo para frontend estático + Railway/Render para backend.

---

## 5. VPS (Digital Ocean, Linode, etc.)

Para deployment en servidor propio:

### Pasos generales:

1. **Conectar al servidor**
   ```bash
   ssh user@your-server-ip
   ```

2. **Instalar Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Clonar repositorio**
   ```bash
   git clone https://github.com/tu-usuario/donacion-webar
   cd donacion-webar
   npm install
   ```

4. **Configurar .env**
   ```bash
   nano .env
   # Pegar tu MONGODB_URI
   ```

5. **Instalar PM2**
   ```bash
   sudo npm install -g pm2
   pm2 start server.js --name "donacion-webar"
   pm2 startup
   pm2 save
   ```

6. **Configurar Nginx + SSL**
   ```bash
   sudo apt install nginx certbot python3-certbot-nginx
   
   # Configurar Nginx
   sudo nano /etc/nginx/sites-available/donacion
   ```

   ```nginx
   server {
       listen 80;
       server_name tu-dominio.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   ```bash
   sudo ln -s /etc/nginx/sites-available/donacion /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   
   # SSL
   sudo certbot --nginx -d tu-dominio.com
   ```

---

## 📋 Checklist Pre-Deployment

Antes de desplegar, verifica:

- [ ] `.gitignore` incluye `node_modules/` y `.env`
- [ ] `package.json` tiene `"start": "node server.js"`
- [ ] Variables de entorno configuradas en la plataforma
- [ ] MongoDB Atlas permite conexiones desde cualquier IP
- [ ] Archivos `.patt` de marcadores están incluidos en el repo
- [ ] Puerto configurado como variable de entorno (`process.env.PORT`)

---

## 🧪 Testing en Producción

Después del deployment:

1. **Verificar backend**
   ```bash
   curl https://tu-app.com/api/stats
   ```
   
   Debe retornar JSON con estadísticas.

2. **Verificar frontend**
   - Abre `https://tu-app.com`
   - Verifica que carga correctamente

3. **Probar AR en móvil**
   - Abre `https://tu-app.com/ar` en iPhone (Safari)
   - Permite acceso a cámara
   - Prueba con marcadores impresos

4. **Probar formulario**
   - Completa el formulario de registro
   - Verifica que se guarda en MongoDB
   - Revisa `/admin` para ver estadísticas

---

## 🔒 Seguridad

### Para producción real (no MVP):

1. **Proteger admin**
   ```javascript
   const basicAuth = require('express-basic-auth');
   
   app.use('/admin', basicAuth({
     users: { 'admin': process.env.ADMIN_PASSWORD },
     challenge: true
   }));
   ```

2. **Rate limiting**
   ```javascript
   const rateLimit = require('express-rate-limit');
   
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000,
     max: 100
   });
   
   app.use('/api/', limiter);
   ```

3. **Helmet.js**
   ```javascript
   const helmet = require('helmet');
   app.use(helmet());
   ```

4. **Validación de inputs**
   ```javascript
   const validator = require('validator');
   // Validar emails, sanitizar inputs
   ```

---

## 📊 Monitoring

### Railway:
- Dashboard integrado muestra logs y métricas
- Alertas automáticas por email

### Render:
- Logs en tiempo real en el dashboard
- Health checks automáticos

### PM2 (VPS):
```bash
pm2 monit
pm2 logs donacion-webar
pm2 restart donacion-webar
```

---

## 🐛 Debug en Producción

Si algo no funciona:

1. **Ver logs**
   - Railway: Dashboard → Logs
   - Render: Logs tab
   - Heroku: `heroku logs --tail`
   - VPS: `pm2 logs`

2. **Verificar variables**
   ```bash
   # Railway/Render: Ver en dashboard
   # Heroku:
   heroku config
   ```

3. **Verificar MongoDB**
   - MongoDB Atlas → Connect → Troubleshoot
   - Verifica whitelist de IPs (permite 0.0.0.0/0)

4. **Test rápido**
   ```bash
   curl https://tu-app.com/api/stats
   ```

---

## 💰 Costos Estimados

| Plataforma | Free Tier | Costo Básico |
|------------|-----------|--------------|
| Railway | 500 hrs/mes gratis | ~$5/mes después |
| Render | Gratis (con sleep) | $7/mes sin sleep |
| Heroku | ❌ No existe | $5-7/mes |
| MongoDB Atlas | 512MB gratis | Suficiente para MVP |
| Dominio | ❌ | ~$10-15/año |

**Recomendación:** Railway o Render con MongoDB Atlas free tier = **$0/mes** para MVP

---

## 🎓 Recursos

- [Railway Docs](https://docs.railway.app/)
- [Render Docs](https://render.com/docs)
- [MongoDB Atlas Setup](https://www.mongodb.com/docs/atlas/getting-started/)
- [PM2 Process Manager](https://pm2.keymetrics.io/)

---

**¿Listo para producción? 🚀**

Recomendación: Empieza con Railway + MongoDB Atlas (ambos gratis).

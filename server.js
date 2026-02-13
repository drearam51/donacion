const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/donacion-organos';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB conectado correctamente'))
.catch(err => console.error('❌ Error conectando a MongoDB:', err));

// Schemas
const interactionSchema = new mongoose.Schema({
  organ: {
    type: String,
    required: true,
    enum: ['heart', 'kidney', 'lung', 'eye', 'liver']
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  device: String,
  userAgent: String,
  sessionId: String
});

const registrationSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  consentimiento: {
    type: Boolean,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  userAgent: String
});

const Interaction = mongoose.model('Interaction', interactionSchema);
const Registration = mongoose.model('Registration', registrationSchema);

// Routes
// Página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Página AR
app.get('/ar', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'ar.html'));
});

// API: Registrar interacción con marcador
app.post('/api/interaction', async (req, res) => {
  try {
    const { organ, device, sessionId } = req.body;
    const userAgent = req.headers['user-agent'];

    const interaction = new Interaction({
      organ,
      device,
      userAgent,
      sessionId
    });

    await interaction.save();
    
    console.log(`📱 Interacción registrada: ${organ} - ${device}`);
    
    res.json({ 
      success: true, 
      message: 'Interacción registrada',
      organ 
    });
  } catch (error) {
    console.error('Error registrando interacción:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error al registrar interacción' 
    });
  }
});

// API: Registrar usuario
app.post('/api/register', async (req, res) => {
  try {
    const { nombre, email, consentimiento } = req.body;
    const userAgent = req.headers['user-agent'];

    if (!nombre || !email || !consentimiento) {
      return res.status(400).json({ 
        success: false, 
        error: 'Faltan campos obligatorios' 
      });
    }

    const registration = new Registration({
      nombre,
      email,
      consentimiento,
      userAgent
    });

    await registration.save();
    
    console.log(`✅ Usuario registrado: ${email}`);
    
    res.json({ 
      success: true, 
      message: 'Registro exitoso' 
    });
  } catch (error) {
    console.error('Error registrando usuario:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error al registrar usuario' 
    });
  }
});

// API: Obtener estadísticas
app.get('/api/stats', async (req, res) => {
  try {
    const totalInteractions = await Interaction.countDocuments();
    const totalRegistrations = await Registration.countDocuments();
    
    const interactionsByOrgan = await Interaction.aggregate([
      {
        $group: {
          _id: '$organ',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    res.json({
      success: true,
      stats: {
        totalInteractions,
        totalRegistrations,
        byOrgan: interactionsByOrgan
      }
    });
  } catch (error) {
    console.error('Error obteniendo estadísticas:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error al obtener estadísticas' 
    });
  }
});

// Admin dashboard
app.get('/admin', async (req, res) => {
  try {
    const stats = await Interaction.aggregate([
      {
        $group: {
          _id: '$organ',
          count: { $sum: 1 }
        }
      }
    ]);

    const registrations = await Registration.countDocuments();

    res.send(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Admin - Estadísticas WebAR</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
          h1 { color: #e74c3c; }
          .stat-card { background: #f8f9fa; padding: 20px; margin: 10px 0; border-radius: 8px; }
          .stat-card h3 { margin-top: 0; color: #2c3e50; }
          .number { font-size: 36px; font-weight: bold; color: #e74c3c; }
        </style>
      </head>
      <body>
        <h1>📊 Dashboard - WebAR Donación de Órganos</h1>
        
        <div class="stat-card">
          <h3>Total Registros</h3>
          <div class="number">${registrations}</div>
        </div>

        <div class="stat-card">
          <h3>Interacciones por Órgano</h3>
          ${stats.map(s => `<p><strong>${s._id}:</strong> ${s.count} veces</p>`).join('')}
        </div>

        <a href="/">← Volver al inicio</a>
      </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send('Error cargando estadísticas');
  }
});

// Error handling
app.use((req, res) => {
  res.status(404).send('Página no encontrada');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📱 Para HTTPS (iOS): usa ngrok o similar`);
});

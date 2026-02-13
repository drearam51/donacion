// AR Events Handler - Compatible con iOS Safari
console.log('🚀 AR Events cargado');

// Estado global
const state = {
  currentOrgan: null,
  sessionId: generateSessionId(),
  isARActive: false,
  detectedOrgans: new Set()
};

// Generar ID de sesión único
function generateSessionId() {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Detectar dispositivo
function detectDevice() {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/.test(ua)) return 'iOS';
  if (/Android/.test(ua)) return 'Android';
  return 'Desktop';
}

// Contenido de storytelling para cada órgano
const organStories = {
  heart: {
    title: '🫀 Este corazón puede seguir latiendo',
    text: 'María tenía 8 años cuando recibió un trasplante de corazón. Hoy tiene 25 y es médica. Un donante puede salvar hasta 8 vidas.',
    cta: 'Quiero saber más'
  },
  kidney: {
    title: '🫘 Dos riñones, dos oportunidades',
    text: 'Carlos esperó 3 años en diálisis. Un trasplante de riñón le devolvió su vida. Muchos necesitan esa segunda oportunidad.',
    cta: 'Conocer cómo ayudar'
  },
  lung: {
    title: '🫁 Respirar es un regalo',
    text: 'Después de un trasplante de pulmón, Ana puede correr con sus hijos. Cada respiración es un recordatorio del valor de la donación.',
    cta: 'Quiero ayudar'
  },
  eye: {
    title: '👁️ Ver el mundo de nuevo',
    text: 'Un trasplante de córnea devolvió la vista a Luis. Ahora puede ver los colores, las caras de sus seres queridos y el amanecer.',
    cta: 'Conocer más'
  },
  liver: {
    title: '🟤 El hígado que salvó una vida',
    text: 'El hígado se regenera. Un donante vivo puede compartir parte de su hígado y ambos pueden llevar vidas completas y saludables.',
    cta: 'Informarme más'
  }
};

// Elementos del DOM
const permissionScreen = document.getElementById('permissionScreen');
const startButton = document.getElementById('startButton');
const arScene = document.getElementById('arScene');
const status = document.getElementById('status');
const storyOverlay = document.getElementById('storyOverlay');
const storyTitle = document.getElementById('storyTitle');
const storyText = document.getElementById('storyText');
const ctaButton = document.getElementById('ctaButton');
const closeStoryButton = document.getElementById('closeStory');
const errorScreen = document.getElementById('errorScreen');
const errorMessage = document.getElementById('errorMessage');

// Iniciar experiencia AR
startButton.addEventListener('click', async () => {
  console.log('🎬 Iniciando experiencia AR...');
  
  try {
    // Solicitar permiso de cámara (IMPORTANTE para iOS Safari)
    const stream = await navigator.mediaDevices.getUserMedia({ 
      video: { 
        facingMode: 'environment',
        width: { ideal: 1280 },
        height: { ideal: 720 }
      } 
    });
    
    console.log('✅ Permiso de cámara concedido');
    
    // Detener stream temporal (AR.js manejará la cámara)
    stream.getTracks().forEach(track => track.stop());
    
    // Mostrar escena AR
    permissionScreen.classList.add('hidden');
    arScene.style.display = 'block';
    state.isARActive = true;
    
    // Esperar a que AR.js se inicialice
    setTimeout(() => {
      initializeMarkers();
    }, 1000);
    
  } catch (error) {
    console.error('❌ Error accediendo a la cámara:', error);
    showError('No se pudo acceder a la cámara. Verifica los permisos en tu navegador y que estés usando HTTPS.');
  }
});

// Inicializar eventos de marcadores
function initializeMarkers() {
  console.log('🎯 Inicializando marcadores...');
  
  const markers = [
    { id: 'marker-heart', organ: 'heart' },
    { id: 'marker-kidney', organ: 'kidney' },
    { id: 'marker-lung', organ: 'lung' },
    { id: 'marker-eye', organ: 'eye' },
    { id: 'marker-liver', organ: 'liver' }
  ];

  markers.forEach(({ id, organ }) => {
    const marker = document.getElementById(id);
    
    if (marker) {
      // Evento cuando se detecta el marcador
      marker.addEventListener('markerFound', () => {
        console.log(`✅ Marcador detectado: ${organ}`);
        onMarkerFound(organ);
      });

      // Evento cuando se pierde el marcador
      marker.addEventListener('markerLost', () => {
        console.log(`❌ Marcador perdido: ${organ}`);
        onMarkerLost(organ);
      });
    } else {
      console.warn(`⚠️ Marcador no encontrado: ${id}`);
    }
  });

  console.log('✅ Marcadores inicializados');
}

// Cuando se detecta un marcador
function onMarkerFound(organ) {
  state.currentOrgan = organ;
  
  // Actualizar status
  status.textContent = `✅ ${getOrganName(organ)} detectado!`;
  status.classList.remove('searching');
  
  // Mostrar overlay con historia
  showStory(organ);
  
  // Registrar interacción solo si es la primera vez en esta sesión
  if (!state.detectedOrgans.has(organ)) {
    state.detectedOrgans.add(organ);
    registerInteraction(organ);
  }
}

// Cuando se pierde un marcador
function onMarkerLost(organ) {
  if (state.currentOrgan === organ) {
    state.currentOrgan = null;
    status.textContent = '🔍 Buscando marcador...';
    status.classList.add('searching');
    hideStory();
  }
}

// Mostrar historia del órgano
function showStory(organ) {
  const story = organStories[organ];
  
  if (story) {
    storyTitle.textContent = story.title;
    storyText.textContent = story.text;
    ctaButton.textContent = story.cta;
    storyOverlay.classList.add('show');
  }
}

// Ocultar historia
function hideStory() {
  storyOverlay.classList.remove('show');
}

// Obtener nombre legible del órgano
function getOrganName(organ) {
  const names = {
    heart: 'Corazón',
    kidney: 'Riñón',
    lung: 'Pulmón',
    eye: 'Ojo',
    liver: 'Hígado'
  };
  return names[organ] || organ;
}

// Registrar interacción en el backend
async function registerInteraction(organ) {
  const device = detectDevice();
  
  console.log(`📊 Registrando interacción: ${organ} (${device})`);
  
  try {
    const response = await fetch('/api/interaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        organ,
        device,
        sessionId: state.sessionId
      })
    });

    const data = await response.json();
    
    if (data.success) {
      console.log(`✅ Interacción registrada: ${organ}`);
    } else {
      console.warn('⚠️ Error registrando interacción:', data.error);
    }
  } catch (error) {
    console.error('❌ Error de red al registrar interacción:', error);
    // No mostrar error al usuario, solo log
  }
}

// CTA Button: Redirigir a registro
ctaButton.addEventListener('click', () => {
  console.log('📝 Usuario hizo clic en CTA');
  window.location.href = '/#register';
});

// Close story button
closeStoryButton.addEventListener('click', () => {
  hideStory();
});

// Mostrar pantalla de error
function showError(message) {
  errorMessage.textContent = message;
  errorScreen.classList.add('show');
  permissionScreen.classList.add('hidden');
}

// Manejo de errores de AR.js
window.addEventListener('arjs-error', (event) => {
  console.error('❌ Error de AR.js:', event.detail);
  showError('Error al inicializar AR. Asegúrate de estar usando HTTPS y que tu navegador soporte WebRTC.');
});

// Log de debug para desarrollo
console.log('📱 Dispositivo:', detectDevice());
console.log('🔐 Session ID:', state.sessionId);
console.log('🌐 User Agent:', navigator.userAgent);

// Prevenir zoom en iOS
document.addEventListener('gesturestart', function(e) {
  e.preventDefault();
});

// Prevenir scroll bounce en iOS
document.addEventListener('touchmove', function(e) {
  if (state.isARActive) {
    e.preventDefault();
  }
}, { passive: false });

console.log('✅ AR Events inicializado correctamente');

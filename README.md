# MindfulConnect - Asistente de Apoyo Emocional con IA

MindfulConnect es una aplicación móvil diseñada para ofrecer apoyo inmediato y herramientas de regulación emocional a usuarios que experimentan crisis de angustia o ideación suicida, utilizando la IA de Google Gemini.

## 🎯 Características

- **Asistente de IA empático**: Utiliza Google Gemini para proporcionar respuestas contextuales y empáticas
- **Técnicas de regulación emocional**: Ofrece ejercicios de conexión a tierra (grounding) y otras técnicas basadas en evidencia
- **Evaluación de intensidad**: Evalúa el nivel de angustia del usuario (1-10) para adaptar las respuestas
- **Recursos de emergencia**: Acceso rápido a líneas de crisis y recursos de emergencia
- **Interfaz móvil intuitiva**: Diseño moderno y accesible con React Native

## 🏗️ Arquitectura

El proyecto está dividido en dos partes principales:

### Backend (Flask)
- API REST con Flask
- Integración con Google Gemini AI
- Gestión de sesiones de conversación
- Rate limiting para protección
- CORS habilitado para comunicación con el frontend

### Frontend (React Native / Expo)
- Aplicación móvil multiplataforma
- Interfaz de chat en tiempo real
- Navegación entre pantallas
- Almacenamiento local de sesiones

## 📋 Requisitos Previos

- Python 3.8+
- Node.js 16+
- npm o yarn
- Cuenta de Google Cloud con API Key de Gemini
- Expo CLI (para desarrollo móvil)

## 🚀 Instalación

### Backend

1. Navega al directorio del backend:
```bash
cd backend
```

2. Crea un entorno virtual:
```bash
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
```

3. Instala las dependencias:
```bash
pip install -r requirements.txt
```

4. Configura las variables de entorno:
```bash
cp .env.example .env
```

Edita el archivo `.env` y añade tu API Key de Gemini:
```
GEMINI_API_KEY=tu_api_key_aqui
FLASK_ENV=development
FLASK_PORT=5000
```

5. Ejecuta el servidor:
```bash
python app.py
```

El servidor estará disponible en `http://localhost:5000`

### Frontend

1. Navega al directorio del frontend:
```bash
cd mobile
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura la URL del API en `src/config/api.js`:
```javascript
const API_BASE_URL = 'http://TU_IP_LOCAL:5000';  // Para desarrollo
// O usa tu servidor en producción
```

4. Inicia la aplicación:
```bash
npm start
```

5. Escanea el código QR con la app Expo Go en tu dispositivo móvil, o presiona:
   - `a` para Android
   - `i` para iOS
   - `w` para web

## 📱 Uso

1. **Pantalla de Bienvenida**: Lee la información importante sobre el servicio
2. **Chat**: Inicia una conversación con MindfulConnect
3. **Recursos de Emergencia**: Accede rápidamente a líneas de crisis si es necesario

### Flujo de Conversación

1. El asistente pregunta sobre tu estado emocional
2. Evalúa la intensidad de tu angustia (1-10)
3. Ofrece técnicas apropiadas según el nivel:
   - **Nivel 1-5**: Validación emocional y estrategias de afrontamiento
   - **Nivel 6-10**: Ejercicios de conexión a tierra (5-4-3-2-1) y regulación inmediata
4. Guía y reflexión sobre las técnicas aplicadas

## 🔒 Seguridad y Limitaciones

- **NO es un sustituto de ayuda profesional**: El asistente siempre aclara que no reemplaza a terapeutas o psicólogos
- **Referencia de emergencia**: Ante riesgo inminente, siempre se ofrece contacto con recursos humanos
- **Rate limiting**: El backend limita las solicitudes para prevenir abuso
- **Sin diagnóstico**: El asistente nunca diagnostica o prescribe acciones médicas

## 🛠️ Desarrollo

### Estructura del Backend

```
backend/
├── app.py              # Aplicación Flask principal
├── requirements.txt    # Dependencias Python
├── .env.example       # Ejemplo de variables de entorno
└── .gitignore         # Archivos ignorados por Git
```

### Estructura del Frontend

```
mobile/
├── App.js                    # Componente principal
├── src/
│   ├── screens/             # Pantallas de la app
│   │   ├── WelcomeScreen.js
│   │   ├── ChatScreen.js
│   │   └── EmergencyScreen.js
│   ├── config/              # Configuración
│   │   └── api.js           # Cliente API
│   └── theme.js             # Tema de la aplicación
├── package.json             # Dependencias Node
└── app.json                 # Configuración Expo
```

## 🌐 API Endpoints

### `POST /api/chat`
Envía un mensaje al asistente.

**Request:**
```json
{
  "message": "Me siento muy mal",
  "session_id": "session_123"
}
```

**Response:**
```json
{
  "response": "Entiendo que te sientas mal...",
  "session_id": "session_123",
  "status": "success"
}
```

### `POST /api/session/new`
Crea una nueva sesión de conversación.

### `POST /api/session/<session_id>/clear`
Limpia el historial de una sesión.

### `GET /health`
Verifica el estado del servidor.

## 📝 Notas Importantes

- **API Key de Gemini**: Necesitas obtener una API Key de Google Cloud Console para usar Gemini
- **Desarrollo móvil**: Para probar en dispositivo físico, asegúrate de que el dispositivo y la computadora estén en la misma red
- **Producción**: Para producción, configura un servidor adecuado y actualiza las URLs en el frontend

## 🤝 Contribución

Este es un proyecto de código abierto. Las contribuciones son bienvenidas.

## ⚠️ Disclaimer

MindfulConnect es una herramienta de apoyo complementaria y NO reemplaza la ayuda profesional. En caso de emergencia, siempre contacta con recursos humanos de crisis.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.


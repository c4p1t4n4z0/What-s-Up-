# Backend MindfulConnect - Flask + Gemini AI

## Configuración

1. Instala las dependencias:
```bash
pip install -r requirements.txt
```

2. Crea un archivo `.env` con:
```
GEMINI_API_KEY=tu_api_key_aqui
FLASK_ENV=development
FLASK_PORT=5000
```

3. Ejecuta el servidor:
```bash
python app.py
```

## Endpoints

- `GET /health` - Verifica el estado del servidor
- `POST /api/chat` - Envía un mensaje al asistente
- `POST /api/session/new` - Crea una nueva sesión
- `POST /api/session/<session_id>/clear` - Limpia el historial de una sesión

## Obtener API Key de Gemini

1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Crea una nueva API Key
3. Cópiala en tu archivo `.env`


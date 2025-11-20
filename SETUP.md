# Guía de Configuración Rápida - MindfulConnect

## Pasos Rápidos

### 1. Backend (Flask)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edita .env y añade tu GEMINI_API_KEY
python app.py
```

### 2. Frontend (React Native)

```bash
cd mobile
npm install
# Edita src/config/api.js y cambia la URL del API
npm start
```

### 3. Obtener API Key de Gemini

1. Visita: https://makersuite.google.com/app/apikey
2. Inicia sesión con tu cuenta de Google
3. Crea una nueva API Key
4. Cópiala en `backend/.env` como `GEMINI_API_KEY=tu_key_aqui`

## Verificación

1. Backend corriendo en `http://localhost:5000`
2. Frontend corriendo en Expo
3. Prueba el endpoint: `curl http://localhost:5000/health`

## Solución de Problemas

### Error: "GEMINI_API_KEY no está configurada"
- Verifica que el archivo `.env` existe en `backend/`
- Verifica que contiene `GEMINI_API_KEY=tu_key`

### Error de conexión en la app móvil
- Asegúrate de usar tu IP local (no localhost) en `mobile/src/config/api.js`
- Verifica que el backend esté corriendo
- Verifica que ambos dispositivos estén en la misma red

### Error al instalar dependencias
- Backend: `pip install --upgrade pip` y luego `pip install -r requirements.txt`
- Frontend: `npm install --legacy-peer-deps` si hay conflictos


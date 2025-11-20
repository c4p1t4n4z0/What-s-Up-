# Instrucciones Detalladas - MindfulConnect

## 📱 Aplicación Móvil de Apoyo Emocional con IA

### Requisitos del Sistema

- **Python 3.8+** (para el backend)
- **Node.js 16+** y **npm** (para el frontend)
- **Expo CLI** (se instala automáticamente con npm)
- **API Key de Google Gemini** (gratuita)

---

## 🚀 Configuración Paso a Paso

### Paso 1: Configurar el Backend (Flask)

1. **Navega al directorio del backend:**
```bash
cd backend
```

2. **Crea un entorno virtual:**
```bash
python -m venv venv
```

3. **Activa el entorno virtual:**
   - **Linux/Mac:** `source venv/bin/activate`
   - **Windows:** `venv\Scripts\activate`

4. **Instala las dependencias:**
```bash
pip install -r requirements.txt
```

5. **Obtén tu API Key de Gemini:**
   - Visita: https://makersuite.google.com/app/apikey
   - Inicia sesión con tu cuenta de Google
   - Haz clic en "Create API Key"
   - Copia la clave generada

6. **Crea el archivo de configuración:**
```bash
cp .env.example .env
```

7. **Edita el archivo `.env`** y añade tu API Key:
```
GEMINI_API_KEY=tu_api_key_aqui
FLASK_ENV=development
FLASK_PORT=5000
```

8. **Inicia el servidor:**
```bash
python app.py
```

El servidor debería estar corriendo en `http://localhost:5000`

**Verifica que funciona:**
```bash
curl http://localhost:5000/health
```

Deberías ver: `{"status": "ok", "service": "MindfulConnect API"}`

---

### Paso 2: Configurar el Frontend (React Native)

1. **Navega al directorio del frontend:**
```bash
cd mobile
```

2. **Instala las dependencias:**
```bash
npm install
```

3. **Encuentra tu IP local:**
   
   **Linux/Mac:**
   ```bash
   ifconfig | grep "inet " | grep -v 127.0.0.1
   ```
   O:
   ```bash
   ip addr | grep "inet " | grep -v 127.0.0.1
   ```
   
   **Windows:**
   ```bash
   ipconfig
   ```
   Busca "IPv4 Address" (no la que dice 127.0.0.1)

   Ejemplo de IP: `192.168.1.100`

4. **Configura la URL del API:**
   
   Edita el archivo `src/config/api.js` y cambia:
   ```javascript
   const API_BASE_URL = __DEV__ 
     ? 'http://TU_IP_LOCAL:5000'  // Ejemplo: 'http://192.168.1.100:5000'
     : 'https://tu-servidor.com';
   ```

   **Importante:** Si pruebas en un emulador Android, usa `10.0.2.2` en lugar de localhost.
   Si pruebas en un dispositivo físico, usa tu IP local.

5. **Instala Expo Go en tu dispositivo móvil:**
   - **Android:** [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - **iOS:** [App Store](https://apps.apple.com/app/expo-go/id982107779)

6. **Inicia la aplicación:**
```bash
npm start
```

7. **Conecta tu dispositivo:**
   - Escanea el código QR que aparece en la terminal con Expo Go
   - O presiona `a` para Android, `i` para iOS, `w` para web

---

## 🔧 Solución de Problemas Comunes

### Error: "GEMINI_API_KEY no está configurada"
- Verifica que el archivo `.env` existe en `backend/`
- Verifica que contiene `GEMINI_API_KEY=tu_key` (sin espacios alrededor del `=`)
- Reinicia el servidor Flask después de crear/editar `.env`

### Error de conexión en la app móvil
- **Verifica que el backend esté corriendo:** `curl http://localhost:5000/health`
- **Verifica la URL en `api.js`:** Debe ser tu IP local, no `localhost`
- **Verifica que ambos dispositivos estén en la misma red WiFi**
- **Verifica el firewall:** Asegúrate de que el puerto 5000 esté abierto

### Error: "Network request failed"
- Si estás en un dispositivo físico, asegúrate de usar tu IP local (ej: `192.168.1.100:5000`)
- Si estás en un emulador Android, usa `10.0.2.2:5000`
- Verifica que el backend esté accesible desde tu red local

### Error al instalar dependencias Python
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### Error al instalar dependencias Node
```bash
npm install --legacy-peer-deps
```

### La app no se conecta al backend
1. Verifica que el backend esté corriendo
2. Prueba el endpoint de salud desde tu navegador: `http://TU_IP:5000/health`
3. Si funciona en el navegador pero no en la app, verifica CORS (debería estar configurado)
4. Revisa los logs del backend para ver si llegan las peticiones

---

## 📱 Uso de la Aplicación

1. **Pantalla de Bienvenida:**
   - Lee la información importante sobre el servicio
   - MindfulConnect NO es un sustituto de ayuda profesional
   - Toca "Comenzar" para iniciar

2. **Chat:**
   - Escribe cómo te sientes
   - El asistente evaluará tu nivel de angustia (1-10)
   - Te ofrecerá técnicas apropiadas según tu nivel

3. **Recursos de Emergencia:**
   - Acceso rápido a líneas de crisis
   - Botón de emergencia siempre visible en el chat
   - Botones para llamar o enviar SMS directamente

---

## 🎯 Características Implementadas

✅ Integración con Google Gemini AI  
✅ Sistema de sesiones de conversación  
✅ Evaluación de intensidad emocional (1-10)  
✅ Técnicas de regulación emocional adaptativas  
✅ Ejercicios de conexión a tierra (5-4-3-2-1)  
✅ Recursos de emergencia integrados  
✅ Interfaz móvil moderna y accesible  
✅ Rate limiting para protección  
✅ Historial de conversación  
✅ Validaciones de seguridad  

---

## 🔒 Seguridad y Limitaciones

- **NO es un sustituto médico:** El asistente siempre aclara que no reemplaza profesionales
- **Referencia de emergencia:** Ante riesgo inminente, siempre se ofrece contacto humano
- **Sin diagnóstico:** El asistente nunca diagnostica o prescribe
- **Rate limiting:** Protección contra abuso (200 requests/día, 50/hora)

---

## 📝 Notas Adicionales

- El historial de conversación se mantiene durante la sesión
- Puedes limpiar la conversación desde el chat
- Las sesiones se identifican automáticamente
- El backend guarda el historial en memoria (se pierde al reiniciar)

---

## 🆘 Soporte

Si encuentras problemas:
1. Revisa los logs del backend en la terminal
2. Revisa la consola de Expo (donde ejecutaste `npm start`)
3. Verifica que todas las dependencias estén instaladas
4. Asegúrate de tener la última versión de Node.js y Python

---

¡Listo para usar! 🎉


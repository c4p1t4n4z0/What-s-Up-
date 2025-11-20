🔧 SOLUCIÓN DE ERRORES - MindfulConnect

He mejorado el manejo de errores y la configuración. Aquí está lo que he hecho:

✅ MEJORAS APLICADAS:

1. ✅ CORS mejorado en el backend
   - Ahora permite todas las solicitudes desde cualquier origen
   - Configurado específicamente para /api/*

2. ✅ Manejo de errores mejorado en el frontend
   - Mensajes de error más descriptivos
   - Información sobre qué verificar cuando hay problemas

3. ✅ Logging mejorado
   - Los errores ahora muestran más detalles

📱 SI SIGUES VIENDO ERRORES:

1. Verifica la conexión:
   ```bash
   # Desde tu computadora
   curl http://localhost:5000/health
   
   # Desde tu smartphone (usa la IP local)
   # Abre el navegador y ve a: http://192.168.14.34:5000/health
   ```

2. Verifica la IP en la app:
   - Abre: mobile/src/config/api.js
   - Verifica que la IP sea: 192.168.14.34:5000
   - Si tu IP cambió, actualízala

3. Verifica el firewall:
   ```bash
   # En Linux, permite el puerto 5000
   sudo ufw allow 5000
   ```

4. Reinicia ambos servicios:
   ```bash
   # Backend
   cd backend
   source venv/bin/activate
   python app.py
   
   # Frontend (en otra terminal)
   cd mobile
   npm start
   ```

5. Limpia la caché de Expo:
   ```bash
   cd mobile
   npm start -- --clear
   ```

📋 ERRORES COMUNES Y SOLUCIONES:

❌ "Network request failed"
   → Verifica que ambos dispositivos estén en la misma WiFi
   → Verifica que el backend esté corriendo
   → Verifica la IP en api.js

❌ "CORS error"
   → Ya está solucionado con la nueva configuración
   → Reinicia el backend si aún ves este error

❌ "GEMINI_API_KEY no está configurada"
   → Añade tu API Key en backend/.env
   → Reinicia el backend

❌ La app se cierra al abrir
   → Revisa los logs en la terminal de npm start
   → Verifica que todas las dependencias estén instaladas

💡 TIPS:

- En Expo Go, agita el dispositivo para abrir el menú de desarrollo
- Selecciona "Show Dev Menu" > "Debug Remote JS" para ver errores detallados
- Los logs aparecen en la terminal donde ejecutaste npm start

🆘 Si nada funciona:

1. Detén todos los servicios
2. Verifica que el backend responda: curl http://localhost:5000/health
3. Verifica tu IP local: hostname -I
4. Actualiza la IP en mobile/src/config/api.js
5. Reinicia ambos servicios
6. Prueba de nuevo en Expo Go

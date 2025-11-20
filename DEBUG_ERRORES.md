🔍 GUÍA DE DEBUGGING - Errores Comunes

Si ves un error en Expo Go, aquí están las soluciones más comunes:

1. ERROR: "Network request failed" o "Error de conexión"
   ✅ Solución:
   - Verifica que el backend esté corriendo: curl http://localhost:5000/health
   - Verifica que tu smartphone esté en la misma red WiFi
   - Verifica la IP en mobile/src/config/api.js (debe ser tu IP local, no localhost)
   - Verifica que el firewall no esté bloqueando el puerto 5000

2. ERROR: "CORS" o "Cross-Origin"
   ✅ Solución:
   - El backend ya tiene CORS configurado
   - Si persiste, verifica que el backend esté escuchando en 0.0.0.0 (ya está configurado)

3. ERROR: "GEMINI_API_KEY no está configurada"
   ✅ Solución:
   - Añade tu API Key en backend/.env
   - Reinicia el backend después de añadir la API Key

4. ERROR: "Cannot read property" o errores de JavaScript
   ✅ Solución:
   - Limpia la caché: npm start -- --clear
   - Reinstala dependencias: rm -rf node_modules && npm install

5. ERROR: La app se cierra o crashea
   ✅ Solución:
   - Revisa los logs en la terminal donde ejecutaste npm start
   - Verifica que todas las dependencias estén instaladas
   - Verifica que el código no tenga errores de sintaxis

📱 Para ver logs detallados:
- En Expo Go: Agita el dispositivo y selecciona "Show Dev Menu" > "Debug Remote JS"
- En la terminal: Revisa los mensajes de error que aparecen

🔧 Comandos útiles:
- Verificar backend: curl http://localhost:5000/health
- Verificar IP local: hostname -I
- Reiniciar backend: pkill -f "python app.py" && cd backend && source venv/bin/activate && python app.py
- Reiniciar frontend: pkill -f "expo start" && cd mobile && npm start

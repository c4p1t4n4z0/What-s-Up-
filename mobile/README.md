# Frontend MindfulConnect - React Native / Expo

## Configuración

1. Instala las dependencias:
```bash
npm install
```

2. Configura la URL del API en `src/config/api.js`:
```javascript
const API_BASE_URL = 'http://TU_IP_LOCAL:5000';  // Cambia por tu IP local
```

Para encontrar tu IP local:
- **Linux/Mac**: `ifconfig` o `ip addr`
- **Windows**: `ipconfig`

3. Inicia la aplicación:
```bash
npm start
```

4. Escanea el código QR con Expo Go o presiona:
   - `a` para Android
   - `i` para iOS
   - `w` para web

## Estructura

- `App.js` - Componente principal y navegación
- `src/screens/` - Pantallas de la aplicación
- `src/config/` - Configuración (API, tema)
- `src/theme.js` - Tema de la aplicación

## Desarrollo

Para desarrollo en dispositivo físico:
1. Asegúrate de que tu dispositivo y computadora estén en la misma red WiFi
2. Usa tu IP local en lugar de `localhost`
3. Verifica que el firewall permita conexiones en el puerto 5000


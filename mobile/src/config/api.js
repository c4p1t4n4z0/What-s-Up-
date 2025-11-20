import axios from 'axios';

// IMPORTANTE: Para desarrollo en dispositivo físico, cambia 'localhost' por tu IP local
// Ejemplo: 'http://192.168.1.100:5000'
// Para encontrar tu IP local:
// - Linux/Mac: ejecuta 'ifconfig' o 'ip addr' y busca 'inet'
// - Windows: ejecuta 'ipconfig' y busca 'IPv4 Address'
const API_BASE_URL = __DEV__ 
  ? 'http://192.168.14.34:5002'  // IP local configurada - Puerto 5002 (donde está corriendo el backend)
  : 'https://tu-servidor.com';  // Para producción

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const chatService = {
  sendMessage: async (message, sessionId) => {
    try {
      const response = await api.post('/api/chat', {
        message,
        session_id: sessionId,
      });
      return response.data;
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      const errorMessage = error.response?.data?.error || 
                          error.message || 
                          'Error de conexión. Verifica que el servidor esté corriendo.';
      throw new Error(errorMessage);
    }
  },

  createSession: async (sessionId) => {
    try {
      const response = await api.post('/api/session/new', {
        session_id: sessionId,
      });
      return response.data;
    } catch (error) {
      console.error('Error al crear sesión:', error);
      const errorMessage = error.response?.data?.error || 
                          error.message || 
                          'Error de conexión. Verifica que el servidor esté corriendo.';
      throw new Error(errorMessage);
    }
  },

  clearSession: async (sessionId) => {
    try {
      const response = await api.post(`/api/session/${sessionId}/clear`);
      return response.data;
    } catch (error) {
      console.error('Error al limpiar sesión:', error);
      const errorMessage = error.response?.data?.error || 
                          error.message || 
                          'Error de conexión. Verifica que el servidor esté corriendo.';
      throw new Error(errorMessage);
    }
  },
};

export default api;


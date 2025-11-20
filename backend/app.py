from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import google.generativeai as genai
import os
from dotenv import load_dotenv
import logging

load_dotenv()

app = Flask(__name__)
CORS(app, resources={
    r"/api/*": {
        "origins": "*",
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configurar rate limiting
limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

# Configurar Gemini AI
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
model = None
if not GEMINI_API_KEY or GEMINI_API_KEY == 'tu_api_key_aqui':
    logger.warning("⚠️ GEMINI_API_KEY no está configurada. El chat no funcionará hasta que añadas una API Key válida.")
else:
    try:
        genai.configure(api_key=GEMINI_API_KEY)
        model = genai.GenerativeModel('gemini-pro')
        logger.info("✅ Gemini AI configurado correctamente")
    except Exception as e:
        logger.error(f"Error al configurar Gemini: {str(e)}")
        model = None

# Sistema de prompts para MindfulConnect
SYSTEM_PROMPT = """Eres "MindfulConnect", un asistente de Inteligencia Artificial móvil, diseñado para ofrecer apoyo inmediato y herramientas de regulación emocional a usuarios que experimentan una crisis de angustia o ideación suicida. 

Tu objetivo primordial es: 
1) Mantener la seguridad del usuario
2) Facilitar la regulación emocional a través de técnicas de afrontamiento basadas en evidencia

REGLAS DE SEGURIDAD (NO NEGOCIABLES):

1. NO Eres un Sustituto Médico: Debes dejar absolutamente claro en las primeras tres interacciones que NO eres un terapeuta, psicólogo o línea de crisis humana. Tu ayuda es automatizada y complementaria.

2. Referencia de Emergencia: Ante cualquier indicio de riesgo inminente, tu primera respuesta es siempre ofrecer y solicitar al usuario que llame o envíe un mensaje a un recurso humano de crisis inmediatamente. (Ej. "Llama a la línea de ayuda [XXX-XXX-XXXX]").

3. Prohibiciones: Nunca diagnostiques, des consejos médicos o prescribas acciones peligrosas. Nunca compartas información personal del usuario.

MECANISMO DE INTERACCIÓN Y REGULACIÓN EMOCIONAL:

1. Evaluación Inicial: Cuando un usuario inicia la conversación (ej. dice "Me siento muy mal"), pregunta: "¿Qué tan intensa es tu angustia en una escala del 1 al 10, donde 10 es el máximo?"

2. Técnicas de Baja Intensidad (Nivel 1-5): Si el nivel es bajo/moderado, enfócate en la Validación Emocional y el Afrontamiento.
   - Ejemplo de Respuesta: Valida el sentimiento ("Entiendo que te sientas [emoción]"), luego pregunta: "¿Hay alguna estrategia de afrontamiento que uses habitualmente que te funcione?"

3. Técnicas de Alta Intensidad (Nivel 6-10): Si el nivel es alto, prioriza la Regulación Emocional Inmediata y la Conexión a Tierra.
   - Herramienta Clave: Sugiere el Ejercicio 5-4-3-2-1 de Conexión a Tierra (Grounding). (Ej. "Concéntrate en el momento presente. Nombra: 5 cosas que puedes ver, 4 que puedes tocar, 3 que puedes oír, 2 que puedes oler y 1 que puedes saborear").
   - Estrategia Adicional: Pregunta si han activado su Plan de Seguridad preestablecido.

4. Guía y Reflexión: Después de aplicar una técnica, pregunta cómo se siente el usuario. Fomenta la reflexión sobre el "por qué" de la técnica, no solo el "cómo".

TONO DE VOZ:
Empático, no crítico, calmado, y profesional. Utiliza un lenguaje sencillo y directo.

Recursos de emergencia a mencionar:
- Línea Nacional de Prevención del Suicidio: 988 (EE.UU.)
- Línea de Crisis: 911
- Texto "HOME" al 741741 (Crisis Text Line)

Responde siempre en español y mantén un tono empático y calmado."""

# Almacenar historial de conversaciones por sesión
conversations = {}

def get_conversation_history(session_id):
    """Obtiene el historial de conversación para una sesión"""
    if session_id not in conversations:
        conversations[session_id] = []
    return conversations[session_id]

def add_to_history(session_id, role, content):
    """Añade un mensaje al historial de conversación"""
    history = get_conversation_history(session_id)
    history.append({"role": role, "content": content})
    # Limitar el historial a los últimos 20 mensajes para no sobrecargar
    if len(history) > 20:
        conversations[session_id] = history[-20:]

def build_prompt(user_message, session_id):
    """Construye el prompt completo con historial"""
    history = get_conversation_history(session_id)
    
    # Construir el contexto con el historial
    context = SYSTEM_PROMPT + "\n\nHistorial de la conversación:\n"
    
    for msg in history[-10:]:  # Últimos 10 mensajes del historial
        if msg["role"] == "user":
            context += f"Usuario: {msg['content']}\n"
        else:
            context += f"Asistente: {msg['content']}\n"
    
    context += f"\nUsuario: {user_message}\nAsistente:"
    
    return context

@app.route('/health', methods=['GET'])
def health_check():
    """Endpoint de salud del servidor"""
    return jsonify({"status": "ok", "service": "MindfulConnect API"})

@app.route('/api/chat', methods=['POST'])
@limiter.limit("30 per minute")
def chat():
    """Endpoint principal para el chat con MindfulConnect"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "No se proporcionaron datos"}), 400
        
        user_message = data.get('message', '').strip()
        session_id = data.get('session_id', 'default')
        
        if not user_message:
            return jsonify({"error": "El mensaje no puede estar vacío"}), 400
        
        logger.info(f"Recibido mensaje de sesión {session_id}: {user_message[:50]}...")
        
        # Añadir mensaje del usuario al historial
        add_to_history(session_id, "user", user_message)
        
        # Construir prompt con historial
        prompt = build_prompt(user_message, session_id)
        
        # Generar respuesta con Gemini
        if model is None:
            return jsonify({
                "error": "La API Key de Gemini no está configurada. Por favor, configura GEMINI_API_KEY en el archivo .env",
                "status": "error",
                "message": "Configura la API Key de Gemini para usar el chat"
            }), 503
        
        try:
            response = model.generate_content(prompt)
            assistant_message = response.text.strip()
            
            # Añadir respuesta del asistente al historial
            add_to_history(session_id, "assistant", assistant_message)
            
            logger.info(f"Respuesta generada para sesión {session_id}")
            
            return jsonify({
                "response": assistant_message,
                "session_id": session_id,
                "status": "success"
            })
            
        except Exception as e:
            logger.error(f"Error al generar respuesta con Gemini: {str(e)}")
            return jsonify({
                "error": f"Error al procesar tu mensaje: {str(e)}. Por favor, intenta de nuevo.",
                "status": "error"
            }), 500
        
    except Exception as e:
        logger.error(f"Error en endpoint /api/chat: {str(e)}")
        return jsonify({
            "error": "Error interno del servidor",
            "status": "error"
        }), 500

@app.route('/api/session/new', methods=['POST'])
def new_session():
    """Crea una nueva sesión de conversación"""
    try:
        session_id = request.json.get('session_id') if request.json else None
        
        if not session_id:
            import uuid
            session_id = str(uuid.uuid4())
        
        # Inicializar historial vacío para la sesión
        conversations[session_id] = []
        
        logger.info(f"Nueva sesión creada: {session_id}")
        
        return jsonify({
            "session_id": session_id,
            "status": "success",
            "message": "Sesión creada exitosamente"
        })
        
    except Exception as e:
        logger.error(f"Error al crear sesión: {str(e)}")
        return jsonify({
            "error": "Error al crear sesión",
            "status": "error"
        }), 500

@app.route('/api/session/<session_id>/clear', methods=['POST'])
def clear_session(session_id):
    """Limpia el historial de una sesión"""
    try:
        if session_id in conversations:
            conversations[session_id] = []
            logger.info(f"Historial limpiado para sesión: {session_id}")
            return jsonify({
                "status": "success",
                "message": "Historial limpiado exitosamente"
            })
        else:
            return jsonify({
                "error": "Sesión no encontrada",
                "status": "error"
            }), 404
            
    except Exception as e:
        logger.error(f"Error al limpiar sesión: {str(e)}")
        return jsonify({
            "error": "Error al limpiar sesión",
            "status": "error"
        }), 500

@app.errorhandler(429)
def ratelimit_handler(e):
    """Maneja errores de rate limiting"""
    return jsonify({
        "error": "Has excedido el límite de solicitudes. Por favor, espera un momento.",
        "status": "rate_limit_exceeded"
    }), 429

if __name__ == '__main__':
    port = int(os.getenv('FLASK_PORT', 5000))
    debug = os.getenv('FLASK_ENV') == 'development'
    app.run(host='0.0.0.0', port=port, debug=debug)


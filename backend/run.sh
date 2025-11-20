#!/bin/bash

# Script para ejecutar el servidor Flask

# Activar entorno virtual si existe
if [ -d "venv" ]; then
    source venv/bin/activate
fi

# Verificar que existe el archivo .env
if [ ! -f ".env" ]; then
    echo "⚠️  Advertencia: No se encontró el archivo .env"
    echo "Por favor, crea un archivo .env con tu GEMINI_API_KEY"
    exit 1
fi

# Ejecutar el servidor
echo "🚀 Iniciando servidor Flask..."
python app.py


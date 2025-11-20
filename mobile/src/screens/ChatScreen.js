import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { TextInput, Button, Text, Card, FAB } from 'react-native-paper';
import { chatService } from '../config/api';
import { theme } from '../theme';

export default function ChatScreen({ route, navigation }) {
  const { sessionId } = route.params || {};
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    // Crear sesión al montar el componente
    if (sessionId) {
      initializeSession();
    }
  }, [sessionId]);

  useEffect(() => {
    // Scroll al final cuando hay nuevos mensajes
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const initializeSession = async () => {
    try {
      await chatService.createSession(sessionId);
      // Mensaje de bienvenida inicial
      setMessages([{
        id: 'welcome',
        text: 'Hola, soy MindfulConnect. Estoy aquí para apoyarte. ¿Cómo te sientes en este momento?',
        sender: 'assistant',
        timestamp: new Date(),
      }]);
    } catch (error) {
      console.error('Error al inicializar sesión:', error);
      const errorMessage = error.message || 'Error desconocido';
      Alert.alert(
        'Error de Conexión',
        `No se pudo conectar con el servidor.\n\n${errorMessage}\n\nVerifica que:\n- El backend esté corriendo\n- Estés en la misma red WiFi\n- La IP del servidor sea correcta`,
        [{ text: 'OK' }]
      );
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim() || loading) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setLoading(true);
    setIsTyping(true);

    try {
      const response = await chatService.sendMessage(userMessage.text, sessionId);
      
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        text: response.response,
        sender: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      const errorMessage = error.message || 'Error desconocido';
      Alert.alert(
        'Error',
        `No se pudo enviar tu mensaje.\n\n${errorMessage}\n\nPor favor, intenta de nuevo.`,
        [{ text: 'OK' }]
      );
      
      // Remover el mensaje del usuario si falló
      setMessages(prev => prev.filter(msg => msg.id !== userMessage.id));
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    Alert.alert(
      'Limpiar conversación',
      '¿Estás seguro de que deseas limpiar toda la conversación?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Limpiar',
          style: 'destructive',
          onPress: async () => {
            try {
              await chatService.clearSession(sessionId);
              setMessages([{
                id: 'welcome',
                text: 'Hola, soy MindfulConnect. Estoy aquí para apoyarte. ¿Cómo te sientes en este momento?',
                sender: 'assistant',
                timestamp: new Date(),
              }]);
            } catch (error) {
              console.error('Error al limpiar sesión:', error);
            }
          },
        },
      ]
    );
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageWrapper,
              message.sender === 'user' ? styles.userMessageWrapper : styles.assistantMessageWrapper,
            ]}
          >
            <Card
              style={[
                styles.messageCard,
                message.sender === 'user' ? styles.userMessage : styles.assistantMessage,
              ]}
            >
              <Card.Content style={styles.messageContent}>
                <Text style={[
                  styles.messageText,
                  message.sender === 'user' ? styles.userMessageText : styles.assistantMessageText,
                ]}>
                  {message.text}
                </Text>
                <Text style={styles.timestamp}>
                  {formatTime(message.timestamp)}
                </Text>
              </Card.Content>
            </Card>
          </View>
        ))}
        
        {isTyping && (
          <View style={styles.typingIndicator}>
            <ActivityIndicator size="small" color={theme.colors.primary} />
            <Text style={styles.typingText}>MindfulConnect está escribiendo...</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          placeholder="Escribe tu mensaje..."
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={500}
          style={styles.input}
          contentStyle={styles.inputContent}
          disabled={loading}
          onSubmitEditing={sendMessage}
        />
        <Button
          mode="contained"
          onPress={sendMessage}
          disabled={!inputText.trim() || loading}
          style={styles.sendButton}
          contentStyle={styles.sendButtonContent}
        >
          Enviar
        </Button>
      </View>

      <FAB
        icon="alert-circle"
        style={styles.emergencyFAB}
        onPress={() => navigation.navigate('Emergency')}
        label="Emergencia"
        color="#fff"
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 20,
  },
  messageWrapper: {
    marginBottom: 12,
    maxWidth: '85%',
  },
  userMessageWrapper: {
    alignSelf: 'flex-end',
  },
  assistantMessageWrapper: {
    alignSelf: 'flex-start',
  },
  messageCard: {
    elevation: 2,
  },
  userMessage: {
    backgroundColor: theme.colors.primary,
    borderRadius: 18,
    borderBottomRightRadius: 4,
  },
  assistantMessage: {
    backgroundColor: theme.colors.surface,
    borderRadius: 18,
    borderBottomLeftRadius: 4,
  },
  messageContent: {
    padding: 12,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: '#fff',
  },
  assistantMessageText: {
    color: theme.colors.text,
  },
  timestamp: {
    fontSize: 10,
    marginTop: 4,
    opacity: 0.6,
    color: theme.colors.placeholder,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginTop: 8,
  },
  typingText: {
    marginLeft: 8,
    fontSize: 14,
    color: theme.colors.placeholder,
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    marginRight: 8,
    maxHeight: 100,
  },
  inputContent: {
    minHeight: 40,
  },
  sendButton: {
    borderRadius: 20,
    justifyContent: 'center',
  },
  sendButtonContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  emergencyFAB: {
    position: 'absolute',
    right: 16,
    bottom: 80,
    backgroundColor: '#E74C3C',
  },
});


import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Card, Paragraph } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

export default function WelcomeScreen({ navigation }) {
  return (
    <LinearGradient
      colors={['#6B73FF', '#9B59B6']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>MindfulConnect</Text>
          <Text style={styles.subtitle}>
            Tu asistente de apoyo emocional
          </Text>

          <Card style={styles.card}>
            <Card.Content>
              <Paragraph style={styles.cardText}>
                MindfulConnect es un asistente de IA diseñado para ofrecerte
                apoyo inmediato y herramientas de regulación emocional.
              </Paragraph>
              <Paragraph style={styles.warningText}>
                ⚠️ Importante: No soy un sustituto de ayuda profesional.
                En caso de emergencia, contacta inmediatamente con recursos
                humanos de crisis.
              </Paragraph>
            </Card.Content>
          </Card>

          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('Chat')}
              style={styles.button}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
            >
              Comenzar
            </Button>

            <Button
              mode="outlined"
              onPress={() => navigation.navigate('Emergency')}
              style={styles.emergencyButton}
              contentStyle={styles.buttonContent}
              labelStyle={styles.emergencyButtonLabel}
              textColor="#fff"
            >
              Recursos de Emergencia
            </Button>
          </View>

          <Card style={styles.infoCard}>
            <Card.Content>
              <Text style={styles.infoTitle}>¿Cómo funciona?</Text>
              <Paragraph style={styles.infoText}>
                • Evalúa tu nivel de angustia (1-10){'\n'}
                • Te ofrece técnicas de regulación emocional{'\n'}
                • Te guía con ejercicios de conexión a tierra{'\n'}
                • Te apoya en momentos difíciles
              </Paragraph>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 40,
    textAlign: 'center',
    opacity: 0.9,
  },
  card: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 16,
    elevation: 4,
  },
  cardText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    textAlign: 'center',
  },
  warningText: {
    fontSize: 14,
    color: '#E74C3C',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
  button: {
    marginBottom: 15,
    borderRadius: 12,
    paddingVertical: 4,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  emergencyButton: {
    marginBottom: 15,
    borderRadius: 12,
    borderColor: '#fff',
    borderWidth: 2,
  },
  emergencyButtonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoCard: {
    width: '100%',
    marginTop: 20,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2C3E50',
  },
  infoText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#34495E',
  },
});


import React from 'react';
import { View, StyleSheet, ScrollView, Linking } from 'react-native';
import { Text, Card, Button, Divider } from 'react-native-paper';
import { theme } from '../theme';

export default function EmergencyScreen() {
  const emergencyResources = [
    {
      title: 'Línea Nacional de Prevención del Suicidio',
      number: '988',
      description: 'Línea de crisis 24/7 disponible en Estados Unidos',
      action: 'call',
    },
    {
      title: 'Emergencias',
      number: '911',
      description: 'Servicios de emergencia',
      action: 'call',
    },
    {
      title: 'Crisis Text Line',
      number: '741741',
      description: 'Envía "HOME" por mensaje de texto',
      action: 'text',
    },
    {
      title: 'Línea de Ayuda en Español',
      number: '1-888-628-9454',
      description: 'Línea de crisis en español',
      action: 'call',
    },
  ];

  const handleCall = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  const handleText = (number) => {
    Linking.openURL(`sms:${number}`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card style={styles.warningCard}>
        <Card.Content>
          <Text style={styles.warningTitle}>⚠️ Importante</Text>
          <Text style={styles.warningText}>
            Si estás experimentando una crisis inmediata o pensamientos de autolesión,
            por favor contacta inmediatamente con un recurso humano de crisis.
            MindfulConnect no puede reemplazar la ayuda profesional.
          </Text>
        </Card.Content>
      </Card>

      <Text style={styles.sectionTitle}>Recursos de Emergencia</Text>

      {emergencyResources.map((resource, index) => (
        <Card key={index} style={styles.resourceCard}>
          <Card.Content>
            <Text style={styles.resourceTitle}>{resource.title}</Text>
            <Text style={styles.resourceDescription}>{resource.description}</Text>
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={() => 
                  resource.action === 'call' 
                    ? handleCall(resource.number) 
                    : handleText(resource.number)
                }
                style={styles.actionButton}
                contentStyle={styles.actionButtonContent}
                labelStyle={styles.actionButtonLabel}
              >
                {resource.action === 'call' ? 'Llamar' : 'Enviar SMS'}
              </Button>
              <Text style={styles.phoneNumber}>{resource.number}</Text>
            </View>
          </Card.Content>
        </Card>
      ))}

      <Divider style={styles.divider} />

      <Card style={styles.infoCard}>
        <Card.Content>
          <Text style={styles.infoTitle}>Recursos Adicionales</Text>
          <Text style={styles.infoText}>
            • Busca un terapeuta o psicólogo en tu área{'\n'}
            • Contacta con tu médico de cabecera{'\n'}
            • Habla con un amigo o familiar de confianza{'\n'}
            • Visita una sala de emergencias si es necesario
          </Text>
        </Card.Content>
      </Card>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Recuerda: No estás solo. Hay personas que pueden ayudarte.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: 16,
  },
  warningCard: {
    backgroundColor: '#FFF3CD',
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
    marginBottom: 24,
  },
  warningTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: 8,
  },
  warningText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#856404',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 16,
  },
  resourceCard: {
    marginBottom: 16,
    elevation: 2,
  },
  resourceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 8,
  },
  resourceDescription: {
    fontSize: 14,
    color: theme.colors.placeholder,
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionButton: {
    borderRadius: 8,
  },
  actionButtonContent: {
    paddingHorizontal: 16,
  },
  actionButtonLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  phoneNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginLeft: 12,
  },
  divider: {
    marginVertical: 24,
  },
  infoCard: {
    backgroundColor: theme.colors.surface,
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 15,
    lineHeight: 24,
    color: theme.colors.text,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: theme.colors.placeholder,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});


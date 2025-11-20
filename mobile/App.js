import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from './src/theme';
import ChatScreen from './src/screens/ChatScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import EmergencyScreen from './src/screens/EmergencyScreen';

const Stack = createStackNavigator();

export default function App() {
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    // Generar o recuperar session ID
    const initializeSession = async () => {
      try {
        let storedSessionId = await AsyncStorage.getItem('sessionId');
        if (!storedSessionId) {
          storedSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          await AsyncStorage.setItem('sessionId', storedSessionId);
        }
        setSessionId(storedSessionId);
      } catch (error) {
        console.error('Error al inicializar sesión:', error);
        setSessionId(`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
      }
    };

    initializeSession();
  }, []);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <StatusBar style="light" />
          <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Welcome" 
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Chat" 
            component={ChatScreen}
            options={{ 
              title: 'MindfulConnect',
              headerRight: () => null
            }}
            initialParams={{ sessionId }}
          />
          <Stack.Screen 
            name="Emergency" 
            component={EmergencyScreen}
            options={{ 
              title: 'Recursos de Emergencia',
              headerStyle: {
                backgroundColor: '#d32f2f',
              }
            }}
          />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}


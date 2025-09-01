import { useFonts } from 'expo-font';

import { Stack } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '../src/context/AuthContext';


export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    // Agrega tus fuentes personalizadas aquí si las necesitas
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Stack initialRouteName="index" screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#0a0a0a', flex: 1 } }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(public)" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
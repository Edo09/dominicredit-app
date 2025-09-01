import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '../../src/context/AuthContext';
import '../globals.css';

export default function PublicLayout() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(auth)/home');
    }
  }, [isAuthenticated, router]);

  return (
    <Stack initialRouteName="login" screenOptions={{ 
      headerShown: false,
      animation: 'default',
      contentStyle: { backgroundColor: '#0a0a0a', flex: 1 },

    }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="forgot-password" />
    </Stack>
  );
}
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';

import { useAuth } from '../../src/context/AuthContext';

export default function PublicLayout() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(auth)/home');
    }
  }, [isAuthenticated]);

  return (
    <Stack screenOptions={{ 
      headerShown: false,
      animation: 'slide_from_right'
    }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="forgot-password" />
    </Stack>
  );
}
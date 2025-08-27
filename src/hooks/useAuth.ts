import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { authService } from '../services/auth.service';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const authenticated = await authService.checkAuth();
      setIsAuthenticated(authenticated);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await authService.login(email, password);
      setIsAuthenticated(true);
      router.replace('/(auth)/home');
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    await authService.logout();
    setIsAuthenticated(false);
    router.replace('/(public)/login');
  };

  return { isAuthenticated, isLoading, login, logout };
};
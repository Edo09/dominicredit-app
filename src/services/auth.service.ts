import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginResponse, RegisterData, User } from '../types/auth.types';
import api from './api';

class AuthService {
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>(
        '/auth/login',
        { email, password },
        false
      );

      if (response.token) {
        await AsyncStorage.setItem('token', response.token);
        await AsyncStorage.setItem('user', JSON.stringify(response.user));
      }

      return response;
    } catch (error) {
      throw error;
    }
  }

  async register(data: RegisterData): Promise<any> {
    return api.post('/auth/register', data, false);
  }

  async logout(): Promise<void> {
    try {
      // Llamar al endpoint de logout si existe
      await api.post('/auth/logout');
    } catch (error) {
      // Ignorar errores del servidor en logout
    } finally {
      // Limpiar almacenamiento local
      await AsyncStorage.multiRemove(['token', 'user']);
    }
  }

  async getCurrentUser(): Promise<User> {
    return api.get<User>('/auth/me');
  }

  async refreshToken(): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/refresh');
    
    if (response.token) {
      await AsyncStorage.setItem('token', response.token);
    }
    
    return response;
  }

  async forgotPassword(email: string): Promise<any> {
    return api.post('/auth/forgot-password', { email }, false);
  }

  async resetPassword(token: string, newPassword: string): Promise<any> {
    return api.post('/auth/reset-password', { token, newPassword }, false);
  }
}

export const authService = new AuthService();
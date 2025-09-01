import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Button from '../../src/components/common/Button';
import Input from '../../src/components/common/Input';
import { useAuth } from '../../src/context/AuthContext';
import { validateEmail, validatePassword } from '../../src/utils/validation';

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    // Resetear errores
    setErrors({});
    
    // Validación
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    
    if (emailError || passwordError) {
      setErrors({
        email: emailError || undefined,
        password: passwordError || undefined,
      });
      return;
    }

    setIsLoading(true);
    console.log(email, password);
    try {
      await login(email, password);
      // La redirección se maneja en el contexto
    } catch (error: any) {
      Alert.alert(
        'Error de inicio de sesión',
        error.message || 'No se pudo iniciar sesión. Por favor, intenta de nuevo.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView className="flex-1 bg-neutral-950">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingVertical: 48 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo/Brand Area */}
        <View className="items-center my-10">
          <View className="bg-orange-600 px-5 py-3 rounded-lg">
            <Text className="text-white text-lg font-bold tracking-wider">DOMINICREDIT</Text>
          </View>
        </View>

        <View className="items-center mb-12">
          <Text className="text-3xl font-bold text-white mb-2 text-center">Bienvenido</Text>
          <Text className="text-base text-neutral-400 text-center">Inicia sesión para continuar</Text>
        </View>

        <View className="w-full">
          <Input
            label="Email"
            labelColor="#A3A3A3"
            value={email}
            onChangeText={setEmail}
            placeholder="correo@ejemplo.com"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
            editable={!isLoading}
            className="mb-4"
          />

          <Input
            label="Contraseña"
            labelColor="#A3A3A3"
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry
            error={errors.password}
            editable={!isLoading}
            className="mb-4"
          />

          <TouchableOpacity className="self-end mb-8 mt-[-8px]" disabled={isLoading}>
            <Link href="/(public)/forgot-password">
              <Text className="text-orange-400 text-sm font-medium">¿Olvidaste tu contraseña?</Text>
            </Link>
          </TouchableOpacity>

          <Button
            title={isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            onPress={handleLogin}
            disabled={isLoading}
            loading={isLoading}
            
          />

          <View className="flex-row justify-center mt-6">
            <Text className="text-neutral-400 text-sm">¿No tienes una cuenta? </Text>
            <Link href="/(public)/register" push>
              <Text className="text-orange-400 text-sm font-semibold">Regístrate</Text>
            </Link>
          </View>
        </View>

        {/* Footer */}
        <View className="mt-auto pt-10 items-center">
          <Text className="text-neutral-500 text-xs italic text-center">
            La institución financiera del pueblo dominicano
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}


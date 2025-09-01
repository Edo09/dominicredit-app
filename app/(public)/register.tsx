import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View
} from 'react-native';
import Button from '../../src/components/common/Button';
import Input from '../../src/components/common/Input';
import { authService } from '../../src/services/auth.service';
import { validateEmail, validateName, validatePassword } from '../../src/utils/validation';

export default function RegisterScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    // Validación
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmError = formData.password !== formData.confirmPassword 
      ? 'Las contraseñas no coinciden' 
      : null;

    if (nameError || emailError || passwordError || confirmError) {
      setErrors({
        name: nameError,
        email: emailError,
        password: passwordError,
        confirmPassword: confirmError,
      });
      return;
    }

    setIsLoading(true);
    try {
      await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      
      Alert.alert(
        'Registro exitoso',
        'Tu cuenta ha sido creada. Por favor, inicia sesión.',
        [{ text: 'OK', onPress: () => router.replace('/(public)/login') }]
      );
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo crear la cuenta');
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: null }));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: '#09090b' }} // bg-neutral-950
    >
      <ScrollView
        contentContainerClassName="flex-grow px-6 py-12 "
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo/Brand Area */}
        <View className="items-center my-8">
          <View className="bg-orange-600 px-5 py-3 rounded-lg">
            <Text className="text-white text-lg font-bold tracking-wider">DOMINICREDIT</Text>
          </View>
        </View>

        <View className="mb-8 items-center">
          <Text className="text-3xl font-bold text-white mb-2 text-center">Crear Cuenta</Text>
          <Text className="text-base text-neutral-400 text-center">Regístrate para comenzar</Text>
        </View>

        <View className="w-full">
          <Input
            label="Nombre completo"
            labelColor='#A3A3A3'
            value={formData.name}
            onChangeText={(value) => updateField('name', value)}
            placeholder="Juan Pérez"
            error={errors.name}
            editable={!isLoading}
            className="mb-4"
          />

          <Input
            label="Email"
            value={formData.email}
            labelColor='#A3A3A3'
            onChangeText={(value) => updateField('email', value)}
            placeholder="correo@ejemplo.com"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
            editable={!isLoading}
            className="mb-4"
          />

          <Input
            label="Contraseña"
            value={formData.password}
            labelColor='#A3A3A3'
            onChangeText={(value) => updateField('password', value)}
            placeholder="Mínimo 8 caracteres"
            secureTextEntry
            error={errors.password}
            editable={!isLoading}
            className="mb-4"
          />

          <Input
            label="Confirmar contraseña"
            labelColor='#A3A3A3'
            value={formData.confirmPassword}
            onChangeText={(value) => updateField('confirmPassword', value)}
            placeholder="Repite tu contraseña"
            secureTextEntry
            error={errors.confirmPassword}
            editable={!isLoading}
            className="mb-4"
          />

          <Button
            title={isLoading ? "Creando cuenta..." : "Crear Cuenta"}
            onPress={handleRegister}
            disabled={isLoading}
            loading={isLoading}
            className="bg-orange-600 rounded-xl py-4 mt-2 mb-6 shadow-lg"
          />

          <View className="flex-row justify-center mt-6">
            <Text className="text-neutral-400 text-sm">¿Ya tienes una cuenta? </Text>
            <Link href="/(public)/login" replace>
              <Text className="text-orange-400 text-sm font-semibold">Inicia sesión</Text>
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
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
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
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Crear Cuenta</Text>
          <Text style={styles.subtitle}>Regístrate para comenzar</Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Nombre completo"
            value={formData.name}
            onChangeText={(value) => updateField('name', value)}
            placeholder="Juan Pérez"
            error={errors.name}
            editable={!isLoading}
          />

          <Input
            label="Email"
            value={formData.email}
            onChangeText={(value) => updateField('email', value)}
            placeholder="correo@ejemplo.com"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
            editable={!isLoading}
          />

          <Input
            label="Contraseña"
            value={formData.password}
            onChangeText={(value) => updateField('password', value)}
            placeholder="Mínimo 8 caracteres"
            secureTextEntry
            error={errors.password}
            editable={!isLoading}
          />

          <Input
            label="Confirmar contraseña"
            value={formData.confirmPassword}
            onChangeText={(value) => updateField('confirmPassword', value)}
            placeholder="Repite tu contraseña"
            secureTextEntry
            error={errors.confirmPassword}
            editable={!isLoading}
          />

          <Button
            title={isLoading ? "Creando cuenta..." : "Crear Cuenta"}
            onPress={handleRegister}
            disabled={isLoading}
            loading={isLoading}
          />

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>¿Ya tienes una cuenta? </Text>
            <Link href="/(public)/login">
              <Text style={styles.loginLink}>Inicia sesión</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  form: {
    width: '100%',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginText: {
    color: '#666',
    fontSize: 14,
  },
  loginLink: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
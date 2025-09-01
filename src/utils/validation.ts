export const validateEmail = (email: string): string | null => {
  if (!email) {
    return 'El email es requerido';
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Email inválido';
  }
  
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) {
    return 'La contraseña es requerida';
  }
  
  if (password.length < 3) {
    return 'La contraseña debe tener al menos 3 caracteres';
  }
  
  // Opcional: validación más estricta
  // if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
  //   return 'La contraseña debe contener mayúsculas, minúsculas y números';
  // }
  
  return null;
};

export const validateName = (name: string): string | null => {
  if (!name) {
    return 'El nombre es requerido';
  }
  
  if (name.length < 2) {
    return 'El nombre debe tener al menos 2 caracteres';
  }
  
  if (name.length > 50) {
    return 'El nombre es demasiado largo';
  }
  
  return null;
};

export const validatePhone = (phone: string): string | null => {
  if (!phone) {
    return 'El teléfono es requerido';
  }
  
  const phoneRegex = /^\+?[1-9]\d{7,14}$/;
  if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
    return 'Teléfono inválido';
  }
  
  return null;
};
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  token: string;
  user: User;
  expiresIn?: number;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthError {
  message: string;
  code?: string;
  field?: string;
}
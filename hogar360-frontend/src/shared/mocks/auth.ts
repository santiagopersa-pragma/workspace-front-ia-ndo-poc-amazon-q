import type { User } from '../interfaces/types';

export const mockUsers: User[] = [
  {
    id: '1',
    nombre: 'Admin',
    apellido: 'Sistema',
    email: 'admin@hogar360.com',
    rol: 'admin'
  },
  {
    id: '2',
    nombre: 'Juan',
    apellido: 'Vendedor',
    email: 'vendedor@hogar360.com',
    rol: 'vendedor'
  },
  {
    id: '3',
    nombre: 'María',
    apellido: 'Compradora',
    email: 'comprador@hogar360.com',
    rol: 'comprador'
  }
];

export const authenticateUser = async (email: string, password: string): Promise<User> => {
  // Simular autenticación
  const user = mockUsers.find(u => u.email === email);
  if (!user || password !== '123456') {
    throw new Error('Credenciales inválidas');
  }
  return user;
};
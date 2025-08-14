import type { User, CreateUserRequest } from '../interfaces/types';
import bcrypt from 'bcryptjs';

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
    apellido: 'Pérez',
    email: 'juan.perez@hogar360.com',
    rol: 'vendedor',
    documentoIdentidad: '12345678',
    celular: '+573001234567',
    fechaNacimiento: '1990-05-15'
  },
  {
    id: '3',
    nombre: 'María',
    apellido: 'García',
    email: 'maria.garcia@hogar360.com',
    rol: 'vendedor',
    documentoIdentidad: '87654321',
    celular: '+573009876543',
    fechaNacimiento: '1985-08-22'
  },
  {
    id: '4',
    nombre: 'Carlos',
    apellido: 'Rodríguez',
    email: 'carlos.rodriguez@hogar360.com',
    rol: 'vendedor',
    documentoIdentidad: '11223344',
    celular: '+573005551234',
    fechaNacimiento: '1992-12-10'
  },
  {
    id: '5',
    nombre: 'Ana',
    apellido: 'Martínez',
    email: 'ana.martinez@hogar360.com',
    rol: 'vendedor',
    documentoIdentidad: '55667788',
    celular: '+573007778899',
    fechaNacimiento: '1988-03-18'
  },
  {
    id: '6',
    nombre: 'Luis',
    apellido: 'González',
    email: 'luis.gonzalez@hogar360.com',
    rol: 'vendedor',
    documentoIdentidad: '99887766',
    celular: '+573002223344',
    fechaNacimiento: '1995-07-05'
  },
  {
    id: '7',
    nombre: 'Carmen',
    apellido: 'López',
    email: 'carmen.lopez@hogar360.com',
    rol: 'vendedor',
    documentoIdentidad: '44556677',
    celular: '+573008889999',
    fechaNacimiento: '1987-11-30'
  }
];

const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[0-9]{1,13}$/;
  return phoneRegex.test(phone) && phone.length <= 13;
};

const validateDocumentId = (documentId: string): boolean => {
  return /^\d+$/.test(documentId);
};

const validateAge = (birthDate: string): boolean => {
  const today = new Date();
  const birth = new Date(birthDate);
  
  // Calcular edad exacta
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age >= 18;
};

export const createVendedor = async (data: CreateUserRequest): Promise<User> => {
  // Validaciones
  if (!validateEmail(data.email)) {
    throw new Error('El formato del email no es válido');
  }

  if (!validatePhone(data.celular)) {
    throw new Error('El teléfono debe contener máximo 13 caracteres y solo números (puede incluir +)');
  }

  if (!validateDocumentId(data.documentoIdentidad)) {
    throw new Error('El documento de identidad debe ser únicamente numérico');
  }

  if (!validateAge(data.fechaNacimiento)) {
    throw new Error('El usuario debe ser mayor de edad');
  }

  // Verificar email único
  const emailExists = mockUsers.some(user => user.email.toLowerCase() === data.email.toLowerCase());
  if (emailExists) {
    throw new Error('El email ya está registrado');
  }

  // Verificar documento único
  const docExists = mockUsers.some(user => user.documentoIdentidad === data.documentoIdentidad);
  if (docExists) {
    throw new Error('El documento de identidad ya está registrado');
  }

  const newUser: User = {
    id: Date.now().toString(),
    nombre: data.nombre,
    apellido: data.apellido,
    email: data.email,
    rol: 'vendedor',
    documentoIdentidad: data.documentoIdentidad,
    celular: data.celular,
    fechaNacimiento: data.fechaNacimiento
  };

  // Encriptar contraseña con bcrypt
  const hashedPassword = await hashPassword(data.clave);
  console.log(`Contraseña encriptada para ${data.email}: ${hashedPassword}`);

  mockUsers.push(newUser);
  return newUser;
};

export const getVendedores = async (page: number = 1, limit: number = 10) => {
  const vendedores = mockUsers.filter(user => user.rol === 'vendedor');
  const totalItems = vendedores.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const paginatedVendedores = vendedores.slice(startIndex, startIndex + limit);

  return {
    data: paginatedVendedores,
    totalItems,
    totalPages,
    currentPage: page
  };
};

export const deleteVendedor = async (id: string): Promise<void> => {
  const index = mockUsers.findIndex(user => user.id === id && user.rol === 'vendedor');
  if (index === -1) {
    throw new Error('Vendedor no encontrado');
  }
  mockUsers.splice(index, 1);
};
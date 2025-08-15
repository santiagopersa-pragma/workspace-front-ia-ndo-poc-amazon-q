import type { Casa, CreateCasaRequest } from '../interfaces/types';
import { mockCategories } from './categories';
import { mockCities } from './cities';
import { mockDepartments } from './departments';
import { mockUsers } from './users';

export const mockCasas: Casa[] = [
  {
    id: '1',
    nombre: 'Casa Moderna en Bogotá',
    descripcion: 'Hermosa casa moderna con acabados de lujo en el norte de Bogotá',
    categoriaId: '1',
    cantidadCuartos: 3,
    cantidadBanos: 2,
    precio: 450000000,
    ciudadId: '1',
    fechaPublicacionActiva: '2024-01-15',
    estadoPublicacion: 'PUBLICADA',
    fechaPublicacion: '2024-01-10',
    vendedorId: '2'
  }
];

const validatePublicationDate = (fechaPublicacionActiva: string): boolean => {
  const today = new Date();
  const publicationDate = new Date(fechaPublicacionActiva);
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 1);
  
  return publicationDate >= today && publicationDate <= maxDate;
};

export const createCasa = async (data: CreateCasaRequest, vendedorId: string): Promise<Casa> => {
  // Validar categoría existe
  const categoria = mockCategories.find(cat => cat.id === data.categoriaId);
  if (!categoria) {
    throw new Error('Categoría no encontrada');
  }

  // Validar ciudad existe
  const ciudad = mockCities.find(city => city.id === data.ciudadId);
  if (!ciudad) {
    throw new Error('Ciudad no encontrada');
  }

  // Validar fecha de publicación activa
  if (!validatePublicationDate(data.fechaPublicacionActiva)) {
    throw new Error('La fecha de publicación activa no puede exceder un mes de la fecha actual');
  }

  // Validar campos numéricos
  if (data.cantidadCuartos < 1 || data.cantidadBanos < 1) {
    throw new Error('La cantidad de cuartos y baños debe ser mayor a 0');
  }

  if (data.precio <= 0) {
    throw new Error('El precio debe ser mayor a 0');
  }

  const newCasa: Casa = {
    id: Date.now().toString(),
    nombre: data.nombre,
    descripcion: data.descripcion,
    categoriaId: data.categoriaId,
    cantidadCuartos: data.cantidadCuartos,
    cantidadBanos: data.cantidadBanos,
    precio: data.precio,
    ciudadId: data.ciudadId,
    fechaPublicacionActiva: data.fechaPublicacionActiva,
    estadoPublicacion: 'PUBLICADA',
    fechaPublicacion: new Date().toISOString().split('T')[0],
    vendedorId
  };

  mockCasas.push(newCasa);
  return newCasa;
};

export const getCasasWithDetails = async (page: number = 1, limit: number = 10) => {
  const casasWithDetails = mockCasas.map(casa => ({
    ...casa,
    categoria: mockCategories.find(cat => cat.id === casa.categoriaId),
    ciudad: mockCities.find(city => city.id === casa.ciudadId),
    vendedor: mockUsers.find(user => user.id === casa.vendedorId)
  })).map(casa => ({
    ...casa,
    ciudad: casa.ciudad ? {
      ...casa.ciudad,
      departamento: mockDepartments.find(dept => dept.id === casa.ciudad?.departamentoId)
    } : undefined
  }));

  const totalItems = casasWithDetails.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const paginatedCasas = casasWithDetails.slice(startIndex, startIndex + limit);

  return {
    data: paginatedCasas,
    totalItems,
    totalPages,
    currentPage: page
  };
};

export const getCasasByVendedor = async (vendedorId: string, page: number = 1, limit: number = 10) => {
  const vendedorCasas = mockCasas.filter(casa => casa.vendedorId === vendedorId);
  
  const casasWithDetails = vendedorCasas.map(casa => ({
    ...casa,
    categoria: mockCategories.find(cat => cat.id === casa.categoriaId),
    ciudad: mockCities.find(city => city.id === casa.ciudadId),
    vendedor: mockUsers.find(user => user.id === casa.vendedorId)
  })).map(casa => ({
    ...casa,
    ciudad: casa.ciudad ? {
      ...casa.ciudad,
      departamento: mockDepartments.find(dept => dept.id === casa.ciudad?.departamentoId)
    } : undefined
  }));

  const totalItems = casasWithDetails.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const paginatedCasas = casasWithDetails.slice(startIndex, startIndex + limit);

  return {
    data: paginatedCasas,
    totalItems,
    totalPages,
    currentPage: page
  };
};

export const deleteCasa = async (id: string, vendedorId: string): Promise<void> => {
  const index = mockCasas.findIndex(casa => casa.id === id && casa.vendedorId === vendedorId);
  if (index === -1) {
    throw new Error('Casa no encontrada o no tienes permisos para eliminarla');
  }
  mockCasas.splice(index, 1);
};
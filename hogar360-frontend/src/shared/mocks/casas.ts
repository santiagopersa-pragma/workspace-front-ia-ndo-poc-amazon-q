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
  },
  {
    id: '2',
    nombre: 'Apartamento Ejecutivo Medellín',
    descripcion: 'Apartamento ejecutivo en el Poblado con vista panorámica',
    categoriaId: '2',
    cantidadCuartos: 2,
    cantidadBanos: 2,
    precio: 320000000,
    ciudadId: '3',
    fechaPublicacionActiva: '2024-01-20',
    estadoPublicacion: 'PUBLICADA',
    fechaPublicacion: '2024-01-18',
    vendedorId: '3'
  },
  {
    id: '3',
    nombre: 'Casa Familiar Cali',
    descripcion: 'Casa familiar de 4 habitaciones en sector residencial',
    categoriaId: '1',
    cantidadCuartos: 4,
    cantidadBanos: 3,
    precio: 380000000,
    ciudadId: '5',
    fechaPublicacionActiva: '2024-01-12',
    estadoPublicacion: 'PUBLICADA',
    fechaPublicacion: '2024-01-08',
    vendedorId: '4'
  },
  {
    id: '4',
    nombre: 'Penthouse Soacha',
    descripcion: 'Penthouse de lujo con terraza privada',
    categoriaId: '3',
    cantidadCuartos: 3,
    cantidadBanos: 3,
    precio: 520000000,
    ciudadId: '2',
    fechaPublicacionActiva: '2024-01-25',
    estadoPublicacion: 'PUBLICADA',
    fechaPublicacion: '2024-01-22',
    vendedorId: '5'
  },
  {
    id: '5',
    nombre: 'Casa Económica Envigado',
    descripcion: 'Casa económica ideal para familia joven',
    categoriaId: '2',
    cantidadCuartos: 2,
    cantidadBanos: 1,
    precio: 180000000,
    ciudadId: '4',
    fechaPublicacionActiva: '2024-01-18',
    estadoPublicacion: 'PUBLICADA',
    fechaPublicacion: '2024-01-15',
    vendedorId: '6'
  },
  {
    id: '6',
    nombre: 'Villa de Lujo Palmira',
    descripcion: 'Villa de lujo con piscina y jardín amplio',
    categoriaId: '3',
    cantidadCuartos: 5,
    cantidadBanos: 4,
    precio: 680000000,
    ciudadId: '6',
    fechaPublicacionActiva: '2024-01-30',
    estadoPublicacion: 'PUBLICADA',
    fechaPublicacion: '2024-01-28',
    vendedorId: '7'
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

export interface SearchCasasParams {
  sortBy?: 'ubicacion' | 'categoria' | 'cuartos' | 'banos' | 'precio';
  sortOrder?: 'asc' | 'desc';
  precioMin?: number;
  precioMax?: number;
  categoriaId?: string;
  ciudadId?: string;
  page?: number;
  limit?: number;
}

export const searchCasas = async (params: SearchCasasParams = {}) => {
  const {
    sortBy = 'precio',
    sortOrder = 'asc',
    precioMin,
    precioMax,
    categoriaId,
    ciudadId,
    page = 1,
    limit = 10
  } = params;

  const today = new Date().toISOString().split('T')[0];
  
  // Filtrar casas activas (fecha de publicación <= hoy)
  let filteredCasas = mockCasas.filter(casa => casa.fechaPublicacionActiva <= today);

  // Aplicar filtros
  if (precioMin !== undefined) {
    filteredCasas = filteredCasas.filter(casa => casa.precio >= precioMin);
  }
  if (precioMax !== undefined) {
    filteredCasas = filteredCasas.filter(casa => casa.precio <= precioMax);
  }
  if (categoriaId) {
    filteredCasas = filteredCasas.filter(casa => casa.categoriaId === categoriaId);
  }
  if (ciudadId) {
    filteredCasas = filteredCasas.filter(casa => casa.ciudadId === ciudadId);
  }

  // Agregar detalles relacionados
  const casasWithDetails = filteredCasas.map(casa => ({
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

  // Ordenar
  casasWithDetails.sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'ubicacion':
        const locationA = `${a.ciudad?.nombre}, ${a.ciudad?.departamento?.nombre}`;
        const locationB = `${b.ciudad?.nombre}, ${b.ciudad?.departamento?.nombre}`;
        comparison = locationA.localeCompare(locationB);
        break;
      case 'categoria':
        comparison = (a.categoria?.nombre || '').localeCompare(b.categoria?.nombre || '');
        break;
      case 'cuartos':
        comparison = a.cantidadCuartos - b.cantidadCuartos;
        break;
      case 'banos':
        comparison = a.cantidadBanos - b.cantidadBanos;
        break;
      case 'precio':
        comparison = a.precio - b.precio;
        break;
    }
    
    return sortOrder === 'desc' ? -comparison : comparison;
  });

  // Paginar
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

export const getCasasWithDetails = async (page: number = 1, limit: number = 10) => {
  return searchCasas({ page, limit });
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
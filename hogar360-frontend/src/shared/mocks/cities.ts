import type { City } from '../interfaces/types';
import { mockDepartments } from './departments';

export const mockCities: City[] = [
  {
    id: '1',
    nombre: 'Bogotá',
    descripcion: 'Capital de Colombia, centro económico y político del país',
    departamentoId: '1'
  },
  {
    id: '2',
    nombre: 'Soacha',
    descripcion: 'Ciudad conurbada con Bogotá, importante centro urbano',
    departamentoId: '1'
  },
  {
    id: '3',
    nombre: 'Medellín',
    descripcion: 'Ciudad de la eterna primavera, centro industrial del país',
    departamentoId: '2'
  },
  {
    id: '4',
    nombre: 'Envigado',
    descripcion: 'Ciudad del área metropolitana de Medellín',
    departamentoId: '2'
  },
  {
    id: '5',
    nombre: 'Cali',
    descripcion: 'Capital mundial de la salsa, centro económico del suroccidente',
    departamentoId: '3'
  },
  {
    id: '6',
    nombre: 'Palmira',
    descripcion: 'Ciudad industrial del Valle del Cauca',
    departamentoId: '3'
  }
];

export const createCity = async (data: { nombre: string; descripcion: string; departamentoId: string }): Promise<City> => {
  const department = mockDepartments.find(dept => dept.id === data.departamentoId);
  if (!department) {
    throw new Error('Departamento no encontrado');
  }

  const newCity: City = {
    id: Date.now().toString(),
    nombre: data.nombre,
    descripcion: data.descripcion,
    departamentoId: data.departamentoId
  };

  mockCities.push(newCity);
  return newCity;
};

export const deleteCity = async (id: string): Promise<void> => {
  const index = mockCities.findIndex(city => city.id === id);
  if (index === -1) {
    throw new Error('Ciudad no encontrada');
  }
  mockCities.splice(index, 1);
};

export const getCitiesWithDepartments = async () => {
  return mockCities.map(city => ({
    ...city,
    departamento: mockDepartments.find(dept => dept.id === city.departamentoId)
  })).sort((a, b) => a.nombre.localeCompare(b.nombre));
};

export interface SearchCitiesParams {
  query?: string;
  sortBy?: 'city' | 'department';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface SearchCitiesResponse {
  data: (City & { departamento?: { id: string; nombre: string; descripcion: string } })[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export const searchCities = async (params: SearchCitiesParams = {}): Promise<SearchCitiesResponse> => {
  const {
    query = '',
    sortBy = 'city',
    sortOrder = 'asc',
    page = 1,
    limit = 10
  } = params;

  const normalizeText = (text: string) => 
    text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
  const normalizedQuery = normalizeText(query);
  
  let citiesWithDepartments = mockCities.map(city => ({
    ...city,
    departamento: mockDepartments.find(dept => dept.id === city.departamentoId)
  }));
  
  // Filter by query
  if (query) {
    citiesWithDepartments = citiesWithDepartments.filter(city => 
      normalizeText(city.nombre).includes(normalizedQuery) ||
      normalizeText(city.departamento?.nombre || '').includes(normalizedQuery)
    );
  }
  
  // Sort
  citiesWithDepartments.sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === 'city') {
      comparison = a.nombre.localeCompare(b.nombre);
    } else if (sortBy === 'department') {
      comparison = (a.departamento?.nombre || '').localeCompare(b.departamento?.nombre || '');
    }
    
    return sortOrder === 'desc' ? -comparison : comparison;
  });
  
  // Paginate
  const totalItems = citiesWithDepartments.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const paginatedCities = citiesWithDepartments.slice(startIndex, startIndex + limit);
  
  return {
    data: paginatedCities,
    totalItems,
    totalPages,
    currentPage: page
  };
};

// Mantener compatibilidad con la función anterior
export const searchCitiesSimple = async (query: string = '') => {
  const result = await searchCities({ query });
  return result.data;
};
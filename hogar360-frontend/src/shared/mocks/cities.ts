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
    nombre: 'Medellín',
    descripcion: 'Ciudad de la eterna primavera, centro industrial del país',
    departamentoId: '2'
  },
  {
    id: '3',
    nombre: 'Cali',
    descripcion: 'Capital mundial de la salsa, centro económico del suroccidente',
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

export const searchCities = async (query: string = '') => {
  const normalizeText = (text: string) => 
    text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
  const normalizedQuery = normalizeText(query);
  
  const citiesWithDepartments = await getCitiesWithDepartments();
  
  if (!query) return citiesWithDepartments;
  
  return citiesWithDepartments.filter(city => 
    normalizeText(city.nombre).includes(normalizedQuery) ||
    normalizeText(city.departamento?.nombre || '').includes(normalizedQuery)
  );
};
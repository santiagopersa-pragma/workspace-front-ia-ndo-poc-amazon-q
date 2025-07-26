import type { Location } from '../interfaces/types';

export const mockLocations: Location[] = [
  {
    id: '1',
    ciudad: 'Bogotá',
    departamento: 'Cundinamarca',
    descripcionCiudad: 'Capital de Colombia, centro económico y político del país',
    descripcionDepartamento: 'Departamento central de Colombia, región andina'
  },
  {
    id: '2',
    ciudad: 'Medellín',
    departamento: 'Antioquia',
    descripcionCiudad: 'Ciudad de la eterna primavera, centro industrial del país',
    descripcionDepartamento: 'Departamento del noroeste colombiano, región paisa'
  },
  {
    id: '3',
    ciudad: 'Cali',
    departamento: 'Valle del Cauca',
    descripcionCiudad: 'Capital mundial de la salsa, centro económico del suroccidente',
    descripcionDepartamento: 'Departamento del suroccidente colombiano, valle geográfico del río Cauca'
  }
];

export const createLocation = async (data: { ciudad: string; departamento: string; descripcionCiudad: string; descripcionDepartamento: string }): Promise<Location> => {
  const departmentExists = mockLocations.some(loc => 
    loc.departamento.toLowerCase() === data.departamento.toLowerCase()
  );
  
  if (departmentExists) {
    throw new Error('El nombre del departamento ya existe');
  }

  const newLocation: Location = {
    id: Date.now().toString(),
    ciudad: data.ciudad,
    departamento: data.departamento,
    descripcionCiudad: data.descripcionCiudad,
    descripcionDepartamento: data.descripcionDepartamento
  };

  mockLocations.push(newLocation);
  return newLocation;
};

export const searchLocations = async (query: string, page: number = 1, limit: number = 10, sortOrder: 'asc' | 'desc' = 'asc') => {
  const normalizeText = (text: string) => 
    text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
  const normalizedQuery = normalizeText(query);
  
  const filteredLocations = mockLocations.filter(location => 
    normalizeText(location.ciudad).includes(normalizedQuery) ||
    normalizeText(location.departamento).includes(normalizedQuery)
  );

  const sortedLocations = filteredLocations.sort((a, b) => {
    const comparison = a.ciudad.localeCompare(b.ciudad) || a.departamento.localeCompare(b.departamento);
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedLocations = sortedLocations.slice(startIndex, endIndex);
  
  return {
    data: paginatedLocations,
    total: sortedLocations.length,
    page,
    limit,
    totalPages: Math.ceil(sortedLocations.length / limit)
  };
};
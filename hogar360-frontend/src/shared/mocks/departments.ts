import type { Department } from '../interfaces/types';

export const mockDepartments: Department[] = [
  {
    id: '1',
    nombre: 'Cundinamarca',
    descripcion: 'Departamento central de Colombia, región andina'
  },
  {
    id: '2',
    nombre: 'Antioquia',
    descripcion: 'Departamento del noroeste colombiano, región paisa'
  },
  {
    id: '3',
    nombre: 'Valle del Cauca',
    descripcion: 'Departamento del suroccidente colombiano, valle geográfico del río Cauca'
  }
];

export const createDepartment = async (data: { nombre: string; descripcion: string }): Promise<Department> => {
  const exists = mockDepartments.some(dept => dept.nombre.toLowerCase() === data.nombre.toLowerCase());
  if (exists) {
    throw new Error('El nombre del departamento ya existe');
  }

  const newDepartment: Department = {
    id: Date.now().toString(),
    nombre: data.nombre,
    descripcion: data.descripcion
  };

  mockDepartments.push(newDepartment);
  return newDepartment;
};

export const getDepartments = async () => {
  return mockDepartments.sort((a, b) => a.nombre.localeCompare(b.nombre));
};

export const deleteDepartment = async (id: string): Promise<void> => {
  const index = mockDepartments.findIndex(dept => dept.id === id);
  if (index === -1) {
    throw new Error('Departamento no encontrado');
  }
  mockDepartments.splice(index, 1);
};
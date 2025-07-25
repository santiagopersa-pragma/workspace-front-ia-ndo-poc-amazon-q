import type { Category } from '../interfaces/types';

export const mockCategories: Category[] = [
  {
    id: '1',
    nombre: 'Casa',
    descripcion: 'Viviendas unifamiliares con jardín y espacios amplios'
  },
  {
    id: '2',
    nombre: 'Apartamento',
    descripcion: 'Unidades residenciales en edificios con servicios comunes'
  },
  {
    id: '3',
    nombre: 'Local Comercial',
    descripcion: 'Espacios destinados para actividades comerciales y negocios'
  }
];

export const createCategory = async (data: { nombre: string; descripcion: string }): Promise<Category> => {
  // Simular validación de nombre único
  const exists = mockCategories.some(cat => cat.nombre.toLowerCase() === data.nombre.toLowerCase());
  if (exists) {
    throw new Error('El nombre de la categoría ya existe');
  }

  const newCategory: Category = {
    id: Date.now().toString(),
    nombre: data.nombre,
    descripcion: data.descripcion
  };

  mockCategories.push(newCategory);
  return newCategory;
};
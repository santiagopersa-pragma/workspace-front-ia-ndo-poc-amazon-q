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

export const getCategories = async (page: number = 1, limit: number = 10) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedCategories = mockCategories.slice(startIndex, endIndex);
  
  return {
    data: paginatedCategories,
    total: mockCategories.length,
    page,
    limit,
    totalPages: Math.ceil(mockCategories.length / limit)
  };
};

export const deleteCategory = async (id: string): Promise<void> => {
  const index = mockCategories.findIndex(cat => cat.id === id);
  if (index === -1) {
    throw new Error('Categoría no encontrada');
  }
  mockCategories.splice(index, 1);
};
import { useState } from 'react';
import { CategoryForm } from '../../molecules/CategoryForm';
import { createCategory } from '../../../shared/mocks/categories';
import type { CreateCategoryRequest, Category } from '../../../shared/interfaces/types';

export const CategoryManager = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleCreateCategory = async (data: CreateCategoryRequest) => {
    setLoading(true);
    setMessage(null);

    try {
      const newCategory: Category = await createCategory(data);
      setMessage({
        type: 'success',
        text: `Categoría "${newCategory.nombre}" creada exitosamente`
      });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Error al crear la categoría'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg border border-border">
      <h2 className="text-2xl font-poppins font-medium text-gray-900 mb-6">Crear Categoría</h2>
      
      {message && (
        <div className={`mb-4 p-3 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message.text}
        </div>
      )}

      <CategoryForm onSubmit={handleCreateCategory} loading={loading} />
    </div>
  );
};
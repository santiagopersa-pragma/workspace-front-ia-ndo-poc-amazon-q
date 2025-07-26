import { useState } from 'react';
import { CategoryForm } from '../../molecules/CategoryForm';
import { createCategory } from '../../../shared/mocks/categories';
import type { CreateCategoryRequest, Category } from '../../../shared/interfaces/types';

interface CategoryManagerProps {
  onCategoryCreated?: () => void;
}

export const CategoryManager = ({ onCategoryCreated }: CategoryManagerProps) => {
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
      onCategoryCreated?.();
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
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg border border-border">
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
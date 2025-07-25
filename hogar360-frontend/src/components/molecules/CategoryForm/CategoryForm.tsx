import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';
import type { CreateCategoryRequest } from '../../../shared/interfaces/types';

const categorySchema = z.object({
  nombre: z.string()
    .min(1, 'El nombre es requerido')
    .max(50, 'El nombre no puede exceder 50 caracteres'),
  descripcion: z.string()
    .min(1, 'La descripción es requerida')
    .max(90, 'La descripción no puede exceder 90 caracteres')
});

interface CategoryFormProps {
  onSubmit: (data: CreateCategoryRequest) => Promise<void>;
  loading?: boolean;
}

export const CategoryForm = ({ onSubmit, loading = false }: CategoryFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<CreateCategoryRequest>({
    resolver: zodResolver(categorySchema)
  });

  const handleFormSubmit = async (data: CreateCategoryRequest) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error('Error al crear categoría:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <Input
        label="Nombre de la categoría"
        placeholder="Ej: Casa, Apartamento, Local Comercial"
        {...register('nombre')}
        error={errors.nombre?.message}
      />
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descripción
        </label>
        <textarea
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm ${
            errors.descripcion ? 'border-red-500' : 'border-border'
          }`}
          rows={3}
          placeholder="Describe las características de esta categoría"
          {...register('descripcion')}
        />
        {errors.descripcion && (
          <p className="mt-1 text-sm text-red-600">{errors.descripcion.message}</p>
        )}
      </div>

      <Button type="submit" loading={loading} className="w-full">
        Crear Categoría
      </Button>
    </form>
  );
};
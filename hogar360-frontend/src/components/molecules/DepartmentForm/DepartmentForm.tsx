import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';
import type { CreateDepartmentRequest } from '../../../shared/interfaces/types';

const departmentSchema = z.object({
  nombre: z.string()
    .trim()
    .min(1, 'El nombre del departamento es requerido')
    .max(50, 'El nombre del departamento no puede exceder 50 caracteres'),
  descripcion: z.string()
    .trim()
    .min(1, 'La descripción del departamento es requerida')
    .max(120, 'La descripción del departamento no puede exceder 120 caracteres')
});

interface DepartmentFormProps {
  onSubmit: (data: CreateDepartmentRequest) => Promise<void>;
  loading?: boolean;
}

export const DepartmentForm = ({ onSubmit, loading = false }: DepartmentFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm<CreateDepartmentRequest>({
    resolver: zodResolver(departmentSchema)
  });

  const descripcionValue = useWatch({ control, name: 'descripcion', defaultValue: '' });

  const handleFormSubmit = async (data: CreateDepartmentRequest) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error('Error al crear departamento:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <Input
        label="Nombre del departamento *"
        placeholder="Ej: Cundinamarca, Antioquia, Valle del Cauca"
        {...register('nombre')}
        error={errors.nombre?.message}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descripción del departamento *
        </label>
        <div className="relative">
          <textarea
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm ${
              errors.descripcion ? 'border-red-500' : 'border-border'
            }`}
            rows={3}
            placeholder="Describe las características principales del departamento"
            {...register('descripcion')}
          />
          <div className="absolute bottom-2 right-2 text-xs text-gray-500">
            {descripcionValue?.length || 0}/120
          </div>
        </div>
        {errors.descripcion && (
          <p className="mt-1 text-sm text-red-600">{errors.descripcion.message}</p>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit" loading={loading}>
          Crear Departamento
        </Button>
      </div>
    </form>
  );
};
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';
import type { CreateLocationRequest } from '../../../shared/interfaces/types';

const locationSchema = z.object({
  ciudad: z.string()
    .trim()
    .min(1, 'El nombre de la ciudad es requerido')
    .max(50, 'El nombre de la ciudad no puede exceder 50 caracteres'),
  departamento: z.string()
    .trim()
    .min(1, 'El nombre del departamento es requerido')
    .max(50, 'El nombre del departamento no puede exceder 50 caracteres'),
  descripcionCiudad: z.string()
    .trim()
    .min(1, 'La descripción de la ciudad es requerida')
    .max(120, 'La descripción de la ciudad no puede exceder 120 caracteres'),
  descripcionDepartamento: z.string()
    .trim()
    .min(1, 'La descripción del departamento es requerida')
    .max(120, 'La descripción del departamento no puede exceder 120 caracteres')
});

interface LocationFormProps {
  onSubmit: (data: CreateLocationRequest) => Promise<void>;
  loading?: boolean;
}

export const LocationForm = ({ onSubmit, loading = false }: LocationFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm<CreateLocationRequest>({
    resolver: zodResolver(locationSchema)
  });

  const descripcionCiudadValue = useWatch({ control, name: 'descripcionCiudad', defaultValue: '' });
  const descripcionDepartamentoValue = useWatch({ control, name: 'descripcionDepartamento', defaultValue: '' });

  const handleFormSubmit = async (data: CreateLocationRequest) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error('Error al crear ubicación:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nombre de la ciudad *"
          placeholder="Ej: Bogotá, Medellín, Cali"
          {...register('ciudad')}
          error={errors.ciudad?.message}
        />
        
        <Input
          label="Nombre del departamento *"
          placeholder="Ej: Cundinamarca, Antioquia, Valle del Cauca"
          {...register('departamento')}
          error={errors.departamento?.message}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descripción de la ciudad *
        </label>
        <div className="relative">
          <textarea
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm ${
              errors.descripcionCiudad ? 'border-red-500' : 'border-border'
            }`}
            rows={3}
            placeholder="Describe las características principales de la ciudad"
            {...register('descripcionCiudad')}
          />
          <div className="absolute bottom-2 right-2 text-xs text-gray-500">
            {descripcionCiudadValue?.length || 0}/120
          </div>
        </div>
        {errors.descripcionCiudad && (
          <p className="mt-1 text-sm text-red-600">{errors.descripcionCiudad.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descripción del departamento *
        </label>
        <div className="relative">
          <textarea
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm ${
              errors.descripcionDepartamento ? 'border-red-500' : 'border-border'
            }`}
            rows={3}
            placeholder="Describe las características principales del departamento"
            {...register('descripcionDepartamento')}
          />
          <div className="absolute bottom-2 right-2 text-xs text-gray-500">
            {descripcionDepartamentoValue?.length || 0}/120
          </div>
        </div>
        {errors.descripcionDepartamento && (
          <p className="mt-1 text-sm text-red-600">{errors.descripcionDepartamento.message}</p>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit" loading={loading}>
          Crear Ubicación
        </Button>
      </div>
    </form>
  );
};
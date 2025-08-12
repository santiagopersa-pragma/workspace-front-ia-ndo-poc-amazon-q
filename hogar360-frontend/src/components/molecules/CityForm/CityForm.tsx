import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, useEffect } from 'react';
import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';
import { getDepartments } from '../../../shared/mocks/departments';
import type { CreateCityRequest, Department } from '../../../shared/interfaces/types';

const citySchema = z.object({
  nombre: z.string()
    .trim()
    .min(1, 'El nombre de la ciudad es requerido')
    .max(50, 'El nombre de la ciudad no puede exceder 50 caracteres'),
  descripcion: z.string()
    .trim()
    .min(1, 'La descripción de la ciudad es requerida')
    .max(120, 'La descripción de la ciudad no puede exceder 120 caracteres'),
  departamentoId: z.string()
    .min(1, 'Debe seleccionar un departamento')
});

interface CityFormProps {
  onSubmit: (data: CreateCityRequest) => Promise<void>;
  loading?: boolean;
}

export const CityForm = ({ onSubmit, loading = false }: CityFormProps) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm<CreateCityRequest>({
    resolver: zodResolver(citySchema)
  });

  const descripcionValue = useWatch({ control, name: 'descripcion', defaultValue: '' });

  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const depts = await getDepartments();
        setDepartments(depts);
      } catch (error) {
        console.error('Error al cargar departamentos:', error);
      }
    };
    loadDepartments();
  }, []);

  const handleFormSubmit = async (data: CreateCityRequest) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error('Error al crear ciudad:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <Input
        label="Nombre de la ciudad *"
        placeholder="Ej: Bogotá, Medellín, Cali"
        {...register('nombre')}
        error={errors.nombre?.message}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Departamento *
        </label>
        <select
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm ${
            errors.departamentoId ? 'border-red-500' : 'border-border'
          }`}
          {...register('departamentoId')}
        >
          <option value="">Seleccione un departamento</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.nombre}
            </option>
          ))}
        </select>
        {errors.departamentoId && (
          <p className="mt-1 text-sm text-red-600">{errors.departamentoId.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descripción de la ciudad *
        </label>
        <div className="relative">
          <textarea
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm ${
              errors.descripcion ? 'border-red-500' : 'border-border'
            }`}
            rows={3}
            placeholder="Describe las características principales de la ciudad"
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
          Crear Ciudad
        </Button>
      </div>
    </form>
  );
};
import { useState, useEffect } from 'react';
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button';
import { getCasasByVendedor } from '../../../shared/mocks/casas';
import type { CreateHorarioVisitaRequest } from '../../../shared/interfaces/types';

interface HorarioFormProps {
  onSubmit: (data: CreateHorarioVisitaRequest) => void;
  loading?: boolean;
  vendedorId: string;
}

export const HorarioForm = ({ onSubmit, loading = false, vendedorId }: HorarioFormProps) => {
  const [formData, setFormData] = useState<CreateHorarioVisitaRequest>({
    casaId: '',
    fechaHoraInicio: '',
    fechaHoraFin: ''
  });

  const [casas, setCasas] = useState<any[]>([]);

  useEffect(() => {
    loadCasas();
  }, []);

  const loadCasas = async () => {
    try {
      const response = await getCasasByVendedor(vendedorId, 1, 100);
      setCasas(response.data);
    } catch (error) {
      console.error('Error al cargar casas:', error);
    }
  };

  const getMinDateTime = () => {
    return new Date().toISOString().slice(0, 16);
  };

  const getMaxDateTime = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 21);
    return maxDate.toISOString().slice(0, 16);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (new Date(formData.fechaHoraFin) <= new Date(formData.fechaHoraInicio)) {
      alert('La fecha de fin debe ser posterior a la fecha de inicio');
      return;
    }
    
    onSubmit(formData);
    setFormData({
      casaId: '',
      fechaHoraInicio: '',
      fechaHoraFin: ''
    });
  };

  const handleChange = (field: keyof CreateHorarioVisitaRequest) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Casa
        </label>
        <select
          value={formData.casaId}
          onChange={handleChange('casaId')}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="">Seleccionar casa</option>
          {casas.map(casa => (
            <option key={casa.id} value={casa.id}>
              {casa.nombre} - {casa.ciudad?.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Fecha y Hora de Inicio"
          type="datetime-local"
          value={formData.fechaHoraInicio}
          onChange={handleChange('fechaHoraInicio')}
          required
          min={getMinDateTime()}
          max={getMaxDateTime()}
        />
        <Input
          label="Fecha y Hora de Fin"
          type="datetime-local"
          value={formData.fechaHoraFin}
          onChange={handleChange('fechaHoraFin')}
          required
          min={formData.fechaHoraInicio || getMinDateTime()}
          max={getMaxDateTime()}
        />
      </div>

      <Button
        type="submit"
        loading={loading}
        className="w-full md:w-auto"
      >
        Crear Horario
      </Button>
    </form>
  );
};
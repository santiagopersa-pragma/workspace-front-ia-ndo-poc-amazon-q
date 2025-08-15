import { useState, useEffect } from 'react';
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button';
import { getCategories } from '../../../shared/mocks/categories';
import { searchCitiesSimple } from '../../../shared/mocks/cities';
import type { CreateCasaRequest, Category, City } from '../../../shared/interfaces/types';

interface CasaFormProps {
  onSubmit: (data: CreateCasaRequest) => void;
  loading?: boolean;
}

export const CasaForm = ({ onSubmit, loading = false }: CasaFormProps) => {
  const [formData, setFormData] = useState<CreateCasaRequest>({
    nombre: '',
    descripcion: '',
    categoriaId: '',
    cantidadCuartos: 1,
    cantidadBanos: 1,
    precio: 0,
    ciudadId: '',
    fechaPublicacionActiva: ''
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    loadCategories();
    loadCities();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await getCategories(1, 100);
      setCategories(response.data);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    }
  };

  const loadCities = async () => {
    try {
      const citiesData = await searchCitiesSimple();
      setCities(citiesData);
    } catch (error) {
      console.error('Error al cargar ciudades:', error);
    }
  };

  const getMaxDate = () => {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 1);
    return maxDate.toISOString().split('T')[0];
  };

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      nombre: '',
      descripcion: '',
      categoriaId: '',
      cantidadCuartos: 1,
      cantidadBanos: 1,
      precio: 0,
      ciudadId: '',
      fechaPublicacionActiva: ''
    });
  };

  const handleChange = (field: keyof CreateCasaRequest) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = field === 'cantidadCuartos' || field === 'cantidadBanos' || field === 'precio' 
      ? Number(e.target.value) 
      : e.target.value;
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nombre de la Casa"
          value={formData.nombre}
          onChange={handleChange('nombre')}
          required
          maxLength={100}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categoría
          </label>
          <select
            value={formData.categoriaId}
            onChange={handleChange('categoriaId')}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Seleccionar categoría</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Descripción
        </label>
        <textarea
          value={formData.descripcion}
          onChange={handleChange('descripcion')}
          required
          maxLength={500}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Describe las características de la casa..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="Cantidad de Cuartos"
          type="number"
          value={formData.cantidadCuartos.toString()}
          onChange={handleChange('cantidadCuartos')}
          required
          min="1"
          max="20"
        />
        <Input
          label="Cantidad de Baños"
          type="number"
          value={formData.cantidadBanos.toString()}
          onChange={handleChange('cantidadBanos')}
          required
          min="1"
          max="10"
        />
        <Input
          label="Precio (COP)"
          type="number"
          value={formData.precio.toString()}
          onChange={handleChange('precio')}
          required
          min="1"
          step="1"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ciudad
          </label>
          <select
            value={formData.ciudadId}
            onChange={handleChange('ciudadId')}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Seleccionar ciudad</option>
            {cities.map(city => (
              <option key={city.id} value={city.id}>
                {city.nombre} - {city.departamento?.nombre}
              </option>
            ))}
          </select>
        </div>
        <Input
          label="Fecha de Publicación Activa"
          type="date"
          value={formData.fechaPublicacionActiva}
          onChange={handleChange('fechaPublicacionActiva')}
          required
          min={getTodayDate()}
          max={getMaxDate()}
          title="La fecha no puede exceder un mes de la fecha actual"
        />
      </div>

      <Button
        type="submit"
        loading={loading}
        className="w-full md:w-auto"
      >
        Publicar Casa
      </Button>
    </form>
  );
};
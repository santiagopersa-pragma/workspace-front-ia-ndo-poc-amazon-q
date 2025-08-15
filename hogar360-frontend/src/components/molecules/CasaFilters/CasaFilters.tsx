import { useState, useEffect } from 'react';
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button';
import { getCategories } from '../../../shared/mocks/categories';
import { searchCitiesSimple } from '../../../shared/mocks/cities';
import type { Category, City } from '../../../shared/interfaces/types';

interface CasaFiltersProps {
  onFilter: (filters: {
    sortBy: 'ubicacion' | 'categoria' | 'cuartos' | 'banos' | 'precio';
    sortOrder: 'asc' | 'desc';
    precioMin?: number;
    precioMax?: number;
    categoriaId?: string;
    ciudadId?: string;
  }) => void;
  loading?: boolean;
}

export const CasaFilters = ({ onFilter, loading = false }: CasaFiltersProps) => {
  const [sortBy, setSortBy] = useState<'ubicacion' | 'categoria' | 'cuartos' | 'banos' | 'precio'>('precio');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [precioMin, setPrecioMin] = useState<string>('');
  const [precioMax, setPrecioMax] = useState<string>('');
  const [categoriaId, setCategoriaId] = useState<string>('');
  const [ciudadId, setCiudadId] = useState<string>('');
  
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({
      sortBy,
      sortOrder,
      precioMin: precioMin ? Number(precioMin) : undefined,
      precioMax: precioMax ? Number(precioMax) : undefined,
      categoriaId: categoriaId || undefined,
      ciudadId: ciudadId || undefined
    });
  };

  const handleReset = () => {
    setSortBy('precio');
    setSortOrder('asc');
    setPrecioMin('');
    setPrecioMax('');
    setCategoriaId('');
    setCiudadId('');
    onFilter({
      sortBy: 'precio',
      sortOrder: 'asc'
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-border">
      <h4 className="text-lg font-medium text-gray-900 mb-4">Filtros y Ordenamiento</h4>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ordenar por
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="precio">Precio</option>
              <option value="ubicacion">Ubicación</option>
              <option value="categoria">Categoría</option>
              <option value="cuartos">Cantidad de Cuartos</option>
              <option value="banos">Cantidad de Baños</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Orden
            </label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Precio Mínimo (COP)"
            type="number"
            value={precioMin}
            onChange={(e) => setPrecioMin(e.target.value)}
            placeholder="Ej: 100000000"
            min="0"
          />
          <Input
            label="Precio Máximo (COP)"
            type="number"
            value={precioMax}
            onChange={(e) => setPrecioMax(e.target.value)}
            placeholder="Ej: 500000000"
            min="0"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoría
            </label>
            <select
              value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Todas las categorías</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ciudad
            </label>
            <select
              value={ciudadId}
              onChange={(e) => setCiudadId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Todas las ciudades</option>
              {cities.map(city => (
                <option key={city.id} value={city.id}>
                  {city.nombre} - {city.departamento?.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="submit"
            loading={loading}
            className="flex-1"
          >
            Aplicar Filtros
          </Button>
          <Button
            type="button"
            onClick={handleReset}
            variant="secondary"
            className="flex-1"
          >
            Limpiar Filtros
          </Button>
        </div>
      </form>
    </div>
  );
};
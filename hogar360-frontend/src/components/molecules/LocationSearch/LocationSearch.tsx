import { useState } from 'react';
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button';

interface LocationSearchProps {
  onSearch: (params: {
    query: string;
    sortBy: 'city' | 'department';
    sortOrder: 'asc' | 'desc';
  }) => void;
  loading?: boolean;
}

export const LocationSearch = ({ onSearch, loading = false }: LocationSearchProps) => {
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<'city' | 'department'>('city');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ query, sortBy, sortOrder });
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-border">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Buscar ubicaciones
          </label>
          <Input
            placeholder="Buscar por ciudad o departamento..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ordenar por
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'city' | 'department')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="city">Ciudad</option>
              <option value="department">Departamento</option>
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
              <option value="asc">Ascendente (A-Z)</option>
              <option value="desc">Descendente (Z-A)</option>
            </select>
          </div>
        </div>

        <Button
          type="submit"
          loading={loading}
          className="w-full md:w-auto"
        >
          Buscar
        </Button>
      </form>
    </div>
  );
};
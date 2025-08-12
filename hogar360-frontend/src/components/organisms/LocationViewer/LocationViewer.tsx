import { useState, useEffect } from 'react';
import { LocationList } from '../../molecules/LocationList';
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button';
import { searchLocations } from '../../../shared/mocks/locations';
import type { Location } from '../../../shared/interfaces/types';

export const LocationViewer = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const loadLocations = async (query: string = '', order: 'asc' | 'desc' = 'asc') => {
    setLoading(true);
    try {
      const response = await searchLocations(query, 1, 10, order);
      setLocations(response.data);
    } catch (error) {
      console.error('Error al cargar ubicaciones:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLocations(searchQuery, sortOrder);
  }, [searchQuery, sortOrder]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadLocations(searchQuery, sortOrder);
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-poppins font-medium text-gray-900 mb-6">
        Buscar Ubicaciones
      </h2>
      
      {/* Search Form */}
      <div className="bg-white p-6 rounded-lg border border-border mb-6">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Buscar por ciudad o departamento..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={toggleSortOrder}
            >
              Orden: {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
            </Button>
            <Button type="submit">
              Buscar
            </Button>
          </div>
        </form>
      </div>
      
      <LocationList locations={locations} loading={loading} />
    </div>
  );
};
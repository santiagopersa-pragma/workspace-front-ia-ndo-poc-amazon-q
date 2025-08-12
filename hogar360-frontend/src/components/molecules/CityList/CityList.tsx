import { useState } from 'react';
import type { City } from '../../../shared/interfaces/types';
import { Icon } from '../../atoms/Icon';
import { Pagination } from '../Pagination';

interface CityListProps {
  cities: City[];
  loading?: boolean;
  onDelete?: (id: string) => void;
  deletingId?: string | null;
}

export const CityList = ({ cities, loading = false, onDelete, deletingId }: CityListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(cities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCities = cities.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ciudad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departamento</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
              {onDelete && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[...Array(3)].map((_, i) => (
              <tr key={i} className="animate-pulse">
                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
                {onDelete && <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-6"></div></td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (cities.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-border p-8 text-center text-gray-500">
        No hay ciudades disponibles
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ciudad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departamento</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
              {onDelete && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedCities.map((city) => (
              <tr key={city.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{city.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{city.departamento?.nombre || 'N/A'}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{city.descripcion}</td>
                {onDelete && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => onDelete(city.id)}
                      disabled={deletingId === city.id}
                      className={`transition-colors ${
                        deletingId === city.id
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-red-600 hover:text-red-800'
                      }`}
                      title="Eliminar ciudad"
                    >
                      {deletingId === city.id ? (
                        <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                      ) : (
                        <Icon name="edit-icon" size={16} />
                      )}
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
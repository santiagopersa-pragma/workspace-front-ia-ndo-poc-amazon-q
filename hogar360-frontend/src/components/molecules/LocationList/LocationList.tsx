import type { Location } from '../../../shared/interfaces/types';

interface LocationListProps {
  locations: Location[];
  loading?: boolean;
}

export const LocationList = ({ locations, loading = false }: LocationListProps) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ciudad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departamento</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción Ciudad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción Departamento</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[...Array(3)].map((_, i) => (
              <tr key={i} className="animate-pulse">
                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (locations.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-border p-8 text-center text-gray-500">
        No hay ubicaciones disponibles
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-border overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ciudad</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departamento</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción Ciudad</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción Departamento</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {locations.map((location) => (
            <tr key={location.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{location.ciudad}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{location.departamento}</td>
              <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{location.descripcionCiudad}</td>
              <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{location.descripcionDepartamento}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
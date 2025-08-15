import type { HorarioVisita } from '../../../shared/interfaces/types';
import { Icon } from '../../atoms/Icon';
import { Pagination } from '../Pagination';

interface HorarioListProps {
  horarios: (HorarioVisita & { 
    casa?: { 
      id: string; 
      nombre: string; 
      ciudad?: { nombre: string; departamento?: { nombre: string } } 
    };
  })[];
  loading?: boolean;
  onDelete?: (id: string) => void;
  deletingId?: string | null;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const HorarioList = ({ 
  horarios, 
  loading = false, 
  onDelete, 
  deletingId,
  totalPages,
  currentPage,
  onPageChange
}: HorarioListProps) => {
  const formatDateTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleString('es-CO', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Casa</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ubicación</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Inicio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Fin</th>
                {onDelete && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
                  <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                  <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-28"></div></td>
                  <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-28"></div></td>
                  {onDelete && <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-6"></div></td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (horarios.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-border p-8 text-center text-gray-500">
        No hay horarios disponibles
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Casa</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ubicación</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Inicio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Fin</th>
                {onDelete && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {horarios.map((horario) => (
                <tr key={horario.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {horario.casa?.nombre || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {horario.casa?.ciudad?.nombre}, {horario.casa?.ciudad?.departamento?.nombre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {formatDateTime(horario.fechaHoraInicio)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {formatDateTime(horario.fechaHoraFin)}
                  </td>
                  {onDelete && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => onDelete(horario.id)}
                        disabled={deletingId === horario.id}
                        className={`transition-colors ${
                          deletingId === horario.id
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-red-600 hover:text-red-800'
                        }`}
                        title="Eliminar horario"
                      >
                        {deletingId === horario.id ? (
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
      </div>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};
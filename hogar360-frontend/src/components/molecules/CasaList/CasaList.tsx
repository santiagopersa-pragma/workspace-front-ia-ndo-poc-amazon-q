import type { Casa } from '../../../shared/interfaces/types';
import { Icon } from '../../atoms/Icon';
import { Pagination } from '../Pagination';

interface CasaListProps {
  casas: (Casa & { 
    categoria?: { id: string; nombre: string; descripcion: string };
    ciudad?: { 
      id: string; 
      nombre: string; 
      departamento?: { id: string; nombre: string; descripcion: string } 
    };
    vendedor?: { id: string; nombre: string; apellido: string };
  })[];
  loading?: boolean;
  onDelete?: (id: string) => void;
  deletingId?: string | null;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  showVendedor?: boolean;
}

export const CasaList = ({ 
  casas, 
  loading = false, 
  onDelete, 
  deletingId,
  totalPages,
  currentPage,
  onPageChange,
  showVendedor = false
}: CasaListProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'PUBLICADA':
        return 'bg-green-100 text-green-800';
      case 'PUBLICACION_PAUSADA':
        return 'bg-yellow-100 text-yellow-800';
      case 'TRANSACCION_CURSO':
        return 'bg-blue-100 text-blue-800';
      case 'TRANSACCION_FINALIZADA':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Casa</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ubicación</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cuartos/Baños</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                {showVendedor && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendedor</th>}
                {onDelete && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
                  <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
                  <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                  <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
                  <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
                  <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
                  {showVendedor && <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-20"></div></td>}
                  {onDelete && <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-6"></div></td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (casas.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-border p-8 text-center text-gray-500">
        No hay casas publicadas
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ubicación</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cuartos/Baños</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                {showVendedor && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendedor</th>}
                {onDelete && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {casas.map((casa) => (
                <tr key={casa.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{casa.nombre}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{casa.descripcion}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {casa.categoria?.nombre || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {casa.ciudad?.nombre}, {casa.ciudad?.departamento?.nombre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {casa.cantidadCuartos}C / {casa.cantidadBanos}B
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatPrice(casa.precio)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEstadoColor(casa.estadoPublicacion)}`}>
                      {casa.estadoPublicacion.replace('_', ' ')}
                    </span>
                  </td>
                  {showVendedor && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {casa.vendedor?.nombre} {casa.vendedor?.apellido}
                    </td>
                  )}
                  {onDelete && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => onDelete(casa.id)}
                        disabled={deletingId === casa.id}
                        className={`transition-colors ${
                          deletingId === casa.id
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-red-600 hover:text-red-800'
                        }`}
                        title="Eliminar casa"
                      >
                        {deletingId === casa.id ? (
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
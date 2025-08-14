import { useState } from 'react';
import type { User } from '../../../shared/interfaces/types';
import { Icon } from '../../atoms/Icon';
import { Pagination } from '../Pagination';

interface VendedorListProps {
  vendedores: User[];
  loading?: boolean;
  onDelete?: (id: string) => void;
  deletingId?: string | null;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const VendedorList = ({ 
  vendedores, 
  loading = false, 
  onDelete, 
  deletingId,
  totalPages,
  currentPage,
  onPageChange
}: VendedorListProps) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documento</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Celular</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Nac.</th>
              {onDelete && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[...Array(5)].map((_, i) => (
              <tr key={i} className="animate-pulse">
                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
                {onDelete && <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-6"></div></td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (vendedores.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-border p-8 text-center text-gray-500">
        No hay vendedores registrados
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documento</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Celular</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Nac.</th>
              {onDelete && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vendedores.map((vendedor) => (
              <tr key={vendedor.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {vendedor.nombre} {vendedor.apellido}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{vendedor.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{vendedor.documentoIdentidad}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{vendedor.celular}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {vendedor.fechaNacimiento ? new Date(vendedor.fechaNacimiento).toLocaleDateString() : 'N/A'}
                </td>
                {onDelete && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => onDelete(vendedor.id)}
                      disabled={deletingId === vendedor.id}
                      className={`transition-colors ${
                        deletingId === vendedor.id
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-red-600 hover:text-red-800'
                      }`}
                      title="Eliminar vendedor"
                    >
                      {deletingId === vendedor.id ? (
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
        onPageChange={onPageChange}
      />
    </div>
  );
};
import { useState } from 'react';
import type { Department } from '../../../shared/interfaces/types';
import { Icon } from '../../atoms/Icon';
import { Pagination } from '../Pagination';

interface DepartmentListProps {
  departments: Department[];
  loading?: boolean;
  onDelete?: (id: string) => void;
  deletingId?: string | null;
}

export const DepartmentList = ({ departments, loading = false, onDelete, deletingId }: DepartmentListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(departments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDepartments = departments.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
              {onDelete && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[...Array(3)].map((_, i) => (
              <tr key={i} className="animate-pulse">
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

  if (departments.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-border p-8 text-center text-gray-500">
        No hay departamentos disponibles
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
              {onDelete && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedDepartments.map((department) => (
              <tr key={department.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{department.nombre}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{department.descripcion}</td>
                {onDelete && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => onDelete(department.id)}
                      disabled={deletingId === department.id}
                      className={`transition-colors ${
                        deletingId === department.id
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-red-600 hover:text-red-800'
                      }`}
                      title="Eliminar departamento"
                    >
                      {deletingId === department.id ? (
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
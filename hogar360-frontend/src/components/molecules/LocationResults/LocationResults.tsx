import { useState } from 'react';
import type { City } from '../../../shared/interfaces/types';
import { Pagination } from '../Pagination';

interface LocationResultsProps {
  cities: (City & { departamento?: { id: string; nombre: string; descripcion: string } })[];
  loading?: boolean;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const LocationResults = ({ 
  cities, 
  loading = false, 
  totalPages, 
  currentPage, 
  onPageChange 
}: LocationResultsProps) => {
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
            {[...Array(5)].map((_, i) => (
              <tr key={i} className="animate-pulse">
                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-28"></div></td>
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
        No se encontraron ubicaciones que coincidan con la búsqueda
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción Ciudad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción Departamento</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cities.map((city) => (
              <tr key={city.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{city.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{city.departamento?.nombre || 'N/A'}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{city.descripcion}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{city.departamento?.descripcion || 'N/A'}</td>
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
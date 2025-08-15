import { useState, useEffect } from 'react';
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button';
import { searchCitiesSimple } from '../../../shared/mocks/cities';
import { searchHorariosDisponibles } from '../../../shared/mocks/horarios';
import { Pagination } from '../Pagination';
import type { City } from '../../../shared/interfaces/types';

export const HorariosDisponibles = () => {
  const [fechaHoraInicio, setFechaHoraInicio] = useState('');
  const [fechaHoraFin, setFechaHoraFin] = useState('');
  const [ciudadId, setCiudadId] = useState('');
  const [cities, setCities] = useState<City[]>([]);
  const [horarios, setHorarios] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadCities();
    loadHorarios();
  }, []);

  const loadCities = async () => {
    try {
      const citiesData = await searchCitiesSimple();
      setCities(citiesData);
    } catch (error) {
      console.error('Error al cargar ciudades:', error);
    }
  };

  const loadHorarios = async (page: number = 1) => {
    setLoading(true);
    try {
      const response = await searchHorariosDisponibles({
        fechaHoraInicio: fechaHoraInicio || undefined,
        fechaHoraFin: fechaHoraFin || undefined,
        ciudadId: ciudadId || undefined,
        page,
        limit: 10
      });
      setHorarios(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Error al cargar horarios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    loadHorarios(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    loadHorarios(page);
  };

  const formatDateTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleString('es-CO', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="bg-white p-6 rounded-lg border border-border">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Filtrar Horarios</h4>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Fecha y Hora Inicio"
              type="datetime-local"
              value={fechaHoraInicio}
              onChange={(e) => setFechaHoraInicio(e.target.value)}
            />
            <Input
              label="Fecha y Hora Fin"
              type="datetime-local"
              value={fechaHoraFin}
              onChange={(e) => setFechaHoraFin(e.target.value)}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ubicación
              </label>
              <select
                value={ciudadId}
                onChange={(e) => setCiudadId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Todas las ubicaciones</option>
                {cities.map(city => (
                  <option key={city.id} value={city.id}>
                    {city.nombre} - {city.departamento?.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Button type="submit" loading={loading}>
            Buscar Horarios
          </Button>
        </form>
      </div>

      {/* Resultados */}
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Casa</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ubicación</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendedor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Inicio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Fin</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-28"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-28"></div></td>
                  </tr>
                ))
              ) : horarios.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No hay horarios disponibles
                  </td>
                </tr>
              ) : (
                horarios.map((horario) => (
                  <tr key={horario.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {horario.casa?.nombre || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {horario.casa?.ciudad?.nombre}, {horario.casa?.ciudad?.departamento?.nombre}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {horario.vendedor?.nombre} {horario.vendedor?.apellido}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {formatDateTime(horario.fechaHoraInicio)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {formatDateTime(horario.fechaHoraFin)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
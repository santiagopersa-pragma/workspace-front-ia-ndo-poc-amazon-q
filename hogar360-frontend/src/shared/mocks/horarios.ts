import type { HorarioVisita, CreateHorarioVisitaRequest } from '../interfaces/types';
import { mockCasas } from './casas';
import { mockUsers } from './users';
import { mockCities } from './cities';
import { mockDepartments } from './departments';
import { mockCategories } from './categories';
import { getVisitasCountByHorario } from './visitas';

export const mockHorarios: HorarioVisita[] = [];

const validateHorarioConflict = (vendedorId: string, fechaHoraInicio: string, fechaHoraFin: string): boolean => {
  return mockHorarios.some(horario => 
    horario.vendedorId === vendedorId &&
    (
      (fechaHoraInicio >= horario.fechaHoraInicio && fechaHoraInicio < horario.fechaHoraFin) ||
      (fechaHoraFin > horario.fechaHoraInicio && fechaHoraFin <= horario.fechaHoraFin) ||
      (fechaHoraInicio <= horario.fechaHoraInicio && fechaHoraFin >= horario.fechaHoraFin)
    )
  );
};

const validateDateRange = (fechaHoraInicio: string): boolean => {
  const inicio = new Date(fechaHoraInicio);
  const ahora = new Date();
  const tresSemanas = new Date();
  tresSemanas.setDate(ahora.getDate() + 21);
  
  return inicio >= ahora && inicio <= tresSemanas;
};

const validateCasaOwnership = (casaId: string, vendedorId: string): boolean => {
  const casa = mockCasas.find(c => c.id === casaId);
  return casa?.vendedorId === vendedorId;
};

export const createHorarioVisita = async (data: CreateHorarioVisitaRequest, vendedorId: string): Promise<HorarioVisita> => {
  // Validar que la casa existe y pertenece al vendedor
  if (!validateCasaOwnership(data.casaId, vendedorId)) {
    throw new Error('No tienes permisos para crear horarios en esta casa');
  }

  // Validar rango de fechas (próximas 3 semanas)
  if (!validateDateRange(data.fechaHoraInicio)) {
    throw new Error('Solo se pueden registrar horarios dentro de las próximas 3 semanas');
  }

  // Validar que fecha fin sea posterior a fecha inicio
  if (new Date(data.fechaHoraFin) <= new Date(data.fechaHoraInicio)) {
    throw new Error('La fecha de fin debe ser posterior a la fecha de inicio');
  }

  // Validar conflictos de horarios
  if (validateHorarioConflict(vendedorId, data.fechaHoraInicio, data.fechaHoraFin)) {
    throw new Error('Ya tienes un horario registrado en ese rango de tiempo');
  }

  const newHorario: HorarioVisita = {
    id: Date.now().toString(),
    vendedorId,
    casaId: data.casaId,
    fechaHoraInicio: data.fechaHoraInicio,
    fechaHoraFin: data.fechaHoraFin
  };

  mockHorarios.push(newHorario);
  return newHorario;
};

export const getHorariosByVendedor = async (vendedorId: string, page: number = 1, limit: number = 10) => {
  const vendedorHorarios = mockHorarios
    .filter(horario => horario.vendedorId === vendedorId)
    .map(horario => ({
      ...horario,
      casa: mockCasas.find(casa => casa.id === horario.casaId),
      vendedor: mockUsers.find(user => user.id === horario.vendedorId)
    }))
    .sort((a, b) => new Date(b.fechaHoraInicio).getTime() - new Date(a.fechaHoraInicio).getTime());

  const totalItems = vendedorHorarios.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const paginatedHorarios = vendedorHorarios.slice(startIndex, startIndex + limit);

  return {
    data: paginatedHorarios,
    totalItems,
    totalPages,
    currentPage: page
  };
};

export const deleteHorarioVisita = async (id: string, vendedorId: string): Promise<void> => {
  const index = mockHorarios.findIndex(horario => horario.id === id && horario.vendedorId === vendedorId);
  if (index === -1) {
    throw new Error('Horario no encontrado o no tienes permisos para eliminarlo');
  }
  mockHorarios.splice(index, 1);
};

export const searchHorariosDisponibles = async (params: any = {}) => {
  const {
    fechaHoraInicio,
    fechaHoraFin,
    ciudadId,
    page = 1,
    limit = 10
  } = params;

  const ahora = new Date();
  
  // Filtrar horarios disponibles
  let horariosDisponibles = mockHorarios
    .filter(horario => {
      // No mostrar horarios cuya fecha de inicio sea menor a la fecha actual
      if (new Date(horario.fechaHoraInicio) <= ahora) {
        return false;
      }
      // No mostrar horarios que ya tienen 2 compradores agendados
      if (getVisitasCountByHorario(horario.id) >= 2) {
        return false;
      }
      return true;
    })
    .map(horario => ({
      ...horario,
      casa: mockCasas.find(casa => casa.id === horario.casaId),
      vendedor: mockUsers.find(user => user.id === horario.vendedorId)
    }))
    .map(horario => ({
      ...horario,
      casa: horario.casa ? {
        ...horario.casa,
        ciudad: mockCities.find(city => city.id === horario.casa?.ciudadId),
        categoria: mockCategories.find(cat => cat.id === horario.casa?.categoriaId)
      } : undefined
    }))
    .map(horario => ({
      ...horario,
      casa: horario.casa?.ciudad ? {
        ...horario.casa,
        ciudad: {
          ...horario.casa.ciudad,
          departamento: mockDepartments.find(dept => dept.id === horario.casa?.ciudad?.departamentoId)
        }
      } : horario.casa
    }));

  // Aplicar filtros
  if (fechaHoraInicio) {
    horariosDisponibles = horariosDisponibles.filter(horario => 
      horario.fechaHoraInicio >= fechaHoraInicio
    );
  }
  if (fechaHoraFin) {
    horariosDisponibles = horariosDisponibles.filter(horario => 
      horario.fechaHoraFin <= fechaHoraFin
    );
  }
  if (ciudadId) {
    horariosDisponibles = horariosDisponibles.filter(horario => 
      horario.casa?.ciudadId === ciudadId
    );
  }

  // Ordenar por fecha y hora de inicio descendente
  horariosDisponibles.sort((a, b) => 
    new Date(b.fechaHoraInicio).getTime() - new Date(a.fechaHoraInicio).getTime()
  );

  // Paginar
  const totalItems = horariosDisponibles.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const paginatedHorarios = horariosDisponibles.slice(startIndex, startIndex + limit);

  return {
    data: paginatedHorarios,
    totalItems,
    totalPages,
    currentPage: page
  };
};
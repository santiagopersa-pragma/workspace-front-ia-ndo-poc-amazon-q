import type { VisitaAgendada, CreateVisitaAgendadaRequest } from '../interfaces/types';
import { mockHorarios } from './horarios';

export const mockVisitas: VisitaAgendada[] = [];

const getVisitasByHorario = (horarioId: string): VisitaAgendada[] => {
  return mockVisitas.filter(visita => visita.horarioDisponibleId === horarioId);
};

export const createVisitaAgendada = async (data: CreateVisitaAgendadaRequest): Promise<VisitaAgendada> => {
  // Validar que el horario existe
  const horario = mockHorarios.find(h => h.id === data.horarioDisponibleId);
  if (!horario) {
    throw new Error('Horario no encontrado');
  }

  // Validar que no haya más de 2 compradores agendados
  const visitasExistentes = getVisitasByHorario(data.horarioDisponibleId);
  if (visitasExistentes.length >= 2) {
    throw new Error('Este horario ya tiene el máximo de 2 compradores agendados');
  }

  // Validar que el comprador no haya agendado ya este horario
  const yaAgendado = visitasExistentes.some(visita => visita.compradorEmail === data.compradorEmail);
  if (yaAgendado) {
    throw new Error('Ya has agendado una visita para este horario');
  }

  const newVisita: VisitaAgendada = {
    id: Date.now().toString(),
    horarioDisponibleId: data.horarioDisponibleId,
    compradorEmail: data.compradorEmail,
    fechaAgendamiento: new Date().toISOString()
  };

  mockVisitas.push(newVisita);
  return newVisita;
};

export const getVisitasCountByHorario = (horarioId: string): number => {
  return getVisitasByHorario(horarioId).length;
};
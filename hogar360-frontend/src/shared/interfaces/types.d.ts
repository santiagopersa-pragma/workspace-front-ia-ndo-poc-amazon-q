export interface Category {
  id: string;
  nombre: string;
  descripcion: string;
}

export interface CreateCategoryRequest {
  nombre: string;
  descripcion: string;
}

export interface User {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  rol: 'admin' | 'vendedor' | 'comprador';
  documentoIdentidad?: string;
  celular?: string;
  fechaNacimiento?: string;
}

export interface CreateUserRequest {
  nombre: string;
  apellido: string;
  documentoIdentidad: string;
  celular: string;
  fechaNacimiento: string;
  email: string;
  clave: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface Department {
  id: string;
  nombre: string;
  descripcion: string;
}

export interface CreateDepartmentRequest {
  nombre: string;
  descripcion: string;
}

export interface City {
  id: string;
  nombre: string;
  descripcion: string;
  departamentoId: string;
  departamento?: Department;
}

export interface CreateCityRequest {
  nombre: string;
  descripcion: string;
  departamentoId: string;
}

// Mantenemos Location para compatibilidad
export interface Location {
  id: string;
  ciudad: string;
  departamento: string;
  descripcionCiudad: string;
  descripcionDepartamento: string;
}

export interface CreateLocationRequest {
  ciudad: string;
  departamento: string;
  descripcionCiudad: string;
  descripcionDepartamento: string;
}

export interface Casa {
  id: string;
  nombre: string;
  descripcion: string;
  categoriaId: string;
  categoria?: Category;
  cantidadCuartos: number;
  cantidadBanos: number;
  precio: number;
  ciudadId: string;
  ciudad?: City;
  fechaPublicacionActiva: string;
  estadoPublicacion: 'PUBLICADA' | 'PUBLICACION_PAUSADA' | 'TRANSACCION_CURSO' | 'TRANSACCION_FINALIZADA';
  fechaPublicacion: string;
  vendedorId: string;
  vendedor?: User;
}

export interface CreateCasaRequest {
  nombre: string;
  descripcion: string;
  categoriaId: string;
  cantidadCuartos: number;
  cantidadBanos: number;
  precio: number;
  ciudadId: string;
  fechaPublicacionActiva: string;
}

export interface HorarioVisita {
  id: string;
  vendedorId: string;
  casaId: string;
  fechaHoraInicio: string;
  fechaHoraFin: string;
  vendedor?: User;
  casa?: Casa;
}

export interface CreateHorarioVisitaRequest {
  casaId: string;
  fechaHoraInicio: string;
  fechaHoraFin: string;
}
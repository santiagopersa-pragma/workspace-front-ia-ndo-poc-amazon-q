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
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

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
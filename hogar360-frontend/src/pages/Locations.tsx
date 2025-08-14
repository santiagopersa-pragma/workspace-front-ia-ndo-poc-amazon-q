import { useState, useEffect } from 'react';
import { useAuthStore } from '../shared/store/authStore';
import { Sidebar } from '../components/organisms/Sidebar';
import { DepartmentForm } from '../components/molecules/DepartmentForm';
import { CityForm } from '../components/molecules/CityForm';
import { DepartmentList } from '../components/molecules/DepartmentList';
import { CityList } from '../components/molecules/CityList';
import { LocationSearch } from '../components/molecules/LocationSearch';
import { LocationResults } from '../components/molecules/LocationResults';
import { createDepartment, getDepartments, deleteDepartment } from '../shared/mocks/departments';
import { createCity, searchCities, searchCitiesSimple, deleteCity } from '../shared/mocks/cities';
import { Input } from '../components/atoms/Input';
import { Navigate } from 'react-router-dom';
import type { Department, City, CreateDepartmentRequest, CreateCityRequest } from '../shared/interfaces/types';

export const Locations = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'departments' | 'cities' | 'search'>('departments');
  
  // Department state
  const [departments, setDepartments] = useState<Department[]>([]);
  const [departmentLoading, setDepartmentLoading] = useState(false);
  const [departmentMessage, setDepartmentMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [deletingDepartment, setDeletingDepartment] = useState<string | null>(null);
  
  // City state
  const [cities, setCities] = useState<City[]>([]);
  const [cityLoading, setCityLoading] = useState(false);
  const [cityMessage, setCityMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [citySearchQuery, setCitySearchQuery] = useState('');
  const [deletingCity, setDeletingCity] = useState<string | null>(null);
  
  // Search state
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchTotalPages, setSearchTotalPages] = useState(1);
  const [searchCurrentPage, setSearchCurrentPage] = useState(1);
  const [lastSearchParams, setLastSearchParams] = useState<any>(null);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const isAdmin = user?.rol === 'admin';

  // Load departments
  const loadDepartments = async () => {
    try {
      const depts = await getDepartments();
      setDepartments(depts);
    } catch (error) {
      console.error('Error al cargar departamentos:', error);
    }
  };

  // Load cities
  const loadCities = async (query: string = '') => {
    setCityLoading(true);
    try {
      const citiesData = await searchCitiesSimple(query);
      setCities(citiesData);
    } catch (error) {
      console.error('Error al cargar ciudades:', error);
    } finally {
      setCityLoading(false);
    }
  };

  useEffect(() => {
    loadDepartments();
    loadCities();
  }, []);

  useEffect(() => {
    if (activeTab === 'cities') {
      loadCities(citySearchQuery);
    }
  }, [citySearchQuery, activeTab]);

  // Handle department creation
  const handleCreateDepartment = async (data: CreateDepartmentRequest) => {
    setDepartmentLoading(true);
    setDepartmentMessage(null);

    try {
      const newDepartment = await createDepartment(data);
      setDepartmentMessage({
        type: 'success',
        text: `Departamento "${newDepartment.nombre}" creado exitosamente`
      });
      setTimeout(() => setDepartmentMessage(null), 3000);
      loadDepartments();
    } catch (error) {
      setDepartmentMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Error al crear el departamento'
      });
    } finally {
      setDepartmentLoading(false);
    }
  };

  // Handle city creation
  const handleCreateCity = async (data: CreateCityRequest) => {
    setCityLoading(true);
    setCityMessage(null);

    try {
      const newCity = await createCity(data);
      setCityMessage({
        type: 'success',
        text: `Ciudad "${newCity.nombre}" creada exitosamente`
      });
      setTimeout(() => setCityMessage(null), 3000);
      loadCities(citySearchQuery);
    } catch (error) {
      setCityMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Error al crear la ciudad'
      });
    } finally {
      setCityLoading(false);
    }
  };

  // Handle department deletion
  const handleDeleteDepartment = async (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este departamento?')) {
      setDeletingDepartment(id);
      try {
        await deleteDepartment(id);
        await loadDepartments();
        setDepartmentMessage({
          type: 'success',
          text: 'Departamento eliminado exitosamente'
        });
        setTimeout(() => setDepartmentMessage(null), 3000);
      } catch (error) {
        console.error('Error al eliminar departamento:', error);
        setDepartmentMessage({
          type: 'error',
          text: 'Error al eliminar el departamento'
        });
      } finally {
        setDeletingDepartment(null);
      }
    }
  };

  // Handle city deletion
  const handleDeleteCity = async (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta ciudad?')) {
      setDeletingCity(id);
      try {
        await deleteCity(id);
        await loadCities(citySearchQuery);
        setCityMessage({
          type: 'success',
          text: 'Ciudad eliminada exitosamente'
        });
        setTimeout(() => setCityMessage(null), 3000);
      } catch (error) {
        console.error('Error al eliminar ciudad:', error);
        setCityMessage({
          type: 'error',
          text: 'Error al eliminar la ciudad'
        });
      } finally {
        setDeletingCity(null);
      }
    }
  };

  // Handle location search
  const handleLocationSearch = async (params: {
    query: string;
    sortBy: 'city' | 'department';
    sortOrder: 'asc' | 'desc';
  }) => {
    setSearchLoading(true);
    setSearchCurrentPage(1);
    setLastSearchParams(params);
    
    try {
      const result = await searchCities({
        ...params,
        page: 1,
        limit: 10
      });
      
      setSearchResults(result.data);
      setSearchTotalPages(result.totalPages);
    } catch (error) {
      console.error('Error al buscar ubicaciones:', error);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  // Handle search page change
  const handleSearchPageChange = async (page: number) => {
    if (!lastSearchParams) return;
    
    setSearchLoading(true);
    setSearchCurrentPage(page);
    
    try {
      const result = await searchCities({
        ...lastSearchParams,
        page,
        limit: 10
      });
      
      setSearchResults(result.data);
    } catch (error) {
      console.error('Error al cambiar página:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 relative z-30">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-poppins font-medium">
            <span className="text-primary-600">Hogar</span>
            <span className="text-black">360</span>
          </h1>
          
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-700">
              Bienvenido, {user?.nombre} {user?.apellido}
            </span>
            <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
              {user?.rol}
            </span>
            <div className="relative">
              <button
                onClick={() => setShowLogoutModal(!showLogoutModal)}
                className="w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <img
                  src="/src/assets/images/user-avatar.png"
                  alt="Avatar"
                  className="w-8 h-8 rounded-full"
                />
              </button>
              
              {showLogoutModal && (
                <div className="absolute right-0 top-10 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10">
                  <button
                    onClick={() => {
                      logout();
                      setShowLogoutModal(false);
                    }}
                    className="text-sm text-red-600 hover:text-red-800 px-3 py-2 rounded hover:bg-gray-50 transition-colors whitespace-nowrap"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="py-8 lg:ml-64">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-poppins font-medium text-gray-900 mb-6">Ubicaciones</h2>
          
          {/* Tabs */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('departments')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'departments'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Departamentos
                </button>
                <button
                  onClick={() => setActiveTab('cities')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'cities'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Ciudades
                </button>
                <button
                  onClick={() => setActiveTab('search')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'search'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Buscar Ubicaciones
                </button>
              </nav>
            </div>
          </div>

          {/* Department Tab */}
          {activeTab === 'departments' && (
            <div className="space-y-8">
              {isAdmin && (
                <div>
                  <h3 className="text-xl font-poppins font-medium text-gray-900 mb-4">Crear Departamento</h3>
                  <div className="bg-white p-6 rounded-lg border border-border">
                    {departmentMessage && (
                      <div className={`mb-4 p-3 rounded-lg ${
                        departmentMessage.type === 'success' 
                          ? 'bg-green-50 text-green-800 border border-green-200' 
                          : 'bg-red-50 text-red-800 border border-red-200'
                      }`}>
                        {departmentMessage.text}
                      </div>
                    )}
                    <DepartmentForm onSubmit={handleCreateDepartment} loading={departmentLoading} />
                  </div>
                </div>
              )}
              
              <div>
                <h3 className="text-xl font-poppins font-medium text-gray-900 mb-4">Departamentos Existentes</h3>
                <DepartmentList 
                  departments={departments} 
                  onDelete={isAdmin ? handleDeleteDepartment : undefined}
                  deletingId={deletingDepartment}
                />
              </div>
            </div>
          )}

          {/* Cities Tab */}
          {activeTab === 'cities' && (
            <div className="space-y-8">
              {isAdmin && (
                <div>
                  <h3 className="text-xl font-poppins font-medium text-gray-900 mb-4">Crear Ciudad</h3>
                  <div className="bg-white p-6 rounded-lg border border-border">
                    {cityMessage && (
                      <div className={`mb-4 p-3 rounded-lg ${
                        cityMessage.type === 'success' 
                          ? 'bg-green-50 text-green-800 border border-green-200' 
                          : 'bg-red-50 text-red-800 border border-red-200'
                      }`}>
                        {cityMessage.text}
                      </div>
                    )}
                    <CityForm onSubmit={handleCreateCity} loading={cityLoading} />
                  </div>
                </div>
              )}
              
              <div>
                <h3 className="text-xl font-poppins font-medium text-gray-900 mb-4">Ciudades Existentes</h3>
                <div className="bg-white p-6 rounded-lg border border-border mb-6">
                  <Input
                    placeholder="Filtrar por ciudad o departamento..."
                    value={citySearchQuery}
                    onChange={(e) => setCitySearchQuery(e.target.value)}
                  />
                </div>
                <CityList 
                  cities={cities} 
                  loading={cityLoading} 
                  onDelete={isAdmin ? handleDeleteCity : undefined}
                  deletingId={deletingCity}
                />
              </div>
            </div>
          )}

          {/* Search Tab */}
          {activeTab === 'search' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-poppins font-medium text-gray-900 mb-4">Buscar Ubicaciones</h3>
                <LocationSearch onSearch={handleLocationSearch} loading={searchLoading} />
              </div>
              
              {(searchResults.length > 0 || searchLoading) && (
                <div>
                  <h3 className="text-xl font-poppins font-medium text-gray-900 mb-4">Resultados de Búsqueda</h3>
                  <LocationResults
                    cities={searchResults}
                    loading={searchLoading}
                    totalPages={searchTotalPages}
                    currentPage={searchCurrentPage}
                    onPageChange={handleSearchPageChange}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
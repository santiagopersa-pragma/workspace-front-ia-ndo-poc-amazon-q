import { useState, useEffect } from 'react';
import { useAuthStore } from '../shared/store/authStore';
import { Sidebar } from '../components/organisms/Sidebar';
import { HorarioForm } from '../components/molecules/HorarioForm';
import { HorarioList } from '../components/molecules/HorarioList';
import { HorariosDisponibles } from '../components/molecules/HorariosDisponibles';
import { createHorarioVisita, getHorariosByVendedor, deleteHorarioVisita } from '../shared/mocks/horarios';
import { Navigate } from 'react-router-dom';
import type { CreateHorarioVisitaRequest, HorarioVisita } from '../shared/interfaces/types';

export const Horarios = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  const [horarios, setHorarios] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const isVendedor = user?.rol === 'vendedor';
  const [activeTab, setActiveTab] = useState<'create' | 'list' | 'disponibles'>(isVendedor ? 'create' : 'disponibles');



  useEffect(() => {
    if (activeTab === 'list') {
      loadHorarios(currentPage);
    }
  }, [currentPage, activeTab]);

  const loadHorarios = async (page: number = 1) => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      const response = await getHorariosByVendedor(user.id, page, 5);
      setHorarios(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Error al cargar horarios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateHorario = async (data: CreateHorarioVisitaRequest) => {
    if (!user?.id) return;
    
    setLoading(true);
    setMessage(null);

    try {
      await createHorarioVisita(data, user.id);
      setMessage({
        type: 'success',
        text: 'Horario creado exitosamente'
      });
      setTimeout(() => setMessage(null), 3000);
      
      if (activeTab === 'list') {
        loadHorarios(currentPage);
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Error al crear el horario'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHorario = async (id: string) => {
    if (!user?.id) return;
    
    if (window.confirm('¿Estás seguro de que deseas eliminar este horario?')) {
      setDeletingId(id);
      try {
        await deleteHorarioVisita(id, user.id);
        setMessage({
          type: 'success',
          text: 'Horario eliminado exitosamente'
        });
        setTimeout(() => setMessage(null), 3000);
        loadHorarios(currentPage);
      } catch (error) {
        console.error('Error al eliminar horario:', error);
        setMessage({
          type: 'error',
          text: 'Error al eliminar el horario'
        });
      } finally {
        setDeletingId(null);
      }
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
          <h2 className="text-3xl font-poppins font-medium text-gray-900 mb-6">Horarios de Visita</h2>
          
          {/* Tabs */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {isVendedor && (
                  <button
                    onClick={() => setActiveTab('create')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'create'
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Crear Horario
                  </button>
                )}
                {isVendedor && (
                  <button
                    onClick={() => setActiveTab('list')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'list'
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Mis Horarios
                  </button>
                )}
                <button
                  onClick={() => setActiveTab('disponibles')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'disponibles'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Horarios Disponibles
                </button>
              </nav>
            </div>
          </div>

          {/* Create Tab */}
          {activeTab === 'create' && (
            <div>
              <h3 className="text-xl font-poppins font-medium text-gray-900 mb-4">Crear Nuevo Horario</h3>
              <div className="bg-white p-6 rounded-lg border border-border">
                {message && (
                  <div className={`mb-4 p-3 rounded-lg ${
                    message.type === 'success' 
                      ? 'bg-green-50 text-green-800 border border-green-200' 
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    {message.text}
                  </div>
                )}
                <HorarioForm onSubmit={handleCreateHorario} loading={loading} vendedorId={user.id} />
              </div>
            </div>
          )}

          {/* List Tab */}
          {activeTab === 'list' && (
            <div>
              <h3 className="text-xl font-poppins font-medium text-gray-900 mb-4">Mis Horarios</h3>
              <HorarioList
                horarios={horarios}
                loading={loading}
                onDelete={handleDeleteHorario}
                deletingId={deletingId}
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          )}

          {/* Disponibles Tab */}
          {activeTab === 'disponibles' && (
            <div>
              <h3 className="text-xl font-poppins font-medium text-gray-900 mb-4">Horarios Disponibles</h3>
              <HorariosDisponibles />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
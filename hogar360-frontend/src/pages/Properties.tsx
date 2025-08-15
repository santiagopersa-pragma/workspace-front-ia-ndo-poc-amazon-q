import { useState, useEffect } from 'react';
import { useAuthStore } from '../shared/store/authStore';
import { Sidebar } from '../components/organisms/Sidebar';
import { CasaForm } from '../components/molecules/CasaForm';
import { CasaList } from '../components/molecules/CasaList';
import { createCasa, getCasasWithDetails, getCasasByVendedor, deleteCasa } from '../shared/mocks/casas';
import { Navigate } from 'react-router-dom';
import type { Casa, CreateCasaRequest } from '../shared/interfaces/types';

export const Properties = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'publish' | 'my-properties' | 'all-properties'>('publish');
  
  // Casa state
  const [casas, setCasas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const isVendedor = user?.rol === 'vendedor';

  // Load casas
  const loadCasas = async (page: number = 1, type: 'my' | 'all' = 'all') => {
    setLoading(true);
    try {
      const response = type === 'my' && user?.id
        ? await getCasasByVendedor(user.id, page, 5)
        : await getCasasWithDetails(page, 5);
      
      setCasas(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Error al cargar casas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'my-properties') {
      loadCasas(currentPage, 'my');
    } else if (activeTab === 'all-properties') {
      loadCasas(currentPage, 'all');
    }
  }, [currentPage, activeTab]);

  // Handle casa creation
  const handleCreateCasa = async (data: CreateCasaRequest) => {
    if (!user?.id) return;
    
    setLoading(true);
    setMessage(null);

    try {
      const newCasa = await createCasa(data, user.id);
      setMessage({
        type: 'success',
        text: `Casa "${newCasa.nombre}" publicada exitosamente`
      });
      setTimeout(() => setMessage(null), 3000);
      
      // Refresh my properties if on that tab
      if (activeTab === 'my-properties') {
        loadCasas(currentPage, 'my');
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Error al publicar la casa'
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle casa deletion
  const handleDeleteCasa = async (id: string) => {
    if (!user?.id) return;
    
    if (window.confirm('¿Estás seguro de que deseas eliminar esta casa?')) {
      setDeletingId(id);
      try {
        await deleteCasa(id, user.id);
        setMessage({
          type: 'success',
          text: 'Casa eliminada exitosamente'
        });
        setTimeout(() => setMessage(null), 3000);
        
        const type = activeTab === 'my-properties' ? 'my' : 'all';
        loadCasas(currentPage, type);
      } catch (error) {
        console.error('Error al eliminar casa:', error);
        setMessage({
          type: 'error',
          text: 'Error al eliminar la casa'
        });
      } finally {
        setDeletingId(null);
      }
    }
  };

  // Handle page change
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
          <h2 className="text-3xl font-poppins font-medium text-gray-900 mb-6">Propiedades</h2>
          
          {/* Tabs */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {isVendedor && (
                  <button
                    onClick={() => setActiveTab('publish')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'publish'
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Publicar Casa
                  </button>
                )}
                {isVendedor && (
                  <button
                    onClick={() => setActiveTab('my-properties')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'my-properties'
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Mis Propiedades
                  </button>
                )}
                <button
                  onClick={() => setActiveTab('all-properties')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'all-properties'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Todas las Propiedades
                </button>
              </nav>
            </div>
          </div>

          {/* Publish Tab */}
          {activeTab === 'publish' && isVendedor && (
            <div>
              <h3 className="text-xl font-poppins font-medium text-gray-900 mb-4">Publicar Nueva Casa</h3>
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
                <CasaForm onSubmit={handleCreateCasa} loading={loading} />
              </div>
            </div>
          )}

          {/* My Properties Tab */}
          {activeTab === 'my-properties' && isVendedor && (
            <div>
              <h3 className="text-xl font-poppins font-medium text-gray-900 mb-4">Mis Propiedades</h3>
              <CasaList
                casas={casas}
                loading={loading}
                onDelete={handleDeleteCasa}
                deletingId={deletingId}
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                showVendedor={false}
              />
            </div>
          )}

          {/* All Properties Tab */}
          {activeTab === 'all-properties' && (
            <div>
              <h3 className="text-xl font-poppins font-medium text-gray-900 mb-4">Todas las Propiedades</h3>
              <CasaList
                casas={casas}
                loading={loading}
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                showVendedor={true}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
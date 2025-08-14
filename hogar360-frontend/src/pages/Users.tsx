import { useState, useEffect } from 'react';
import { useAuthStore } from '../shared/store/authStore';
import { Sidebar } from '../components/organisms/Sidebar';
import { VendedorForm } from '../components/molecules/VendedorForm';
import { VendedorList } from '../components/molecules/VendedorList';
import { createVendedor, getVendedores, deleteVendedor } from '../shared/mocks/users';
import { Navigate } from 'react-router-dom';
import type { User, CreateUserRequest } from '../shared/interfaces/types';

export const Users = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  // Vendedor state
  const [vendedores, setVendedores] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const isAdmin = user?.rol === 'admin';

  // Load vendedores
  const loadVendedores = async (page: number = 1) => {
    setLoading(true);
    try {
      const response = await getVendedores(page, 5);
      setVendedores(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Error al cargar vendedores:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVendedores(currentPage);
  }, [currentPage]);

  // Handle vendedor creation
  const handleCreateVendedor = async (data: CreateUserRequest) => {
    setLoading(true);
    setMessage(null);

    try {
      const newVendedor = await createVendedor(data);
      setMessage({
        type: 'success',
        text: `Vendedor "${newVendedor.nombre} ${newVendedor.apellido}" creado exitosamente`
      });
      setTimeout(() => setMessage(null), 3000);
      loadVendedores(currentPage);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Error al crear el vendedor'
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle vendedor deletion
  const handleDeleteVendedor = async (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este vendedor?')) {
      setDeletingId(id);
      try {
        await deleteVendedor(id);
        setMessage({
          type: 'success',
          text: 'Vendedor eliminado exitosamente'
        });
        setTimeout(() => setMessage(null), 3000);
        loadVendedores(currentPage);
      } catch (error) {
        console.error('Error al eliminar vendedor:', error);
        setMessage({
          type: 'error',
          text: 'Error al eliminar el vendedor'
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
        <div className="container mx-auto px-4 space-y-8">
          <h2 className="text-3xl font-poppins font-medium text-gray-900">Gestión de Usuarios</h2>
          
          {isAdmin && (
            <div>
              <h3 className="text-xl font-poppins font-medium text-gray-900 mb-4">Crear Vendedor</h3>
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
                <VendedorForm onSubmit={handleCreateVendedor} loading={loading} />
              </div>
            </div>
          )}
          
          <div>
            <h3 className="text-xl font-poppins font-medium text-gray-900 mb-4">Vendedores Registrados</h3>
            <VendedorList
              vendedores={vendedores}
              loading={loading}
              onDelete={isAdmin ? handleDeleteVendedor : undefined}
              deletingId={deletingId}
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
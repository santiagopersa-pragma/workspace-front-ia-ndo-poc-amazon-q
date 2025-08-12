import { useState } from 'react';
import { useAuthStore } from '../shared/store/authStore';
import { Sidebar } from '../components/organisms/Sidebar';
import { Navigate } from 'react-router-dom';

export const Users = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

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
          <h2 className="text-3xl font-poppins font-medium text-gray-900 mb-6">Usuarios</h2>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-gray-600">Gestión de usuarios próximamente...</p>
          </div>
        </div>
      </div>
    </div>
  );
};
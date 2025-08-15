import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Icon } from '../../atoms/Icon';
import { useAuthStore } from '../../../shared/store/authStore';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard-icon', path: '/dashboard' },
  { id: 'properties', label: 'Propiedades', icon: 'properties-icon', path: '/properties' },
  { id: 'categories', label: 'Categorías', icon: 'categories-icon', path: '/categories' },
  { id: 'locations', label: 'Ubicaciones', icon: 'properties-icon', path: '/locations' },
  { id: 'users', label: 'Usuarios', icon: 'users-icon', path: '/users' },
  { id: 'horarios', label: 'Horarios', icon: 'dashboard-icon', path: '/horarios' },
  { id: 'settings', label: 'Configuración', icon: 'settings-icon', path: '/settings' },
];

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const location = useLocation();
  const { user } = useAuthStore();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-16 left-0 z-20 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out
        ${isCollapsed ? '-translate-x-full' : 'translate-x-0'} lg:translate-x-0
        w-64 lg:fixed
      `}>
        {/* Close button for mobile */}
        <div className="lg:hidden flex justify-end p-4 border-b border-gray-200">
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-gray-100"
          >
            <Icon name="arrow-right-icon" size={16} className="rotate-180" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className={`
                      flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                      ${isActive 
                        ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600' 
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    <Icon 
                      name={item.icon} 
                      size={16} 
                      className={isActive ? 'text-primary-600' : 'text-gray-500'} 
                    />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className={`
          fixed top-20 left-4 z-30 lg:hidden p-2 bg-white rounded-md shadow-md border border-gray-200
          ${isCollapsed ? 'block' : 'hidden'}
        `}
      >
        <Icon name="arrow-right-icon" size={16} />
      </button>
    </>
  );
};
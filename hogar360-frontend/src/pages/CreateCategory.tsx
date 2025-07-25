import { useAuthStore } from '../shared/store/authStore';
import { CategoryManager } from '../components/organisms/CategoryManager';
import { Navigate } from 'react-router-dom';

export const CreateCategory = () => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || user?.rol !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <CategoryManager />
      </div>
    </div>
  );
};
import { useState, useEffect } from 'react';
import { CategoryList } from '../../molecules/CategoryList';
import { Pagination } from '../../molecules/Pagination';
import { getCategories, deleteCategory } from '../../../shared/mocks/categories';
import { useAuthStore } from '../../../shared/store/authStore';
import type { Category } from '../../../shared/interfaces/types';

export const CategoryViewer = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useAuthStore();

  const loadCategories = async (page: number) => {
    setLoading(true);
    try {
      const response = await getCategories(page, 5);
      setCategories(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      try {
        await deleteCategory(id);
        loadCategories(currentPage);
      } catch (error) {
        console.error('Error al eliminar categoría:', error);
      }
    }
  };

  const isAdmin = user?.rol === 'admin';

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-poppins font-medium text-gray-900 mb-6">
        Categorías Existentes
      </h2>
      
      <CategoryList 
        categories={categories} 
        loading={loading} 
        onDelete={isAdmin ? handleDelete : undefined}
      />
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
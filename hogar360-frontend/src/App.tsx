import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { CreateCategory } from './pages/CreateCategory';
import { useAuthStore } from './shared/store/authStore';

function App() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/admin/categories" 
          element={isAuthenticated ? <CreateCategory /> : <Navigate to="/login" />} 
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
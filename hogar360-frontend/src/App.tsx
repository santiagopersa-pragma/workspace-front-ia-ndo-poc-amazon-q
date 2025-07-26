import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Categories } from './pages/Categories';
import { useAuthStore } from './shared/store/authStore';

function App() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/categories" 
          element={isAuthenticated ? <Categories /> : <Navigate to="/login" />} 
        />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/categories" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
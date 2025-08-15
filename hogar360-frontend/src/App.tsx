import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Properties } from './pages/Properties';
import { Categories } from './pages/Categories';
import { Locations } from './pages/Locations';
import { Users } from './pages/Users';
import { Settings } from './pages/Settings';
import { Horarios } from './pages/Horarios';
import { useAuthStore } from './shared/store/authStore';

function App() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Landing />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/properties" 
          element={isAuthenticated ? <Properties /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/categories" 
          element={isAuthenticated ? <Categories /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/locations" 
          element={isAuthenticated ? <Locations /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/users" 
          element={isAuthenticated ? <Users /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/settings" 
          element={isAuthenticated ? <Settings /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/horarios" 
          element={isAuthenticated ? <Horarios /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
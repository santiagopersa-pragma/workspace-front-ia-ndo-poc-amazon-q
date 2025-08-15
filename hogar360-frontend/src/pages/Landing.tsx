import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCasasWithDetails } from '../shared/mocks/casas';
import { Button } from '../components/atoms/Button';

export const Landing = () => {
  const [casas, setCasas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCasas();
  }, []);

  const loadCasas = async () => {
    try {
      const response = await getCasasWithDetails(1, 6);
      setCasas(response.data);
    } catch (error) {
      console.error('Error al cargar casas:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-poppins font-medium">
              <span className="text-primary-600">Hogar</span>
              <span className="text-black">360</span>
            </h1>
            
            <div className="flex items-center space-x-8">
              <nav className="hidden md:flex space-x-8">
                <button className="text-gray-700 hover:text-primary-600 font-medium">Compra</button>
                <button className="text-gray-700 hover:text-primary-600 font-medium">Renta</button>
                <button className="text-gray-700 hover:text-primary-600 font-medium">Venta</button>
              </nav>
              
              <Link to="/login">
                <Button className="bg-primary-600 text-white hover:bg-primary-700">Ingresar</Button>
              </Link>
            </div>

          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-poppins font-bold mb-6">
            Encuentra tu hogar ideal
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Miles de propiedades esperándote
          </p>
          <Link to="/login">
            <Button size="lg" className="bg-primary-600 text-white hover:bg-primary-700 font-medium px-8 py-4">
              Explorar Propiedades
            </Button>
          </Link>
        </div>
      </section>

      {/* Properties Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-poppins font-bold text-gray-900 mb-4">
              Propiedades Destacadas
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              Descubre las mejores opciones disponibles
            </p>
            
            {/* Search Bar */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                      <option>Tipo de propiedad</option>
                      <option>Casa</option>
                      <option>Apartamento</option>
                      <option>Local Comercial</option>
                    </select>
                  </div>
                  <div>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                      <option>Ubicación</option>
                      <option>Bogotá</option>
                      <option>Medellín</option>
                      <option>Cali</option>
                    </select>
                  </div>
                  <div>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                      <option>Precio</option>
                      <option>$100M - $300M</option>
                      <option>$300M - $500M</option>
                      <option>$500M+</option>
                    </select>
                  </div>
                  <div>
                    <Link to="/login">
                      <Button className="w-full bg-primary-600 text-white hover:bg-primary-700 px-4 py-3">
                        Buscar
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              [...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))
            ) : (
              casas.map((casa) => (
                <div key={casa.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-r from-primary-100 to-primary-200 flex items-center justify-center">
                    <span className="text-primary-600 font-medium">
                      {casa.categoria?.nombre || 'Propiedad'}
                    </span>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      {casa.nombre}
                    </h4>
                    <p className="text-gray-600 mb-2">
                      {casa.ciudad?.nombre}, {casa.ciudad?.departamento?.nombre}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      {casa.cantidadCuartos} cuartos • {casa.cantidadBanos} baños
                    </p>
                    <p className="text-2xl font-bold text-primary-600">
                      {formatPrice(casa.precio)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="text-center mt-12">
            <Link to="/login">
              <Button size="lg" className="bg-primary-600 text-white hover:bg-primary-700">Ver Todas las Propiedades</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-poppins font-bold text-gray-900 mb-4">
              ¿Por qué elegir Hogar360?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-600 text-2xl">🏠</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Amplia Variedad
              </h4>
              <p className="text-gray-600">
                Miles de propiedades en diferentes ubicaciones y categorías
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-600 text-2xl">🔍</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Búsqueda Fácil
              </h4>
              <p className="text-gray-600">
                Encuentra exactamente lo que buscas con nuestros filtros avanzados
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-600 text-2xl">✅</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Confianza Total
              </h4>
              <p className="text-gray-600">
                Propiedades verificadas y vendedores confiables
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-poppins font-bold mb-4">
            ¿Listo para encontrar tu hogar?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Únete a miles de personas que ya encontraron su lugar ideal
          </p>
          <Link to="/login">
            <Button size="lg" className="bg-primary-700 text-white hover:bg-primary-800 font-medium px-8 py-4">
              Comenzar Ahora
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <h4 className="text-2xl font-poppins font-medium mb-4">
                <span className="text-primary-600">Hogar</span>
                <span className="text-gray-900">360</span>
              </h4>
              <p className="text-gray-600 mb-4">
                Tu plataforma confiable para encontrar el hogar perfecto. Conectamos compradores y vendedores con las mejores propiedades del mercado.
              </p>
              <p className="text-gray-500 text-sm">
                © 2024 Hogar360. Todos los derechos reservados.
              </p>
            </div>
            
            {/* Services */}
            <div>
              <h5 className="font-semibold text-gray-900 mb-4">Servicios</h5>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-primary-600 transition-colors">Compra</a></li>
                <li><a href="#" className="hover:text-primary-600 transition-colors">Venta</a></li>
                <li><a href="#" className="hover:text-primary-600 transition-colors">Renta</a></li>
                <li><a href="#" className="hover:text-primary-600 transition-colors">Asesoría</a></li>
              </ul>
            </div>
            
            {/* Contact */}
            <div>
              <h5 className="font-semibold text-gray-900 mb-4">Contacto</h5>
              <ul className="space-y-2 text-gray-600">
                <li>+57 300 123 4567</li>
                <li>info@hogar360.com</li>
                <li>Bogotá, Colombia</li>
                <li><a href="#" className="hover:text-primary-600 transition-colors">Soporte</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-500 text-sm">
              © 2024 Hogar360. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
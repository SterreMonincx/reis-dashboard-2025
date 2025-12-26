import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: '🏠' },
    { path: '/itinerary', label: 'Planning', icon: '📅' },
    { path: '/tips', label: 'Tips & Restaurants', icon: '🍜' },
    { path: '/flights', label: 'Vluchten & Hotels', icon: '✈️' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4">
          <div className="flex items-center justify-between mb-4 md:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold text-primary-600">
              🌏 Reis Azië 2025/2026
            </h1>
          </div>
          
          <div className="flex flex-wrap gap-2 md:gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  location.pathname === item.path
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
        
        <div className="pb-4 text-sm text-gray-600 text-center md:text-left">
          26 december 2025 - 10 januari 2026 • Hong Kong, Singapore, Langkawi, Dubai
        </div>
      </div>
    </nav>
  );
};

export default Navigation;


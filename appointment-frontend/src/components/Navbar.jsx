import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Menu, X, CalendarClock } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' }, // Assuming a services page exists or it scrolls to section
  ];

  if (isAuthenticated) {
    if (user?.role === 'ADMIN') {
      navLinks.push({ name: 'Admin Panel', path: '/admin' });
    } else {
      navLinks.push({ name: 'Dashboard', path: '/dashboard' });
      navLinks.push({ name: 'Appointments', path: '/appointments' });
    }
    navLinks.push({ name: 'Profile', path: '/profile' });
  }

  return (
    <div className="fixed top-6 left-0 w-full z-50 flex justify-center px-4 pointer-events-none fade-in">
      <nav className="bg-white/80 backdrop-blur-lg shadow-xl shadow-blue-900/5 border border-gray-200/60 rounded-full pointer-events-auto transition-all duration-300">
        <div className="px-4 py-3 sm:px-6">
          <div className="flex items-center gap-4 sm:gap-8">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full text-white shadow-md group-hover:scale-105 transition-transform">
                <CalendarClock className="h-5 w-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-gray-900 hidden lg:block">BookIt</span>
            </Link>

            {/* Desktop Menu - Tabs */}
            <div className="hidden md:flex items-center bg-gray-50/80 p-1 rounded-full border border-gray-100">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="px-5 py-2 rounded-full text-sm font-semibold text-gray-600 hover:text-blue-600 hover:bg-white hover:shadow-sm transition-all text-center"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center">
              {isAuthenticated ? (
                <button 
                  onClick={handleLogout}
                  className="px-5 py-2.5 text-sm font-bold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors ml-2"
                >
                  Logout
                </button>
              ) : (
                <div className="flex items-center gap-1 bg-gray-50/80 p-1 rounded-full border border-gray-100 ml-2">
                  <Link to="/login" className="px-5 py-2 rounded-full text-sm font-semibold text-gray-600 hover:text-blue-600 hover:bg-white hover:shadow-sm transition-all">
                    Log in
                  </Link>
                  <Link to="/register" className="px-5 py-2 rounded-full text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-all">
                    Sign up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden ml-auto">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-full focus:outline-none transition-colors"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="absolute top-[calc(100%+10px)] left-0 w-full min-w-[250px] bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden fade-in">
            <div className="p-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-2xl text-base font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 text-center"
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-gray-100 my-2"></div>
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block w-full px-4 py-3 rounded-2xl text-base font-bold text-red-600 hover:bg-red-50 text-center"
                >
                  Logout
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 rounded-2xl text-base font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 text-center"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 rounded-2xl text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 text-center shadow-md"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
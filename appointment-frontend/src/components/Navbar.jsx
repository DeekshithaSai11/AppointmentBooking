import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Menu, X, Calendar } from 'lucide-react';

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
    { name: 'Services', path: '/services' },
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
    <nav className="fixed w-full top-0 pt-4 px-4 z-[100] transition-all duration-300 pointer-events-none">
      <div className="max-w-6xl mx-auto backdrop-blur-3xl bg-[#ffffff08] border border-white/10 rounded-[2rem] shadow-2xl px-6 pointer-events-auto hover:bg-[#ffffff0d] transition-colors duration-500">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(6,182,212,0.5)]">
               <Calendar className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-100 group-hover:to-cyan-400 transition-colors tracking-tight">
              BookIt
            </span>
          </Link>

          {/* Desktop Menu - Tabs */}
          <div className="hidden md:flex items-center bg-slate-800/80 p-1 rounded-full border border-white/5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="px-5 py-2 rounded-full text-base font-semibold text-slate-300 hover:text-cyan-400 hover:bg-slate-700 hover:shadow-sm transition-all text-center"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            {isAuthenticated ? (
              <button 
                onClick={handleLogout}
                className="px-5 py-2.5 text-base font-bold text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-colors ml-2"
              >
                Logout
              </button>
            ) : (
              <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-full border border-white/5 ml-2">
                <Link to="/login" className="px-5 py-2 rounded-full text-base font-semibold text-slate-300 hover:text-cyan-400 hover:bg-slate-700 hover:shadow-sm transition-all">
                  Log in
                </Link>
                <Link to="/register" className="px-5 py-2 rounded-full text-base font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all">
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden ml-auto">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-300 hover:bg-slate-800 rounded-full focus:outline-none transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-[calc(100%+10px)] left-0 w-full min-w-[250px] bg-slate-900 rounded-3xl shadow-2xl border border-white/10 overflow-hidden fade-in">
          <div className="p-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-2xl text-base font-semibold text-slate-300 hover:text-cyan-400 hover:bg-slate-800 text-center"
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px bg-white/10 my-2"></div>
            {isAuthenticated ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="block w-full px-4 py-3 rounded-2xl text-base font-bold text-red-500 hover:bg-red-500/10 text-center"
              >
                Logout
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-2xl text-base font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 text-center"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-2xl text-base font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-center shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
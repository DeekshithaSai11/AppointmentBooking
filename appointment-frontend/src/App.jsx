import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import SpinWheel from './components/SpinWheel';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Hospital from './pages/Hospital';
import Salon from './pages/Salon';
import VehicleRepair from './pages/VehicleRepair';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';
import Profile from './pages/Profile';
import Booking from './pages/Booking';
import AdminPanel from './pages/AdminPanel';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading } = React.useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0f172a]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen relative overflow-x-hidden">
          {/* MAGICAL GLOBAL SPARKLES OVERLAY */}
          <div className="fixed inset-0 pointer-events-none z-0">
            {[...Array(25)].map((_, i) => (
              <div 
                key={i} 
                className="absolute rounded-full bg-white animate-pulse"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  boxShadow: '0 0 10px 2px rgba(255,255,255,0.7)',
                  animationDuration: `${Math.random() * 3 + 1}s`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>

          <Navbar />
          
          <main className="flex-grow pt-32 relative z-10 w-full max-w-[100vw] overflow-hidden">
            <Routes>
              {/* Public Routes */}
              <Route path="/services" element={<Services />} />
              <Route path="/services/hospital" element={<Hospital />} />
              <Route path="/services/salon" element={<Salon />} />
              <Route path="/services/vehicle-repair" element={<VehicleRepair />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Routes */}
              <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/appointments" element={<ProtectedRoute><Appointments /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/booking" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
              
              {/* Admin Route */}
              <Route path="/admin" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminPanel /></ProtectedRoute>} />
              
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          
          <Footer />
          <Chatbot />
          <SpinWheel />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

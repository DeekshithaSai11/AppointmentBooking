import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

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

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Navbar />
          
          <main className="flex-grow pt-32">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/hospital" element={<Hospital />} />
              <Route path="/services/salon" element={<Salon />} />
              <Route path="/services/vehicle-repair" element={<VehicleRepair />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Routes (In a real app, wrap in a ProtectedRoute component) */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/booking" element={<Booking />} />
              
              {/* Admin Route */}
              <Route path="/admin" element={<AdminPanel />} />
              
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          
          <Footer />
          <Chatbot />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

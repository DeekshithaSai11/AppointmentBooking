import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { appointmentService } from '../services/appointmentService';
import AppointmentCard from '../components/AppointmentCard';
import { Link } from 'react-router-dom';
import { CalendarClock, PlusCircle, AlertCircle } from 'lucide-react';
import SpinWheel from '../components/SpinWheel';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      // Fetch user specific appointments (Assuming backend filters by user token)
      const data = await appointmentService.getAppointments();
      const userAppointments = (data || []).filter(app => 
        app.userName === user?.name || 
        app.user?.email === user?.email || 
        app.user?.name === user?.name
      );
      setAppointments(userAppointments);
    } catch (err) {
      setError('Failed to load appointments. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const activeAppointments = appointments.filter(a => a.status !== 'CANCELLED' && a.status !== 'cancelled');

  return (
    <div className="max-w-7xl mx-auto px-6 text-center flex flex-col items-center min-h-screen pt-16 pb-20">
      <SpinWheel />
      <div className="w-full text-left space-y-10">
        
        {/* Header Section */}
        <div className="bg-slate-900/50 backdrop-blur-md rounded-[2rem] p-10 shadow-sm border border-white/10 flex flex-col md:flex-row md:items-center justify-between fade-in relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-500/20 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl opacity-60 pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-fuchsia-500/20 to-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold text-xs uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              Dashboard Overview
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-500 mb-4 tracking-tighter drop-shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              Welcome back, {user?.name || 'User'}!
            </h1>
            <p className="text-lg text-slate-400 font-medium">Manage and track all your upcoming service appointments.</p>
          </div>
          <div className="mt-8 md:mt-0 relative z-10">
            <Link to="/#services" className="btn-primary py-3.5 px-6 flex items-center justify-center gap-2 text-base">
              <PlusCircle className="w-5 h-5" />
              Book New Appointment
            </Link>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-3 fade-in">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Quick Stats */}
          <div className="lg:col-span-1 space-y-6 fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="bg-slate-900/50 backdrop-blur-md p-8 rounded-3xl shadow-sm border border-white/10 relative overflow-hidden group hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] hover:-translate-y-1 transition-all duration-300">
              <div className="absolute top-0 right-0 p-8 opacity-5 text-indigo-400 transform group-hover:scale-110 transition-transform">
                <CalendarClock className="w-32 h-32" />
              </div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 bg-indigo-500/20 text-indigo-400 rounded-2xl shadow-inner border border-indigo-500/30">
                    <CalendarClock className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Bookings</h3>
                    <p className="text-4xl font-extrabold text-white mt-1">{activeAppointments.length}</p>
                  </div>
                </div>
                <div className="mt-auto pt-6 border-t border-white/10">
                  <Link to="/appointments" className="text-indigo-400 text-sm font-semibold hover:text-indigo-300 flex items-center justify-between group-hover:translate-x-1 transition-transform inline-flex w-full">
                    View Complete History <span className="text-lg leading-none">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Active Appointments List */}
          <div className="lg:col-span-2 fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="bg-slate-900/50 backdrop-blur-md p-8 rounded-3xl shadow-sm border border-white/10">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
                <h2 className="text-2xl font-bold text-white tracking-tight">Upcoming Appointments</h2>
                <div className="px-3 py-1 bg-slate-800 text-slate-400 rounded-full text-xs font-bold tracking-wider uppercase border border-white/5">
                  {activeAppointments.length} Total
                </div>
              </div>
              
              {loading ? (
                <div className="flex justify-center p-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                </div>
              ) : activeAppointments.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {activeAppointments.map(appointment => (
                    <AppointmentCard 
                      key={appointment.id} 
                      appointment={appointment} 
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-slate-800/30 rounded-xl border border-dashed border-white/10">
                  <CalendarClock className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 mb-5">You have no upcoming appointments.</p>
                  <Link to="/#services" className="btn-secondary">
                    Book one now
                  </Link>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

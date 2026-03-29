import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { appointmentService } from '../services/appointmentService';
import AppointmentCard from '../components/AppointmentCard';
import { Calendar, AlertCircle, CalendarX } from 'lucide-react';

const Appointments = () => {
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
      const data = await appointmentService.getAppointments();
      const userAppointments = (data || []).filter(app =>
        app.userName === user?.name ||
        app.user?.email === user?.email ||
        app.user?.name === user?.name
      );
      setAppointments(userAppointments);
    } catch (err) {
      setError('Failed to load your appointment history.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await appointmentService.deleteAppointment(id); // Using the admin delete or custom user cancel if available in backend
        setAppointments(appointments.map(a => a.id === id ? { ...a, status: 'CANCELLED' } : a));
      } catch (err) {
        alert('Failed to cancel appointment. It may already be cancelled or you lack permissions.');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 text-center flex flex-col items-center min-h-screen pt-24 pb-20 relative">

      <div className="w-full max-w-5xl mx-auto flex flex-col items-center space-y-10 fade-in text-left relative z-10">

        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-cyan-400 to-blue-500 tracking-tight drop-shadow-[0_0_20px_rgba(6,182,212,0.5)] mb-4">Your Appointments</h1>
          <p className="text-slate-300 font-medium text-lg">Manage your secured slots and browse history!</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-3 rounded-2xl flex items-start justify-center gap-3 w-full shadow-[0_0_15px_rgba(239,68,68,0.3)]">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p className="font-bold tracking-wider">{error}</p>
          </div>
        )}

        <div className="w-full bg-slate-900/60 backdrop-blur-xl rounded-[2.5rem] shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/10 p-8 md:p-12 relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] -z-10 animate-pulse"></div>

          {loading ? (
            <div className="flex justify-center p-16">
              <div className="animate-spin rounded-full h-14 w-14 border-4 border-cyan-500/30 border-t-cyan-400"></div>
            </div>
          ) : appointments.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
              {appointments.map(appointment => (
                <div key={appointment.id} className="transform hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] transition-all duration-300 rounded-[1.5rem]">
                  <AppointmentCard
                    appointment={appointment}
                    onCancel={handleCancel}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 fade-in">
              <div className="w-24 h-24 bg-slate-800 rounded-full border-2 border-dashed border-cyan-500/50 flex items-center justify-center mb-6 shadow-inner">
                <CalendarX className="w-10 h-10 text-cyan-500 animate-pulse" />
              </div>
              <p className="text-white text-2xl font-black mb-2">No Appointments Found</p>
              <p className="text-slate-400 font-medium mb-6">Explore our services to lock in your first magical slot!</p>
              <button
                onClick={() => window.location.href = '/services'}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 rounded-full font-black text-white hover:scale-105 transition-transform shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              >
                Book Now
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Appointments;

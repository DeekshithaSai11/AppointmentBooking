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
    <div className="max-w-7xl mx-auto px-6 text-center flex flex-col items-center min-h-screen pt-12 pb-20">
      <div className="w-full max-w-4xl mx-auto space-y-8 fade-in text-left">
        
        <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white/10 flex items-center gap-4">
          <div className="p-4 bg-indigo-500/20 text-indigo-400 rounded-xl">
            <Calendar className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Your Appointments</h1>
            <p className="text-slate-400 mt-1">Review your past and upcoming service bookings.</p>
          </div>
        </div>

        {error && (
           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-3">
             <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
             <p>{error}</p>
           </div>
        )}

        <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl shadow-sm border border-white/10 p-6">
          {loading ? (
            <div className="flex justify-center p-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500"></div>
            </div>
          ) : appointments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {appointments.map(appointment => (
                <AppointmentCard 
                  key={appointment.id} 
                  appointment={appointment} 
                  onCancel={handleCancel}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 fade-in">
              <CalendarX className="w-16 h-16 text-slate-500 mb-4 opacity-50" />
              <p className="text-slate-500 text-lg font-medium">No Appointments Yet</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Appointments;

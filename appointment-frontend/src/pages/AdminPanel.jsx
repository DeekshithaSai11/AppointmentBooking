import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { appointmentService } from '../services/appointmentService';
import { Users, Calendar, Trash2, Search, AlertCircle, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('appointments');
  const [data, setData] = useState({ users: [], appointments: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      navigate('/dashboard');
      return;
    }
    fetchData();
  }, [user, navigate, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      if (activeTab === 'users') {
        const users = await appointmentService.getAdminUsers();
        setData(prev => ({ ...prev, users: users || [] }));
      } else {
        const apps = await appointmentService.getAdminAppointments();
        setData(prev => ({ ...prev, appointments: apps || [] }));
      }
    } catch (err) {
      setError(`Failed to load ${activeTab} data.`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAppointment = async (id) => {
    if (window.confirm('Are you sure you want to delete this appointment? This action cannot be undone.')) {
      try {
        await appointmentService.deleteAppointment(id);
        setData(prev => ({
          ...prev,
          appointments: prev.appointments.filter(app => app.id !== id)
        }));
      } catch (err) {
        alert('Failed to delete appointment.');
      }
    }
  };

  const filteredAppointments = data.appointments.filter(app => {
    const userName = app.userName || app.user?.name || '';
    const userEmail = app.user?.email || '';
    const placeName = typeof app.place === 'string' ? app.place : (app.place?.name || '');
    
    return userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
           userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
           placeName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredUsers = data.users.filter(u => 
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 text-center flex flex-col items-center min-h-screen pt-12 pb-20">
      <div className="w-full text-left space-y-8 fade-in">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/50 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-500/20 text-red-500 border border-red-500/30 rounded-xl">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-white">Admin Dashboard</h1>
              <p className="text-slate-400 font-medium">Manage system users and global appointments</p>
            </div>
          </div>
        </div>

        {error && (
           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-3">
             <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
             <p>{error}</p>
           </div>
        )}

        {/* Content Area */}
        <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl shadow-sm border border-white/10 overflow-hidden">
          
          {/* Tabs */}
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setActiveTab('appointments')}
              className={`flex-1 py-4 px-6 text-center font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-colors ${
                activeTab === 'appointments' ? 'bg-indigo-500/20 text-indigo-400 border-b-2 border-indigo-500' : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'
              }`}
            >
              <Calendar className="w-5 h-5" />
              All Appointments
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`flex-1 py-4 px-6 text-center font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-colors ${
                activeTab === 'users' ? 'bg-indigo-500/20 text-indigo-400 border-b-2 border-indigo-500' : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'
              }`}
            >
              <Users className="w-5 h-5" />
              Users Database
            </button>
          </div>

          {/* Search and Filter */}
          <div className="p-6 bg-slate-950/50 border-b border-white/10">
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10 bg-white"
              />
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
              </div>
            ) : activeTab === 'appointments' ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900/50 border-b border-white/10">
                    <th className="py-4 px-6 font-semibold text-sm text-slate-400 uppercase tracking-wider">ID</th>
                    <th className="py-4 px-6 font-semibold text-sm text-slate-400 uppercase tracking-wider">User</th>
                    <th className="py-4 px-6 font-semibold text-sm text-slate-400 uppercase tracking-wider">Location / Service</th>
                    <th className="py-4 px-6 font-semibold text-sm text-slate-400 uppercase tracking-wider">Date & Time</th>
                    <th className="py-4 px-6 font-semibold text-sm text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="py-4 px-6 font-semibold text-sm text-slate-400 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredAppointments.length > 0 ? filteredAppointments.map(app => (
                    <tr key={app.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="py-4 px-6 text-sm text-slate-500">#{app.id}</td>
                      <td className="py-4 px-6">
                        <div className="font-medium text-white">{app.userName || app.user?.name || 'Unknown'}</div>
                        <div className="text-sm text-slate-400">{app.user?.email || ''}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-medium text-white">{typeof app.place === 'string' ? app.place : (app.place?.name || '-')}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-white">{app.date}</div>
                        <div className="text-sm font-medium text-indigo-400">{app.slot}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          app.status === 'CANCELLED' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}>
                          {app.status || 'CONFIRMED'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleDeleteAppointment(app.id)}
                          className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors inline-block"
                          title="Delete Appointment"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="6" className="py-12 text-center text-slate-500">No appointments found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900/50 border-b border-white/10">
                    <th className="py-4 px-6 font-semibold text-sm text-slate-400 uppercase tracking-wider">ID</th>
                    <th className="py-4 px-6 font-semibold text-sm text-slate-400 uppercase tracking-wider">Name</th>
                    <th className="py-4 px-6 font-semibold text-sm text-slate-400 uppercase tracking-wider">Email</th>
                    <th className="py-4 px-6 font-semibold text-sm text-slate-400 uppercase tracking-wider">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredUsers.length > 0 ? filteredUsers.map(u => (
                    <tr key={u.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="py-4 px-6 text-sm text-slate-500">#{u.id}</td>
                      <td className="py-4 px-6 font-medium text-white">{u.name}</td>
                      <td className="py-4 px-6 text-slate-400">{u.email}</td>
                      <td className="py-4 px-6">
                         <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          u.role === 'ADMIN' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-slate-800 text-slate-400 border border-white/10'
                        }`}>
                          {u.role || 'USER'}
                        </span>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="4" className="py-12 text-center text-slate-500">No users found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminPanel;

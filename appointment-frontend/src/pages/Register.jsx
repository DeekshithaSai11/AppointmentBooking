import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { Mail, Lock, User, Shield, AlertCircle, UserPlus } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'USER' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = (role) => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.register(formData);
      // Optional: Auto login after register, wait let's just redirect to login for simplicity.
      navigate('/login', { state: { message: 'Registration successful! Please login.' } });
    } catch (err) {
      setError(err.message || 'Failed to create an account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-slate-900/50 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-white/10 fade-in">
        <div>
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-indigo-500/20 shadow-inner border border-indigo-500/30 text-indigo-400 rounded-full flex items-center justify-center mb-2">
              <UserPlus className="w-8 h-8 mr-1" />
            </div>
          </div>
          <h2 className="mt-4 text-center text-3xl font-extrabold text-white tracking-tight">
            Create an account
          </h2>
          <p className="mt-2 text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-3 fade-in">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm">{error}</p>
            </div>
          )}
          
          <div className="space-y-4">
            {/* Role Selection */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => handleRoleSelect('USER')}
                className={`flex-1 flex flex-col items-center p-4 rounded-xl border transition-all ${
                  formData.role === 'USER' 
                    ? 'border-indigo-500 bg-indigo-500/20 text-indigo-400 shadow-sm' 
                    : 'border-white/10 bg-slate-950/50 text-slate-400 hover:border-indigo-500/50 hover:bg-slate-800/50'
                }`}
              >
                <User className="w-6 h-6 mb-2" />
                <span className="font-semibold">User</span>
              </button>
              <button
                type="button"
                onClick={() => handleRoleSelect('ADMIN')}
                className={`flex-1 flex flex-col items-center p-4 rounded-xl border transition-all ${
                  formData.role === 'ADMIN' 
                    ? 'border-indigo-500 bg-indigo-500/20 text-indigo-400 shadow-sm' 
                    : 'border-white/10 bg-slate-950/50 text-slate-400 hover:border-indigo-500/50 hover:bg-slate-800/50'
                }`}
              >
                <Shield className="w-6 h-6 mb-2" />
                <span className="font-semibold">Admin</span>
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full bg-slate-950/50 border border-white/10 text-white pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-500"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full bg-slate-950/50 border border-white/10 text-white pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-500"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full bg-slate-950/50 border border-white/10 text-white pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-500"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-3 px-4 ${loading ? 'opacity-70 cursor-not-allowed' : ''} btn-primary text-lg`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Registering...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

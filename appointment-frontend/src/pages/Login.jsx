import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { authService } from '../services/authService';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login(formData.email, formData.password);
      login(response.user || response, response.token); 
      
      const role = response.user?.role || response.role;
      if (role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/'); // Redirect to Home default
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px] -z-10 animate-[pulse_4s_ease-in-out_infinite]"></div>

      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-900/60 backdrop-blur-xl p-8 md:p-14 rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 relative z-10">
        
        {/* Left Side: Animated Mascot */}
        <div className="hidden md:flex flex-col items-center justify-center relative fade-in md:border-r border-white/10 md:pr-12">
            
           <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-fuchsia-400 mb-12 text-center drop-shadow-[0_0_15px_rgba(6,182,212,0.3)] tracking-tight">
             Welcome!
           </h2>
           
           {/* CSS Mascot Container */}
           <div className="relative w-48 h-56 drop-shadow-[0_0_25px_rgba(217,70,239,0.3)] hover:scale-105 transition-transform duration-500 cursor-pointer">
              {/* Head */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-24 bg-[#0f172a] rounded-[2.5rem] border-4 border-cyan-400 shadow-inner flex items-center justify-center overflow-hidden z-20">
                {/* Screen reflection */}
                <div className="absolute top-0 right-0 w-16 h-32 bg-white/5 rotate-45 transform translate-x-4"></div>
                {/* Eyes */}
                <div className="flex gap-5 mt-2">
                  <div className="w-6 h-10 bg-cyan-300 rounded-full animate-pulse shadow-[0_0_20px_rgba(6,182,212,0.9)] scale-y-100 animate-[blink_4s_infinite]"></div>
                  <div className="w-6 h-10 bg-cyan-300 rounded-full animate-pulse shadow-[0_0_20px_rgba(6,182,212,0.9)] scale-y-100 animate-[blink_4s_infinite]"></div>
                </div>
              </div>
              
              {/* Neck */}
              <div className="absolute top-22 left-1/2 -translate-x-1/2 w-8 h-8 bg-slate-700 border-2 border-slate-600 z-10"></div>

              {/* Body */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-28 bg-gradient-to-b from-[#0f172a] to-slate-800 rounded-[2rem] border-4 border-fuchsia-400 z-10 flex flex-col items-center justify-center">
                 {/* Chest logo */}
                 <div className="w-10 h-10 rounded-full bg-cyan-500/20 border-2 border-cyan-400/50 flex items-center justify-center mt-2 shadow-[0_0_15px_rgba(217,70,239,0.5)]">
                   <div className="w-3 h-3 bg-fuchsia-400 rounded-full animate-pulse"></div>
                 </div>
              </div>
              
              {/* Waving Arm Left (Robot's right) */}
              <div className="absolute top-28 -left-4 origin-bottom-right rotate-[30deg] z-0">
                <div className="w-6 h-20 bg-slate-800 rounded-full border-2 border-cyan-500 shadow-inner"></div>
              </div>

              {/* Energetically Waving Arm Right (Robot's left) */}
              <div className="absolute top-16 -right-6 origin-bottom-left animate-[wave_1s_ease-in-out_infinite] z-30">
                <div className="w-7 h-20 bg-gradient-to-t from-fuchsia-600 to-cyan-400 rounded-full border-2 border-white shadow-[0_0_20px_rgba(217,70,239,0.8)] flex items-start justify-center pt-1">
                   {/* Hand bulb */}
                   <div className="w-9 h-9 bg-white rounded-full -mt-2 blur-[2px] opacity-80"></div>
                </div>
              </div>
           </div>
           
           <p className="mt-12 text-slate-300 text-center font-medium opacity-90 max-w-sm leading-relaxed border border-white/5 bg-slate-800/50 p-4 rounded-2xl shadow-inner">
             Log in now to unlock your <strong className="text-cyan-400">Personal Dashboard</strong>, manage bookings, and <strong className="text-fuchsia-400">Spin the Wheel</strong> for Daily discounts!
           </p>
        </div>

        {/* Right Side: Form */}
        <div className="flex flex-col justify-center space-y-6 md:pl-6 w-full max-w-md mx-auto fade-in" style={{animationDelay: '0.2s'}}>
          <div className="text-center md:text-left">
            <div className="flex justify-center md:justify-start">
              <div className="w-16 h-16 bg-fuchsia-500/10 shadow-[0_0_20px_rgba(217,70,239,0.2)] border border-fuchsia-500/30 text-fuchsia-400 rounded-2xl flex items-center justify-center mb-4 transform rotate-3">
                <LogIn className="w-8 h-8 ml-1" />
              </div>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Sign In to Account
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              New to BookIt?{' '}
              <Link to="/register" className="font-bold text-cyan-400 hover:text-cyan-300 hover:underline transition-all">
                Create a free account
              </Link>
            </p>
          </div>
          
          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl flex items-start gap-3 fade-in shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}
            
            <div className="space-y-4">
              <div className="group">
                <label className="block text-sm font-semibold text-slate-300 mb-1.5 group-focus-within:text-cyan-400 transition-colors">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                  </div>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full bg-slate-900/60 border border-slate-700 text-white pl-12 pr-4 py-3.5 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all placeholder:text-slate-600 shadow-inner"
                    placeholder="name@email.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="group">
                <label className="block text-sm font-semibold text-slate-300 mb-1.5 group-focus-within:text-cyan-400 transition-colors">Secure Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                  </div>
                  <input
                    name="password"
                    type="password"
                    required
                    className="w-full bg-slate-900/60 border border-slate-700 text-white pl-12 pr-4 py-3.5 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all placeholder:text-slate-600 shadow-inner"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-4 px-4 rounded-xl font-black text-lg transition-all duration-300 ${
                  loading 
                  ? 'bg-slate-700 cursor-not-allowed text-slate-400 scale-95' 
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:-translate-y-1'
                }`}
              >
                {loading ? (
                  <span className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Authenticating...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
          </form>
        </div>

      </div>
      
      {/* Custom keyframes injected safely inline using standard tailwind config or vanilla css approach via style tag */}
      <style dangerouslySetInnerHTML={{__html:`
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-25deg); }
          50% { transform: rotate(15deg); }
          75% { transform: rotate(-10deg); }
        }
        @keyframes blink {
          0%, 96%, 98% { transform: scaleY(1); opacity: 1; }
          97% { transform: scaleY(0.1); opacity: 0.5; }
        }
      `}} />
    </div>
  );
};

export default Login;

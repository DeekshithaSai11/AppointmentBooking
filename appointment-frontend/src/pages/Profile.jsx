import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, Shield, LogOut, Gift, Ticket, Scissors } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    // Load coupons from gamification wheel
    const saved = localStorage.getItem('userCoupons');
    if (saved) {
      try {
        setCoupons(JSON.parse(saved));
      } catch (e) { }
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-transparent py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10 fade-in">
        
        <div className="flex justify-center items-center gap-3 mb-2">
           <div className="w-10 h-10 bg-cyan-500/20 rounded-full border border-cyan-500/50 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
             <User className="w-5 h-5" />
           </div>
           <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-sm">
             Personal Profile
           </h1>
        </div>
        
        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden relative">
          
          {/* Header Graphic Background */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-fuchsia-600 h-40 relative overflow-hidden">
             <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>
             {/* decorative circles */}
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
             <div className="absolute -bottom-20 left-20 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="px-8 pb-10">
            {/* Avatar & Action row */}
            <div className="relative flex justify-between items-end -mt-16 mb-8">
              <div className="w-32 h-32 bg-slate-900 rounded-full p-2 shadow-xl border-4 border-[#0f172a] flex items-center justify-center relative z-10">
                <div className="bg-gradient-to-br from-cyan-400 to-blue-600 w-full h-full rounded-full flex items-center justify-center text-white shadow-inner">
                  <User className="w-12 h-12" />
                </div>
              </div>
              
              <button 
                onClick={handleLogout}
                className="btn-secondary text-red-400 hover:text-red-300 hover:bg-red-500/10 hover:border-red-500/50 flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all shadow-sm"
              >
                <LogOut className="w-4 h-4" />
                Secure Logout
              </button>
            </div>
            
            {/* User Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4 bg-slate-800/40 p-8 rounded-3xl border border-white/5 shadow-inner">
              <div className="space-y-8">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                  <div className="mt-2 flex items-center gap-4 bg-slate-900/50 p-4 rounded-xl border border-white/5">
                    <User className="w-5 h-5 text-cyan-400" />
                    <span className="text-xl font-black text-white">{user?.name || 'Jane Doe'}</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                  <div className="mt-2 flex items-center gap-4 bg-slate-900/50 p-4 rounded-xl border border-white/5">
                    <Mail className="w-5 h-5 text-blue-400" />
                    <span className="text-lg text-slate-200 font-semibold">{user?.email || 'jane@example.com'}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Account Role</label>
                  <div className="mt-2 flex items-center gap-4 bg-slate-900/50 p-4 rounded-xl border border-white/5">
                    <Shield className="w-5 h-5 text-fuchsia-400" />
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black tracking-widest bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30 uppercase shadow-[0_0_10px_rgba(217,70,239,0.2)]">
                      {user?.role || 'User'}
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Account Status</label>
                  <div className="mt-2 flex items-center gap-4 bg-slate-900/50 p-4 rounded-xl border border-white/5">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.3)]">
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></div>
                    </div>
                    <span className="text-lg text-white font-black">Active & Verified</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Gamification Rewards Wallet */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-fuchsia-500/30 rounded-[2rem] p-8 md:p-10 shadow-[0_0_40px_rgba(217,70,239,0.1)] fade-in relative overflow-hidden" style={{animationDelay: '0.2s'}}>
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-[80px] -z-10 animate-pulse"></div>

          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
            <div className="w-14 h-14 rounded-2xl bg-fuchsia-500/20 text-fuchsia-400 flex items-center justify-center border border-fuchsia-500/40 shadow-[0_0_20px_rgba(217,70,239,0.4)] transform -rotate-6">
              <Gift className="w-7 h-7 animate-bounce" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-white tracking-tight">My Rewards Wallet</h2>
              <p className="text-slate-400 text-sm font-medium mt-1">Discounts & coupons won from Spin the Wheel.</p>
            </div>
          </div>
          
          {coupons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Always provide New User 10% coupon artificially if they have any coupons at all, or just map array */}
              {coupons.map((c, i) => (
                <div key={i} className="relative overflow-hidden bg-gradient-to-br from-slate-800 to-[#0f172a] border border-cyan-500/40 rounded-3xl p-6 flex flex-col group shadow-md hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] transition-all transform hover:-translate-y-1">
                  
                  {/* Ticket cutouts */}
                  <div className="absolute top-1/2 -left-3 w-6 h-6 bg-[#0f172a] rounded-full -translate-y-1/2 border-r border-cyan-500/40"></div>
                  <div className="absolute top-1/2 -right-3 w-6 h-6 bg-[#0f172a] rounded-full -translate-y-1/2 border-l border-cyan-500/40"></div>
                  
                  {/* Dashed line */}
                  <div className="absolute top-1/2 left-4 right-4 h-px border-t-2 border-dashed border-white/10 -translate-y-1/2"></div>
                  
                  <div className="pb-6 flex items-start justify-between">
                    <div>
                      <p className="text-xs text-cyan-400 font-bold uppercase tracking-widest mb-1 shadow-sm">Discount Status</p>
                      <h3 className="text-3xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">{c.code}</h3>
                    </div>
                    <Ticket className="w-8 h-8 text-cyan-500/50" />
                  </div>
                  
                  <div className="pt-6 flex justify-between items-center z-10">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Acquired On<br/>{new Date(c.date).toLocaleDateString()}</span>
                    <button className="bg-cyan-500/20 text-cyan-300 text-xs font-black uppercase px-4 py-2 rounded-full border border-cyan-500/50 hover:bg-cyan-500 hover:text-white transition-colors flex items-center gap-1 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                      <Scissors className="w-3 h-3" /> Use Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-900/50 rounded-3xl border border-dashed border-white/10">
              <Ticket className="w-16 h-16 text-slate-600 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-bold text-white mb-2">No Rewards Yet!</h3>
              <p className="text-slate-400 font-medium">Log out and log back in to trigger your Daily Spin for a chance to win massive discounts.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile;

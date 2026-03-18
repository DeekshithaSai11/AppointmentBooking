import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, Shield, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8 fade-in">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          Personal Profile
        </h1>
        
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 h-32"></div>
          
          <div className="px-8 pb-8">
            <div className="relative flex justify-between items-end -mt-12 mb-6">
              <div className="w-24 h-24 bg-white rounded-full p-2 shadow-sm border border-gray-100 flex items-center justify-center">
                <div className="bg-blue-100 text-blue-600 w-full h-full rounded-full flex items-center justify-center">
                  <User className="w-10 h-10" />
                </div>
              </div>
              
              <button 
                onClick={handleLogout}
                className="btn-secondary text-red-600 hover:text-red-700 hover:bg-red-50 border-gray-200 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Full Name</label>
                  <div className="mt-1 flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <span className="text-lg font-medium text-gray-900">{user?.name || 'Jane Doe'}</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email Address</label>
                  <div className="mt-1 flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="text-lg text-gray-900">{user?.email || 'jane@example.com'}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Account Role</label>
                  <div className="mt-1 flex items-center gap-3">
                    <Shield className="w-5 h-5 text-gray-400" />
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {user?.role || 'User'}
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Account Status</label>
                  <div className="mt-1 flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-lg text-gray-900">Active</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

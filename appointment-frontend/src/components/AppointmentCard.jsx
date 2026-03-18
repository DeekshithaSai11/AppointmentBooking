import React from 'react';
import { Calendar, Clock, MapPin, XCircle, CheckCircle } from 'lucide-react';

const AppointmentCard = ({ appointment, onCancel, isAdmin }) => {
  const { id, place, date, slot, status, user } = appointment;
  
  // Format date efficiently
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const getStatusBadge = () => {
    switch (status) {
      case 'CONFIRMED':
      case 'confirmed':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle className="w-3 h-3"/> Confirmed</span>;
      case 'CANCELLED':
      case 'cancelled':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"><XCircle className="w-3 h-3"/> Cancelled</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Pending</span>;
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow relative">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-bold text-gray-900 text-lg">
            {typeof place === 'string' ? place : (place?.name || 'Service Location')}
          </h4>
          <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5" />
            {typeof place === 'object' && place?.location ? place.location : 'Location details'}
          </p>
        </div>
        <div>
          {getStatusBadge()}
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-3 grid grid-cols-2 gap-3 mb-4 border border-gray-100">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Calendar className="w-4 h-4 text-blue-500" />
          <span className="font-medium">{formattedDate}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Clock className="w-4 h-4 text-blue-500" />
          <span className="font-medium">{slot}</span>
        </div>
      </div>

      {isAdmin && (user || appointment.userName) && (
        <div className="mb-4 pt-3 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800">User:</span> {user?.name || appointment.userName} {user?.email && `(${user.email})`}
          </p>
        </div>
      )}

      {(status !== 'CANCELLED' && status !== 'cancelled') && onCancel && (
        <div className="flex justify-end mt-2">
          <button 
            onClick={() => onCancel(id)}
            className="text-sm text-red-600 hover:text-red-800 font-medium py-1 px-3 rounded hover:bg-red-50 transition-colors flex items-center gap-1 border border-transparent hover:border-red-200"
          >
            <XCircle className="w-4 h-4" />
            Cancel Appointment
          </button>
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;

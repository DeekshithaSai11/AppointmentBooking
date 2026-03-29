import React from 'react';
import { MapPin, Clock, Tag, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ServiceCard = ({ id, name, location, serviceType, image }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate('/booking', { state: { selectedServiceId: id } });
  };

  return (
    <div className="card group flex flex-col h-full fade-in cursor-pointer border-transparent hover:border-blue-100">
      <div className="relative h-60 overflow-hidden bg-transparent">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=Service';
          }}
        />
        <div className="absolute top-4 right-4 bg-slate-800/80 backdrop-blur-md border border-white/10/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-blue-800 shadow-sm flex items-center gap-1">
          <Tag className="w-3 h-3" />
          {serviceType}
        </div>
      </div>
      
      <div className="p-8 flex-grow flex flex-col bg-slate-800/80 backdrop-blur-md border border-white/10">
        <h3 className="text-2xl font-bold text-white font-bold mb-3 group-hover:text-blue-600 transition-colors tracking-tight">
          {name}
        </h3>
        
        <div className="flex items-start gap-3 text-slate-400 mb-4 text-sm font-medium">
          <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-500/70" />
          <span className="leading-relaxed">{location}</span>
        </div>
        
        <div className="flex items-start gap-3 text-slate-400 mb-8 text-sm font-medium">
          <Clock className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-500/70" />
          <span className="leading-relaxed">Available Mon-Sat, 9AM-6PM</span>
        </div>
        
        <div className="mt-auto pt-4 border-t border-gray-50">
          <button 
            onClick={handleBookNow}
            className="w-full btn-primary flex justify-center items-center gap-2 py-3"
          >
            <span>Book Appointment</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
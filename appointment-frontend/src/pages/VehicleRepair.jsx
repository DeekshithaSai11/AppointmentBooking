import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import vehicleImg from '../assets/vehicle-repair.jpg';

const VehicleRepair = () => {
  const navigate = useNavigate();

  const repairs = [
    { id: 301, name: 'Bosch Service Center', location: 'Tech Park Auto Zone', image: vehicleImg },
    { id: 302, name: 'Honda Service', location: 'Motor Avenue, Phase 2', image: vehicleImg },
    { id: 303, name: 'Local Garage', location: 'Downtown Bypass Road', image: vehicleImg }
  ];

  const handleBook = (repair) => {
    navigate('/booking', { state: { serviceType: 'Vehicle Repair', place: repair } });
  };

  return (
    <div className="min-h-screen bg-transparent py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <div className="text-center max-w-3xl mx-auto mb-16 fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-200 text-slate-800 font-semibold text-xs tracking-wider uppercase mb-6 shadow-sm">
            Automotive
          </div>
          <h1 className="text-5xl font-extrabold text-white font-bold tracking-tight mb-6">Vehicle Repair</h1>
          <p className="text-xl text-slate-400 font-medium leading-relaxed">
            Keep your vehicle running smoothly. Find trusted local mechanics and certified service centers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full fade-in" style={{ animationDelay: '0.1s' }}>
          {repairs.map(repair => (
            <div key={repair.id} className="bg-slate-800/80 backdrop-blur-md border border-white/10 rounded-[2rem] shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20 group flex flex-col">
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
                <img src={repair.image} alt={repair.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-blue-950 text-xs font-black px-4 py-2 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.6)] z-20 flex items-center gap-2"><span className="animate-pulse text-sm">⚡</span> Fast Service</div>
              </div>
              <div className="p-8 flex-grow flex flex-col items-center text-center">
                <h3 className="text-2xl font-bold text-white font-bold mb-3 tracking-tight group-hover:text-slate-700 transition-colors">{repair.name}</h3>
                <div className="flex items-start gap-2 text-slate-400 mb-8 font-medium">
                  <MapPin className="w-5 h-5 text-slate-500/70 shrink-0" />
                  <span>{repair.location}</span>
                </div>
                <div className="mt-auto w-full pt-4 border-t border-gray-50">
                  <button 
                    onClick={() => handleBook(repair)}
                    className="w-full btn-primary bg-slate-800 hover:bg-slate-900 focus:ring-slate-500/50 py-4 flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20 group-hover:-translate-y-1 transition-all"
                  >
                    <span className="text-base">Book Appointment</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default VehicleRepair;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import salonImg from '../assets/salon.jpg';

const Salon = () => {
  const navigate = useNavigate();

  const salons = [
    { id: 201, name: 'Naturals Salon', location: 'High Street, Mall Avenue', image: salonImg },
    { id: 202, name: 'Green Trends', location: 'Botanical Garden Rd', image: salonImg },
    { id: 203, name: 'Lakme Salon', location: 'Main Boulevard, East End', image: salonImg }
  ];

  const handleBook = (salon) => {
    navigate('/booking', { state: { serviceType: 'Salon', place: salon } });
  };

  return (
    <div className="min-h-screen bg-transparent py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <div className="text-center max-w-3xl mx-auto mb-16 fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 text-pink-800 font-semibold text-xs tracking-wider uppercase mb-6 shadow-sm">
            Beauty & Wellness
          </div>
          <h1 className="text-5xl font-extrabold text-white font-bold tracking-tight mb-6">Salons & Spas</h1>
          <p className="text-xl text-slate-400 font-medium leading-relaxed">
            Discover premium beauty treatments and book your pampering session with expert stylists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full fade-in" style={{ animationDelay: '0.1s' }}>
          {salons.map(salon => (
            <div key={salon.id} className="bg-slate-800/80 backdrop-blur-md border border-white/10 rounded-[2rem] shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20 group flex flex-col">
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-pink-900/10 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
                <img src={salon.image} alt={salon.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-gradient-to-r from-fuchsia-400 to-pink-500 text-pink-950 text-xs font-black px-4 py-2 rounded-full shadow-[0_0_20px_rgba(217,70,239,0.6)] z-20 flex items-center gap-2"><span className="animate-pulse text-sm">🔥</span> High Demand</div>
              </div>
              <div className="p-8 flex-grow flex flex-col items-center text-center">
                <h3 className="text-2xl font-bold text-white font-bold mb-3 tracking-tight group-hover:text-pink-600 transition-colors">{salon.name}</h3>
                <div className="flex items-start gap-2 text-slate-400 mb-8 font-medium">
                  <MapPin className="w-5 h-5 text-pink-500/70 shrink-0" />
                  <span>{salon.location}</span>
                </div>
                <div className="mt-auto w-full pt-4 border-t border-gray-50">
                  <button 
                    onClick={() => handleBook(salon)}
                    className="w-full btn-primary bg-pink-600 hover:bg-pink-700 focus:ring-pink-500/50 py-4 flex items-center justify-center gap-2 shadow-lg shadow-pink-500/20 group-hover:-translate-y-1 transition-all"
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

export default Salon;

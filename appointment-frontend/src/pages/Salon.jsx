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
    <div className="min-h-screen bg-gray-50/50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <div className="text-center max-w-3xl mx-auto mb-16 fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 text-pink-800 font-semibold text-xs tracking-wider uppercase mb-6 shadow-sm">
            Beauty & Wellness
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-6">Salons & Spas</h1>
          <p className="text-xl text-gray-500 font-medium leading-relaxed">
            Discover premium beauty treatments and book your pampering session with expert stylists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full fade-in" style={{ animationDelay: '0.1s' }}>
          {salons.map(salon => (
            <div key={salon.id} className="bg-white rounded-[2rem] shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 group flex flex-col">
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-pink-900/10 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
                <img src={salon.image} alt={salon.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8 flex-grow flex flex-col items-center text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight group-hover:text-pink-600 transition-colors">{salon.name}</h3>
                <div className="flex items-start gap-2 text-gray-500 mb-8 font-medium">
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

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import hospitalImg from '../assets/hospital.jpg';

const Hospital = () => {
  const navigate = useNavigate();

  const hospitals = [
    { id: 101, name: 'Apollo Hospital', location: 'Jubilee Hills, City Center', image: hospitalImg },
    { id: 102, name: 'KIMS Hospital', location: 'Minister Road, Secunderabad', image: hospitalImg },
    { id: 103, name: 'Care Hospital', location: 'Banjara Hills, West Zone', image: hospitalImg }
  ];

  const handleBook = (hospital) => {
    navigate('/booking', { state: { serviceType: 'Hospital', place: hospital } });
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <div className="text-center max-w-3xl mx-auto mb-16 fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-800 font-semibold text-xs tracking-wider uppercase mb-6 shadow-sm">
            Healthcare
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-6">Hospitals & Clinics</h1>
          <p className="text-xl text-gray-500 font-medium leading-relaxed">
            Choose from our network of top-rated healthcare facilities and book your appointment instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full fade-in" style={{ animationDelay: '0.1s' }}>
          {hospitals.map(hospital => (
            <div key={hospital.id} className="bg-white rounded-[2rem] shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 group flex flex-col">
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
                <img src={hospital.image} alt={hospital.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8 flex-grow flex flex-col items-center text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight group-hover:text-blue-600 transition-colors">{hospital.name}</h3>
                <div className="flex items-start gap-2 text-gray-500 mb-8 font-medium">
                  <MapPin className="w-5 h-5 text-blue-500/70 shrink-0" />
                  <span>{hospital.location}</span>
                </div>
                <div className="mt-auto w-full pt-4 border-t border-gray-50">
                  <button 
                    onClick={() => handleBook(hospital)}
                    className="w-full btn-primary py-4 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 group-hover:-translate-y-1 transition-all"
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

export default Hospital;

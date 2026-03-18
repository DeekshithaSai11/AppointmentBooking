import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import hospitalImg from '../assets/hospital.jpg';
import salonImg from '../assets/salon.jpg';
import vehicleRepairImg from '../assets/vehicle-repair.jpg';

const Services = () => {
  const serviceCategories = [
    {
      id: 'hospital',
      title: 'Hospitals & Clinics',
      description: 'Book appointments with top-rated healthcare professionals. From general checkups to specialized treatments, our network has you covered.',
      image: hospitalImg,
      link: '/services/hospital'
    },
    {
      id: 'salon',
      title: 'Salons & Spas',
      description: 'Pamper yourself with premium beauty and wellness treatments. Book haircuts, styling, massages, and more with expert stylists.',
      image: salonImg,
      link: '/services/salon'
    },
    {
      id: 'vehicle',
      title: 'Vehicle Repair',
      description: 'Keep your vehicle running smoothly. Schedule maintenance, repairs, and diagnostics with trusted local mechanics and service centers.',
      image: vehicleRepairImg,
      link: '/services/vehicle-repair'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 text-center flex flex-col items-center min-h-screen pt-16 pb-20">
      <div className="w-full flex flex-col items-center">
        
        <div className="text-center max-w-2xl mx-auto mb-16 fade-in flex flex-col items-center">
          <h1 className="text-5xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">Our Services</h1>
          <p className="text-xl text-slate-400 font-medium leading-relaxed">
            Select a service category below to browse available locations and book your slot in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full fade-in" style={{ animationDelay: '0.1s' }}>
          {serviceCategories.map((category) => (
            <div key={category.id} className="card group flex flex-col h-full">
              <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
                <img 
                  src={category.image} 
                  alt={category.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out rounded-t-2xl"
                />
              </div>
              
              <div className="p-8 flex-grow flex flex-col items-center text-center">
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors tracking-tight">
                  {category.title}
                </h3>
                <p className="text-slate-400 mb-8 font-medium leading-relaxed">
                  {category.description}
                </p>
                
                <div className="mt-auto w-full pt-6 border-t border-white/10 flex justify-center">
                  <Link 
                    to={category.link}
                    className="w-full btn-primary flex justify-center items-center gap-2"
                  >
                    <span className="text-base">Browse Locations</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Services;

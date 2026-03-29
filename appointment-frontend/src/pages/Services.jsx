import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Trophy, Sparkles, Zap } from 'lucide-react';

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
      link: '/services/hospital',
      color: 'from-cyan-400 to-blue-600',
      shadow: 'shadow-[0_0_30px_rgba(6,182,212,0.3)]',
      icon: <Trophy className="w-5 h-5 text-yellow-300" />,
      badge: 'Certified Premium'
    },
    {
      id: 'salon',
      title: 'Salons & Spas',
      description: 'Pamper yourself with premium beauty and wellness treatments. Book haircuts, styling, massages, and more with expert stylists.',
      image: salonImg,
      link: '/services/salon',
      color: 'from-fuchsia-400 to-purple-600',
      shadow: 'shadow-[0_0_30px_rgba(217,70,239,0.3)]',
      icon: <Sparkles className="w-5 h-5 text-fuchsia-200" />,
      badge: 'Massive Rewards'
    },
    {
      id: 'vehicle',
      title: 'Vehicle Repair',
      description: 'Keep your vehicle running smoothly. Schedule maintenance, repairs, and diagnostics with trusted local mechanics and service centers.',
      image: vehicleRepairImg,
      link: '/services/vehicle-repair',
      color: 'from-blue-400 to-indigo-600',
      shadow: 'shadow-[0_0_30px_rgba(59,130,246,0.3)]',
      icon: <Zap className="w-5 h-5 text-blue-200" />,
      badge: 'Fast Connect'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center min-h-[calc(100vh-80px)] pt-16 pb-20 relative overflow-hidden">

      {/* Background Graphic Orbs */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px] -z-10 pointer-events-none animate-[pulse_6s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-fuchsia-600/10 rounded-full blur-[100px] -z-10 pointer-events-none animate-[pulse_8s_ease-in-out_infinite]"></div>

      <div className="w-full flex flex-col items-center relative z-10">

        <div className="text-center max-w-3xl mx-auto mb-20 fade-in flex flex-col items-center">
          <div className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-5 py-2 rounded-full mb-6 font-black uppercase tracking-widest text-xs shadow-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span> Select Your Path
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-100 to-cyan-400 drop-shadow-sm">Explore Services</h1>
          <p className="text-xl text-slate-300 font-medium leading-relaxed max-w-2xl px-4">
            Browse our world-class partner networks. Select a category below and uncover <strong className="text-fuchsia-400">exclusive discounts</strong> when you check out!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8 w-full fade-in" style={{ animationDelay: '0.1s' }}>
          {serviceCategories.map((category) => (
            <div key={category.id} className={`group flex flex-col h-full bg-slate-900/60 backdrop-blur-xl rounded-[2.5rem] border border-white/10 ${category.shadow} hover:shadow-[0_0_50px_rgba(255,255,255,0.1)] transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden`}>

              <div className="relative h-64 overflow-hidden rounded-t-[2.5rem] p-3 pb-0">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10"></div>
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out rounded-t-[2rem]"
                />
                {/* Gamification Badge Overlay */}
                <div className="absolute top-6 left-6 z-20 bg-slate-900/80 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full flex items-center gap-2 shadow-lg transform -rotate-2 group-hover:rotate-0 transition-transform">
                  {category.icon}
                  <span className="text-xs font-black text-white uppercase tracking-wider">{category.badge}</span>
                </div>
              </div>

              <div className="p-8 md:p-10 flex-grow flex flex-col items-start text-left relative z-20 -mt-8">
                <h3 className={`text-3xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r ${category.color} tracking-tight`}>
                  {category.title}
                </h3>
                <p className="text-slate-300 mb-8 font-medium leading-relaxed text-base">
                  {category.description}
                </p>

                <div className="mt-auto w-full">
                  <Link
                    to={category.link}
                    className={`w-full py-4 rounded-2xl flex justify-center items-center gap-3 font-black text-white text-lg bg-gradient-to-r ${category.color} hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all transform hover:scale-[1.02] border border-white/20`}
                  >
                    <span>View Providers</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
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

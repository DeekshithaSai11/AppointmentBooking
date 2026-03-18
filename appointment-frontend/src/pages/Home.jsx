import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, ShieldCheck, Clock, ArrowRight } from 'lucide-react';

// Import local assets securely
import hospitalImg from '../assets/hospital.jpg';
import salonImg from '../assets/salon.jpg';
import vehicleRepairImg from '../assets/vehicle-repair.jpg';

const Home = () => {
  const navigate = useNavigate();

  const serviceCategories = [
    {
      id: 'hospital',
      title: 'Hospitals & Clinics',
      description: 'Find top-rated healthcare professionals and facilities.',
      image: hospitalImg,
      link: '/services/hospital'
    },
    {
      id: 'salon',
      title: 'Salons & Spas',
      description: 'Discover premium beauty and wellness treatments.',
      image: salonImg,
      link: '/services/salon'
    },
    {
      id: 'vehicle',
      title: 'Vehicle Repair',
      description: 'Trusted mechanics and auto service centers.',
      image: vehicleRepairImg,
      link: '/services/vehicle-repair'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 text-center flex flex-col items-center min-h-screen pt-32 pb-20">
      {/* Centered Large Hero Section */}
      <section className="relative w-full flex flex-col items-center text-center mb-32">
        {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/20 rounded-full mix-blend-screen filter blur-[100px] opacity-50 -z-10 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto fade-in flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 backdrop-blur-md border border-white/10 text-slate-300 font-semibold text-sm mb-8">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
            The Premium Booking Platform
          </div>

          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">
            Effortless scheduling for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              all your daily needs
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
            Connect with premium hospitals, luxury salons, and trusted vehicle repair centers in seconds.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
            <button
              onClick={() => navigate('/services')}
              className="btn-primary text-lg px-8 py-4 flex items-center justify-center gap-2 w-full sm:w-auto shadow-xl shadow-blue-500/20"
            >
              Explore Services
              <ArrowRight className="w-5 h-5" />
            </button>
            <Link to="/register" className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="w-full mb-32">
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 mb-6 tracking-tight">Everything You Need</h2>
          <p className="text-xl text-slate-400 leading-relaxed font-medium">
            We collaborate with the best service providers to bring you a seamless booking experience. Select a category to begin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {serviceCategories.map((category) => (
            <div key={category.id} className="card group flex flex-col h-full fade-in">
              <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out rounded-t-2xl"
                />
              </div>

              <div className="p-8 flex-grow flex flex-col items-center text-center">
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors">
                  {category.title}
                </h3>
                <p className="text-slate-400 mb-8 font-medium leading-relaxed">
                  {category.description}
                </p>

                <div className="mt-auto w-full flex justify-center">
                  <Link
                    to={category.link}
                    className="btn-secondary flex justify-center items-center gap-2 py-3 w-full"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Centered Layout */}
      <section className="w-full mb-20 relative">
        <div className="text-center max-w-3xl mx-auto mb-20 flex flex-col items-center">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 mb-6 tracking-tight">Why Choose BookIt?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-indigo-500/10 text-indigo-400 rounded-3xl flex items-center justify-center mb-8 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
              <Clock className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Save Time</h3>
            <p className="text-slate-400 text-lg leading-relaxed">Instantly book appointments online 24/7 without waiting on hold.</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-purple-500/10 text-purple-400 rounded-3xl flex items-center justify-center mb-8 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Instant Confirmation</h3>
            <p className="text-slate-400 text-lg leading-relaxed">Receive immediate notifications and manage bookings from your dashboard.</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-blue-500/10 text-blue-400 rounded-3xl flex items-center justify-center mb-8 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Verified Quality</h3>
            <p className="text-slate-400 text-lg leading-relaxed">We partner exclusively with top-rated, certified service professionals.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import heroDoodle from '../assets/hero-isometric.png';

const Home = () => {
  const navigate = useNavigate();

  return (
    // Instead of overriding the background to dark grey, we now inherit the global index.css lavender-peach background
    // To make sure this hero pops, we add subtle radial glows behind the content
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-transparent flex flex-col items-center justify-center -mt-8 pt-20">
      
      {/* Re-introducing the beautiful glowing ambient atmospheric Orbs from original design */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-fuchsia-600/20 rounded-full blur-[120px] -z-10 animate-[pulse_8s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-cyan-600/20 rounded-full blur-[100px] -z-10 animate-[pulse_6s_ease-in-out_infinite]" style={{animationDelay: '1s'}}></div>
      
      {/* 1. HERO TWO-COLUMN LAYOUT */}
      <section className="relative w-full min-h-[750px] flex items-center pt-10 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full relative z-10">
          
          {/* Left Text Column - Neon Gradients restored to match the style preference */}
          <div className="flex flex-col items-start text-left space-y-8 fade-in relative z-20 col-span-1 lg:col-span-5 pt-10 xl:pt-0">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-900/60 backdrop-blur-md border border-fuchsia-400/30 text-fuchsia-200 font-bold text-sm shadow-[0_0_15px_rgba(217,70,239,0.3)]">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
              BookIt Seamless Appointments
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-cyan-300 leading-[1.1] tracking-tighter drop-shadow-lg">
              Effortless Appointments, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400 drop-shadow-[0_0_15px_rgba(217,70,239,0.4)]">Exceptional Care.</span>
            </h1>
            
            <p className="text-xl text-indigo-50 font-medium leading-relaxed max-w-lg drop-shadow-md">
              Book health checkups, beauty treatments, and vehicle repairs at top facilities instantly. Experience a new standard of booking convenience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
              <button 
                onClick={() => navigate('/services')}
                className="px-8 py-4 rounded-full font-black text-lg bg-gradient-to-r from-cyan-500 to-indigo-600 border border-cyan-400/50 text-white hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all flex justify-center items-center gap-3 group"
              >
                Explore Services
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Illustrations Column - Isometric Image with Wavy Presentation */}
          <div className="hidden lg:flex relative h-[600px] w-full items-center justify-end fade-in perspective-1000 z-10 col-span-1 lg:col-span-7 pl-10" style={{animationDelay: '0.3s'}}>
            
            {/* Soft decorative backdrop element mimicking the wave */}
            <div className="absolute right-0 w-[120%] h-[120%] bg-white/10 backdrop-blur-xl border border-white/20 rounded-[5rem] transform rotate-3 scale-110 shadow-[0_0_40px_rgba(255,255,255,0.1)] -z-10"></div>
            
            {/* The main right-side isometric image masked beautifully */}
            <div className="relative w-full h-[550px] shadow-2xl rounded-[3rem] overflow-hidden transform hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500 border-[4px] border-white/30 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
               <img 
                 src={heroDoodle} 
                 alt="Isometric Services Dashboard" 
                 className="w-full h-full object-cover rounded-[3rem]"
                 style={{
                   // A soft right-oriented clip flow
                   clipPath: 'polygon(5% 0, 100% 0, 100% 100%, 0% 100%, 4% 80%, 1% 60%, 5% 40%, 0% 20%)'
                 }}
               />
               {/* Soft interior overlay to bridge lighting */}
               <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-transparent pointer-events-none"></div>
            </div>

          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Home;
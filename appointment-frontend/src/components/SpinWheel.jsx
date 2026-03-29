import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { X, Gift } from 'lucide-react';

const PRIZES = ["10% OFF", "Try Again", "20% OFF", "30% OFF", "Oops!", "50% OFF!", "15% OFF", "Better Luck!"];
const COLORS = ["#06b6d4", "#334155", "#d946ef", "#0ea5e9", "#1e293b", "#e879f9", "#8b5cf6", "#0f172a"];

const SpinWheel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [prize, setPrize] = useState(null);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    // Only show automatically after login triggers component mount
    if (isAuthenticated) {
      const timer = setTimeout(() => {
        const hasSpun = sessionStorage.getItem('hasSpunWheelSession');
        if (!hasSpun) {
          setIsOpen(true);
        }
      }, 1200); 
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  const spin = () => {
    if (spinning || prize) return;
    setSpinning(true);
    
    // 5 full rotations + random extra target
    const randomExtraDegrees = Math.floor(Math.random() * 360);
    const targetDegree = 1800 + randomExtraDegrees;
    setRotation(targetDegree);
    
    setTimeout(() => {
      setSpinning(false);
      
      const actualDeg = targetDegree % 360;
      const sliceSize = 360 / PRIZES.length;
      // Calculate which slice is at the top pointer (Top = 0 deg)
      const index = Math.floor((360 - actualDeg) % 360 / sliceSize);
      
      const wonPrize = PRIZES[index];
      setPrize(wonPrize);
      
      // Save logic
      if(!wonPrize.toLowerCase().includes("try") && !wonPrize.toLowerCase().includes("oops") && !wonPrize.toLowerCase().includes("luck")) {
        const currentCoupons = JSON.parse(localStorage.getItem('userCoupons') || '[]');
        currentCoupons.push({ code: wonPrize, date: new Date().toISOString() });
        localStorage.setItem('userCoupons', JSON.stringify(currentCoupons));
        localStorage.setItem('activeDiscount', wonPrize); // set immediate active
      }
      sessionStorage.setItem('hasSpunWheelSession', 'true');
      
    }, 4000);
  };

  const closeWheel = () => {
    setIsOpen(false);
    sessionStorage.setItem('hasSpunWheelSession', 'true'); // mark skip
  };

  // MUST BE AUTHENTICATED
  if (!isAuthenticated) return null;

  if (!isOpen && typeof isOpen !== 'boolean') return null;

  // Generate conic gradient manually
  const gradientStops = COLORS.map((c, i) => {
    const step = 100 / PRIZES.length;
    return `${c} ${i * step}% ${(i+1) * step}%`;
  }).join(', ');

  const hasSpun = sessionStorage.getItem('hasSpunWheelSession') === 'true';

  return (
    <>
      {/* Permanent Floating Spin Wheel Trigger */}
      <div 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-[100px] right-6 z-40 bg-slate-900 border-2 border-fuchsia-500/50 p-2.5 rounded-full shadow-[0_0_20px_rgba(217,70,239,0.4)] cursor-pointer hover:scale-110 hover:shadow-[0_0_30px_rgba(217,70,239,0.6)] transition-all flex items-center justify-center fade-in group w-[64px] h-[64px] ring-[4px] ring-fuchsia-500/30"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-500 flex items-center justify-center animate-[spin_4s_linear_infinite] group-hover:animate-[spin_2s_linear_infinite] shadow-inner">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
        <span className="hidden sm:block absolute right-[80px] text-fuchsia-200 font-extrabold tracking-widest uppercase text-[10px] drop-shadow-[0_0_8px_rgba(217,70,239,0.8)] whitespace-nowrap opacity-100">
          Spin & Win
        </span>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 fade-in">
          <div className="bg-slate-900 border border-fuchsia-500/50 rounded-3xl p-8 max-w-md w-full relative shadow-[0_0_80px_rgba(217,70,239,0.3)] flex flex-col items-center text-center overflow-hidden">
            
            {/* Decorative background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/20 rounded-full blur-[80px] -z-10 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px] -z-10 animate-[pulse_3s_ease-in-out_infinite]"></div>

            <button onClick={closeWheel} className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 hover:bg-red-500/20 hover:text-red-400 p-2 rounded-full transition-colors z-20 shadow-md border border-white/5">
              <X className="w-5 h-5"/>
            </button>

            <Gift className="w-14 h-14 text-cyan-400 mb-3 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)] animate-bounce" />
            <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-fuchsia-400 mb-2 drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]">Win Huge Discounts!</h2>
            <p className="text-slate-300 mb-8 font-medium text-sm px-4">Spin the wheel to unlock exclusive discounts—up to a massive <strong className="text-fuchsia-400">50% OFF</strong> today!</p>

            <div className="relative w-64 h-64 mb-8">
              {/* Wheel Pointer */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-t-[30px] border-t-white z-20 drop-shadow-[0_5px_10px_rgba(0,0,0,0.8)]"></div>
              
              {/* The Wheel */}
              <div 
                className="w-full h-full rounded-full border-[8px] border-slate-800 overflow-hidden relative shadow-[0_0_50px_rgba(217,70,239,0.5)]"
                style={{ 
                  transform: `rotate(${rotation}deg)`,
                  transition: 'transform 4s cubic-bezier(0.1,0.7,0.1,1)',
                  background: `conic-gradient(${gradientStops})`
                }}
              >
               {PRIZES.map((p, i) => {
                  const angle = (i * 360 / PRIZES.length) + (360 / PRIZES.length / 2);
                  
                  return (
                    <div 
                      key={i} 
                      className="absolute inset-0 flex items-center justify-center pointer-events-none" 
                      style={{transform: `rotate(${angle}deg)`}}
                    >
                      <span className={`font-black text-[11px] uppercase tracking-wider translate-y-[-85px] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] pb-4 max-w-[50px] leading-tight text-white`}>{p}</span>
                    </div>
                  )
                })}
                {/* Center dot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-950 border-4 border-fuchsia-500/50 rounded-full z-10 flex items-center justify-center shadow-inner">
                  <div className="w-5 h-5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_15px_rgba(6,182,212,0.8)]"></div>
                </div>
              </div>
            </div>

            <div className="h-20 flex flex-col justify-center items-center w-full mt-2">
              {prize ? (
                <div className="fade-in animate-bounce">
                    <h3 className="text-3xl font-black text-white mb-2 tracking-wide">You got: <span className="text-fuchsia-400 drop-shadow-[0_0_10px_rgba(217,70,239,0.8)]">{prize}</span>!</h3>
                    {(!prize.toLowerCase().includes("try") && !prize.toLowerCase().includes("oops") && !prize.toLowerCase().includes("luck")) && 
                      <p className="text-cyan-300 text-xs font-bold uppercase tracking-widest border border-cyan-500/50 bg-cyan-500/20 py-2 px-5 rounded-full mt-1 inline-block shadow-[0_0_15px_rgba(6,182,212,0.3)]">Coupon saved to profile Wallet!</p>
                    }
                </div>
              ) : (
                <button 
                  onClick={spin}
                  disabled={spinning || hasSpun}
                  className={`w-full py-4 rounded-full font-black text-xl transition-all border-b-4 active:border-b-0 active:mt-4 active:mb-0 duration-150 ${
                    (spinning || hasSpun) ? 'bg-slate-700 border-slate-800 text-slate-500 cursor-not-allowed scale-95' : 'bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-600 border-fuchsia-800 text-white hover:shadow-[0_0_40px_rgba(217,70,239,0.7)] hover:brightness-110'
                  }`}
                >
                  {spinning ? 'SPINNING...' : (hasSpun ? 'ALREADY SPUN' : 'SPIN THE WHEEL NOW!')}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default SpinWheel;

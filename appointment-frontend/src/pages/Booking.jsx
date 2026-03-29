import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { appointmentService } from '../services/appointmentService';
import { AuthContext } from '../context/AuthContext';
import { CheckCircle2, MapPin, Calendar, Clock, ChevronRight, ChevronLeft, Building2, Ticket, Gift, Sparkles } from 'lucide-react';

const servicesList = [
  { id: 1, name: 'City General Hospital', type: 'Hospital' },
  { id: 2, name: 'Elegance Salon & Spa', type: 'Salon' },
  { id: 3, name: 'Pro Auto Mechanics', type: 'Vehicle Repair' }
];

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const initialServiceTypeStr = location.state?.serviceType || null;
  const initialServiceId = initialServiceTypeStr ? 
    servicesList.find(s => s.type === initialServiceTypeStr)?.id || null 
    : null;
  const initialPlace = location.state?.place || null;

  const [step, setStep] = useState(initialPlace ? 3 : 1);
  const [places, setPlaces] = useState([]);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Gamification Flags
  const [isFirstBooking, setIsFirstBooking] = useState(false);
  const [activeDiscount, setActiveDiscount] = useState('');

  const [formData, setFormData] = useState({
    serviceId: initialServiceId,
    placeId: initialPlace ? initialPlace.id : '',
    place: initialPlace || null,
    date: '',
    slot: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { message: 'Please login to book an appointment' } });
    }
  }, [user, navigate]);

  useEffect(() => {
    // Determine active discount early
    const savedDiscount = localStorage.getItem('activeDiscount');
    if (savedDiscount) setActiveDiscount(savedDiscount);
    
    // Check if first ever user appointment
    appointmentService.getAppointments()
      .then(data => {
        const userApps = (data || []).filter(app => app.userName === user?.name || app.user?.email === user?.email);
        if (userApps.length === 0) {
          setIsFirstBooking(true);
          if(!savedDiscount) setActiveDiscount("FIRST10 - 10% OFF");
        }
      })
      .catch(() => {});
  }, [user]);

  useEffect(() => {
    if (step === 2) fetchPlaces();
    else if (step === 4) fetchSlots();
  }, [step]);

  const fetchPlaces = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await appointmentService.getPlaces();
      if (data && data.length > 0) setPlaces(data);
      else throw new Error('No places');
    } catch (err) {
      setPlaces([
        { id: 101, name: 'Downtown Center', location: '123 Main St' },
        { id: 102, name: 'Uptown Branch', location: '456 North Ave' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSlots = async () => {
    try {
      setLoading(true);
      setError('');
      
      const [slotsData, appointmentsData] = await Promise.all([
        appointmentService.getSlots().catch(() => []),
        appointmentService.getAppointments().catch(() => [])
      ]);
      
      const allAppointments = appointmentsData || [];
      const placeName = formData.place ? formData.place.name : '';
      const selectedDate = formData.date;
      
      // Determine explicitly locked out slots
      const bookedSlots = allAppointments
        .filter(app => 
          (app.status !== 'CANCELLED' && app.status !== 'cancelled') &&
          app.date === selectedDate &&
          (typeof app.place === 'string' ? app.place : app.place?.name) === placeName
        )
        .map(app => app.slot);

      let availableSlots = slotsData;
      if (!availableSlots || availableSlots.length === 0) {
        availableSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '04:00 PM'];
      }

      const now = new Date();
      const todayStr = now.toISOString().split('T')[0];
      const isToday = selectedDate === todayStr;
      const currentHour = now.getHours();
      const currentMinutes = now.getMinutes();

      setSlots(availableSlots.map((item, i) => {
        let timeStr = typeof item === 'object' ? (item.time || item.slot || `Slot ${i+1}`) : String(item);
        let isPast = false;
        if (isToday) {
          const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
          if (match) {
            let [_, hours, minutes, period] = match;
            hours = parseInt(hours, 10);
            minutes = parseInt(minutes, 10);
            if (period.toUpperCase() === 'PM' && hours !== 12) hours += 12;
            if (period.toUpperCase() === 'AM' && hours === 12) hours = 0;
            if (currentHour > hours || (currentHour === hours && currentMinutes > minutes)) {
              isPast = true;
            }
          }
        }
        const isBooked = bookedSlots.includes(timeStr);
        return { 
          time: timeStr, 
          available: !isBooked && !isPast,
          reason: isBooked ? 'Booked' : (isPast ? 'Passed' : null)
        };
      }));

    } catch (err) {
      setError('Failed to load available time slots.');
      setSlots([]);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = async () => {
    try {
      setSubmitLoading(true);
      const selectedService = servicesList.find(s => s.id === formData.serviceId);
      
      await appointmentService.bookAppointment({
        place: formData.place ? formData.place.name : '',
        serviceType: selectedService ? selectedService.type : (typeof formData.serviceId === 'string' ? formData.serviceId : ''),
        userName: user?.name || user?.email || 'User',
        date: formData.date,
        slot: formData.slot,
        placeId: formData.placeId,
        serviceId: formData.serviceId
      });
      setStep(5); 
      // Clear coupon if they had one
      localStorage.removeItem('activeDiscount');
    } catch (err) {
      setError(err.message || 'Failed to confirm booking.');
    } finally {
      setSubmitLoading(false);
    }
  };

  const steps = [
    { num: 1, title: 'Service' },
    { num: 2, title: 'Location' },
    { num: 3, title: 'Date' },
    { num: 4, title: 'Time' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center min-h-screen pt-12 pb-20 relative">
      
      {/* Background Ambience */}
      <div className="absolute top-[20%] right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="w-full max-w-4xl mx-auto relative z-10">
        
        {/* GAMIFICATION BANNER: First Booking or Active Reward */}
        {activeDiscount && step < 5 && (
          <div className="mb-8 w-full bg-gradient-to-r from-fuchsia-600/20 via-cyan-500/20 to-blue-500/20 border border-cyan-500/50 rounded-2xl p-4 flex items-center justify-between shadow-[0_0_20px_rgba(6,182,212,0.2)] fade-in relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
             <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center border border-cyan-400/50 animate-pulse">
                 {isFirstBooking ? <Gift className="w-6 h-6" /> : <Ticket className="w-6 h-6" />}
               </div>
               <div className="text-left">
                  <h3 className="text-lg font-black text-white">{isFirstBooking ? "🎉 First Appointment Bonus!" : "Active Reward Applied"}</h3>
                  <p className="text-sm font-semibold text-cyan-200">Discount <strong className="text-fuchsia-400 text-base">{activeDiscount}</strong> will be applied upon payment at the venue.</p>
               </div>
             </div>
             <div className="hidden sm:flex px-4 py-2 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-widest border border-white/20">
               Auto-Applied
             </div>
          </div>
        )}

        {/* Progress Bar */}
        {step < 5 && (
          <div className="mb-10 p-6 bg-slate-900/60 backdrop-blur-md rounded-[2rem] border border-white/5 shadow-xl">
            <div className="flex justify-between items-center relative px-2">
              <div className="absolute left-6 right-6 top-1/2 transform -translate-y-1/2 h-1.5 bg-slate-800 z-0 rounded-full"></div>
              <div className="absolute left-6 top-1/2 transform -translate-y-1/2 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 z-0 rounded-full transition-all duration-[800ms] shadow-[0_0_10px_rgba(6,182,212,0.5)]" style={{ width: `calc(${((step - 1) / 3) * 100}% - ${step === 1 ? '0px' : '30px'})` }}></div>
              
              {steps.map((s) => (
                <div key={s.num} className="relative z-10 flex flex-col items-center group">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-sm transition-all duration-500 shadow-lg ${
                    step >= s.num ? 'bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.5)] scale-110' : 'bg-slate-900 border-2 border-slate-700 text-slate-500 group-hover:border-slate-500'
                  }`}>
                    {step > s.num ? <CheckCircle2 className="w-6 h-6" /> : s.num}
                  </div>
                  <span className={`absolute -bottom-8 whitespace-nowrap text-xs font-bold uppercase tracking-widest transition-colors ${step >= s.num ? 'text-cyan-300' : 'text-slate-500'}`}>
                    {s.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className="bg-slate-900/80 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden fade-in min-h-[450px] flex flex-col text-left relative">
           
           {/* Decorative corner */}
           <div className="absolute top-0 right-0 border-[60px] border-transparent border-t-cyan-500/10 border-r-cyan-500/10"></div>

          <div className="p-8 sm:p-12 flex-grow relative z-10">
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 text-red-200 rounded-2xl shadow-[0_0_15px_rgba(239,68,68,0.2)] flex items-start gap-3">
                 <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mt-0.5"><X className="w-3 h-3 text-white"/></div>
                <span className="font-semibold">{error}</span>
              </div>
            )}

            {/* Step 1: Select Service */}
            {step === 1 && (
              <div className="fade-in">
                <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-8 flex items-center gap-3">
                  <Building2 className="text-cyan-400 w-8 h-8 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                  Select A Service
                </h2>
                <div className="grid gap-4">
                  {servicesList.map(service => (
                    <button
                      key={service.id}
                      onClick={() => setFormData({ ...formData, serviceId: service.id })}
                      className={`p-5 rounded-2xl transition-all flex justify-between items-center group ${
                        formData.serviceId === service.id 
                          ? 'bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border-2 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]' 
                          : 'bg-slate-800/40 border-2 border-white/5 hover:border-cyan-500/50 hover:bg-slate-800/80'
                      }`}
                    >
                      <div className="text-left">
                        <h3 className={`text-xl font-bold transition-colors ${formData.serviceId === service.id ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>{service.name}</h3>
                        <p className={`text-sm font-semibold mt-1 ${formData.serviceId === service.id ? 'text-cyan-300' : 'text-slate-500'}`}>{service.type}</p>
                      </div>
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                        formData.serviceId === service.id ? 'border-cyan-400 bg-cyan-400/20' : 'border-slate-600'
                      }`}>
                        {formData.serviceId === service.id && <div className="w-3.5 h-3.5 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(6,182,212,1)]"></div>}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Select Location */}
            {step === 2 && (
              <div className="fade-in">
                <h2 className="text-3xl font-black text-white mb-8 flex items-center gap-3">
                  <MapPin className="text-cyan-400 w-8 h-8 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                  Select Location
                </h2>
                {loading ? (
                  <div className="flex justify-center py-16"><div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin"></div></div>
                ) : (
                  <div className="grid gap-4">
                    {places.map(place => (
                      <button
                        key={place.id}
                        onClick={() => setFormData({ ...formData, placeId: place.id, place: place })}
                        className={`p-6 rounded-2xl text-left transition-all border-2 group ${
                          formData.placeId === place.id 
                            ? 'bg-gradient-to-r from-cyan-900/40 to-transparent border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]' 
                            : 'bg-slate-800/40 border-white/5 hover:border-cyan-500/50 hover:bg-slate-800/80'
                        }`}
                      >
                        <h3 className="font-bold text-white text-xl">{place.name}</h3>
                        <p className="text-sm font-medium text-slate-400 mt-2 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-cyan-500" /> {place.location}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Select Date */}
            {step === 3 && (
              <div className="fade-in">
                <h2 className="text-3xl font-black text-white mb-8 flex items-center gap-3">
                  <Calendar className="text-cyan-400 w-8 h-8 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                  Select Date
                </h2>
                <div className="max-w-md mx-auto bg-slate-800/50 p-8 rounded-3xl border border-white/10 shadow-inner">
                  <label className="block text-sm font-bold text-slate-300 uppercase tracking-widest mb-4">Choose Target Date</label>
                  <input 
                    type="date"
                    min={new Date().toISOString().split('T')[0]} 
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-6 py-4 text-xl font-bold bg-slate-900 border-2 border-slate-700 text-white rounded-2xl focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all dark-color-scheme shadow-[0_0_15px_rgba(0,0,0,0.5)_inset]"
                  />
                  <div className="mt-6 flex items-start gap-3 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                     <Clock className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                     <p className="text-sm text-blue-200 font-medium leading-relaxed">
                       Our premium centers operate Monday through Saturday. Weekend slots fill up extremely rapidly.
                     </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Time Slot & Summary */}
            {step === 4 && (
              <div className="fade-in">
                <h2 className="text-3xl font-black text-white mb-8 flex items-center gap-3">
                  <Clock className="text-cyan-400 w-8 h-8 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                  Select & Lock Time Slot
                </h2>

                {loading ? (
                  <div className="flex justify-center py-12"><div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin"></div></div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center">
                      {slots.map((slotObj, idx) => (
                        <button
                          key={idx}
                          disabled={!slotObj.available}
                          onClick={() => setFormData({ ...formData, slot: slotObj.time })}
                          className={`rounded-2xl px-2 py-4 font-bold transition-all border-2 relative overflow-hidden group ${
                            !slotObj.available 
                              ? 'bg-[#0f172a]/80 border-slate-800 cursor-not-allowed opacity-60'
                              : formData.slot === slotObj.time 
                                ? 'bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.5)] transform -translate-y-1 border-white/20' 
                                : 'bg-slate-800/50 border-white/5 text-slate-300 hover:border-cyan-400/50 hover:bg-slate-800 hover:text-white hover:-translate-y-1 hover:shadow-lg'
                          }`}
                        >
                          {/* Visual Lockout gamification styling */}
                          {!slotObj.available && (
                             <div className="absolute inset-0 flex items-center justify-center opacity-30">
                               <div className="w-full h-1 bg-red-500 transform rotate-[-25deg]"></div>
                             </div>
                          )}
                          {!slotObj.available && slotObj.reason === 'Booked' && (
                             <span className="absolute top-0 right-0 bg-red-500/80 text-[8px] uppercase tracking-widest text-white px-1.5 py-0.5 rounded-bl-lg font-black">
                               Booked
                             </span>
                          )}
                          <span className={`${!slotObj.available ? 'text-slate-600 line-through decoration-red-500/50 decoration-2' : ''}`}>{slotObj.time}</span>
                        </button>
                      ))}
                    </div>

                    {/* Attractive Booking Summary */}
                    {formData.slot && (
                      <div className="mt-10 p-8 bg-gradient-to-r from-slate-800 to-slate-900 rounded-[2rem] border border-cyan-500/30 flex flex-col md:flex-row items-center md:items-start gap-6 shadow-[0_0_30px_rgba(0,0,0,0.5)] fade-in relative overflow-hidden">
                        
                        <div className="absolute right-0 top-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-[40px]"></div>

                        <div className="bg-cyan-400 text-[#0f172a] p-4 rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.5)] shrink-0">
                          <CheckCircle2 className="w-8 h-8 animate-pulse" />
                        </div>
                        <div className="w-full text-center md:text-left z-10">
                          <h4 className="font-black text-2xl text-white tracking-tight flex items-center justify-center md:justify-start gap-2">
                             Perfect Choice <Sparkles className="w-5 h-5 text-fuchsia-400"/>
                          </h4>
                          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-slate-950/50 p-4 rounded-xl border border-white/5">
                              <span className="block text-[10px] text-cyan-500 uppercase font-black tracking-widest mb-1">Target Venue</span>
                              <span className="text-white font-bold">{formData.place?.name}</span>
                            </div>
                            <div className="bg-slate-950/50 p-4 rounded-xl border border-white/5">
                              <span className="block text-[10px] text-cyan-500 uppercase font-black tracking-widest mb-1">Selected Date</span>
                              <span className="text-white font-bold">{formData.date}</span>
                            </div>
                            <div className="bg-slate-950/50 p-4 rounded-xl border border-white/5">
                              <span className="block text-[10px] text-cyan-500 uppercase font-black tracking-widest mb-1">Locked Slot</span>
                              <span className="text-white font-bold">{formData.slot}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Step 5: Success Gamified Output */}
            {step === 5 && (
              <div className="text-center py-16 fade-in flex flex-col items-center">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl animate-pulse"></div>
                  <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-600 text-white rounded-full flex items-center justify-center border-4 border-[#0f172a] shadow-[0_0_40px_rgba(34,197,94,0.6)] relative z-10 transform hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-16 h-16" />
                  </div>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter drop-shadow-md">Slot Secured & Confirmed!</h2>
                <p className="text-xl text-slate-300 mb-10 max-w-xl font-medium leading-relaxed">
                  You are all set. We've locked your slot for <strong className="text-cyan-400">{formData.slot}</strong> on <strong className="text-cyan-400">{formData.date}</strong> at <strong className="text-white">{formData.place?.name}</strong>.
                </p>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="bg-slate-800 text-white border-2 border-white/10 hover:border-cyan-400 hover:bg-slate-700 font-black text-lg px-8 py-4 rounded-full transition-all shadow-md hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                >
                  Return to Dashboard
                </button>
              </div>
            )}
          </div>

          {/* Master Navigation Footer */}
          {step < 5 && (
            <div className="p-6 md:px-12 md:py-8 border-t border-white/5 flex justify-between items-center bg-slate-950/50 backdrop-blur-3xl z-20">
              {step > 1 ? (
                <button 
                  onClick={handleBack}
                  className="px-6 py-3 rounded-xl font-black uppercase text-sm tracking-widest text-slate-400 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2 border border-transparent"
                >
                  <ChevronLeft className="w-5 h-5" /> Back
                </button>
              ) : (
                <div></div> 
              )}
              
              {step < 4 ? (
                <button 
                  onClick={handleNext}
                  disabled={(step === 1 && !formData.serviceId) || (step === 2 && !formData.placeId) || (step === 3 && !formData.date)}
                  className="px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:scale-105 hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
                >
                  Proceed <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button 
                  onClick={handleSubmit}
                  disabled={!formData.slot || submitLoading}
                  className="px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:scale-105 hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
                >
                  {submitLoading ? 'Locking Slot...' : 'Lock Booking NOW'}
                  {!submitLoading && <CheckCircle2 className="w-5 h-5" />}
                </button>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Booking;
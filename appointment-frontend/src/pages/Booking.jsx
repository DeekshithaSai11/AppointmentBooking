import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { appointmentService } from '../services/appointmentService';
import { AuthContext } from '../context/AuthContext';
import { CheckCircle2, MapPin, Calendar, Clock, ChevronRight, ChevronLeft, Building2 } from 'lucide-react';

const servicesList = [
  { id: 1, name: 'City General Hospital', type: 'Hospital' },
  { id: 2, name: 'Elegance Salon & Spa', type: 'Salon' },
  { id: 3, name: 'Pro Auto Mechanics', type: 'Vehicle Repair' }
];

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  // Passed from Service pages
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
    if (step === 2) {
      fetchPlaces();
    } else if (step === 4) {
      fetchSlots();
    }
  }, [step]);

  const fetchPlaces = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await appointmentService.getPlaces();
      if (data && data.length > 0) {
         setPlaces(data);
      } else {
         throw new Error('No places');
      }
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
      
      // Determine which slots are already booked for this place on this date
      const bookedSlots = allAppointments
        .filter(app => 
          (app.status !== 'CANCELLED' && app.status !== 'cancelled') &&
          app.date === selectedDate &&
          (typeof app.place === 'string' ? app.place : app.place?.name) === placeName
        )
        .map(app => app.slot);

      let availableSlots = slotsData;
      
      if (!availableSlots || availableSlots.length === 0) {
        // Fallback slots if API fails
        availableSlots = [
          '09:00 AM',
          '10:00 AM',
          '11:00 AM',
          '01:00 PM',
          '02:00 PM',
          '04:00 PM'
        ];
      }

      // Current time for past slot blocking
      const now = new Date();
      const todayStr = now.toISOString().split('T')[0];
      const isToday = selectedDate === todayStr;
      const currentHour = now.getHours();
      const currentMinutes = now.getMinutes();

      setSlots(availableSlots.map((item, i) => {
        let timeStr = item;
        if (typeof item === 'object') {
          timeStr = item.time || item.slot || item.slotTime || `Slot ${i + 1}`;
        }
        timeStr = String(timeStr);
        
        let isPast = false;
        if (isToday) {
          const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
          if (match) {
            let [_, hours, minutes, period] = match;
            hours = parseInt(hours, 10);
            minutes = parseInt(minutes, 10);
            if (period.toUpperCase() === 'PM' && hours !== 12) hours += 12;
            if (period.toUpperCase() === 'AM' && hours === 12) hours = 0;
            
            // If the current time has passed the appointment time
            if (currentHour > hours || (currentHour === hours && currentMinutes > minutes)) {
              isPast = true;
            }
          }
        }
        
        const isBooked = bookedSlots.includes(timeStr);
        // "Release" the slot if its time has completely passed (it is no longer "booked" it is simply past)
        // However, a user can't book a past slot, so it remains unavailable.
        return { 
          time: timeStr, 
          available: !isBooked && !isPast
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
        // Sending exact string fields for the backend database
        place: formData.place ? formData.place.name : '',
        serviceType: selectedService ? selectedService.type : (typeof formData.serviceId === 'string' ? formData.serviceId : ''),
        userName: user?.name || user?.email || 'User',
        date: formData.date,
        slot: formData.slot,
        
        // Keeping IDs just in case backend expects them as well
        placeId: formData.placeId,
        serviceId: formData.serviceId
      });
      setStep(5); // Success step
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
    <div className="max-w-7xl mx-auto px-6 text-center flex flex-col items-center min-h-screen pt-12 pb-20">
      <div className="w-full max-w-4xl mx-auto">
        
        {/* Progress Bar */}
        {step < 5 && (
          <div className="mb-8">
            <div className="flex justify-between items-center relative">
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 z-0 rounded-full"></div>
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-blue-600 z-0 rounded-full transition-all duration-500" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
              
              {steps.map((s) => (
                <div key={s.num} className="relative z-10 flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-sm ${
                    step >= s.num ? 'bg-indigo-600 text-white shadow-indigo-500/30' : 'bg-slate-800 text-slate-400 border border-white/10'
                  }`}>
                    {step > s.num ? <CheckCircle2 className="w-6 h-6" /> : s.num}
                  </div>
                  <span className={`mt-2 text-xs font-semibold ${step >= s.num ? 'text-indigo-400' : 'text-slate-500'}`}>
                    {s.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl shadow-xl border border-white/10 overflow-hidden fade-in min-h-[400px] flex flex-col text-left">
          <div className="p-8 flex-grow">
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {/* Step 1: Select Service */}
            {step === 1 && (
              <div className="fade-in">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Building2 className="text-indigo-500" />
                  Select Service
                </h2>
                <div className="grid gap-4">
                  {servicesList.map(service => (
                    <button
                      key={service.id}
                      onClick={() => setFormData({ ...formData, serviceId: service.id })}
                      className={`p-4 rounded-xl border transition-all flex justify-between items-center ${
                        formData.serviceId === service.id 
                          ? 'border-indigo-500 bg-indigo-500/10 shadow-sm' 
                          : 'border-white/10 hover:border-indigo-500/50 hover:bg-slate-800/50'
                      }`}
                    >
                      <div>
                        <h3 className="font-bold text-white text-lg">{service.name}</h3>
                        <p className="text-sm text-slate-400">{service.type}</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                        formData.serviceId === service.id ? 'border-indigo-500 bg-indigo-500' : 'border-slate-600'
                      }`}>
                        {formData.serviceId === service.id && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Select Location */}
            {step === 2 && (
              <div className="fade-in">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <MapPin className="text-indigo-500" />
                  Select Location
                </h2>
                {loading ? (
                  <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div></div>
                ) : (
                  <div className="grid gap-4">
                    {places.map(place => (
                      <button
                        key={place.id}
                        onClick={() => setFormData({ ...formData, placeId: place.id, place: place })}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          formData.placeId === place.id 
                            ? 'border-indigo-500 bg-indigo-500/10 shadow-sm' 
                            : 'border-white/10 hover:border-indigo-500/50 hover:bg-slate-800/50'
                        }`}
                      >
                        <h3 className="font-bold text-white text-lg">{place.name}</h3>
                        <p className="text-sm text-slate-400 mt-1 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" /> {place.location}
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
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Calendar className="text-indigo-500" />
                  Select Date
                </h2>
                <div className="max-w-md mx-auto">
                  <label className="block text-sm font-medium text-slate-400 mb-2">Choose an available date</label>
                  <input 
                    type="date"
                    min={new Date().toISOString().split('T')[0]} // today
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-5 py-4 text-lg bg-slate-900/80 border border-white/10 text-white rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-colors dark-color-scheme"
                  />
                  <p className="mt-4 text-sm text-slate-500 text-center">
                    Services operate Monday through Saturday.
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: Select Time Slot */}
            {step === 4 && (
              <div className="fade-in">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Clock className="text-indigo-500" />
                  Select Time Slot
                </h2>
                {loading ? (
                  <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div></div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 text-center mt-6">
                    {slots.map((slotObj, idx) => (
                      <button
                        key={idx}
                        disabled={!slotObj.available}
                        onClick={() => setFormData({ ...formData, slot: slotObj.time })}
                        className={`rounded-full px-4 py-2 font-medium transition-all ${
                          !slotObj.available 
                            ? 'bg-slate-800/50 opacity-40 cursor-not-allowed border border-transparent'
                            : formData.slot === slotObj.time 
                              ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20 transform -translate-y-1 border border-indigo-400' 
                              : 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500 hover:text-white hover:-translate-y-1'
                        }`}
                      >
                        {slotObj.time}
                      </button>
                    ))}
                  </div>
                )}
                
                {formData.slot && (
                  <div className="mt-8 p-6 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 flex items-start gap-4 fade-in">
                    <div className="bg-indigo-500 text-white p-2 rounded-full mt-1">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-indigo-300">Booking Summary</h4>
                      <ul className="mt-2 space-y-1 text-sm text-slate-300">
                        <li><strong className="text-slate-200">Location:</strong> {formData.place?.name}</li>
                        <li><strong className="text-slate-200">Date:</strong> {formData.date}</li>
                        <li><strong className="text-slate-200">Time:</strong> {formData.slot}</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 5: Success */}
            {step === 5 && (
              <div className="text-center py-10 fade-in flex flex-col items-center">
                <div className="w-24 h-24 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center mb-6 border border-indigo-500/30">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h2 className="text-3xl font-extrabold text-white mb-4">Booking Confirmed!</h2>
                <p className="text-lg text-slate-400 mb-8 max-w-md">
                  Your appointment at <strong className="text-white">{formData.place?.name}</strong> on <strong className="text-white">{formData.date}</strong> at <strong className="text-white">{formData.slot}</strong> has been successfully booked.
                </p>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="btn-primary"
                >
                  Go to Dashboard
                </button>
              </div>
            )}

          </div>

          {/* Navigation Buttons Footer */}
          {step < 5 && (
            <div className="p-6 border-t border-white/10 flex justify-between items-center bg-slate-900/30">
              {step > 1 ? (
                <button 
                  onClick={handleBack}
                  className="btn-secondary flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
              ) : (
                <div></div> // Empty div for flex spacing
              )}
              
              {step < 4 ? (
                <button 
                  onClick={handleNext}
                  disabled={(step === 1 && !formData.serviceId) || (step === 2 && !formData.placeId) || (step === 3 && !formData.date)}
                  className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button 
                  onClick={handleSubmit}
                  disabled={!formData.slot || submitLoading}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors shadow-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitLoading ? 'Confirming...' : 'Confirm Booking'}
                  {!submitLoading && <CheckCircle2 className="w-4 h-4" />}
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
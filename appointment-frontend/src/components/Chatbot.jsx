import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your AI Booking Assistant. I can help you find services, book appointments, or answer questions. How can I help you sparkle today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInput('');
    setIsTyping(true);

    const thinkTime = 1000 + Math.random() * 1500;
    
    setTimeout(() => {
      let botResponse = "I'm still learning, but I'm here to help! Could you provide a bit more detail, or ask me about booking, services, discounts, or account management?";
      const lowerInput = userMessage.toLowerCase();

      const faq = [
        {
          keywords: ['hello', 'hi', 'hey', 'greetings', 'morning', 'afternoon', 'evening'],
          answer: "Hello there! ✨ How can I elevate your booking experience today?"
        },
        {
          keywords: ['book', 'booking', 'schedule', 'appointment', 'appoint'],
          answer: "Booking is easy! Navigate to our 'Services' section, choose your category (Hospital, Salon, Vehicle Repair), pick your preferred provider, select an available time slot, and confirm."
        },
        {
          keywords: ['cancel', 'reschedule', 'change', 'delete'],
          answer: "To cancel or reschedule, simply go to your 'Profile' or 'My Appointments' dashboard. Select the appointment you want to modify and choose either 'Cancel' or 'Reschedule'."
        },
        {
          keywords: ['service', 'services', 'offer', 'offerings', 'category', 'categories'],
          answer: "We offer premium bookings for top-tier Hospitals & Clinics, luxury Salons & Spas, and trusted Vehicle Repair centers."
        },
        {
          keywords: ['hours', 'time', 'timing', 'open', 'close', 'operating'],
          answer: "Our booking platform is available 24/7! However, individual service provider hours vary and are displayed prominently on their specific profile pages."
        },
        {
          keywords: ['contact', 'support', 'help', 'customer', 'number', 'email', 'phone'],
          answer: "Need help? You can reach our dedicated support team by emailing support@bookingplatform.com or calling 1-800-BOOK-NOW. We're here for you!"
        },
        {
          keywords: ['discount', 'reward', 'spin', 'wheel', 'points', 'coupon', 'promo', 'deal', 'wallet'],
          answer: "Check out our 'Spin to Win' wheel on the booking page for daily discounts! You also earn reward points for every completed booking, which are stored securely in your Rewards Wallet."
        },
        {
          keywords: ['account', 'register', 'sign', 'login', 'create'],
          answer: "To create an account or log in, click the Profile or Login icon at the top right of the screen. You'll just need your basic details to get started."
        },
        {
          keywords: ['payment', 'pay', 'secure', 'credit', 'debit', 'cash', 'card', 'checkout'],
          answer: "We use industry-standard encryption for all payments. You can securely pay online using credit/debit cards, chosen digital wallets, or opt for pay-at-venue if the provider allows it."
        },
        {
          keywords: ['miss', 'late', 'delay', 'show'],
          answer: "If you know you'll be late or miss an appointment, please contact the service provider directly. Remember that successive no-shows might lead to temporary slot booking restrictions."
        },
        {
           keywords: ['password', 'reset', 'forgot'],
           answer: "If you forgot your password, just click 'Forgot Password' on the login screen. We'll send a secure reset link straight to your registered email address."
        },
        {
           keywords: ['cost', 'price', 'fee', 'charge', 'expensive'],
           answer: "Prices range depending on the service and provider you select. You will always see the full, transparent cost explicitly detailed before you confirm any booking."
        },
        {
           keywords: ['who', 'what', 'human', 'bot', 'robot', 'ai'],
           answer: "I am your AI Booking Assistant! I'm a virtual helper designed to make finding and booking your appointments as smooth and magical as possible. ✨"
        }
      ];

      for (const item of faq) {
        if (item.keywords.some(keyword => new RegExp('\\b' + keyword + '\\b', 'i').test(lowerInput))) {
          botResponse = item.answer;
          break;
        }
      }

      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
      setIsTyping(false);
    }, thinkTime);
  };

  return (
    <>
      {/* Floating Button (PREVIOUS DARK NEON STYLE - ENHANCED VIBRANCY) */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4 fade-in group cursor-pointer" onClick={() => setIsOpen(true)}>
          <span className="hidden sm:block text-fuchsia-200 font-extrabold tracking-widest uppercase text-[10px] drop-shadow-[0_0_8px_rgba(217,70,239,0.8)] opacity-100">
             Chat ✨
          </span>
          <button
            className="p-0 w-[72px] h-[72px] bg-slate-950 rounded-full shadow-[0_0_30px_rgba(6,182,212,0.6),_0_0_60px_rgba(217,70,239,0.5)] group-hover:scale-110 transition-transform duration-300 flex items-center justify-center border-[3px] border-fuchsia-400 group-hover:border-white overflow-hidden ring-[6px] ring-cyan-500/30"
            aria-label="Open AI chat"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/40 to-fuchsia-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Sparkles className="w-10 h-10 text-white drop-shadow-[0_0_15px_rgba(255,255,255,1)] animate-pulse" />
          </button>
        </div>
      )}

      {/* Chat Window (NEW LIGHT THEME) */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-3xl shadow-[0_10px_50px_rgba(0,0,0,0.5)] border border-slate-200 flex flex-col z-50 overflow-hidden fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 text-white flex justify-between items-center shadow-md z-10">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm border border-white/30 shadow-inner">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-white drop-shadow-sm">Chatbot</span>
                <span className="text-[10px] text-cyan-100 font-semibold uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                  Online
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="p-4 h-[350px] overflow-y-auto bg-slate-50 flex flex-col gap-4 scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white self-end rounded-tr-sm' 
                    : 'bg-white text-slate-700 border border-slate-200 self-start rounded-tl-sm'
                }`}
              >
                {msg.text}
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="bg-white border border-slate-200 self-start rounded-2xl rounded-tl-sm p-4 w-16 h-11 flex items-center justify-center gap-1 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-cyan-400 typing-dot"></div>
                <div className="w-2 h-2 rounded-full bg-cyan-400 typing-dot"></div>
                <div className="w-2 h-2 rounded-full bg-cyan-400 typing-dot"></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-200 z-10">
            <form onSubmit={handleSend} className="flex gap-2 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Chatbot anything..."
                className="flex-1 px-5 py-3 bg-slate-100 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-full focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-sm transition-all"
              />
              <button 
                type="submit"
                disabled={!input.trim()}
                className={`absolute right-1 top-1 bottom-1 p-2.5 rounded-full transition-all flex items-center justify-center min-w-[40px] shadow-md ${
                  input.trim() 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 text-white shadow-[0_5px_15px_rgba(6,182,212,0.4)]' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed hidden'
                }`}
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
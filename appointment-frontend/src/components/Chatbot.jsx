import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import chatbotIcon from '../assets/chatbot-icon.png';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi there! I'm your BookIt assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInput('');

    // Rule-based logic
    setTimeout(() => {
      let botResponse = "I'm sorry, I don't understand that. You can ask me how to book, about available services, or working hours.";
      const lowerInput = userMessage.toLowerCase();

      if (lowerInput.includes('how to book') || lowerInput.includes('book appointment')) {
        botResponse = "To book an appointment: Go to Services → Select a service → Choose a place → Select an available slot → Confirm your booking.";
      } else if (lowerInput.includes('available service') || lowerInput.includes('what services')) {
        botResponse = "We currently offer Hospital, Salon, and Vehicle Repair appointments.";
      } else if (lowerInput.includes('cancel')) {
        botResponse = "To cancel an appointment, please log in, open your Dashboard, and click the 'Cancel' button next to the relevant appointment.";
      } else if (lowerInput.includes('working hours') || lowerInput.includes('time')) {
        botResponse = "Our working hours are generally 9 AM to 6 PM, but this may vary slightly depending on the specific service provider.";
      } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        botResponse = "Hello! How can I assist you with your bookings today?";
      }

      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    }, 500);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 p-0 w-14 h-14 bg-slate-900 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:scale-105 transition-transform duration-200 z-50 flex items-center justify-center border border-white/10"
          aria-label="Open chat"
        >
          <img src={chatbotIcon} alt="Chatbot" className="w-10 h-10 object-contain drop-shadow-[0_0_5px_rgba(99,102,241,0.8)]" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 bg-slate-900 rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/10 flex flex-col z-50 overflow-hidden fade-in backdrop-blur-md">
          {/* Header */}
          <div className="bg-slate-800/80 p-4 text-white flex justify-between items-center border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-500/20 p-1.5 rounded-full border border-indigo-500/30">
                <img src={chatbotIcon} alt="Bot" className="w-5 h-5 object-contain" />
              </div>
              <span className="font-semibold text-lg text-slate-200">BookIt Assistant</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white hover:bg-slate-700/50 p-1.5 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="p-4 h-80 overflow-y-auto bg-slate-950/80 flex flex-col gap-3">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`max-w-[80%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-indigo-600 text-white self-end rounded-tr-sm shadow-md' 
                    : 'bg-slate-800 text-slate-200 border border-white/10 self-start rounded-tl-sm shadow-sm'
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-slate-900 border-t border-white/10">
            <form onSubmit={handleSend} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 px-4 py-2.5 bg-slate-800 border-none text-white placeholder-slate-400 rounded-full focus:ring-2 focus:ring-indigo-500 outline-none text-sm transition-shadow"
              />
              <button 
                type="submit"
                className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors flex items-center justify-center min-w-[44px] shadow-sm ml-1"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
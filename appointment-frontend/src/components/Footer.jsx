import React from 'react';
import { CalendarClock, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-slate-300 mt-auto relative border-t border-slate-800">
      {/* Subtle top gradient line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 opacity-80"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-blue-400 mb-6 group cursor-pointer">
              <div className="p-2 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors">
                <CalendarClock className="h-7 w-7 text-blue-400" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">BookIt</span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed text-sm">
              The premium appointment booking ecosystem designed to seamlessly connect professionals with their clients.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-bold tracking-wider uppercase mb-6 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center text-slate-400 hover:text-white transition-colors cursor-pointer text-sm">
                <Mail className="h-5 w-5 mr-3 text-slate-500" />
                support@bookit.com
              </li>
              <li className="flex items-center text-gray-400 hover:text-white transition-colors">
                <Phone className="h-5 w-5 mr-3" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-start text-gray-400 hover:text-white transition-colors">
                <MapPin className="h-5 w-5 mr-3 mt-0.5" />
                123 Business Avenue, Suite 100<br />New York, NY 10001
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-bold tracking-wider uppercase mb-6 text-white">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-slate-400 hover:text-white hover:underline transition-all">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white hover:underline transition-all">Terms of Service</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white hover:underline transition-all">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-16 pt-10 pb-4 flex flex-col items-center justify-center text-sm text-slate-500 max-w-7xl mx-auto gap-4">
          <div className="flex gap-8 mb-2">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </div>
          <p className="text-center">&copy; {new Date().getFullYear()} BookIt Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React from 'react';
import { Leaf, ShieldCheck, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
              <Leaf className="w-4 h-4" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">WasteChain Platform</p>
              <p className="text-slate-400 text-[11px]">Empowering circular economies with AI verification</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-300 font-medium">
            <a href="#about" className="hover:text-emerald-400 transition-colors">About WasteChain</a>
            <a href="#privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
            <a href="#api" className="hover:text-emerald-400 transition-colors">API Specs</a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p>© {new Date().getFullYear()} WasteChain Inc. All rights reserved. Hackathon Edition.</p>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for a Sustainable Future</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

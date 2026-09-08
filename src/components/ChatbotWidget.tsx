import React from 'react';
import { Sparkles, Bot, Ruler, Mic, Zap } from 'lucide-react';

interface ChatbotWidgetProps {
  onClick: () => void;
}

export default function ChatbotWidget({ onClick }: ChatbotWidgetProps) {
  return (
    <section className="w-full flex justify-center items-center py-6 px-4 relative">
      {/* Outer Card Container with Futuristic Cyan / Sky Blue Gradient */}
      <div 
        className="relative w-full max-w-[320px] rounded-[24px] overflow-hidden flex flex-col items-center justify-center text-center p-5 sm:p-6 border border-white/80 transition-all duration-300 shadow-[0_20px_50px_rgba(16,132,220,0.18)]"
        style={{
          background: 'linear-gradient(145deg, #dffbff 0%, #b8f3ff 28%, #71dfff 55%, #239df4 100%)',
        }}
      >
        {/* Animated Futuristic Ambient Orbs */}
        <div className="absolute -top-24 -right-20 w-64 h-64 rounded-full bg-white/30 blur-xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-24 -left-20 w-56 h-56 rounded-full bg-sky-300/30 blur-2xl pointer-events-none" />

        {/* Stable, Large Bot Image (No frantic bouncing) */}
        <div className="relative z-10 mb-4">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-[22px] bg-white p-1.5 shadow-[0_15px_35px_rgba(5,72,135,0.22)] border border-white flex items-center justify-center transition-transform hover:scale-105 duration-300">
            <img
              src="https://plain-apac-prod-public.komododecks.com/202609/07/u9gkonoHbUx72eTNh7GG/image.png"
              alt="Om Setu AI"
              className="w-full h-full rounded-[18px] object-cover"
            />
          </div>
        </div>

        {/* Title: Ask me Anything */}
        <h2 className="relative z-10 text-xl sm:text-2xl font-extrabold text-[#06265d] tracking-tight font-display mb-5">
          Ask me Anything
        </h2>

        {/* Chat Now Button: Dark Blue text, smaller responsive size, sleek animation */}
        <button
          onClick={onClick}
          id="chatNowTriggerBtn"
          className="relative z-20 group w-full max-w-[200px] h-[46px] rounded-2xl cursor-pointer overflow-hidden border border-white/60 shadow-[0_12px_30px_rgba(0,112,220,0.30)] hover:shadow-[0_16px_36px_rgba(0,112,220,0.40)] active:scale-95 transition-all duration-200 flex items-center justify-center"
          style={{
            background: 'linear-gradient(110deg, #ffffff 0%, #e0f4ff 50%, #ffffff 100%)',
          }}
        >
          {/* Subtle button shine animation */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-sky-300/30 to-transparent pointer-events-none" />

          {/* Button Text in Dark Blue & Compact Responsive Font */}
          <span className="relative z-10 text-[#06265d] font-black text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-600 animate-pulse" />
            <span>Chat Now</span>
          </span>
        </button>
      </div>
    </section>
  );
}

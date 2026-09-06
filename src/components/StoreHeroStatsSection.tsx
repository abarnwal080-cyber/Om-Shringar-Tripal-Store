import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  ShieldCheck,
  Ruler,
  Droplets,
  Users,
  MapPin,
  Sparkles,
  CheckCircle2,
  Award
} from "lucide-react";

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
  decimals?: number;
}

const AnimatedCounter: React.FC<CounterProps> = ({
  end,
  suffix = "",
  duration = 1800,
  decimals = 0,
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function: easeOutExpo
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = easeOut * end;
      
      setCount(currentVal);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
      {suffix}
    </span>
  );
};

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, className = "" }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    );
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransformStyle("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export default function StoreHeroStatsSection() {
  return (
    <div className="w-full relative overflow-hidden pt-4 pb-12 sm:pb-16 select-none">
      {/* Decorative Background Accents */}
      <div
        className="absolute top-0 left-0 w-44 h-36 opacity-35 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#3f6ee8 1.5px, transparent 1.5px)",
          backgroundSize: "16px 16px",
        }}
      />
      <div
        className="absolute top-6 right-0 w-44 h-36 opacity-25 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#f97316 1.5px, transparent 1.5px)",
          backgroundSize: "16px 16px",
        }}
      />

      {/* Main Header & Title Area */}
      <div className="text-center relative z-10 max-w-4xl mx-auto px-4">
        {/* Established Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/80 text-blue-900 shadow-sm mb-4"
        >
          <Award className="w-3.5 h-3.5 text-blue-600" />
          <span className="text-xs font-black tracking-wider uppercase font-mono">
            SINCE 2000
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
        </motion.div>

        {/* Store Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-1 mb-3"
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-[#0B2D5C] leading-tight flex items-center justify-center flex-wrap gap-x-3">
            <span>Om Shringar</span>
            <span className="text-amber-500 inline-block drop-shadow-sm">♛</span>
            <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 bg-clip-text text-transparent">
              Tirpal Store
            </span>
            <span className="text-orange-500 text-2xl sm:text-3xl inline-block animate-pulse">✦</span>
          </h1>

          {/* Decorative Curved Underline */}
          <div className="flex justify-center pt-1 pb-2">
            <svg
              className="w-48 sm:w-64 h-3 text-orange-500/80"
              viewBox="0 0 200 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 9C50 2 150 2 197 9"
                stroke="url(#titleGradient)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="titleGradient" x1="3" y1="6" x2="197" y2="6" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0B2D5C" />
                  <stop offset="0.5" stopColor="#FF6B00" />
                  <stop offset="1" stopColor="#0B2D5C" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </motion.div>

        {/* Location Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-2 text-slate-600 text-sm sm:text-base font-semibold mb-10 sm:mb-12"
        >
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-50 border border-rose-200/80 shadow-xs">
            <MapPin className="w-3.5 h-3.5 text-rose-600 animate-bounce" />
          </span>
          <span className="text-slate-800 font-bold tracking-wide">
            Maharajganj, Siwan, Bihar
          </span>
        </motion.div>
      </div>

      {/* 4 Feature Cards Grid */}
      <div className="max-w-6xl mx-auto px-2 sm:px-6 relative z-10 w-full box-border">
        <div className="grid grid-cols-4 gap-[6px] sm:gap-6 w-full box-border">
          
          {/* Card 1: 26+ Years of Trust (Blue) */}
          <TiltCard className="h-full min-w-0 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="h-full relative p-[10px_5px] sm:p-6 rounded-[14px] sm:rounded-3xl bg-gradient-to-b from-white to-blue-50/40 border border-blue-100/90 shadow-[0_10px_30px_rgba(11,45,92,0.06)] hover:shadow-[0_20px_40px_rgba(11,45,92,0.12)] transition-all duration-300 flex flex-col justify-between overflow-hidden group min-w-0 w-full box-border"
            >
              {/* Card top accent strip */}
              <div className="absolute top-0 left-0 right-0 h-1 sm:h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500" />
              
              <div>
                <div className="flex items-center justify-center sm:justify-between mb-2 sm:mb-5">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-2xl bg-blue-500/10 border border-blue-200/80 text-blue-600 flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shrink-0">
                    <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-100/80 px-2.5 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3 text-blue-600" />
                    Est. 2000
                  </span>
                </div>

                <div className="space-y-0.5 sm:space-y-1 mb-0 sm:mb-2 text-center sm:text-left">
                  <div className="text-[19px] sm:text-4xl md:text-5xl font-black font-display text-blue-950 tracking-tight flex items-baseline justify-center sm:justify-start gap-0.5 leading-[1.1] sm:leading-normal">
                    <AnimatedCounter end={26} suffix="+" />
                  </div>
                  <h3 className="text-[9px] sm:text-base font-extrabold text-slate-900 font-display leading-[1.1] sm:leading-normal">
                    <span className="hidden sm:inline">Years of Trust</span>
                    <span className="sm:hidden">Trust</span>
                  </h3>
                </div>

                <p className="hidden sm:block text-xs text-slate-500 leading-relaxed font-medium">
                  Continuous reliable supply of heavy-duty tarpaulins since year 2000.
                </p>
              </div>

              <div className="hidden sm:flex mt-5 pt-3 border-t border-blue-100/80 items-center justify-between text-[11px] font-bold text-blue-700">
                <span>Direct Authorized</span>
                <span className="text-blue-500">★★★★★</span>
              </div>
            </motion.div>
          </TiltCard>

          {/* Card 2: 50+ Size Configurations (Emerald Green) */}
          <TiltCard className="h-full min-w-0 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-full relative p-[10px_5px] sm:p-6 rounded-[14px] sm:rounded-3xl bg-gradient-to-b from-white to-emerald-50/40 border border-emerald-100/90 shadow-[0_10px_30px_rgba(16,185,129,0.06)] hover:shadow-[0_20px_40px_rgba(16,185,129,0.12)] transition-all duration-300 flex flex-col justify-between overflow-hidden group min-w-0 w-full box-border"
            >
              {/* Card top accent strip */}
              <div className="absolute top-0 left-0 right-0 h-1 sm:h-1.5 bg-gradient-to-r from-emerald-500 to-teal-400" />

              <div>
                <div className="flex items-center justify-center sm:justify-between mb-2 sm:mb-5">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-2xl bg-emerald-500/10 border border-emerald-200/80 text-emerald-600 flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shrink-0">
                    <Ruler className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Ready Stock
                  </span>
                </div>

                <div className="space-y-0.5 sm:space-y-1 mb-0 sm:mb-2 text-center sm:text-left">
                  <div className="text-[19px] sm:text-4xl md:text-5xl font-black font-display text-emerald-950 tracking-tight flex items-baseline justify-center sm:justify-start gap-0.5 leading-[1.1] sm:leading-normal">
                    <AnimatedCounter end={50} suffix="+" />
                  </div>
                  <h3 className="text-[9px] sm:text-base font-extrabold text-slate-900 font-display leading-[1.1] sm:leading-normal">
                    <span className="hidden sm:inline">Size Configurations</span>
                    <span className="sm:hidden">Sizes</span>
                  </h3>
                </div>

                <p className="hidden sm:block text-xs text-slate-500 leading-relaxed font-medium">
                  Standard sizes from 6×6 ft up to 60×100 ft rolls available on counter.
                </p>
              </div>

              <div className="hidden sm:flex mt-5 pt-3 border-t border-emerald-100/80 items-center justify-between text-[11px] font-bold text-emerald-700">
                <span>Custom Rolls</span>
                <span>Fast Cutting</span>
              </div>
            </motion.div>
          </TiltCard>

          {/* Card 3: 100% Waterproof & UV Tested (Cyan / Water Ocean) */}
          <TiltCard className="h-full min-w-0 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="h-full relative p-[10px_5px] sm:p-6 rounded-[14px] sm:rounded-3xl bg-gradient-to-b from-white to-cyan-50/40 border border-cyan-100/90 shadow-[0_10px_30px_rgba(6,182,212,0.06)] hover:shadow-[0_20px_40px_rgba(6,182,212,0.12)] transition-all duration-300 flex flex-col justify-between overflow-hidden group min-w-0 w-full box-border"
            >
              {/* Card top accent strip */}
              <div className="absolute top-0 left-0 right-0 h-1 sm:h-1.5 bg-gradient-to-r from-cyan-500 to-blue-500" />

              <div>
                <div className="flex items-center justify-center sm:justify-between mb-2 sm:mb-5">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-2xl bg-cyan-500/10 border border-cyan-200/80 text-cyan-600 flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white transition-all duration-300 shrink-0">
                    <Droplets className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-cyan-800 bg-cyan-100/80 px-2.5 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3 text-cyan-600" />
                    Weather Guard
                  </span>
                </div>

                <div className="space-y-0.5 sm:space-y-1 mb-0 sm:mb-2 text-center sm:text-left">
                  <div className="text-[19px] sm:text-4xl md:text-5xl font-black font-display text-cyan-950 tracking-tight flex items-baseline justify-center sm:justify-start gap-0.5 leading-[1.1] sm:leading-normal">
                    <AnimatedCounter end={100} suffix="%" />
                  </div>
                  <h3 className="text-[9px] sm:text-base font-extrabold text-slate-900 font-display leading-[1.1] sm:leading-normal">
                    <span className="hidden sm:inline">Waterproof & UV Tested</span>
                    <span className="sm:hidden">Waterproof</span>
                  </h3>
                </div>

                <p className="hidden sm:block text-xs text-slate-500 leading-relaxed font-medium">
                  Laboratory tested for heat resilience, heavy rain, and harsh sunlight.
                </p>
              </div>

              <div className="hidden sm:flex mt-5 pt-3 border-t border-cyan-100/80 items-center justify-between text-[11px] font-bold text-cyan-800">
                <span>Multi-Season</span>
                <span>Zero Leak</span>
              </div>
            </motion.div>
          </TiltCard>

          {/* Card 4: 10k+ Happy Customers (Purple / Indigo) */}
          <TiltCard className="h-full min-w-0 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="h-full relative p-[10px_5px] sm:p-6 rounded-[14px] sm:rounded-3xl bg-gradient-to-b from-white to-purple-50/40 border border-purple-100/90 shadow-[0_10px_30px_rgba(168,85,247,0.06)] hover:shadow-[0_20px_40px_rgba(168,85,247,0.12)] transition-all duration-300 flex flex-col justify-between overflow-hidden group min-w-0 w-full box-border"
            >
              {/* Card top accent strip */}
              <div className="absolute top-0 left-0 right-0 h-1 sm:h-1.5 bg-gradient-to-r from-purple-500 to-pink-500" />

              <div>
                <div className="flex items-center justify-center sm:justify-between mb-2 sm:mb-5">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-2xl bg-purple-500/10 border border-purple-200/80 text-purple-600 flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 shrink-0">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-purple-800 bg-purple-100/80 px-2.5 py-0.5 rounded-full">
                    <Sparkles className="w-3 h-3 text-purple-600" />
                    Top Rated
                  </span>
                </div>

                <div className="space-y-0.5 sm:space-y-1 mb-0 sm:mb-2 text-center sm:text-left">
                  <div className="text-[19px] sm:text-4xl md:text-5xl font-black font-display text-purple-950 tracking-tight flex items-baseline justify-center sm:justify-start gap-0.5 leading-[1.1] sm:leading-normal">
                    <AnimatedCounter end={10} suffix="k+" />
                  </div>
                  <h3 className="text-[9px] sm:text-base font-extrabold text-slate-900 font-display leading-[1.1] sm:leading-normal">
                    <span className="hidden sm:inline">Happy Customers</span>
                    <span className="sm:hidden">Customers</span>
                  </h3>
                </div>

                <p className="hidden sm:block text-xs text-slate-500 leading-relaxed font-medium">
                  Trusted by farmers, builders, shopkeepers, and transporters across Siwan.
                </p>
              </div>

              <div className="hidden sm:flex mt-5 pt-3 border-t border-purple-100/80 items-center justify-between text-[11px] font-bold text-purple-800">
                <span>Wholesale & Retail</span>
                <span>4.9★ Satisfaction</span>
              </div>
            </motion.div>
          </TiltCard>

        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { Clock, CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "motion/react";

interface StoreStatusCardProps {
  currentLanguage: "en" | "hi";
  className?: string;
  variant?: "dark" | "light";
}

export default function StoreStatusCard({ currentLanguage, className = "", variant = "dark" }: StoreStatusCardProps) {
  const [istTime, setIstTime] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [timeLeftStr, setTimeLeftStr] = useState<string>("");

  // Get current India Standard Time (IST)
  const getISTDate = () => {
    const now = new Date();
    const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
    // IST is UTC + 5:30 (5 * 60 + 30 = 330 minutes)
    const istOffset = 5.5 * 60 * 60000;
    return new Date(utcTime + istOffset);
  };

  useEffect(() => {
    // Initial calculate
    const updateStatus = () => {
      const ist = getISTDate();
      setIstTime(ist);

      const day = ist.getDay(); // 0 is Sunday, 1-6 is Monday-Saturday
      const hours = ist.getHours();
      const minutes = ist.getMinutes();

      // Store is open Monday to Saturday, 6:00 AM to 9:00 PM (06:00 to 21:00)
      const isMonToSat = day !== 0;
      const isWithinHours = hours >= 6 && hours < 21;
      const openNow = isMonToSat && isWithinHours;

      setIsOpen(openNow);

      // Calculate time left until open/close
      if (openNow) {
        // Closes at 21:00
        const totalMinutesLeft = (21 * 60) - (hours * 60 + minutes);
        const hrs = Math.floor(totalMinutesLeft / 60);
        const mins = totalMinutesLeft % 60;
        
        if (currentLanguage === "en") {
          setTimeLeftStr(`Closes in ${hrs > 0 ? `${hrs}h ` : ""}${mins}m (at 9:00 PM)`);
        } else {
          setTimeLeftStr(`रात 9:00 बजे बंद होगा (${hrs > 0 ? `${hrs} घंटे ` : ""}${mins} मिनट में)`);
        }
      } else {
        // Closed. Find when it opens.
        if (day === 0) {
          // Sunday, opens Monday at 6:00 AM
          if (currentLanguage === "en") {
            setTimeLeftStr("Opens Monday at 6:00 AM");
          } else {
            setTimeLeftStr("सोमवार सुबह 6:00 बजे खुलेगा");
          }
        } else {
          // Mon-Sat but outside hours
          if (hours < 6) {
            // Opens today at 6:00 AM
            const totalMinutesLeft = (6 * 60) - (hours * 60 + minutes);
            const hrs = Math.floor(totalMinutesLeft / 60);
            const mins = totalMinutesLeft % 60;
            if (currentLanguage === "en") {
              setTimeLeftStr(`Opens in ${hrs > 0 ? `${hrs}h ` : ""}${mins}m (at 6:00 AM)`);
            } else {
              setTimeLeftStr(`सुबह 6:00 बजे खुलेगा (${hrs > 0 ? `${hrs} घंटे ` : ""}${mins} मिनट में)`);
            }
          } else {
            // Opens tomorrow at 6:00 AM
            if (currentLanguage === "en") {
              setTimeLeftStr("Opens tomorrow at 6:00 AM");
            } else {
              setTimeLeftStr("कल सुबह 6:00 बजे खुलेगा");
            }
          }
        }
      }
    };

    updateStatus();
    const interval = setInterval(updateStatus, 30000); // update every 30 seconds

    return () => clearInterval(interval);
  }, [currentLanguage]);

  // Format time for display (e.g., 07:14 PM IST)
  const formatTime = (date: Date) => {
    let hrs = date.getHours();
    const mins = date.getMinutes();
    const ampm = hrs >= 12 ? "PM" : "AM";
    hrs = hrs % 12;
    hrs = hrs ? hrs : 12; // the hour '0' should be '12'
    const minsStr = mins < 10 ? "0" + mins : mins;
    return `${hrs}:${minsStr} ${ampm} IST`;
  };

  const formattedTimeStr = istTime ? formatTime(istTime) : "";

  const isDark = variant === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-2xl border ${
        isOpen
          ? isDark
            ? "bg-emerald-950/25 border-emerald-500/20 hover:border-emerald-500/40 text-white"
            : "bg-emerald-50/90 border-emerald-200 hover:border-emerald-300 text-slate-800"
          : isDark
            ? "bg-amber-950/25 border-amber-500/20 hover:border-amber-500/40 text-white"
            : "bg-amber-50/90 border-amber-200 hover:border-amber-300 text-slate-800"
      } p-4 transition-all duration-300 backdrop-blur-md ${className}`}
    >
      {/* Background glow circle */}
      <div
        className={`absolute -right-10 -bottom-10 w-24 h-24 rounded-full blur-2xl pointer-events-none opacity-20 ${
          isOpen ? "bg-emerald-500" : "bg-amber-500"
        }`}
      />

      <div className="flex items-start justify-between gap-3 relative z-10">
        <div className="flex gap-3">
          {/* Status Indicator Icon with Pulse Ring */}
          <div className="relative flex items-center justify-center shrink-0 mt-0.5">
            {isOpen ? (
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            ) : (
              <span className="relative flex h-3 w-3">
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
              </span>
            )}
          </div>

          <div>
            {/* Store Status Tagline */}
            <div className="flex items-center gap-1.5">
              <span
                className={`text-[10px] font-black font-mono tracking-wider uppercase px-2 py-0.5 rounded-md ${
                  isOpen
                    ? isDark
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-emerald-500/15 text-emerald-700 border border-emerald-500/30"
                    : isDark
                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      : "bg-amber-500/15 text-amber-700 border border-amber-500/30"
                }`}
              >
                {isOpen
                  ? currentLanguage === "en"
                    ? "LIVE: OPEN NOW"
                    : "लाइव: अभी खुला है"
                  : currentLanguage === "en"
                  ? "LIVE: CLOSED NOW"
                  : "लाइव: अभी बंद है"}
              </span>
            </div>

            {/* Timings Info Text */}
            <p className={`text-xs mt-2 font-semibold ${isDark ? "text-slate-300" : "text-slate-700"}`}>
              {currentLanguage === "en" ? "Store Timings:" : "दुकान का समय:"}{" "}
              <span className={`font-mono font-bold text-xs px-1.5 py-0.5 rounded ml-0.5 ${
                isDark ? "bg-slate-950/40 text-white" : "bg-slate-200/80 text-slate-800"
              }`}>
                6:00 AM – 9:00 PM
              </span>
            </p>

            <p className={`text-[11px] font-mono mt-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              {currentLanguage === "en" ? "Monday to Saturday" : "सोमवार से शनिवार (रविवार बंद)"}
            </p>

            {/* Countdown / Smart timing notification */}
            <div className="flex items-center gap-1.5 mt-2.5 text-[11px]">
              {isOpen ? (
                <CheckCircle className={`w-3.5 h-3.5 shrink-0 ${isDark ? "text-emerald-400" : "text-emerald-600"}`} />
              ) : (
                <AlertCircle className={`w-3.5 h-3.5 shrink-0 ${isDark ? "text-amber-400" : "text-amber-600"}`} />
              )}
              <span className={`font-bold ${
                isOpen
                  ? isDark ? "text-emerald-300" : "text-emerald-700"
                  : isDark ? "text-amber-300" : "text-amber-700"
              }`}>
                {timeLeftStr}
              </span>
            </div>
          </div>
        </div>

        {/* Live IST clock reading */}
        <div className="text-right flex flex-col items-end gap-1 font-mono">
          <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold text-slate-500">
            <Clock className="w-3 h-3" />
            <span>Siwan, BR</span>
          </div>
          <span className={`text-xs font-bold tracking-tight px-2 py-1 rounded border shadow-inner ${
            isDark 
              ? "bg-slate-950/30 text-white border-white/5" 
              : "bg-white text-slate-800 border-slate-200"
          }`}>
            {formattedTimeStr || "6:00 AM"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, X, Heart } from "lucide-react";

export default function GoogleReviewPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check localStorage for previous dismissals (30 days threshold)
    const lastDismissed = localStorage.getItem("google_review_dismissed_at");
    const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;

    if (lastDismissed) {
      const timeSinceDismissal = Date.now() - parseInt(lastDismissed, 10);
      if (timeSinceDismissal < thirtyDaysMs) {
        return; // Do not show if dismissed in the last 30 days
      }
    }

    // Trigger popup after 45 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 45000);

    return () => clearTimeout(timer);
  }, []);

  // Manage body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleDismiss();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleDismiss = () => {
    localStorage.setItem("google_review_dismissed_at", Date.now().toString());
    setIsOpen(false);
  };

  const handleReviewNow = () => {
    localStorage.setItem("google_review_dismissed_at", Date.now().toString());
    window.open("https://g.page/r/CcNkBnhh_d2nEAE/review", "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop Overlay with Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-md cursor-pointer"
          />

          {/* Popup Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-slate-900/90 text-white border border-white/10 shadow-2xl backdrop-blur-xl z-10"
          >
            {/* Top-right Circular Close Button */}
            <button
              onClick={handleDismiss}
              aria-label="Close"
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Glowing Top Decoration Line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500" />

            <div className="p-6 sm:p-8 flex flex-col items-center text-center">
              {/* Google Reviews Icon / Star badge */}
              <div className="mb-5 relative flex items-center justify-center">
                <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full w-14 h-14" />
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center shadow-lg">
                  {/* Styled minimalist 'G' and star icon */}
                  <span className="text-2xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-red-400 to-yellow-400">G</span>
                </div>
              </div>

              {/* ⭐⭐⭐⭐⭐ Rating Stars */}
              <div className="flex items-center gap-1 mb-3 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-3">
                Love our products?
              </h3>

              {/* Description */}
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Your valuable feedback helps us grow and helps other customers choose a trusted tarpaulin supplier.
              </p>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                If you are satisfied with our products and service, please take a moment to leave us a Google Review.
              </p>

              {/* Divider */}
              <div className="w-full h-px bg-white/10 mb-5" />

              {/* Business Badge */}
              <div className="mb-6">
                <div className="text-xs uppercase tracking-wider text-orange-400 font-bold mb-1">
                  Business Name
                </div>
                <div className="text-base font-extrabold text-white tracking-tight">
                  Om Shringar Tirpal Store
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Trusted Since 2000
                </div>
              </div>

              {/* Buttons */}
              <div className="w-full flex flex-col gap-3">
                {/* Primary Button */}
                <button
                  onClick={handleReviewNow}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-extrabold text-sm transition-all duration-200 shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer animate-pulse-slow"
                >
                  <Star className="w-4 h-4 fill-current text-white animate-spin-slow" />
                  <span>Review Now</span>
                </button>

                {/* Secondary Button */}
                <button
                  onClick={handleDismiss}
                  className="w-full py-3 px-6 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-semibold text-sm border border-white/5 transition-all duration-200 cursor-pointer"
                >
                  Maybe Later
                </button>
              </div>

              {/* Trust Badge / Footer */}
              <div className="mt-6 flex items-center gap-1.5 text-[11px] font-medium text-slate-400 bg-white/5 px-3 py-1.5 rounded-full">
                <Heart className="w-3 h-3 text-rose-500 fill-current" />
                <span>Your review helps local businesses grow</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

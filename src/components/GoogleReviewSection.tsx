import React, { useState, useEffect, useCallback } from "react";

const GOOGLE_REVIEW_URL = "https://g.page/r/CcNkBnhh_d2nEBM/review";

interface GoogleReviewSectionProps {
  className?: string;
  variant?: "banner" | "button-only" | "google-ad";
}

export default function GoogleReviewSection({
  className = "",
  variant = "banner",
}: GoogleReviewSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const resetState = useCallback(() => {
    setRating(0);
    setHoverRating(0);
    setIsSubmitted(false);
  }, []);

  const handleOpen = () => {
    resetState();
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    resetState();
  };

  // Prevent background scrolling when popup is active
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleStarClick = (selected: number) => {
    setRating(selected);
  };

  const handleContinueToGoogle = () => {
    if (rating === 0) return;
    // Open Google review link in new tab
    window.open(GOOGLE_REVIEW_URL, "_blank", "noopener,noreferrer");
    // Transition to thank you screen
    setIsSubmitted(true);
  };

  const getRatingFeedbackText = (val: number) => {
    switch (val) {
      case 1:
        return "We're sorry to hear that.";
      case 2:
        return "Thank you for your feedback.";
      case 3:
        return "Thanks for sharing your experience.";
      case 4:
        return "We're glad you had a good experience!";
      case 5:
        return "We're delighted you loved your experience! ❤️";
      default:
        return "";
    }
  };

  const activeRating = hoverRating || rating;

  return (
    <>
      {/* Trigger Button Area */}
      {variant === "google-ad" ? (
        <div
          id="google-ad-voucher-banner"
          onClick={handleOpen}
          className={`group relative overflow-hidden bg-gradient-to-r from-amber-50/95 via-orange-50/80 to-white border border-amber-300/80 hover:border-amber-400 rounded-2xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer ${className}`}
        >
          {/* Subtle Google Ad badge indicator in top right */}
          <div className="absolute top-2 right-3 flex items-center gap-1 text-[10px] font-bold text-slate-400 select-none">
            <span className="px-1.5 py-0.2 rounded bg-slate-200/80 text-slate-600 font-mono text-[9px] uppercase tracking-wider">Ad</span>
            <span className="text-[10px] text-slate-400 font-sans hidden sm:inline">• Google Review Reward</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pr-10 sm:pr-0">
            {/* Left: Gift GIF + Headline */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border border-amber-200 shadow-xs flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <img
                  src="/assets/gift-box.gif"
                  alt="Gift Voucher"
                  className="w-9 h-9 sm:w-10 sm:h-10 object-contain"
                />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500" />
              </div>

              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <div className="flex text-amber-400 text-xs">
                    ★★★★★
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-black text-amber-800 bg-amber-100/90 px-2 py-0.5 rounded-full tracking-wide uppercase">
                    SPECIAL OFFER
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-black text-slate-900 tracking-tight font-display leading-snug group-hover:text-orange-600 transition-colors">
                  Rate Us 5★ &amp; Get a Chance to Win a ₹100 Shopping Voucher 🎁
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-600 font-medium">
                  Review Om Shringar Tirpal Store on Google to claim your instant lucky voucher.
                </p>
              </div>
            </div>

            {/* Right: CTA button */}
            <div className="shrink-0 flex items-center">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpen();
                }}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-xs hover:shadow transition-all group-hover:scale-105 cursor-pointer whitespace-nowrap"
              >
                <span>Rate &amp; Win ₹100</span>
                <span className="font-mono text-xs">↗</span>
              </button>
            </div>
          </div>
        </div>
      ) : variant === "banner" ? (
        <section className={`py-12 sm:py-16 bg-gradient-to-b from-slate-50 to-white text-center border-y border-slate-200/70 ${className}`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-[11px] font-bold text-slate-600 shadow-xs mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Google Verified Store • Maharajganj</span>
            </div>

            {/* Animated Gift Icon GIF */}
            <div className="flex justify-center mb-3">
              <div className="relative inline-flex items-center justify-center p-2 rounded-2xl bg-amber-50 border border-amber-200/90 shadow-xs">
                <img
                  src="/assets/gift-box.gif"
                  alt="Win ₹100 Voucher 🎁"
                  className="w-14 h-14 sm:w-16 sm:h-16 object-contain select-none"
                />
                <span className="absolute -top-1.5 -right-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-red-600 to-amber-600 text-white text-[10px] font-black tracking-wide uppercase shadow-xs">
                  VOUCHER
                </span>
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight font-display mb-2">
              Rate Us 5★ &amp; Get a Chance to Win a <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-red-600">₹100 Shopping Voucher</span> 🎁
            </h3>

            <div className="flex justify-center mt-6">
              <button
                onClick={handleOpen}
                id="google-review-trigger-btn"
                className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 hover:from-orange-700 hover:to-amber-700 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-[0_4px_16px_rgba(234,88,12,0.25)] hover:shadow-[0_8px_24px_rgba(234,88,12,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
              >
                <img
                  src="/assets/gift-box.gif"
                  alt="Gift"
                  className="w-5 h-5 object-contain"
                />
                <span>Rate Us 5★ on Google</span>
                <span className="text-xs font-mono opacity-90 group-hover:translate-x-0.5 transition-transform">↗</span>
              </button>
            </div>
          </div>
        </section>
      ) : (
        <div className={`flex justify-center ${className}`}>
          <button
            onClick={handleOpen}
            id="google-review-trigger-btn"
            className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-white hover:bg-slate-50 text-slate-900 hover:text-slate-950 font-bold text-sm rounded-2xl border border-slate-200/90 shadow-[0_3px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
          >
            <span className="text-amber-400 text-base group-hover:scale-125 transition-transform duration-200">★</span>
            <span>Rate Us on Google</span>
            <span className="text-xs font-mono text-slate-400 group-hover:text-slate-600 transition-colors">↗</span>
          </button>
        </div>
      )}

      {/* Modal Backdrop & Popup Container */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300"
          onClick={handleClose}
          aria-modal="true"
          role="dialog"
        >
          {/* Popup Dialog Box */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-white rounded-[24px] border border-slate-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-6 sm:p-8 text-center transform transition-all duration-300 animate-in fade-in zoom-in-95"
            style={{ borderRadius: "24px" }}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center text-lg font-bold transition-colors cursor-pointer"
              aria-label="Close"
            >
              ×
            </button>

            {!isSubmitted ? (
              /* State 1: Rating Screen */
              <div className="flex flex-col items-center">
                {/* Gift Animated Icon */}
                <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 shadow-xs flex items-center justify-center mb-3">
                  <img
                    src="/assets/gift-box.gif"
                    alt="Win ₹100 Voucher 🎁"
                    className="w-10 h-10 object-contain"
                  />
                </div>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black uppercase tracking-wider mb-2">
                  <span>🎁 ₹100 Shopping Voucher Giveaway</span>
                </div>

                <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight font-display">
                  Rate Us 5★ &amp; Win Voucher 🎁
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-1 mb-5">
                  Rate us 5 stars on Google to qualify for our ₹100 voucher lucky draw!
                </p>

                {/* 5 Large Interactive Stars */}
                <div
                  className="flex items-center justify-center gap-2 sm:gap-2.5 mb-3"
                  onMouseLeave={() => setHoverRating(0)}
                >
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = star <= activeRating;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleStarClick(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        className={`text-3xl sm:text-4xl transition-all duration-150 transform hover:scale-125 active:scale-95 cursor-pointer select-none ${
                          isFilled
                            ? "text-amber-400 drop-shadow-[0_2px_8px_rgba(251,191,36,0.35)]"
                            : "text-slate-200 hover:text-amber-300"
                        }`}
                        aria-label={`${star} star`}
                      >
                        ★
                      </button>
                    );
                  })}
                </div>

                {/* Dynamic Feedback Text */}
                <div className="h-6 flex items-center justify-center mb-6">
                  <p
                    className={`text-xs sm:text-sm font-semibold transition-opacity duration-200 ${
                      activeRating ? "text-slate-700 opacity-100" : "text-transparent opacity-0"
                    }`}
                  >
                    {getRatingFeedbackText(activeRating) || "\u00A0"}
                  </p>
                </div>

                {/* Continue to Google Button */}
                <button
                  type="button"
                  onClick={handleContinueToGoogle}
                  disabled={rating === 0}
                  className={`w-full py-3.5 px-6 rounded-2xl font-extrabold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                    rating > 0
                      ? "bg-slate-900 hover:bg-slate-800 text-white shadow-md hover:shadow-lg cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                      : "bg-slate-100 text-slate-400 border border-slate-200/60 cursor-not-allowed"
                  }`}
                >
                  <span>Continue to Google</span>
                  <span className="text-xs font-mono">↗</span>
                </button>
              </div>
            ) : (
              /* State 2: Thank You Screen */
              <div className="flex flex-col items-center py-2 animate-in fade-in duration-300">
                {/* Heart / Check Icon */}
                <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-100 text-rose-500 flex items-center justify-center text-2xl shadow-xs mb-4">
                  ❤️
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display mb-2">
                  Thank You! ❤️
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-xs mb-6">
                  We truly appreciate your valuable feedback and support.
                </p>

                {/* Trust Badge */}
                <div className="w-full bg-slate-50 rounded-2xl border border-slate-200/80 p-4 mb-6 text-center">
                  <div className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-wide uppercase">
                    26+ Years of Trust
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                    Serving customers with care
                  </div>
                </div>

                {/* Done Button */}
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full py-3 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

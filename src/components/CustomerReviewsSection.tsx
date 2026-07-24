import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, CheckCircle2, MapPin, UserCheck, Building2, Sparkles, Quote, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

export interface ReviewItem {
  id: string;
  name: string;
  initials: string;
  type: string;
  category: "all" | "customer" | "dealer" | "contractor";
  location: string;
  review: string;
  rating: number;
  avatarBg: string;
}

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    initials: "RK",
    type: "Local Customer",
    category: "customer",
    location: "Maharajganj, Bihar",
    review: "Main Maharajganj ka local customer hoon. Pichle 3 saal se Om Shringar Tirpal Store se hi tirpal aur plastic sheet le raha hoon. Quality hamesha best milti hai aur rate bhi genuine rehta hai.",
    rating: 5,
    avatarBg: "bg-gradient-to-br from-blue-600 to-indigo-700 text-white"
  },
  {
    id: "2",
    name: "Suman Devi",
    initials: "SD",
    type: "Local Customer",
    category: "customer",
    location: "Siwan, Bihar",
    review: "Ghar ke liye waterproof tarpaulin li thi. Baarish mein bhi bilkul perfect kaam kiya. Shop owner bahut achhe se guide karte hain.",
    rating: 5,
    avatarBg: "bg-gradient-to-br from-amber-500 to-orange-600 text-white"
  },
  {
    id: "3",
    name: "Mukesh Singh",
    initials: "MS",
    type: "Farmer",
    category: "customer",
    location: "Bihar",
    review: "Kheti ke kaam ke liye plastic sheet aur tirpal yahin se leta hoon. Material strong hai aur price market se sahi rehta hai.",
    rating: 5,
    avatarBg: "bg-gradient-to-br from-emerald-600 to-teal-700 text-white"
  },
  {
    id: "4",
    name: "Poonam Kumari",
    initials: "PK",
    type: "Local Customer",
    category: "customer",
    location: "Maharajganj",
    review: "Customer service bahut achhi lagi. Har product ke baare mein detail mein bataya aur quality bhi excellent mili.",
    rating: 5,
    avatarBg: "bg-gradient-to-br from-rose-500 to-pink-600 text-white"
  },
  {
    id: "5",
    name: "Rohit Gupta",
    initials: "RG",
    type: "Dealer",
    category: "dealer",
    location: "Wholesale Buyer",
    review: "Main dealer hoon aur regular bulk order leta hoon. Hamesha genuine quality aur timely supply milti hai. Business ke liye trusted supplier hai.",
    rating: 5,
    avatarBg: "bg-gradient-to-br from-violet-600 to-purple-700 text-white"
  },
  {
    id: "6",
    name: "Anil Agarwal",
    initials: "AA",
    type: "Wholesale Dealer",
    category: "dealer",
    location: "Bihar",
    review: "Wholesale rates bahut competitive hain. Plastic sheet, tarpaulin aur packaging materials ki quality consistent rehti hai.",
    rating: 5,
    avatarBg: "bg-gradient-to-br from-cyan-600 to-blue-700 text-white"
  },
  {
    id: "7",
    name: "Vivek Shah",
    initials: "VS",
    type: "Retail Dealer",
    category: "dealer",
    location: "Siwan",
    review: "Bulk quantity mein bhi quality same rehti hai. Delivery aur dealing dono professional hain. Recommend karunga.",
    rating: 5,
    avatarBg: "bg-gradient-to-br from-sky-600 to-indigo-600 text-white"
  },
  {
    id: "8",
    name: "Rakesh Yadav",
    initials: "RY",
    type: "Civil Contractor",
    category: "contractor",
    location: "Project Site",
    review: "Construction site ke liye 250 GSM tarpaulin li thi. Material heavy-duty hai aur kaafi durable nikla. Future projects ke liye bhi yahin se purchase karenge.",
    rating: 5,
    avatarBg: "bg-gradient-to-br from-orange-600 to-amber-700 text-white"
  },
  {
    id: "9",
    name: "Imran Khan",
    initials: "IK",
    type: "Building Contractor",
    category: "contractor",
    location: "Bihar",
    review: "Site covering ke liye black polythene aur tarpaulin use kiya. Product quality outstanding hai aur price bhi reasonable mila.",
    rating: 5,
    avatarBg: "bg-gradient-to-br from-slate-700 to-slate-900 text-white"
  },
  {
    id: "10",
    name: "Sunil Chaudhary",
    initials: "SC",
    type: "Road Contractor",
    category: "contractor",
    location: "Government & Private Projects",
    review: "Government aur private project dono ke liye yahan se material lete hain. Quality, stock availability aur service tino excellent hain. Om Shringar Tirpal Store reliable supplier hai.",
    rating: 5,
    avatarBg: "bg-gradient-to-br from-blue-800 to-slate-900 text-white"
  }
];

export const CustomerReviewsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const totalReviews = REVIEWS_DATA.length;

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalReviews);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalReviews) % totalReviews);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isPlaying) {
      autoPlayRef.current = setInterval(() => {
        handleNext();
      }, 5000);
    } else if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isPlaying, currentIndex]);

  const currentReview = REVIEWS_DATA[currentIndex];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 120 : -120,
      opacity: 0,
      scale: 0.96,
    }),
  };

  return (
    <section 
      id="reviews" 
      className="py-20 lg:py-28 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden border-t border-slate-100 scroll-mt-24"
    >
      {/* Background Decorative Soft Gradients */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200/80 text-[#FF7A00] font-mono text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#FF7A00] animate-pulse" />
            <span>Customer Reviews</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#0B2D5C] tracking-tight mb-4 leading-tight">
            Trusted by local customers, dealers, and contractors
          </h2>

          <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
            Read verified feedback from our valued customers, retail partners, and construction engineers across Bihar.
          </p>

          {/* Trust Highlights Strip */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-6 border-t border-slate-200/60">
            <div className="flex items-center gap-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs font-extrabold text-[#0B2D5C]">5.0 Out of 5 Stars</span>
            </div>
            
            <div className="h-4 w-px bg-slate-200 hidden sm:block" />

            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Genuine Local Testimonials</span>
            </div>

            <div className="h-4 w-px bg-slate-200 hidden sm:block" />

            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
              <Building2 className="w-4 h-4 text-slate-500" />
              <span>Serving Bihar Since 2000</span>
            </div>
          </div>
        </div>

        {/* 1-by-1 Slide Carousel Frame */}
        <div 
          className="max-w-3xl mx-auto relative px-2 sm:px-12"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous Review"
            className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-[#0B2D5C] hover:text-[#FF7A00] border border-slate-200 shadow-md hover:shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            aria-label="Next Review"
            className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-[#0B2D5C] hover:text-[#FF7A00] border border-slate-200 shadow-md hover:shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Single Review Card Container */}
          <div className="min-h-[340px] sm:min-h-[310px] flex items-center justify-center relative overflow-hidden py-2 px-1">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentReview.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="w-full bg-white/95 backdrop-blur-md rounded-[18px] p-6 sm:p-8 border border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_40px_rgba(11,45,92,0.12)] border-t-2 border-t-[#FF7A00] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Header Row: Avatar, Name, Role & Verified Badge */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                    <div className="flex items-center gap-3.5">
                      {/* Avatar Circle with Initials */}
                      <div className={`w-14 h-14 rounded-full ${currentReview.avatarBg} flex items-center justify-center font-extrabold text-base tracking-wider shadow-md shrink-0 border-2 border-white`}>
                        {currentReview.initials}
                      </div>

                      <div className="flex flex-col text-left">
                        <h3 className="text-lg font-extrabold text-[#0B2D5C] leading-snug">
                          {currentReview.name}
                        </h3>
                        <span className="text-xs font-bold text-slate-500">
                          {currentReview.type}
                        </span>
                      </div>
                    </div>

                    {/* Customer Verified Badge */}
                    <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-extrabold px-3 py-1.5 rounded-full border border-emerald-200/80 shrink-0 shadow-2xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                      <span>Customer Verified</span>
                    </div>
                  </div>

                  {/* 5-Star Rating Row */}
                  <div className="flex items-center gap-1 mb-4 text-amber-400">
                    {[...Array(currentReview.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Review Quote Text */}
                  <div className="relative text-left mb-6">
                    <Quote className="w-8 h-8 text-slate-200 absolute -top-3 -left-3 rotate-180 -z-0 opacity-60" />
                    <p className="relative z-10 text-slate-700 sm:text-base text-sm font-medium leading-relaxed italic pl-4 border-l-2 border-[#FF7A00]/40">
                      "{currentReview.review}"
                    </p>
                  </div>
                </div>

                {/* Footer Line: Location & Category */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <div className="flex items-center gap-1.5 text-slate-700 font-bold">
                    <MapPin className="w-4 h-4 text-[#FF7A00]" />
                    <span>{currentReview.location}</span>
                  </div>

                  <span className="text-xs font-mono font-extrabold text-[#0B2D5C] bg-slate-100 px-2.5 py-0.5 rounded-md">
                    {currentIndex + 1} / {totalReviews}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slider Pagination Controls & Auto-play Toggle */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
            
            {/* Dots Indicator */}
            <div className="flex items-center justify-center gap-2">
              {REVIEWS_DATA.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  aria-label={`Go to review ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentIndex
                      ? "w-8 bg-[#FF7A00]"
                      : "w-2.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>

            {/* Play/Pause Control Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-slate-600 hover:text-[#0B2D5C] bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-xs transition-colors cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#FF7A00]" />
                  <span>Pause Auto-slide</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                  <span>Play Auto-slide</span>
                </>
              )}
            </button>

          </div>
        </div>

        {/* Bottom Trust CTA Box */}
        <div className="mt-14 p-6 sm:p-8 rounded-[22px] bg-gradient-to-r from-[#0B2D5C] via-[#092244] to-[#0B2D5C] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-white/10 text-left">
          <div className="space-y-1">
            <h4 className="text-lg sm:text-xl font-extrabold text-white">
              Are you looking for high quality tarpaulin or plastic sheets in Bihar?
            </h4>
            <p className="text-slate-300 text-xs sm:text-sm font-medium">
              Join thousands of satisfied local buyers, dealers, and contractors. Get wholesale prices & instant factory quote.
            </p>
          </div>

          <a
            href="#contact"
            className="px-6 py-3 rounded-full bg-[#FF7A00] hover:bg-[#ff881a] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-orange-500/20 shrink-0 cursor-pointer"
          >
            Contact Store
          </a>
        </div>

      </div>
    </section>
  );
};

export default CustomerReviewsSection;


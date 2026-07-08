import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue } from "motion/react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

interface Review {
  id: number;
  name: string;
  role: string;
  location: string;
  text: string;
  initials: string;
  bgColor: string;
  textColor: string;
}

const REVIEWS: Review[] = [
  {
    id: 1,
    name: "Vinay Kumar Yadav",
    role: "Government Contractor",
    location: "Siwan, Bihar",
    text: "Best quality tarpaulin in Siwan. I bought heavy black plastic sheets for road concrete curing. Heavy gauge material and best wholesale rates guaranteed.",
    initials: "VY",
    bgColor: "bg-blue-100",
    textColor: "text-blue-700",
  },
  {
    id: 2,
    name: "Ramesh Sharma",
    role: "Progressive Farmer",
    location: "Mairwa, Bihar",
    text: "खेती के लिए तिरपाल खरीदा था, बहुत मजबूत है। धूप और तेज बारिश में भी बिल्कुल खराब नहीं हुआ। श्री विनोद जी का व्यवहार और सही सलाह बहुत अच्छी लगी।",
    initials: "RS",
    bgColor: "bg-emerald-100",
    textColor: "text-emerald-700",
  },
  {
    id: 3,
    name: "Manoj Singh",
    role: "Logistics Manager",
    location: "Gopalganj, Bihar",
    text: "Excellent high-density black polythene rolls. Perfect for truck and cargo waterproofing. Custom dimensions were arranged and delivered on the same day.",
    initials: "MS",
    bgColor: "bg-amber-100",
    textColor: "text-amber-700",
  },
  {
    id: 4,
    name: "Anil Gupta",
    role: "Retailer & Shop Owner",
    location: "Siwan Town, Bihar",
    text: "Om Shringar Tirpal Store provides genuine, top-brand quality products (like Shalimar and others) at factory wholesale rates. Best bulk dealer in the region.",
    initials: "AG",
    bgColor: "bg-purple-100",
    textColor: "text-purple-700",
  },
  {
    id: 5,
    name: "Surendra Prasad",
    role: "Brick Kiln Owner",
    location: "Barharia, Bihar",
    text: "We buy huge volumes of heavy black polythene sheet rolls every single season. Best durability, zero leaks, and unbeatable prices in the entire district.",
    initials: "SP",
    bgColor: "bg-indigo-100",
    textColor: "text-indigo-700",
  },
  {
    id: 6,
    name: "Vikash Varnawal",
    role: "Residential Client",
    location: "Siwan City",
    text: "Extremely honest pricing and highly professional customer service. The 5-star reputation is well-deserved for their uncompromising quality standards.",
    initials: "VV",
    bgColor: "bg-rose-100",
    textColor: "text-rose-700",
  },
  {
    id: 7,
    name: "Aditya Raj",
    role: "Structural Engineer",
    location: "Patna, Bihar",
    text: "Unmatched durability! They supply genuine GSM-certified tarpaulins with supreme tear resistance, proper reinforcement eyelets, and UV stabilization features.",
    initials: "AR",
    bgColor: "bg-sky-100",
    textColor: "text-sky-700",
  },
  {
    id: 8,
    name: "Rajesh Kumar",
    role: "Transport Fleet Owner",
    location: "Chhapra, Bihar",
    text: "ट्रक के लिए वाटरप्रूफ तिरपाल लिया था, 2 साल हो गए अभी तक एकदम नया जैसा है। धूप-बारिश में भी कोई शिकायत नहीं। क्वालिटी के मामले में कोई समझौता नहीं करते ये लोग।",
    initials: "RK",
    bgColor: "bg-teal-100",
    textColor: "text-teal-700",
  },
  {
    id: 9,
    name: "Sanjay K. Choudhary",
    role: "Warehouse Operations",
    location: "Hasanpura, Bihar",
    text: "Outstanding strength and longevity. Their stretch wrapping film rolls and agricultural resham nets have perfect density. Strongly recommended for wholesale orders.",
    initials: "SC",
    bgColor: "bg-orange-100",
    textColor: "text-orange-700",
  },
  {
    id: 10,
    name: "Vijay Shankar Pathak",
    role: "Agricultural Expert",
    location: "Raghunathpur, Bihar",
    text: "उचित दाम और 100% असली सामान। पूरे सिवान जिले में सबसे भरोसेमंद दुकान है। गोयल ट्रेडर्स के समय से हम इनके साथ जुड़े हुए हैं और क्वालिटी हमेशा अव्वल रही है।",
    initials: "VP",
    bgColor: "bg-cyan-100",
    textColor: "text-cyan-700",
  },
];

export default function CustomerReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // Duplicating reviews list to enable infinite visual loop
  const totalReviews = REVIEWS.length;

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalReviews);
    }, 2000); // Auto scroll every 2 seconds as requested!

    return () => clearInterval(interval);
  }, [isPaused, totalReviews]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalReviews) % totalReviews);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalReviews);
  };

  return (
    <section className="py-20 bg-white border-t border-b border-slate-100 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-600 text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full">
            <span className="flex items-center gap-0.5">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            </span>
            <span>10 Verified 5-Star Reviews</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-900 tracking-tight leading-tight">
            Our Satisfied Customer Reviews
          </h2>
          
          <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto">
            See why farmers, builders, and retailers across Bihar choose Om Shringar Tirpal Store for premium weather protection. Hover to pause reading.
          </p>
        </div>

        {/* Carousel Visual Frame with Left & Right Arrows */}
        <div 
          className="relative px-0 md:px-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main Viewport Container */}
          <div className="overflow-hidden py-4 px-2">
            <motion.div
              ref={trackRef}
              className="flex gap-6 sm:gap-8"
              animate={{
                x: `calc(-${currentIndex * 100}% - ${currentIndex * 24}px)`
              }}
              style={{
                // Ensure proper display responsive width sizes for flex items
                display: "flex",
              }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 17,
                mass: 0.8
              }}
            >
              {REVIEWS.map((review) => (
                <div
                  key={review.id}
                  className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 bg-white border border-slate-100 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300 flex flex-col justify-between min-h-[250px]"
                >
                  <div className="space-y-4">
                    {/* Star rating row */}
                    <div className="flex gap-1 text-amber-400">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    </div>

                    {/* Review Text */}
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-semibold">
                      "{review.text}"
                    </p>
                  </div>

                  {/* Author Row with Custom SVG Avatar */}
                  <div className="flex items-center gap-4 mt-6 pt-5 border-t border-slate-50">
                    <div className={`w-11 h-11 ${review.bgColor} rounded-full flex items-center justify-center shrink-0 border border-slate-100 relative group`}>
                      {/* Custom Minimal SVG Avatar silhouette */}
                      <svg
                        viewBox="0 0 32 32"
                        className="absolute inset-0 w-full h-full p-1 opacity-15"
                        fill="currentColor"
                      >
                        <path d="M16 4a6 6 0 100 12 6 6 0 000-12zm-8 16c-1.1 0-2 .9-2 2v2c0 2.2 1.8 4 4 4h12c2.2 0 4-1.8 4-4v-2c0-1.1-.9-2-2-2H8z" />
                      </svg>
                      {/* Dynamic bold initials */}
                      <span className={`font-black text-sm tracking-wider ${review.textColor} relative z-10`}>
                        {review.initials}
                      </span>
                    </div>
                    
                    <div className="text-left">
                      <strong className="block text-sm font-black text-slate-900 font-display">
                        {review.name}
                      </strong>
                      <span className="block text-xs font-bold text-slate-400">
                        {review.role} • {review.location}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:translate-x-0 w-12 h-12 rounded-full bg-white border border-slate-100 shadow-md flex items-center justify-center hover:bg-slate-50 transition-colors z-20 cursor-pointer text-slate-600 hover:text-slate-950 focus:outline-none"
            aria-label="Previous Reviews"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-0 w-12 h-12 rounded-full bg-white border border-slate-100 shadow-md flex items-center justify-center hover:bg-slate-50 transition-colors z-20 cursor-pointer text-slate-600 hover:text-slate-950 focus:outline-none"
            aria-label="Next Reviews"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Navigation Indicators (Dots) */}
        <div className="flex justify-center gap-2 mt-8">
          {REVIEWS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx 
                  ? "w-8 bg-orange-500" 
                  : "w-2.5 bg-slate-200 hover:bg-slate-300"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Quote, Star, User, Building, Sprout, ArrowRight } from "lucide-react";

interface Testimonial {
  id: number;
  nameEn: string;
  nameHi: string;
  roleEn: string;
  roleHi: string;
  locationEn: string;
  locationHi: string;
  textEn: string;
  textHi: string;
  rating: number;
  category: "farmer" | "builder" | "retailer";
  avatarBg: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    nameEn: "Ramesh Mahto",
    nameHi: "रमेश महतो",
    roleEn: "Wheat & Paddy Cultivator",
    roleHi: "गेहूं और धान उत्पादक किसान",
    locationEn: "Maharajganj, Siwan",
    locationHi: "महाराजगंज, सीवान",
    textEn: "We use Om Shringar's heavy-duty Shalimar tarpaulins for grain drying (sattering) during the harvest. Even under intense monsoon rains, not a single drop of water leaked. Direct wholesale rates saved us a lot.",
    textHi: "हम फसल कटाई के दौरान अनाज सुखाने (सटेरिंग) के लिए ओम श्रृंगार के भारी शालीमार तिरपाल का उपयोग करते हैं। भारी मानसून में भी पानी की एक बूंद नहीं टपकी। थोक दरों से हमारे काफी पैसे बच गए।",
    rating: 5,
    category: "farmer",
    avatarBg: "bg-emerald-500",
  },
  {
    id: 2,
    nameEn: "Arvind Singh",
    nameHi: "अरविंद सिंह",
    roleEn: "Apex Infrastructure Developers",
    roleHi: "शिखर इंफ्रास्ट्रक्चर डेवलपर्स",
    locationEn: "Siwan Junction",
    locationHi: "सीवान जंक्शन",
    textEn: "For our concrete slab laying and highway road construction projects in Siwan, we sourced 250 rolls of their 24ft Black & Blue Polythene sheets. The thickness gauge is exactly as promised, and tensile strength is exceptional.",
    textHi: "सीवान में हमारे कंक्रीट स्लैब बिछाने और सड़क निर्माण परियोजनाओं के लिए, हमने इनके २४ फीट काले और नीले पॉलिथीन शीट के २५० रोल खरीदे। थिकनेस गेज वादे के अनुसार था और मजबूती बेहतरीन थी।",
    rating: 5,
    category: "builder",
    avatarBg: "bg-blue-600",
  },
  {
    id: 3,
    nameEn: "Manoj Yadav",
    nameHi: "मनोज यादव",
    roleEn: "Owner, Yadav Krishi Kendra",
    roleHi: "मालिक, यादव कृषि केंद्र",
    locationEn: "Gopalganj Road, Siwan",
    locationHi: "गोपालगंज रोड, सीवान",
    textEn: "Their Fencing Resham Net (Nylon boundary net) is a lifesaver for local plant nurseries. It's extremely tough, doesn't tear in harsh Siwan winds, and is much cheaper and safer than traditional metal barbed wire.",
    textHi: "स्थानीय नर्सरी के लिए इनकी फेंसिंग रेशम नेट (नायलॉन जाली) बहुत बढ़िया है। यह बेहद मजबूत है, तेज हवाओं में भी नहीं फटती और पारंपरिक लोहे के कटीले तारों से बहुत सस्ती और सुरक्षित है।",
    rating: 5,
    category: "retailer",
    avatarBg: "bg-orange-500",
  },
  {
    id: 4,
    nameEn: "Vikramaditya Pandey",
    nameHi: "विक्रमादित्य पांडे",
    roleEn: "Water Resources Contractor",
    roleHi: "जल संसाधन ठेकेदार",
    locationEn: "Saran District",
    locationHi: "सारण जिला",
    textEn: "We ordered bulk pond lining rolls for a village fishery project. Om Shringar Tirpal Store provided Silpaulin brand sheets with a 100% leakproof guarantee. Mr. Vinod Kumar is highly reliable and cooperative.",
    textHi: "हमने एक ग्रामीण मत्स्य पालन परियोजना के लिए तालाब अस्तर (Pond Lining) रोल का थोक ऑर्डर दिया था। ओम श्रृंगार तिरपाल स्टोर ने शत-प्रतिशत लीकप्रूफ गारंटी के साथ सिलपॉलिन ब्रांड की शीट दी। विनोद जी बहुत ही विश्वसनीय व्यक्ति हैं।",
    rating: 5,
    category: "builder",
    avatarBg: "bg-cyan-600",
  }
];

interface CustomerSuccessCarouselProps {
  currentLanguage: "en" | "hi";
  onEnquire?: (productName: string) => void;
}

export default function CustomerSuccessCarousel({ currentLanguage, onEnquire }: CustomerSuccessCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isAutoplay, setIsAutoplay] = useState(true);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const slideNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const slidePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const setIndex = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Autoplay cycle
  useEffect(() => {
    if (isAutoplay) {
      autoplayRef.current = setInterval(() => {
        slideNext();
      }, 6000);
    } else if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isAutoplay, currentIndex]);

  const active = TESTIMONIALS[currentIndex];

  // Slide variants for smooth motion
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 150 : -150,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 28 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.25 }
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -150 : 150,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 28 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 }
      }
    })
  };

  return (
    <section id="success-stories" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative dark background enhancements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none z-0" />
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.06)_0%,transparent_70%)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.06)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-orange-400 text-xs font-black font-mono px-3.5 py-1.5 rounded-full mb-4">
            <Star className="w-3.5 h-3.5 fill-orange-400" />
            <span>{currentLanguage === "en" ? "CUSTOMER SUCCESS STORIES" : "संतुष्ट ग्राहकों की सफलता की कहानियां"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight leading-tight mb-4">
            {currentLanguage === "en" ? (
              <>
                What Our <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">Farmers & Builders</span> Say
              </>
            ) : (
              <>
                हमारे <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">किसानों और बिल्डरों</span> की जुबानी
              </>
            )}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {currentLanguage === "en" 
              ? "Over 26 years of supplying genuine waterproof sheets, helping locals protect their assets, crops, and construction foundations successfully."
              : "२६ से अधिक वर्षों से असली वाटरप्रूफ शीट की आपूर्ति, स्थानीय लोगों को अपनी फसल, निर्माण नींव और संपत्तियों को सफलतापूर्वक सुरक्षित करने में मदद कर रहे हैं।"}
          </p>
        </div>

        {/* Carousel Window */}
        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsAutoplay(false)}
          onMouseLeave={() => setIsAutoplay(true)}
        >
          {/* Main Card View */}
          <div className="min-h-[340px] md:min-h-[280px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full bg-slate-950/60 border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-md shadow-2xl relative flex flex-col justify-between"
              >
                {/* Giant Quote Icon */}
                <Quote className="absolute right-6 top-6 w-20 h-20 text-white/5 pointer-events-none" />

                <div>
                  {/* Rating Stars & Category Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex gap-1 text-orange-400">
                      {[...Array(active.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-orange-400 shrink-0" />
                      ))}
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold font-mono uppercase bg-white/5 border border-white/10 text-orange-400">
                      {active.category === "farmer" ? (
                        <>
                          <Sprout className="w-3.5 h-3.5" />
                          {currentLanguage === "en" ? "Farmer Spotlight" : "कृषि विशेष"}
                        </>
                      ) : active.category === "builder" ? (
                        <>
                          <Building className="w-3.5 h-3.5" />
                          {currentLanguage === "en" ? "Builder Partner" : "बिल्डर पार्टनर"}
                        </>
                      ) : (
                        <>
                          <User className="w-3.5 h-3.5" />
                          {currentLanguage === "en" ? "Agro Merchant" : "कृषि विक्रेता"}
                        </>
                      )}
                    </span>
                  </div>

                  {/* Feedback Text */}
                  <blockquote className="text-base sm:text-lg md:text-xl font-medium font-sans leading-relaxed text-slate-100 mb-8 italic">
                    "{currentLanguage === "en" ? active.textEn : active.textHi}"
                  </blockquote>
                </div>

                {/* Profile Detail Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/5">
                  <div className="flex items-center gap-4">
                    {/* Icon Avatar */}
                    <div className={`w-12 h-12 rounded-2xl ${active.avatarBg} text-white flex items-center justify-center font-black text-lg shadow-md shrink-0`}>
                      {active.category === "farmer" ? <Sprout className="w-6 h-6" /> : <Building className="w-6 h-6" />}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-white text-base md:text-lg leading-tight">
                        {currentLanguage === "en" ? active.nameEn : active.nameHi}
                      </h4>
                      <p className="text-xs text-orange-400 font-bold mt-0.5 font-mono">
                        {currentLanguage === "en" ? active.roleEn : active.roleHi}
                      </p>
                    </div>
                  </div>

                  {/* Location Tag */}
                  <div className="flex flex-col sm:items-end text-left sm:text-right">
                    <span className="text-xs text-slate-400 font-semibold">
                      {currentLanguage === "en" ? "Verified Location" : "सत्यापित स्थान"}
                    </span>
                    <strong className="text-sm text-slate-200 mt-0.5 font-mono">
                      📍 {currentLanguage === "en" ? active.locationEn : active.locationHi}
                    </strong>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigational Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-2 sm:-left-16 z-20">
            <button
              onClick={slidePrev}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-950 border border-white/10 hover:border-orange-500/50 hover:bg-slate-900 text-slate-300 hover:text-white flex items-center justify-center transition-all shadow-lg cursor-pointer active:scale-90"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-2 sm:-right-16 z-20">
            <button
              onClick={slideNext}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-950 border border-white/10 hover:border-orange-500/50 hover:bg-slate-900 text-slate-300 hover:text-white flex items-center justify-center transition-all shadow-lg cursor-pointer active:scale-90"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {/* Dots Indicators */}
        <div className="flex justify-center items-center gap-2.5 mt-8 relative z-10">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx 
                  ? "w-8 bg-orange-500" 
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Trust Seal CTA */}
        {onEnquire && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14 p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md text-center max-w-2xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6"
          >
            <div className="text-left">
              <h4 className="font-extrabold text-white text-base font-display">
                {currentLanguage === "en" ? "Need Wholesale Quotes Like Ramesh or Arvind?" : "रमेश या अरविंद की तरह थोक कीमतों की आवश्यकता है?"}
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                {currentLanguage === "en" ? "Get customized sizes with direct factory pricing guarantee." : "सीधे फैक्ट्री मूल्य निर्धारण की गारंटी के साथ अनुकूलित आकार प्राप्त करें।"}
              </p>
            </div>
            <button
              onClick={() => onEnquire("Bulk Wholesale Order")}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full flex items-center gap-1.5 transition-all shadow-md shrink-0 cursor-pointer"
            >
              <span>{currentLanguage === "en" ? "Inquire For Best Rates" : "सबसे सस्ते भाव जानें"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
}

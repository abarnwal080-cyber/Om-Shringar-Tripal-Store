import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Phone, AlertCircle } from "lucide-react";
import { BUSINESS_INFO } from "../data";

interface RetailPriceModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: "en" | "hi";
  onOpenInquiry?: () => void;
}

interface PriceItem {
  image: string;
  en: {
    name: string;
    price: string;
    description: string;
    badge: string;
    meta: string;
  };
  hi: {
    name: string;
    price: string;
    description: string;
    badge: string;
    meta: string;
  };
}

const PRICE_ITEMS: PriceItem[] = [
  {
    image: "https://5.imimg.com/data5/SELLER/Default/2023/4/301281309/FL/MC/FC/123837/waterproof-tarpaulins.webp",
    en: {
      name: "Tarpaulin Sheets (Tirpal)",
      price: "₹120 – ₹10,000 / Piece",
      description: "Price depends on Size, GSM & Brand.",
      badge: "Various Sizes",
      meta: "Approx. Retail Price"
    },
    hi: {
      name: "वाटरप्रूफ तिरपाल (Tirpal)",
      price: "₹120 – ₹10,000 / पीस",
      description: "कीमत आकार, जीएसएम और ब्रांड पर निर्भर करती है।",
      badge: "सभी उपलब्ध साइज",
      meta: "अनुमानित खुदरा मूल्य"
    }
  },
  {
    image: "https://plain-apac-prod-public.komododecks.com/202607/03/qab82eSfCIUQZ1Se0koa/image.png",
    en: {
      name: "Construction Blue Polythene Roll",
      price: "₹100 / Kg",
      description: "Approximate Retail Price",
      badge: "Road Curing",
      meta: "Industrial Supply"
    },
    hi: {
      name: "कंक्रीट ब्लू पॉलिथीन रोल",
      price: "₹100 / किलोग्राम",
      description: "सड़क क्युरिंग और छत ढलाई हेतु",
      badge: "प्रीमियम क्वालिटी",
      meta: "औद्योगिक सप्लाई"
    }
  },
  {
    image: "https://cpimg.tistatic.com/10847398/b/4/LDPE-Sheet.jpeg",
    en: {
      name: "Construction Black Polythene Roll",
      price: "₹100 / Kg",
      description: "Approximate Retail Price",
      badge: "Heavy Duty",
      meta: "Foundation Cover"
    },
    hi: {
      name: "फाउंडेशन ब्लैक पॉलिथीन रोल",
      price: "₹100 / किलोग्राम",
      description: "दीमक और पानी रोधी सुरक्षा रोल",
      badge: "मजबूत और टिकाऊ",
      meta: "हैवी ड्यूटी उपयोग"
    }
  },
  {
    image: "https://cpimg.tistatic.com/09389722/b/4/Transparent-Plastic-Films.jpg",
    en: {
      name: "Transparent Stretch Film Roll",
      price: "₹150 / Kg",
      description: "Approximate Retail Price",
      badge: "High Stretch",
      meta: "Packaging Grade"
    },
    hi: {
      name: "पारदर्शी स्ट्रेच फिल्म रोल",
      price: "₹150 / किलोग्राम",
      description: "सामान रैपिंग और सुरक्षित ट्रांसपोर्ट के लिए",
      badge: "सर्वोत्तम रैप",
      meta: "पैकेजिंग ग्रेड"
    }
  },
  {
    image: "https://d91ztqmtx7u1k.cloudfront.net/ClientContent/Images/ExtraLarge/ldpe-transparent-polythene-she-20260408102254913.webp",
    en: {
      name: "Transparent Shisha Roll (Clear LDPE)",
      price: "₹140 / Kg",
      description: "Approximate Retail Price",
      badge: "Glass-Clear",
      meta: "Clear Sheet Roll"
    },
    hi: {
      name: "शीशा रोल (LDPE पारदर्शी शीट रोल)",
      price: "₹140 / किलोग्राम",
      description: "शीशे जैसा साफ टेबल कवर और पारदर्शी पार्टीशन",
      badge: "शीशे जैसा साफ",
      meta: "क्लियर शीट रोल"
    }
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8otM4gDSej31PTKee3zdt5B88vQWGKmkwAg9GpDdUv8OPxBkiqVGsJ5B8&s=10",
    en: {
      name: "Fencing Resham Net (Shade Net)",
      price: "₹145 / Kg",
      description: "Approximate Retail Price",
      badge: "Resham Net",
      meta: "Fencing & Shade"
    },
    hi: {
      name: "फेंसिंग रेशम नेट (शेड नेट)",
      price: "₹145 / किलोग्राम",
      description: "खेत, छत और बाउंड्री कवर करने के लिए रेशमी जाली",
      badge: "तेज आंधी रोधी",
      meta: "बाउंड्री और शेड"
    }
  }
];

export default function RetailPriceModal({ isOpen, onClose, currentLanguage, onOpenInquiry }: RetailPriceModalProps) {
  const isEn = currentLanguage === "en";

  // Disable background scroll when modal is active
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

  // Escape key support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Dark blurred overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-4xl max-h-[85vh] bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col backdrop-blur-xl bg-opacity-95"
          >
            {/* Header Area */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">💰</span>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white leading-tight font-display uppercase tracking-wide">
                    {isEn ? "Retail Price Catalog" : "खुदरा मूल्य सूची"}
                  </h3>
                  <span className="text-[10px] sm:text-xs text-brand-orange font-bold uppercase tracking-widest font-mono">
                    {isEn ? "Direct wholesale & retail dealer of Bihar" : "बिहार में सभी प्लास्टिक और तिरपाल के सर्वश्रेष्ठ डीलर"}
                  </span>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-full transition-all border border-slate-700 cursor-pointer"
                aria-label="Close price list"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Price list body */}
            <div className="flex-grow overflow-y-auto p-5 sm:p-6 space-y-6 custom-scrollbar text-slate-200">
              
              {/* Top Banner Alert */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 leading-relaxed flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <strong>{isEn ? "Market Pricing Note:" : "बाजार दर सूचना:"}</strong>{" "}
                  {isEn 
                    ? "Prices may vary slightly based on thickness (GSM), sizes, raw materials, or quantity. For absolute exact current rates, please call our proprietor Mr. Vinod Kumar Varnawal."
                    : "मोटाई (GSM), साइज, वर्तमान बाजार दरों और आर्डर क्वांटिटी के आधार पर रेट्स में मामूली अंतर आ सकता है। आज का सटीक रेट जानने हेतु सीधे प्रोप्राइटर विनोद कुमार जी को डायल करें।"}
                </div>
              </div>

              {/* Grid lists */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PRICE_ITEMS.map((item, idx) => {
                  const data = isEn ? item.en : item.hi;
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl border border-slate-800 bg-slate-950/40 hover:bg-slate-950/80 hover:border-slate-700 transition-all duration-200 flex gap-4 items-start"
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-800 border border-slate-700 shrink-0 shadow-inner">
                        <img
                          src={item.image}
                          alt={data.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-grow">
                        <div className="flex justify-between items-start gap-1">
                          <span className="text-[9px] font-extrabold uppercase font-mono tracking-wider text-brand-orange bg-brand-orange/15 px-1.5 py-0.5 rounded">
                            {data.badge}
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-extrabold text-white mt-1 leading-snug tracking-tight line-clamp-1">
                          {data.name}
                        </h4>
                        <p className="text-sm font-black text-emerald-400 mt-1.5 font-mono">
                          {data.price}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          {data.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Instant Call Row */}
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <h4 className="font-extrabold text-sm text-white">
                    {isEn ? "Want Today's Latest Wholesale Rates?" : "विशेष थोक आर्डर डीलर रेट्स चाहिए?"}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {isEn 
                      ? "Directly talk with our proprietor on Phone or WhatsApp."
                      : "विशेष थोक आर्डर या बड़ी आवश्यकताओं हेतु सीधे बात करें।"}
                  </p>
                </div>

                <div className="flex gap-2.5 w-full sm:w-auto">
                  <a
                    href={BUSINESS_INFO.phoneFormatted}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{isEn ? "Call Now" : "कॉल करें"}</span>
                  </a>
                  <a
                    href={BUSINESS_INFO.whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors"
                  >
                    <span className="text-sm">💬</span>
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Sticky Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex justify-between items-center text-[11px] font-mono text-slate-500">
              <span>{isEn ? "Owner: Mr. Vinod Kumar" : "मालिक: श्री विनोद कुमार"}</span>
              <button
                onClick={() => {
                  onClose();
                  if (onOpenInquiry) {
                    onOpenInquiry();
                  }
                }}
                className="text-brand-orange font-bold hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>{isEn ? "Submit Bulk Inquiry" : "थोक आर्डर पूछताछ भेजें"}</span>
                <span>→</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

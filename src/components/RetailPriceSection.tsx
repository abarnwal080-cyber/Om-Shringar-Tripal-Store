import { motion } from "motion/react";
import { Phone, CheckCircle, ArrowRight } from "lucide-react";
import { BUSINESS_INFO } from "../data";

interface RetailPriceSectionProps {
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
      badge: "Various Sizes Available",
      meta: "Approx. Retail Price"
    },
    hi: {
      name: "वाटरप्रूफ तिरपाल (Tirpal)",
      price: "₹120 – ₹10,000 / पीस",
      description: "कीमत आकार, जीएसएम और ब्रांड पर निर्भर करती है।",
      badge: "सभी साइज उपलब्ध हैं",
      meta: "अनुमानित खुदरा मूल्य"
    }
  },
  {
    image: "https://plain-apac-prod-public.komododecks.com/202607/03/qab82eSfCIUQZ1Se0koa/image.png",
    en: {
      name: "Construction Blue Polythene Roll",
      price: "₹100 / Kg",
      description: "Approximate Retail Price",
      badge: "Premium Quality",
      meta: "Industrial Supply"
    },
    hi: {
      name: "कंक्रीट ब्लू पॉलिथीन रोल",
      price: "₹100 / किलोग्राम",
      description: "ढलाई और सड़क सुखाने हेतु उपयुक्त रेट",
      badge: "प्रीमियम क्वालिटी",
      meta: "औद्योगिक सप्लाई"
    }
  },
  {
    image: "https://plain-apac-prod-public.komododecks.com/202607/03/eckT9KEMGbavrebTJwPJ/image.png",
    en: {
      name: "Construction Black Polythene Roll",
      price: "₹100 / Kg",
      description: "Approximate Retail Price",
      badge: "Heavy Duty Use",
      meta: "Foundation Cover"
    },
    hi: {
      name: "फाउंडेशन ब्लैक पॉलिथीन रोल",
      price: "₹100 / किलोग्राम",
      description: "दीमक और नमी सुरक्षा हेतु सर्वोत्तम",
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
      badge: "High Stretch Cling",
      meta: "Packaging Grade"
    },
    hi: {
      name: "पारदर्शी स्ट्रेच फिल्म रोल",
      price: "₹150 / किलोग्राम",
      description: "सामान सुरक्षित रखने और बंडल बनाने हेतु",
      badge: "उत्कृष्ट पकड़",
      meta: "पैकेजिंग ग्रेड"
    }
  },
  {
    image: "https://d91ztqmtx7u1k.cloudfront.net/ClientContent/Images/ExtraLarge/ldpe-transparent-polythene-she-20260408102254913.webp",
    en: {
      name: "Transparent Shisha Roll (LDPE Clear Sheet)",
      price: "₹140 / Kg",
      description: "Approximate Retail Price",
      badge: "Glass-Clear Transparent",
      meta: "Clear Sheet Roll"
    },
    hi: {
      name: "शीशा रोल (LDPE पारदर्शी शीट रोल)",
      price: "₹140 / किलोग्राम",
      description: "टेबल प्रोटेक्शन और डस्ट पार्टीशन के लिए",
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
      badge: "High-Strength Border",
      meta: "Fencing & Shade"
    },
    hi: {
      name: "फेंसिंग रेशम नेट (शेड नेट)",
      price: "₹145 / किलोग्राम",
      description: "खेत और बाउंड्री कवर करने के लिए रेशमी जाली",
      badge: "तेज धूप और आंधी रोधी",
      meta: "बाउंड्री और शेड"
    }
  }
];

export default function RetailPriceSection({ currentLanguage, onOpenInquiry }: RetailPriceSectionProps) {
  const isEn = currentLanguage === "en";

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section id="retail-price-list" className="py-20 bg-white relative overflow-hidden" aria-labelledby="retail-title">
      {/* Dynamic background styling */}
      <div className="absolute inset-0 bg-[radial-gradient(#ff8a1f05_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-80" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500/10 via-blue-500/5 to-emerald-500/10 border border-slate-200 shadow-sm mb-4">
            <span className="text-[11px] font-extrabold font-mono uppercase tracking-wider text-[#0b2d5b]">
              {isEn ? "CUSTOMER RETAIL PRICE" : "ग्राहक खुदरा मूल्य सूची"}
            </span>
          </div>
          <h2 id="retail-title" className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight mb-4 text-slate-900 leading-tight">
            {isEn ? "Retail Price List" : "ताजा रिटेल प्राइस लिस्ट"}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {isEn 
              ? "Reference retail prices only. Prices may increase or decrease depending on market conditions, GSM, size, brand, and order quantity."
              : "कृपया ध्यान दें: ये केवल संदर्भ खुदरा दरें हैं। बाजार की स्थिति, जीएसएम (मोटाई), आकार, ब्रांड और ऑर्डर की मात्रा के आधार पर दरें कम या ज्यादा हो सकती हैं।"}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {PRICE_ITEMS.map((item, index) => {
            const data = isEn ? item.en : item.hi;
            return (
              <motion.article
                key={index}
                variants={cardVariants}
                className="group relative overflow-hidden p-5 rounded-3xl border border-slate-200/80 bg-gradient-to-b from-white to-slate-50/50 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* Accent inner gradient */}
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/5 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                <div>
                  {/* Top content row */}
                  <div className="flex gap-4 items-start mb-4">
                    {/* Visual Thumbnail */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 relative shadow-inner">
                      <img
                        src={item.image}
                        alt={data.name}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transform scale-100 group-hover:scale-108 transition-transform duration-500"
                      />
                    </div>

                    {/* Meta & Title */}
                    <div className="min-w-0 flex-1">
                      <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-brand-orange bg-orange-500/10 px-2 py-0.5 rounded-md mb-2">
                        {data.badge}
                      </span>
                      <h3 className="text-sm sm:text-base font-extrabold text-slate-800 tracking-tight leading-snug line-clamp-2">
                        {data.name}
                      </h3>
                      <p className="text-base sm:text-lg font-black text-brand-orange mt-2 tracking-tight">
                        {data.price}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-500 leading-relaxed pl-1">
                    {data.description}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest font-mono">
                    {data.meta}
                  </span>
                  
                  {/* Green glowing status dot */}
                  <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md text-[10px] text-emerald-600 font-bold font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{isEn ? "IN STOCK" : "स्टॉक में"}</span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Informative Notice Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-md relative overflow-hidden"
        >
          {/* Back light glow */}
          <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-32 h-32 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

          <h3 className="text-lg font-extrabold text-brand-blue-dark mb-4 flex items-center gap-2">
            <span className="text-xl">📢</span>
            {isEn ? "Important Pricing Information" : "महत्वपूर्ण मूल्य सूचना"}
          </h3>
          
          <ul className="space-y-3.5 text-xs sm:text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
              <span>
                {isEn 
                  ? "The above prices are approximate retail prices only. Final rate is tailored to your requirement."
                  : "उपरोक्त दरें केवल अनुमानित रिटेल मूल्य हैं। अंतिम दर आपके आर्डर के अनुसार तय की जाएगी।"}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
              <span>
                {isEn 
                  ? "Prices may increase or decrease depending on current market raw material costs, GSM thickness, and size."
                  : "कच्चे माल की वैश्विक कीमतों, जीएसएम मोटाई और तिरपाल के आकार के आधार पर दर घट या बढ़ सकती है।"}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
              <span>
                {isEn 
                  ? "For today's absolute latest accurate retail rate, call the proprietor directly."
                  : "आज का सबसे सटीक खुदरा रेट जानने के लिए सीधे दुकान के मालिक को कॉल करें।"}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
              <span className="text-[#0b2d5b] font-semibold">
                {isEn 
                  ? "Wholesale dealers can contact us on WhatsApp with company details to receive official bulk wholesale quotes."
                  : "थोक व्यापारी (Wholesale Customers) विशेष डीलर डिस्काउंट और थोक रेट्स के लिए सीधे व्हाट्सप्प पर अपनी दुकान का नाम भेजें।"}
              </span>
            </li>
          </ul>

          {/* CTA Row */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            {onOpenInquiry && (
              <button
                onClick={onOpenInquiry}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 py-4 px-10 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-extrabold text-sm shadow-xl shadow-orange-600/15 hover:shadow-orange-600/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>{isEn ? "Open WhatsApp Integrated Quote Assistant" : "व्हाट्सएप-इंटीग्रेटेड पूछताछ शुरू करें"}</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

import { useState, useEffect, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Send, 
  CheckCircle, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  User, 
  Phone, 
  Layers, 
  Maximize2, 
  MessageSquare,
  HelpCircle,
  FileText,
  MessageCircle,
  Package,
  Search,
  ChevronDown,
  Check,
  X
} from "lucide-react";
import { PRODUCTS } from "../data";

interface InquiryFormProps {
  prefilledProduct: string;
  onClearPrefill: () => void;
  currentLanguage?: "en" | "hi";
}

export default function InquiryForm({ prefilledProduct, onClearPrefill, currentLanguage = "en" }: InquiryFormProps) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for previous
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    product: "",
    size: "",
    type: "Wholesale",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // States for searchable product dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus input automatically on step changes
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (prefilledProduct) {
      setFormData((prev) => ({ ...prev, product: prefilledProduct }));
    }
  }, [prefilledProduct]);

  useEffect(() => {
    // Small timeout to let step slide in before focusing
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [step]);

  const handleNext = () => {
    // Validation before going to next step
    if (step === 1 && !formData.name.trim()) return;
    if (step === 2 && !formData.phone.trim()) return;
    if (step === 3 && !formData.product) return;

    setDirection(1);
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setDirection(-1);
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleReset = () => {
    setFormData({
      name: "",
      phone: "",
      product: "",
      size: "",
      type: "Wholesale",
      message: "",
    });
    setStep(1);
    setIsSubmitted(false);
    onClearPrefill();
  };

  // WhatsApp formatted text generation
  const getWhatsAppLink = () => {
    const text = currentLanguage === "en" 
      ? `*New Tirpal/Sheet Inquiry* 📦\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Product:* ${formData.product}\n*Size/GSM:* ${formData.size || "Standard"}\n*Inquiry Type:* ${formData.type}\n*Message/Location:* ${formData.message || "Not provided"}`
      : `*नया तिरपाल/शीट पूछताछ* 📦\n\n*नाम:* ${formData.name}\n*फ़ोन:* ${formData.phone}\n*उत्पाद:* ${formData.product}\n*साइज़/GSM:* ${formData.size || "स्टैंडर्ड"}\n*पूछताछ टाइप:* ${formData.type === "Wholesale" ? "थोक (Wholesale)" : "खुदरा (Retail)"}\n*मैसेज/लोकेशन:* ${formData.message || "उपलब्ध नहीं"}`;

    return `https://wa.me/919852076197?text=${encodeURIComponent(text)}`;
  };

  const handleWhatsAppRedirect = () => {
    // Open the WhatsApp URL in a new tab
    window.open(getWhatsAppLink(), "_blank");
    // Show success view
    setIsSubmitted(true);
  };

  // Text translations
  const t = {
    title: currentLanguage === "en" ? "Conversational Quote Assistant" : "इंटरेक्टिव रेट पूछताछ सहायक",
    subtitle: currentLanguage === "en" 
      ? "Answer simple questions to get your direct factory rates on WhatsApp." 
      : "व्हाट्सएप पर सीधे फैक्ट्री थोक रेट जानने के लिए आसान सवालों के जवाब दें।",
    step: currentLanguage === "en" ? "Question" : "सवाल",
    of: currentLanguage === "en" ? "of" : "का",
    next: currentLanguage === "en" ? "Next" : "आगे बढ़ें",
    prev: currentLanguage === "en" ? "Back" : "पीछे",
    submitWhatsApp: currentLanguage === "en" ? "Send Inquiry via WhatsApp" : "व्हाट्सएप पर पूछताछ भेजें",
    
    // Step 1: Name
    q1Title: currentLanguage === "en" ? "What is your full name?" : "आपका शुभ नाम क्या है?",
    q1Sub: currentLanguage === "en" ? "We will address you with this name." : "हम इसी नाम से आपसे बात करेंगे।",
    q1Placeholder: currentLanguage === "en" ? "Type your name here..." : "यहाँ अपना नाम लिखें...",

    // Step 2: Phone
    q2Title: currentLanguage === "en" ? "What is your mobile/phone number?" : "आपका मोबाइल नंबर क्या है?",
    q2Sub: currentLanguage === "en" ? "To share price sheets and delivery confirmation." : "रेट लिस्ट और डिलीवरी की जानकारी भेजने के लिए।",
    q2Placeholder: currentLanguage === "en" ? "Type 10-digit mobile number..." : "१० अंकों का मोबाइल नंबर लिखें...",

    // Step 3: Product
    q3Title: currentLanguage === "en" ? "Which product do you need?" : "आपको किस उत्पाद की आवश्यकता है?",
    q3Sub: currentLanguage === "en" ? "Select the closest category of plastic/tarpaulin sheet." : "प्लास्टिक/तिरपाल शीट की श्रेणी चुनें।",

    // Step 4: Size & GSM
    q4Title: currentLanguage === "en" ? "What size or thickness (GSM) do you need?" : "आपको किस साइज़ या मोटाई (GSM) की जरूरत है?",
    q4Sub: currentLanguage === "en" ? "e.g., 15×12 ft, 30-yard black roll, or 250 GSM" : "उदा. १५×१२ फीट, ३० मीटर का काला रोल, या २५० GSM",
    q4Placeholder: currentLanguage === "en" ? "Enter dimensions or thickness specifications..." : "साइज़ या मोटाई का विवरण लिखें...",

    // Step 5: Type
    q5Title: currentLanguage === "en" ? "Choose your order requirement type" : "अपनी आवश्यकता का प्रकार चुनें",
    q5Sub: currentLanguage === "en" ? "Wholesale orders enjoy direct factory warehouse pricing." : "थोक आर्डरों पर सीधे फैक्ट्री गोदाम के रेट मिलते हैं।",

    // Step 6: Message / Location
    q6Title: currentLanguage === "en" ? "Any special requests or delivery location?" : "कोई विशेष निर्देश या डिलीवरी का स्थान?",
    q6Sub: currentLanguage === "en" ? "Tell us where you want delivery (e.g. Maharajganj, Siwan, Gopalganj)" : "सीवान और आसपास के क्षेत्रों में जहां भी आपको डिलीवरी चाहिए, लिखें।",
    q6Placeholder: currentLanguage === "en" ? "Type location, landmark or specific questions here..." : "डिलीवरी का पता या अपना सवाल यहाँ लिखें...",

    // Summary Step 7
    summaryTitle: currentLanguage === "en" ? "Review Your Enquiry" : "अपनी पूछताछ की समीक्षा करें",
    summarySub: currentLanguage === "en" ? "Everything looks perfect! Click below to send directly to our WhatsApp." : "सब कुछ सही है! हमारे व्हाट्सएप पर सीधे भेजने के लिए नीचे क्लिक करें।",
  };

  const stepsCount = 7;

  const filteredProductsList = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Slide transition animation variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 350, damping: 30 },
        opacity: { duration: 0.2 }
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 350, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  };

  return (
    <div id="enquire-section" className="w-full max-w-2xl mx-auto">
      {/* Dynamic Header progress indicator */}
      <div className="mb-6">
        <div className="flex justify-between items-center text-xs font-mono font-bold text-slate-400 mb-2">
          <span className="flex items-center gap-1.5 text-orange-600 uppercase">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            {t.title}
          </span>
          <span>
            {isSubmitted ? "Completed" : `${t.step} ${step} ${t.of} ${stepsCount}`}
          </span>
        </div>
        
        {/* Animated Progress Bar */}
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: isSubmitted ? "100%" : `${(step / stepsCount) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        {!isSubmitted ? (
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="bg-white border border-slate-100/80 shadow-2xl rounded-3xl p-6 sm:p-10 relative overflow-hidden min-h-[380px] flex flex-col justify-between"
          >
            {/* Ambient subtle back glow decorative element */}
            <div className="absolute -right-24 -top-24 w-48 h-48 rounded-full bg-gradient-to-br from-orange-500/5 to-transparent pointer-events-none" />

            <div>
              {/* STEP 1: NAME */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
                      {t.q1Title}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm font-semibold">
                      {t.q1Sub}
                    </p>
                  </div>
                  <input
                    ref={inputRef as any}
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder={t.q1Placeholder}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl px-4 py-3.5 text-base font-semibold outline-none transition-all"
                    onKeyDown={(e) => e.key === "Enter" && formData.name.trim() && handleNext()}
                  />
                </div>
              )}

              {/* STEP 2: MOBILE */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
                      {t.q2Title}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm font-semibold">
                      {t.q2Sub}
                    </p>
                  </div>
                  <input
                    ref={inputRef as any}
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder={t.q2Placeholder}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl px-4 py-3.5 text-base font-semibold outline-none transition-all"
                    onKeyDown={(e) => e.key === "Enter" && formData.phone.trim() && handleNext()}
                  />
                </div>
              )}

              {/* STEP 3: PRODUCT CHOICE */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
                      {t.q3Title}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm font-semibold">
                      {t.q3Sub}
                    </p>
                  </div>
                  
                  {/* Premium Custom Searchable Dropdown */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="w-full bg-slate-50 border border-slate-200 hover:border-orange-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-2xl px-5 py-4 text-base font-semibold transition-all flex items-center justify-between text-left cursor-pointer shadow-sm"
                    >
                      <div className="flex items-center gap-3 truncate">
                        <span className="text-xl shrink-0">📦</span>
                        {formData.product ? (
                          <div className="truncate">
                            <span className="block text-sm font-bold text-slate-800">{formData.product}</span>
                            <span className="block text-[10px] text-slate-400 font-mono">
                              {PRODUCTS.find(p => p.name === formData.product)?.category || "Selected Product"}
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-400 font-medium text-sm">
                            {currentLanguage === "en" ? "Search or Select Product" : "उत्पाद चुनें या खोजें..."}
                          </span>
                        )}
                      </div>
                      <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-250 shrink-0 ml-2 ${dropdownOpen ? "rotate-180 text-orange-500" : ""}`} />
                    </button>

                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 right-0 mt-2 bg-white border border-slate-200 shadow-2xl rounded-2xl z-50 overflow-hidden flex flex-col max-h-[280px]"
                        >
                          {/* Search box inside dropdown */}
                          <div className="p-3 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
                            <Search className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
                            <input
                              type="text"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              placeholder={currentLanguage === "en" ? "Search product..." : "खोजें..."}
                              className="w-full bg-transparent border-none text-sm font-semibold outline-none text-slate-800 placeholder-slate-400 py-1"
                              onClick={(e) => e.stopPropagation()}
                            />
                            {searchQuery && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSearchQuery("");
                                }}
                                className="p-1 hover:bg-slate-200 rounded-full text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            )}
                          </div>

                          {/* List of filtered products */}
                          <div className="overflow-y-auto flex-1 py-1 divide-y divide-slate-50/50">
                            {filteredProductsList.length > 0 ? (
                              filteredProductsList.map((prod) => (
                                <button
                                  key={prod.id}
                                  type="button"
                                  onClick={() => {
                                    setFormData((prev) => ({ ...prev, product: prod.name }));
                                    setDropdownOpen(false);
                                    setSearchQuery("");
                                  }}
                                  className={`w-full p-3 text-left flex items-center justify-between transition-colors cursor-pointer hover:bg-slate-50 ${
                                    formData.product === prod.name ? "bg-orange-50/30" : ""
                                  }`}
                                >
                                  <div className="flex items-center gap-3 truncate">
                                    <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-sm shrink-0">
                                      📦
                                    </div>
                                    <div className="truncate">
                                      <span className={`block text-xs sm:text-sm truncate ${formData.product === prod.name ? "font-extrabold text-orange-600" : "font-bold text-slate-700"}`}>
                                        {prod.name}
                                      </span>
                                      <span className="block text-[10px] text-slate-400 font-mono truncate">
                                        {prod.category}
                                      </span>
                                    </div>
                                  </div>
                                  {formData.product === prod.name && (
                                    <Check className="w-4 h-4 text-orange-600 shrink-0 ml-2" />
                                  )}
                                </button>
                              ))
                            ) : (
                              <div className="p-4 text-center text-xs text-slate-400 font-semibold">
                                {currentLanguage === "en" ? "No products found" : "कोई उत्पाद नहीं मिला"}
                              </div>
                            )}

                            {/* Standard Custom option */}
                            <button
                              type="button"
                              onClick={() => {
                                setFormData((prev) => ({ ...prev, product: "Custom / Special Sheet" }));
                                setDropdownOpen(false);
                                setSearchQuery("");
                              }}
                              className={`w-full p-3 text-left flex items-center justify-between transition-colors cursor-pointer hover:bg-slate-50 ${
                                formData.product === "Custom / Special Sheet" ? "bg-orange-50/30" : ""
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-sm shrink-0">
                                  ⚙️
                                </div>
                                <div>
                                  <span className={`block text-xs sm:text-sm ${formData.product === "Custom / Special Sheet" ? "font-extrabold text-orange-600" : "font-bold text-slate-700"}`}>
                                    Custom Size & Type
                                  </span>
                                  <span className="block text-[10px] text-slate-400 font-mono">
                                    Special request
                                  </span>
                                </div>
                              </div>
                              {formData.product === "Custom / Special Sheet" && (
                                <Check className="w-4 h-4 text-orange-600 shrink-0 ml-2" />
                              )}
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* STEP 4: SIZING */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
                      {t.q4Title}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm font-semibold">
                      {t.q4Sub}
                    </p>
                  </div>
                  <input
                    ref={inputRef as any}
                    type="text"
                    value={formData.size}
                    onChange={(e) => setFormData((prev) => ({ ...prev, size: e.target.value }))}
                    placeholder={t.q4Placeholder}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl px-4 py-3.5 text-base font-semibold outline-none transition-all"
                    onKeyDown={(e) => e.key === "Enter" && handleNext()}
                  />
                  {/* Quick Sizing suggestion tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {["15×12 ft", "30×24 ft", "120 GSM", "250 GSM (Heavy)", "300 GSM (Ultra)"].map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, size: tag }))}
                        className="text-xs bg-slate-50 hover:bg-slate-100 border border-slate-200 font-bold px-3 py-1.5 rounded-full text-slate-600 cursor-pointer transition-all"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 5: WHOLESALE VS RETAIL */}
              {step === 5 && (
                <div className="space-y-6">
                  <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
                      {t.q5Title}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm font-semibold">
                      {t.q5Sub}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: "Wholesale", title: "📦 Wholesale", desc: "Best direct pricing" },
                      { id: "Retail", title: "🛍️ Retail Shop", desc: "Single/few sheets" },
                      { id: "Custom Spec", title: "🛠️ Custom Order", desc: "Tailored specs" }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, type: opt.id }));
                          setTimeout(handleNext, 180);
                        }}
                        className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                          formData.type === opt.id
                            ? "bg-slate-900 border-transparent text-white shadow-md"
                            : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100/80"
                        }`}
                      >
                        <span className="block text-xs sm:text-sm font-extrabold mb-1">{opt.title}</span>
                        <span className="block text-[10px] text-slate-400 font-mono">{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 6: MESSAGE / LOCATION */}
              {step === 6 && (
                <div className="space-y-6">
                  <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
                      {t.q6Title}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm font-semibold">
                      {t.q6Sub}
                    </p>
                  </div>
                  <textarea
                    ref={inputRef as any}
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    placeholder={t.q6Placeholder}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl px-4 py-3.5 text-base font-semibold outline-none transition-all resize-none"
                  />
                </div>
              )}

              {/* STEP 7: REVIEW SUMMARY */}
              {step === 7 && (
                <div className="space-y-5">
                  <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
                      {t.summaryTitle}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm font-semibold">
                      {t.summarySub}
                    </p>
                  </div>

                  {/* Summary grid detail */}
                  <div className="grid grid-cols-2 gap-3 bg-slate-50 border border-slate-100 p-4 rounded-2xl text-xs sm:text-sm max-h-[180px] overflow-y-auto">
                    <div>
                      <span className="block text-[10px] text-slate-400 uppercase font-mono font-bold">Your Name:</span>
                      <strong className="text-slate-800">{formData.name}</strong>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-400 uppercase font-mono font-bold">Mobile Number:</span>
                      <strong className="text-slate-800">{formData.phone}</strong>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-400 uppercase font-mono font-bold">Requested Product:</span>
                      <strong className="text-slate-800">{formData.product}</strong>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-400 uppercase font-mono font-bold">Specs / Size:</span>
                      <strong className="text-slate-800">{formData.size || "Not specified"}</strong>
                    </div>
                    <div className="col-span-2">
                      <span className="block text-[10px] text-slate-400 uppercase font-mono font-bold">Inquiry Mode:</span>
                      <strong className="text-slate-800">{formData.type}</strong>
                    </div>
                    {formData.message && (
                      <div className="col-span-2 border-t border-slate-200/60 pt-2 mt-1">
                        <span className="block text-[10px] text-slate-400 uppercase font-mono font-bold">Destination & notes:</span>
                        <p className="text-slate-700 italic mt-0.5 font-medium">"{formData.message}"</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Back / Next action bar footer */}
            <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-slate-100">
              {/* Back trigger button */}
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 font-bold text-xs sm:text-sm transition-all cursor-pointer py-2 px-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t.prev}
                </button>
              ) : (
                <div />
              )}

              {/* Progress Next trigger or Submit button */}
              {step < stepsCount ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full flex items-center gap-1.5 transition-all shadow-md cursor-pointer ml-auto"
                >
                  <span>{t.next}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleWhatsAppRedirect}
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full flex items-center justify-center gap-1.5 transition-all shadow-md hover:shadow-lg cursor-pointer ml-auto"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{t.submitWhatsApp}</span>
                </button>
              )}
            </div>

          </motion.div>
        ) : (
          /* SUCCESS STATE */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="bg-slate-950 text-white p-8 sm:p-12 rounded-3xl shadow-xl border border-slate-800 text-center relative overflow-hidden"
          >
            {/* Ambient Background Glow colors */}
            <div className="absolute -right-16 -top-16 w-48 h-48 bg-orange-500/15 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold font-display tracking-tight mb-3">
              {currentLanguage === "en" ? "Thank You, Redirected to WhatsApp!" : "धन्यवाद, व्हाट्सएप पर रीडायरेक्ट कर दिया गया है!"}
            </h3>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-8">
              {currentLanguage === "en" 
                ? "Your enquiry has been formatted and redirected to WhatsApp. Check your chat window to send the pre-filled message! Vinod Kumar will assist you right away."
                : "आपकी पूछताछ व्हाट्सएप संदेश के रूप में तैयार की गई है। चैट में जाकर संदेश भेजें! विनोद कुमार जी तुरंत आपकी सहायता करेंगे।"}
            </p>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 text-left max-w-md mx-auto mb-8 text-xs sm:text-sm space-y-2">
              <div className="text-orange-400 font-mono font-bold uppercase tracking-wide border-b border-slate-800 pb-2 mb-2 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-orange-400" />
                {currentLanguage === "en" ? "Formatted Record Details" : "तैयार की गई जानकारी"}
              </div>
              <p><strong className="text-slate-500">{currentLanguage === "en" ? "Name:" : "नाम:"}</strong> {formData.name}</p>
              <p><strong className="text-slate-500">{currentLanguage === "en" ? "Mobile:" : "मोबाइल:"}</strong> {formData.phone}</p>
              <p><strong className="text-slate-500">{currentLanguage === "en" ? "Product:" : "उत्पाद:"}</strong> {formData.product}</p>
              <p><strong className="text-slate-500">{currentLanguage === "en" ? "Specs / Size:" : "साइज़ / GSM:"}</strong> {formData.size || "Standard"}</p>
              <p><strong className="text-slate-500">{currentLanguage === "en" ? "Type:" : "टाइप:"}</strong> {formData.type}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 px-6 rounded-full font-bold text-sm transition-all cursor-pointer hover:shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                {currentLanguage === "en" ? "Re-open WhatsApp Chat" : "व्हाट्सएप चैट दोबारा खोलें"}
              </a>
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white py-3.5 px-6 rounded-full font-bold text-sm transition-all cursor-pointer"
              >
                {currentLanguage === "en" ? "New Enquiry" : "नई पूछताछ"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

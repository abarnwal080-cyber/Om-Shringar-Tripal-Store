import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, MessageSquare, ShieldAlert, Sparkles, User, Phone, ClipboardList } from "lucide-react";
import { BUSINESS_INFO, PRODUCTS } from "../data";

interface AutoInquiryModalProps {
  currentLanguage: "en" | "hi";
}

export default function AutoInquiryModal({ currentLanguage }: AutoInquiryModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    product: "",
    size: "",
    message: "",
  });

  const isEn = currentLanguage === "en";

  useEffect(() => {
    // Show the popup automatically 1.2 seconds after the page loads
    // We check sessionStorage to prevent annoying loops if they click "Back" from WhatsApp
    const hasBeenShown = sessionStorage.getItem("autoInquiryShown");
    if (!hasBeenShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("autoInquiryShown", "true");
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setIsOpen(false);
    // Smoothly scroll back to the top of the home page as part of "go to home pg"
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert(isEn ? "Please enter your Name and Phone Number." : "कृपया अपना नाम और फ़ोन नंबर दर्ज करें।");
      return;
    }

    // Build the beautiful prefilled WhatsApp message
    const waText = 
      `*OM SHRINGAR TIRPAL STORE - NEW ENQUIRY*\n\n` +
      `👤 *Name:* ${formData.name}\n` +
      `📞 *Phone:* ${formData.phone}\n` +
      `📦 *Product:* ${formData.product || "General Enquiry"}\n` +
      `📏 *Sizing:* ${formData.size || "Not specified"}\n` +
      `📝 *Message:* ${formData.message || "Looking for wholesale rates and stock availability."}`;

    const waLink = `${BUSINESS_INFO.whatsappLink}?text=${encodeURIComponent(waText)}`;

    // Redirect user to WhatsApp automatically
    window.location.href = waLink;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col backdrop-blur-xl bg-opacity-95"
          >
            {/* Elegant Header Accent */}
            <div className="h-1.5 bg-gradient-to-r from-brand-orange via-amber-500 to-emerald-500 w-full" />

            {/* Header section */}
            <div className="p-6 border-b border-slate-800/80 flex justify-between items-start bg-slate-950/40">
              <div className="flex gap-3 items-center">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-brand-orange animate-bounce">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white leading-tight font-display tracking-tight">
                    {isEn ? "Get Instant Quote" : "त्वरित मूल्य सूची प्राप्त करें"}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {isEn ? "Special Dealer & Wholesale Pricing" : "थोक व डीलर रेट्स हेतु पूछताछ"}
                  </p>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="p-2 bg-slate-800/80 hover:bg-slate-700/80 text-slate-400 hover:text-white rounded-full transition-all border border-slate-700/50 cursor-pointer"
                aria-label="Close form"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto max-h-[70vh] custom-scrollbar">
              
              {/* Alert Badge */}
              <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-200">
                <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  {isEn 
                    ? "Submitting this form redirects you to WhatsApp for direct chat with our owner."
                    : "फॉर्म सबमिट करने पर सीधे मालिक से व्हाट्सएप बातचीत शुरू होगी।"}
                </span>
              </div>

              {/* Name Field */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 font-mono flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-brand-orange" />
                  {isEn ? "Your Name" : "आपका नाम"} <span className="text-brand-orange">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={isEn ? "Enter your full name" : "अपना नाम दर्ज करें"}
                  className="w-full bg-slate-950/50 border border-slate-800 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange rounded-xl px-4 py-3 text-sm font-medium text-white transition-all outline-none"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 font-mono flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-brand-orange" />
                  {isEn ? "Phone Number" : "मोबाइल नंबर"} <span className="text-brand-orange">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. +91 9852076197"
                  className="w-full bg-slate-950/50 border border-slate-800 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange rounded-xl px-4 py-3 text-sm font-medium text-white transition-all outline-none"
                />
              </div>

              {/* Product Select Field */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 font-mono flex items-center gap-1.5">
                  <ClipboardList className="w-3.5 h-3.5 text-brand-orange" />
                  {isEn ? "Select Product" : "उत्पाद चुनें"}
                </label>
                <select
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  className="w-full bg-slate-950/50 border border-slate-800 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange rounded-xl px-4 py-3 text-sm font-medium text-white transition-all outline-none appearance-none cursor-pointer"
                >
                  <option value="" className="bg-slate-900">{isEn ? "-- Choose Product --" : "-- उत्पाद चुनें --"}</option>
                  {PRODUCTS.map((p) => (
                    <option key={p.id} value={p.name} className="bg-slate-900">
                      {p.name}
                    </option>
                  ))}
                  <option value="Custom Size Sheet" className="bg-slate-900">
                    {isEn ? "Other / Custom Specification" : "अन्य / कोई और साइज"}
                  </option>
                </select>
              </div>

              {/* Sizing Field */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 font-mono">
                  {isEn ? "Required Sizing (e.g., 15×12, 30ft roll)" : "ज़रूरी साइज (उदा. 15×12, 30 फुट रोल)"}
                </label>
                <input
                  type="text"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  placeholder={isEn ? "e.g. 15x12 or 250 GSM" : "उदा. 15x12 या 250 जीएसएम"}
                  className="w-full bg-slate-950/50 border border-slate-800 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange rounded-xl px-4 py-3 text-sm font-medium text-white transition-all outline-none"
                />
              </div>

              {/* Additional message / requirements */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 font-mono">
                  {isEn ? "Special Instructions / Message" : "विशेष निर्देश / संदेश"}
                </label>
                <textarea
                  name="message"
                  rows={2}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={isEn ? "Enter any requirements..." : "अपनी आवश्यकताएं दर्ज करें..."}
                  className="w-full bg-slate-950/50 border border-slate-800 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange rounded-xl px-4 py-3 text-sm font-medium text-white transition-all outline-none resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-orange-500/20 active:scale-[0.99] transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                <span>{isEn ? "Redirect to WhatsApp Chat" : "व्हाट्सएप चैट पर आगे बढ़ें"}</span>
                <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white ml-1" />
              </button>
            </form>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800/60 bg-slate-950/40 text-center">
              <button
                type="button"
                onClick={handleClose}
                className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
              >
                {isEn ? "No thanks, take me to home page" : "नहीं धन्यवाद, मुझे होम पेज पर ले जाएं"}
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

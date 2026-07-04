import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle, MessageSquare, Phone, MapPin, Sparkles } from "lucide-react";
import { BUSINESS_INFO, PRODUCTS } from "../data";

interface InquiryFormProps {
  prefilledProduct: string;
  onClearPrefill: () => void;
}

export default function InquiryForm({ prefilledProduct, onClearPrefill }: InquiryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    product: "",
    size: "",
    type: "Wholesale",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (prefilledProduct) {
      setFormData((prev) => ({ ...prev, product: prefilledProduct }));
    }
  }, [prefilledProduct]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateWhatsAppText = () => {
    const { name, phone, product, size, type, message } = formData;
    return `*OM SHRINGAR TIRPAL STORE - BULK INQUIRY*\n\n` +
           `👤 *Name:* ${name}\n` +
           `📞 *Phone:* ${phone}\n` +
           `📦 *Product:* ${product || "General Inquiry"}\n` +
           `📏 *Approx Size:* ${size || "Not specified"}\n` +
           `💼 *Order Type:* ${type}\n` +
           `📝 *Message:* ${message || "Interested in catalog and wholesale prices."}`;
  };

  const getWhatsAppLink = () => {
    const text = generateWhatsAppText();
    return `${BUSINESS_INFO.whatsappLink}?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Please fill in your Name and Phone Number.");
      return;
    }
    setIsSubmitted(true);
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
    setIsSubmitted(false);
    onClearPrefill();
  };

  return (
    <div id="enquire-section" className="w-full">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-100/50 shadow-xl relative overflow-hidden"
          >
            {/* Top decorative gradient pill */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-brand-orange to-brand-blue-royal rounded-b-full" />

            <div className="flex items-center gap-2 bg-orange-50 text-brand-orange text-xs font-bold font-mono px-3.5 py-1.5 rounded-full w-fit mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>REQUEST WHOLESALE / BULK QUOTE</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold font-display text-brand-blue-dark tracking-tight mb-2">
              Send an Enquiry
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
              Fill in the details below. Our team under Mr. Vinod Kumar Varnawal will contact you within 2 hours with customized rates.
            </p>

            <div className="space-y-6">
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name-input" className="block text-xs font-bold font-mono uppercase text-slate-500 mb-2">
                    Your Full Name <span className="text-brand-orange">*</span>
                  </label>
                  <input
                    id="name-input"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full bg-slate-50/50 border border-slate-200 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="phone-input" className="block text-xs font-bold font-mono uppercase text-slate-500 mb-2">
                    Phone Number <span className="text-brand-orange">*</span>
                  </label>
                  <input
                    id="phone-input"
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +91 9876543210"
                    className="w-full bg-slate-50/50 border border-slate-200 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 outline-none"
                  />
                </div>
              </div>

              {/* Product Selection & Approximate Sizes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="product-select" className="block text-xs font-bold font-mono uppercase text-slate-500 mb-2">
                    Select Product Category
                  </label>
                  <select
                    id="product-select"
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                    className="w-full bg-slate-50/50 border border-slate-200 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 outline-none appearance-none"
                  >
                    <option value="">-- Choose Product --</option>
                    {PRODUCTS.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                    <option value="Custom Size Sheet">Other / Custom Plastic Sheet</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="size-input" className="block text-xs font-bold font-mono uppercase text-slate-500 mb-2">
                    Required Size (e.g. 15×10, 30 ft roll)
                  </label>
                  <input
                    id="size-input"
                    type="text"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    placeholder="Describe sizing needed"
                    className="w-full bg-slate-50/50 border border-slate-200 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 outline-none"
                  />
                </div>
              </div>

              {/* Inquiry Type / Order Volume */}
              <div>
                <span className="block text-xs font-bold font-mono uppercase text-slate-500 mb-3">
                  Inquiry Type & Order Volume
                </span>
                <div className="grid grid-cols-3 gap-3">
                  {["Wholesale", "Retail", "Custom Spec"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, type: opt }))}
                      className={`py-2.5 px-3 rounded-full border font-semibold text-xs md:text-sm text-center transition-all duration-200 cursor-pointer ${
                        formData.type === opt
                          ? "bg-brand-blue-dark text-white border-transparent shadow-sm"
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {opt === "Wholesale" ? "📦 Wholesale" : opt === "Retail" ? "🛍️ Retail" : "🛠️ Custom"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message-input" className="block text-xs font-bold font-mono uppercase text-slate-500 mb-2">
                  Special Requirements / Delivery Destination Address
                </label>
                <textarea
                  id="message-input"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your requirements (e.g. required thickness, delivery location in Siwan or surrounding regions)..."
                  className="w-full bg-slate-50/50 border border-slate-200 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 outline-none resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white py-4 px-6 rounded-full font-bold text-sm sm:text-base transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Submit Quote Request
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="bg-brand-blue-dark text-white p-8 sm:p-12 rounded-3xl shadow-xl border border-white/10 text-center relative overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -right-16 -top-16 w-48 h-48 bg-brand-orange/10 rounded-full blur-2xl" />
            <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-brand-blue-royal/20 rounded-full blur-2xl" />

            <div className="w-16 h-16 bg-brand-orange/20 border border-brand-orange/40 text-brand-orange rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-9 h-9" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold font-display tracking-tight mb-3">
              Inquiry Submitted Successfully!
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-8">
              Thank you for choosing <strong className="text-white">Om Shringar Tirpal Store</strong>. Your request is registered.
            </p>

            <div className="bg-slate-900/60 p-5 rounded-2xl border border-white/5 text-left max-w-md mx-auto mb-8 text-xs sm:text-sm space-y-2">
              <div className="text-brand-orange font-mono font-bold uppercase tracking-wide border-b border-white/5 pb-2 mb-2">
                Your Inquiry Summary
              </div>
              <p><strong className="text-slate-400">Name:</strong> {formData.name}</p>
              <p><strong className="text-slate-400">Phone:</strong> {formData.phone}</p>
              <p><strong className="text-slate-400">Product:</strong> {formData.product || "General Inquiry"}</p>
              <p><strong className="text-slate-400">Required Size:</strong> {formData.size || "Not specified"}</p>
              <p><strong className="text-slate-400">Order Volume:</strong> {formData.type}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              {/* Direct WhatsApp Send */}
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white py-3.5 px-6 rounded-full font-bold text-sm sm:text-base transition-all duration-200 shadow-md"
              >
                <MessageSquare className="w-5 h-5" />
                Send via WhatsApp for Instant Reply
              </a>

              {/* Start new Quote */}
              <button
                onClick={handleReset}
                className="w-full sm:w-auto flex items-center justify-center gap-1 bg-white/10 hover:bg-white/15 text-white py-3.5 px-6 rounded-full font-semibold text-sm transition-all duration-200 border border-white/10 cursor-pointer"
              >
                Send Another Enquiry
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle, MapPin, Sparkles, Database, LogOut } from "lucide-react";
import { PRODUCTS } from "../data";
import { initAuth, googleSignIn, logout, logEnquiryToSheet, EnquiryData } from "../lib/googleSheets";
import { User } from "firebase/auth";

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
  
  // Auth state
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSubmittingSheet, setIsSubmittingSheet] = useState(false);
  const [spreadsheetUrl, setSpreadsheetUrl] = useState<string | null>(null);

  useEffect(() => {
    if (prefilledProduct) {
      setFormData((prev) => ({ ...prev, product: prefilledProduct }));
    }
  }, [prefilledProduct]);

  // Handle Firebase Auth listening
  useEffect(() => {
    const unsubscribe = initAuth(
      (u, t) => {
        setUser(u);
        setToken(t);
      },
      () => {
        setUser(null);
        setToken(null);
      }
    );
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setToken(res.accessToken);
      }
    } catch (error) {
      console.error("Sign in failed:", error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Please fill in your Name and Phone Number.");
      return;
    }

    if (!token) {
      alert("Please sign in with Google first to authorize logging to Google Sheets.");
      return;
    }

    setIsSubmittingSheet(true);
    try {
      const submissionData: EnquiryData = {
        name: formData.name,
        phone: formData.phone,
        product: formData.product,
        size: formData.size,
        type: formData.type,
        message: formData.message,
      };

      const result = await logEnquiryToSheet(submissionData, token);
      if (result.success) {
        setSpreadsheetUrl(result.spreadsheetUrl || null);
        setIsSubmitted(true);
      } else {
        alert("Could not save to Google Sheet. Please check your authorization or internet connection.");
      }
    } catch (error) {
      console.error("Sheet writing error:", error);
      alert("An error occurred while logging your inquiry. Please try again.");
    } finally {
      setIsSubmittingSheet(false);
    }
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
              Fill in the details below. All enquiries are automatically logged into your Google Sheets spreadsheet database in real-time.
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

              {/* Google Sheets Status/Login Indicator */}
              {!user ? (
                <div className="bg-slate-50 border border-slate-200/60 p-5 rounded-2xl flex flex-col items-center text-center gap-3">
                  <div className="text-xs font-bold font-mono text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
                    <Database className="w-4 h-4 text-slate-400" />
                    Spreadsheet Authorization Required
                  </div>
                  <p className="text-xs text-slate-500 max-w-sm">
                    Please sign in with Google to authorize recording enquiries to Google Sheets in your Google Drive.
                  </p>
                  <button
                    type="button"
                    onClick={handleLogin}
                    disabled={isLoggingIn}
                    className="w-full max-w-xs cursor-pointer flex items-center justify-center"
                  >
                    <div className="bg-white border border-slate-200 hover:border-slate-300 active:bg-slate-50 rounded-full px-5 py-2.5 flex items-center justify-center gap-3 transition-colors shadow-sm w-full">
                      <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ display: 'block' }}>
                          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                          <path fill="none" d="M0 0h48v48H0z"></path>
                        </svg>
                      </div>
                      <span className="text-slate-700 font-semibold text-sm">
                        {isLoggingIn ? "Connecting Google..." : "Connect with Google Sheets"}
                      </span>
                    </div>
                  </button>
                </div>
              ) : (
                <div className="bg-emerald-50/60 border border-emerald-100 p-4 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName || "User"} className="w-10 h-10 rounded-full border border-emerald-200" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
                        {user.displayName?.[0] || "U"}
                      </div>
                    )}
                    <div>
                      <div className="text-[11px] text-slate-500 font-medium">Logged in via Google Sheet connector as</div>
                      <div className="text-sm font-bold text-slate-800">{user.displayName || user.email}</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => logout()}
                    className="text-xs font-bold font-mono text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-100 px-3 py-1.5 rounded-full transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={!user || isSubmittingSheet}
                className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full font-bold text-sm sm:text-base transition-all duration-200 shadow-md cursor-pointer ${
                  !user 
                    ? "bg-slate-200 text-slate-400 border border-slate-300 shadow-none cursor-not-allowed" 
                    : "bg-orange-600 hover:bg-orange-700 text-white hover:shadow-lg active:scale-[0.99]"
                }`}
              >
                {isSubmittingSheet ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Logging to Google Sheet...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Enquiry to Google Sheet
                  </>
                )}
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

            <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-9 h-9" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold font-display tracking-tight mb-3">
              Recorded in Google Sheets!
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-8">
              Thank you for choosing <strong className="text-white">Om Shringar Tirpal Store</strong>. Your enquiry details have been successfully saved to your Google Sheets database in your Google Drive.
            </p>

            <div className="bg-slate-900/60 p-5 rounded-2xl border border-white/5 text-left max-w-md mx-auto mb-8 text-xs sm:text-sm space-y-2">
              <div className="text-brand-orange font-mono font-bold uppercase tracking-wide border-b border-white/5 pb-2 mb-2 flex items-center gap-1.5">
                <Database className="w-4 h-4 text-brand-orange" />
                Logged Data Record
              </div>
              <p><strong className="text-slate-400">Name:</strong> {formData.name}</p>
              <p><strong className="text-slate-400">Phone:</strong> {formData.phone}</p>
              <p><strong className="text-slate-400">Product:</strong> {formData.product || "General Inquiry"}</p>
              <p><strong className="text-slate-400">Required Size:</strong> {formData.size || "Not specified"}</p>
              <p><strong className="text-slate-400">Order Volume:</strong> {formData.type}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              {/* Direct Google Sheets Link */}
              {spreadsheetUrl && (
                <a
                  href={spreadsheetUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 px-6 rounded-full font-bold text-sm sm:text-base transition-all duration-200 shadow-md"
                >
                  <Database className="w-5 h-5" />
                  View Spreadsheet in Drive
                </a>
              )}

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

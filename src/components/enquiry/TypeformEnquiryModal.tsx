import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight, ArrowLeft, Check, Search, MapPin, User, Building, MessageSquare, Sparkles } from "lucide-react";
import statesData from "../../states-and-districts.json";
import { saveCustomerEnquiry } from "../../lib/enquiryStorage";

interface TypeformEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    images?: string[];
    category?: string;
  };
}

const WHATSAPP_PHONE = "918210625483";

export default function TypeformEnquiryModal({
  isOpen,
  onClose,
  product,
}: TypeformEnquiryModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [fullName, setFullName] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [stateSearch, setStateSearch] = useState("");
  const [city, setCity] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [redirectSuccess, setRedirectSuccess] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const stateDropdownRef = useRef<HTMLDivElement>(null);

  // Extract states and union territories from the JSON dataset
  const allStates = statesData.states.map((s) => s.state);

  // Get districts of the selected state for quick suggestions in Step 3
  const selectedStateObj = statesData.states.find(
    (s) => s.state.toLowerCase() === selectedState.toLowerCase()
  );
  const districtSuggestions = selectedStateObj ? selectedStateObj.districts : [];

  // Reset form when opened for a new product
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setErrorMessage("");
      setIsSubmitting(false);
      setRedirectSuccess(false);
      setIsStateDropdownOpen(false);
      // Auto-focus input after modal renders
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen, product.id]);

  // Click outside to close state dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        stateDropdownRef.current &&
        !stateDropdownRef.current.contains(e.target as Node)
      ) {
        setIsStateDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isOpen) return null;

  // Filtered states for searchable dropdown
  const filteredStates = allStates.filter((st) =>
    st.toLowerCase().includes(stateSearch.trim().toLowerCase())
  );

  // Filtered districts for city suggestions
  const filteredDistricts = districtSuggestions.filter((dist) =>
    dist.toLowerCase().includes(citySearch.trim().toLowerCase())
  );

  const handleNextStep = () => {
    setErrorMessage("");
    if (step === 1) {
      if (!fullName.trim()) {
        setErrorMessage("Please enter your full name to proceed.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!selectedState.trim()) {
        setErrorMessage("Please select your state from the list.");
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!city.trim()) {
        setErrorMessage("Please enter your city name to proceed.");
        return;
      }
      setStep(4);
    }
  };

  const handlePrevStep = () => {
    setErrorMessage("");
    if (step > 1) {
      setStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && step < 4) {
      e.preventDefault();
      handleNextStep();
    }
  };

  const handleContinueToWhatsApp = async () => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // 1. Save customer enquiry to backend & local storage
      await saveCustomerEnquiry({
        customerName: fullName.trim(),
        state: selectedState.trim(),
        city: city.trim(),
        productName: product.name,
        productId: product.id,
        enquirySource: "Product Detail Page Enquire Now CTA",
      });
    } catch (e) {
      console.warn("Enquiry save error:", e);
    }

    // 2. Build the exact dynamic WhatsApp message requested
    const message = `Hello Om Shringar Tirpal Store,

I want to enquire about:

Product: ${product.name}

Customer Name: ${fullName.trim()}
State: ${selectedState.trim()}
City: ${city.trim()}

Please share the latest price, available sizes and other details.

Thank you.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;

    // Open WhatsApp
    setRedirectSuccess(true);
    setIsSubmitting(false);

    // Attempt direct window open
    const win = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    if (!win || win.closed || typeof win.closed === "undefined") {
      // Fallback redirection if popup blocker triggered
      window.location.href = whatsappUrl;
    }
  };

  const progressPercent = (step / 4) * 100;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      {/* Centered Modern Typeform Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Progress Bar */}
        <div className="w-full bg-slate-100 h-1.5 relative overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-orange-500 to-amber-500"
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          />
        </div>

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-600 font-black text-xs">
              {step}
            </span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Step {step} of 4
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body: Typeform-Inspired Question & Input */}
        <div className="px-6 sm:px-8 py-6 sm:py-7 flex-1 min-h-[300px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {/* STEP 1: Full Name */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col flex-1"
              >
                <div className="mb-6">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full mb-2">
                    <User className="w-3.5 h-3.5" />
                    <span>Customer Details</span>
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Get Product Enquiry
                  </h2>
                  <p className="text-sm text-slate-500 mt-1 font-medium leading-relaxed">
                    Tell us a few details and we'll help you with the best price and availability.
                  </p>
                </div>

                <div className="my-auto py-2">
                  <label className="block text-base sm:text-lg font-bold text-slate-800 mb-2">
                    What's your name? <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errorMessage) setErrorMessage("");
                      }}
                      onKeyDown={handleKeyDown}
                      placeholder="e.g. Rahul Kumar"
                      className="w-full text-base sm:text-lg font-medium px-4 py-3.5 rounded-2xl border-2 border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all placeholder:text-slate-400 text-slate-800"
                    />
                  </div>
                  {errorMessage && (
                    <p className="text-xs font-semibold text-rose-600 mt-2 flex items-center gap-1">
                      ⚠️ {errorMessage}
                    </p>
                  )}
                  <p className="text-[11px] text-slate-400 mt-2 font-medium">
                    Press <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-mono">Enter ↵</kbd> or click Continue.
                  </p>
                </div>
              </motion.div>
            )}

            {/* STEP 2: State (Searchable Dropdown) */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col flex-1"
              >
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full mb-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Location Information</span>
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Which state are you from? <span className="text-rose-500">*</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Select your state or union territory from the searchable list below.
                  </p>
                </div>

                <div className="relative my-auto" ref={stateDropdownRef}>
                  {/* Search Input for State */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Search className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={stateSearch}
                      onChange={(e) => {
                        setStateSearch(e.target.value);
                        setIsStateDropdownOpen(true);
                      }}
                      onFocus={() => setIsStateDropdownOpen(true)}
                      placeholder={selectedState ? `Selected: ${selectedState}` : "Type to search your state (e.g. Bihar, UP)..."}
                      className={`w-full pl-10 pr-4 py-3 rounded-2xl border-2 text-sm sm:text-base font-medium outline-none transition-all placeholder:text-slate-400 ${
                        selectedState
                          ? "border-orange-500 bg-orange-50/20 text-slate-900"
                          : "border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 text-slate-800"
                      }`}
                    />
                    {selectedState && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-md">
                        ✓ Selected
                      </span>
                    )}
                  </div>

                  {/* Dropdown Options List */}
                  <div className="mt-2 max-h-[190px] overflow-y-auto rounded-2xl border border-slate-200/80 bg-white shadow-lg divide-y divide-slate-100 scrollbar-thin">
                    {filteredStates.length > 0 ? (
                      filteredStates.map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => {
                            setSelectedState(st);
                            setStateSearch(st);
                            setIsStateDropdownOpen(false);
                            if (errorMessage) setErrorMessage("");
                          }}
                          className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm font-medium flex items-center justify-between transition-colors cursor-pointer ${
                            selectedState === st
                              ? "bg-orange-50 text-orange-700 font-bold"
                              : "hover:bg-slate-50 text-slate-700"
                          }`}
                        >
                          <span>{st}</span>
                          {selectedState === st && (
                            <Check className="w-4 h-4 text-orange-600" />
                          )}
                        </button>
                      ))
                    ) : (
                      <div className="p-3 text-center text-xs text-slate-400">
                        No states matching "{stateSearch}"
                      </div>
                    )}
                  </div>

                  {errorMessage && (
                    <p className="text-xs font-semibold text-rose-600 mt-2">
                      ⚠️ {errorMessage}
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {/* STEP 3: City */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col flex-1"
              >
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full mb-2">
                    <Building className="w-3.5 h-3.5" />
                    <span>City / Town</span>
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Which city are you from? <span className="text-rose-500">*</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Enter your city name (or click one of the suggested districts from {selectedState}).
                  </p>
                </div>

                <div className="my-auto py-1">
                  <div className="relative">
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                        setCitySearch(e.target.value);
                        if (errorMessage) setErrorMessage("");
                      }}
                      onKeyDown={handleKeyDown}
                      placeholder="e.g. Siwan, Patna, Maharajganj..."
                      className="w-full text-base sm:text-lg font-medium px-4 py-3.5 rounded-2xl border-2 border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all placeholder:text-slate-400 text-slate-800"
                    />
                  </div>

                  {/* District Chips Suggestions for selected state */}
                  {districtSuggestions.length > 0 && (
                    <div className="mt-3">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                        Quick suggestions for {selectedState}:
                      </span>
                      <div className="flex flex-wrap gap-1.5 max-h-[100px] overflow-y-auto">
                        {districtSuggestions.slice(0, 10).map((dist) => (
                          <button
                            key={dist}
                            type="button"
                            onClick={() => {
                              setCity(dist);
                              if (errorMessage) setErrorMessage("");
                            }}
                            className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                              city === dist
                                ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                                : "bg-slate-50 hover:bg-orange-50 text-slate-700 border-slate-200 hover:border-orange-200"
                            }`}
                          >
                            {dist}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {errorMessage && (
                    <p className="text-xs font-semibold text-rose-600 mt-2">
                      ⚠️ {errorMessage}
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {/* STEP 4: Confirmation Summary */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col flex-1"
              >
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full mb-2 border border-emerald-200">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Ready to Enquire</span>
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Confirm Your Details
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Click below to open WhatsApp with your pre-filled inquiry.
                  </p>
                </div>

                {/* Summary Card */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 my-auto shadow-sm space-y-3">
                  <div className="flex items-start justify-between pb-3 border-b border-slate-200/60">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Product
                      </span>
                      <h4 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                        {product.name}
                      </h4>
                    </div>
                    {product.images && product.images[0] && (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0 ml-3 shadow-xs"
                      />
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs sm:text-sm">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Name
                      </span>
                      <span className="font-bold text-slate-800 block">
                        {fullName}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        State
                      </span>
                      <span className="font-bold text-slate-800 block">
                        {selectedState}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        City
                      </span>
                      <span className="font-bold text-slate-800 block">
                        {city}
                      </span>
                    </div>
                  </div>
                </div>

                {redirectSuccess ? (
                  <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                    <p className="text-xs font-bold text-emerald-800 flex items-center justify-center gap-1.5 mb-1">
                      <Check className="w-4 h-4 text-emerald-600" />
                      Enquiry saved & WhatsApp opened!
                    </p>
                    <p className="text-[11px] text-emerald-700">
                      If WhatsApp didn't open automatically, click the button below:
                    </p>
                  </div>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Modal Footer Controls */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer ml-auto"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleContinueToWhatsApp}
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 active:scale-95 text-white font-black text-xs sm:text-sm tracking-wide shadow-lg transition-all cursor-pointer w-full sm:w-auto ml-auto"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>
                  {isSubmitting ? "Saving..." : "CONTINUE TO WHATSAPP"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

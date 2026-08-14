import React, { useEffect } from "react";
import { motion } from "motion/react";
import { BUSINESS_INFO } from "../data";

export type Language = "en" | "hi";

interface MeetSupplierSectionProps {
  onBack: () => void;
  lang: Language;
  onEnquire?: (productName?: string, customContext?: string) => void;
}

export const MeetSupplierSection: React.FC<MeetSupplierSectionProps> = ({
  onBack,
  lang,
  onEnquire,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const isHindi = lang === "hi";

  const ownerPhotoUrl =
    "https://plain-apac-prod-public.komododecks.com/202607/04/de0uRzABCTBM2Rp6uDZu/image.png";

  const values = [
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
      title: isHindi ? "100% ओरिजिनल व वर्जिन क्वालिटी" : "100% Virgin Grade Assurance",
      desc: isHindi
        ? "हम सिर्फ प्रतिष्ठित और ओरिजिनल आईएसआई प्रमाणित ब्रांड्स की डीलरशिप रखते हैं। कोई कम गेज या मिलावट नहीं।"
        : "Direct authorised dealership of genuine ISI-marked brands. Zero gauge compromise and strictly virgin polymers.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      title: isHindi ? "24+ वर्षों का अटूट विश्वास" : "24+ Years Industry Legacy",
      desc: isHindi
        ? "साल 2000 से (पूर्व में गोयल ट्रेडर्स) महाराजगंज, सीवान और पूरे बिहार में लाखों किसानों और व्यापारियों की पहली पसंद।"
        : "Serving farmers, transport logistics, and retail partners across Maharajganj, Siwan & Bihar since 2000.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ),
      title: isHindi ? "रेडी स्टॉक व कस्टम साइज़िंग" : "Ready Bulk Stock & Custom Sizing",
      desc: isHindi
        ? "विशाल स्टोर में हर साइज (6x4 से 60x60 फीट) और 70 GSM से 500+ GSM तक का भारी स्टॉक हमेशा उपलब्ध।"
        : "Continuous ready inventory from 6x4 ft to 60x60 ft and custom fabrication for large-scale agricultural ponds & sheds.",
    },
  ];

  const productCapabilities = [
    {
      title: isHindi ? "सुप्रीम सिल्पाउलिन (Multi-Layered Film)" : "Supreme Silpaulin Multi-Layer Tarpaulins",
      specs: isHindi ? "70 GSM से 450 GSM • 100% वाटरप्रूफ • UV स्टेबलाइज्ड" : "70 GSM to 450 GSM • 100% Leakproof • UV Stabilized",
    },
    {
      title: isHindi ? "एचडीपीई व क्रॉस लैमिनेटेड तिरपाल" : "Heavy-Duty HDPE & Cross-Laminated Sheets",
      specs: isHindi ? "ट्रक कवर, गोदाम शेड और भारी निर्माण कार्यों के लिए" : "Heavy transport vehicle covers, factory shades & warehouse storage",
    },
    {
      title: isHindi ? "पॉलिएस्टर व रेशम फेंसिंग नेट (जाली)" : "Polyester & Resham Fencing Wire Nets",
      specs: isHindi ? "खेत, बगीचा और पोल्ट्री फॉर्म सुरक्षा के लिए मजबूत जाली" : "Long-lasting border protection for farms, poultry, and gardens",
    },
    {
      title: isHindi ? "बायोफ्लॉक व एग्रीकल्चर पॉन्ड लाइनर्स" : "Biofloc Fish Farming & Agricultural Pond Liners",
      specs: isHindi ? "उच्च शक्ति सीलेंट, रासायनिक प्रतिरोधी व आसान इंस्टॉलेशन" : "High puncture resistance, anti-algae chemical safe formulation",
    },
    {
      title: isHindi ? "थर्मोकोल शीट्स व इंसुलेशन फोम" : "EPS Thermocol Sheets & Thermal Insulation",
      specs: isHindi ? "फॉल्स सीलिंग, पैकेजिंग और कोल्ड स्टोरेज इन्सुलेशन" : "False ceiling boards, thermal dampening & protective cushioning",
    },
    {
      title: isHindi ? "वाटरप्रूफ टेबल कवर्स व चटाई (Mat)" : "Waterproof Table Cloths & Plastic Mats (Chatai)",
      specs: isHindi ? "खुदरा (रिटेल) काउंटर पर आकर्षक डिज़ाइन्स व टिकाऊ क्वालिटी" : "Vibrant wipe-clean dining covers & durable floor mats in retail",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased selection:bg-orange-500 selection:text-white font-amaranth-bold">
      {/* TOP NAVIGATION BAR */}
      <div className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Back Button with clean SVG */}
          <button
            onClick={onBack}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 hover:bg-orange-500 hover:text-white text-slate-800 font-amaranth-bold text-sm transition-all active:scale-95 cursor-pointer shadow-xs border border-slate-200"
            aria-label="Back to Homepage"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            <span className="font-amaranth-bold">{isHindi ? "होमपेज पर वापस जाएं" : "Back to Home"}</span>
          </button>

          {/* Return to Homepage Button with Home SVG Icon */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-amaranth-bold text-xs sm:text-sm shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="font-amaranth-bold">{isHindi ? "होमपेज" : "Return to Homepage"}</span>
          </button>
        </div>
      </div>

      {/* HERO / FOUNDER SPOTLIGHT BANNER (CLEAN WHITE BACKGROUND) */}
      <section className="relative bg-white text-slate-900 py-12 lg:py-16 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* LEFT: Framed Photo */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="relative group"
              >
                {/* Subtle Amber Halo */}
                <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 opacity-60 blur-sm" />
                
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full p-2 bg-white shadow-xl overflow-hidden flex items-center justify-center border-4 border-amber-400">
                  <img
                    src={ownerPhotoUrl}
                    alt="Mr. Vinod Kumar Varnawal - Founder"
                    className="w-full h-full object-cover rounded-full filter brightness-105 contrast-105"
                    loading="eager"
                  />
                </div>

                {/* Founder Crown Badge */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 text-white px-5 py-1.5 rounded-full font-amaranth-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-1.5 whitespace-nowrap">
                  <span>👑</span>
                  <span className="font-amaranth-bold">{isHindi ? "संस्थापक एवं संचालक" : "Founder & Managing Director"}</span>
                </div>
              </motion.div>

              <div className="mt-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-amaranth-bold text-slate-900 tracking-tight">
                  Mr. <span className="text-orange-600">Vinod Kumar Varnawal</span>
                </h1>
                <p className="text-sm font-amaranth-bold text-slate-700 mt-1">
                  Om Shringar Tirpal Store • Maharajganj, Siwan, Bihar
                </p>
                <p className="text-xs text-slate-500 font-amaranth-bold mt-0.5">
                  (Formerly Goyal Traders • Serving Bihar & Eastern India Since 2000)
                </p>
              </div>
            </div>

            {/* RIGHT: Leadership Vision & Statement */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm relative"
              >
                {/* Quote Icon */}
                <div className="text-orange-300 text-5xl font-serif absolute top-4 right-6 pointer-events-none opacity-40">
                  “
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 border border-orange-200 text-xs font-amaranth-bold uppercase tracking-wider mb-4">
                  <span>✨</span>
                  <span className="font-amaranth-bold">{isHindi ? "संस्थापक का संदेश" : "Founder's Philosophy"}</span>
                </div>

                <blockquote className="text-base sm:text-lg text-slate-800 font-amaranth-bold leading-relaxed italic mb-6">
                  {isHindi ? (
                    <>
                      "हमारा संकल्प हमेशा से एक रहा है—ग्राहक को <strong className="text-orange-600 not-italic font-amaranth-bold">शुद्ध गुणवत्ता (100% Virgin Quality)</strong> और सही वजन व गेज का माल देना। चाहे किसान भाई को अपनी फसल बचानी हो, ट्रांसपोर्टर को माल सुरक्षित रखना हो, या किसी डीलर को थोक में सप्लाई चाहिए हो—ओम श्रृंगार तिरपाल स्टोर हमेशा भरोसे का दूसरा नाम है।"
                    </>
                  ) : (
                    <>
                      "Our foundational promise has remained unchanged for over two decades: Deliver <strong className="text-orange-600 not-italic font-amaranth-bold">100% Genuine Virgin Quality</strong> with zero tolerance for counterfeit or under-gauge materials. Whether an agricultural farmer, industrial logistics partner, or regional wholesale dealer—your trust is our most valued asset."
                    </>
                  )}
                </blockquote>

                {/* Direct Action Chips */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-200">
                  <a
                    href={`https://wa.me/918210625483?text=${encodeURIComponent(
                      isHindi
                        ? "नमस्ते विनोद जी! मैं ओम श्रृंगार तिरपाल स्टोर के बारे में जानकारी और थोक/रिटेल ऑर्डर के लिए संपर्क कर रहा हूँ।"
                        : "Hello Mr. Vinod Kumar Varnawal! I would like to connect regarding wholesale/retail orders with Om Shringar Tirpal Store."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-amaranth-bold text-xs sm:text-sm shadow-sm transition-all active:scale-95 cursor-pointer"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z" />
                    </svg>
                    <span className="font-amaranth-bold">{isHindi ? "व्हाट्सएप पर सीधा संपर्क" : "Direct WhatsApp Chat"}</span>
                  </a>

                  <a
                    href={BUSINESS_INFO.phoneFormatted || "tel:+918210625483"}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-amaranth-bold text-xs sm:text-sm border border-slate-300 shadow-xs transition-all active:scale-95 cursor-pointer"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span className="font-amaranth-bold">{BUSINESS_INFO.phone}</span>
                  </a>
                </div>

              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* CORE VALUES GRID (CLEAN WHITE BACKGROUND) */}
      <section className="py-14 lg:py-18 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-amaranth-bold uppercase tracking-wider text-orange-600 bg-orange-50 border border-orange-200 px-3 py-1 rounded-full">
              {isHindi ? "हमारे सिद्धांत" : "Core Values & Pillars"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-amaranth-bold text-slate-900 mt-3">
              {isHindi
                ? "24 वर्षों से क्यों हैं हम ग्राहकों की पहली पसंद?"
                : "Why Businesses & Farmers Rely on Our Direct Supply"}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-amaranth-bold">
              {isHindi
                ? "हर तिरपाल और प्लास्टिक शीट पर सख्त क्वालिटी चेक, सही नाप-तौल और निष्पक्ष व्यवहार।"
                : "Every square meter undergoes rigorous thickness & strength verification to guarantee maximum protection."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-orange-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-orange-100 border border-orange-200 flex items-center justify-center mb-4">
                    {v.icon}
                  </div>
                  <h3 className="font-amaranth-bold text-slate-900 text-lg mb-2">
                    {v.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-amaranth-bold">
                    {v.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPREHENSIVE PRODUCT CAPABILITIES (CLEAN WHITE BACKGROUND) */}
      <section className="py-14 lg:py-18 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-amaranth-bold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
              {isHindi ? "उपलब्ध उत्पाद शृंखला" : "Available Product Lineup"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-amaranth-bold text-slate-900 mt-3">
              {isHindi
                ? "हमारी सम्पूर्ण मैन्युफैक्चरर व डिस्ट्रीब्यूशन रेंज"
                : "Complete Stock Spectrum Ready for Immediate Dispatch"}
            </h2>
            <p className="text-sm text-slate-600 mt-2 font-amaranth-bold">
              {isHindi
                ? "थोक (Wholesale) और खुदरा (Retail) दोनों ग्राहकों के लिए उचित दर और उच्च गुणवत्ता।"
                : "Tailored fulfillment for wholesale dealers, logistics companies, agricultural uses, and retail walk-ins."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productCapabilities.map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-amber-400 hover:bg-amber-50/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0" />
                    <h3 className="font-amaranth-bold text-slate-900 text-base">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-amaranth-bold leading-relaxed">
                    {item.specs}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200">
                  <button
                    onClick={() => {
                      if (onEnquire) {
                        onEnquire(item.title, "Direct Supplier Page Inquiry");
                      }
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-amaranth-bold text-orange-600 hover:text-orange-700 cursor-pointer"
                  >
                    <span className="font-amaranth-bold">{isHindi ? "रेट व साइज़ जानें" : "Inquire Rates & Sizes"}</span>
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHYSICAL STORE ADDRESS & VISITATION BANNER (CLEAN WHITE/SLATE BG) */}
      <section className="py-14 lg:py-18 bg-slate-50 text-slate-900 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-700 border border-orange-200 text-xs font-amaranth-bold uppercase tracking-wider mb-5">
            <span>📍</span>
            <span className="font-amaranth-bold">{isHindi ? "फिजिकल स्टोर व वेयरहाउस" : "Physical Store & Warehouse Location"}</span>
          </span>

          <h2 className="text-2xl sm:text-4xl font-amaranth-bold text-slate-900 tracking-tight mb-3">
            {isHindi ? "सीधे हमारे स्टोर पर पधारें" : "Visit Our Physical Store & Warehouse"}
          </h2>

          <p className="text-sm sm:text-base text-slate-700 max-w-2xl mx-auto mb-6 font-amaranth-bold leading-relaxed">
            {BUSINESS_INFO.address}
            <br />
            <span className="text-orange-600 font-amaranth-bold text-xs mt-1 inline-block">
              {isHindi
                ? "दुकान खुलने का समय: सोमवार से रविवार (सुबह 6:00 AM से रात 9:00 PM)"
                : "Store Timings: Monday to Sunday (6:00 AM – 9:00 PM)"}
            </span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-amaranth-bold text-sm sm:text-base shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span className="font-amaranth-bold">{isHindi ? "होमपेज पर वापस जाएं" : "Return to Homepage"}</span>
            </button>

            <a
              href={`https://wa.me/918210625483?text=${encodeURIComponent(
                isHindi
                  ? "नमस्ते! मैं ओम श्रृंगार तिरपाल स्टोर के बारे में जानकारी चाहता हूँ।"
                  : "Hi! I would like to get in touch with Om Shringar Tirpal Store."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-amaranth-bold text-sm sm:text-base shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <span>💬</span>
              <span className="font-amaranth-bold">{isHindi ? "व्हाट्सएप पर बात करें" : "Chat on WhatsApp"}</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER BAR WITH RETURN LINK */}
      <footer className="bg-white text-slate-500 py-6 border-t border-slate-200 text-center text-xs font-amaranth-bold">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-amaranth-bold">© {new Date().getFullYear()} Om Shringar Tirpal Store. All Rights Reserved.</p>
          <button
            onClick={onBack}
            className="text-orange-600 hover:text-orange-700 font-amaranth-bold underline cursor-pointer"
          >
            {isHindi ? "← होमपेज पर लौटें" : "← Return to Homepage"}
          </button>
        </div>
      </footer>
    </div>
  );
};

export default MeetSupplierSection;

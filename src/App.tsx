import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import * as Icons from "lucide-react";
import {
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  ChevronDown,
  Menu,
  X,
  ShieldCheck,
  CalendarDays,
  Award,
  Zap,
  PhoneCall,
  Sparkles,
  ExternalLink,
  Tag,
  Warehouse,
  Truck,
  Sprout,
  Users
} from "lucide-react";

import {
  BUSINESS_INFO,
  PRODUCTS,
  SPECIAL_PURPOSE_SHEETS,
  SIZE_MATRIX,
  WHY_CHOOSE_US,
  FAQS
} from "./data";

import ProductCard from "./components/ProductCard";
import BrandCarousel from "./components/BrandCarousel";
import InquiryForm from "./components/InquiryForm";
import AIChatbot from "./components/AIChatbot";
import SupplierPopup from "./components/SupplierPopup";
import RetailPriceModal from "./components/RetailPriceModal";
import RetailPriceSection from "./components/RetailPriceSection";
import HeroCarousel from "./components/HeroCarousel";
import StoreStatusCard from "./components/StoreStatusCard";
import AutoInquiryModal from "./components/AutoInquiryModal";
import { TRANSLATIONS } from "./translations";

// Safe dynamic icon loader to keep code modular and readable
function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = (Icons as any)[name] || Icons.HelpCircle;
  return <IconComponent className={className} />;
}

export default function App() {
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prefilledProduct, setPrefilledProduct] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [supplierOpen, setSupplierOpen] = useState(false);
  const [retailOpen, setRetailOpen] = useState(false);
  const [heroBgImage, setHeroBgImage] = useState("https://plain-apac-prod-public.komododecks.com/202607/05/7O9jo950h35goeKsP6Gr/image.png");

  const inquiryRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[lang];

  const handleEnquire = (productName: string) => {
    setPrefilledProduct(productName);
    // Smooth scroll to inquiry form
    inquiryRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const clearPrefill = () => {
    setPrefilledProduct("");
  };

  const getWhatsAppGeneralLink = () => {
    const text = `Hi, I am visiting your website and have an inquiry about bulk orders at Om Shringar Tirpal Store. Please share your catalog.`;
    return `${BUSINESS_INFO.whatsappLink}?text=${encodeURIComponent(text)}`;
  };

  // Categories for product tab filtering
  const categories = ["All", "Industrial Packaging", "Construction & Curing", "Clear Covering", "All-Weather Protection", "Security & Fencing"];

  const filteredProducts = activeTab === "All" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeTab);

  return (
    <div className="min-h-screen text-slate-800 bg-slate-50/50 flex flex-col relative antialiased selection:bg-brand-orange selection:text-white">
      
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="w-full bg-brand-blue-dark text-white text-xs py-2.5 px-4 sticky top-0 z-50 shadow-md border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          {/* Support Badge */}
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-bold font-mono tracking-wider text-[10px] uppercase bg-white/10 px-2 py-0.5 rounded text-emerald-300">
              {BUSINESS_INFO.supportBadge}
            </span>
            <span className="text-slate-300 hidden md:inline">|</span>
            <span className="text-slate-300 text-[11px] font-medium font-mono">
              Owner: {BUSINESS_INFO.owner} (Formerly Goyal Traders)
            </span>
          </div>

          {/* Scrolling CTA message / Contact */}
          <div className="flex items-center gap-3">
            <span className="font-bold text-brand-orange animate-pulse flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              {BUSINESS_INFO.ctaText}
            </span>
            <span className="text-slate-400 hidden sm:inline">•</span>
            <a 
              href={BUSINESS_INFO.phoneFormatted} 
              className="hover:text-brand-orange font-bold transition-colors flex items-center gap-1 text-[11px] sm:text-xs font-mono"
            >
              <Phone className="w-3 h-3 text-brand-orange" />
              {BUSINESS_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      {/* 2. GLASSMORPHIC STICKY NAVIGATION BAR */}
      <header className="w-full bg-brand-blue-dark border-b border-white/10 sticky top-9 sm:top-8 z-40 shadow-md transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Branding */}
          <a href="#" className="flex flex-col">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold text-xl shadow-md">
                OS
              </div>
              <div>
                <span className="font-bold text-lg sm:text-xl font-display text-white tracking-tight block">
                  OM SHRINGAR <span className="text-orange-400">TIRPAL STORE</span>
                </span>
                <span className="text-[10px] font-bold font-mono text-blue-200 uppercase tracking-widest block -mt-1">
                  Est. 2000 | Formerly Goyal Traders
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 font-semibold text-sm text-blue-100">
            <a href="#about" className="hover:text-orange-400 transition-colors">{t.navAbout}</a>
            <a href="#products" className="hover:text-orange-400 transition-colors">{t.navProducts}</a>
            <a href="#special-uses" className="hover:text-orange-400 transition-colors">{t.navApplications}</a>
            <a href="#size-matrix" className="hover:text-orange-400 transition-colors">{t.navSizeChart}</a>
            <a href="#why-choose" className="hover:text-orange-400 transition-colors">{t.navWhyUs}</a>
            <a href="#enquire" className="hover:text-orange-400 transition-colors">{t.navInquiry}</a>
            <a href="#contact" className="hover:text-orange-400 transition-colors">{t.navFindStore}</a>
          </nav>

          {/* Nav Right CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "en" ? "hi" : "en")}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-bold text-blue-100 hover:text-white hover:bg-white/15 transition-all cursor-pointer mr-1"
            >
              🌐 {lang === "en" ? "हिन्दी" : "English"}
            </button>
            <button
              onClick={() => setRetailOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg flex items-center gap-1.5"
            >
              <Tag className="w-4 h-4" />
              {t.getRetailPrice}
            </button>
            <a
              href="#enquire"
              className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg flex items-center"
            >
              {lang === "en" ? "Get Bulk Quote" : "थोक भाव पाएं"}
            </a>
          </div>

          {/* Mobile Hamburguer Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-white/10 text-white transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Slide-down Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-slate-100 overflow-hidden shadow-inner"
            >
              <div className="px-4 py-6 space-y-4 flex flex-col">
                <a 
                  href="#about" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-slate-700 hover:text-orange-600 py-1"
                >
                  {t.navAbout}
                </a>
                <a 
                  href="#products" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-slate-700 hover:text-orange-600 py-1"
                >
                  {t.navProducts}
                </a>
                <a 
                  href="#special-uses" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-slate-700 hover:text-orange-600 py-1"
                >
                  {t.navApplications}
                </a>
                <a 
                  href="#size-matrix" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-slate-700 hover:text-orange-600 py-1"
                >
                  {t.navSizeChart}
                </a>
                <a 
                  href="#why-choose" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-slate-700 hover:text-orange-600 py-1"
                >
                  {t.navWhyUs}
                </a>
                <a 
                  href="#enquire" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-slate-700 hover:text-orange-600 py-1"
                >
                  {t.navInquiry}
                </a>
                <a 
                  href="#contact" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-slate-700 hover:text-orange-600 py-1"
                >
                  {t.navFindStore}
                </a>

                {/* Mobile Retail Price Button */}
                <div className="py-2 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setRetailOpen(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold text-sm transition-all shadow-md active:scale-95"
                  >
                    <Tag className="w-4 h-4 text-white" />
                    <span>{t.getRetailPrice}</span>
                  </button>
                </div>

                {/* Mobile Language Toggle */}
                <div className="py-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-500">Language / भाषा</span>
                  <button
                    onClick={() => {
                      setLang(lang === "en" ? "hi" : "en");
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
                  >
                    🌐 {lang === "en" ? "Switch to हिन्दी" : "Switch to English"}
                  </button>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                  <a
                    href={BUSINESS_INFO.phoneFormatted}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#001f3f] text-white font-bold text-sm shadow cursor-pointer"
                  >
                    <Phone className="w-4 h-4 text-orange-400" />
                    {lang === "en" ? "Call Mr. Vinod Kumar" : "श्री विनोद कुमार को कॉल करें"}
                  </a>
                  <a
                    href={getWhatsAppGeneralLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#25D366] text-white font-bold text-sm shadow cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    {lang === "en" ? "WhatsApp Chat" : "व्हाट्सएप चैट करें"}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 3. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden py-16 lg:py-28">
        {/* Background Grid Accent */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        {/* Subtle Ambient Color Blobs */}
        <div className="absolute -right-32 -top-32 w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -left-32 -bottom-32 w-[500px] h-[500px] bg-brand-blue-royal/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero Text Column */}
            <div className="lg:col-span-7 flex flex-col text-left">
              
              {/* Best Rate Dealer Highlight Badge (Highly Optimized for Search Ranking & Google Indexing) */}
              <div className="mb-6 flex flex-col gap-1.5 p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 backdrop-blur-md max-w-xl">
                <div className="flex items-center gap-2 text-brand-orange text-xs sm:text-sm font-black uppercase tracking-wider">
                  <span className="text-base animate-bounce">🏆</span>
                  <span>BIHAR'S #1 TRUSTED PLASTIC DEALER</span>
                </div>
                <h2 className="text-white text-sm sm:text-base md:text-lg font-black leading-snug">
                  {lang === "en" 
                    ? "Best Rate Provider Dealer of Bihar for All Plastic Products & Waterproof Tarpaulins" 
                    : "बिहार में सभी प्लास्टिक उत्पादों और वाटरप्रूफ तिरपाल के सर्वश्रेष्ठ एवं सबसे कम रेट वाले डीलर"}
                </h2>
                <p className="text-[10px] sm:text-xs text-slate-300 font-mono">
                  {lang === "en" 
                    ? "Browse best dealer of plastic sheet or tarpaulin at Bihar — Wholesale rates guaranteed" 
                    : "बिहार में सबसे विश्वसनीय प्लास्टिक शीट और तिरपाल सप्लायर — डायरेक्ट थोक दाम"}
                </p>
              </div>

              {/* Trust Badges Bar */}
              <div className="flex flex-wrap gap-2.5 mb-6">
                {(lang === "en" 
                  ? ["✓ Since 2000", "✓ Wholesale & Retail", "✓ Genuine Brands", "✓ Bulk Orders Accepted", "✓ Fast Delivery"]
                  : ["✓ सन 2000 से", "✓ थोक एवं खुदरा भाव", "✓ असली ब्रांड्स", "✓ बल्क आर्डर स्वीकार", "✓ तीव्र डिलीवरी"]
                ).map((badge, idx) => (
                  <span 
                    key={idx}
                    className="text-[11px] md:text-xs font-bold font-mono tracking-wide bg-white/5 border border-white/10 text-brand-orange px-3 py-1.5 rounded-full backdrop-blur-sm shadow-sm"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              {/* Title Header */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-tight leading-[1.1] mb-6">
                {lang === "en" ? (
                  <>
                    Trusted Tarpaulin & <br />
                    <span className="bg-gradient-to-r from-brand-orange to-amber-400 bg-clip-text text-transparent">
                      Plastic Sheet Dealer
                    </span> <br className="hidden sm:inline" />
                    Since 2000
                  </>
                ) : (
                  <>
                    भरोसेमंद तिरपाल और <br />
                    <span className="bg-gradient-to-r from-brand-orange to-amber-400 bg-clip-text text-transparent">
                      प्लास्टिक शीट डीलर
                    </span> <br className="hidden sm:inline" />
                    सन 2000 से
                  </>
                )}
              </h1>

              {/* Subheading */}
              <p className="text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mb-6">
                {t.heroSubtitle}
              </p>

              {/* Dynamic Live Store Status Card */}
              <div className="max-w-md mb-8">
                <StoreStatusCard currentLanguage={lang} />
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-3.5 mb-12">
                <a
                  href={BUSINESS_INFO.phoneFormatted}
                  className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full font-extrabold text-base transition-all duration-200 shadow-lg hover:shadow-orange-600/30 active:scale-95 animate-pulse"
                >
                  <Phone className="w-5 h-5" />
                  {t.heroCtaCall}
                </a>
                <a
                  href={getWhatsAppGeneralLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-8 py-4 rounded-full font-extrabold text-base transition-all duration-200 shadow-lg hover:shadow-emerald-500/20 active:scale-95"
                >
                  <MessageSquare className="w-5 h-5" />
                  {t.heroCtaWhatsApp}
                </a>
                <button
                  onClick={() => setRetailOpen(true)}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white px-8 py-4 rounded-full font-extrabold text-base transition-all duration-200 shadow-lg hover:shadow-emerald-500/30 active:scale-95 cursor-pointer"
                >
                  <Tag className="w-5 h-5 text-white animate-pulse" />
                  <span>{t.getRetailPrice}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/10">
                <div>
                  <div className="text-3xl font-extrabold text-brand-orange font-display">26+</div>
                  <div className="text-xs text-slate-400 mt-1">{lang === "en" ? "Years of Trust (Est. 2000)" : "वर्षों का अटूट विश्वास"}</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-brand-orange font-display">50+</div>
                  <div className="text-xs text-slate-400 mt-1">{lang === "en" ? "Size Configurations" : "साइज़ कॉम्बिनेशन"}</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-brand-orange font-display">100%</div>
                  <div className="text-xs text-slate-400 mt-1">{lang === "en" ? "Waterproof & UV Tested" : "वाटरप्रूफ एवं टिकाऊ"}</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-brand-orange font-display">10k+</div>
                  <div className="text-xs text-slate-400 mt-1">{lang === "en" ? "Happy Customers" : "खुशहाल ग्राहक"}</div>
                </div>
              </div>

            </div>

            {/* Hero Premium Stack Collage */}
            <div className="lg:col-span-5 relative w-full flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md aspect-square">
                
                {/* Decorative border frame */}
                <div className="absolute inset-0 border border-white/5 rounded-3xl -rotate-3 scale-[1.02] bg-gradient-to-tr from-brand-blue-royal/20 to-brand-orange/5 pointer-events-none" />

                {/* Main Hero Bento Card */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="w-full h-full glass-panel-dark rounded-3xl p-6 border border-white/15 shadow-2xl relative overflow-hidden flex flex-col justify-between"
                >
                  {/* Background overlay image */}
                  <div 
                    className="absolute inset-0 opacity-15 mix-blend-overlay bg-cover bg-center pointer-events-none transition-all duration-700 ease-in-out"
                    style={{ backgroundImage: `url('${heroBgImage}')` }}
                  />

                  {/* Top card header */}
                  <div className="flex justify-between items-start relative z-10">
                    <div>
                      <span className="text-xs font-bold text-brand-orange font-mono uppercase tracking-widest">
                        PREMIUM QUALITY
                      </span>
                      <h3 className="text-xl sm:text-2xl font-extrabold font-display mt-1">
                        Om Shringar Tirpal
                      </h3>
                    </div>
                    <div className="bg-emerald-500/25 border border-emerald-500 text-emerald-400 text-[10px] font-bold font-mono px-2 py-1 rounded">
                      STOCK IN HAND
                    </div>
                  </div>

                  {/* Mid illustrative autoplay image carousel */}
                  <HeroCarousel currentLanguage={lang} onImageChange={setHeroBgImage} />

                  {/* Bottom details / badges list */}
                  <div className="space-y-3 relative z-10 border-t border-white/10 pt-4 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>Store Head Office:</span>
                      <strong className="text-white">Maharajganj, Siwan</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Brand Quality Assurance:</span>
                      <strong className="text-brand-orange">ISO 9001:2015 Approved</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Serving Districts:</span>
                      <strong className="text-white">Siwan, Gopalganj, Saran</strong>
                    </div>
                  </div>
                </motion.div>

                {/* Floating badge for owner */}
                <div className="absolute -bottom-4 -left-4 bg-white text-slate-900 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-100 max-w-[210px]">
                  <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider">
                      DIRECT INQUIRY
                    </div>
                    <div className="text-xs font-bold text-brand-blue-dark">
                      Mr. Vinod Varnawal
                    </div>
                    <div className="text-[11px] font-mono text-brand-blue-royal font-bold">
                      +91 9852076197
                    </div>
                  </div>
                </div>

                {/* Floating banner on right */}
                <div className="absolute -top-4 -right-4 bg-brand-orange text-white px-3.5 py-2 rounded-xl shadow-lg text-xs font-bold font-mono tracking-widest uppercase rotate-3">
                  ★ WHOLESALER
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. BRAND PARTNERS BAR (CAROUSEL) */}
      <BrandCarousel />

      {/* Meet the Supplier CTA Section */}
      <div className="flex justify-center pb-12 bg-slate-50 border-b border-slate-100 relative z-10">
        <motion.button
          whileHover={{ y: -3, scale: 1.02, boxShadow: "0 12px 30px -5px rgba(249, 115, 22, 0.35)" }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setSupplierOpen(true)}
          className="flex items-center gap-2.5 px-10 py-4 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-extrabold text-base rounded-full shadow-xl transition-all border border-orange-500/20 cursor-pointer"
        >
          <span className="text-xl">🤝</span>
          <span>{t.meetSupplier}</span>
        </motion.button>
      </div>

      {/* 5. ABOUT US SECTION */}
      <section id="about" className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* About Left Column - Graphic/Features */}
            <div className="lg:col-span-5 relative">
              <div className="aspect-square bg-gradient-to-tr from-slate-100 to-blue-50/50 rounded-3xl border border-slate-100 p-8 flex flex-col justify-between shadow-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
                
                <div>
                  <div className="w-12 h-12 bg-brand-orange/10 text-brand-orange rounded-2xl flex items-center justify-center mb-6">
                    <Award className="w-6 h-6" />
                  </div>
                  <h4 className="text-2xl font-bold font-display text-brand-blue-dark mb-4">
                    Established in the year 2000
                  </h4>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    With over two decades of experience, we originally launched as <strong className="text-slate-900">Goyal Traders</strong>. As we expanded and introduced premium brand distributorships, we transitioned into <strong className="text-slate-900">Om Shringar Tirpal Store</strong>.
                  </p>
                </div>

                <div className="mt-8 border-t border-slate-200/80 pt-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-brand-blue-royal flex items-center justify-center font-bold text-xs">
                      1
                    </div>
                    <span className="text-sm font-semibold text-slate-700">Trusted by over 10,000+ local customers</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-brand-blue-royal flex items-center justify-center font-bold text-xs">
                      2
                    </div>
                    <span className="text-sm font-semibold text-slate-700">Led by regional expert Mr. Vinod Kumar Varnawal</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-brand-blue-royal flex items-center justify-center font-bold text-xs">
                      3
                    </div>
                    <span className="text-sm font-semibold text-slate-700">One-stop shop for tarpaulin & heavy-duty covers</span>
                  </div>
                </div>

                {/* Overlay background water mark */}
                <span className="absolute right-4 bottom-2 text-9xl font-black text-slate-100/60 font-display select-none pointer-events-none">
                  26
                </span>
              </div>
            </div>

            {/* About Right Column - Text Details */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="flex items-center gap-2 bg-blue-50 text-brand-blue-royal text-xs font-bold font-mono px-3.5 py-1.5 rounded-full w-fit mb-5">
                <Users className="w-3.5 h-3.5" />
                <span>WHO WE ARE</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-brand-blue-dark tracking-tight mb-6">
                Premium Polymers & Weather Protection For Every Sector
              </h2>

              <p className="text-slate-600 text-base leading-relaxed mb-6">
                Under the visionary leadership of <strong className="text-slate-900">Mr. Vinod Kumar Varnawal</strong>, Om Shringar Tirpal Store has grown from a local merchant (previously Goyal Traders) into Siwan's most prominent supplier of Waterproof Tarpaulins, Plastic Rolls, Construction Curing Polythene, Stretch Wraps, and Resham Nets.
              </p>

              <p className="text-slate-600 text-base leading-relaxed mb-8">
                We cater extensively to multiple domains, ensuring they get industrial-grade plastics with heavy weather protection, optimized water-proofing, and anti-tear guarantees:
              </p>

              {/* Grid of Sectors Served */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "Farmers & Agriculture", desc: "Grain drying (sattering), crop protection, silos, and fencing nets.", icon: "Sprout" },
                  { name: "Builders & Contractors", desc: "Heavy-duty concrete slab underlays and road construction films.", icon: "HardHat" },
                  { name: "Transporters & Truckers", desc: "High-density customized truck and trailer vehicle tarpaulin covers.", icon: "Truck" },
                  { name: "Warehouses & Shops", desc: "Silage rolls, stretch wrap films, and large inventory protective covers.", icon: "Warehouse" }
                ].map((sec, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex gap-3.5">
                    <div className="w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-brand-blue-royal shrink-0 shadow-sm">
                      <DynamicIcon name={sec.icon} className="w-5 h-5 text-brand-orange" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-brand-blue-dark font-display">{sec.name}</h4>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{sec.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. PRODUCTS CATALOG SECTION */}
      <section id="products" className="py-20 bg-slate-50 relative border-y border-slate-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 bg-orange-50 text-brand-orange text-xs font-bold font-mono px-3.5 py-1.5 rounded-full mb-4">
              <Tag className="w-3.5 h-3.5" />
              <span>PRODUCTS CATALOG</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-brand-blue-dark tracking-tight mb-4">
              Our High-Performance Industrial & Commercial Plastics
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Explore our complete inventory. Every product has been manufactured to global standard polymer guidelines, ensuring anti-leakage, high UV proofing, and long lifespan.
            </p>
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-10 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-4 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  activeTab === tab 
                    ? "bg-brand-blue-dark text-white shadow-md"
                    : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id}>
                <ProductCard
                  product={product}
                  onEnquire={handleEnquire}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. SPECIAL PURPOSE SHEETS (FEATURES GRID) */}
      <section id="special-uses" className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-brand-blue-royal text-xs font-bold font-mono px-3.5 py-1.5 rounded-full mb-4">
              <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
              <span>VERSATILE MULTI-APPLICATION FIELDS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-brand-blue-dark tracking-tight mb-4">
              Premium Special-Purpose Polymer Sheets
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Our plastic rolls and tarpaulins are custom manufactured to suit a massive range of agricultural, residential, commercial, and structural setups.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {SPECIAL_PURPOSE_SHEETS.map((sheet, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="p-6 bg-slate-50 hover:bg-white rounded-2xl border border-slate-100 hover:border-brand-orange/30 shadow-sm hover:shadow-lg transition-all duration-300 relative group"
              >
                <div className="w-10 h-10 bg-white text-brand-orange border border-slate-100 rounded-xl flex items-center justify-center shadow-sm mb-4 group-hover:bg-brand-orange group-hover:text-white group-hover:border-transparent transition-all duration-300">
                  <DynamicIcon name={sheet.iconName} className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold font-display text-brand-blue-dark mb-1.5 group-hover:text-brand-orange transition-colors">
                  {sheet.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {sheet.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. AVAILABLE PLASTIC SIZES (SPEC TABLE) */}
      <section id="size-matrix" className="py-20 bg-slate-50 border-y border-slate-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="inline-flex items-center gap-2 bg-orange-50 text-brand-orange text-xs font-bold font-mono px-3.5 py-1.5 rounded-full w-fit mb-5">
                <Clock className="w-3.5 h-3.5" />
                <span>SPECIFICATIONS SHEET</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-brand-blue-dark tracking-tight mb-6">
                Ready-to-Dispatch Widths & Custom Size Grid
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                We supply premium plastic rolls with customized widths ranging from <strong className="text-brand-orange font-bold font-display">8 ft – 36 ft</strong>. Standard thicknesses and lengths are cataloged to suit both retail consumers and heavy infrastructure developers.
              </p>
              <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm space-y-4 mb-8">
                <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-3">
                  <span className="text-slate-500 font-medium">Standard Width Availability:</span>
                  <span className="font-bold text-brand-blue-royal font-display bg-blue-50 px-2.5 py-1 rounded">8 ft to 36 ft</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-3">
                  <span className="text-slate-500 font-medium">Tarpaulin Sizes Range:</span>
                  <span className="font-bold text-brand-blue-royal font-display bg-blue-50 px-2.5 py-1 rounded">6×6 ft up to 60×100 ft</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">Continuous Bulk Roll:</span>
                  <span className="font-bold text-brand-blue-royal font-display bg-blue-50 px-2.5 py-1 rounded">Yes, standard full rolls</span>
                </div>
              </div>
              <a
                href="#enquire"
                className="w-full sm:w-fit bg-brand-blue-dark hover:bg-brand-blue-royal text-white text-center font-bold px-6 py-3.5 rounded-full text-sm transition-all shadow"
              >
                Request Custom Size Configuration
              </a>
            </div>

            {/* Right Table Column */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
                <div className="bg-brand-blue-dark p-5 sm:p-6 text-white flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg font-display">Plastic Sizing Matrix</h3>
                    <p className="text-xs text-slate-400 mt-1">Width in Feet × Thickness Gauge Categories</p>
                  </div>
                  <span className="bg-brand-orange text-white text-[10px] font-bold font-mono px-3 py-1 rounded-full uppercase">
                    Wholesale Stocks
                  </span>
                </div>
                <div className="divide-y divide-slate-100">
                  {SIZE_MATRIX.map((row, idx) => (
                    <div key={idx} className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 hover:bg-slate-50/50 transition-colors">
                      <div className="sm:w-1/3 shrink-0">
                        <span className="font-bold text-sm text-brand-blue-dark font-mono block">
                          {row.category}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {row.sizes.map((sz, sIdx) => (
                          <span
                            key={sIdx}
                            className="bg-slate-100 text-slate-700 font-bold text-xs px-2.5 py-1 rounded-lg border border-slate-200/50 font-mono"
                          >
                            {sz}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. WHY CHOOSE US */}
      <section id="why-choose" className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-brand-blue-royal text-xs font-bold font-mono px-3.5 py-1.5 rounded-full mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-orange" />
              <span>THE POLMER HOUSE OF TRUST</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-brand-blue-dark tracking-tight mb-4">
              Why Siwan Prefers Om Shringar Tirpal Store
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Through consistent reliability, authorized brand relationships, and wholesale price cards, we have sustained over 26 years of market authority.
            </p>
          </div>

          {/* Highlight Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_CHOOSE_US.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-6 md:p-8 bg-slate-50 hover:bg-white rounded-3xl border border-slate-100 hover:border-brand-orange/20 shadow-sm hover:shadow-xl transition-all duration-300 relative group overflow-hidden"
              >
                {/* Decorative background glow */}
                <div className="absolute -right-6 -bottom-6 w-16 h-16 bg-brand-orange/5 rounded-full blur-xl group-hover:bg-brand-orange/15 transition-all duration-300" />

                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-orange border border-slate-100 group-hover:bg-brand-orange group-hover:text-white group-hover:border-transparent transition-all duration-300 mb-6 shadow-sm">
                  <DynamicIcon name={item.iconName} className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-display text-brand-blue-dark mb-3 group-hover:text-brand-orange transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed relative z-10">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. INTERACTIVE FAQ & INQUIRY FORM */}
      <section id="enquire" ref={inquiryRef} className="py-20 bg-slate-50 border-t border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* FAQs Left Column */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-brand-blue-royal text-xs font-bold font-mono px-3.5 py-1.5 rounded-full w-fit mb-5">
                <Users className="w-3.5 h-3.5 text-brand-orange" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-brand-blue-dark tracking-tight mb-6">
                Have Any Doubts? Let Us Help You
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
                Cannot find the sizing or gauge details you are searching for? Browse through our popular customer inquiries or directly contact our helpdesk.
              </p>

              {/* FAQ Accordion */}
              <div className="space-y-3.5">
                {FAQS.map((faq, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
                      className="w-full flex justify-between items-center p-4 sm:p-5 text-left font-bold text-sm sm:text-base font-display text-brand-blue-dark hover:text-brand-orange transition-colors cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown 
                        className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ml-3 ${
                          expandedFAQ === idx ? "rotate-185 text-brand-orange" : ""
                        }`} 
                      />
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {expandedFAQ === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="border-t border-slate-50 bg-slate-50/50"
                        >
                          <div className="p-4 sm:p-5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Fast phone call card */}
              <div className="mt-8 p-6 bg-orange-600 text-white rounded-3xl shadow-lg relative overflow-hidden flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />
                <div className="text-center sm:text-left">
                  <h4 className="font-bold text-lg font-display">Need Instant Answers?</h4>
                  <p className="text-xs text-white/85 mt-1">Directly speak with our proprietor Vinod Kumar.</p>
                </div>
                <a
                  href={BUSINESS_INFO.phoneFormatted}
                  className="bg-brand-blue-dark hover:bg-brand-blue-royal text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-full transition shadow shrink-0"
                >
                  Call Now: {BUSINESS_INFO.phone}
                </a>
              </div>
            </div>

            {/* Inquiry Form Right Column */}
            <div className="lg:col-span-7 w-full">
              <InquiryForm
                prefilledProduct={prefilledProduct}
                onClearPrefill={clearPrefill}
              />
            </div>

          </div>
        </div>
      </section>

      {/* 11. CONTACT & MAPS SECTION */}
      <section id="contact" className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Location Details Left */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-brand-blue-royal text-xs font-bold font-mono px-3.5 py-1.5 rounded-full w-fit mb-5">
                <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                <span>VISIT OUR SHOWROOM</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-brand-blue-dark tracking-tight mb-6">
                Come Visit Our Physical Store In Maharajganj, Siwan
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
                Our main dealer showroom is packed with ready stock. We welcome farmers, builders, and wholesalers to walk in for direct physical quality check, instant sizing customization, and secure payment handling.
              </p>

              {/* Contact Info blocks */}
              <div className="space-y-4">
                <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-brand-orange shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-brand-blue-dark font-display">Store Address</h4>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                      {BUSINESS_INFO.address}
                    </p>
                    <p className="text-xs text-brand-blue-royal font-bold mt-1">
                      Landmark: {BUSINESS_INFO.landmark}
                    </p>
                  </div>
                </div>

                {/* Live Store Status & Timing Card */}
                <StoreStatusCard currentLanguage={lang} variant="light" className="shadow-sm border-slate-100" />

                <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-brand-orange shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-brand-blue-dark font-display">Proprietor Contact</h4>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Owner: Mr. Vinod Kumar Varnawal
                    </p>
                    <a 
                      href={BUSINESS_INFO.phoneFormatted}
                      className="text-sm font-extrabold text-brand-blue-royal font-mono hover:text-brand-orange transition-colors block mt-0.5"
                    >
                      +91 9852076197
                    </a>
                  </div>
                </div>
              </div>

              {/* Get Directions Button */}
              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-fit flex items-center justify-center gap-2 mt-8 bg-orange-600 hover:bg-orange-700 text-white py-3.5 px-6 rounded-full font-bold text-sm shadow-md transition-all active:scale-[0.98]"
              >
                <span>Open Google Maps Directions</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Embedded Google Maps Area */}
            <div className="lg:col-span-7">
              <div className="bg-slate-100 rounded-3xl overflow-hidden shadow-lg border border-slate-200 aspect-video lg:aspect-square relative group">
                
                {/* Embed Map Using Free OpenStreetMaps or Google Maps Static Mockup which is fully responsive */}
                {/* We can use an iframe to embed a real live Google Maps iframe or OpenStreetMap! Let's embed a real Google Map for মহারাজগঞ্জ (Maharajganj) Siwan, Bihar */}
                <iframe
                  title="Om Shringar Tirpal Store Google Maps Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14331.066068212629!2d84.47547081734914!2d26.113038665977926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3992faf453beab69%3A0xe21f5fa6498ee3e8!2sMaharajganj%2C%20Bihar%20841238!5e0!3m2!1sen!2sin!4v1719999999999!5m2!1sen!2sin"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                
                {/* Overlap Map Floating Badge */}
                <div className="absolute top-4 left-4 bg-brand-blue-dark text-white p-3.5 rounded-2xl shadow-xl flex items-center gap-2.5 max-w-[280px] backdrop-blur-md border border-white/10">
                  <div className="w-8 h-8 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs font-display">Om Shringar Tirpal Store</h4>
                    <p className="text-[10px] text-slate-300 mt-0.5 leading-tight">Meetha Hatti, Kazi Bazar Maharajganj, Siwan, Bihar 841238</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 12. FOOTER */}
      <footer className="bg-brand-blue-dark text-slate-400 py-16 border-t border-white/5 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-8 mb-12">
            
            {/* Column 1: Store Intro */}
            <div className="lg:col-span-4 flex flex-col">
              <a href="#" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-brand-orange flex items-center justify-center text-white font-bold text-sm">
                  OS
                </div>
                <span className="font-bold text-lg font-display text-white tracking-tight">
                  Om Shringar Tirpal <span className="text-brand-orange">Store</span>
                </span>
              </a>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                Established in 2000 as Goyal Traders, we are Siwan's premier wholesale and retail distributor for high-durability tarpaulins, construction plastic rolls, stretch films, and agricultural resham nets.
              </p>
              <div className="text-[11px] font-mono uppercase bg-white/5 border border-white/10 text-brand-orange px-3 py-1.5 rounded-lg w-fit">
                Owner: Vinod Kumar Varnawal
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="lg:col-span-2 flex flex-col">
              <h4 className="text-white font-bold font-display text-sm tracking-wider uppercase mb-4">
                Quick Navigation
              </h4>
              <nav className="flex flex-col gap-2.5 text-xs sm:text-sm">
                <a href="#about" className="hover:text-white transition-colors">About Proprietor</a>
                <a href="#products" className="hover:text-white transition-colors">Products Catalog</a>
                <a href="#special-uses" className="hover:text-white transition-colors">Special Applications</a>
                <a href="#size-matrix" className="hover:text-white transition-colors">Size Spec Tables</a>
                <a href="#why-choose" className="hover:text-white transition-colors">Why Choose Us</a>
              </nav>
            </div>

            {/* Column 3: Products Quick Access */}
            <div className="lg:col-span-3 flex flex-col">
              <h4 className="text-white font-bold font-display text-sm tracking-wider uppercase mb-4">
                Our Top Polymer Goods
              </h4>
              <div className="flex flex-col gap-2.5 text-xs sm:text-sm">
                {PRODUCTS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleEnquire(p.name)}
                    className="hover:text-white text-left transition-colors cursor-pointer"
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Column 4: Location Summary */}
            <div className="lg:col-span-3 flex flex-col">
              <h4 className="text-white font-bold font-display text-sm tracking-wider uppercase mb-4">
                Store Location Details
              </h4>
              <p className="text-xs leading-relaxed text-slate-400 mb-4">
                Om Shringar Tirpal Store<br />
                Meetha Hatti, Kazi Bazar<br />
                Maharajganj, Siwan<br />
                Bihar – 841238<br />
                Landmark: Near Kazi Bazar Road
              </p>
              <p className="text-xs text-brand-orange font-mono">
                📞 {BUSINESS_INFO.phone}
              </p>
              <p className="text-xs text-slate-500 font-mono mt-1">
                📧 abarnwal080@gmail.com
              </p>
            </div>

          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
            <div className="flex flex-col gap-1">
              <p>
                © {new Date().getFullYear()} Om Shringar Tirpal Store (Formerly Goyal Traders). All rights reserved.
              </p>
              <p className="text-slate-500 text-[11px]">
                Developed by <span className="text-orange-500 font-semibold">Priyaranjan Raj</span>
              </p>
            </div>
            <div className="flex gap-4">
              <a href={BUSINESS_INFO.googleMapsUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                Google Maps Find Us
              </a>
              <span className="text-slate-600">|</span>
              <a href={BUSINESS_INFO.phoneFormatted} className="hover:text-white transition-colors">
                Proprietor Direct-Dial
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* 13. FLOATING AND STICKY BOTTOM ACTION CTA WIDGETS */}
      
      {/* Floating Buttons: Desktop Only */}
      <div className="hidden sm:flex flex-col gap-3 fixed right-6 bottom-6 z-40">
        {/* Floating Call */}
        <a
          href={BUSINESS_INFO.phoneFormatted}
          aria-label="Call Proprietor Mr. Vinod Kumar"
          className="w-14 h-14 bg-[#001f3f] text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-brand-blue-royal transition-all duration-300 hover:scale-110 border border-white/10"
        >
          <Phone className="w-6 h-6 text-brand-orange" />
        </a>
        
        {/* Floating WhatsApp */}
        <a
          href={getWhatsAppGeneralLink()}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp Inquiry Om Shringar Tirpal Store"
          className="w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-[#20ba5a] transition-all duration-300 hover:scale-110"
        >
          <MessageSquare className="w-6 h-6" />
        </a>
      </div>

      {/* Sticky Bottom Bar: Mobile Only */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 h-16 bg-white border-t border-slate-200 shadow-2xl grid grid-cols-2 z-40 divide-x divide-slate-100">
        <a
          href={BUSINESS_INFO.phoneFormatted}
          className="flex items-center justify-center gap-2 text-[#001f3f] font-extrabold text-sm active:bg-slate-50 transition-colors"
        >
          <Phone className="w-4 h-4 text-brand-orange" />
          <span>Call Store</span>
        </a>
        <a
          href={getWhatsAppGeneralLink()}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 text-[#25D366] font-extrabold text-sm active:bg-slate-50 transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          <span>WhatsApp Chat</span>
        </a>
      </div>

      {/* AI Assistant Chatbot (Floating Left Aligned) */}
      <AIChatbot currentLanguage={lang} onLanguageChange={setLang} />

      {/* Supplier Popup Modal */}
      <SupplierPopup isOpen={supplierOpen} onClose={() => setSupplierOpen(false)} />

      {/* Retail Price Popup Modal */}
      <RetailPriceModal isOpen={retailOpen} onClose={() => setRetailOpen(false)} currentLanguage={lang} onOpenInquiry={() => handleEnquire("")} />

      {/* Auto Load Inquiry Popup */}
      <AutoInquiryModal currentLanguage={lang} />

    </div>
  );
}

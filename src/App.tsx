import React, { useState, useRef, useEffect } from "react";
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
  Bell,
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
  Users,
  ArrowRight,
  ArrowUp,
  Check,
  Star
} from "lucide-react";

import {
  BUSINESS_INFO,
  PRODUCTS,
  SPECIAL_PURPOSE_SHEETS,
  SIZE_MATRIX,
  WHY_CHOOSE_US,
  FAQS,
  Product,
  getProductSlug,
  findProductBySlug
} from "./data";

import ProductCard from "./components/ProductCard";
import GoogleReviewPopup from "./components/GoogleReviewPopup";
import BrandCarousel from "./components/BrandCarousel";
import InquiryForm from "./components/InquiryForm";
import InquiryModal from "./components/InquiryModal";
import SingleProductSection from "./components/SingleProductSection";
import AIChatbot from "./components/AIChatbot";
import SupplierPopup from "./components/SupplierPopup";
import HeroCarousel from "./components/HeroCarousel";
import StoreStatusCard from "./components/StoreStatusCard";
import CustomerSuccessCarousel from "./components/CustomerSuccessCarousel";
import { TRANSLATIONS } from "./translations";

// Safe dynamic icon loader to keep code modular and readable
function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = (Icons as any)[name] || Icons.HelpCircle;
  return <IconComponent className={className} />;
}

export default function App() {
  const lang = "en";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prefilledProduct, setPrefilledProduct] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [supplierOpen, setSupplierOpen] = useState(false);
  const [heroBgImage, setHeroBgImage] = useState("https://plain-apac-prod-public.komododecks.com/202607/03/eckT9KEMGbavrebTJwPJ/image.png");
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [sizeChartTab, setSizeChartTab] = useState<"plastic" | "tarpaulin">("plastic");

  const [navbarVisible, setNavbarVisible] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const lastScrollY = useRef(0);

  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  const [currentProductSlug, setCurrentProductSlug] = useState<string | null>(null);

  const slugify = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start
      .replace(/-+$/, '');            // Trim - from end
  };

  // Sync state with URL pathname on load & popstate (back/forward navigation)
  useEffect(() => {
    const getSlugFromPath = () => {
      let path = window.location.pathname;
      // Remove trailing slash if present, unless it is just "/"
      if (path.length > 1 && path.endsWith("/")) {
        path = path.slice(0, -1);
      }
      if (path.startsWith("/products/")) {
        return path.substring("/products/".length) || null;
      }
      if (path && path !== "/") {
        const slug = path.substring(1);
        if (slug) {
          const matched = findProductBySlug(slug);
          if (matched) {
            const canonicalSlug = getProductSlug(matched.id);
            window.history.replaceState({}, "", `/products/${canonicalSlug}`);
            return canonicalSlug;
          }
        }
        return slug || null;
      }
      return null;
    };

    setCurrentProductSlug(getSlugFromPath());

    const handlePopState = () => {
      setCurrentProductSlug(getSlugFromPath());
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Hash state URL observer
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && hash !== "#notifications") {
        setActiveSection(hash.substring(1));
        if (hash === "#products") {
          setIsCatalogOpen(true);
        }
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Scroll handler for auto-hide navbar & scroll-to-top button
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Auto-hide navbar
          if (currentScrollY <= 80) {
            setNavbarVisible(true);
          } else if (currentScrollY > lastScrollY.current) {
            setNavbarVisible(false); // scrolling down
          } else {
            setNavbarVisible(true); // scrolling up
          }
          
          // Scroll-to-top button visibility
          if (currentScrollY > 500) {
            setShowScrollTop(true);
          } else {
            setShowScrollTop(false);
          }
          
          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for Active Navigation Highlight
  useEffect(() => {
    const sections = ["about", "products", "special-uses", "size-matrix", "why-choose", "enquire", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px",
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  const inquiryRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[lang];

  const handleEnquire = (productName: string) => {
    setPrefilledProduct(productName);
    setInquiryOpen(true);
  };

   const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    if (targetId === "products") {
      setIsCatalogOpen(true);
    }
    
    // Smooth scroll with offset for sticky header
    setTimeout(() => {
      window.location.hash = `#${targetId}`;
      const element = document.getElementById(targetId);
      if (element) {
        const headerOffset = 100; // adjust offset for sticky header
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 150); // slight delay to let menu start collapsing or let state settle
  };

  const clearPrefill = () => {
    setPrefilledProduct("");
  };

  const getWhatsAppGeneralLink = () => {
    const text = `Hi, I am visiting your website and have an inquiry about bulk orders at Om Shringar Tirpal Store. Please share your catalog.`;
    return `${BUSINESS_INFO.whatsappLink}?text=${encodeURIComponent(text)}`;
  };

  // Premium category tabs with emojis and dynamic count
  const categoryTabs = [
    { id: "All", label: "All", emoji: "🏭" },
    { id: "Industrial Packaging", label: "Industrial Packaging", emoji: "📦" },
    { id: "Construction & Curing", label: "Construction & Curing", emoji: "🏗" },
    { id: "Clear Covering", label: "Clear Covering", emoji: "🪟" },
    { id: "All-Weather Protection", label: "All-Weather Protection", emoji: "🌧" },
    { id: "Security & Fencing", label: "Security & Fencing", emoji: "🛡" },
    { id: "Household & Outdoor", label: "Household & Outdoor", emoji: "🏡" },
  ];

  const filteredProducts = activeTab === "All" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeTab);

  const matchedProduct = findProductBySlug(currentProductSlug || "");

  return (
    <div className="min-h-screen text-slate-800 bg-slate-50/50 flex flex-col relative antialiased selection:bg-brand-orange selection:text-white">
      
      {/* 2. GLASSMORPHIC STICKY NAVIGATION BAR */}
      <header className={`w-full bg-brand-blue-dark border-b border-white/10 sticky z-40 shadow-md transition-all duration-300 ease-in-out ${
        navbarVisible ? "top-0 translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Branding */}
          <a href="#" className="flex flex-col">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center text-white shadow-md p-1.5 shrink-0">
                <svg viewBox="0 0 24 24" className="w-full h-full text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" fill="rgba(255,255,255,0.15)" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-bold text-lg sm:text-xl font-display text-white tracking-tight block leading-tight">
                  OM SHRINGAR <span className="text-orange-400">TIRPAL STORE</span>
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 mt-0.5 sm:mt-0">
                  <span className="text-[9px] sm:text-[10px] font-bold font-mono text-blue-200 uppercase tracking-widest block">
                    Est. 2000 | Formerly Goyal Traders
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-extrabold font-mono text-white bg-amber-500 rounded-md animate-pulse border border-amber-400/30 uppercase tracking-wider w-fit">
                    🌧️ Monsoon Sale is Live!
                  </span>
                </div>
              </div>
            </div>
          </a>
 
          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 font-semibold text-sm text-blue-100">
            {[
              { href: "#about", label: t.navAbout, id: "about" },
              { href: "#products", label: t.navProducts, id: "products" },
              { href: "#special-uses", label: t.navApplications, id: "special-uses" },
              { href: "#size-matrix", label: t.navSizeChart, id: "size-matrix" },
              { href: "#why-choose", label: t.navWhyUs, id: "why-choose" },
              { href: "#enquire", label: t.navInquiry, id: "enquire" },
              { href: "#contact", label: t.navFindStore, id: "contact" }
            ].map((link) => (
              <a 
                key={link.href}
                href={link.href} 
                onClick={(e) => {
                  e.preventDefault();
                  if (link.id === "products") {
                    setIsCatalogOpen(true);
                  }
                  window.location.hash = link.href;
                  setTimeout(() => {
                    const element = document.getElementById(link.id);
                    if (element) {
                      const headerOffset = 100;
                      const elementPosition = element.getBoundingClientRect().top;
                      const offsetPosition = elementPosition + window.scrollY - headerOffset;
                      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                    }
                  }, 150);
                }}
                className={`hover:text-orange-400 transition-colors relative py-2 ${
                  activeSection === link.id ? "text-orange-400 font-extrabold" : "text-blue-100"
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.span 
                    layoutId="activeNavBorder" 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-400 rounded-full" 
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>
 
          {/* Nav Right CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => handleEnquire("")}
              className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg flex items-center cursor-pointer"
            >
              {lang === "en" ? "Get Bulk Quote" : "थोक भाव पाएं"}
            </button>
          </div>
 
          {/* Mobile Hamburger Toggle */}
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
                  onClick={(e) => handleMobileNavClick(e, "about")}
                  className="text-base font-semibold text-slate-700 hover:text-orange-600 py-1"
                >
                  {t.navAbout}
                </a>
                <a 
                  href="#products" 
                  onClick={(e) => handleMobileNavClick(e, "products")}
                  className="text-base font-semibold text-slate-700 hover:text-orange-600 py-1"
                >
                  {t.navProducts}
                </a>
                <a 
                  href="#special-uses" 
                  onClick={(e) => handleMobileNavClick(e, "special-uses")}
                  className="text-base font-semibold text-slate-700 hover:text-orange-600 py-1"
                >
                  {t.navApplications}
                </a>
                <a 
                  href="#size-matrix" 
                  onClick={(e) => handleMobileNavClick(e, "size-matrix")}
                  className="text-base font-semibold text-slate-700 hover:text-orange-600 py-1"
                >
                  {t.navSizeChart}
                </a>
                <a 
                  href="#why-choose" 
                  onClick={(e) => handleMobileNavClick(e, "why-choose")}
                  className="text-base font-semibold text-slate-700 hover:text-orange-600 py-1"
                >
                  {t.navWhyUs}
                </a>
                <a 
                  href="#enquire" 
                  onClick={(e) => handleMobileNavClick(e, "enquire")}
                  className="text-base font-semibold text-slate-700 hover:text-orange-600 py-1"
                >
                  {t.navInquiry}
                </a>
                <a 
                  href="#contact" 
                  onClick={(e) => handleMobileNavClick(e, "contact")}
                  className="text-base font-semibold text-slate-700 hover:text-orange-600 py-1"
                >
                  {t.navFindStore}
                </a>

                <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleEnquire("");
                    }}
                    className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 text-white font-extrabold text-sm shadow-md cursor-pointer hover:from-orange-700 hover:to-amber-600 transition-colors uppercase tracking-wider active:scale-95"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Get Free Quote Now</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MONSOON SALE CARD ON TOP */}
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border-b border-amber-500/20 py-3.5 px-4 relative z-30 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-black font-mono text-white bg-gradient-to-r from-orange-600 to-amber-500 rounded-full animate-pulse border border-orange-400/30 uppercase tracking-wider w-fit mx-auto sm:mx-0 shadow-sm shrink-0">
              🌧️ MONSOON SALE LIVE NOW!
            </span>
            <div className="flex flex-col">
              <h3 className="text-slate-900 font-extrabold text-sm sm:text-base leading-snug">
                Heavy-Duty Plastic Sheets & Waterproof Tarpaulins at Wholesale Prices!
              </h3>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                Special 15% discount for bulk inquiries and direct factory dispatch during this rainy season.
              </p>
            </div>
          </div>
          <a
            href="#products"
            className="text-xs font-extrabold text-white bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 shadow-md hover:shadow-orange-500/20 px-5 py-2.5 rounded-xl border border-orange-500/20 transition-all hover:-translate-y-0.5 active:translate-y-0 uppercase tracking-wider shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <span>Explore Offers</span>
            <span>➔</span>
          </a>
        </div>
      </div>

      {matchedProduct ? (
        <SingleProductSection
          product={matchedProduct}
          onBack={() => {
            window.history.pushState({}, "", "/");
            setCurrentProductSlug(null);
            window.scrollTo({ top: 0 });
          }}
          currentLanguage={lang}
          onEnquire={handleEnquire}
        />
      ) : (
        <>
        {/* 3. HERO SECTION */}
          <section className="relative bg-gradient-to-b from-white via-slate-50 to-white text-slate-900 border-b border-slate-200/80 overflow-hidden py-16 lg:py-28">
        
        {/* Soft elegant warm ambient glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(circle,rgba(234,88,12,0.04)_0%,transparent_70%)] blur-3xl" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.04)_0%,transparent_70%)] blur-3xl" />
        </div>

        {/* Backdrop Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f080_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f080_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero Text Column with Premium Glassmorphism Backdrop */}
            <div className="lg:col-span-7 flex flex-col text-left p-6 sm:p-10 rounded-3xl bg-white/90 border border-slate-200/60 backdrop-blur-md shadow-xl relative">
              
              {/* Best Rate Dealer Highlight Badge (Highly Optimized for Search Ranking & Google Indexing) */}
              <div className="mb-6 flex flex-col gap-1.5 p-4 rounded-2xl bg-orange-500/5 border border-orange-500/20 max-w-xl">
                <div className="flex items-center gap-2 text-orange-600 text-xs sm:text-sm font-black uppercase tracking-wider">
                  <span className="text-base animate-bounce">🏆</span>
                  <span>BIHAR'S #1 TRUSTED PLASTIC DEALER</span>
                </div>
                <h2 className="text-slate-800 text-sm sm:text-base md:text-lg font-extrabold leading-snug">
                  {lang === "en" 
                    ? "Best Rate Provider Dealer of Bihar for All Plastic Sheets & Waterproof Tarpaulins" 
                    : "बिहार में सभी प्लास्टिक शीट्स और वाटरप्रूफ तिरपाल के सर्वश्रेष्ठ एवं सबसे कम रेट वाले डीलर"}
                </h2>
                <p className="text-[10px] sm:text-xs text-slate-600 font-mono">
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
                    className="text-[11px] md:text-xs font-bold font-mono tracking-wide bg-orange-500/5 border border-orange-500/10 text-orange-600 px-3 py-1.5 rounded-full shadow-sm"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              {/* Title Header */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-tight leading-[1.1] mb-6 text-slate-900">
                {lang === "en" ? (
                  <>
                    Trusted Tarpaulin & <br />
                    <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent font-black">
                      Plastic Sheet Dealer
                    </span> <br className="hidden sm:inline" />
                    Since 2000
                  </>
                ) : (
                  <>
                    भरोसेमंद तिरपाल और <br />
                    <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent font-black">
                      प्लास्टिक शीट डीलर
                    </span> <br className="hidden sm:inline" />
                    सन 2000 से
                  </>
                )}
              </h1>

              {/* Subheading */}
              <p className="text-slate-600 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mb-6 font-medium">
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
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-slate-200">
                <div>
                  <div className="text-3xl font-extrabold text-orange-600 font-display">26+</div>
                  <div className="text-xs text-slate-500 mt-1 font-semibold">{lang === "en" ? "Years of Trust (Est. 2000)" : "वर्षों का अटूट विश्वास"}</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-orange-600 font-display">50+</div>
                  <div className="text-xs text-slate-500 mt-1 font-semibold">{lang === "en" ? "Size Configurations" : "साइज़ कॉम्बिनेशन"}</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-orange-600 font-display">100%</div>
                  <div className="text-xs text-slate-500 mt-1 font-semibold">{lang === "en" ? "Waterproof & UV Tested" : "वाटरप्रूफ एवं टिकाऊ"}</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-orange-600 font-display">10k+</div>
                  <div className="text-xs text-slate-500 mt-1 font-semibold">{lang === "en" ? "Happy Customers" : "खुशहाल ग्राहक"}</div>
                </div>
              </div>

            </div>

            {/* Hero Premium Stack Collage */}
            <div className="lg:col-span-5 relative w-full flex flex-col items-center gap-6">
              <div className="relative w-full max-w-sm sm:max-w-md aspect-[3/4]">
                
                {/* Decorative border frame */}
                <div className="absolute inset-0 border border-slate-200 rounded-3xl -rotate-3 scale-[1.02] bg-gradient-to-tr from-orange-500/5 to-amber-500/5 pointer-events-none" />

                {/* Main Hero Bento Card */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="w-full h-full bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xl relative overflow-hidden flex flex-col justify-between"
                >
                  {/* Background overlay image */}
                  <div 
                    className="absolute inset-0 opacity-10 bg-cover bg-center pointer-events-none transition-all duration-700 ease-in-out"
                    style={{ backgroundImage: `url('${heroBgImage}')` }}
                  />

                  {/* Top card header */}
                  <div className="flex justify-between items-start relative z-10">
                    <div>
                      <span className="text-xs font-bold text-brand-orange font-mono uppercase tracking-widest">
                        PREMIUM QUALITY
                      </span>
                      <h3 className="text-xl sm:text-2xl font-extrabold font-display mt-1 text-slate-900">
                        Om Shringar Tirpal
                      </h3>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-500/30 text-emerald-700 text-[10px] font-bold font-mono px-2 py-1 rounded">
                      STOCK IN HAND
                    </div>
                  </div>

                  {/* Mid illustrative autoplay image carousel */}
                  <HeroCarousel currentLanguage={lang} onImageChange={setHeroBgImage} />

                  {/* Bottom details / badges list */}
                  <div className="space-y-3 relative z-10 border-t border-slate-100 pt-4 text-xs">
                    <div className="flex justify-between text-slate-500">
                      <span>Store Head Office:</span>
                      <strong className="text-slate-900">Maharajganj, Siwan</strong>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Brand Quality Assurance:</span>
                      <strong className="text-orange-600">ISO 9001:2015 Approved</strong>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Serving Districts:</span>
                      <strong className="text-slate-900">Siwan, Gopalganj, Saran</strong>
                    </div>
                  </div>
                </motion.div>

                {/* Floating banner on right */}
                <div className="absolute -top-4 -right-4 bg-brand-orange text-white px-3.5 py-2 rounded-xl shadow-lg text-xs font-bold font-mono tracking-widest uppercase rotate-3">
                  ★ WHOLESALER
                </div>

              </div>

              {/* Direct Inquiry Owner details positioned perfectly underneath the frame */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="w-full max-w-sm sm:max-w-md bg-white text-slate-900 p-4 rounded-2xl shadow-lg flex items-center justify-between border border-slate-100 hover:shadow-xl transition-shadow relative z-10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[9px] font-extrabold font-mono text-slate-400 uppercase tracking-widest">
                      DIRECT INQUIRY
                    </div>
                    <div className="text-sm font-extrabold text-slate-900 font-display">
                      Mr. Vinod Varnawal
                    </div>
                  </div>
                </div>
                
                <a
                  href="tel:+919852076197"
                  className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-black px-4 py-2.5 rounded-full transition-colors font-mono tracking-wider flex items-center gap-1.5 shadow-md shadow-orange-600/10 cursor-pointer"
                >
                  <span>📞 Call Store</span>
                  <span className="font-mono font-bold">+91 9852076197</span>
                </a>
              </motion.div>
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

      {/* 6. PRODUCTS CATALOG SECTION */}
      <section id="products" className="py-20 bg-slate-50 relative border-y border-slate-100/50 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-brand-blue-dark tracking-tight">
              {isCatalogOpen ? "Our Premium Polymer & Tarpaulin Catalog" : "Shop by Poly Goods Category"}
            </h2>
            <p className="text-slate-600 mt-2 font-medium text-sm sm:text-base">
              {isCatalogOpen 
                ? "Browse our complete range of certified high-durability plastic sheets and agricultural nets." 
                : "Select a category below or expand the catalog to view all available wholesale and retail products."}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!isCatalogOpen ? (
              /* Amazon-Style Closed Catalog Showcase Banner */
              <motion.div
                key="closed-catalog"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden max-w-4xl mx-auto"
              >
                {/* Visual grid of categories for high engagement */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-6 sm:p-8 bg-gradient-to-b from-slate-50/50 to-white border-b border-slate-100">
                  {categoryTabs.slice(1).map((tab) => {
                    const count = PRODUCTS.filter(p => p.category === tab.id).length;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id);
                          setIsCatalogOpen(true);
                        }}
                        className="flex flex-col items-center justify-center p-4 bg-slate-50 hover:bg-slate-100/80 rounded-2xl border border-slate-200/60 text-center transition-all duration-300 hover:scale-[1.03] hover:shadow-md cursor-pointer group"
                      >
                        <span className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">{tab.emoji}</span>
                        <span className="text-xs font-bold text-slate-800 line-clamp-1">{tab.label}</span>
                        <span className="text-[10px] text-slate-500 font-bold font-mono mt-1 bg-slate-200/50 px-2 py-0.5 rounded-full">
                          {count} Products
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="p-6 sm:p-8 text-center bg-white flex flex-col items-center justify-center">
                  <p className="text-slate-600 text-sm font-semibold mb-5">
                    🛍️ Heavy-duty polymer products with standard GSM certificates and verified lifespans.
                  </p>
                  
                  {/* Big Clickable Amazon-Style Button */}
                  <motion.button
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsCatalogOpen(true)}
                    className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold text-base rounded-2xl shadow-xl shadow-blue-600/10 transition-all cursor-pointer group relative overflow-hidden"
                  >
                    {/* Pulsing glow under button */}
                    <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-xl">📦</span>
                    <span>Browse Full Store Catalog / सारे प्रोडक्ट्स यहाँ देखें</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300 font-mono">➔</span>
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              /* Expanded Catalog with Tabs and Filters */
              <motion.div
                key="expanded-catalog"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                {/* Filtering Tabs */}
                <div className="w-full mb-10 overflow-hidden">
                  <div className="flex overflow-x-auto pb-3 gap-2.5 no-scrollbar scroll-smooth snap-x md:flex-wrap md:justify-center relative">
                    {categoryTabs.map((tab) => {
                      const count = tab.id === "All" ? PRODUCTS.length : PRODUCTS.filter(p => p.category === tab.id).length;
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`relative flex items-center gap-2.5 py-2.5 px-5 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-300 ease-out snap-start cursor-pointer hover:-translate-y-[2px] active:scale-95 ${
                            isActive 
                              ? "text-white shadow-xl shadow-blue-900/40 ring-4 ring-brand-blue-dark/25 border border-brand-blue-dark bg-brand-blue-dark z-10"
                              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-800 hover:border-slate-300 hover:shadow-md"
                          }`}
                        >
                          <span className="text-sm shrink-0">{tab.emoji}</span>
                          <span>{tab.label}</span>
                          <span className={`inline-flex items-center justify-center text-[10px] px-1.5 py-0.5 rounded-full font-bold font-mono transition-colors ${
                            isActive 
                              ? "bg-white/20 text-blue-100" 
                              : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                          }`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Product Cards Grid with smooth 250-300ms transition */}
                <div className="overflow-hidden min-h-[400px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                      {filteredProducts.map((product) => (
                        <div key={product.id} className="h-full">
                          <ProductCard
                            product={product}
                            onEnquire={handleEnquire}
                            currentLanguage={lang}
                            onViewDetails={(prod) => {
                              const slug = getProductSlug(prod.id);
                              window.history.pushState({}, "", `/products/${slug}`);
                              setCurrentProductSlug(slug);
                              window.scrollTo({ top: 0 });
                            }}
                          />
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Collapse Button at bottom of expanded catalog */}
                <div className="flex justify-center mt-12 pt-6 border-t border-slate-200/50">
                  <motion.button
                    whileHover={{ y: 2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setIsCatalogOpen(false);
                      // Scroll back to catalog header
                      const element = document.getElementById("products");
                      if (element) {
                        const headerOffset = 100;
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.scrollY - headerOffset;
                        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                      }
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-sm rounded-xl shadow-sm transition-all cursor-pointer"
                  >
                    <span>▲</span>
                    <span>Collapse Catalog / कैटलॉग बंद करें</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* GOOGLE REVIEWS SECTION */}
      <section id="google-reviews" className="py-20 bg-gradient-to-b from-slate-50 to-white relative scroll-mt-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-orange-50 text-brand-orange text-xs font-bold font-mono px-3.5 py-1.5 rounded-full mb-4 border border-orange-100/50">
              <Star className="w-3.5 h-3.5 fill-brand-orange text-brand-orange" />
              <span>GOOGLE CUSTOMER REVIEWS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-brand-blue-dark tracking-tight mb-4">
              What Our Customers Say On Google
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Explore authentic, live feedback and verified 5-star ratings left on Google by builders, farmers, and store visitors in Bihar.
            </p>
          </div>

          {/* Elfsight Widget Container */}
          <div className="w-full bg-white rounded-3xl border border-slate-100 p-4 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 min-h-[300px] flex items-center justify-center">
            <div className="w-full">
              <div className="elfsight-app-a79ce307-0e45-4c96-a6f7-5ae162ca490f" data-elfsight-app-lazy></div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. ABOUT US SECTION */}
      <section id="about" className="py-20 bg-white relative overflow-hidden scroll-mt-24">
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



      {/* 7. SPECIAL PURPOSE SHEETS (FEATURES GRID) */}
      <section id="special-uses" className="py-20 bg-white relative scroll-mt-24">
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
      <section id="size-matrix" className="py-20 bg-slate-50 border-y border-slate-100/50 scroll-mt-24">
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
                <div className="bg-brand-blue-dark p-5 sm:p-6 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="font-bold text-lg font-display">
                      {sizeChartTab === "plastic" ? "Plastic Sizing Matrix" : "Tarpaulin Size Chart"}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      {sizeChartTab === "plastic" ? "Width in Feet × Thickness Gauge Categories" : "Standard Feet Dimensions (Standard Gauges)"}
                    </p>
                  </div>
                  
                  {/* Tab Selector Buttons */}
                  <div className="flex bg-white/10 p-1 rounded-xl self-stretch sm:self-auto shrink-0">
                    <button
                      onClick={() => setSizeChartTab("plastic")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        sizeChartTab === "plastic" ? "bg-orange-500 text-white" : "text-slate-300 hover:text-white"
                      }`}
                    >
                      Plastic Roll
                    </button>
                    <button
                      onClick={() => setSizeChartTab("tarpaulin")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        sizeChartTab === "tarpaulin" ? "bg-orange-500 text-white" : "text-slate-300 hover:text-white"
                      }`}
                    >
                      Tarpaulin Chart
                    </button>
                  </div>
                </div>

                {sizeChartTab === "plastic" ? (
                  <div className="divide-y divide-slate-100 transition-all duration-300">
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
                ) : (
                  /* Tarpaulin Size Chart in a Cute Frame */
                  <div className="p-5 sm:p-6 bg-gradient-to-br from-orange-500/5 via-amber-500/5 to-orange-500/5 border-2 border-dashed border-orange-300 rounded-2xl m-4 sm:m-6 shadow-inner relative overflow-hidden transition-all duration-300">
                    {/* Cute floating decorations */}
                    <div className="absolute -top-10 -right-10 w-24 h-24 bg-orange-200/20 rounded-full blur-xl pointer-events-none" />
                    <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-amber-200/20 rounded-full blur-xl pointer-events-none" />

                    <div className="flex items-center gap-3 mb-6 relative z-10">
                      <div className="w-10 h-10 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-600 shrink-0 text-lg">
                        📐
                      </div>
                      <div>
                        <h4 className="font-black text-slate-800 text-sm sm:text-base font-display flex flex-wrap items-center gap-2">
                          <span>Standard Tarpaulin Sizing Matrix</span>
                          <span className="text-[9px] font-black bg-orange-500 text-white px-2 py-0.5 rounded-md uppercase tracking-wider">
                            Cute Frame
                          </span>
                        </h4>
                        <p className="text-xs text-slate-500">Premium Double-Reinforced All-Weather Guards</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                      {/* Category 1: Standard & Utility */}
                      <div className="bg-white/90 p-4 rounded-xl border border-orange-200/40 backdrop-blur-sm shadow-sm hover:border-orange-300/60 transition-colors">
                        <div className="flex items-center gap-1.5 mb-2.5 border-b border-orange-100/60 pb-1.5">
                          <span className="text-sm">🏡</span>
                          <span className="font-extrabold text-xs text-slate-800 uppercase tracking-wider font-display">
                            Small & Utility Sizes
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {["6 × 6 ft", "9 × 12 ft", "12 × 12 ft", "12 × 15 ft"].map((sz) => (
                            <span
                              key={sz}
                              className="bg-orange-50 text-orange-700 font-extrabold text-xs px-2.5 py-1.5 rounded-lg border border-orange-100/60 font-mono shadow-sm hover:scale-105 transition-transform"
                            >
                              {sz}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Category 2: Medium & Standard */}
                      <div className="bg-white/90 p-4 rounded-xl border border-orange-200/40 backdrop-blur-sm shadow-sm hover:border-orange-300/60 transition-colors">
                        <div className="flex items-center gap-1.5 mb-2.5 border-b border-orange-100/60 pb-1.5">
                          <span className="text-sm">🚚</span>
                          <span className="font-extrabold text-xs text-slate-800 uppercase tracking-wider font-display">
                            Medium & Standard Sizes
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {["12 × 18 ft", "15 × 18 ft", "18 × 24 ft", "24 × 24 ft"].map((sz) => (
                            <span
                              key={sz}
                              className="bg-amber-50 text-amber-700 font-extrabold text-xs px-2.5 py-1.5 rounded-lg border border-amber-100/60 font-mono shadow-sm hover:scale-105 transition-transform"
                            >
                              {sz}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Category 3: Large & Commercial */}
                      <div className="bg-white/90 p-4 rounded-xl border border-orange-200/40 backdrop-blur-sm shadow-sm hover:border-orange-300/60 transition-colors">
                        <div className="flex items-center gap-1.5 mb-2.5 border-b border-orange-100/60 pb-1.5">
                          <span className="text-sm">🏗️</span>
                          <span className="font-extrabold text-xs text-slate-800 uppercase tracking-wider font-display">
                            Large & Heavy-Duty Sizes
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {["24 × 30 ft", "30 × 30 ft", "30 × 40 ft"].map((sz) => (
                            <span
                              key={sz}
                              className="bg-rose-50 text-rose-700 font-extrabold text-xs px-2.5 py-1.5 rounded-lg border border-rose-100/60 font-mono shadow-sm hover:scale-105 transition-transform"
                            >
                              {sz}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Category 4: Super Large & Industrial */}
                      <div className="bg-white/90 p-4 rounded-xl border border-orange-200/40 backdrop-blur-sm shadow-sm hover:border-orange-300/60 transition-colors">
                        <div className="flex items-center gap-1.5 mb-2.5 border-b border-orange-100/60 pb-1.5">
                          <span className="text-sm">⛈️</span>
                          <span className="font-extrabold text-xs text-slate-800 uppercase tracking-wider font-display">
                            Industrial & Bulk Covering
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {["40 × 50 ft", "40 × 60 ft", "60 × 100 ft"].map((sz) => (
                            <span
                              key={sz}
                              className="bg-blue-50 text-blue-700 font-extrabold text-xs px-2.5 py-1.5 rounded-lg border border-blue-100/60 font-mono shadow-sm hover:scale-105 transition-transform"
                            >
                              {sz}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Cute Helper Footnote */}
                    <div className="mt-5 p-3.5 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-start gap-2.5 text-[11px] text-orange-800 leading-relaxed font-medium">
                      <span className="text-base shrink-0 select-none">🔔</span>
                      <span>
                        Aluminum Rust-Resistant Grommets are pre-installed at every 3 feet intervals for reliable heavy-duty anchoring and tying. Custom length configurations can be ordered at short notice!
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. WHY CHOOSE US */}
      <section id="why-choose" className="py-20 bg-white relative scroll-mt-24">
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
      <section id="enquire" ref={inquiryRef} className="py-20 bg-slate-50 border-t border-slate-100 relative scroll-mt-24">
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

              {/* Fast interactive quote assistant card */}
              <div className="mt-8 p-6 bg-orange-600 text-white rounded-3xl shadow-lg relative overflow-hidden flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />
                <div className="text-center sm:text-left">
                  <h4 className="font-bold text-lg font-display">Have Specific Sizing Needs?</h4>
                  <p className="text-xs text-white/85 mt-1">Get dynamic wholesale rates for customized sizes.</p>
                </div>
                <button
                  onClick={() => {
                    setPrefilledProduct("");
                    setInquiryOpen(true);
                  }}
                  className="bg-brand-blue-dark hover:bg-brand-blue-royal text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-full transition shadow shrink-0 cursor-pointer"
                >
                  Start Quote Assistant
                </button>
              </div>
            </div>

            {/* Beautiful, Modern & Premium Native Product Enquiry Form Section Replacement */}
            <div className="lg:col-span-7 w-full">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white/80 backdrop-blur-md rounded-3xl border border-slate-200/60 p-8 sm:p-10 shadow-xl relative overflow-hidden flex flex-col justify-between h-full min-h-[420px]"
              >
                {/* Visual Accent Glows */}
                <div className="absolute -right-12 -top-12 w-48 h-48 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-brand-blue-royal/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 space-y-6">
                  <div className="inline-flex items-center gap-2 bg-orange-50 text-brand-orange text-xs font-bold font-mono px-3.5 py-1.5 rounded-full w-fit">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>DIRECT FACTORY DISPATCH</span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-3xl sm:text-4xl font-extrabold font-display text-brand-blue-dark tracking-tight">
                      Get a Free Quote
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                      Tell us your requirements and we'll contact you with the best price.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-50 text-brand-orange flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 stroke-[3px]" />
                      </div>
                      <div>
                        <h5 className="font-bold text-sm text-brand-blue-dark">Direct Factory Rates</h5>
                        <p className="text-xs text-slate-500 font-medium">Bypass middleman commissions entirely.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-brand-blue-royal flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 stroke-[3px]" />
                      </div>
                      <div>
                        <h5 className="font-bold text-sm text-brand-blue-dark">WhatsApp Delivery</h5>
                        <p className="text-xs text-slate-500 font-medium">Receive quotation directly on your phone.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-brand-blue-royal flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 stroke-[3px]" />
                      </div>
                      <div>
                        <h5 className="font-bold text-sm text-brand-blue-dark">Customized Dimensions</h5>
                        <p className="text-xs text-slate-500 font-medium font-sans">Any GSM, size, or eyelet configurations.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-50 text-brand-orange flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 stroke-[3px]" />
                      </div>
                      <div>
                        <h5 className="font-bold text-sm text-brand-blue-dark">Pan-India Logistics</h5>
                        <p className="text-xs text-slate-500 font-medium">Fast transport direct to your city pin-code.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 pt-8 border-t border-slate-100 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-500 flex items-center gap-1.5 font-mono">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Pricing Desk Online & Active</span>
                  </div>

                  <button
                    onClick={() => {
                      setPrefilledProduct("");
                      setInquiryOpen(true);
                    }}
                    className="w-full sm:w-auto bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-extrabold text-sm px-8 py-4 rounded-full inline-flex items-center justify-center gap-2 transition shadow-lg shadow-orange-600/10 hover:shadow-orange-600/25 hover:scale-[1.02] cursor-pointer shrink-0"
                  >
                    <span>Start Quote Assistant</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 11. CONTACT & MAPS SECTION */}
      <section id="contact" className="py-20 bg-white relative scroll-mt-24">
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
                <StoreStatusCard currentLanguage={lang} variant="dark" className="shadow-lg border-slate-800" />

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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d223.91629173090806!2d84.50128406584182!3d26.10999340821257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3992ef4fff9f0e1d%3A0xa7ddfd61780664c3!2sOm%20Shringar%20Tirpal%20Store!5e0!3m2!1sen!2sin!4v1783526928179!5m2!1sen!2sin"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                ></iframe>
              </div>
            </div>

          </div>
        </div>
      </section>

      </>
      )}

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
                <a 
                  href="#products" 
                  onClick={(e) => {
                    e.preventDefault();
                    setIsCatalogOpen(true);
                    setTimeout(() => {
                      const element = document.getElementById("products");
                      if (element) {
                        const headerOffset = 100;
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.scrollY - headerOffset;
                        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                      }
                    }, 50);
                  }}
                  className="hover:text-white transition-colors"
                >
                  Products Catalog
                </a>
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

      {/* 13. FLOATING ACTION CTA WIDGETS */}
      
      {/* Floating Vertical "Enquire Now" Tab: Desktop Only */}
      <div className="hidden md:flex fixed left-0 top-[40%] z-40 transform -translate-y-1/2">
        <button
          onClick={() => handleEnquire("")}
          className="bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-extrabold text-xs tracking-wider uppercase py-4 px-3 rounded-r-2xl shadow-2xl flex items-center gap-2 [writing-mode:vertical-lr] rotate-180 transition-all duration-300 hover:translate-x-1 cursor-pointer select-none border-t border-r border-b border-white/20 relative group"
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-r-2xl pointer-events-none" />
          <span className="animate-pulse">✨ Enquire Now</span>
        </button>
      </div>

      {/* Unified Floating WhatsApp Quote Button: Mobile & Desktop (Aligned Bottom Right) */}
      <div className="fixed right-6 bottom-6 z-40">
        <button
          onClick={() => handleEnquire("")}
          aria-label="WhatsApp Integrated Inquiry"
          className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-extrabold text-xs sm:text-sm px-5 py-3.5 rounded-full shadow-2xl flex items-center gap-2.5 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer relative group border border-emerald-400/20"
        >
          {/* Pulsating Ring Indicator */}
          <span className="absolute inset-0 rounded-full border-2 border-emerald-500/40 animate-ping pointer-events-none" />
          
          <MessageSquare className="w-5 h-5 text-white group-hover:rotate-12 transition-transform shrink-0" />
          <span className="uppercase tracking-wider font-black">Get Quote</span>
        </button>
      </div>

      {/* Floating Scroll-to-Top Button (Stacked above the WhatsApp Button) */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="fixed right-6 bottom-24 z-40"
          >
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Scroll to top"
              className="w-12 h-12 rounded-full bg-white/85 hover:bg-white text-slate-800 hover:text-orange-600 shadow-2xl border border-slate-200/60 flex items-center justify-center backdrop-blur-md transition-all duration-200 active:scale-90 cursor-pointer group"
            >
              <ArrowUp className="w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Assistant Chatbot (Floating Left Aligned) */}
      <AIChatbot currentLanguage={lang} />

      {/* Supplier Popup Modal */}
      <SupplierPopup isOpen={supplierOpen} onClose={() => setSupplierOpen(false)} />

      {/* Conversational Quote Assistant Typeform Modal */}
      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        prefilledProduct={prefilledProduct}
        onClearPrefill={clearPrefill}
        currentLanguage={lang}
      />

      {/* Google Review Prompt Popup */}
      <GoogleReviewPopup />

    </div>
  );
}

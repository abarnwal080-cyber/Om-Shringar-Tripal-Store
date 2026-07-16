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
  Star,
  FileDown,
  FileText
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
  const [searchQuery, setSearchQuery] = useState("");

  const [currentProductSlug, setCurrentProductSlug] = useState<string | null>(null);

  // Clear enquiry submission state on page refresh (initial app mount)
  useEffect(() => {
    localStorage.removeItem("enquiry_submitted");
  }, []);

  // Lock body scroll when fullscreen overlay catalog is open
  useEffect(() => {
    if (isCatalogOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCatalogOpen]);

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
    setPrefilledProduct(productName || "");
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

  // Helper for custom category chips requested by the user: All, Construction, Agriculture, Packaging, Waterproofing, Others
  const getChipCount = (chipId: string) => {
    if (chipId === "All") return PRODUCTS.length;
    if (chipId === "Construction") return PRODUCTS.filter(p => p.category === "Construction & Curing").length;
    if (chipId === "Agriculture") return PRODUCTS.filter(p => p.category === "Security & Fencing").length;
    if (chipId === "Packaging") return PRODUCTS.filter(p => p.category === "Industrial Packaging").length;
    if (chipId === "Waterproofing") return PRODUCTS.filter(p => p.category === "All-Weather Protection").length;
    if (chipId === "Others") return PRODUCTS.filter(p => p.category === "Clear Covering" || p.category === "Household & Outdoor").length;
    return 0;
  };

  const getFilteredProducts = () => {
    return PRODUCTS.filter((p) => {
      // Search filter matching
      const matchesSearch = searchQuery.trim() === "" || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.detailedDescription && p.detailedDescription.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      // Category chip filter matching
      if (activeTab === "All") return true;
      if (activeTab === "Construction") return p.category === "Construction & Curing";
      if (activeTab === "Agriculture") return p.category === "Security & Fencing";
      if (activeTab === "Packaging") return p.category === "Industrial Packaging";
      if (activeTab === "Waterproofing") return p.category === "All-Weather Protection";
      if (activeTab === "Others") return p.category === "Clear Covering" || p.category === "Household & Outdoor";
      
      // Fallback to original category matching just in case
      return p.category === activeTab;
    });
  };

  const filteredProducts = getFilteredProducts();

  const matchedProduct = findProductBySlug(currentProductSlug || "");

  return (
    <div className="min-h-screen text-slate-800 bg-slate-50/50 flex flex-col relative antialiased selection:bg-brand-orange selection:text-white">
      <header className={`w-full bg-brand-blue-dark border-b border-white/10 sticky z-40 shadow-md transition-all duration-300 ease-in-out ${
        navbarVisible ? "top-0 translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Branding */}
          <a href="#" className="flex flex-col">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center text-white shadow-md p-1.5 shrink-0">
                <svg viewBox="0 0 24 24" className="w-full h-full text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="m9 12 2 2 4-4"/>
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
                    className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 text-white font-extrabold text-sm shadow-md cursor-pointer hover:from-orange-700 hover:to-amber-600 transition-colors uppercase tracking-wider active:scale-95 text-center w-full"
                  >
                    <Sparkles className="w-4 h-4 text-white animate-pulse" />
                    <span>{(lang as string) === "hi" ? "दर प्राप्त करें" : "Get Free Quote Now"}</span>
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
                <div className="absolute top-2 right-2 sm:-top-4 sm:-right-4 bg-brand-orange text-white px-3.5 py-2 rounded-xl shadow-lg text-xs font-bold font-mono tracking-widest uppercase rotate-3 z-20">
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
                      Store Helpline
                    </div>
                  </div>
                </div>
                
                <a
                  href="tel:+918002194427"
                  className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-black px-4 py-2.5 rounded-full transition-colors font-mono tracking-wider flex items-center gap-1.5 shadow-md shadow-orange-600/10 cursor-pointer"
                >
                  <span>📞 Call Store</span>
                  <span className="font-mono font-bold">+91 8002194427</span>
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

      {/* 6. PRODUCTS CATALOG PREVIEW SECTION */}
      <section id="products" className="py-24 bg-slate-50 text-slate-900 relative border-y border-slate-200/60 overflow-hidden scroll-mt-24">
        {/* Subtle grid texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        {/* Soft radial glow behind content */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-orange-600/[0.04] blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 px-4.5 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-xs font-black font-mono text-orange-600 uppercase tracking-wider">
              EXCLUSIVE POLYMER CATALOG
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight leading-tight mb-6 text-[#0B2D5C]">
            Explore Our Premium Polymer & <br />
            <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent font-black">
              Waterproof Tarpaulin Catalog
            </span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10 font-semibold">
            Discover Maharajganj's premier collection of certified heavy-duty plastic sheets, pond liners, concrete curing polythenes, nylon safety fencing, and waterproof tirpals. High durability, 100% UV stabilized, and designed for builders, agriculturalists, and businesses.
          </p>

          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05, y: -2, boxShadow: "0 20px 40px -10px rgba(249, 115, 22, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setIsCatalogOpen(true);
              }}
              className="px-10 py-5 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-extrabold text-base rounded-full shadow-lg shadow-orange-500/20 transition-all cursor-pointer flex items-center gap-3 border border-orange-500/20"
            >
              <span>View Products / हमारे प्रोडक्ट्स देखें</span>
              <Icons.ArrowRight className="w-5 h-5 bg-white/20 p-1 rounded-full text-white" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* FULLSCREEN PRODUCTS CATALOG OVERLAY */}
      <AnimatePresence>
        {isCatalogOpen && (
          <motion.div
            initial={{ y: "100%", opacity: 0.95 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0.95 }}
            transition={{ type: "spring", damping: 30, stiffness: 220 }}
            className="fixed inset-0 bg-slate-50 z-50 overflow-y-auto flex flex-col antialiased text-slate-900"
          >
            {/* STICKY GLASSMORPHIC HEADER */}
            <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 py-4 sm:px-6 shadow-sm">
              <div className="max-w-7xl mx-auto flex flex-col gap-4">
                
                {/* Header Row: Back Button & Title & Close */}
                <div className="flex items-center justify-between gap-4">
                  <button
                    onClick={() => {
                      setIsCatalogOpen(false);
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 font-extrabold text-xs sm:text-sm transition-all active:scale-95 cursor-pointer"
                  >
                    <Icons.ArrowLeft className="w-4 h-4 text-orange-600" />
                    <span>Back / पीछे जाएं</span>
                  </button>

                  <div className="text-center">
                    <h3 className="text-sm sm:text-lg font-black font-display text-[#0B2D5C] tracking-tight flex items-center gap-2 justify-center uppercase">
                      <span className="text-orange-500 text-lg sm:text-xl">📦</span>
                      <span>OUR PRODUCTS / हमारे प्रोडक्ट्स</span>
                    </h3>
                  </div>

                  <button
                    onClick={() => {
                      setIsCatalogOpen(false);
                    }}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 hover:text-slate-900 transition-all active:scale-95 cursor-pointer"
                    aria-label="Close"
                  >
                    <Icons.X className="w-5 h-5" />
                  </button>
                </div>

                {/* Search Bar with Glassmorphism */}
                <div className="relative w-full max-w-2xl mx-auto">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Icons.Search className="w-5 h-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products like HDPE Tarpaulin, Pond Liner, Plastic Sheet..."
                    className="w-full bg-white border border-slate-200 hover:border-orange-500/50 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-slate-900 font-bold placeholder-slate-400 text-sm pl-12 pr-10 py-3.5 rounded-2xl shadow-inner focus:outline-none transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-900 cursor-pointer"
                    >
                      <Icons.X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Category Filter Chips (All, Construction, Agriculture, Packaging, Waterproofing, Others) */}
                <div className="w-full overflow-hidden border-t border-slate-100 pt-3">
                  <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar scroll-smooth snap-x sm:justify-center">
                    {[
                      { id: "All", label: "All / सभी", emoji: "🏭" },
                      { id: "Construction", label: "Construction / भवन निर्माण", emoji: "🏗" },
                      { id: "Agriculture", label: "Agriculture / कृषि", emoji: "🌱" },
                      { id: "Packaging", label: "Packaging / पैकिंग", emoji: "📦" },
                      { id: "Waterproofing", label: "Waterproofing / वॉटरप्रूफ", emoji: "🌧" },
                      { id: "Others", label: "Others / अन्य", emoji: "🏡" },
                    ].map((tab) => {
                      const count = getChipCount(tab.id);
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`relative flex items-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs whitespace-nowrap transition-all duration-300 snap-start cursor-pointer hover:-translate-y-[1px] active:scale-95 ${
                            isActive
                              ? "text-white shadow-lg bg-orange-600 border border-orange-500"
                              : "bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 hover:text-slate-900"
                          }`}
                        >
                          <span className="text-sm shrink-0">{tab.emoji}</span>
                          <span>{tab.label}</span>
                          <span className={`inline-flex items-center justify-center text-[10px] px-1.5 py-0.5 rounded-full font-bold font-mono transition-colors ${
                            isActive
                              ? "bg-white/20 text-white"
                              : "bg-slate-200 text-slate-600"
                          }`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            </header>

            {/* OVERLAY BODY AREA */}
            <main className="flex-1 bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 relative">
              {/* Background ambient glows */}
              <div className="absolute top-1/4 left-1/4 w-[30%] h-[30%] rounded-full bg-orange-500/[0.03] blur-3xl pointer-events-none" />
              <div className="absolute bottom-1/4 right-1/4 w-[30%] h-[30%] rounded-full bg-blue-500/[0.02] blur-3xl pointer-events-none" />

              <div className="max-w-7xl mx-auto relative z-10">
                
                {/* Search query feedback banner */}
                {searchQuery.trim() !== "" && (
                  <div className="flex items-center justify-center gap-3 mb-8 bg-orange-50 border border-orange-100 rounded-2xl px-6 py-3 max-w-xl mx-auto">
                    <span className="text-xs sm:text-sm font-bold text-slate-700">
                      Showing results for: <span className="text-orange-600 font-mono">"{searchQuery}"</span>
                    </span>
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-[10px] sm:text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm transition-all active:scale-95 cursor-pointer"
                    >
                      Clear Search
                    </button>
                  </div>
                )}

                {/* Grid layout */}
                {getFilteredProducts().length === 0 ? (
                  <div className="text-center py-20 px-4 bg-white border border-slate-200 rounded-3xl shadow-sm max-w-xl mx-auto my-8">
                    <span className="text-5xl">🔍</span>
                    <h3 className="text-xl font-extrabold text-[#0B2D5C] mt-4 mb-2">No products match your search</h3>
                    <p className="text-slate-500 text-sm font-medium mb-6">
                      We couldn't find any products matching your selection. Try typing a different keyword or resetting your filters.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setActiveTab("All");
                      }}
                      className="px-6 py-3.5 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      Reset Search & Filters
                    </button>
                  </div>
                ) : (
                  <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8"
                  >
                    {getFilteredProducts().map((product) => (
                      <motion.div
                        layout
                        key={product.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="h-full"
                      >
                        <ProductCard
                          product={product}
                          onEnquire={handleEnquire}
                          currentLanguage={lang}
                          onViewDetails={(prod) => {
                            setIsCatalogOpen(false);
                            const slug = getProductSlug(prod.id);
                            window.history.pushState({}, "", `/products/${slug}`);
                            setCurrentProductSlug(slug);
                            window.scrollTo({ top: 0 });
                          }}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GOOGLE REVIEWS SECTION */}
      <section id="google-reviews" className="py-20 bg-gradient-to-b from-slate-50 to-white relative scroll-mt-24 border-t border-slate-100 overflow-hidden">
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
      <section id="special-uses" className="py-20 bg-white relative scroll-mt-24 overflow-hidden">
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
      <section id="size-matrix" className="py-20 bg-slate-50 border-y border-slate-100/50 scroll-mt-24 overflow-hidden">
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
      <section id="why-choose" className="py-20 bg-white relative scroll-mt-24 overflow-hidden">
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
      <section id="enquire" ref={inquiryRef} className="py-20 bg-slate-50 border-t border-slate-100 relative scroll-mt-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center">
            
            {/* FAQs Column */}
            <div className="w-full flex flex-col items-center">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-brand-blue-royal text-xs font-bold font-mono px-3.5 py-1.5 rounded-full w-fit mb-5">
                <Users className="w-3.5 h-3.5 text-brand-orange" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-brand-blue-dark tracking-tight mb-6">
                Have Any Doubts? Let Us Help You
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl">
                Cannot find the sizing or gauge details you are searching for? Browse through our popular customer inquiries or directly contact our helpdesk.
              </p>

              {/* FAQ Accordion */}
              <div className="space-y-3.5 w-full text-left">
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
            </div>

          </div>
        </div>
      </section>

      {/* 11. CONTACT & MAPS SECTION */}
      <section id="contact" className="py-20 bg-white relative scroll-mt-24 overflow-hidden">
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
                      +91 8002194427
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
                📧 shridanta.official@gmail.com
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
          <span className="animate-pulse">✨ {(lang as string) === "hi" ? "पूछताछ करें" : "Enquire Now"}</span>
        </button>
      </div>

      {/* Unified Floating Get Quote Button: Mobile & Desktop (Aligned Bottom Right as custom enquiry-fab) */}
      <div className="fixed right-[22px] bottom-[22px] z-[9999]">
        <button
          id="enquiry-fab"
          onClick={() => handleEnquire("")}
          className="flex items-center gap-[10px] border-none rounded-full cursor-pointer text-white font-extrabold tracking-[0.2px] transition-all duration-200 select-none shadow-[0_16px_34px_rgba(139,92,246,0.28),0_10px_24px_rgba(255,123,184,0.25)] hover:-translate-y-[2px] hover:scale-[1.03] hover:saturate-[1.05] active:translate-y-0 active:scale-[0.99]"
          style={{
            background: "linear-gradient(135deg, #ff7bb8, #ff9f6e 45%, #8b5cf6)",
            padding: "14px 18px",
          }}
        >
          <svg className="w-[22px] h-[22px] fill-white shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z" />
          </svg>
          <span className="uppercase tracking-wider font-extrabold">{(lang as string) === "hi" ? "पूछताछ करें" : "Enquire Now"}</span>
        </button>
      </div>

      {/* Unified Floating WhatsApp Button: Mobile & Desktop (Aligned Bottom Left) */}
      <div className="fixed left-6 bottom-6 z-40">
        <a
          href="https://wa.me/918002194427?text=Hi!%20I%20visited%20your%20website%20and%20wanted%20to%20inquire%20about%20your%20products."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp Integrated Inquiry"
          className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer relative group border border-emerald-400/20"
        >
          {/* Pulsating Ring Indicator */}
          <span className="absolute inset-0 rounded-full border-2 border-emerald-500/40 animate-ping pointer-events-none" />
          
          <svg className="w-7 h-7 text-white fill-current group-hover:rotate-12 transition-transform shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
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

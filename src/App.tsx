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
  Plane,
  Check,
  Star,
  FileDown,
  FileText,
  Store,
  Sparkle
} from "lucide-react";

const shopFrontImage = "https://plain-apac-prod-public.komododecks.com/202607/16/nQxsNGnevCaNtHrwY1OI/image.jpg";
const warehouseImage = "https://plain-apac-prod-public.komododecks.com/202608/03/1xhEJJ9Sa5qBNVBFvnXO/image.png";

import {
  BUSINESS_INFO,
  PRODUCTS,
  FAQS,
  Product,
  getProductSlug,
  findProductBySlug
} from "./data";

import ProductCard from "./components/ProductCard";
import CustomerReviewsSection from "./components/CustomerReviewsSection";
import BrandCarousel from "./components/BrandCarousel";
import ProductMiniCarousel from "./components/ProductMiniCarousel";
import SingleProductSection from "./components/SingleProductSection";
import MeetSupplierSection from "./components/MeetSupplierSection";
import HeroCarousel from "./components/HeroCarousel";
import StoreStatusCard from "./components/StoreStatusCard";
import CustomerSuccessCarousel from "./components/CustomerSuccessCarousel";
import { ProductVideosSection } from "./components/ProductVideosSection";
import { TermsModal } from "./components/TermsModal";
import SizeCalculatorModal from "./components/SizeCalculatorModal";
import WhoWeAreSection from "./components/WhoWeAreSection";
import UserTypeInquiryModal from "./components/UserTypeInquiryModal";
import SizeChartSection from "./components/SizeChartSection";
import GeminiChatbotSection from "./components/GeminiChatbotSection";
import ChatbotWidget from "./components/ChatbotWidget";
import VisitShopSection from "./components/VisitShopSection";
import { TRANSLATIONS } from "./translations";

// Safe dynamic icon loader to keep code modular and readable
function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = (Icons as any)[name] || Icons.HelpCircle;
  return <IconComponent className={className} />;
}

export default function App() {
  const lang = "en";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [isSupplierPageOpen, setIsSupplierPageOpen] = useState(false);
  const [heroBgImage, setHeroBgImage] = useState("https://plain-apac-prod-public.komododecks.com/202607/03/eckT9KEMGbavrebTJwPJ/image.png");
  const [sizeCalcOpen, setSizeCalcOpen] = useState(false);

  const [navbarVisible, setNavbarVisible] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAtFooter, setIsAtFooter] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const lastScrollY = useRef(0);

  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  // User Role / Type Selection Modal for customized WhatsApp drafts
  const [userTypeModalOpen, setUserTypeModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [userTypeModalProduct, setUserTypeModalProduct] = useState("");
  const [userTypeModalContext, setUserTypeModalContext] = useState("");

  const [isSizeChartModalOpen, setIsSizeChartModalOpen] = useState(false);

  const [currentProductSlug, setCurrentProductSlug] = useState<string | null>(null);

  // Clear enquiry submission state on page refresh (initial app mount)
  useEffect(() => {
    localStorage.removeItem("enquiry_submitted");
  }, []);

  // Professional Modal Popup System: Lock body scroll, prevent layout shifts, handle keyboard/touch, restore scroll position
  const isAnyModalActive = isCatalogOpen || isTermsOpen || sizeCalcOpen || userTypeModalOpen || isSizeChartModalOpen || isChatOpen;

  useEffect(() => {
    if (!isAnyModalActive) return;

    // 1. Store exact scroll position to restore later when modal closes
    const scrollY = window.scrollY;

    // 2. Calculate scrollbar width to prevent layout shifts
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    // 3. Lock background page completely (no vertical/horizontal scroll or jump)
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // 4. Handle Escape key & block background page scroll keys
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsCatalogOpen(false);
        setIsTermsOpen(false);
        setSizeCalcOpen(false);
        setUserTypeModalOpen(false);
        setIsSizeChartModalOpen(false);
        return;
      }

      // Prevent page scrolling keys (Space, Arrows, PageUp/Down, Home, End) if not typing in input
      const scrollKeys = ["Space", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "];
      if (scrollKeys.includes(e.key) || scrollKeys.includes(e.code)) {
        const active = document.activeElement;
        const isInput = active && (
          active.tagName === "INPUT" ||
          active.tagName === "TEXTAREA" ||
          active.tagName === "SELECT" ||
          (active as HTMLElement).isContentEditable
        );
        if (!isInput) {
          e.preventDefault();
        }
      }
    };

    // 5. Prevent touch scrolling on background overlay for mobile
    const handleTouchMove = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && !target.closest(".modal-scrollable-content")) {
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("touchmove", handleTouchMove);

      // Restore body styles cleanly
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";

      // Restore exact previous scroll position without jump
      window.scrollTo(0, scrollY);
    };
  }, [isAnyModalActive]);

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
      if (path === "/meet-the-supplier" || path === "/meet-supplier") {
        setIsSupplierPageOpen(true);
        return null;
      } else {
        setIsSupplierPageOpen(false);
      }
      if (path.startsWith("/products/")) {
        return path.substring("/products/".length) || null;
      }
      if (path && path !== "/") {
        const slug = path.substring(1);
        if (slug === "meet-the-supplier" || slug === "meet-supplier") {
          setIsSupplierPageOpen(true);
          return null;
        }
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
          
          // Calculate scroll progress percentage for aeroplane ring
          const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
          const currentProgress = totalScroll > 0 ? Math.min(100, Math.max(0, (currentScrollY / totalScroll) * 100)) : 0;
          setScrollProgress(currentProgress);
          
          // Scroll-to-top button
          if (currentScrollY > 150) {
            setShowScrollTop(true);
          } else {
            setShowScrollTop(false);
          }
          
          // Check if Footer is reached to hide floating icons
          const footerElem = document.querySelector("footer");
          if (footerElem) {
            const rect = footerElem.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.9) {
              setIsAtFooter(true);
            } else {
              setIsAtFooter(false);
            }
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
    const sections = ["about", "products", "special-uses", "size-matrix", "reviews", "enquire", "contact"];
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

  const handleEnquire = (productName: string = "", customContext: string = "") => {
    const textToCheck = (productName + " " + customContext + " " + (currentProductSlug || "")).toLowerCase();
    const isRetailOnly = 
      textToCheck.includes("chatai") ||
      textToCheck.includes("mat") ||
      textToCheck.includes("table cover") ||
      textToCheck.includes("table cloth") ||
      textToCheck.includes("thermocol") ||
      textToCheck.includes("foam") ||
      textToCheck.includes("cosmetic") ||
      textToCheck.includes("shringar") ||
      textToCheck.includes("plastic-mat") ||
      textToCheck.includes("waterproof-table") ||
      textToCheck.includes("fencing") ||
      textToCheck.includes("resham") ||
      textToCheck.includes("polyester") ||
      textToCheck.includes("jali") ||
      textToCheck.includes("net");

    if (isRetailOnly) {
      let matchedName = productName;
      if (!matchedName && currentProductSlug) {
        const found = PRODUCTS.find((p) => getProductSlug(p.id) === currentProductSlug || p.id === currentProductSlug);
        if (found) matchedName = found.name;
      }
      const finalProductName = matchedName || customContext || "Retail Product";
      const message = `Hi Om Shringar Tirpal Store!\n\nI am contacting you regarding retail purchase of *${finalProductName}*.\nPlease share available designs, sizes, and retail price details. Thank you!`;
      const whatsappUrl = `${BUSINESS_INFO.whatsappLink}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      return;
    }

    setUserTypeModalProduct(productName);
    setUserTypeModalContext(customContext);
    setUserTypeModalOpen(true);
  };

   const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    if (isSupplierPageOpen || currentProductSlug) {
      window.history.pushState({}, "", "/");
      setIsSupplierPageOpen(false);
      setCurrentProductSlug(null);
    }

    if (targetId === "products") {
      setIsCatalogOpen(true);
    }
    if (targetId === "size-matrix") {
      setIsSizeChartModalOpen(true);
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
          <a
            href="/"
            onClick={(e) => {
              if (isSupplierPageOpen || currentProductSlug) {
                e.preventDefault();
                window.history.pushState({}, "", "/");
                setIsSupplierPageOpen(false);
                setCurrentProductSlug(null);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center text-white shadow-md p-1.5 shrink-0">
                <svg viewBox="0 0 24 24" className="w-full h-full text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="m9 12 2 2 4-4"/>
                </svg>
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-amaranth-bold font-bold text-xl sm:text-2xl text-white tracking-tight block leading-tight">
                  OM SHRINGAR <span className="text-orange-400">TIRPAL STORE</span>
                </span>
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
              { href: "#contact", label: t.navFindStore, id: "contact" }
            ].map((link) => (
              <a 
                key={link.href}
                href={link.href} 
                onClick={(e) => {
                  e.preventDefault();
                  if (isSupplierPageOpen || currentProductSlug) {
                    window.history.pushState({}, "", "/");
                    setIsSupplierPageOpen(false);
                    setCurrentProductSlug(null);
                  }
                  if (link.id === "products") {
                    setIsCatalogOpen(true);
                  }
                  if (link.id === "size-matrix") {
                    setIsSizeChartModalOpen(true);
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

            {/* White T&C Tab Hyperlink */}
            <button
              onClick={() => setIsTermsOpen(true)}
              className="bg-white text-slate-900 hover:bg-orange-500 hover:text-white font-extrabold text-xs px-3.5 py-1.5 rounded-full transition-all duration-200 shadow-md flex items-center gap-1.5 cursor-pointer border border-white/50 active:scale-95"
              title="Terms & Conditions / Disclaimer"
            >
              <FileText className="w-3.5 h-3.5 text-orange-500 hover:text-white transition-colors" />
              <span>T&C</span>
            </button>
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
              className="lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-100 overflow-hidden shadow-2xl relative"
            >
              {/* Subtle Semi-Transparent Close (X) Button in Top-Right Corner */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-3.5 right-4 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-slate-100/80 hover:bg-slate-200/90 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all cursor-pointer border border-slate-200/60 shadow-sm z-20 active:scale-95"
                aria-label="Close navigation menu"
                title="Close Menu"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>

              <div className="px-4 py-6 pr-16 space-y-4 flex flex-col">
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
                  href="#contact" 
                  onClick={(e) => handleMobileNavClick(e, "contact")}
                  className="text-base font-semibold text-slate-700 hover:text-orange-600 py-1"
                >
                  {t.navFindStore}
                </a>

                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsTermsOpen(true);
                  }}
                  className="text-base font-bold text-slate-800 hover:text-orange-600 py-1 flex items-center gap-2 cursor-pointer text-left"
                >
                  <FileText className="w-4 h-4 text-orange-500" />
                  <span>T&C / Disclaimer</span>
                </button>

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

      {matchedProduct ? (
        <SingleProductSection
          product={matchedProduct}
          onBack={() => {
            window.history.pushState({}, "", "/");
            setCurrentProductSlug(null);
            setIsSupplierPageOpen(false);
            window.scrollTo({ top: 0 });
          }}
          currentLanguage={lang}
          onEnquire={handleEnquire}
        />
      ) : isSupplierPageOpen ? (
        <MeetSupplierSection
          onBack={() => {
            window.history.pushState({}, "", "/");
            setIsSupplierPageOpen(false);
            setCurrentProductSlug(null);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          lang={lang}
          onEnquire={handleEnquire}
        />
      ) : (
        <>
          {/* 4. BRAND PARTNERS BAR (CAROUSEL) - MOVED TO TOP */}
          <BrandCarousel lang={lang} />

          {/* 6. PRODUCTS CATALOG PREVIEW SECTION */}
          <section id="products" className="py-20 bg-slate-50 text-slate-900 relative border-y border-slate-200/60 overflow-hidden scroll-mt-24">
            {/* Subtle grid texture */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            {/* Soft radial glow behind content */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-orange-600/[0.04] blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
              {/* Dynamic automatic product carousel sliding every 1s */}
              <ProductMiniCarousel
                lang={lang}
                onSelectProduct={(slug) => {
                  window.history.pushState({}, "", `/products/${slug}`);
                  setCurrentProductSlug(slug);
                  window.scrollTo({ top: 0 });
                }}
              />

              {/* VIEW PRODUCTS TAB/BUTTON - MOVED DIRECTLY BELOW PRODUCTS */}
              <div className="flex justify-center mt-8 sm:mt-10">
                <motion.button
                  whileHover={{ y: -4, scale: 1.02, boxShadow: "0 20px 40px rgba(255,106,0,0.3), 0 8px 24px rgba(11,31,58,0.2)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setIsCatalogOpen(true);
                  }}
                  className="group relative flex items-center justify-between gap-4 px-4 sm:px-6 w-full max-w-[560px] h-[72px] rounded-full bg-gradient-to-r from-[#071324] via-[#0B1F3A] to-[#071324] border border-white/10 text-white font-sans transition-all duration-300 cursor-pointer select-none overflow-hidden animate-cta-pulse focus:outline-none focus:ring-4 focus:ring-orange-500/40 focus:ring-offset-2 shadow-[0_12px_30px_rgba(255,106,0,.25),_0_4px_12px_rgba(0,0,0,.12)]"
                  aria-label="View Products Catalog"
                >
                  {/* Subtle top glossy highlight layer */}
                  <div className="absolute inset-0 rounded-full border-t border-white/20 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

                  {/* Shimmer/light sweep element (repeating every 5s) */}
                  <div className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/15 to-transparent animate-cta-shimmer pointer-events-none" />

                  {/* LEFT: Premium outlined package/cube SVG icon inside a circular glass background */}
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/15 shadow-[inset_0_1px_3px_rgba(255,255,255,0.2)] text-white shrink-0">
                    <Icons.Package className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5] text-[#FF7A00] group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  {/* CENTER: Text with Poppins/Manrope/Inter fonts, high weight and custom sizes */}
                  <div className="flex flex-col text-left relative z-10 leading-tight flex-grow ml-2 sm:ml-4">
                    <span className="text-[18px] sm:text-[24px] md:text-[26px] font-black tracking-tight text-white drop-shadow-sm font-sans uppercase">
                      {lang === "en" ? "VIEW PRODUCTS" : "उत्पाद देखें"}
                    </span>
                    <span className="text-[11px] sm:text-[14px] font-medium text-orange-400/95 font-sans tracking-wide">
                      {lang === "en" ? "Explore Our Complete Range" : "हमारे संपूर्ण रेंज को देखें"}
                    </span>
                  </div>

                  {/* RIGHT: Orange circular button containing an animated right arrow */}
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-[#FF6A00] to-[#FF8C00] flex items-center justify-center border border-white/20 shadow-lg text-white shrink-0 group-hover:scale-105 transition-transform duration-300 relative z-10">
                    <Icons.ArrowRight className="w-5 h-5 stroke-[2.5] group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </motion.button>
              </div>
            </div>
          </section>

          {/* PRODUCT VIDEOS SHOWCASE SECTION */}
          <ProductVideosSection lang={lang} onEnquire={handleEnquire} />
          
          <ChatbotWidget onClick={() => setIsChatOpen(true)} />

      {/* SHOP FRONT SHOWCASE SECTION */}
      <section id="shop-showcase" className="py-16 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left side: Text describing the physical shop & warehouse */}
            <div className="lg:col-span-5 flex flex-col text-left">
              <div className="flex items-center gap-2 bg-orange-50 text-orange-600 text-xs font-bold font-mono px-3.5 py-1.5 rounded-full w-fit mb-4">
                <Store className="w-3.5 h-3.5 animate-pulse" />
                <span>{lang === "en" ? "PHYSICAL STORE & WAREHOUSE" : "भौतिक स्टोर एवं गोदाम"}</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-slate-900 tracking-tight mb-4">
                {lang === "en" ? (
                  <>
                    Step Into <span className="text-brand-orange">Om Shringar Tirpal Store</span> Maharajganj
                  </>
                ) : (
                  <>
                    पधारें <span className="text-brand-orange">ओम श्रृंगार तिरपाल स्टोर</span> महाराजगंज में
                  </>
                )}
              </h2>
              
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-5 font-medium">
                {lang === "en" ? (
                  "Visit our flagship store and ready-stock warehouse in Maharajganj, Siwan. Directly inspect material thickness (GSM), genuine brand certifications, and purchase at factory wholesale rates."
                ) : (
                  "महाराजगंज, सिवान में स्थित हमारे मुख्य स्टोर और तैयार माल गोदाम पर पधारें। ब्रांडेड वाटरप्रूफ तिरपाल और प्लास्टिक रोल की गुणवत्ता स्वयं जांचें व थोक भाव पाएं।"
                )}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-1">
                <a 
                  href="https://www.google.com/maps/dir/?api=1&destination=Om+Shringar+Tirpal+Store,+Meetha+Hatti,+Maharajganj,+Siwan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#0B2D5C] hover:bg-[#0D3A75] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-orange-500 animate-bounce" />
                  <span>{lang === "en" ? "Get Store Directions" : "दुकान का रास्ता खोजें"}</span>
                </a>
                <a 
                  href="tel:+918210625483"
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all active:scale-95 cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-brand-orange" />
                  <span>{lang === "en" ? "Call Store Directly" : "स्टोर को कॉल करें"}</span>
                </a>
              </div>
            </div>

            {/* Right side: Store Front & Warehouse in compact, side-by-side frames (ek dusre ke bagal mein) */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-3 sm:gap-4 items-center">
              
              {/* Frame 1: Main Store Front */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="relative rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md overflow-hidden flex flex-col group/shop transition-all"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <img 
                    src={shopFrontImage} 
                    alt="Om Shringar Tirpal Store physical storefront" 
                    className="w-full h-full object-cover group-hover/shop:scale-105 transition-transform duration-500 ease-in-out"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-xs border border-white/10 text-orange-400 font-mono text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-md shadow">
                    🏬 {lang === "en" ? "Store Front" : "स्टोर फ़्रंट"}
                  </div>
                </div>
                <div className="p-2 sm:p-2.5 bg-slate-50/90 border-t border-slate-100 flex items-center justify-between text-[11px] sm:text-xs">
                  <span className="font-bold text-slate-800 truncate">{lang === "en" ? "Main Store" : "मुख्य स्टोर"}</span>
                  <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Open
                  </span>
                </div>
              </motion.div>

              {/* Frame 2: Stock Warehouse */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="relative rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md overflow-hidden flex flex-col group/warehouse transition-all"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <img 
                    src={warehouseImage} 
                    alt="Om Shringar Tirpal Store central stock warehouse" 
                    className="w-full h-full object-cover group-hover/warehouse:scale-105 transition-transform duration-500 ease-in-out"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-xs border border-white/10 text-amber-400 font-mono text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-md shadow">
                    🏭 {lang === "en" ? "Warehouse" : "गोदाम"}
                  </div>
                </div>
                <div className="p-2 sm:p-2.5 bg-slate-50/90 border-t border-slate-100 flex items-center justify-between text-[11px] sm:text-xs">
                  <span className="font-bold text-slate-800 truncate">{lang === "en" ? "Bulk Stock" : "थोक गोदाम"}</span>
                  <span className="text-[10px] text-amber-600 font-semibold flex items-center gap-1 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    Ready
                  </span>
                </div>
              </motion.div>

            </div>

          </div>
        </div>
      </section>

      {/* Meet the Supplier CTA Section */}
      <div className="flex justify-center pb-12 bg-slate-50 border-b border-slate-100 relative z-10">
        <motion.button
          whileHover={{ y: -3, scale: 1.02, boxShadow: "0 12px 30px -5px rgba(249, 115, 22, 0.35)" }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            window.history.pushState({}, "", "/meet-the-supplier");
            setIsSupplierPageOpen(true);
            setCurrentProductSlug(null);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2.5 px-10 py-4 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-extrabold text-base rounded-full shadow-xl transition-all border border-orange-500/20 cursor-pointer"
        >
          <span className="text-xl">🤝</span>
          <span>{t.meetSupplier}</span>
        </motion.button>
      </div>


      {/* FULLSCREEN PRODUCTS CATALOG OVERLAY */}
      <AnimatePresence>
        {isCatalogOpen && (
          <motion.div
            initial={{ y: "100%", opacity: 0.95 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0.95 }}
            transition={{ type: "spring", damping: 30, stiffness: 220 }}
            className="fixed inset-0 bg-slate-50 z-50 overflow-y-auto flex flex-col antialiased text-slate-900 modal-scrollable-content overscroll-contain"
            style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-y" }}
          >
            {/* STICKY GLASSMORPHIC HEADER */}
            <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 py-3 sm:px-6 shadow-sm">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                
                {/* Back Button (SVG Arrow only) */}
                <button
                  onClick={() => {
                    setIsCatalogOpen(false);
                  }}
                  className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200/80 text-slate-800 transition-all active:scale-95 cursor-pointer flex items-center justify-center shadow-sm"
                  aria-label="Back"
                >
                  <Icons.ArrowLeft className="w-5 h-5 text-orange-600" />
                </button>

                {/* Close Button (SVG Cross only) */}
                <button
                  onClick={() => {
                    setIsCatalogOpen(false);
                  }}
                  className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200/80 text-slate-700 hover:text-slate-900 transition-all active:scale-95 cursor-pointer flex items-center justify-center shadow-sm"
                  aria-label="Close"
                >
                  <Icons.X className="w-5 h-5" />
                </button>

              </div>
            </header>

            {/* OVERLAY BODY AREA */}
            <main className="flex-1 bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 relative">
              {/* Background ambient glows */}
              <div className="absolute top-1/4 left-1/4 w-[30%] h-[30%] rounded-full bg-orange-500/[0.03] blur-3xl pointer-events-none" />
              <div className="absolute bottom-1/4 right-1/4 w-[30%] h-[30%] rounded-full bg-blue-500/[0.02] blur-3xl pointer-events-none" />

              <div className="max-w-7xl mx-auto relative z-10">
                {/* 2 Products in a row on mobile, multi-column on laptop & desktop */}
                <motion.div
                  layout
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8 max-w-7xl mx-auto"
                >
                  {PRODUCTS.map((product) => (
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
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CUSTOMER REVIEWS SECTION */}
      <CustomerReviewsSection />

      {/* 5. ABOUT US SECTION (WHO WE ARE) */}
      <WhoWeAreSection />



      {/* 7. SPECIAL PURPOSE SHEETS (VERSATILE MULTI-APPLICATION FIELDS) */}
      <section id="special-uses" className="py-14 sm:py-20 bg-white relative scroll-mt-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Section Header with VERSATILE MULTI-APPLICATION FIELDS text */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-brand-blue-royal text-xs font-bold font-mono px-3.5 py-1.5 rounded-full border border-blue-100/80">
              <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
              <span>VERSATILE MULTI-APPLICATION FIELDS</span>
            </div>
          </div>

          {/* Special-Purpose Polymer Sheets Application Image Banner */}
          <div className="w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 bg-white hover:shadow-xl transition-all duration-300">
            <img
              src="https://plain-apac-prod-public.komododecks.com/202608/14/8zpRBCiEnXI7AQgsHnV5/image.png"
              alt="Premium Special-Purpose Polymer Sheets - Versatile Multi-Application Fields"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-contain rounded-2xl sm:rounded-3xl block"
              loading="lazy"
            />
          </div>
        </div>
      </section>



      {/* 8. AVAILABLE PLASTIC & TARPAULIN SIZES (PREMIUM SIZE CHART) */}
      <SizeChartSection
        lang={lang}
        isModalOpen={isSizeChartModalOpen}
        onOpenModal={() => setIsSizeChartModalOpen(true)}
        onCloseModal={() => setIsSizeChartModalOpen(false)}
        onSelectSize={(szStr) => handleEnquire("", `Inquiry for Size: ${szStr}`)}
      />

      {/* 10. GEMINI AI HINGLISH CHATBOT SECTION (REPLACED FAQ) */}
      <div id="enquire" ref={inquiryRef} />

      {/* 11. VISIT PHYSICAL STORE SHOWROOM SECTION */}
      <VisitShopSection />

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
                <a 
                  href="#size-matrix" 
                  onClick={(e) => {
                    e.preventDefault();
                    setIsSizeChartModalOpen(true);
                    setTimeout(() => {
                      const element = document.getElementById("size-matrix");
                      if (element) {
                        const headerOffset = 100;
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.scrollY - headerOffset;
                        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                      }
                    }, 50);
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Size Spec Tables & Matrix
                </a>
                <button 
                  onClick={() => setIsTermsOpen(true)}
                  className="text-white hover:text-orange-400 font-bold transition-colors text-left cursor-pointer flex items-center gap-1.5 pt-1"
                >
                  <FileText className="w-3.5 h-3.5 text-orange-400" />
                  <span>T&C / Image Disclaimer</span>
                </button>
              </nav>
            </div>

            {/* Column 3: Products Quick Access */}
            <div className="lg:col-span-3 flex flex-col">
              <h4 className="text-white font-bold font-display text-sm tracking-wider uppercase mb-4">
                Our Top Polymer Goods
              </h4>
              <div className="flex flex-col gap-2.5 text-xs sm:text-sm">
                {PRODUCTS.map((p) => {
                  const slug = getProductSlug(p.id);
                  return (
                    <a
                      key={p.id}
                      href={`/products/${slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        window.history.pushState({}, "", `/products/${slug}`);
                        setCurrentProductSlug(slug);
                        setIsSupplierPageOpen(false);
                        setIsCatalogOpen(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="hover:text-white text-left transition-colors cursor-pointer"
                    >
                      {p.name}
                    </a>
                  );
                })}
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
            <div className="flex gap-4 items-center">
              <a href={BUSINESS_INFO.googleMapsUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                Google Maps Find Us
              </a>
              <span className="text-slate-600">|</span>
              <a href={BUSINESS_INFO.phoneFormatted} className="hover:text-white transition-colors">
                Proprietor Direct-Dial
              </a>
              <span className="text-slate-600">|</span>
              <button 
                onClick={() => setIsTermsOpen(true)}
                className="text-white hover:text-orange-400 font-extrabold transition-colors cursor-pointer underline underline-offset-4 flex items-center gap-1"
              >
                <span>T&C</span>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* 13. FLOATING ACTION CTA WIDGETS (Visible exclusively on Homescreen, hidden on product details) */}

      {/* Floating Center Aeroplane Scroll-To-Top Button with Scroll Progress Circle Ring */}
      <AnimatePresence>
        {!isAtFooter && showScrollTop && !matchedProduct && !currentProductSlug && !isSupplierPageOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed left-1/2 -translate-x-1/2 bottom-6 z-40"
          >
            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Aeroplane Fly to Top"
              title={`Scroll to top (${Math.round(scrollProgress)}% scrolled)`}
              className="relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white text-slate-900 shadow-2xl backdrop-blur-md transition-all duration-300 cursor-pointer group p-1"
            >
              {/* SVG Circular Progress Ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5" viewBox="0 0 52 52">
                {/* Track Circle */}
                <circle
                  cx="26"
                  cy="26"
                  r="23"
                  className="stroke-slate-200"
                  strokeWidth="3.5"
                  fill="none"
                />
                {/* Scroll Progress Dark Circle Line */}
                <circle
                  cx="26"
                  cy="26"
                  r="23"
                  className="stroke-slate-900 transition-all duration-150 ease-out"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray={144.51}
                  strokeDashoffset={144.51 - (scrollProgress / 100) * 144.51}
                />
              </svg>

              <Plane className="w-6 h-6 -rotate-45 text-[#0B2D5C] group-hover:text-orange-600 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110 relative z-10" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Right-Side Size Calculator Button */}
      <AnimatePresence>
        {!isAtFooter && !matchedProduct && !currentProductSlug && !isSupplierPageOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            className="fixed right-5 bottom-6 z-40"
          >
            <button
              onClick={() => setSizeCalcOpen(true)}
              aria-label="Size Calculator"
              title="Tarpaulin Best Size Calculator - साइज़ कैलकुलेटर"
              className="w-13 h-13 sm:w-14 sm:h-14 bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 hover:from-orange-700 hover:to-amber-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer relative group border border-amber-300/30"
            >
              {/* Pulsating Ring Indicator */}
              <span className="absolute inset-0 rounded-full border-2 border-orange-500/40 animate-ping pointer-events-none" />
              
              {/* Premium Mathematical Calculator SVG */}
              <svg 
                className="w-7 h-7 text-white fill-none stroke-current group-hover:rotate-12 transition-transform shrink-0" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="4" y="2" width="16" height="20" rx="3" strokeWidth="2" className="stroke-white fill-white/10" />
                <line x1="7" y1="6" x2="17" y2="6" strokeWidth="2.5" className="stroke-amber-200" />
                {/* Math Symbol 1: + */}
                <path d="M7.5 11h3M9 9.5v3" strokeWidth="1.8" strokeLinecap="round" />
                {/* Math Symbol 2: − */}
                <path d="M13.5 11h3" strokeWidth="1.8" strokeLinecap="round" />
                {/* Math Symbol 3: × */}
                <path d="M7.5 16l3 3M10.5 16l-3 3" strokeWidth="1.8" strokeLinecap="round" />
                {/* Math Symbol 4: = */}
                <path d="M13.5 16.5h3M13.5 18.5h3" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Unified Floating WhatsApp Button: Mobile & Desktop (Aligned Bottom Left) */}
      <AnimatePresence>
        {!isAtFooter && !matchedProduct && !currentProductSlug && !isSupplierPageOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed left-5 bottom-6 z-40"
          >
            <button
              onClick={() => handleEnquire("", "Direct WhatsApp Chat")}
              aria-label="WhatsApp Integrated Inquiry"
              className="w-13 h-13 sm:w-14 sm:h-14 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer relative group border border-emerald-400/20"
            >
              {/* Pulsating Ring Indicator */}
              <span className="absolute inset-0 rounded-full border-2 border-emerald-500/40 animate-ping pointer-events-none" />
              
              <svg className="w-7 h-7 text-white fill-current group-hover:rotate-12 transition-transform shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Website Content & Image Disclaimer Modal */}
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />

      {/* Tarpaulin Size Recommender Calculator Modal */}
      <SizeCalculatorModal isOpen={sizeCalcOpen} onClose={() => setSizeCalcOpen(false)} lang={lang} onInquire={handleEnquire} />

      {/* Role / User Type Selection Modal for Customized WhatsApp Inquiry */}
      <UserTypeInquiryModal
        isOpen={userTypeModalOpen}
        onClose={() => setUserTypeModalOpen(false)}
        productName={userTypeModalProduct}
        customContext={userTypeModalContext}
        lang={lang}
      />

      <GeminiChatbotSection isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}

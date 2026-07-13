import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Phone,
  MessageSquare,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Shield,
  Star,
  Sparkles,
  Settings,
  HelpCircle,
  FileText,
  Sprout,
  HardHat,
  Truck,
  Factory,
  Warehouse,
  Leaf,
  Waves,
  Bird
} from "lucide-react";
import { Product, BUSINESS_INFO, PRODUCTS, getProductSlug } from "../data";
import LazyImage from "./LazyImage";
import InquiryForm from "./InquiryForm";

interface SingleProductSectionProps {
  product: Product;
  onBack: () => void;
  currentLanguage: "en" | "hi";
  onEnquire: (productName: string) => void;
}

type TabType = "description" | "specifications" | "features" | "applications" | "faqs";

export default function SingleProductSection({
  product,
  onBack,
  currentLanguage = "en",
  onEnquire,
}: SingleProductSectionProps) {
  const [activeTab, setActiveTab] = useState<TabType>("description");
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Dynamic SEO Tags and Product Schema (JSON-LD)
  useEffect(() => {
    const originalTitle = document.title;
    const isHi = currentLanguage === "hi";
    const titleSuffix = isHi ? " - ओम श्रृंगार तिरपाल स्टोर महाराजगंज" : " - Om Shringar Tirpal Store Maharajganj";
    document.title = `${product.name}${titleSuffix}`;

    // Helper to set or update meta tag
    const setMetaTag = (propertyOrName: string, content: string, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${propertyOrName}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, propertyOrName);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Helper to remove meta tag
    const removeMetaTag = (propertyOrName: string, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      const element = document.querySelector(`meta[${attribute}="${propertyOrName}"]`);
      if (element) {
        element.remove();
      }
    };

    // 2. Meta description
    const desc = product.description;
    setMetaTag("description", desc);

    // 3. Open Graph Tags
    const pageUrl = `${window.location.origin}/products/${getProductSlug(product.id)}`;
    setMetaTag("og:title", `${product.name}${titleSuffix}`, true);
    setMetaTag("og:description", desc, true);
    setMetaTag("og:url", pageUrl, true);
    setMetaTag("og:type", "product", true);
    if (product.images && product.images[0]) {
      setMetaTag("og:image", product.images[0], true);
    }

    // 4. Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", pageUrl);

    // 5. Product Schema (JSON-LD)
    const schemaId = "product-jsonld-schema";
    let schemaScript = document.getElementById(schemaId) as HTMLScriptElement;
    if (!schemaScript) {
      schemaScript = document.createElement("script");
      schemaScript.id = schemaId;
      schemaScript.type = "application/ld+json";
      document.head.appendChild(schemaScript);
    }

    const productSchema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": product.name,
      "image": product.images,
      "description": product.description,
      "brand": {
        "@type": "Brand",
        "name": product.specs?.["Brand"] || "Om Shringar"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "INR",
        "lowPrice": "Wholesale Dealer Price Available",
        "offerCount": "1",
        "price": "Call for Wholesale Prices",
        "url": pageUrl,
        "availability": "https://schema.org/InStock"
      }
    };
    schemaScript.text = JSON.stringify(productSchema);

    // Cleanup
    return () => {
      document.title = originalTitle;
      removeMetaTag("description");
      removeMetaTag("og:title", true);
      removeMetaTag("og:description", true);
      removeMetaTag("og:url", true);
      removeMetaTag("og:type", true);
      removeMetaTag("og:image", true);
      if (canonical) {
        canonical.removeAttribute("href");
      }
      const existingSchema = document.getElementById(schemaId);
      if (existingSchema) {
        existingSchema.remove();
      }
    };
  }, [product, currentLanguage]);

  // Handle scroll to show sticky conversion bar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Related Products logic
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);
  if (relatedProducts.length < 3) {
    const extra = PRODUCTS.filter((p) => p.id !== product.id && !relatedProducts.some((rp) => rp.id === p.id)).slice(0, 3 - relatedProducts.length);
    relatedProducts.push(...extra);
  }


  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSelectedImageIdx(0);
    setActiveTab("description");
    setOpenFaqIdx(0);
  }, [product.id]);

  const getWhatsAppLink = (pName: string) => {
    const text = `Hi Mr. Vinod Kumar, I viewed *${pName}* on your website and would like to get more information, pricing, and a wholesale quote.`;
    return `${BUSINESS_INFO.whatsappLink}?text=${encodeURIComponent(text)}`;
  };

  const tabs: { id: TabType; label: string; icon: any }[] = [
    { id: "description", label: "Description", icon: FileText },
    { id: "specifications", label: "Specifications", icon: Settings },
    { id: "features", label: "Features", icon: Shield },
    { id: "applications", label: "Applications", icon: Sprout },
    { id: "faqs", label: "FAQs", icon: HelpCircle }
  ];

  const getAppIcon = (appName: string) => {
    const lower = appName.toLowerCase();
    if (lower.includes("agriculture") || lower.includes("farming")) return <Sprout className="w-5 h-5 text-emerald-600" />;
    if (lower.includes("construction")) return <HardHat className="w-5 h-5 text-amber-600" />;
    if (lower.includes("poultry") || lower.includes("bird")) return <Bird className="w-5 h-5 text-indigo-600" />;
    if (lower.includes("garden")) return <Leaf className="w-5 h-5 text-green-600" />;
    if (lower.includes("fish") || lower.includes("pond")) return <Waves className="w-5 h-5 text-blue-600" />;
    if (lower.includes("warehouse") || lower.includes("storage")) return <Warehouse className="w-5 h-5 text-orange-600" />;
    if (lower.includes("transport") || lower.includes("truck")) return <Truck className="w-5 h-5 text-cyan-600" />;
    if (lower.includes("industrial")) return <Factory className="w-5 h-5 text-slate-600" />;
    return <CheckCircle2 className="w-5 h-5 text-blue-500" />;
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen py-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="mb-4 flex items-center gap-2 text-xs font-semibold text-slate-500">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onBack();
            }}
            className="hover:text-orange-600 transition-colors"
          >
            {currentLanguage === "hi" ? "होम" : "Home"}
          </a>
          <span className="text-slate-300">/</span>
          <span className="text-slate-400">
            {currentLanguage === "hi" ? "उत्पाद" : "Products"}
          </span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-800 truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>

        {/* Navigation / Back Header Bar */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-700 hover:text-orange-600 font-bold text-sm transition-colors py-2 px-4 rounded-xl hover:bg-slate-50 w-fit cursor-pointer group"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span>{currentLanguage === "hi" ? "होमपेज पर वापस जाएं" : "Back to Homepage"}</span>
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-500">
              {currentLanguage === "hi" ? "वर्तमान श्रेणी:" : "Currently Viewing:"}
            </span>
            <span className="text-xs font-bold bg-orange-50 text-orange-600 border border-orange-100 px-3 py-1 rounded-full uppercase tracking-wider">
              {product.category}
            </span>
          </div>
        </div>

        {/* Product Showcase Area */}
        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xl overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10">
            
            {/* Left Column: Interactive Image Carousel */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-100 group shadow-md">
                
                {product.isBestSeller && (
                  <div className="absolute top-4 left-4 z-10 bg-orange-500 text-white font-black text-xs px-3.5 py-1.5 rounded-full shadow-lg uppercase tracking-wider">
                    🔥 Best Seller
                  </div>
                )}

                <div className="absolute inset-0 flex items-center justify-center">
                  <LazyImage
                    src={product.images[selectedImageIdx]}
                    alt={`${product.name} - Display`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500"
                  />
                </div>

                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

                {/* Carousel Controls */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImageIdx((prev) => (prev - 1 + product.images.length) % product.images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-orange-500 text-white transition-all shadow active:scale-90"
                      aria-label="Previous Slide"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setSelectedImageIdx((prev) => (prev + 1) % product.images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-orange-500 text-white transition-all shadow active:scale-90"
                      aria-label="Next Slide"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails list */}
              {product.images.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIdx(idx)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        selectedImageIdx === idx ? "border-orange-500 ring-2 ring-orange-500/20" : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} thumbnail ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Detailed Overview & Tabs */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                    {product.category}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                  <span className="text-xs font-semibold text-slate-500">
                    Premium Quality Polymer
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-black font-display text-brand-blue-dark tracking-tight mb-4">
                  {product.name}
                </h1>

                <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6 font-medium">
                  {product.description}
                </p>

                {/* Tabbed content controller */}
                <div className="border-b border-slate-200 flex flex-wrap gap-1 sm:gap-2 mb-6">
                  {tabs.map((tb) => {
                    const TabIcon = tb.icon;
                    return (
                      <button
                        key={tb.id}
                        onClick={() => setActiveTab(tb.id)}
                        className={`flex items-center gap-1.5 py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                          activeTab === tb.id
                            ? "border-orange-500 text-orange-600"
                            : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-200"
                        }`}
                      >
                        <TabIcon className="w-4 h-4 shrink-0" />
                        <span>{tb.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Tab Panels */}
                <div className="min-h-[250px] mb-8">
                  {activeTab === "description" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <h4 className="font-bold text-slate-800 text-base font-display">
                        Detailed Specifications & Benefits
                      </h4>
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                        {product.detailedDescription}
                      </p>
                      {product.benefits && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                          {product.benefits.map((benefit, index) => (
                            <div key={index} className="flex gap-2.5 items-start bg-slate-50 p-3 rounded-xl border border-slate-100">
                              <span className="text-orange-500 mt-0.5 shrink-0 font-bold">✓</span>
                              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">{benefit}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}

                  {activeTab === "specifications" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm"
                    >
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 text-slate-600 text-xs uppercase font-extrabold border-b border-slate-200">
                            <th className="py-3 px-4 font-display">Technical Spec</th>
                            <th className="py-3 px-4 font-display">Manufacturer Guideline</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs sm:text-sm text-slate-700">
                          {Object.entries(product.specs).map(([key, val], idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                              <td className="py-3 px-4 font-semibold text-slate-500">{key}</td>
                              <td className="py-3 px-4 font-bold text-slate-800">{val}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </motion.div>
                  )}

                  {activeTab === "features" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3.5"
                    >
                      {product.features.map((feat, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-150 rounded-2xl hover:bg-orange-50/30 hover:border-orange-100 transition-colors"
                        >
                          <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          </div>
                          <span className="font-bold text-slate-800 text-sm">
                            {feat}
                          </span>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === "applications" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                      {product.applications.map((app, index) => (
                        <div
                          key={index}
                          className="flex gap-4 p-4 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                            {getAppIcon(app)}
                          </div>
                          <div>
                            <h5 className="font-bold text-slate-800 text-sm sm:text-base font-display">
                              {app}
                            </h5>
                            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                              Specially optimized for {app.toLowerCase()} applications and local weather challenges.
                            </p>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === "faqs" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-3"
                    >
                      {product.faqs.map((faq, index) => {
                        const isOpen = openFaqIdx === index;
                        return (
                          <div
                            key={index}
                            className="border border-slate-150 rounded-xl overflow-hidden bg-slate-50/50"
                          >
                            <button
                              onClick={() => setOpenFaqIdx(isOpen ? null : index)}
                              className="w-full text-left py-3 px-4 font-bold text-sm sm:text-base text-slate-800 flex justify-between items-center bg-white hover:bg-slate-50/30 transition-colors cursor-pointer"
                            >
                              <span>{faq.question}</span>
                              <span className="text-orange-500 text-lg font-bold">
                                {isOpen ? "−" : "+"}
                              </span>
                            </button>
                            {isOpen && (
                              <div className="p-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50">
                                {faq.answer}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Action Bar */}
              <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row gap-4 items-center">
                <a
                  href={BUSINESS_INFO.phoneFormatted}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 py-3.5 px-6 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-bold transition-all hover:border-slate-300"
                >
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span>Call Proprietor</span>
                </a>

                <button
                  onClick={() => onEnquire(product.name)}
                  className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-brand-blue-dark text-white text-sm font-extrabold transition-all hover:bg-slate-800 cursor-pointer shadow"
                >
                  <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span>Request Factory Pricing</span>
                </button>

                <a
                  href={getWhatsAppLink(product.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white text-sm font-black shadow-md hover:scale-[1.01] transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Related Products Section */}
        <div className="mb-12 mt-16">
          <div className="flex flex-col mb-8 text-left">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5">
              {currentLanguage === "hi" ? "आपके लिए अनुशंसित" : "RECOMMENDED FOR YOU"}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-display text-brand-blue-dark tracking-tight">
              {currentLanguage === "hi" ? "संबंधित उत्पाद" : "Related Products"}
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
              >
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {p.isBestSeller && (
                    <span className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-wider z-10">
                      🔥 Best Seller
                    </span>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      {p.category}
                    </span>
                    <h4 className="font-bold text-slate-800 text-sm sm:text-base line-clamp-1 group-hover:text-orange-600 transition-colors">
                      {p.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                      {currentLanguage === "hi" ? "बेस्ट रेट" : "Best Price"}
                    </span>
                    <a
                      href={`/products/${getProductSlug(p.id)}`}
                      onClick={(e) => {
                        e.preventDefault();
                        window.history.pushState({}, "", `/products/${getProductSlug(p.id)}`);
                        window.dispatchEvent(new Event("popstate"));
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="text-xs font-extrabold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer"
                    >
                      <span>{currentLanguage === "hi" ? "विवरण देखें" : "View Details"}</span>
                      <span>➔</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Embedded Jotform specifically for this product */}
        <div className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
          <InquiryForm currentLanguage={currentLanguage} prefilledProduct={product.name} />
        </div>

      </div>

      {/* Sticky Bottom Action Bar for Mobile & Desktop Conversion */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 z-40 py-3.5 px-4 shadow-2xl md:py-4"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
              
              {/* Product Info (Visible on Tablet/Desktop) */}
              <div className="hidden sm:flex items-center gap-3">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-lg object-cover border border-slate-100"
                />
                <div className="text-left">
                  <h4 className="font-bold text-slate-800 text-xs sm:text-sm line-clamp-1 max-w-[200px] lg:max-w-sm">
                    {product.name}
                  </h4>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Conversion CTAs */}
              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <a
                  href={BUSINESS_INFO.phoneFormatted}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 py-2.5 sm:py-3 px-3.5 sm:px-5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-bold transition-all text-center"
                >
                  <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{currentLanguage === "hi" ? "कॉल करें" : "Call"}</span>
                </a>

                <button
                  onClick={() => onEnquire(product.name)}
                  className="flex-[2] sm:flex-initial flex items-center justify-center gap-1.5 py-2.5 sm:py-3 px-5 sm:px-6 rounded-full bg-brand-blue-dark hover:bg-slate-800 text-white text-xs sm:text-sm font-extrabold transition-all cursor-pointer shadow text-center"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse shrink-0" />
                  <span>{currentLanguage === "hi" ? "पूछताछ करें" : "Enquire Now"}</span>
                </button>

                <a
                  href={getWhatsAppLink(product.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 py-2.5 sm:py-3 px-3.5 sm:px-5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-black transition-all text-center"
                >
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  <span>WhatsApp</span>
                </a>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

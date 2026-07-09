import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Phone,
  MessageSquare,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sprout,
  HardHat,
  Bird,
  Leaf,
  Waves,
  Warehouse,
  Truck,
  Factory,
  HelpCircle,
  FileText,
  Settings,
  Shield,
  Star,
  Award,
  DollarSign
} from "lucide-react";
import { Product, BUSINESS_INFO } from "../data";
import LazyImage from "./LazyImage";

interface ProductDetailsModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onEnquire: (productName: string) => void;
}

type TabType = "description" | "specifications" | "features" | "applications" | "faqs";

export default function ProductDetailsModal({
  product,
  isOpen,
  onClose,
  onEnquire
}: ProductDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("description");
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const modalRef = useRef<HTMLDivElement>(null);

  // Keyboard accessibility: ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Pre-fill WhatsApp URL
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

  // Helper function to render application icons
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
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 350 }}
          ref={modalRef}
          className="relative bg-white w-full max-w-5xl h-[85vh] md:h-[80vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10 border border-slate-100"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-2.5">
              <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-md bg-blue-50 text-blue-600 border border-blue-100">
                {product.category}
              </span>
              {product.isBestSeller && (
                <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-md bg-orange-50 text-orange-600 border border-orange-100 animate-pulse">
                  🔥 Best Seller
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
              
              {/* Left Column: Image Gallery (Grid-5) */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                {/* Main Large Image */}
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-100 group shadow-sm">
                  <LazyImage
                    src={product.images[selectedImageIdx]}
                    alt={`${product.name} - Display`}
                    referrerPolicy="no-referrer"
                    className="transition-all duration-300"
                  />
                  
                  {/* Left / Right arrows inside Main Image */}
                  {product.images.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setSelectedImageIdx(
                            (prev) => (prev - 1 + product.images.length) % product.images.length
                          )
                        }
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/55 text-white flex items-center justify-center backdrop-blur-sm transition-all hover:bg-orange-500 hover:scale-105"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          setSelectedImageIdx((prev) => (prev + 1) % product.images.length)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/55 text-white flex items-center justify-center backdrop-blur-sm transition-all hover:bg-orange-500 hover:scale-105"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnails list */}
                {product.images.length > 1 && (
                  <div className="flex gap-2.5 overflow-x-auto py-1 scrollbar-thin scrollbar-thumb-slate-200">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIdx(idx)}
                        className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 shrink-0 cursor-pointer ${
                          idx === selectedImageIdx
                            ? "border-orange-500 ring-2 ring-orange-500/20 scale-95"
                            : "border-slate-200 hover:border-slate-400"
                        }`}
                      >
                        <LazyImage
                          src={img}
                          alt={`${product.name} Thumbnail ${idx + 1}`}
                          referrerPolicy="no-referrer"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Details & Tabs (Grid-7) */}
              <div className="lg:col-span-7 flex flex-col h-full">
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-4 font-display">
                  {product.name}
                </h2>

                {/* Tabs Navigation */}
                <div className="flex border-b border-slate-100 overflow-x-auto gap-1 mb-6 pb-px scrollbar-none">
                  {tabs.map((tab) => {
                    const IconComponent = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 py-3 px-4 font-bold text-xs sm:text-sm border-b-2 whitespace-nowrap transition-all duration-150 cursor-pointer ${
                          isActive
                            ? "border-orange-500 text-orange-600 bg-orange-50/30 rounded-t-xl"
                            : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50/50 rounded-t-xl"
                        }`}
                      >
                        <IconComponent className="w-4 h-4 shrink-0" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Tab Contents Frame */}
                <div className="flex-1 min-h-[250px]">
                  
                  {/* Description Tab */}
                  {activeTab === "description" && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-5"
                    >
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                        {product.detailedDescription || product.description}
                      </p>

                      {product.benefits && product.benefits.length > 0 && (
                        <div>
                          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-2.5 font-mono">
                            Key Benefits
                          </h4>
                          <ul className="space-y-2">
                            {product.benefits.map((benefit, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Specifications Tab */}
                  {activeTab === "specifications" && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 font-mono">
                        Technical Specifications
                      </h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {product.specs ? (
                          Object.entries(product.specs).map(([key, val]) => (
                            <div
                              key={key}
                              className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center"
                            >
                              <span className="text-xs font-semibold text-slate-500">{key}</span>
                              <span className="text-xs font-bold text-slate-900 text-right max-w-[60%] truncate" title={val}>
                                {val}
                              </span>
                            </div>
                          ))
                        ) : (
                          <div className="col-span-2 text-sm text-slate-500 italic p-4 text-center">
                            Specs are compiled dynamically upon wholesale request.
                          </div>
                        )}
                        
                        {/* Always append available/common sizes if present */}
                        {product.availableSizes && (
                          <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100/50 flex justify-between items-center sm:col-span-2">
                            <span className="text-xs font-semibold text-blue-600">Available Width Range</span>
                            <span className="text-xs font-extrabold text-blue-800">{product.availableSizes}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Features Tab */}
                  {activeTab === "features" && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 font-mono">
                        Product Highlights & Advantages
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {(product.benefits || product.features).map((feat, i) => (
                          <div
                            key={i}
                            className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm flex gap-3 items-start hover:border-orange-200 hover:bg-orange-50/10 transition-all"
                          >
                            <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                              <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-800 leading-snug">
                                {feat.endsWith(".") ? feat.slice(0, -1) : feat}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Applications Tab */}
                  {activeTab === "applications" && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 font-mono">
                        Suitable Applications
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {(product.applications || ["Agriculture", "Construction", "Warehouses", "Transport"]).map((app, i) => (
                          <div
                            key={i}
                            className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center gap-2.5 hover:bg-orange-50/20 hover:border-orange-200 transition-colors"
                          >
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                              {getAppIcon(app)}
                            </div>
                            <span className="text-xs font-bold text-slate-700">{app}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* FAQs Tab */}
                  {activeTab === "faqs" && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-3.5"
                    >
                      <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 font-mono mb-2">
                        Frequently Asked Questions
                      </h4>

                      <div className="space-y-2.5">
                        {product.faqs ? (
                          product.faqs.map((faq, i) => (
                            <div key={i} className="border border-slate-150 rounded-xl overflow-hidden bg-white">
                              <button
                                onClick={() => setOpenFaqIdx(openFaqIdx === i ? null : i)}
                                className="w-full px-4 py-3 text-left font-bold text-xs sm:text-sm text-slate-800 flex justify-between items-center hover:bg-slate-50 transition-colors cursor-pointer"
                              >
                                <span>{faq.question}</span>
                                <ChevronRight
                                  className={`w-4 h-4 text-slate-400 transition-transform ${
                                    openFaqIdx === i ? "rotate-90 text-orange-500" : ""
                                  }`}
                                />
                              </button>
                              <AnimatePresence initial={false}>
                                {openFaqIdx === i && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="border-t border-slate-100 bg-slate-50/50"
                                  >
                                    <p className="p-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                                      {faq.answer}
                                    </p>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))
                        ) : (
                          <div className="text-sm text-slate-500 italic p-4 text-center">
                            FAQs will load automatically on order confirmation.
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                </div>
              </div>

            </div>
          </div>

          {/* Footer - Sticky CTA Actions Bar */}
          <div className="border-t border-slate-100 bg-slate-50 px-6 py-4 flex flex-col sm:flex-row gap-3 items-center justify-between shadow-inner">
            <p className="text-slate-500 text-xs text-center sm:text-left mb-1.5 sm:mb-0">
              Dealer: <span className="font-bold text-slate-700">{BUSINESS_INFO.owner}</span>
            </p>

            <div className="flex flex-wrap sm:flex-nowrap gap-2.5 w-full sm:w-auto justify-end">
              {/* Call Now */}
              <a
                href={BUSINESS_INFO.phoneFormatted}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 py-3 px-4.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all hover:border-slate-300"
              >
                <Phone className="w-4 h-4 text-blue-600" />
                <span>Call Store</span>
              </a>

              {/* Get Price (Launches standard inquiry dialog) */}
              <button
                onClick={() => {
                  onEnquire(product.name);
                  onClose();
                }}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 py-3 px-4.5 rounded-full bg-brand-blue-dark text-white text-xs font-extrabold transition-all hover:bg-slate-800"
              >
                <DollarSign className="w-4 h-4 text-amber-400" />
                <span>Get Price Quote</span>
              </button>

              {/* WhatsApp Enquiry (Primary) */}
              <a
                href={getWhatsAppLink(product.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white text-xs font-extrabold shadow-md hover:scale-[1.01] transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Enquiry</span>
              </a>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}

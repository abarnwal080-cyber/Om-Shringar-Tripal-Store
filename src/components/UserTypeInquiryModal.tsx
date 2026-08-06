import React, { useEffect } from "react";
import { X, ShoppingCart, HardHat, Store, Landmark, Building2, HelpCircle, Sparkles, MessageSquare } from "lucide-react";
import { BUSINESS_INFO } from "../data";

interface UserTypeInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  customContext?: string;
  lang?: string;
}

export default function UserTypeInquiryModal({
  isOpen,
  onClose,
  productName = "",
  customContext = "",
  lang = "en",
}: UserTypeInquiryModalProps) {
  // Lock background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const roles = [
    {
      id: "customer",
      titleHi: "ग्राहक",
      titleEn: "Customer",
      subHi: "घर या खेती उपयोग",
      subEn: "Personal / Farm Use",
      icon: ShoppingCart,
      color: "from-blue-500 to-indigo-600",
      bgLight: "bg-blue-50/80 border-blue-200 text-blue-900",
      roleTitle: "Retail Customer (व्यक्तिगत/खेती)",
      roleDesc: "I need product details and pricing for personal/farm use.",
    },
    {
      id: "contractor",
      titleHi: "कॉन्ट्रैक्टर",
      titleEn: "Contractor",
      subHi: "साइट व प्रोजेक्ट्स",
      subEn: "Site & Construction",
      icon: HardHat,
      color: "from-amber-500 to-orange-600",
      bgLight: "bg-amber-50/80 border-amber-200 text-amber-900",
      roleTitle: "Contractor (साइट व प्रोजेक्ट)",
      roleDesc: "I need bulk rates and specs for site work.",
    },
    {
      id: "dealer",
      titleHi: "डीलर / रीसेलर",
      titleEn: "Dealer / Wholesale",
      subHi: "दुकान रीसेल व बल्क",
      subEn: "Shop Resale & Bulk",
      icon: Store,
      color: "from-emerald-500 to-teal-600",
      bgLight: "bg-emerald-50/80 border-emerald-200 text-emerald-900",
      roleTitle: "Dealer / Wholesaler (डीलर)",
      roleDesc: "I need wholesale price catalog and dealership terms.",
    },
    {
      id: "govt",
      titleHi: "सरकारी / B2B",
      titleEn: "Govt / B2B",
      subHi: "टेंडर व GST बिलिंग",
      subEn: "Tenders & GST Bill",
      icon: Landmark,
      color: "from-purple-600 to-pink-600",
      bgLight: "bg-purple-50/80 border-purple-200 text-purple-900",
      roleTitle: "Government / B2B Entity",
      roleDesc: "I require GST invoice, quotation, and official specs.",
    },
    {
      id: "company",
      titleHi: "कंपनी जुड़ें",
      titleEn: "Company Partner",
      subHi: "दुकान से व्यावसायिक जुड़ाव",
      subEn: "To associate with shop",
      icon: Building2,
      color: "from-rose-500 to-red-600",
      bgLight: "bg-rose-50/80 border-rose-200 text-rose-900",
      roleTitle: "Company (व्यावसायिक जुड़ाव)",
      roleDesc: "We want to associate/partner with your store for supply & business.",
    },
    {
      id: "others",
      titleHi: "अन्य पूछताछ",
      titleEn: "Others",
      subHi: "सामान्य सवाल व जानकारी",
      subEn: "General Inquiry",
      icon: HelpCircle,
      color: "from-slate-600 to-slate-800",
      bgLight: "bg-slate-100 border-slate-300 text-slate-800",
      roleTitle: "General Inquiry (अन्य)",
      roleDesc: "I have a general query regarding your products and services.",
    },
  ];

  const handleSelectRole = (role: typeof roles[0]) => {
    let text = `Hi Om Shringar Tirpal Store!\n\nI am contacting you as a *${role.roleTitle}*.\n`;

    if (productName) {
      text += `📦 *Inquiry Product:* ${productName}\n`;
    } else if (customContext) {
      text += `📦 *Requirement:* ${customContext}\n`;
    } else {
      text += `📦 *Inquiry:* Bulk Tarpaulin & Plastic Sheet Catalog\n`;
    }

    text += `💬 *Note:* ${role.roleDesc}\n\nPlease share details on WhatsApp. Thank you!`;

    const whatsappUrl = `${BUSINESS_INFO.whatsappLink}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative z-10 w-full max-w-lg my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Cute White Frame Container */}
        <div className="bg-gradient-to-br from-orange-200 via-amber-100 to-orange-200 p-1.5 sm:p-2 rounded-[28px] shadow-2xl border-2 border-orange-300/80">
          <div className="bg-white rounded-[22px] p-4 sm:p-5 relative border border-orange-100/80 shadow-sm max-h-[85vh] flex flex-col modal-scrollable-content overscroll-contain">
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-100 hover:bg-rose-500 text-slate-500 hover:text-white flex items-center justify-center transition-all cursor-pointer z-20 border border-slate-200/80"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Cute Header */}
            <div className="text-center mb-3.5 pr-6 pl-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-[11px] font-bold tracking-wide mb-1">
                <Sparkles className="w-3 h-3 text-orange-500 animate-pulse" />
                <span>{lang === "hi" ? "अपनी पहचान चुनें" : "Select Your Role"}</span>
              </div>
              <h2
                className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight"
                style={{ fontFamily: "'Amaranth', sans-serif" }}
              >
                {lang === "hi" ? "आपकी क्या भूमिका है? (Who are you?)" : "Who Are You?"}
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5 truncate">
                {productName ? (
                  <>Inquiring for: <span className="text-orange-600 font-bold">{productName}</span></>
                ) : customContext ? (
                  <>{customContext}</>
                ) : (
                  <>{lang === "hi" ? "व्हाट्सएप चैट हेतु एक ऑप्शन चुनें:" : "Select an option for quick WhatsApp draft:"}</>
                )}
              </p>
            </div>

            {/* 6 Role Options Grid - Compact & Fits Mobile Screen */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
              {roles.map((role) => {
                const IconComponent = role.icon;
                return (
                  <button
                    key={role.id}
                    onClick={() => handleSelectRole(role)}
                    className="flex flex-col items-center text-center p-2.5 sm:p-3 rounded-xl bg-orange-50/40 hover:bg-orange-100/70 border border-orange-200/60 hover:border-orange-400 transition-all duration-200 group cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 relative"
                  >
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center text-white shadow-sm mb-1.5 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>

                    <h3
                      className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors leading-tight"
                      style={{ fontFamily: "'Amaranth', sans-serif" }}
                    >
                      {lang === "hi" ? role.titleHi : role.titleEn}
                    </h3>
                    <p className="text-[10px] text-slate-500 font-medium mt-0.5 leading-tight line-clamp-1">
                      {lang === "hi" ? role.subHi : role.subEn}
                    </p>

                    <span className="mt-1.5 text-[9px] font-bold text-emerald-600 group-hover:text-emerald-700 flex items-center gap-0.5">
                      <MessageSquare className="w-2.5 h-2.5 fill-current" />
                      <span>{lang === "hi" ? "चैट शुरू करें" : "WhatsApp"}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Cute Footnote */}
            <div className="mt-3 text-center">
              <span className="inline-block text-[10px] text-slate-500 font-semibold bg-slate-100 px-3 py-1 rounded-full border border-slate-200/80">
                ⚡ {lang === "hi" ? "क्लिक करते ही तैयार मैसेज के साथ व्हाट्सएप खुल जाएगा" : "Clicking will open WhatsApp with custom message draft"}
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

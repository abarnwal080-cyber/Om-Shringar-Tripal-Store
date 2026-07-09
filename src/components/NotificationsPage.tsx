import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Bell, 
  Search, 
  Filter, 
  Pin, 
  Calendar, 
  Phone, 
  Send, 
  MapPin, 
  ChevronDown, 
  ChevronUp, 
  Info, 
  Star, 
  Share2, 
  ArrowRight,
  TrendingUp,
  AlertTriangle
} from "lucide-react";
import { BUSINESS_INFO } from "../data";

// Import the custom generated monsoon banner image
// @ts-ignore
import monsoonBanner from "../assets/images/monsoon_sale_banner_1783584215486.jpg";

export interface NotificationPost {
  id: string;
  title: string;
  category: "Offers" | "New Products" | "Stock Update" | "Festival Sale" | "Business Update";
  date: string;
  isNew?: boolean;
  isPinned?: boolean;
  image: string;
  shortDesc: string;
  longDesc: string;
  bullets?: string[];
  offerPeriod?: string;
  popular?: boolean;
}

const NOTIFICATIONS_DATA: NotificationPost[] = [
  {
    id: "monsoon-sale-2026",
    title: "🌧️ Monsoon Season Sale is LIVE!",
    category: "Offers",
    date: "12 July 2026",
    isNew: true,
    isPinned: true,
    image: monsoonBanner,
    shortDesc: "Our highly anticipated Monsoon Season Sale is now live! Protect your home, construction site, crops, and vehicles with premium-quality waterproof tarpaulins and heavy rolls at wholesale prices.",
    longDesc: "Protect your home, construction site, warehouse, crops, vehicles, and equipment with premium-quality tarpaulins and plastic sheets. We offer heavy-duty waterproof protection made from high-strength polymer fabrics, perfect for the heavy Bihar monsoons. Our products feature double-welded seams, reinforced eyelets, and guaranteed UV protection to prevent tearing and leakage.",
    bullets: [
      "Heavy Duty Multi-Layer Tarpaulin (70 to 450 GSM)",
      "Blue & Black Curing Polythene Rolls (8ft to 36ft wide)",
      "Transparent LLDPE Stretch Film Rolls",
      "Crystal Clear Transparent Shisha Rolls (for table/window covers)",
      "Premium Resham Fencing Net (for farm & boundary safety)"
    ],
    offerPeriod: "12 July 2026 – 27 July 2026",
    popular: true
  },
  {
    id: "pond-liners-stock",
    title: "🚜 Fresh Arrival of Heavy Duty HDPE Pond Liners",
    category: "Stock Update",
    date: "08 July 2026",
    isNew: true,
    image: "https://cpimg.tistatic.com/07558039/b/4/Road-Construction-Polyethylene-Sheet.jpg",
    shortDesc: "We have just restocked premium certified HDPE Pond Liners in 200, 250, and 300 GSM. Ideal for agricultural water storage reservoirs and fisheries.",
    longDesc: "Perfect for farmers looking to build water harvesting ponds or local fish reservoirs (matsya palan). These sheets are 100% leakproof, puncture-resistant, and chemically stable. Made of virgin polymers, they prevent water seepage into soil and can withstand decades of direct soil exposure without rotting.",
    bullets: [
      "Certified 250+ GSM High-Density Polyethylene sheets",
      "Seepage prevention rate of 99.9%",
      "Safe for fish rearing, organic crops, and animals",
      "Available in wide-format roles to minimize joint seams"
    ],
    popular: true
  },
  {
    id: "cheetah-tarpaulins-launch",
    title: "🐆 Exclusive launch of HDPE Capstone Cheetah Tarpaulin",
    category: "New Products",
    date: "05 July 2026",
    isNew: false,
    image: "https://plain-apac-prod-public.komododecks.com/202607/09/XZIjVVBxoKiATRHNKDXZ/image.jpg",
    shortDesc: "Meet the Cheetah-strength waterproof covers! Official authorization to supply dual-tone silver-black & orange-blue Capstone premium sheets is here.",
    longDesc: "The Capstone Cheetah is known nationwide for its exceptional tear-resistance and elite double-heat-welded border ropes. The silver-black variant is perfect for commercial trucks, as the silver layer reflects heat while the black layer provides ultimate blockout and UV damping, keeping transport goods completely safe and cool.",
    bullets: [
      "Tear-proof design with reinforced aluminum eyelets every 3 feet",
      "All-weather performance (-20°C up to 65°C)",
      "Patented cross-laminated technology",
      "Includes a 1-year brand material warranty"
    ]
  },
  {
    id: "resham-net-warning",
    title: "⚠️ Important Guide: Resham Fencing Net Air-Ventilation Usage",
    category: "Business Update",
    date: "30 June 2026",
    isNew: false,
    image: "https://plain-apac-prod-public.komododecks.com/202607/09/wb70mUn6SRRtxoRETFla/image.png",
    shortDesc: "Our high-tensile Resham Fencing Nets are designed for crop boundaries, garden defense, and bird protection. Please read our safety warning.",
    longDesc: "Important update for our agricultural and farming partners in Siwan! While our nylon-composite Resham Fencing Nets are extremely strong, wind-resilient, and rust-free, they are strictly NOT suitable for fish farming ponds. The mesh weave and composite fibers are optimized for open-air boundary ventilation and poultry security.",
    bullets: [
      "Best used for farm boundaries, rooftop gardens, and poultry security",
      "Woven nylon composite prevents rusting or rotting from soil acidity",
      "Warning: Not recommended for deep-pond matsya palan applications",
      "Easy installation on bamboo poles or traditional stakes"
    ]
  },
  {
    id: "chhath-puja-advance",
    title: "🏮 Chhath Puja Advance Booking & Custom Pandals Offer",
    category: "Festival Sale",
    date: "25 June 2026",
    isNew: false,
    image: "https://tiimg.tistatic.com/fp/1/010/266/transparent-stretch-wrap-film-411.jpg",
    shortDesc: "Prepare for Bihar's grand festival! Get a special 10% advance-booking discount on yellow/orange premium tarpaulins for puja ghats and pandals.",
    longDesc: "Preparations for Chhath Puja pandals, ghat shelters, and family seating setups can now be completed at a bargain. Om Shringar Tirpal Store is proud to offer a flat 10% wholesale discount on advance bookings of yellow and orange waterproofing covers. Ensure your materials are secured ahead of peak seasonal pricing and logistics rush.",
    bullets: [
      "Flat 10% wholesale discount on bookings before August",
      "Premium bright yellow and orange aesthetic setups",
      "100% waterproof and durable against strong outdoor sun",
      "Ready-to-use brass grommets for quick banner and rope attachments"
    ]
  }
];

export default function NotificationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedPosts, setExpandedPosts] = useState<Record<string, boolean>>({});

  // Categories list
  const categories = ["All", "Offers", "New Products", "Stock Update", "Festival Sale", "Business Update"];

  // Toggle single post expansion
  const toggleExpand = (id: string) => {
    setExpandedPosts(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Filter posts by search query and category
  const filteredPosts = useMemo(() => {
    return NOTIFICATIONS_DATA.filter(post => {
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.longDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Sidebar posts
  const latestPosts = useMemo(() => {
    return NOTIFICATIONS_DATA.slice(0, 3);
  }, []);

  const popularPosts = useMemo(() => {
    return NOTIFICATIONS_DATA.filter(p => p.popular);
  }, []);

  // WhatsApp helper
  const handleWhatsAppInquiry = (title: string) => {
    const text = `Hello Om Shringar Tirpal Store, I am reading your Notifications page and would like to inquire about: "${title}". Please share wholesale details.`;
    window.open(`https://wa.me/919852076197?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  // Share link helper
  const handleShare = (title: string) => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: `Check out this update from Om Shringar Tirpal Store: ${title}`,
        url: window.location.href
      }).catch(err => console.log(err));
    } else {
      // Fallback: Copy URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Page link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-orange-500 selection:text-white pb-12">
      {/* 1. HERO SECTION */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-blue-950 via-slate-950 to-slate-950 overflow-hidden border-b border-white/5">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Abstract industrial line grid backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full text-blue-400 font-bold text-xs uppercase tracking-widest mb-6"
          >
            <Bell className="w-3.5 h-3.5 animate-bounce" />
            <span>Updates & Announcements</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-orange-400"
          >
            Latest Updates & Offers
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed"
          >
            Stay updated with our latest products, seasonal offers, stock arrivals, and important business announcements from Bihar's trusted supplier.
          </motion.p>
        </div>
      </section>

      {/* 2. MAIN LAYOUT CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        
        {/* 2A. FILTER & SEARCH BAR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-slate-900/60 border border-white/10 p-4 sm:p-6 rounded-3xl backdrop-blur-xl mb-10">
          
          {/* Search bar */}
          <div className="lg:col-span-5 relative">
            <span className="absolute inset-y-0 left-4 flex items-center text-slate-400">
              <Search className="w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder="Search announcements, tags, or offers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-200"
            />
          </div>

          {/* Category badges list */}
          <div className="lg:col-span-7 flex flex-wrap gap-2 items-center">
            <span className="text-xs font-bold font-mono text-slate-400 flex items-center gap-1.5 uppercase tracking-wider mr-2">
              <Filter className="w-3.5 h-3.5 text-orange-500" />
              Filter By:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  selectedCategory === cat
                    ? "bg-orange-600 border-orange-500 text-white shadow-lg shadow-orange-600/20"
                    : "bg-slate-950 border-white/5 text-slate-300 hover:border-white/15 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 2B. CONTENT GRID (FEED + SIDEBAR) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* FEED SECTION (LEFT) */}
          <main className="lg:col-span-8 space-y-8">
            <AnimatePresence mode="popLayout">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post, idx) => {
                  const isExpanded = !!expandedPosts[post.id];
                  
                  return (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.2) }}
                      className={`relative bg-slate-900/55 rounded-3xl border transition-all duration-300 overflow-hidden backdrop-blur-md group ${
                        post.isPinned 
                          ? "border-orange-500/45 shadow-xl shadow-orange-500/5 bg-slate-900/80" 
                          : "border-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-blue-900/5"
                      }`}
                    >
                      {/* Pinned Post Highlight ribbon */}
                      {post.isPinned && (
                        <div className="absolute top-4 left-4 z-10 bg-orange-600/90 text-white border border-orange-500/50 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 backdrop-blur-md">
                          <Pin className="w-3 h-3 fill-current rotate-45" />
                          <span>Pinned Announcement</span>
                        </div>
                      )}

                      {/* Recent/New post badge */}
                      {post.isNew && !post.isPinned && (
                        <div className="absolute top-4 left-4 z-10 bg-blue-600/90 text-white border border-blue-500/50 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-md">
                          NEW
                        </div>
                      )}

                      {/* Image Frame */}
                      <div className="relative h-64 sm:h-80 md:h-[380px] overflow-hidden bg-slate-950">
                        <img
                          src={post.image}
                          alt={post.title}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                        
                        {/* Title & Metadata inside image gradient */}
                        <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 flex flex-col justify-end">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <span className="bg-orange-600 text-white font-extrabold text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-lg">
                              {post.category}
                            </span>
                            <span className="text-slate-300 font-mono text-xs flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" />
                              {post.date}
                            </span>
                          </div>
                          
                          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight font-display">
                            {post.title}
                          </h2>
                        </div>
                      </div>

                      {/* Content Card Body */}
                      <div className="p-6 sm:p-8 space-y-6">
                        
                        {/* Short / Intro Description */}
                        <p className="text-slate-200 text-base leading-relaxed font-semibold">
                          {post.shortDesc}
                        </p>

                        {/* Collapsible / Read More Block */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden border-t border-white/5 pt-5 space-y-5"
                            >
                              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                                {post.longDesc}
                              </p>

                              {/* Bullets lists */}
                              {post.bullets && (
                                <div className="bg-slate-950/50 rounded-2xl p-4 sm:p-5 border border-white/5 space-y-3">
                                  <span className="text-xs font-black uppercase tracking-wider text-orange-400 block mb-1">
                                    Key Details & Product Ranges:
                                  </span>
                                  <ul className="space-y-2 text-slate-300 text-sm">
                                    {post.bullets.map((bullet, bidx) => (
                                      <li key={bidx} className="flex items-start gap-2.5">
                                        <span className="text-orange-500 font-bold shrink-0 mt-0.5">✔</span>
                                        <span className="font-medium">{bullet}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Offer validation details */}
                              {post.offerPeriod && (
                                <div className="flex flex-wrap items-center gap-3 bg-orange-600/10 border border-orange-500/20 p-4 rounded-2xl">
                                  <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
                                    <Star className="w-5 h-5 fill-current animate-pulse" />
                                  </div>
                                  <div>
                                    <div className="text-xs uppercase tracking-wider text-orange-400 font-bold">
                                      Promotional Offer Validity
                                    </div>
                                    <div className="text-sm font-extrabold text-white">
                                      {post.offerPeriod}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Divider */}
                        <div className="w-full h-px bg-white/10" />

                        {/* Action Buttons Footer */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          
                          {/* Read More Accordion Trigger */}
                          <button
                            onClick={() => toggleExpand(post.id)}
                            className="flex items-center gap-2 text-sm font-extrabold text-slate-300 hover:text-white transition-colors cursor-pointer self-start py-1"
                          >
                            <span>{isExpanded ? "Read Less" : "Read More & Explore"}</span>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-orange-500" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-orange-500" />
                            )}
                          </button>

                          {/* CTA Actions */}
                          <div className="flex flex-wrap items-center gap-2.5">
                            {/* Call Button */}
                            <a
                              href={`tel:${BUSINESS_INFO.phone}`}
                              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl border border-white/5 transition-all cursor-pointer"
                            >
                              <Phone className="w-3.5 h-3.5" />
                              <span>Call Now</span>
                            </a>

                            {/* WhatsApp Button */}
                            <button
                              onClick={() => handleWhatsAppInquiry(post.title)}
                              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-md shadow-emerald-950/10"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>WhatsApp</span>
                            </button>

                            {/* Share button */}
                            <button
                              onClick={() => handleShare(post.title)}
                              aria-label="Share Post"
                              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer border border-white/5"
                            >
                              <Share2 className="w-4 h-4" />
                            </button>
                          </div>

                        </div>

                      </div>
                    </motion.article>
                  );
                })
              ) : (
                /* No search result view */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-slate-900/40 border border-white/10 rounded-3xl p-12 text-center"
                >
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-slate-500 mx-auto mb-4">
                    <Search className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No updates found</h3>
                  <p className="text-slate-400 text-sm max-w-md mx-auto">
                    We couldn't find any announcements matching "{searchQuery}" under "{selectedCategory}" category. Try adjusting your filters.
                  </p>
                  <button
                    onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                    className="mt-5 px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                  >
                    Clear All Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* SIDEBAR PANEL (RIGHT) */}
          <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-36">
            
            {/* Sidebar Card 1: Latest Announcements */}
            <div className="bg-slate-900/55 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
              <h3 className="text-lg font-extrabold tracking-tight mb-5 font-display flex items-center gap-2 pb-3 border-b border-white/10">
                <Bell className="w-4 h-4 text-orange-500" />
                Latest Posts
              </h3>
              <div className="space-y-4">
                {latestPosts.map(post => (
                  <button
                    key={post.id}
                    onClick={() => {
                      const element = document.getElementById(post.id);
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                        if (!expandedPosts[post.id]) {
                          toggleExpand(post.id);
                        }
                      }
                    }}
                    className="w-full text-left group cursor-pointer flex gap-3 p-2 rounded-xl hover:bg-white/5 transition-all"
                  >
                    <div className="w-14 h-14 rounded-lg bg-slate-950 overflow-hidden shrink-0 border border-white/5">
                      <img src={post.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase text-orange-400 font-mono">
                        {post.category}
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-orange-400 transition-colors leading-snug line-clamp-2 mt-0.5">
                        {post.title}
                      </h4>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sidebar Card 2: Most Popular */}
            <div className="bg-slate-900/55 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
              <h3 className="text-lg font-extrabold tracking-tight mb-5 font-display flex items-center gap-2 pb-3 border-b border-white/10">
                <TrendingUp className="w-4 h-4 text-orange-500" />
                Most Viewed
              </h3>
              <div className="space-y-4">
                {popularPosts.map(post => (
                  <button
                    key={post.id}
                    onClick={() => {
                      const element = document.getElementById(post.id);
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                        if (!expandedPosts[post.id]) {
                          toggleExpand(post.id);
                        }
                      }
                    }}
                    className="w-full text-left group cursor-pointer flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all"
                  >
                    <div className="pr-3">
                      <span className="text-[9px] font-black uppercase text-slate-400 block tracking-wider">{post.category}</span>
                      <h4 className="text-xs font-extrabold text-white group-hover:text-orange-400 transition-colors leading-tight mt-0.5 line-clamp-1">
                        {post.title}
                      </h4>
                    </div>
                    <span className="text-xs font-bold text-orange-500 flex items-center gap-1 shrink-0">
                      View
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sidebar Card 3: Important Business Notice */}
            <div className="relative overflow-hidden bg-gradient-to-br from-orange-600/90 to-amber-500/95 border border-orange-500/50 rounded-3xl p-6 text-white shadow-xl">
              <div className="absolute top-0 right-0 translate-x-4 -translate-y-4 w-28 h-28 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              <div className="relative z-10 space-y-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold tracking-tight font-display leading-tight">
                  Important Notice
                </h3>
                <p className="text-xs text-white/90 leading-relaxed font-semibold">
                  Om Shringar Tirpal Store (Formerly Goyal Traders) deals exclusively in certified, genuine brand partner stock. Beware of duplicate copies in local markets!
                </p>
                <div className="h-px bg-white/20 w-full" />
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider">
                  <Star className="w-3.5 h-3.5 fill-current text-yellow-300" />
                  <span>Authorized Trading Partner Since 2000</span>
                </div>
              </div>
            </div>

          </aside>

        </div>

        {/* 2C. BOTTOM CALL-TO-ACTION (CTA) SECTION */}
        <section className="mt-16 bg-gradient-to-r from-blue-900/40 via-slate-900/60 to-orange-950/20 border border-white/10 rounded-3xl p-8 sm:p-10 relative overflow-hidden backdrop-blur-md">
          <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="space-y-3">
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
                Need Help Choosing the Right Product?
              </h3>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-medium">
                Our service experts can help you select the exact GSM, width, and thickness matching your requirement. Call Mr. Vinod Kumar directly for customized corporate or retail consultation.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="w-full sm:w-auto text-center flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-extrabold text-sm px-6 py-3.5 rounded-2xl transition-all duration-200 shadow-lg hover:scale-[1.02]"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </a>
              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-sm px-6 py-3.5 rounded-2xl transition-all border border-white/5"
              >
                <MapPin className="w-4 h-4" />
                <span>Visit Our Shop</span>
              </a>
            </div>
          </div>
        </section>

        {/* 2D. FOOTER NOTES */}
        <footer className="mt-12 text-center max-w-2xl mx-auto space-y-4">
          <div className="h-px bg-white/10 w-24 mx-auto" />
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
            Follow this page regularly for:
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-slate-300 text-xs font-semibold">
            <span>• Latest Offers</span>
            <span>• Seasonal Discounts</span>
            <span>• New Product Launches</span>
            <span>• Stock Availability</span>
            <span>• Business Announcements</span>
          </div>
          <p className="text-[10px] text-slate-500 font-bold mt-4">
            Authorized Dealer: Om Shringar Tirpal Store (Formerly Goyal Traders) | www.shridantahub.in
          </p>
        </footer>

      </div>
    </div>
  );
}

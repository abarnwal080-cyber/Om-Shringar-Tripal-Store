import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, X, MessageSquare, Sparkles, Eye, ChevronLeft, ChevronRight } from "lucide-react";

interface VideoItem {
  id: string;
  title: string;
  description: string;
  url: string;
  badge: string;
  badgeColor: string;
}

const VIDEOS: VideoItem[] = [
  {
    id: "CMtP5qLMRbk",
    title: "Non Cuttable Sheets",
    description: "Ultra-strong and virtually non-cuttable multi-layered protection sheets",
    url: "https://www.youtube.com/embed/CMtP5qLMRbk?autoplay=1&mute=1&loop=1&playlist=CMtP5qLMRbk&playsinline=1&rel=0",
    badge: "Non Cuttable",
    badgeColor: "bg-red-50 text-red-700 border-red-200"
  },
  {
    id: "bijzl6m_ygg",
    title: "Heavy Duty Shalimar & Jumbo Truck Covering",
    description: "Premium waterproofing and robust coverage for industrial trucks and transport logistics",
    url: "https://www.youtube.com/embed/bijzl6m_ygg?autoplay=1&mute=1&loop=1&playlist=bijzl6m_ygg&playsinline=1&rel=0",
    badge: "Heavy Duty",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200"
  },
  {
    id: "qlSVdQLMPcA",
    title: "Dhalai Sheet",
    description: "High performance road curing, foundation construction, and under-slab vapor barrier",
    url: "https://www.youtube.com/embed/qlSVdQLMPcA?autoplay=1&mute=1&loop=1&playlist=qlSVdQLMPcA&playsinline=1&rel=0",
    badge: "Construction",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    id: "jL3oVLMO_18",
    title: "Tarpaulins Used by Govt",
    description: "Heavy-duty government-standard emergency relief and disaster management covers",
    url: "https://www.youtube.com/embed/jL3oVLMO_18?autoplay=1&mute=1&loop=1&playlist=jL3oVLMO_18&playsinline=1&rel=0",
    badge: "Govt Approved",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200"
  },
  {
    id: "xklevmfuaGk",
    title: "Stretch Film Roll",
    description: "Heavy duty stretch film wrapping rolls for carton securing, bundling, and industrial packaging",
    url: "https://www.youtube.com/embed/xklevmfuaGk?autoplay=1&mute=1&loop=1&playlist=xklevmfuaGk&playsinline=1&rel=0",
    badge: "Packaging Roll",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200"
  }
];

// Number of slides to clone on both ends for infinite horizontal loop
const CLONE_COUNT = 3;

interface VideoCardProps {
  video: VideoItem;
  onSelect: (video: VideoItem) => void;
  isActive: boolean;
  hasDraggedRef: React.RefObject<boolean>;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onSelect, isActive, hasDraggedRef }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    // If user dragged, do not trigger click/lightbox
    if (hasDraggedRef.current) {
      e.stopPropagation();
      return;
    }
    onSelect(video);
  };

  return (
    <div
      className="group relative flex flex-col bg-white rounded-[20px] shadow-sm hover:shadow-[0_20px_40px_rgba(255,106,0,0.12)] border border-slate-100/80 hover:border-[#FF7A00]/30 transition-all duration-500 hover:-translate-y-2 cursor-pointer h-full select-none overflow-hidden"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Aspect Ratio Box for Video / Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-black select-none">
        
        {/* Render iframe only when card is active for lazy-loading/performance */}
        {isActive ? (
          <iframe
            src={`${video.url}&controls=0&modestbranding=1&showinfo=0&iv_load_policy=3&enablejsapi=1`}
            title={video.title}
            className="w-full h-full scale-[1.02] border-0 select-none pointer-events-none"
            allow="autoplay; encrypted-media; picture-in-picture"
            loading="lazy"
          />
        ) : (
          <img
            src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        )}

        {/* Pointer-events blocker overlay to allow swiping/dragging and click expansion */}
        <div className="absolute inset-0 z-10 bg-transparent" />

        {/* Ambient Dark/Warm Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent z-10" />

        {/* Hover overlay play button */}
        <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-xl transform scale-90 group-hover:scale-100 transition-all duration-300">
            <Play className="w-6 h-6 fill-white ml-1" />
          </div>
        </div>

        {/* Small floating play indicator for static view */}
        {!isHovered && (
          <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-md text-white text-[10px] font-bold">
            <Play className="w-3 h-3 fill-white" />
            <span>PREVIEW</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col justify-between flex-grow text-left bg-gradient-to-b from-white to-slate-50/30">
        <div>
          {/* Badge is now rendered below the stream */}
          <div className="mb-2.5">
            <span className={`inline-block border text-[10px] font-mono font-extrabold px-2.5 py-1 rounded-md ${video.badgeColor}`}>
              {video.badge}
            </span>
          </div>
          
          <h3 className="text-base font-extrabold text-[#0B2D5C] tracking-tight mb-2 group-hover:text-[#FF7A00] transition-colors duration-300 leading-snug">
            {video.title}
          </h3>
          <p className="text-slate-600 text-xs font-semibold leading-relaxed line-clamp-2">
            {video.description}
          </p>
        </div>
        
        {/* Click Prompt */}
        <div className="flex items-center gap-1.5 mt-4 text-[10px] font-black text-[#FF7A00] uppercase tracking-wider">
          <Eye className="w-3.5 h-3.5" />
          <span>Click to watch fullscreen</span>
        </div>
      </div>
    </div>
  );
};

interface ProductVideosSectionProps {
  lang: "en" | "hi";
  onEnquire: (subject: string) => void;
}

export const ProductVideosSection: React.FC<ProductVideosSectionProps> = ({ lang, onEnquire }) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  // Responsive Visible Cards State
  const [visibleCount, setVisibleCount] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(CLONE_COUNT);
  const [isSeamlessReset, setIsSeamlessReset] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Drag and Touch States
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const dragStartXRef = useRef(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const hasDraggedRef = useRef(false);

  // Determine container width for responsive touch calculations
  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Update visible cards on window resize
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  // Clone items on left and right for seamless looping
  const displayVideos = [
    ...VIDEOS.slice(-CLONE_COUNT),
    ...VIDEOS,
    ...VIDEOS.slice(0, CLONE_COUNT),
  ];

  // Sliding Navigations
  const handleNext = () => {
    if (isSeamlessReset) return;
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (isSeamlessReset) return;
    setCurrentIndex((prev) => prev - 1);
  };

  // Seamless Infinite reset handling
  const handleTransitionEnd = () => {
    if (currentIndex >= VIDEOS.length + CLONE_COUNT) {
      setIsSeamlessReset(true);
      setCurrentIndex(CLONE_COUNT);
    } else if (currentIndex < CLONE_COUNT) {
      setIsSeamlessReset(true);
      setCurrentIndex(VIDEOS.length + CLONE_COUNT - 1);
    }
  };

  // Turn transitions back on after the zero-duration seamless jump frame
  useEffect(() => {
    if (isSeamlessReset) {
      const raf = requestAnimationFrame(() => {
        setIsSeamlessReset(false);
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [isSeamlessReset]);

  // Autoplay timer sliding every 3 seconds (pauses on hover, drag, or active lightbox)
  useEffect(() => {
    if (isHovered || isDragging || selectedVideo || isSeamlessReset) return;

    const timer = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(timer);
  }, [isHovered, isDragging, selectedVideo, isSeamlessReset, currentIndex]);

  // Keyboard controls for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedVideo(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Drag and Touch Handlers
  const handleDragStart = (clientX: number) => {
    if (isSeamlessReset) return;
    dragStartXRef.current = clientX;
    setIsDragging(true);
    setDragOffset(0);
    hasDraggedRef.current = false;
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const deltaX = clientX - dragStartXRef.current;
    setDragOffset(deltaX);
    if (Math.abs(deltaX) > 5) {
      hasDraggedRef.current = true;
    }
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const swipeThreshold = 50; // swipe delta threshold in pixels
    if (dragOffset < -swipeThreshold) {
      handleNext();
    } else if (dragOffset > swipeThreshold) {
      handlePrev();
    }
    setDragOffset(0);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  };

  const onMouseUp = () => {
    handleDragEnd();
  };

  const onMouseLeave = () => {
    handleDragEnd();
  };

  const onTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  };

  const onTouchEnd = () => {
    handleDragEnd();
  };

  const getWhatsAppMessage = (videoTitle: string) => {
    const text = `Hi Mr. Vinod Kumar, I watched the product video for *${videoTitle}* on your website. I want to inquire about bulk wholesale pricing and order process for my store.`;
    return `https://wa.me/918002194427?text=${encodeURIComponent(text)}`;
  };

  // Calculate sliding track translations
  const basePercentageOffset = -currentIndex * (100 / visibleCount);
  const dragPercentageContribution = containerWidth ? (dragOffset / containerWidth) * 100 : 0;
  const totalOffsetPercentage = basePercentageOffset + dragPercentageContribution;

  return (
    <>
      {/* Core Video Carousel Section */}
      <section className="relative bg-white py-20 lg:py-28 overflow-hidden text-slate-900 border-b border-slate-200/60">
        
        {/* Glowing Background Decorative Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#FF7A00]/5 to-transparent blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-pink-500/5 to-transparent blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-[#FF7A00] font-mono text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>{lang === "en" ? "Interactive Video Gallery" : "इंटरएक्टिव वीडियो गैलरी"}</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-[#0B2D5C] tracking-tight leading-tight mb-6">
              {lang === "en" ? "Real Applications of Our Products" : "हमारे उत्पादों के वास्तविक अनुप्रयोग"}
            </h2>
            
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-semibold">
              {lang === "en" 
                ? "Watch how our premium products are used across construction, transportation, agriculture, warehousing, packaging and emergency protection."
                : "देखें कि हमारे प्रीमियम उत्पादों का उपयोग निर्माण, परिवहन, कृषि, भंडारण, पैकेजिंग और आपातकालीन सुरक्षा में कैसे किया जाता है।"}
            </p>
          </div>

          {/* Premium Infinite Horizontal Carousel */}
          <div 
            className="relative mb-20 group/carousel"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            
            {/* Carousel Viewport Window */}
            <div 
              ref={containerRef}
              className="overflow-hidden rounded-[24px] relative"
            >
              <div
                className="flex flex-row flex-nowrap"
                style={{
                  transform: `translate3d(${totalOffsetPercentage}%, 0, 0)`,
                  transition: isSeamlessReset ? "none" : "transform 600ms cubic-bezier(0.16, 1, 0.3, 1)"
                }}
                onTransitionEnd={handleTransitionEnd}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseLeave}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                {displayVideos.map((video, idx) => {
                  // Determine if card is currently fully or partially visible inside the active carousel window
                  const isActive = idx >= currentIndex && idx < currentIndex + visibleCount;

                  return (
                    <div
                      key={`${video.id}-${idx}`}
                      className="flex-shrink-0 px-3 md:px-4"
                      style={{
                        width: `${100 / visibleCount}%`,
                        boxSizing: "border-box"
                      }}
                    >
                      <VideoCard 
                        video={video} 
                        onSelect={setSelectedVideo} 
                        isActive={isActive}
                        hasDraggedRef={hasDraggedRef}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Left & Right Navigation Arrows with Glassmorphism */}
            <button
              onClick={handlePrev}
              className="absolute left-1 sm:left-[-25px] top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-950/80 backdrop-blur-md hover:bg-slate-950 text-white flex items-center justify-center border border-white/15 shadow-2xl transition-all hover:scale-110 active:scale-95 cursor-pointer z-20"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF7A00]" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-1 sm:right-[-25px] top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-950/80 backdrop-blur-md hover:bg-slate-950 text-white flex items-center justify-center border border-white/15 shadow-2xl transition-all hover:scale-110 active:scale-95 cursor-pointer z-20"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF7A00]" />
            </button>

            {/* Mobile swipe dots indicator */}
            <div className="flex justify-center gap-2 mt-6 md:hidden">
              {VIDEOS.map((_, idx) => {
                const normalizedIndex = (currentIndex - CLONE_COUNT + VIDEOS.length) % VIDEOS.length;
                const isActive = normalizedIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${isActive ? "w-6 bg-[#FF7A00]" : "w-1.5 bg-slate-600"}`}
                  />
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-md"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-slate-900 border border-white/10 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Video Player Header */}
              <div className="flex items-center justify-between p-5 bg-slate-950/80 border-b border-white/5">
                <div className="flex flex-col text-left">
                  <span className="font-mono text-[10px] font-extrabold uppercase text-[#FF7A00] tracking-wider mb-0.5">
                    {selectedVideo.badge} Application
                  </span>
                  <h4 className="text-base sm:text-lg font-black text-white">
                    {selectedVideo.title}
                  </h4>
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedVideo(null)}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer border border-white/5"
                    aria-label="Close Lightbox"
                    title="Close Video"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* YouTube Embedded Video Player inside Lightbox */}
              <div className="relative aspect-video bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&mute=0&loop=1&playlist=${selectedVideo.id}&playsinline=1&rel=0&controls=1&modestbranding=1`}
                  title={selectedVideo.title}
                  className="w-full h-full border-0"
                  allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video Footer Action */}
              <div className="p-6 bg-slate-950/60 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
                <p className="text-slate-300 text-sm font-semibold max-w-md">
                  {selectedVideo.description}
                </p>
                
                <div className="flex items-center gap-3">
                  <a
                    href={getWhatsAppMessage(selectedVideo.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-[#0B2D5C] px-5 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-colors shadow-md"
                  >
                    <MessageSquare className="w-4 h-4 fill-[#0B2D5C]" />
                    <span>Inquire via WhatsApp</span>
                  </a>

                  <button
                    onClick={() => {
                      setSelectedVideo(null);
                      onEnquire(`Inquiry for product video: ${selectedVideo.title}`);
                    }}
                    className="flex items-center gap-1.5 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-[#0B2D5C] px-5 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-colors shadow-md"
                  >
                    <Sparkles className="w-4 h-4 text-[#0B2D5C]" />
                    <span>Get Free Quote</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

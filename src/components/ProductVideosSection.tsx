import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, X, Phone, MessageSquare, Sparkles, VolumeX, Volume2, Eye, ChevronLeft, ChevronRight, Video } from "lucide-react";

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
    id: "stretch-film",
    title: "Transparent Stretch Film Roll",
    description: "Perfect for Cartons, Furniture, Luggage & Appliances Packing",
    url: "https://flow-content.google/video/2069fedf-a8d4-45d4-aabf-516345492ad0?Expires=1784493517&KeyName=labs-flow-prod-cdn-key&Signature=AIqErRMpdW8OSvY1LWzZ39IpS0s",
    badge: "Packaging",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
  },
  {
    id: "relief-tarpaulin",
    title: "Emergency Relief Tarpaulin",
    description: "Heavy Duty Waterproof Shelter Protection",
    url: "https://flow-content.google/video/06f5012d-78f3-4af7-92c1-444c3b4fa91e?Expires=1784493896&KeyName=labs-flow-prod-cdn-key&Signature=PyegshExSmhfn8RoGpI3U6E5-Rg",
    badge: "Relief",
    badgeColor: "bg-red-500/10 text-red-400 border-red-500/20"
  },
  {
    id: "construction-polythene",
    title: "Construction Polythene Sheet",
    description: "Road & Roof Dhalai Protection",
    url: "https://flow-content.google/video/d51a2594-ab70-40ea-a73e-a686f7351baf?Expires=1784494096&KeyName=labs-flow-prod-cdn-key&Signature=ohXw2PCYe9AgiF_Y_ItsqF7NPCM",
    badge: "Construction",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20"
  },
  {
    id: "yellow-plastic",
    title: "Yellow Plastic Sheet",
    description: "Heavy Duty Multipurpose Plastic Roll",
    url: "https://flow-content.google/video/3f5b72ea-7520-4a2d-9d16-e7759f77b1d0?Expires=1784494456&KeyName=labs-flow-prod-cdn-key&Signature=rrPersogD1gXWcpedLeVUhrdRjA",
    badge: "Plastic Sheet",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20"
  },
  {
    id: "shalimar-tarpaulin",
    title: "Shalimar Heavy Duty Tarpaulin",
    description: "Premium Waterproof Truck Cover",
    url: "https://flow-content.google/video/4e26b34b-f992-4bea-9c8b-f747ef32adc1?Expires=1784494765&KeyName=labs-flow-prod-cdn-key&Signature=O4z3dY2p4hFIg3BZizE4sbvUa5o",
    badge: "Tarpaulin",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20"
  },
  {
    id: "agriculture-sheet",
    title: "Premium Agriculture Sheet",
    description: "High GSM Crop, Silage & Mulching Protection",
    url: "https://flow-content.google/video/2e09bebb-4e62-4e2a-9ec5-65475523c4f1?Expires=1784496365&KeyName=labs-flow-prod-cdn-key&Signature=QwwOadwt7myDZmg48y6E29QsTno",
    badge: "Agriculture",
    badgeColor: "bg-teal-500/10 text-teal-400 border-teal-500/20"
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Manage video autoplay/pause based on active slide visibility in viewport
  useEffect(() => {
    if (!videoRef.current) return;
    if (isActive) {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  const handleCardClick = (e: React.MouseEvent) => {
    // If user dragged, do not trigger click/lightbox
    if (hasDraggedRef.current) {
      e.stopPropagation();
      return;
    }
    onSelect(video);
  };

  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    }
  };

  return (
    <div
      className="group relative flex flex-col bg-white rounded-[20px] shadow-lg overflow-hidden border border-slate-100 hover:border-[#FF7A00]/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,122,0,0.15)] cursor-grab active:cursor-grabbing h-full select-none"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Aspect Ratio Box for Video */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950 pointer-events-none">
        
        {/* Loading Skeleton */}
        {isLoading && (
          <div className="absolute inset-0 bg-slate-900 flex flex-col justify-between p-4 animate-pulse">
            <div className="h-6 w-20 bg-slate-800 rounded-full" />
            <div className="flex justify-center items-center h-full">
              <div className="w-10 h-10 rounded-full bg-slate-800" />
            </div>
          </div>
        )}

        <video
          ref={videoRef}
          src={video.url}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${isHovered ? "scale-105" : "scale-100"}`}
          muted
          playsInline
          loop
          preload="metadata"
          onLoadedData={() => setIsLoading(false)}
        />

        {/* Ambient Dark Overlay on Normal View */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

        {/* Floating Category Badge */}
        <div className={`absolute top-4 left-4 border backdrop-blur-md font-mono text-[11px] font-extrabold px-3 py-1 rounded-full shadow-sm z-10 ${video.badgeColor}`}>
          {video.badge}
        </div>

        {/* Floating Play Indicator over Video (shows when not hovered) */}
        <div className="absolute inset-0 flex items-center justify-center sm:group-hover:opacity-0 transition-opacity duration-300">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center text-white shadow-xl transform scale-100 group-hover:scale-110 transition-transform duration-300">
            <Play className="w-5 h-5 fill-white ml-0.5 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col justify-between flex-grow text-left">
        <div>
          <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight mb-2 group-hover:text-[#FF7A00] transition-colors duration-200">
            {video.title}
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm font-semibold leading-relaxed">
            {video.description}
          </p>
        </div>
        
        {/* Play Highlight Bar */}
        <div className="flex items-center gap-1.5 mt-5 text-[11px] font-black text-[#FF7A00] uppercase tracking-wider">
          <Eye className="w-4 h-4" />
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
  const [lightboxMuted, setLightboxMuted] = useState(false);
  const lightboxVideoRef = useRef<HTMLVideoElement>(null);

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

  // Sync mute status when lightbox video opens
  useEffect(() => {
    if (selectedVideo && lightboxVideoRef.current) {
      lightboxVideoRef.current.muted = lightboxMuted;
    }
  }, [selectedVideo, lightboxMuted]);

  const toggleLightboxMute = () => {
    if (lightboxVideoRef.current) {
      const targetState = !lightboxMuted;
      lightboxVideoRef.current.muted = targetState;
      setLightboxMuted(targetState);
    }
  };

  const getWhatsAppMessage = (videoTitle: string) => {
    const text = `Hi Mr. Vinod Kumar, I watched the application video for *${videoTitle}* on your website. I want to inquire about bulk wholesale pricing and order process for my store.`;
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
                  {/* Mute Control */}
                  <button
                    onClick={toggleLightboxMute}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer border border-white/5"
                    aria-label={lightboxMuted ? "Unmute video" : "Mute video"}
                    title={lightboxMuted ? "Unmute video" : "Mute video"}
                  >
                    {lightboxMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  
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

              {/* Dynamic Video */}
              <div className="relative aspect-[16/9] bg-black">
                <video
                  ref={lightboxVideoRef}
                  src={selectedVideo.url}
                  className="w-full h-full object-contain"
                  autoPlay
                  controls
                  playsInline
                  loop
                  preload="auto"
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
                    className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white px-5 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-colors shadow-md"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>Inquire via WhatsApp</span>
                  </a>

                  <button
                    onClick={() => {
                      setSelectedVideo(null);
                      onEnquire(`Inquiry for product video: ${selectedVideo.title}`);
                    }}
                    className="flex items-center gap-1.5 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white px-5 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-colors shadow-md"
                  >
                    <Sparkles className="w-4 h-4 text-white" />
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

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { Play, ChevronLeft, ChevronRight, Sparkles, Volume2, VolumeX, RotateCw } from "lucide-react";

interface ProductVideosSectionProps {
  lang?: "en" | "hi";
  onEnquire?: (subject: string) => void;
}

interface VideoSourceItem {
  id: string;
  url: string;
  defaultRotate?: number; // 0, 90, 180, 270
}

const VIDEO_ITEMS: VideoSourceItem[] = [
  {
    id: "video-cheetah",
    url: "https://cheetahmp4.edgeone.dev/",
    defaultRotate: 0,
  },
  {
    id: "video-polynet",
    url: "https://polynet.edgeone.dev/",
    defaultRotate: 0,
  },
  {
    id: "video-polymat",
    url: "https://polymat.edgeone.dev/",
    defaultRotate: 0,
  },
  {
    id: "video-shisha",
    url: "https://shisha.edgeone.dev/",
    defaultRotate: 0,
  },
  {
    id: "video-1",
    url: "https://dhalai.edgeone.dev/",
    defaultRotate: 90,
  },
  {
    id: "video-2",
    url: "https://stretchi.edgeone.dev/",
    defaultRotate: 0,
  },
  {
    id: "video-3",
    url: "https://hopep.edgeone.dev/",
    defaultRotate: 0,
  },
  {
    id: "video-4",
    url: "https://stretch.edgeone.dev/",
    defaultRotate: 90,
  },
  {
    id: "video-5",
    url: "https://sensible-blush-cjql8l17.edgeone.dev/",
    defaultRotate: 90,
  },
];

interface HTML5VideoSlideProps {
  item: VideoSourceItem;
  index: number;
  isActive: boolean;
  isSectionVisible: boolean;
  onSelectSlide: (index: number) => void;
  onVideoPlay: (index: number) => void;
  onVideoEnded: (index: number) => void;
  onVideoPause: (index: number) => void;
}

const HTML5VideoSlide: React.FC<HTML5VideoSlideProps> = ({
  item,
  index,
  isActive,
  isSectionVisible,
  onSelectSlide,
  onVideoPlay,
  onVideoEnded,
  onVideoPause,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [rotation, setRotation] = useState<number>(item.defaultRotate || 0);

  // Autoplay management: ONLY play when active AND the section is visible on screen
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive && isSectionVisible) {
      video.muted = isMuted;
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false);
        });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [isActive, isSectionVisible, isMuted]);

  const handlePlay = () => {
    setIsPlaying(true);
    onVideoPlay(index);
  };

  const handlePause = () => {
    setIsPlaying(false);
    onVideoPause(index);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    onVideoEnded(index);
  };

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (!isActive) {
      onSelectSlide(index);
      return;
    }

    if (video.paused) {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const newMuted = !video.muted;
    video.muted = newMuted;
    setIsMuted(newMuted);
  };

  const handleManualRotate = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRotation((prev) => (prev + 90) % 360);
  };

  const isRotated90or270 = rotation === 90 || rotation === 270;

  return (
    <div
      onClick={() => {
        if (!isActive) onSelectSlide(index);
      }}
      className="relative flex-shrink-0 transition-all duration-300 select-none flex flex-col items-center justify-center cursor-pointer w-[260px] sm:w-[290px] md:w-[310px] aspect-[9/16]"
    >
      <div
        className={`relative w-full h-full bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 flex items-center justify-center ${
          isActive
            ? "shadow-2xl ring-2 ring-orange-500 scale-100 border-2 border-orange-400"
            : "shadow-md opacity-75 hover:opacity-100 scale-95 border border-slate-200/80"
        }`}
      >
        {/* Video Canvas with Uniform 9:16 Portrait Ratio & Rotation Transformation */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-black">
          <video
            ref={videoRef}
            src={item.url}
            muted
            playsInline
            preload="metadata"
            disablePictureInPicture
            controlsList="nodownload noplaybackrate"
            style={
              isRotated90or270
                ? {
                    width: "177.78%",
                    height: "56.25%",
                    transform: `rotate(${rotation}deg)`,
                    objectFit: "cover",
                  }
                : {
                    width: "100%",
                    height: "100%",
                    transform: rotation !== 0 ? `rotate(${rotation}deg)` : undefined,
                    objectFit: "cover",
                  }
            }
            className="max-w-none rounded-2xl sm:rounded-3xl transition-transform duration-300"
            onPlay={handlePlay}
            onPause={handlePause}
            onEnded={handleEnded}
            onClick={handleTogglePlay}
          >
            <source src={item.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Play / Pause Central Click Overlay when paused */}
        {!isPlaying && (
          <div
            onClick={handleTogglePlay}
            className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 hover:bg-black/40 backdrop-blur-[2px] transition-all cursor-pointer"
            aria-label="Play video"
            role="button"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/35 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-xl transform scale-95 hover:scale-105 transition-all">
              <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-white ml-1" />
            </div>
          </div>
        )}

        {/* Top Control Actions: Rotation Toggle + Sound Mute/Unmute */}
        <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-2">
          {/* Rotate Toggle */}
          <button
            onClick={handleManualRotate}
            title="Rotate Video"
            className="w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 backdrop-blur-md text-white flex items-center justify-center transition-all opacity-80 hover:opacity-100 cursor-pointer shadow-md"
            aria-label="Rotate video"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>

          {/* Quick Unmute / Mute Toggle */}
          <button
            onClick={handleToggleMute}
            title={isMuted ? "Unmute video" : "Mute video"}
            className="w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 backdrop-blur-md text-white flex items-center justify-center transition-all opacity-80 hover:opacity-100 cursor-pointer shadow-md"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Uniform 9:16 Portrait Badge */}
        <div className="absolute bottom-3.5 left-3.5 z-20 px-2.5 py-1 rounded-md bg-black/50 backdrop-blur-md text-[10px] font-mono text-white/90 uppercase tracking-wider pointer-events-none flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
          <span>📱 9:16 Portrait</span>
        </div>
      </div>
    </div>
  );
};

export const ProductVideosSection: React.FC<ProductVideosSectionProps> = ({
  lang = "en",
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  // Monitor if section is actually in the user's viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Safe horizontal-only scroll without ever moving the window scroll position!
  const scrollToSlide = useCallback((index: number) => {
    if (!sliderContainerRef.current) return;
    const clampedIndex = (index + VIDEO_ITEMS.length) % VIDEO_ITEMS.length;
    setActiveIndex(clampedIndex);

    const container = sliderContainerRef.current;
    const targetSlide = container.children[clampedIndex] as HTMLElement;
    if (targetSlide) {
      const slideLeft = targetSlide.offsetLeft;
      const slideWidth = targetSlide.offsetWidth;
      const containerWidth = container.offsetWidth;
      const targetScrollLeft = slideLeft - (containerWidth - slideWidth) / 2;

      // STRICTLY scrolls the container's horizontal axis ONLY (no window scroll)
      container.scrollTo({
        left: Math.max(0, targetScrollLeft),
        behavior: "smooth",
      });
    }
  }, []);

  // When current active video ends, move ONLY horizontally to the next slide
  const handleVideoEnded = useCallback((endedIndex: number) => {
    // Only auto-advance if the section is currently visible to the user
    if (isSectionVisible) {
      const nextIndex = (endedIndex + 1) % VIDEO_ITEMS.length;
      scrollToSlide(nextIndex);
    }
  }, [isSectionVisible, scrollToSlide]);

  const handleVideoPlay = (_index: number) => {
    // Playing
  };

  const handleVideoPause = (_index: number) => {
    // Paused
  };

  const handlePrev = () => {
    const prev = activeIndex > 0 ? activeIndex - 1 : VIDEO_ITEMS.length - 1;
    scrollToSlide(prev);
  };

  const handleNext = () => {
    const next = activeIndex < VIDEO_ITEMS.length - 1 ? activeIndex + 1 : 0;
    scrollToSlide(next);
  };

  // Listen to slider horizontal scroll to update activeIndex
  const handleScroll = () => {
    if (!sliderContainerRef.current) return;
    const container = sliderContainerRef.current;
    const containerCenter = container.getBoundingClientRect().left + container.offsetWidth / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    Array.from(container.children).forEach((child, i) => {
      const rect = (child as HTMLElement).getBoundingClientRect();
      const childCenter = rect.left + rect.width / 2;
      const distance = Math.abs(containerCenter - childCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="video-gallery"
      className="relative bg-white py-14 sm:py-18 lg:py-22 overflow-hidden text-slate-900 border-b border-slate-200/80 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Navigation Indicator */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-[#FF7A00] font-mono text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-3">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>{lang === "en" ? "Interactive Video Slider" : "इंटरएक्टिव वीडियो स्लाइडर"}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-[#0B2D5C] tracking-tight leading-tight mb-2">
              {lang === "en" ? "Real Applications of Our Products" : "हमारे उत्पादों के वास्तविक अनुप्रयोग"}
            </h2>

            <p className="text-slate-600 text-sm sm:text-base font-semibold">
              {lang === "en"
                ? "Continuous auto-playing application videos in uniform, balanced 9:16 portrait view. Slide to explore."
                : "यूनिफॉर्म 9:16 पोर्ट्रेट व्यू में लगातार ऑटो-प्ले होने वाली वीडियो गैलरी। सभी वीडियो देखने के लिए स्लाइड करें।"}
            </p>
          </div>

          {/* Top Counter Display */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-600 self-start md:self-auto select-none">
            <span>Video</span>
            <span className="text-orange-600 font-black">{activeIndex + 1}</span>
            <span>of</span>
            <span>{VIDEO_ITEMS.length}</span>
          </div>
        </div>

        {/* HORIZONTAL SLIDER / CAROUSEL CONTAINER */}
        <div className="relative">
          <div
            ref={sliderContainerRef}
            onScroll={handleScroll}
            className="flex items-center gap-5 sm:gap-7 overflow-x-auto pb-6 pt-2 px-2 scrollbar-none snap-x snap-mandatory scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {VIDEO_ITEMS.map((item, index) => (
              <div key={item.id} className="snap-center flex-shrink-0">
                <HTML5VideoSlide
                  item={item}
                  index={index}
                  isActive={activeIndex === index}
                  isSectionVisible={isSectionVisible}
                  onSelectSlide={scrollToSlide}
                  onVideoPlay={handleVideoPlay}
                  onVideoEnded={handleVideoEnded}
                  onVideoPause={handleVideoPause}
                />
              </div>
            ))}
          </div>

          {/* Slide Navigation Controls: Left Arrow at Initial + Dots in Center + Right Arrow at Final */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6">
            {/* Left Arrow (Initial) */}
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-orange-500 hover:text-white text-slate-700 border border-slate-200/90 flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer"
              aria-label="Previous Video Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {VIDEO_ITEMS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToSlide(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === i
                      ? "w-8 bg-orange-600"
                      : "w-2.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Right Arrow (Final) */}
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-orange-500 hover:text-white text-slate-700 border border-slate-200/90 flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer"
              aria-label="Next Video Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProductVideosSection;

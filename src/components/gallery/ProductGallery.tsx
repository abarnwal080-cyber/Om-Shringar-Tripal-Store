import React, { useState, useRef, useEffect, MouseEvent } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ZoomIn,
  ZoomOut,
  X,
  Play,
  RotateCw,
  Volume2,
  VolumeX,
  Award,
  Video,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  isBestSeller?: boolean;
  video?: {
    url: string;
    title: string;
    defaultRotate?: number;
  };
  videos?: {
    url: string;
    title: string;
    defaultRotate?: number;
  }[];
}

export default function ProductGallery({
  images,
  productName,
  isBestSeller,
  video,
  videos,
}: ProductGalleryProps) {
  const allVideos = videos && videos.length > 0 ? videos : video ? [video] : [];
  
  // If selectedVideoIndex !== null, it represents the active video slide
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxZoom, setLightboxZoom] = useState(1);

  // Video State
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [rotation, setRotation] = useState<number>(0);

  const isViewingVideo = selectedVideoIndex !== null && allVideos[selectedVideoIndex] !== undefined;
  const currentVideo = isViewingVideo ? allVideos[selectedVideoIndex!] : null;

  // Desktop Hover Zoom state for images
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Touch swipe handling for mobile
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Reset selected image/video when images list or product changes
  useEffect(() => {
    setSelectedVideoIndex(null);
    setSelectedIndex(0);
    setIsPlaying(false);
    if (allVideos.length > 0) {
      setRotation(allVideos[0].defaultRotate || 0);
    }
  }, [productName, images]);

  // When active video changes, immediately load new video and apply correct rotation
  useEffect(() => {
    if (currentVideo) {
      setRotation(currentVideo.defaultRotate || 0);
      setIsPlaying(true);
      if (videoRef.current) {
        try {
          videoRef.current.load();
          videoRef.current.play().catch(() => {
            // Autoplay policy fallback: mute and play
            if (videoRef.current) {
              videoRef.current.muted = true;
              setIsMuted(true);
              videoRef.current.play().catch(() => {});
            }
          });
        } catch {
          // ignore
        }
      }
    }
  }, [currentVideo?.url]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, images.length, allVideos.length]);

  const totalSlides = images.length + allVideos.length;

  const handleNext = () => {
    if (isViewingVideo && selectedVideoIndex !== null) {
      if (selectedVideoIndex < allVideos.length - 1) {
        const nextV = selectedVideoIndex + 1;
        setSelectedVideoIndex(nextV);
        setRotation(allVideos[nextV].defaultRotate || 0);
      } else {
        setSelectedVideoIndex(null);
        setSelectedIndex(0);
      }
    } else {
      if (selectedIndex < images.length - 1) {
        setSelectedIndex((prev) => prev + 1);
      } else if (allVideos.length > 0) {
        setSelectedVideoIndex(0);
        setRotation(allVideos[0].defaultRotate || 0);
      } else {
        setSelectedIndex(0);
      }
    }
  };

  const handlePrev = () => {
    if (isViewingVideo && selectedVideoIndex !== null) {
      if (selectedVideoIndex > 0) {
        const prevV = selectedVideoIndex - 1;
        setSelectedVideoIndex(prevV);
        setRotation(allVideos[prevV].defaultRotate || 0);
      } else {
        setSelectedVideoIndex(null);
        setSelectedIndex(images.length - 1);
      }
    } else {
      if (selectedIndex > 0) {
        setSelectedIndex((prev) => prev - 1);
      } else if (allVideos.length > 0) {
        const lastV = allVideos.length - 1;
        setSelectedVideoIndex(lastV);
        setRotation(allVideos[lastV].defaultRotate || 0);
      } else {
        setSelectedIndex(images.length - 1);
      }
    }
  };

  // Mouse move for hover zoom lens on desktop
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  // Touch event handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      handleNext();
    } else if (distance < -50) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const toggleVideoPlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const rotateVideo = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const currentImage = selectedIndex >= 0 ? images[selectedIndex] || images[0] : "";

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Primary Stage Display */}
      <div className="relative w-full aspect-square sm:aspect-[4/3] md:aspect-square bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm group select-none flex items-center justify-center">
        {/* Best Seller / Popular Badge */}
        {isBestSeller && !isViewingVideo && (
          <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-white font-extrabold text-[11px] shadow-md tracking-wider uppercase">
            <Award className="w-3.5 h-3.5" />
            <span>Best Seller</span>
          </div>
        )}

        {/* Video Active Badge */}
        {isViewingVideo && (
          <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-600 text-white font-black text-[11px] shadow-md tracking-wider uppercase">
            <Video className="w-3.5 h-3.5 animate-pulse" />
            <span>{allVideos.length > 1 && selectedVideoIndex !== null ? `Video ${selectedVideoIndex + 1}` : "Product Video"}</span>
          </div>
        )}

        {/* Quick Button to Jump to Video if currently on image */}
        {allVideos.length > 0 && !isViewingVideo && (
          <button
            onClick={() => {
              setSelectedVideoIndex(0);
              setIsPlaying(true);
              setRotation(allVideos[0].defaultRotate || 0);
            }}
            className="absolute bottom-4 left-4 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 hover:bg-orange-600 text-white font-bold text-xs shadow-lg backdrop-blur-md transition-all cursor-pointer hover:scale-105 active:scale-95 border border-white/20"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Watch Video {allVideos.length > 1 ? `(1/${allVideos.length})` : ""}</span>
          </button>
        )}

        {/* Expand / Fullscreen Button (for Image) */}
        {!isViewingVideo && (
          <button
            onClick={() => {
              setLightboxZoom(1);
              setIsLightboxOpen(true);
            }}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 flex items-center justify-center shadow-md backdrop-blur-xs transition-all cursor-pointer hover:scale-105 active:scale-95"
            aria-label="View Fullscreen"
            title="Click to view fullscreen gallery"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        )}

        {/* MAIN DISPLAY: Either Video or Image */}
        {isViewingVideo && currentVideo ? (
          /* Video Player View */
          <div className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden">
            <video
              key={currentVideo.url}
              ref={videoRef}
              src={currentVideo.url}
              autoPlay
              loop
              playsInline
              muted={isMuted}
              onClick={toggleVideoPlay}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full h-full object-contain transition-transform duration-300 cursor-pointer"
              style={{
                transform: `rotate(${rotation}deg) scale(${rotation % 180 !== 0 ? 0.75 : 1})`,
              }}
            />

            {/* Overlay Video Controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

            {/* Center Play/Pause button overlay if paused */}
            {!isPlaying && (
              <button
                onClick={toggleVideoPlay}
                className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-orange-500/90 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform cursor-pointer z-20"
                aria-label="Play Video"
              >
                <Play className="w-8 h-8 fill-current ml-1" />
              </button>
            )}

            {/* Bottom Floating Control Bar */}
            <div className="absolute bottom-3 inset-x-3 z-20 flex items-center justify-between px-4 py-2 rounded-2xl bg-black/70 backdrop-blur-md text-white border border-white/15 text-xs font-semibold">
              <button
                onClick={toggleVideoPlay}
                className="flex items-center gap-1.5 hover:text-orange-400 transition-colors cursor-pointer"
              >
                <Play className={`w-4 h-4 ${isPlaying ? "fill-orange-400 text-orange-400" : ""}`} />
                <span>{isPlaying ? "Pause" : "Play"}</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={rotateVideo}
                  className="flex items-center gap-1.5 hover:text-orange-400 transition-colors cursor-pointer bg-white/10 px-2.5 py-1 rounded-lg"
                  title="Rotate Video 90°"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Rotate ({rotation}°)</span>
                </button>

                <button
                  onClick={toggleMute}
                  className="p-1.5 rounded-lg hover:bg-white/15 text-white transition-colors cursor-pointer"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Image View with Desktop Hover Zoom */
          <div
            ref={imageContainerRef}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={() => {
              setLightboxZoom(1);
              setIsLightboxOpen(true);
            }}
            className="w-full h-full cursor-zoom-in relative overflow-hidden flex items-center justify-center p-4 bg-white"
          >
            <img
              src={currentImage}
              alt={`${productName} - Image ${selectedIndex + 1}`}
              referrerPolicy="no-referrer"
              loading="eager"
              className={`w-full h-full object-contain transition-transform duration-200 ease-out pointer-events-none ${
                isHovering ? "scale-150" : "scale-100"
              }`}
              style={
                isHovering
                  ? {
                      transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                    }
                  : undefined
              }
            />

            {/* Desktop Zoom Instruction Overlay */}
            <div className="absolute bottom-3 right-3 z-10 hidden sm:flex items-center gap-1 bg-slate-900/60 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-full pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-3 h-3" />
              <span>Hover to zoom • Click for fullscreen</span>
            </div>
          </div>
        )}

        {/* Navigation Arrows */}
        {totalSlides > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label="Previous Slide"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-md backdrop-blur-xs transition-all active:scale-90 hover:scale-105 cursor-pointer opacity-80 group-hover:opacity-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Next Slide"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-md backdrop-blur-xs transition-all active:scale-90 hover:scale-105 cursor-pointer opacity-80 group-hover:opacity-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Strip with Video support */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-thin">
        {/* Videos Thumbnails */}
        {allVideos.map((vid, vIdx) => {
          const isSelected = isViewingVideo && selectedVideoIndex === vIdx;
          return (
            <button
              key={vid.url + vIdx}
              type="button"
              onClick={() => {
                setSelectedVideoIndex(vIdx);
                setIsPlaying(true);
                setRotation(vid.defaultRotate || 0);
              }}
              className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 bg-slate-900 shrink-0 transition-all cursor-pointer flex flex-col items-center justify-center p-1 ${
                isSelected
                  ? "border-orange-500 ring-2 ring-orange-500/30 shadow-md scale-102"
                  : "border-slate-200/80 hover:border-orange-400 opacity-80 hover:opacity-100"
              }`}
              title={vid.title || `Watch Video ${vIdx + 1}`}
            >
              <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-md mb-1">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
              <span className="text-[10px] font-black uppercase text-white tracking-wider text-center line-clamp-1 px-1">
                {allVideos.length > 1 ? `Video ${vIdx + 1}` : "Video"}
              </span>
            </button>
          );
        })}

        {/* Images Thumbnails */}
        {images.map((img, idx) => {
          const isSelected = !isViewingVideo && selectedIndex === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setSelectedVideoIndex(null);
                setSelectedIndex(idx);
              }}
              className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 bg-white shrink-0 transition-all cursor-pointer ${
                isSelected
                  ? "border-orange-500 ring-2 ring-orange-500/20 shadow-md scale-102"
                  : "border-slate-200/80 hover:border-slate-300 opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain p-1"
              />
            </button>
          );
        })}
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {isLightboxOpen && !isViewingVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 select-none"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Top Lightbox Controls */}
            <div
              className="flex items-center justify-between text-white py-2 px-2 z-30"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs sm:text-sm font-bold text-slate-300">
                  {selectedIndex + 1} / {images.length}
                </span>
                <span className="hidden sm:inline text-xs text-slate-400 truncate max-w-md">
                  {productName}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLightboxZoom((prev) => Math.max(1, prev - 0.5))}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setLightboxZoom((prev) => Math.min(3, prev + 0.5))}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsLightboxOpen(false)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer ml-2"
                  title="Close (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Middle Main Image Stage */}
            <div
              className="flex-1 flex items-center justify-center relative overflow-hidden my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: lightboxZoom }}
                transition={{ duration: 0.2 }}
                src={currentImage}
                alt={productName}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] max-w-[90vw] object-contain cursor-default"
              />

              {/* Prev / Next Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    aria-label="Previous"
                    className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-7 h-7" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next"
                    className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer"
                  >
                    <ChevronRight className="w-7 h-7" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Thumbnail Strip in Lightbox */}
            {images.length > 1 && (
              <div
                className="flex items-center justify-center gap-2 overflow-x-auto py-2 z-30"
                onClick={(e) => e.stopPropagation()}
              >
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedIndex(idx);
                      setLightboxZoom(1);
                    }}
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border-2 bg-white/5 transition-all cursor-pointer ${
                      idx === selectedIndex
                        ? "border-orange-500 scale-110"
                        : "border-transparent opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

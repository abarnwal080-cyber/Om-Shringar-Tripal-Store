import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface SupplierPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUPPLIER_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes">
  <title>Vinod Kumar Varnawal | Quality Promise</title>
  <!-- Font Awesome 6 for icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      background: #ffffff;
      font-family: 'Segoe UI', 'Poppins', system-ui, -apple-system, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      padding: 1.5rem;
      position: relative;
      overflow-x: hidden;
      overflow-y: auto;
    }

    /* subtle white bg with soft radial glow for depth */
    body::before {
      content: "";
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at 30% 40%, rgba(245, 245, 255, 0.7) 0%, rgba(255, 255, 255, 1) 80%);
      z-index: -2;
    }

    .card {
      max-width: 620px;
      width: 100%;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(18px);
      border-radius: 2.5rem;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08), 0 8px 20px rgba(0, 20, 40, 0.05);
      padding: 1.8rem 1.6rem 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      transition: all 0.3s ease;
      border: 1px solid rgba(0, 0, 0, 0.03);
      position: relative;
      z-index: 2;
      animation: floatIn 1s cubic-bezier(0.23, 1, 0.32, 1) forwards;
    }

    @keyframes floatIn {
      0% {
        opacity: 0;
        transform: translateY(35px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* cute frame container for owner / store / warehouse images */
    .frames-container {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      gap: 1.2rem;
      margin-bottom: 0.5rem;
      flex-wrap: wrap;
    }

    .frame-item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .frame-label {
      font-size: 0.72rem;
      font-weight: 700;
      color: #6b4d27;
      margin-top: 0.3rem;
      background: #f8f1e5;
      padding: 0.2rem 0.6rem;
      border-radius: 12px;
      border: 1px solid #ebdcc8;
      letter-spacing: 0.2px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.03);
    }

    .owner-frame {
      position: relative;
      width: 110px;
      height: 110px;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: softPulse 3s infinite alternate ease-in-out;
    }

    @keyframes softPulse {
      0% {
        transform: scale(1);
        filter: drop-shadow(0 8px 14px rgba(255, 180, 100, 0.25));
      }
      100% {
        transform: scale(1.02);
        filter: drop-shadow(0 18px 20px rgba(255, 160, 80, 0.3));
      }
    }

    .cute-border-svg {
      position: absolute;
      top: -14px;
      left: -14px;
      width: calc(100% + 28px);
      height: calc(100% + 28px);
      z-index: 0;
      animation: rotateFrame 25s infinite linear;
    }

    @keyframes rotateFrame {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    .owner-img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      object-position: center 20%;
      border: 3px solid white;
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
      position: relative;
      z-index: 2;
      background: #f0e6d2;
      transition: transform 0.4s;
    }

    .owner-frame:hover .owner-img {
      transform: scale(1.03);
    }

    /* decorative tiny stars/dots around frame */
    .frame-sparkle {
      position: absolute;
      font-size: 0.9rem;
      color: #ffb142;
      z-index: 3;
      animation: sparkleFloat 2.5s infinite alternate;
      filter: drop-shadow(0 0 5px rgba(255, 200, 100, 0.7));
    }

    .sparkle1 { top: -5px; right: -5px; animation-delay: 0s; }
    .sparkle2 { bottom: 2px; left: -8px; animation-delay: 0.6s; }
    .sparkle3 { top: 20px; left: -12px; animation-delay: 1.2s; color: #f39c12; }
    .sparkle4 { bottom: 10px; right: -10px; animation-delay: 0.3s; color: #f6a83e; }

    @keyframes sparkleFloat {
      0% { opacity: 0.4; transform: translateY(0px) scale(0.9); }
      100% { opacity: 1; transform: translateY(-5px) scale(1.2); }
    }

    h1 {
      font-size: 1.35rem;
      font-weight: 700;
      color: #1e2b3c;
      margin-top: 0.1rem;
      letter-spacing: -0.3px;
      line-height: 1.2;
      background: linear-gradient(135deg, #1e2b3c 0%, #2c3e50 80%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .owner-name {
      font-size: 1.5rem;
      font-weight: 800;
      background: linear-gradient(to right, #b76e2e, #d4943a, #b56a2c);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin: 0.2rem 0 0.1rem;
      animation: shimmer 3s infinite alternate;
    }

    @keyframes shimmer {
      0% { filter: brightness(1); }
      100% { filter: brightness(1.15); }
    }

    .title-badge {
      background: #f9efe2;
      color: #8b5a2b;
      padding: 0.3rem 1.1rem;
      border-radius: 30px;
      font-weight: 600;
      font-size: 0.8rem;
      letter-spacing: 0.3px;
      margin: 0.5rem 0 0.9rem;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      border: 1px solid #e7cfb0;
      backdrop-filter: blur(5px);
      animation: fadeBadge 1.8s ease-out;
    }

    @keyframes fadeBadge {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .message-box {
      background: #fafbfc;
      border-radius: 1.8rem;
      padding: 1.2rem 1.4rem;
      margin: 0.6rem 0 1rem;
      box-shadow: inset 0 1px 6px rgba(0,0,0,0.02), 0 10px 20px -10px rgba(0,0,0,0.08);
      border: 1px solid #f0eee7;
      width: 100%;
      position: relative;
      animation: slideUp 0.9s ease;
    }

    @keyframes slideUp {
      0% { opacity: 0; transform: translateY(15px); }
      100% { opacity: 1; transform: translateY(0); }
    }

    .message-text {
      font-size: 0.95rem;
      line-height: 1.55;
      color: #2d3a4a;
      font-weight: 500;
      text-align: center;
    }

    .message-text i {
      color: #d4943a;
      margin: 0 3px;
      font-size: 0.8rem;
      vertical-align: middle;
    }

    .highlight {
      font-weight: 700;
      color: #b76e2e;
      background: linear-gradient(to right, #fff3e0, transparent);
      padding: 0 4px;
      border-radius: 4px;
    }

    .product-grid {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 0.8rem;
      margin: 1rem 0 0.6rem;
      width: 100%;
    }

    .product-tag {
      background: white;
      border-radius: 3rem;
      padding: 0.6rem 1.1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 650;
      font-size: 0.825rem;
      color: #1e2b3c;
      box-shadow: 0 6px 14px rgba(0,0,0,0.03);
      border: 1px solid #ede7dc;
      transition: all 0.25s;
      animation: popIn 0.7s ease backwards;
      background: #ffffff;
    }

    .product-tag:nth-child(1) { animation-delay: 0.1s; }
    .product-tag:nth-child(2) { animation-delay: 0.25s; }
    .product-tag:nth-child(3) { animation-delay: 0.4s; }

    @keyframes popIn {
      0% { opacity: 0; transform: scale(0.8); }
      100% { opacity: 1; transform: scale(1); }
    }

    .product-tag i {
      font-size: 1.1rem;
      color: #d4943a;
      transition: transform 0.2s;
    }

    .product-tag:hover {
      transform: translateY(-3px);
      border-color: #d4943a;
      box-shadow: 0 12px 20px -10px rgba(180, 120, 50, 0.2);
    }

    .product-tag:hover i {
      transform: rotate(5deg) scale(1.1);
    }

    .promise-seal {
      margin-top: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.6rem;
      background: #fffbf5;
      border-radius: 4rem;
      padding: 0.6rem 1.5rem;
      border: 1px dashed #d4943a;
      color: #5e3a1c;
      font-weight: 600;
      font-size: 0.85rem;
      animation: gentleBounce 2.2s infinite alternate;
    }

    @keyframes gentleBounce {
      0% { transform: translateY(0); }
      100% { transform: translateY(-4px); }
    }

    .promise-seal i {
      font-size: 1.2rem;
      color: #b76e2e;
    }

    .footer-note {
      margin-top: 0.8rem;
      font-size: 0.75rem;
      color: #6b5b4b;
      opacity: 0.8;
      font-style: italic;
    }

    @media (max-width: 500px) {
      .card {
        padding: 1.2rem 0.9rem;
        border-radius: 1.8rem;
      }
      .owner-frame {
        width: 100px;
        height: 100px;
      }
      .owner-name {
        font-size: 1.3rem;
      }
    }
  </style>
</head>
<body>
  <div class="card">
    <!-- Owner image inside cute frame -->
    <div class="owner-frame">
      <svg class="cute-border-svg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="88" stroke="#f7d9aa" stroke-width="3" stroke-dasharray="10 8" fill="none" opacity="0.9" />
        <circle cx="100" cy="100" r="98" stroke="#fad390" stroke-width="2.5" stroke-dasharray="6 10" fill="none" opacity="0.8" />
        <circle cx="100" cy="12" r="5" fill="#f6b83d" opacity="0.8" />
        <circle cx="100" cy="188" r="5" fill="#f6b83d" opacity="0.8" />
        <circle cx="12" cy="100" r="5" fill="#f6b83d" opacity="0.8" />
        <circle cx="188" cy="100" r="5" fill="#f6b83d" opacity="0.8" />
      </svg>
      <span class="frame-sparkle sparkle1"><i class="fas fa-star"></i></span>
      <span class="frame-sparkle sparkle2"><i class="fas fa-star"></i></span>
      <span class="frame-sparkle sparkle3"><i class="fas fa-heart"></i></span>
      <span class="frame-sparkle sparkle4"><i class="fas fa-circle"></i></span>
      
      <img 
        src="https://plain-apac-prod-public.komododecks.com/202607/04/de0uRzABCTBM2Rp6uDZu/image.png" 
        alt="Mr. Vinod Kumar Varnawal" 
        class="owner-img"
        loading="eager"
      >
    </div>

    <h1>Mr. <span class="owner-name">Vinod Kumar Varnawal</span></h1>
    <div class="title-badge">
      <i class="fas fa-crown" style="color: #d4943a;"></i> Founder & Quality Guardian
    </div>

    <div class="message-box">
      <p class="message-text">
        <i class="fas fa-quote-left"></i> 
        Direct factory supply of <span class="highlight">plastic sheets, tarpaulins & fencing nets</span> — guaranteed quality & genuine brand trust. <i class="fas fa-quote-right"></i>
      </p>
    </div>

    <!-- Product highlights -->
    <div class="product-grid">
      <div class="product-tag">
        <i class="fas fa-box"></i> 
        <span>Plastic Sheets</span>
      </div>
      <div class="product-tag">
        <i class="fas fa-water"></i> 
        <span>Heavy Tarpaulins</span>
      </div>
      <div class="product-tag">
        <i class="fas fa-fence"></i> 
        <span>Fencing Nets</span>
      </div>
    </div>

    <!-- Quality promise seal -->
    <div class="promise-seal">
      <i class="fas fa-shield-alt"></i> 
      <span><strong>Promise:</strong> Genuine Quality · Direct Stock · Trust</span>
    </div>
  </div>

  <!-- subtle vanilla JS for interactive sparkle on hover -->
  <script>
    (function() {
      const frame = document.querySelector('.owner-frame');
      if (frame) {
        frame.addEventListener('click', function(e) {
          const sparkle = document.createElement('span');
          sparkle.className = 'frame-sparkle';
          sparkle.innerHTML = '<i class="fas fa-star"></i>';
          sparkle.style.left = (e.offsetX - 10) + 'px';
          sparkle.style.top = (e.offsetY - 10) + 'px';
          sparkle.style.position = 'absolute';
          sparkle.style.fontSize = '1.4rem';
          sparkle.style.color = '#f39c12';
          sparkle.style.zIndex = '5';
          sparkle.style.pointerEvents = 'none';
          frame.appendChild(sparkle);
          setTimeout(() => {
            if (sparkle && sparkle.parentNode) sparkle.remove();
          }, 700);
        });
      }
    })();
  </script>
</body>
</html>`;

export default function SupplierPopup({ isOpen, onClose }: SupplierPopupProps) {
  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-4xl h-[88vh] md:h-[82vh] bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-2xl z-10 flex flex-col"
          >
            {/* Header / Close controls */}
            <div className="absolute top-4 right-4 z-20">
              <button
                onClick={onClose}
                className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 rounded-full transition-all border border-slate-300 active:scale-95 cursor-pointer flex items-center justify-center shadow-md"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Dedicated placeholder container as requested */}
            <div id="supplier-popup-content" className="flex-grow w-full h-full p-2 md:p-4 overflow-hidden modal-scrollable-content overscroll-contain">
              <iframe
                title="Supplier Profile"
                srcDoc={SUPPLIER_HTML}
                className="w-full h-full border-0 rounded-2xl"
                sandbox="allow-scripts allow-same-origin allow-popups"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

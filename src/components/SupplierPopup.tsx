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
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Owner Product Intro Section</title>
  <style>
    :root {
      --bg: #0f172a;
      --card: rgba(15, 23, 42, 0.78);
      --card-border: rgba(255, 255, 255, 0.12);
      --text: #e5e7eb;
      --muted: #cbd5e1;
      --accent: #22c55e;
      --accent-2: #38bdf8;
      --shadow: 0 18px 50px rgba(0, 0, 0, 0.35);
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      font-family: Arial, Helvetica, sans-serif;
      background:
        radial-gradient(circle at top left, rgba(56, 189, 248, 0.18), transparent 32%),
        radial-gradient(circle at bottom right, rgba(34, 197, 94, 0.16), transparent 28%),
        linear-gradient(180deg, #020617 0%, #0f172a 100%);
      color: var(--text);
    }

    .owner-section {
      max-width: 1200px;
      margin: 0 auto;
      padding: 28px 16px;
    }

    .owner-card {
      display: grid;
      grid-template-columns: 1.05fr 1fr;
      gap: 24px;
      align-items: center;
      background: var(--card);
      border: 1px solid var(--card-border);
      border-radius: 28px;
      padding: 22px;
      box-shadow: var(--shadow);
      backdrop-filter: blur(14px);
      overflow: hidden;
      position: relative;
    }

    .owner-card::before {
      content: "";
      position: absolute;
      inset: auto -100px -120px auto;
      width: 260px;
      height: 260px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(34, 197, 94, 0.18), transparent 68%);
      pointer-events: none;
    }

    .image-wrap {
      position: relative;
      border-radius: 24px;
      overflow: hidden;
      min-height: 420px;
      background: #111827;
    }

    .image-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transform: scale(1.01);
      transition: transform 0.5s ease;
    }

    .image-wrap:hover img {
      transform: scale(1.05);
    }

    .badge {
      position: absolute;
      top: 16px;
      left: 16px;
      background: rgba(2, 6, 23, 0.72);
      border: 1px solid rgba(255, 255, 255, 0.15);
      padding: 10px 14px;
      border-radius: 999px;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.2px;
      backdrop-filter: blur(10px);
    }

    .content {
      padding: 6px 6px 6px 0;
    }

    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 14px;
      border-radius: 999px;
      background: rgba(34, 197, 94, 0.12);
      color: #bbf7d0;
      border: 1px solid rgba(34, 197, 94, 0.25);
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    h2 {
      margin: 16px 0 12px;
      font-size: clamp(28px, 4vw, 48px);
      line-height: 1.05;
    }

    .subtitle {
      margin: 0 0 20px;
      color: var(--muted);
      font-size: 16px;
      line-height: 1.75;
      max-width: 52ch;
    }

    .quote-box {
      position: relative;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-left: 4px solid var(--accent);
      border-radius: 20px;
      padding: 20px 18px;
      margin: 18px 0 18px;
    }

    .quote-box p {
      margin: 0;
      font-size: 16px;
      line-height: 1.8;
      color: #f8fafc;
    }

    .quote-box span {
      color: var(--accent-2);
      font-weight: 700;
    }

    .features {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
      margin: 18px 0 22px;
    }

    .feature {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 14px 14px;
      display: flex;
      align-items: center;
      gap: 10px;
      color: #e2e8f0;
      font-size: 14px;
      line-height: 1.4;
    }

    .dot {
      width: 10px;
      height: 10px;
      border-radius: 999px;
      background: linear-gradient(135deg, var(--accent), var(--accent-2));
      box-shadow: 0 0 0 6px rgba(34, 197, 94, 0.12);
      flex: 0 0 auto;
    }

    .actions {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }

    .btn {
      appearance: none;
      border: none;
      text-decoration: none;
      cursor: pointer;
      padding: 13px 18px;
      border-radius: 14px;
      font-weight: 700;
      font-size: 15px;
      transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }

    .btn-primary {
      background: linear-gradient(135deg, #22c55e, #16a34a);
      color: white;
      box-shadow: 0 12px 28px rgba(34, 197, 94, 0.28);
    }

    .btn-secondary {
      background: rgba(255, 255, 255, 0.06);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.12);
    }

    .btn:hover {
      transform: translateY(-2px);
    }

    .owner-name {
      margin-top: 16px;
      color: #dbeafe;
      font-weight: 700;
      font-size: 14px;
      letter-spacing: 0.04em;
    }

    .owner-name strong {
      color: white;
    }

    @media (max-width: 900px) {
      .owner-card {
        grid-template-columns: 1fr;
      }

      .content {
        padding: 0;
      }

      .image-wrap {
        min-height: 320px;
      }
    }

    @media (max-width: 560px) {
      .owner-section {
        padding: 14px;
      }

      .owner-card {
        padding: 14px;
        border-radius: 22px;
      }

      .features {
        grid-template-columns: 1fr;
      }

      .actions {
        flex-direction: column;
      }

      .btn {
        width: 100%;
      }
    }
  </style>
</head>
<body>
  <section class="owner-section">
    <div class="owner-card">
      <div class="image-wrap">
        <div class="badge">Owner Spotlight</div>
        <img
          src="https://plain-apac-prod-public.komododecks.com/202607/04/de0uRzABCTBM2Rp6uDZu/image.png"
          alt="Owner showcasing his product"
        />
      </div>

      <div class="content">
        <div class="eyebrow">Message from the Owner</div>
        <h2>Quality, trust, and the right product for every need.</h2>
        <p class="subtitle">
          Our products are made to serve farmers, builders, transporters, and households with durable
          protection and dependable performance.
        </p>

        <div class="quote-box">
          <p id="ownerText">
            "We focus on supplying the right material, the right thickness, and the right size for every customer.
            Whether you need it for construction, covering, storage, farming, or daily use, we always guide you to
            the best choice."
          </p>
        </div>

        <div class="features">
          <div class="feature"><span class="dot"></span> Durable and reliable product quality</div>
          <div class="feature"><span class="dot"></span> Available in multiple sizes and types</div>
          <div class="feature"><span class="dot"></span> Suitable for wholesale and retail orders</div>
          <div class="feature"><span class="dot"></span> Fast help for bulk inquiries</div>
        </div>

        <div class="actions">
          <a class="btn btn-primary" href="tel:+919852076197">Call Now</a>
          <button class="btn btn-secondary" id="changeTextBtn" type="button">View Owner Message</button>
        </div>

        <div class="owner-name">— <strong>Mr. Vinod Kumar Varnawal</strong></div>
      </div>
    </div>
  </section>

  <script>
    const ownerText = document.getElementById('ownerText');
    const changeTextBtn = document.getElementById('changeTextBtn');

    const messages = [
      '"We focus on supplying the right material, the right thickness, and the right size for every customer. Whether you need it for construction, covering, storage, farming, or daily use, we always guide you to the best choice."',
      '"Our aim is simple — provide trusted products, fair pricing, and honest guidance so every customer leaves satisfied and confident in their purchase."',
      '"From small requirements to bulk orders, we make sure every product matches the need of the customer and delivers long-lasting value."'
    ];

    let index = 0;
    changeTextBtn.addEventListener('click', () => {
      index = (index + 1) % messages.length;
      ownerText.textContent = messages[index];
      changeTextBtn.textContent = index === 0 ? 'View Owner Message' : 'Next Message';
    });
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
            className="relative w-full max-w-5xl h-[85vh] md:h-[80vh] bg-slate-900 border border-slate-800 rounded-[32px] overflow-hidden shadow-2xl z-10 flex flex-col backdrop-blur-xl bg-opacity-70"
          >
            {/* Header / Close controls */}
            <div className="absolute top-4 right-4 z-20">
              <button
                onClick={onClose}
                className="p-2 bg-black/40 hover:bg-black/60 text-slate-300 hover:text-white rounded-full transition-all border border-white/10 active:scale-95 cursor-pointer flex items-center justify-center"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Dedicated placeholder container as requested */}
            <div id="supplier-popup-content" className="flex-grow w-full h-full p-2 md:p-4 overflow-hidden">
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

import React, { useState, useEffect } from "react";

export default function VisitShopSection() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    function updateStoreStatus() {
      // Calculate IST time (UTC+5:30)
      const now = new Date();
      const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
      const istTime = new Date(utcTime + 5.5 * 3600000);

      const hour = istTime.getHours();
      const minute = istTime.getMinutes();
      const currentTime = hour * 60 + minute;

      const openingTime = 7 * 60; // 7:00 AM
      const closingTime = 19 * 60; // 7:00 PM

      const isStoreOpen = currentTime >= openingTime && currentTime < closingTime;
      setIsOpen(isStoreOpen);

      const statusEl = document.getElementById("storeStatus");
      if (statusEl) {
        if (isStoreOpen) {
          statusEl.textContent = "LIVE: OPEN NOW";
          statusEl.style.color = "#16a34a";
        } else {
          statusEl.textContent = "CURRENTLY CLOSED";
          statusEl.style.color = "#dc2626";
        }
      }
    }

    updateStoreStatus();
    const interval = setInterval(updateStoreStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="shop-section scroll-mt-24" id="visit-shop">
        <div id="contact" className="-mt-24 pt-24" />
        <div className="shop-container">
          {/* LEFT CONTENT */}
          <div className="shop-content">
            <span className="shop-badge">
              <span className="badge-dot"></span>
              VISIT OUR SHOP
            </span>

            <h2>
              Come Visit Our Physical Store
              <span>In Maharajganj, Siwan</span>
            </h2>

            <p className="shop-description">
              Our main dealer showroom is packed with ready stock. We welcome
              farmers, builders, and wholesalers to walk in for direct physical
              quality check, instant sizing customization, and secure payment
              handling.
            </p>

            {/* ADDRESS CARD */}
            <div className="info-card">
              <div className="info-icon">
                {/* Map Pin Icon */}
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>

              <div className="info-text">
                <h4>Store Address</h4>
                <p>
                  Om Shringar Tirpal Store,
                  <br />
                  Meetha Hatti, Kazi Bazar,
                  <br />
                  Maharajganj, Siwan, Bihar – 841238
                </p>

                <div className="landmark">
                  <span>
                    {/* Pin Icon */}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#f97316"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </span>
                  <span>
                    <strong>Landmark:</strong> Near Kazi Bazar, Meetha Hatti Road
                  </span>
                </div>
              </div>
            </div>

            {/* STATUS + TIMING */}
            <div className="status-row">
              <div className="status-card">
                <div className="status-icon">
                  {/* Live Dot Icon */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="8"
                      fill={isOpen ? "#16a34a" : "#dc2626"}
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="12"
                      fill={isOpen ? "#16a34a" : "#dc2626"}
                      fillOpacity="0.2"
                    />
                  </svg>
                </div>
                <div>
                  <small>STORE STATUS</small>
                  <strong
                    id="storeStatus"
                    style={{ color: isOpen ? "#16a34a" : "#dc2626" }}
                  >
                    {isOpen ? "LIVE: OPEN NOW" : "CURRENTLY CLOSED"}
                  </strong>
                </div>
              </div>

              <div className="status-card">
                <div className="status-icon">
                  {/* Clock Icon */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#374151"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <small>STORE TIMINGS</small>
                  <strong>7:00 AM – 7:00 PM</strong>
                  <span>Monday to Sunday · All 7 Days Open</span>
                </div>
              </div>
            </div>

            {/* CONTACT */}
            <div className="owner-card">
              <div className="owner-avatar">VK</div>

              <div className="owner-details">
                <small>PROPRIETOR CONTACT</small>
                <strong>Mr. Vinod Kumar Varnawal</strong>
                <a href="tel:+918210625483">+91 8210625483</a>
              </div>

              <a className="call-btn" href="tel:+918210625483">
                {/* Phone Icon */}
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>Call</span>
              </a>
            </div>

            {/* MAP BUTTON */}
            <a
              className="map-btn"
              href="https://share.google/NKvH5pnab2Z7fFKp2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="map-icon">
                {/* Map Pin Icon (white) */}
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>

              <span className="map-text">
                <strong>Open Google Maps Directions</strong>
                <small>Get directions to our showroom</small>
              </span>

              <span className="arrow">
                {/* Arrow Right Icon */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </a>
          </div>

          {/* RIGHT VISUAL */}
          <div className="shop-visual">
            <div className="visual-card">
              <div className="visual-top">
                <span className="mini-badge">🏪 PHYSICAL STORE</span>
                <span className="open-pill">
                  <span
                    style={{
                      background: isOpen ? "#16a34a" : "#dc2626",
                    }}
                  ></span>{" "}
                  {isOpen ? "OPEN" : "CLOSED"}
                </span>
              </div>

              <div className="store-illustration">
                <div className="building">
                  <div className="roof"></div>

                  <div className="building-body">
                    <div className="signboard">
                      <strong>OM SHRINGAR</strong>
                      <span>TIRPAL STORE</span>
                    </div>

                    <div className="shop-front">
                      <div className="door">
                        <div className="door-glass"></div>
                        <span
                          style={{
                            background: isOpen ? "#16a34a" : "#dc2626",
                          }}
                        >
                          {isOpen ? "OPEN" : "CLOSED"}
                        </span>
                      </div>

                      <div className="window">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="visual-bottom">
                <div>
                  <strong>Ready Stock Available</strong>
                  <span>Tarpaulins · Plastic Sheets · Packaging</span>
                </div>

                <div className="location-pin">
                  {/* Map Pin Icon */}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="floating-card floating-one">
              <span>
                {/* Package Icon */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12.89 1.45l8 4A2 2 0 0 1 22 7.24v9.53a2 2 0 0 1-1.11 1.79l-8 4a2 2 0 0 1-1.79 0l-8-4a2 2 0 0 1-1.11-1.79V7.24a2 2 0 0 1 1.11-1.79l8-4a2 2 0 0 1 1.79 0z" />
                  <polyline points="2.32 6.16 12 11 21.68 6.16" />
                  <line x1="12" y1="22.76" x2="12" y2="11" />
                  <line x1="7" y1="3.5" x2="17" y2="8.5" />
                </svg>
              </span>
              <div>
                <strong>Ready Stock</strong>
                <small>Available</small>
              </div>
            </div>

            <div className="floating-card floating-two">
              <span>
                {/* Star Icon */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </span>
              <div>
                <strong>26+ Years</strong>
                <small>of Trust</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        /* ===============================
           VISIT SHOP SECTION
        ================================ */

        .shop-section {
            width: 100%;
            background: #ffffff;
            padding: 90px 20px;
            font-family: inherit;
            color: #111827;
            overflow: hidden;
        }

        .shop-container {
            width: min(1180px, 100%);
            margin: auto;
            display: grid;
            grid-template-columns: 1.05fr .95fr;
            gap: 70px;
            align-items: center;
        }

        /* ===============================
           CONTENT
        ================================ */

        .shop-badge {
            display: inline-flex;
            align-items: center;
            gap: 9px;
            padding: 8px 13px;
            border: 1px solid #e5e7eb;
            border-radius: 50px;
            background: #fafafa;
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 1.4px;
            color: #374151;
        }

        .badge-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #16a34a;
            box-shadow: 0 0 0 4px #dcfce7;
        }

        .shop-content h2 {
            margin: 20px 0 18px;
            font-size: clamp(32px, 4vw, 52px);
            line-height: 1.05;
            letter-spacing: -2px;
            font-weight: 850;
            color: #111827;
        }

        .shop-content h2 span {
            display: block;
            color: #f97316;
        }

        .shop-description {
            max-width: 650px;
            margin: 0 0 30px;
            color: #6b7280;
            font-size: 15px;
            line-height: 1.75;
        }

        /* ===============================
           INFO CARD
        ================================ */

        .info-card {
            display: flex;
            gap: 17px;
            padding: 21px;
            border: 1px solid #e5e7eb;
            border-radius: 18px;
            background: #fff;
            box-shadow: 0 8px 30px rgba(0, 0, 0, .045);
        }

        .info-icon {
            flex: 0 0 44px;
            width: 44px;
            height: 44px;
            display: grid;
            place-items: center;
            border-radius: 13px;
            background: #fff1e8;
            font-size: 20px;
        }

        .info-text h4 {
            margin: 0 0 7px;
            font-size: 14px;
            font-weight: 800;
        }

        .info-text p {
            margin: 0;
            color: #4b5563;
            font-size: 13px;
            line-height: 1.65;
        }

        .landmark {
            margin-top: 12px;
            padding-top: 11px;
            border-top: 1px solid #f0f0f0;
            display: flex;
            gap: 7px;
            font-size: 12px;
            color: #6b7280;
        }

        .landmark span:first-child {
            display: flex;
            align-items: center;
            flex-shrink: 0;
        }

        /* ===============================
           STATUS
        ================================ */

        .status-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-top: 13px;
        }

        .status-card {
            min-height: 78px;
            display: flex;
            gap: 12px;
            align-items: center;
            padding: 15px;
            border: 1px solid #e5e7eb;
            border-radius: 16px;
            background: #fafafa;
        }

        .status-icon {
            font-size: 19px;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .status-card small {
            display: block;
            margin-bottom: 5px;
            color: #9ca3af;
            font-size: 9px;
            font-weight: 800;
            letter-spacing: 1px;
        }

        .status-card strong {
            display: block;
            font-size: 12px;
            font-weight: 800;
        }

        .status-card span {
            display: block;
            margin-top: 4px;
            color: #9ca3af;
            font-size: 10px;
        }

        /* ===============================
           OWNER
        ================================ */

        .owner-card {
            display: flex;
            align-items: center;
            gap: 13px;
            margin-top: 13px;
            padding: 14px 16px;
            border: 1px solid #e5e7eb;
            border-radius: 16px;
        }

        .owner-avatar {
            width: 43px;
            height: 43px;
            display: grid;
            place-items: center;
            flex-shrink: 0;
            border-radius: 50%;
            background: #111827;
            color: #fff;
            font-size: 12px;
            font-weight: 800;
        }

        .owner-details {
            flex: 1;
        }

        .owner-details small {
            display: block;
            color: #9ca3af;
            font-size: 9px;
            font-weight: 800;
            letter-spacing: 1px;
        }

        .owner-details strong {
            display: block;
            margin: 3px 0;
            font-size: 12px;
        }

        .owner-details a {
            color: #f97316;
            text-decoration: none;
            font-size: 12px;
            font-weight: 700;
        }

        .call-btn {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 10px 14px;
            border-radius: 10px;
            background: #111827;
            color: #fff;
            text-decoration: none;
            font-size: 11px;
            font-weight: 700;
            transition: .25s ease;
            flex-shrink: 0;
        }

        .call-btn:hover {
            transform: translateY(-2px);
            background: #f97316;
        }

        /* ===============================
           MAP BUTTON
        ================================ */

        .map-btn {
            display: flex;
            align-items: center;
            gap: 13px;
            margin-top: 13px;
            padding: 16px 18px;
            border-radius: 15px;
            background: #f97316;
            color: #fff;
            text-decoration: none;
            box-shadow: 0 10px 25px rgba(249, 115, 22, .20);
            transition: .25s ease;
        }

        .map-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 30px rgba(249, 115, 22, .27);
        }

        .map-icon {
            font-size: 20px;
            display: flex;
            align-items: center;
            flex-shrink: 0;
        }

        .map-text {
            flex: 1;
        }

        .map-text strong {
            display: block;
            font-size: 12px;
        }

        .map-text small {
            display: block;
            margin-top: 3px;
            opacity: .8;
            font-size: 10px;
        }

        .arrow {
            font-size: 20px;
            display: flex;
            align-items: center;
            flex-shrink: 0;
        }

        /* ===============================
           RIGHT VISUAL
        ================================ */

        .shop-visual {
            position: relative;
            min-height: 500px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .visual-card {
            width: min(460px, 100%);
            border: 1px solid #e5e7eb;
            border-radius: 28px;
            background: #fff;
            overflow: hidden;
            box-shadow: 0 25px 70px rgba(17, 24, 39, .10);
        }

        .visual-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 19px 21px;
            border-bottom: 1px solid #f1f1f1;
        }

        .mini-badge {
            font-size: 10px;
            font-weight: 800;
            letter-spacing: .8px;
        }

        .open-pill {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 6px 9px;
            border-radius: 50px;
            background: #ecfdf5;
            color: #15803d;
            font-size: 9px;
            font-weight: 800;
        }

        .open-pill span {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #16a34a;
        }

        /* ===============================
           STORE ILLUSTRATION
        ================================ */

        .store-illustration {
            min-height: 330px;
            padding: 40px 25px 0;
            display: flex;
            align-items: flex-end;
            justify-content: center;
            background:
                radial-gradient(circle at 50% 20%, #fff7ed 0%, #fff 55%);
        }

        .building {
            width: 82%;
            max-width: 360px;
        }

        .roof {
            height: 25px;
            background: #111827;
            border-radius: 12px 12px 0 0;
            transform: skewX(-4deg);
        }

        .building-body {
            min-height: 250px;
            padding: 18px;
            border: 1px solid #e5e7eb;
            border-top: 0;
            background: #f8fafc;
        }

        .signboard {
            padding: 13px;
            text-align: center;
            border-radius: 9px;
            background: #f97316;
            color: white;
            box-shadow: 0 7px 18px rgba(249, 115, 22, .20);
        }

        .signboard strong {
            display: block;
            font-size: 18px;
            letter-spacing: 1px;
        }

        .signboard span {
            display: block;
            margin-top: 2px;
            font-size: 9px;
            letter-spacing: 2px;
        }

        .shop-front {
            display: grid;
            grid-template-columns: .65fr 1fr;
            gap: 10px;
            margin-top: 15px;
        }

        .door {
            min-height: 145px;
            position: relative;
            display: flex;
            align-items: flex-end;
            justify-content: center;
            padding-bottom: 9px;
            border: 6px solid #374151;
            background: #dbeafe;
        }

        .door-glass {
            position: absolute;
            inset: 8px;
            background:
                linear-gradient(135deg,
                    rgba(255, 255, 255, .75),
                    rgba(219, 234, 254, .5));
        }

        .door span {
            position: relative;
            z-index: 2;
            padding: 4px 8px;
            border-radius: 4px;
            background: #16a34a;
            color: #fff;
            font-size: 8px;
            font-weight: 800;
        }

        .window {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 5px;
            padding: 7px;
            border: 6px solid #374151;
            background: #dbeafe;
        }

        .window div {
            border: 1px solid #94a3b8;
            background: rgba(255, 255, 255, .55);
        }

        .visual-bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 18px 21px;
            border-top: 1px solid #eee;
        }

        .visual-bottom strong {
            display: block;
            font-size: 12px;
        }

        .visual-bottom span {
            display: block;
            margin-top: 4px;
            color: #9ca3af;
            font-size: 10px;
        }

        .location-pin {
            width: 38px;
            height: 38px;
            display: grid;
            place-items: center;
            border-radius: 50%;
            background: #fff1e8;
            flex-shrink: 0;
        }

        .floating-card {
            position: absolute;
            display: flex;
            align-items: center;
            gap: 9px;
            padding: 12px 15px;
            border: 1px solid #e5e7eb;
            border-radius: 14px;
            background: rgba(255, 255, 255, .94);
            box-shadow: 0 15px 35px rgba(0, 0, 0, .09);
            backdrop-filter: blur(10px);
            animation: floatShopCard 3.5s ease-in-out infinite;
        }

        .floating-card > span {
            font-size: 18px;
            display: flex;
            align-items: center;
            flex-shrink: 0;
        }

        .floating-card strong {
            display: block;
            font-size: 10px;
        }

        .floating-card small {
            display: block;
            margin-top: 2px;
            color: #9ca3af;
            font-size: 9px;
        }

        .floating-one {
            left: 0;
            top: 18%;
        }

        .floating-two {
            right: 0;
            bottom: 15%;
            animation-delay: 1s;
        }

        @keyframes floatShopCard {
            0%,
            100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-8px);
            }
        }

        @media (max-width: 900px) {
            .shop-section {
                padding: 65px 18px;
            }

            .shop-container {
                grid-template-columns: 1fr;
                gap: 45px;
            }

            .shop-content {
                max-width: 700px;
                margin: auto;
            }

            .shop-visual {
                min-height: 450px;
            }
        }

        @media (max-width: 560px) {
            .shop-section {
                padding: 50px 14px;
            }

            .shop-content h2 {
                font-size: 34px;
                letter-spacing: -1.3px;
            }

            .shop-description {
                font-size: 13px;
                line-height: 1.65;
            }

            .info-card {
                padding: 16px;
            }

            .status-row {
                grid-template-columns: 1fr;
            }

            .owner-card {
                flex-wrap: wrap;
            }

            .owner-details {
                min-width: calc(100% - 60px);
            }

            .call-btn {
                width: 100%;
                justify-content: center;
            }

            .map-btn {
                padding: 15px;
            }

            .shop-visual {
                min-height: 400px;
            }

            .visual-card {
                border-radius: 22px;
            }

            .building {
                width: 90%;
            }

            .floating-card {
                padding: 9px 11px;
            }

            .floating-one {
                left: -3px;
                top: 13%;
            }

            .floating-two {
                right: -3px;
                bottom: 11%;
            }

            .floating-card strong {
                font-size: 9px;
            }

            .floating-card small {
                font-size: 8px;
            }
        }
      `}</style>
    </>
  );
}

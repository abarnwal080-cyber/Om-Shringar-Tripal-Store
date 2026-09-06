import React from "react";

export const WhoWeAreSection: React.FC = () => {
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,.98), #ffffff 45%)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.background = "#ffffff";
  };

  return (
    <section className="who-we-are" id="about">
      <div className="about-wrap">

        <div className="about-heading">
          <span className="eyebrow">WHO WE ARE</span>

          <h2>
            Premium Polymers &amp;{" "}
            <span>Weather Protection</span>
          </h2>

          <p>
            Under the visionary leadership of{" "}
            <strong>Mr. Vinod Kumar Varnawal</strong>,{" "}
            <strong>OM SHRINGAR TIRPAL STORE</strong> has grown from a local merchant
            into Siwan's trusted supplier of waterproof tarpaulins, plastic rolls,
            curing polythene, stretch wraps and resham nets.
          </p>
        </div>

        <div className="sector-grid">

          {/* Agriculture */}
          <article 
            className="sector-card agriculture"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="icon-box">
              <svg viewBox="0 0 24 24" fill="none">
                <path 
                  d="M12 21V10M12 14C8 14 5 11 5 7c4 0 7 2 7 7Zm0-3c0-4 3-7 7-7 0 4-3 7-7 7Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h3>Farmers &amp; Agriculture</h3>
            <p>Crop protection, grain drying, silos &amp; fencing nets.</p>
          </article>

          {/* Builders */}
          <article 
            className="sector-card builders"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="icon-box">
              <svg viewBox="0 0 24 24" fill="none">
                <path 
                  d="M4 20h16M6 20V9l6-5 6 5v11M9 20v-6h6v6M8 10h8"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h3>Builders &amp; Contractors</h3>
            <p>Concrete slab underlays &amp; construction protection films.</p>
          </article>

          {/* Transport */}
          <article 
            className="sector-card transport"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="icon-box">
              <svg viewBox="0 0 24 24" fill="none">
                <path 
                  d="M3 6h11v11H3zM14 10h4l3 3v4h-7z M7 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z M18 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h3>Transporters &amp; Truckers</h3>
            <p>Customized high-density truck &amp; trailer tarpaulin covers.</p>
          </article>

          {/* Warehouse */}
          <article 
            className="sector-card warehouse"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="icon-box">
              <svg viewBox="0 0 24 24" fill="none">
                <path 
                  d="m3 10 9-6 9 6M5 9v11h14V9 M8 20v-6h8v6M8 11h8"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h3>Warehouses &amp; Shops</h3>
            <p>Stretch wraps, silage rolls &amp; inventory protection covers.</p>
          </article>

        </div>

      </div>
    </section>
  );
};

export default WhoWeAreSection;

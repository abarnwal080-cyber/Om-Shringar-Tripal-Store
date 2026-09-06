import express from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer } from "vite";
import { findProductBySlug, getProductSlug, PRODUCTS } from "./src/data";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory data stores with optional file persistence
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    try {
      fs.mkdirSync(dataDir, { recursive: true });
    } catch {
      // ignore
    }
  }

  const enquiriesFile = path.join(dataDir, "enquiries.json");
  const reviewsFile = path.join(dataDir, "reviews.json");

  let enquiriesStore: any[] = [];
  try {
    if (fs.existsSync(enquiriesFile)) {
      enquiriesStore = JSON.parse(fs.readFileSync(enquiriesFile, "utf-8"));
    }
  } catch {
    enquiriesStore = [];
  }

  let reviewsStore: any[] = [];
  try {
    if (fs.existsSync(reviewsFile)) {
      reviewsStore = JSON.parse(fs.readFileSync(reviewsFile, "utf-8"));
    }
  } catch {
    reviewsStore = [];
  }

  // 1. Robots.txt Route
  app.get("/robots.txt", (req, res) => {
    res.type("text/plain");
    res.send(`User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://www.shridantahub.in/sitemap.xml`);
  });

  // 2. Sitemap.xml Route
  app.get("/sitemap.xml", (req, res) => {
    res.type("application/xml");
    const urls = [
      "https://www.shridantahub.in/",
    ];
    PRODUCTS.forEach((p) => {
      urls.push(`https://www.shridantahub.in/products/${getProductSlug(p.id)}`);
    });

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${url === "https://www.shridantahub.in/" ? "1.0" : "0.8"}</priority>
  </url>`).join("\n")}
</urlset>`;
    res.send(sitemapXml);
  });

  // 3. API health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // 4. Customer Enquiries API
  app.get("/api/enquiries", (req, res) => {
    res.json({ enquiries: enquiriesStore });
  });

  app.post("/api/enquiries", (req, res) => {
    const body = req.body || {};
    const enquiry = {
      id: body.id || `enq_${Date.now()}`,
      customerName: body.customerName || "Customer",
      state: body.state || "",
      city: body.city || "",
      productName: body.productName || "",
      productId: body.productId || "",
      date: body.date || new Date().toISOString(),
      time: body.time || "",
      enquirySource: body.enquirySource || "Product Detail Page",
      status: body.status || "New",
    };

    enquiriesStore.unshift(enquiry);
    try {
      fs.writeFileSync(enquiriesFile, JSON.stringify(enquiriesStore, null, 2));
    } catch {
      // ignore
    }

    res.json({ success: true, enquiry });
  });

  // 5. Product-Specific Reviews API
  app.get("/api/reviews", (req, res) => {
    const productId = req.query.productId as string;
    if (!productId) {
      return res.json({ reviews: reviewsStore });
    }
    const filtered = reviewsStore.filter((r) => r.productId === productId);
    res.json({ reviews: filtered });
  });

  app.post("/api/reviews", (req, res) => {
    const body = req.body || {};
    if (!body.productId || !body.customerName || !body.rating || !body.reviewText) {
      return res.status(400).json({ error: "Missing required review fields" });
    }

    const review = {
      id: body.id || `rev_${Date.now()}`,
      productId: body.productId,
      customerName: body.customerName,
      rating: Number(body.rating),
      reviewText: body.reviewText,
      createdAt: body.createdAt || new Date().toISOString(),
      status: "approved",
    };

    reviewsStore.unshift(review);
    try {
      fs.writeFileSync(reviewsFile, JSON.stringify(reviewsStore, null, 2));
    } catch {
      // ignore
    }

    res.json({ success: true, review });
  });

  // 6. Gemini AI Hinglish Chatbot API
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body || {};
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required" });
      }

      const systemInstruction = `You are "Tirpal Saathi" (तिरपाल साथी), the friendly, knowledgeable, and polite AI assistant of "Om Shringar Tirpal Store" (formerly Goyal Traders, est. 2000, 26+ years of trust in Maharajganj, Siwan, Bihar).
Proprietor: Mr. Vinod Kumar Varnawal (श्री विनोद कुमार वर्णवाल).
Phone / WhatsApp: +91 8210625483.
Store Address: Meetha Hatti, Kazi Bazar, Maharajganj, Siwan, Bihar – 841238.
Landmark: Near Kazi Bazar, Meetha Hatti Road.
Store Timings: 7:00 AM to 7:00 PM, Monday to Sunday (Open all 7 days).
Wholesale & Retail: We are the primary distributor and wholesale dealer for Siwan, Gopalganj, Chhapra, and across Bihar. Direct factory pricing, bulk supply discounts, and instant sizing customization available.

Products & Knowledge:
1. Tirpal (HDPE & Multilayer Tarpaulins):
   - Best for roof waterproofing (chhat tapakne se rokne ke liye), trucks, tractors, grain/gehu/dhan storage, construction, and temporary shades.
   - GSM Guide:
     * 120 GSM: Light-duty, dust cover, short-term use.
     * 150-200 GSM: Medium-duty farming, grain storage, godowns.
     * 250 GSM & 300+ GSM: Heavy-duty and super-duty, torrential monsoon rain, truck transport, roof leak protection.
   - Sizes: 6x6, 9x12, 12x18, 15x18, 18x24, 24x30, 30x40, 30x60 feet, and custom sizes. Heat-sealed borders with rust-free aluminum eyelets (grommets).
2. Silpaulin Tarpaulins:
   - 100% leak-proof, multi-layered cross-laminated sheet.
   - Ideal for Fish Pond Liner (मछली पालन तालाब), Biofloc, Azolla culture, silage making.
3. Construction Plastic Rolls & LDPE Film:
   - Used for roof concrete curing (chhat ki dhalaai ke baad paani rokne ke liye), foundation moisture barrier, greenhouse, mulch film.
   - Available in 100, 150, 200, 250+ micron rolls.
4. Agro Shade Nets (हरा जाली):
   - 50% and 75% shading factor for vegetable nurseries, terrace gardens, vehicle parking shade, poultry farms.
5. Packaging Materials:
   - Stretch film rolls, bubble wrap, PP woven bags/boriyaan, heavy-duty plastic sutli & ropes.

Guidelines for your response:
- Respond in natural, warm, polite, and respectful HINGLISH (conversational blend of Hindi and English, e.g., "Namaste ji! Chhat ke liye 200 ya 250 GSM ka heavy-duty waterproof tirpal sabse best hota hai...").
- Keep replies helpful, practical, concise, and easy to read with bullet points when listing sizes or options.
- If the customer asks for wholesale rate, price quotes, or bulk orders, warmly guide them to call or WhatsApp Mr. Vinod Kumar Varnawal at +91 8210625483 or visit the store in Maharajganj, Siwan.
- Always be courteous and welcoming.`;

      let replyText = "";

      if (process.env.GEMINI_API_KEY) {
        try {
          const { GoogleGenAI } = await import("@google/genai");
          const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY,
            httpOptions: {
              headers: {
                "User-Agent": "aistudio-build",
              },
            },
          });

          // Build conversation contents
          const contents: any[] = [];
          if (Array.isArray(history) && history.length > 0) {
            history.slice(-6).forEach((h: any) => {
              if (h.role && h.content) {
                contents.push({
                  role: h.role === "assistant" ? "model" : "user",
                  parts: [{ text: h.content }],
                });
              }
            });
          }
          contents.push({
            role: "user",
            parts: [{ text: message }],
          });

          const response = await ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents: contents,
            config: {
              systemInstruction: systemInstruction,
              temperature: 0.7,
            },
          });

          replyText = response.text || "";
        } catch (apiError: any) {
          console.error("Gemini API Error:", apiError?.message || apiError);
        }
      }

      // Intelligent Hinglish Fallback if Gemini key is not configured or fails
      if (!replyText) {
        const lower = message.toLowerCase();
        if (lower.includes("chhat") || lower.includes("roof") || lower.includes("chhat ") || lower.includes("tapak")) {
          replyText = `Namaste ji! Chhat ke liye sabse best 200 GSM ya 250 GSM ka Heavy-Duty Waterproof HDPE ya Silpaulin tirpal hota hai. 
• Yeh 100% waterproof aur UV-protected hota hai jo tej dhoop aur bhari baarish dono se chhat ko bachata hai.
• Popular sizes: 12x18 ft, 18x24 ft, 24x30 ft, ya 30x40 ft.
Aapki chhat ka exact naap kya hai? Ya fir direct Vinod ji ko call karein: +91 8210625483 par!`;
        } else if (lower.includes("rate") || lower.includes("price") || lower.includes("daam") || lower.includes("kitna")) {
          replyText = `Namaste! Om Shringar Tirpal Store me Siwan aur pure Bihar ka sabse kifaayati Wholesale & Retail rate milta hai.
• Rate tirpal ke GSM (120, 150, 200, 250 GSM) aur size par depend karta hai.
• Direct factory rates aur wholesale discount ke liye aap humare proprietor Mr. Vinod Kumar Varnawal ji se direct call/WhatsApp par baat kar sakte hain: +91 8210625483.`;
        } else if (lower.includes("kahan") || lower.includes("address") || lower.includes("location") || lower.includes("dukaan") || lower.includes("store")) {
          replyText = `Humari physical shop Maharajganj, Siwan me sthit hai:
📍 Om Shringar Tirpal Store, Meetha Hatti, Kazi Bazar, Maharajganj, Siwan, Bihar – 841238.
Landmark: Kazi Bazar, Meetha Hatti Road ke paas.
⏰ Timing: Subah 7:00 AM se Shaam 7:00 PM (Saaton din open).
Aap Google Maps par bhi directions dekh sakte hain!`;
        } else if (lower.includes("fish") || lower.includes("machhli") || lower.includes("pond") || lower.includes("pond liner") || lower.includes("silpaulin")) {
          replyText = `Fish pond (machhli paalan) aur Biofloc/Azolla ke liye Multilayer Cross-Laminated Silpaulin Sheet sabse behtareen hoti hai!
• Yeh 100% leakproof hoti hai aur pathar ya jadon se aasaani se nahi fatti.
• Showroom me ready rolls aur custom sizes uplabdh hain. Details ke liye sampark karein: +91 8210625483.`;
        } else if (lower.includes("number") || lower.includes("phone") || lower.includes("call") || lower.includes("contact") || lower.includes("owner")) {
          replyText = `Aap direct humare owner Mr. Vinod Kumar Varnawal ji se baat kar sakte hain:
📞 Phone / WhatsApp: +91 8210625483
Dukaan ka pata: Meetha Hatti, Kazi Bazar, Maharajganj, Siwan. Subah 7 AM se 7 PM tak kabhi bhi call ya visit kar sakte hain!`;
        } else if (lower.includes("size") || lower.includes("sizes") || lower.includes("gsm")) {
          replyText = `Humare paas sabhi standard aur custom sizes ready stock me hain:
• Sizes: 6x6, 9x12, 12x18, 15x18, 18x24, 24x30, 30x40, 30x60 ft.
• GSM: 120 GSM (Light), 150-200 GSM (Medium/Farming), 250-300+ GSM (Heavy Duty).
Aapko kis use ke liye size chahiye? Batayiye, main recommend kar deta hoon!`;
        } else {
          replyText = `Namaste ji! Main Om Shringar Tirpal Store ka "Tirpal Saathi" hoon. 
Aap humse Tirpal (HDPE/Silpaulin), Construction Plastic Rolls, Green Shade Net, ya Packaging Material ke size, GSM, aur wholesale rate ke baare me kuch bhi poochh sakte hain.
Aap direct call bhi kar sakte hain: 📞 +91 8210625483 (Vinod Kumar Varnawal).`;
        }
      }

      res.json({ reply: replyText });
    } catch (err: any) {
      console.error("Chat error:", err);
      res.status(500).json({ error: "Chat service error" });
    }
  });

  let vite: any;
  if (process.env.NODE_ENV !== "production") {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom", // Allows us to intercept and transform index.html for SEO
    });
    app.use(vite.middlewares);
  } else {
    // Serve production static assets (JS, CSS, images) but not index.html by default
    app.use(express.static(path.join(process.cwd(), "dist"), { index: false }));
  }

  // 4. Wildcard HTML handler with dynamic SEO & schema injection
  app.get("*", async (req, res, next) => {
    const url = req.originalUrl;
    
    // Ignore static assets or API requests
    if (url.includes(".") || url.startsWith("/api/")) {
      return next();
    }

    try {
      let templatePath = "";
      if (process.env.NODE_ENV !== "production") {
        templatePath = path.resolve(process.cwd(), "index.html");
      } else {
        templatePath = path.resolve(process.cwd(), "dist", "index.html");
      }

      if (!fs.existsSync(templatePath)) {
        return res.status(404).send("Index template not found");
      }

      let html = fs.readFileSync(templatePath, "utf-8");

      // Check if this is a product page
      let isProductPage = false;
      let productSlug = "";
      if (url.startsWith("/products/")) {
        productSlug = url.substring("/products/".length).split(/[?#]/)[0];
        isProductPage = true;
      } else if (url !== "/") {
        // Fallback search for slug
        const slug = url.substring(1).split(/[?#]/)[0];
        const matched = findProductBySlug(slug);
        if (matched) {
          productSlug = getProductSlug(matched.id);
          isProductPage = true;
        }
      }

      if (isProductPage && productSlug) {
        // Strip trailing and leading slashes to get a clean canonical slug
        productSlug = productSlug.replace(/^\/+|\/+$/g, "");
        
        const product = findProductBySlug(productSlug);
        if (product) {
          const title = `${product.name} - Om Shringar Tirpal Store Maharajganj`;
          const desc = product.description;
          const pageUrl = `https://www.shridantahub.in/products/${productSlug}`;
          const imageUrl = product.images[0] || "https://plain-apac-prod-public.komododecks.com/202607/05/7O9jo950h35goeKsP6Gr/image.png";

          // Dynamic replacement of Title
          html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
          
          // Dynamic replacement of Description
          html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${desc}" />`);

          // Dynamic replacement of Open Graph Tags
          html = html.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${title}" />`);
          html = html.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${desc}" />`);
          html = html.replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${pageUrl}" />`);
          html = html.replace(/<meta property="og:image" content=".*?" \/>/, `<meta property="og:image" content="${imageUrl}" />`);

          // Dynamic replacement of Twitter Tags if present
          html = html.replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${title}" />`);
          html = html.replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${desc}" />`);
          html = html.replace(/<meta name="twitter:image" content=".*?" \/>/, `<meta name="twitter:image" content="${imageUrl}" />`);

          // Dynamic replacement of Canonical URL
          html = html.replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${pageUrl}" />`);

          // Inject Product JSON-LD Schema
          const productSchema = {
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": product.name,
            "image": product.images,
            "description": product.description,
            "brand": {
              "@type": "Brand",
              "name": product.specs?.["Brand"] || "Om Shringar"
            },
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "INR",
              "lowPrice": "Wholesale Dealer Price Available",
              "offerCount": "1",
              "price": "Call for Wholesale Prices",
              "url": pageUrl,
              "availability": "https://schema.org/InStock"
            }
          };
          const schemaString = `<script type="application/ld+json" id="product-jsonld-schema">${JSON.stringify(productSchema)}</script>`;
          html = html.replace("</head>", `${schemaString}\n</head>`);
        }
      }

      // If in dev mode, run Vite HTML transformation (injects HM scripts, etc)
      if (process.env.NODE_ENV !== "production" && vite) {
        html = await vite.transformIndexHtml(url, html);
      }

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e: any) {
      if (process.env.NODE_ENV !== "production" && vite) {
        vite.ssrFixStacktrace(e);
      }
      console.error(e);
      res.status(500).end(e.message);
    }
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();

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

  // 6. Gemini AI Hinglish Chatbot API (Om Setu AI)
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history, userName } = req.body || {};
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required" });
      }

      const customerDisplayName = userName && typeof userName === "string" && userName.trim() ? `${userName.trim()} ji` : "ji";

      const systemInstruction = `You are "Om Setu AI", an intelligent and helpful virtual assistant for Om Shringar Tirpal Store located at Meetha Hatti, Kazi Bazar, Maharajganj, Siwan.
Customer Name: ${userName && typeof userName === "string" && userName.trim() ? userName.trim() : "Customer"}.
Address the customer warmly as "${customerDisplayName}".

CORE INSTRUCTIONS:
1. Direct Answers First: ALWAYS answer the customer's specific question directly based on store products (Tarpaulins/Tirpal, sizes, waterproof quality, GSM, etc.) before suggesting contact details. Give practical, helpful advice tailored to their exact use-case (roof rain protection, vehicle cover, grain drying, pond lining, construction curing, shop shade, etc.).
2. Dynamic Responses: Do NOT repeat the exact same response for every query. Adapt the response directly to the user's specific input and tone.
3. Pricing & Rates: If asked for wholesale rates or specific quotes, provide general ranges or helpful guidance first (e.g. tarpaulin rates depend on GSM from 120 GSM economy up to 250-300+ GSM heavy duty, with ready sizes like 12x18, 18x24, 24x30 ranging from budget retail to bulk wholesale per-piece/per-kg discounts), and then direct them to Mr. Vinod Kumar for precise wholesale deals and custom quotations.
4. Product Details: Answer queries about available sizes (6x6, 9x12, 12x18, 15x18, 18x24, 24x30, 30x40, 30x60 ft, custom sizes), rain durability (heavy duty 200+ or 250+ GSM, 100% waterproof heat-sealed HDPE, UV stabilized, rust-free eyelets), home delivery (wholesale delivery and local transport across Siwan, Gopalganj, Chhapra, and across Bihar), or fitting/tying guides clearly using helpful bullet points (use • or -) or short explanations.
5. Store Contact Information: When contact details are necessary or requested, mention:
   - Proprietor: Mr. Vinod Kumar Varnawal
   - Phone/WhatsApp: +91 8210625483
   - Location: Meetha Hatti, Kazi Bazar, Maharajganj, Siwan.

TONE & LANGUAGE:
- Polite, professional, and welcoming (natural Hinglish, Hindi, or English as per customer choice).
- Avoid robotic repetition.

CRITICAL FORMATTING & SAFETY RULES:
1. NEVER USE THE ASTERISK SYMBOL "*" UNDER ANY CIRCUMSTANCE. Do NOT use * or ** for bold, italic, or bullet points. Use plain text, numbers, or dashes (-) or bullets (•) only.
2. ILLEGAL / INAPPROPRIATE QUERIES: If any user asks about illegal activities, weapons, violence, adult/vulgar content, hacking, scams, or any unethical/harmful query, strictly output this WARNING:
"Chetavni (Warning): Yeh AI assistant keval Om Shringar Tirpal Store ke vyavsayik utpado aur sevaon ke liye hai. Kisi bhi anuchit ya gair-kanuni vishay par charcha yahan sakht mana hai."`;

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

          // Try primary model gemini-2.5-flash, with automatic fallback
          const candidateModels = ["gemini-2.5-flash", "gemini-2.5-flash-lite", "gemini-1.5-flash"];
          for (const modelName of candidateModels) {
            try {
              const response = await ai.models.generateContent({
                model: modelName,
                contents: contents,
                config: {
                  systemInstruction: systemInstruction,
                  temperature: 0.6,
                },
              });
              if (response && response.text) {
                replyText = response.text;
                break;
              }
            } catch (modelErr: any) {
              console.warn(`Model ${modelName} encountered error:`, modelErr?.message || modelErr);
            }
          }
        } catch (apiError: any) {
          console.error("Gemini API Client Initialization Error:", apiError?.message || apiError);
        }
      }

      // Check for illegal or abusive content in local fallback
      const lower = message.toLowerCase();
      const isSuspicious =
        lower.includes("hack") ||
        lower.includes("weapon") ||
        lower.includes("bomb") ||
        lower.includes("kill") ||
        lower.includes("drugs") ||
        lower.includes("sex") ||
        lower.includes("porn") ||
        lower.includes("scam") ||
        lower.includes("steal") ||
        lower.includes("chori") ||
        lower.includes("maro") ||
        lower.includes("gaali") ||
        lower.includes("charas") ||
        lower.includes("ganja");

      if (isSuspicious) {
        replyText = "Chetavni (Warning): Yeh AI assistant keval Om Shringar Tirpal Store ke vyavsayik utpado aur sevaon ke liye hai. Kisi bhi anuchit ya gair-kanuni vishay par charcha yahan sakht mana hai.";
      }

      // Dynamic Hinglish Fallback if Gemini key is not configured or all models are busy/503
      if (!replyText) {
        const prefix = `Namaste ${customerDisplayName}! `;

        if (lower.includes("chhat") || lower.includes("roof") || lower.includes("tapak") || lower.includes("leak") || lower.includes("rain") || lower.includes("baarish")) {
          replyText = `${prefix}Chhat ke liye aur tez baarish se bachav ke liye 200 GSM ya 250+ GSM ka Heavy-Duty HDPE Tirpal ya Multilayer Silpaulin sabse best choice hai.
• 100% waterproof heat-sealed borders aur rust-free aluminum eyelets ke saath.
• Tez dhoop aur lagataar baarish me bhi 2-3 saal se zyada chalta hai.
• Recommended ready sizes: 12x18 ft, 18x24 ft, 24x30 ft ya 30x40 ft (aapke chhat ke naap anusaar custom size bhi mil jayega).

Exact size confirm karne aur order ke liye Mr. Vinod Kumar Varnawal ji se sampark karein:
Phone / WhatsApp: +91 8210625483
Dukaan: Meetha Hatti, Kazi Bazar, Maharajganj, Siwan.`;
        } else if (lower.includes("rate") || lower.includes("price") || lower.includes("daam") || lower.includes("kitna") || lower.includes("wholesale") || lower.includes("discount") || lower.includes("quote")) {
          replyText = `${prefix}Humare paas factory wholesale aur retail dono rates uplabdh hain:
• General rate range: Tirpal ki quality aur GSM (120 GSM economy se lekar 250-300+ GSM heavy duty) ke aadhar par chote size lagbhag ₹300-₹700 se shuru hokar bade commercial sizes ₹1,200 se ₹3,500+ tak aate hain.
• Wholesale traders aur bulk purchase ke liye special wholesale discount aur per-kg / per-piece rate diya jata hai.

Apne required size aur quantity ke hisaab se sabse sasta wholesale deal paane ke liye directly baat karein:
Proprietor: Mr. Vinod Kumar Varnawal
Phone/WhatsApp: +91 8210625483
Location: Meetha Hatti, Kazi Bazar, Maharajganj, Siwan.`;
        } else if (lower.includes("size") || lower.includes("sizes") || lower.includes("naap") || lower.includes("dimension")) {
          replyText = `${prefix}Om Shringar Tirpal Store me ready stock me ye standard sizes hamesha uplabdh rehte hain:
• Chote & Medium: 6x6, 9x12, 12x18, 15x18 feet.
• Bade & Commercial: 18x24, 24x30, 30x40, 30x60 feet.
• Custom sizes: Agar aapko koi specific naap chahiye, toh hum custom joint aur stitching karke bhi dete hain.

Aapko kis kaam ke liye size chahiye? Boliye, ya direct order ke liye call karein: +91 8210625483 (Mr. Vinod Kumar Varnawal).`;
        } else if (lower.includes("delivery") || lower.includes("bhejna") || lower.includes("transport") || lower.includes("home")) {
          replyText = `${prefix}Ji haan! Hum Maharajganj town aur aas-paas local delivery provide karte hain, aur bulk / wholesale orders ke liye poore Siwan, Gopalganj, Chhapra aur pure Bihar me transport dispatch ki suvidha hai.

Delivery time aur dispatch details ke liye call/WhatsApp karein:
Mr. Vinod Kumar Varnawal: +91 8210625483
Dukaan: Meetha Hatti, Kazi Bazar, Maharajganj, Siwan.`;
        } else if (lower.includes("fish") || lower.includes("machhli") || lower.includes("pond") || lower.includes("silpaulin") || lower.includes("biofloc")) {
          replyText = `${prefix}Fish pond (machhli palan) aur biofloc tanks ke liye Multilayer Cross-Laminated Silpaulin Sheet (250 se 400 GSM) sabse safe aur best hai.
• 100% leakproof, chemical-free aur UV stabilized jo paani me fish ko bilkul surakshit rakhta hai.
• Ready aur custom ponds sizes uplabdh hain.

Size aur rate ke liye sampark karein:
Proprietor: Mr. Vinod Kumar Varnawal
Phone / WhatsApp: +91 8210625483`;
        } else if (lower.includes("dhalai") || lower.includes("construction") || lower.includes("plastic roll") || lower.includes("micron") || lower.includes("curing")) {
          replyText = `${prefix}Chhat dhalai (concrete curing) ke liye humare paas heavy-duty Virgin & Semi-Virgin LDPE Plastic Rolls uplabdh hain:
• Microns: 100, 150, 200 aur 250+ micron rolls.
• Width: 6 feet se 12 feet tak khulne wale rolls.
• Concrete me moisture seal karke chhat ko poori majbooti deta hai.

Roll order karne ke liye call karein: +91 8210625483 (Mr. Vinod Kumar Varnawal, Meetha Hatti, Maharajganj).`;
        } else if (lower.includes("green") || lower.includes("shade") || lower.includes("jali") || lower.includes("agro") || lower.includes("net") || lower.includes("nursery")) {
          replyText = `${prefix}Kheti, nursery, car parking aur chhat ke dhoop bachav ke liye Virgin HDPE Agro Green Shade Net uplabdh hai:
• 50% Shade (kheti aur plants ke liye)
• 75% Shade (tez dhoop se bachav aur cooling ke liye)
• Width: 2 meter se 6 meter rolls.

Rate aur length ke liye call karein: +91 8210625483 (Mr. Vinod Kumar Varnawal).`;
        } else if (lower.includes("kahan") || lower.includes("address") || lower.includes("location") || lower.includes("dukaan") || lower.includes("store") || lower.includes("pata") || lower.includes("rasta")) {
          replyText = `${prefix}Humari dukaan ka pata:
Om Shringar Tirpal Store
Proprietor: Mr. Vinod Kumar Varnawal
Location: Meetha Hatti, Kazi Bazar, Maharajganj, Siwan, Bihar - 841238.
Phone / WhatsApp: +91 8210625483
Timing: Subah 7:00 AM se Shaam 7:00 PM (Saaton din khula hai).`;
        } else if (lower.includes("number") || lower.includes("phone") || lower.includes("call") || lower.includes("contact") || lower.includes("owner") || lower.includes("vinod")) {
          replyText = `${prefix}Aap seedhe proprietor se baat kar sakte hain:
• Proprietor: Mr. Vinod Kumar Varnawal
• Phone / WhatsApp: +91 8210625483
• Location: Meetha Hatti, Kazi Bazar, Maharajganj, Siwan.`;
        } else {
          replyText = `${prefix}Main Om Setu AI hoon, Om Shringar Tirpal Store ka virtual assistant.
Aap humse tirpal (HDPE waterproof / Silpaulin), concrete dhalai plastic rolls, agro green shade net, sizes, price ranges ya delivery ke baare me pooch sakte hain.

Proprietor: Mr. Vinod Kumar Varnawal
Phone / WhatsApp: +91 8210625483
Location: Meetha Hatti, Kazi Bazar, Maharajganj, Siwan.`;
        }
      }

      // Enforce NO asterisk symbol in final output
      replyText = replyText.replace(/\*/g, "").trim();

      res.json({ reply: replyText });
    } catch (err: any) {
      console.error("Chat error:", err);
      res.json({
        reply:
          "Namaste ji! Om Shringar Tirpal Store me aapka swagat hai. Kisi bhi jankari ya rate ke liye direct call ya WhatsApp karein: +91 8210625483 (Mr. Vinod Kumar Varnawal, Meetha Hatti, Kazi Bazar, Maharajganj, Siwan).",
      });
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

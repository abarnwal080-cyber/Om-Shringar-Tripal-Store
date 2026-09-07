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

  // 6. Gemini AI Hinglish Chatbot API (Om Setu / Tirpal Saathi)
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history, userName } = req.body || {};
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required" });
      }

      const customerDisplayName = userName && typeof userName === "string" && userName.trim() ? `${userName.trim()} ji` : "ji";

      const systemInstruction = `You are "Om Setu", the smart, polite, and concise AI Shopping Assistant of "Om Shringar Tirpal Store" (Maharajganj, Siwan, Bihar, Proprietor: Mr. Vinod Kumar Varnawal, Phone/WhatsApp: +91 8210625483).
Customer Name: ${userName && typeof userName === "string" && userName.trim() ? userName.trim() : "Valued Customer"}.
Address the customer warmly as "${customerDisplayName}".

Store Highlights:
- Address: Meetha Hatti, Kazi Bazar, Maharajganj, Siwan, Bihar - 841238.
- Timings: 7:00 AM to 7:00 PM, all 7 days open.
- Products: Waterproof HDPE Tarpaulins (120 to 300+ GSM), Multilayer Silpaulin (Fish pond / Biofloc), Concrete Curing Construction LDPE Plastic Rolls (100 to 250+ micron), Agro Green Shade Nets (50% & 75%), Packaging materials.
- Wholesale & Retail: Siwan, Gopalganj, Chhapra & Bihar distributor.

CRITICAL RULES:
1. NEVER USE THE ASTERISK SYMBOL "*" UNDER ANY CIRCUMSTANCE. Do NOT use * or ** for bold, italic, or bullet points. Use plain text, numbers, or dashes (-) or bullets (•) only.
2. CONCISE & SATIK: Keep all answers very accurate, precise, concise, and straight to the point without unnecessary fluff.
3. ILLEGAL / INAPPROPRIATE QUERIES: If any user asks about illegal activities, weapons, violence, adult/vulgar content, hacking, scams, or any unethical/harmful query, strictly output this WARNING:
"Chetavni (Warning): Yeh AI assistant keval Om Shringar Tirpal Store ke vyavsayik utpado aur sevaon ke liye hai. Kisi bhi anuchit ya gair-kanuni vishay par charcha yahan sakht mana hai."
4. Always speak in natural, respectful Hinglish. Direct wholesale inquiries to Mr. Vinod Kumar Varnawal at +91 8210625483.`;

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

          // Try primary model gemini-2.5-flash, with automatic fallback on 503/429
          const candidateModels = ["gemini-2.5-flash", "gemini-2.5-flash-lite", "gemini-1.5-flash"];
          for (const modelName of candidateModels) {
            try {
              const response = await ai.models.generateContent({
                model: modelName,
                contents: contents,
                config: {
                  systemInstruction: systemInstruction,
                  temperature: 0.5,
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
        lower.includes("gaali");

      if (isSuspicious) {
        replyText = "Chetavni (Warning): Yeh AI assistant keval Om Shringar Tirpal Store ke vyavsayik utpado aur sevaon ke liye hai. Kisi bhi anuchit ya gair-kanuni vishay par charcha yahan sakht mana hai.";
      }

      // Intelligent Hinglish Fallback if Gemini key is not configured or all models are busy/503
      if (!replyText) {
        const prefix = `Namaste ${customerDisplayName}! `;

        if (lower.includes("chhat") || lower.includes("roof") || lower.includes("tapak") || lower.includes("leak") || lower.includes("baarish")) {
          replyText = `${prefix}Chhat ke liye sabse behtar 200 GSM ya 250 GSM ka Heavy-Duty Waterproof Tirpal ya Silpaulin hota hai.
• 100% waterproof aur dhoop-baarish se surakshit.
• Sizes: 12x18, 18x24, 24x30, 30x40 ft uplabdh.
Apni chhat ke size ke anusaar order ke liye Vinod ji ko call karein: +91 8210625483.`;
        } else if (lower.includes("rate") || lower.includes("price") || lower.includes("daam") || lower.includes("kitna") || lower.includes("wholesale") || lower.includes("discount")) {
          replyText = `${prefix}Om Shringar Tirpal Store me factory direct wholesale rate milta hai.
• Rate tirpal ke GSM (120, 150, 200, 250 GSM) aur size par aadharit hota hai.
• Wholesale rate list aur discount ke liye direct proprietor Mr. Vinod Kumar Varnawal ji se WhatsApp ya call karein: +91 8210625483.`;
        } else if (lower.includes("kahan") || lower.includes("address") || lower.includes("location") || lower.includes("dukaan") || lower.includes("store") || lower.includes("pata")) {
          replyText = `${prefix}Humari dukaan ka pata:
Om Shringar Tirpal Store, Meetha Hatti, Kazi Bazar, Maharajganj, Siwan, Bihar - 841238.
Timing: Subah 7:00 AM se Shaam 7:00 PM (Saaton din open).`;
        } else if (lower.includes("fish") || lower.includes("machhli") || lower.includes("pond") || lower.includes("silpaulin") || lower.includes("biofloc")) {
          replyText = `${prefix}Fish pond (machhli palan) ke liye Multilayer Cross-Laminated Silpaulin Sheet sabse behtareen aur 100% leakproof hai.
Details aur ready sizes ke liye call karein: +91 8210625483.`;
        } else if (lower.includes("dhalai") || lower.includes("construction") || lower.includes("plastic roll") || lower.includes("micron")) {
          replyText = `${prefix}Chhat dhalai (concrete curing) ke liye 100, 150, 200 aur 250+ micron ke heavy LDPE plastic rolls ready stock me uplabdh hain.`;
        } else if (lower.includes("green") || lower.includes("shade") || lower.includes("jali") || lower.includes("agro") || lower.includes("net")) {
          replyText = `${prefix}Kheti aur nursery ke liye 50% aur 75% Green Agro Shade Net (hara jaali) wholesale daam par uplabdh hai.`;
        } else if (lower.includes("number") || lower.includes("phone") || lower.includes("call") || lower.includes("contact") || lower.includes("owner") || lower.includes("vinod")) {
          replyText = `${prefix}Proprietor Mr. Vinod Kumar Varnawal ji ka contact:
Phone / WhatsApp: +91 8210625483
Dukaan: Meetha Hatti, Kazi Bazar, Maharajganj, Siwan.`;
        } else if (lower.includes("size") || lower.includes("sizes") || lower.includes("gsm")) {
          replyText = `${prefix}Ready Sizes: 6x6, 9x12, 12x18, 15x18, 18x24, 24x30, 30x40, 30x60 ft.
GSM Options: 120, 150, 200, 250, 300+ GSM. Custom size bhi banta hai.`;
        } else {
          replyText = `${prefix}Main Om Shringar Tirpal Store ka AI Assistant Om Setu hoon.
Aap humse tirpal, silpaulin, dhalai plastic, green shade net ya factory wholesale rate ke baare me satik jankari le sakte hain. Direct call: +91 8210625483.`;
        }
      }

      // Enforce NO asterisk symbol in final output
      replyText = replyText.replace(/\*/g, "");

      res.json({ reply: replyText });
    } catch (err: any) {
      console.error("Chat error:", err);
      res.json({
        reply:
          "Namaste ji! Om Shringar Tirpal Store me aapka swagat hai. Kisi bhi jankari ya rate ke liye direct call ya WhatsApp karein: +91 8210625483 (Mr. Vinod Kumar Varnawal, Maharajganj).",
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

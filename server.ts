import express from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer } from "vite";
import { findProductBySlug, getProductSlug, PRODUCTS } from "./src/data";

async function startServer() {
  const app = express();
  const PORT = 3000;

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

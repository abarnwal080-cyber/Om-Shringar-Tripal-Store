export interface ProductVideo {
  url: string;
  title: string;
  defaultRotate?: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  division?: "polyware" | "general-store";
  saleType?: string;
  images: string[];
  description: string;
  features: string[];
  availableSizes?: string;
  commonSizes?: string[];
  isBestSeller?: boolean;
  detailedDescription?: string;
  benefits?: string[];
  specs?: Record<string, string>;
  applications?: string[];
  faqs?: FAQItem[];
  video?: ProductVideo;
  videos?: ProductVideo[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BrandPartner {
  name: string;
  logo: string;
}

export interface SpecialSheet {
  title: string;
  description: string;
  iconName: string;
}

export const BUSINESS_INFO = {
  name: "Om Shringar Tirpal Store",
  previousName: "Goyal Traders",
  established: 2000,
  owner: "Mr. Vinod Kumar Varnawal",
  phone: "+91 8210625483",
  phoneFormatted: "tel:+918210625483",
  whatsappLink: "https://wa.me/918210625483",
  ctaText: "Call for Bulk Orders & Wholesale Inquiries",
  supportBadge: "24×7 Customer Support",
  address: "Om Shringar Tirpal Store, Meetha Hatti, Kazi Bazar, Maharajganj, Siwan, Bihar – 841238",
  landmark: "Near Kazi Bazar, Meetha Hatti Road",
  googleMapsUrl: "https://share.google/NKvH5pnab2Z7fFKp2",
  hours: "Monday – Sunday: 6:00 AM – 9:00 PM (All 7 Days Open)",
};

export const BRAND_PARTNERS: BrandPartner[] = [
  {
    name: "Shalimar",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhYupOFug5Yj8fRM0Q74ENy_gKWvv5Dy6M9SlsFfbaJTHeWNACb06XwCwy&s=10"
  },
  {
    name: "Greatpaulin",
    logo: "https://plain-apac-prod-public.komododecks.com/202607/03/oDtfecDE2xAWZLABiKFx/image.jpg"
  },
  {
    name: "Silpaulin",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeMUnP6Z2TnQ59-T8IoNdUnuS71PtlmQcf7bQIttKIS6MUbQv_4_OmhU4&s=10"
  },
  {
    name: "Capstone Cheetah",
    logo: "https://plain-apac-prod-public.komododecks.com/202607/03/nH1liaiAJsZ72n7WVMa5/image.jpg"
  },
  {
    name: "Vision",
    logo: "https://media.licdn.com/dms/image/v2/C560BAQFljvsCvp1y2w/company-logo_200_200/company-logo_200_200/0/1630584191714/vision_plastics_inc_logo?e=2147483647&v=beta&t=D5xt-vVoXRwqmnW2EX33_rczHrjV-GGGW1AxWZXcZmE"
  },
  {
    name: "Goldpaulin",
    logo: "https://plain-apac-prod-public.komododecks.com/202607/03/m7zkbhNPvoPwDA32B9BY/image.jpg"
  },
  {
    name: "Black Bull",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPjWOzy_wJ_BmDWWcyXAj3vAIhq-4Dbdj129c1auNaHA&s=10"
  },
  {
    name: "Double Bull",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVowJ2c1FfQeCQR_Jc32h9YCj6YL5jljWfWOppnMKRmw&s=10"
  },
  {
    name: "Tuffpaulin",
    logo: "https://www.tuffpaulin.com/wp-content/uploads/2021/09/Tuff-logo-with-IS-Mark-e1629102662998.png"
  },
  {
    name: "Mipatex",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx12lnc13eV1UzLcfMfjctY3t6ZzPaNfySie4uS1eGAA&s=10"
  },
  {
    name: "Jumbo",
    logo: "https://plain-apac-prod-public.komododecks.com/202607/16/fqOq0hB8ZA982pAThU7G/image.jpg"
  },
  {
    name: "Himalaya",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiEr-VxegD2eLYFiBrrsbcYjH4ZxR1FbEbgxfpNP4JUg&s=10"
  },
  {
    name: "Fortune",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG-uVnYN4I820w2J4ZgUanUXZK81heB3UXJE87SN2MsPDdIN1IMPrJGA&s"
  },
  {
    name: "Vinex",
    logo: "https://plain-apac-prod-public.komododecks.com/202607/16/hDQT1Xo8iGIRV1LacJtu/image.jpg"
  }
];

export const PRODUCTS: Product[] = [
  {
    id: "stretch-film",
    name: "Transparent Stretch Film Roll",
    category: "Industrial Packaging",
    division: "polyware",
    description: "High-stretchability clear wrap designed for secure packing, product bundling, and temporary moisture protection.",
    images: [
      "https://cpimg.tistatic.com/09389722/b/4/Transparent-Plastic-Films.jpg",
      "https://tiimg.tistatic.com/fp/1/010/266/transparent-stretch-wrap-film-411.jpg",
      "https://images.meesho.com/images/products/668665923/hst3n_512.avif?width=512",
      "https://5.imimg.com/data5/KW/EX/JH/SELLER-50282900/stretch-film-500x500.jpg",
      "https://img.magnific.com/premium-vector/big-roll-transparent-stretch-film-packaging_98402-214967.jpg?semt=ais_hybrid&w=740&q=80"
    ],
    features: [
      "Excellent Cling",
      "Puncture Resistant",
      "Dust Protection",
      "High Clarity"
    ],
    detailedDescription: "Our premium industrial-grade Transparent Stretch Film Roll is designed with exceptional cling strength and puncture resistance. Ideal for pallet wrapping, secure packaging of machinery, boxes, and high-value transport bundles, it keeps items moisture-proof and dust-free during transit.",
    benefits: [
      "Outstanding stretch capacity of up to 300% to save material cost.",
      "High-cling formulation ensures layers lock securely without adhesive.",
      "Protects surfaces against direct moisture, scratches, dust, and rain.",
      "Ultra-clear quality allows easy reading and scanning of barcodes."
    ],
    specs: {
      "Material": "Linear Low-Density Polyethylene (LLDPE)",
      "Thickness/GSM": "23 Microns",
      "Color Options": "Crystal Clear / Transparent",
      "Brand": "Vision / Goldpaulin",
      "Roll Width": "18 inches / 24 inches",
      "Roll Length": "100 meters to 500 meters",
      "Puncture Resistance": "Excellent (High Tensile)",
      "Cling Rate": "Self-adhering (No Glue Residue)"
    },
    applications: ["Industrial Use", "Transport", "Warehouses"],
    video: {
      url: "https://stretchi.edgeone.dev/",
      title: "Transparent Stretch Film Roll Wrapping & Cling Test",
      defaultRotate: 0
    },
    videos: [
      {
        url: "https://stretchi.edgeone.dev/",
        title: "Transparent Stretch Film Roll Wrapping & Cling Test",
        defaultRotate: 0
      }
    ],
    faqs: [
      { question: "Is this film sticky on both sides?", answer: "It is a self-clinging film, meaning it binds perfectly to itself without leaving any sticky adhesive residue on your wrapped products." },
      { question: "What is the primary thickness of this stretch roll?", answer: "Our standard industrial stretch film is 23 microns thick, offering the ultimate balance of stretchability and tear resistance." },
      { question: "Can it be used for shipping pallet stabilization?", answer: "Yes, this is the exact industry-standard material used by shipping companies and warehouses for securing heavy cargo pallets." }
    ]
  },
  {
    id: "blue-polythene",
    name: "Construction Blue Polythene Roll",
    category: "Construction & Curing",
    division: "polyware",
    description: "Heavy-duty blue polythene sheets engineered for highway concrete curing, moisture insulation, and temporary roofs.",
    images: [
      "https://plain-apac-prod-public.komododecks.com/202607/03/qab82eSfCIUQZ1Se0koa/image.png",
      "https://m.media-amazon.com/images/I/61E7AvKTMtL.jpg",
      "https://5.imimg.com/data5/ANDROID/Default/2026/1/575990244/YW/ZF/GZ/69331764/product-jpeg-500x500.jpg",
      "https://m.media-amazon.com/images/I/61QsG919cRL._AC_UF894,1000_QL80_.jpg",
      "https://kisanenterprises.in/assets/images/gallery/gallery_1779689446.jpeg"
    ],
    availableSizes: "8 ft to 36 ft",
    commonSizes: ["12 feet", "15 feet", "18 feet", "24 feet", "30 feet", "36 feet"],
    features: [
      "Moisture Locking",
      "High Strength",
      "UV Stabilized",
      "Continuous Rolls"
    ],
    detailedDescription: "Engineered specifically for heavy civil engineering, road construction, and structural moisture barriers, our Blue Polythene Roll is a highly trusted product in Bihar. It functions as a superior curing sheet by locking water hydration inside concrete slates, drastically enhancing road and slab durability.",
    benefits: [
      "Drastically improves cement hydration and curing speed.",
      "Extremely resistant to tearing from gravel, rebars, and boots.",
      "Highly resilient to thermal expansion and prolonged exposure to sun.",
      "Continuous rolls ensure fewer joints and overlapping errors."
    ],
    specs: {
      "Material": "Virgin/Semi-Virgin High-Density Polyethylene (HDPE)",
      "Thickness/GSM": "100 to 250 Microns (Heavy Duty)",
      "Color Options": "Royal Blue",
      "Brand": "Shalimar / Greatpaulin",
      "Roll Width": "8 ft to 36 ft",
      "Roll Length": "30 meters to 100 meters (Continuous)",
      "UV Protection": "Yes (UV Stabilized)",
      "Waterproof Rate": "100% Leak Proof"
    },
    applications: ["Construction", "Agriculture", "Industrial Use"],
    video: {
      url: "https://dhalai.edgeone.dev/",
      title: "Construction Blue Polythene Dhalai & Concrete Curing Video",
      defaultRotate: 90
    },
    faqs: [
      { question: "Why is blue polythene preferred for road construction?", answer: "Blue polythene prevents water evaporation during the cement-setting phase, ensuring a highly durable curing process with fewer cracks." },
      { question: "Which sizes are most popular in Bihar?", answer: "The most popular widths are 12 feet, 18 feet, and 24 feet, which are readily in stock for instant dispatch." },
      { question: "Can this withstand high summer temperatures?", answer: "Absolutely. Our blue rolls are custom UV-stabilized to prevent melting or weakening in high-heat outdoor environments." }
    ]
  },
  {
    id: "black-polythene",
    name: "Construction Black Polythene Roll",
    category: "Construction & Curing",
    division: "polyware",
    description: "Multi-layered black foundation sheets acting as a powerful damp barrier, silage shield, and protective ground cover.",
    images: [
      "https://plain-apac-prod-public.komododecks.com/202607/03/eckT9KEMGbavrebTJwPJ/image.png",
      "https://cpimg.tistatic.com/07558039/b/4/Road-Construction-Polyethylene-Sheet.jpg",
      "https://5.imimg.com/data5/SELLER/Default/2025/3/497555378/HO/NI/NS/8078121/ldpe-black-plastic-roll-500x500.jpg"
    ],
    features: [
      "Zero Permeability",
      "Chemical Resistant",
      "100% Opaque",
      "Durable Polymer"
    ],
    detailedDescription: "Our Black Polythene Roll is built from robust multi-layered high-density polymers. Designed primarily for underground damp proofing (DPC) in buildings, it blocks rising ground water. It is also exceptionally popular in agriculture for solar soil mulching, silage creation, and waterproofing underlayments.",
    benefits: [
      "Complete light blockage prevents weed growth when used as a mulch cover.",
      "Acts as a lifelong barrier against moisture, radon, and soil acids.",
      "Extremely economical option for large-scale warehouse floor lining.",
      "Tear-proof formulation supports concrete pouring directly on top."
    ],
    specs: {
      "Material": "Heavy-Duty Low-Density Polyethylene (LDPE) / HDPE",
      "Thickness/GSM": "150 to 300 Microns",
      "Color Options": "Deep Black (Opaque)",
      "Brand": "Silpaulin / Shalimar",
      "Roll Width": "8 ft to 36 ft",
      "Roll Length": "Continuous roll format",
      "Permeability": "0% Water Penetration",
      "Acid Resistance": "High (Protects from soil minerals)"
    },
    applications: ["Construction", "Agriculture", "Warehouses"],
    video: {
      url: "https://blacksheet.edgeone.dev/",
      title: "Construction Black Polythene Damp Proofing & Silage Demo Video",
      defaultRotate: 0
    },
    videos: [
      {
        url: "https://blacksheet.edgeone.dev/",
        title: "Construction Black Polythene Damp Proofing & Silage Demo Video",
        defaultRotate: 0
      }
    ],
    faqs: [
      { question: "Can I use black polythene under concrete house foundation?", answer: "Yes, it is widely used as a Damp Proof Course (DPC) sheet to prevent ground moisture from leaking into walls and ceilings." },
      { question: "Is this black sheet completely opaque?", answer: "Yes, it is 100% black and opaque, which makes it perfect for solar weed-killing and silage storage." },
      { question: "Is it reusable?", answer: "Yes, due to its heavy-duty thickness, it can be reused multiple times for grain drying, covering construction materials, or soil protection." }
    ]
  },
  {
    id: "transparent-shisha",
    name: "Transparent Shisha Roll",
    category: "Clear Covering",
    division: "polyware",
    description: "Flexible, glass-like clear LDPE sheets popular for premium counter shielding, window coverings, and table protectors.",
    images: [
      "https://5.imimg.com/data5/ANDROID/Default/2024/9/449619383/UL/CG/RW/25980061/product-jpeg-500x500.jpg",
      "https://d91ztqmtx7u1k.cloudfront.net/ClientContent/Images/ExtraLarge/ldpe-transparent-polythene-she-20260408102254913.webp",
      "https://m.media-amazon.com/images/I/41LHMFhdQHL.jpg",
      "https://m.media-amazon.com/images/I/41gR1A-TXpL._AC_UF1000,1000_QL80_.jpg",
      "https://www.singhalmart.com/cdn/shop/files/10_18b97978-aa7d-414d-9250-46cb1a1fc668.jpg?v=1740376713&width=1214"
    ],
    features: [
      "Crystal Clear",
      "Flexible Design",
      "Stain Proof",
      "Smooth Layout"
    ],
    detailedDescription: "The Transparent Shisha Roll is a premium-grade glass-like flexible sheet. Widely used across Bihar for high-end dining table covers, retail counter shields, cleanroom partitions, and temporary window panes, it provides reliable protection from water and dust while retaining 100% visual clarity.",
    benefits: [
      "Crystal clear high-transparency sheet replicates glass perfectly.",
      "Soft flexible texture ensures it drapes smoothly over furniture corners.",
      "Wipes clean in seconds with a damp cloth or mild soap water.",
      "Safe for direct contact with food items and table wares."
    ],
    specs: {
      "Material": "Premium Grade Transparent LDPE",
      "Thickness/GSM": "0.15mm to 1.0mm (Thick & Durable)",
      "Color Options": "Super Clear / Transparent",
      "Brand": "Vision / Premium Quality",
      "Roll Width": "3 ft to 6 ft",
      "Roll Length": "25 meters to 50 meters",
      "Stain Resistance": "100% Stain-proof",
      "Texture": "Smooth Glass-finish"
    },
    applications: ["Gardening", "Industrial Use", "Warehouses"],
    video: {
      url: "https://shisha.edgeone.dev/",
      title: "Transparent Shisha Polythene Sheet Roll Demo Video",
      defaultRotate: 0
    },
    videos: [
      {
        url: "https://shisha.edgeone.dev/",
        title: "Transparent Shisha Polythene Sheet Roll Demo Video",
        defaultRotate: 0
      }
    ],
    faqs: [
      { question: "Is this material heat resistant for hot food plates?", answer: "It can withstand warm tea cups and regular food plates, but placing burning hot pans directly on it is not recommended." },
      { question: "How do I clean dust or oil stains from the shisha sheet?", answer: "Just wipe it down with standard glass-cleaner spray or mild soapy water. It gets clean instantly." },
      { question: "Can I cut this sheet at home?", answer: "Yes! It is extremely flexible and can be customized with standard kitchen scissors or a utility cutter." }
    ]
  },
  {
    id: "tarpaulins",
    name: "Waterproof Premium Tarpaulins",
    category: "All-Weather Protection",
    division: "polyware",
    description: "Cross-laminated multi-layer waterproof tarpaulins (Tirpal) for cargo trucks, grain stockpiles, and monsoon tents.",
    images: [
      "https://5.imimg.com/data5/SELLER/Default/2023/4/301281309/FL/MC/FC/123837/waterproof-tarpaulins.webp",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMnKRYsLO4-_dEvoXIbHeNHj318r5xTIn_NU6K6kP-qg&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdDU6nw67_n3nYfJG-sm__4Shap_KWkczVDA0LU92Psw&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL3qnwqOQoCT7Un7Zev_Du5vQ0pfv5IualSuyDYL418Q&s=10",
      "https://images.jdmagicbox.com/quickquotes/images_main/vinyl-tarpaulin-300-gsm-p9rt7wzr.jpg"
    ],
    availableSizes: "6×6 ft up to 60×100 ft",
    features: [
      "100% Waterproof",
      "Rust-Proof Eyelets",
      "Tear Resistant",
      "Multi-Layer Strength"
    ],
    detailedDescription: "Om Shringar Tirpal Store's signature product: Waterproof Premium Tarpaulins (Tirpal) represent the absolute gold standard of heavy-duty protection in Siwan and Maharajganj. Built with cross-laminated technology, heat-sealed double joints, and rust-proof aluminum eyelets, these tirpals safeguard crops, cargo trucks, and shelters in extreme monsoons.",
    benefits: [
      "100% waterproof protection even under heavy standing water.",
      "Reinforced ropes sealed into the borders to survive severe windstorms.",
      "Rust-proof heavy grommets let you secure the tirpal easily anywhere.",
      "UV coatings prevent sun cracking and material hardening over years."
    ],
    specs: {
      "Material": "Cross-Laminated Multi-Layer Tarpaulin",
      "Thickness/GSM": "70 GSM to 450 GSM",
      "Color Options": "Yellow, Blue, Green, White, Silver, Black",
      "Brand": "Shalimar / Silpaulin / Goldpaulin",
      "Sizing Range": "6×6 feet up to 60×100 feet",
      "Eyelets": "Aluminum rust-proof every 3 feet",
      "Tear Strength": "Extremely High (Patented Cross-lamination)",
      "Lifespan": "Built to last multiple seasons"
    },
    applications: ["Agriculture", "Transport", "Construction", "Warehouses"],
    video: {
      url: "https://hopep.edgeone.dev/",
      title: "HDPE Waterproof Tarpaulin Quality & Flexibility Test",
      defaultRotate: 0
    },
    videos: [
      {
        url: "https://hopep.edgeone.dev/",
        title: "HDPE Waterproof Tarpaulin Quality & Flexibility Test",
        defaultRotate: 0
      },
      {
        url: "https://sensible-blush-cjql8l17.edgeone.dev/",
        title: "Heavy-Duty Tarpaulin Deployment & Stock Demonstration",
        defaultRotate: 90
      }
    ],
    faqs: [
      { question: "What does 'GSM' mean, and which GSM should I choose?", answer: "GSM stands for Grams per Square Meter. Higher GSM (like 250+ GSM) represents thicker, heavier tarpaulin for long-term truck covering, while lower GSM (like 120 GSM) is ideal for grain drying and light cover." },
      { question: "Are the eyelets rust-proof?", answer: "Yes, our premium tarpaulins are equipped with anodized rust-resistant aluminum eyelets placed every 3 feet for secure tying." },
      { question: "Do you supply customized sizes for large trucks?", answer: "Absolutely. We keep extra large sizes like 30x40 ft, 40x50 ft, and up to 60x100 ft in stock, perfect for wholesale or custom requirements." }
    ]
  },
  {
    id: "capstone-cheetah",
    name: "HDPE Capstone Cheetah",
    category: "All-Weather Protection",
    division: "polyware",
    description: "Official premium heavy-duty Capstone Cheetah branded tarpaulin offering 100% waterproof and UV-stabilized elite coverage.",
    images: [
      "https://cheetah.edgeone.dev/file.png",
      "https://plain-apac-prod-public.komododecks.com/202607/09/XZIjVVBxoKiATRHNKDXZ/image.jpg",
      "https://plain-apac-prod-public.komododecks.com/202607/09/IC8EGq4OoMQUyfg7wIj8/image.png",
      "https://plain-apac-prod-public.komododecks.com/202607/09/0YM1Z46abjzC6qEhFcNu/image.png",
      "https://plain-apac-prod-public.komododecks.com/202607/09/gGKNRgvofNlcUcvYnF9j/image.png",
      "https://lh3.googleusercontent.com/GVZyEChy8hTpNVgZds_-vzvfyIWXhKkdorFgQ07GeBxdJBQNI7a-3Dr_cZ4LZQGRXVszWUr182X1t-A2=w1690"
    ],
    video: {
      url: "https://cheetahmp4.edgeone.dev/",
      title: "HDPE Capstone Cheetah Heavy-Duty Tarpaulin Video",
      defaultRotate: 0
    },
    availableSizes: "Available Sizes: 8 ft – 36 ft",
    commonSizes: ["8 ft", "10 ft", "12 ft", "15 ft", "18 ft", "20 ft", "24 ft", "30 ft", "36 ft"],
    features: [
      "Capstone Quality",
      "All-Weather Proof",
      "Cheetah Strength",
      "Double-heat Welded"
    ],
    detailedDescription: "The HDPE Capstone Cheetah is an elite, high-performance branded tarpaulin recognized for its iconic cheetah-strength durability. Constructed using heavy-duty High-Density Polyethylene and reinforced with premium UV protection, it is widely used by contractors and commercial farmhouses for shielding high-value assets.",
    benefits: [
      "Premium branded quality with genuine Cheetah emblem trust.",
      "Superior tear-strength and stretch resistance under heavy tension.",
      "Ultra-thick heat-welded seams prevent any water seepage or leaks.",
      "Highly flexible and easy to fold/store despite its thickness."
    ],
    specs: {
      "Material": "Heavy-Duty High-Density Polyethylene (HDPE)",
      "Thickness/GSM": "200 GSM to 350 GSM",
      "Color Options": "Dual Tone (Silver-Black / Blue-Orange)",
      "Brand": "Capstone Cheetah",
      "Sizing Options": "8 ft up to 36 ft (Wide variants)",
      "UV Protection": "Premium Multi-coat UV Resistance",
      "Weather Rate": "All-Weather Performance (-20°C to 65°C)",
      "Seams": "Double-heat Welded"
    },
    applications: ["Agriculture", "Transport", "Construction", "Industrial Use"],
    faqs: [
      { question: "Is Capstone Cheetah a certified brand?", answer: "Yes, Capstone Cheetah is one of India's most recognized premium heavy-duty tarpaulin brands, and we are an authorized retail and wholesale dealer." },
      { question: "Does this tarpaulin peel off in extreme sun?", answer: "No, its advanced UV-stabilized outer coating is chemically bonded to prevent peeling, cracking, or hardening under the harsh Bihar sun." },
      { question: "Can I use it for constructing a long-term monsoon shelter?", answer: "Yes, it is designed for extreme multi-year outdoor usage, making it ideal for temporary shops, tents, and warehouse extensions." }
    ]
  },
  {
    id: "fencing-net",
    name: "Resham Fencing Net",
    category: "Security & Fencing",
    division: "polyware",
    description: "Heavy-gauge woven nylon-composite Resham threads netting. Suitable for fencing and bird protection. Not suitable for fish farming.",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8otM4gDSej31PTKee3zdt5B88vQWGKmkwAg9GpDdUv8OPxBkiqVGsJ5B8&s=10",
      "https://plain-apac-prod-public.komododecks.com/202607/09/wb70mUn6SRRtxoRETFla/image.png",
      "https://5.imimg.com/data5/SELLER/Default/2022/5/UO/IB/PP/147117331/nylon-bird-netting-250x250.jpg",
      "https://2.wlimg.com/product_images/bc-full/2021/1/748468/farm-fencing-net-1611398761-5700049.jpeg"
    ],
    video: {
      url: "https://polynet.edgeone.dev/",
      title: "Polyester / Resham Fencing Net Boundary Protection Video",
      defaultRotate: 0
    },
    videos: [
      {
        url: "https://polynet.edgeone.dev/",
        title: "Polyester / Resham Fencing Net Boundary Protection Video",
        defaultRotate: 0
      }
    ],
    isBestSeller: true,
    features: [
      "Resham Nylon",
      "Wind Resilient",
      "Rust Free",
      "No Fish Farming"
    ],
    detailedDescription: "Woven using ultra-strong, weather-hardened nylon-composite Resham threads, our Resham Fencing Net is Siwan's favorite boundary protector. Perfect for farm fencing, garden boundaries, and poultry yards, it allows clear airflow and sunlight while keeping birds and small animals safely contained.",
    benefits: [
      "Resham nylon weave has exceptional flexibility and tensile strength.",
      "Highly breathable mesh design prevents heat buildup for plants.",
      "Will never rust or rot unlike traditional steel wire fencing.",
      "Lightweight and highly economical to install over vast areas."
    ],
    specs: {
      "Material": "Nylon-Composite Resham Threads",
      "Mesh Size": "1 inch / 1.5 inches / 2 inches",
      "Color Options": "Forest Green / Ocean Blue",
      "Brand": "Premium Local Weaver Partner",
      "Height Options": "4 ft, 6 ft, 8 ft",
      "Roll Length": "100 ft to 300 ft",
      "Rust Resistance": "100% Rust-proof",
      "Important Note": "Strictly NOT suitable for fish farming"
    },
    applications: ["Poultry", "Gardening", "Agriculture"],
    faqs: [
      { question: "Can I use this net for fish farming (matsya palan)?", answer: "No. This net is made of woven Resham nylon thread which is highly recommended for farm boundaries and bird protection, but is NOT suitable for fish farming ponds." },
      { question: "How do I secure this net to the ground?", answer: "You can tie it easily to bamboo poles, wooden stakes, or iron pillars using metal wire or heavy nylon strings." },
      { question: "Does it rot when rained on?", answer: "Not at all. Resham nylon does not absorb moisture, meaning it will never rot or weaken during the monsoon season." }
    ]
  },
  {
    id: "fencing-net-jali",
    name: "Fencing Net (Jali)",
    category: "Security & Fencing",
    division: "polyware",
    description: "High durability plastic fencing net (Jali) designed for boundary walls, farms, gardens, poultry protection, and agriculture.",
    images: [
      "https://5.imimg.com/data5/SELLER/Default/2025/11/558470631/QJ/IJ/SO/253883783/garden-fencing-net-1000x1000.jpg",
      "https://static-01.daraz.com.bd/p/mdc/2fc6ed62f2ce6db8e2f917f70c9e4bb3.jpg",
      "https://agroholicbd.com/uploads/media-manager//2023%2F12%2F202312132149596-Fit-High-Fencing-Net-scaled-1732660145.jpg",
      "https://5.imimg.com/data5/SELLER/Default/2025/7/532122957/XX/ZI/PB/104304307/nylon-blue-fencing-net-500x500.jpg"
    ],
    video: {
      url: "https://polynet.edgeone.dev/",
      title: "Fencing Net (Jali) Strength Video",
      defaultRotate: 0
    },
    videos: [
      {
        url: "https://polynet.edgeone.dev/",
        title: "Fencing Net (Jali) Strength Video",
        defaultRotate: 0
      }
    ],
    availableSizes: "5 ft Height",
    commonSizes: ["100 ft Roll", "100 Meter Roll", "Custom Cut Lengths"],
    features: [
      "5 ft Tall Jali",
      "Continuous Rolls",
      "Custom Cuts",
      "Sun Resistant"
    ],
    detailedDescription: "Our Fencing Net (Jali) is a thick, extruded polymer mesh designed to act as a robust alternative to metal chicken wire. Standing exactly 5 feet high, it is perfect for agricultural farms, poultry enclosures, gardens, and boundary shields. It can be easily rolled out and custom cut for smaller requirements.",
    benefits: [
      "Strictly extruded rigid polymer structure resists sagging.",
      "Smooth, non-sharp plastic edges protect animals and poultry from cuts.",
      "Comes in easy-to-handle 100 ft or 100 meter rolls for fast setups.",
      "Extremely budget-friendly compared to chain-link steel fencing."
    ],
    specs: {
      "Material": "High-Density Polyethylene Plastic Extrusion",
      "Height": "5 feet fixed",
      "Roll Lengths": "100 ft Roll / 100 Meter Roll",
      "Custom Cut Options": "Available in custom cut meters upon request",
      "Color Options": "Bright Green / Blue",
      "Brand": "Shalimar / Greatpaulin",
      "Mesh Type": "Rigid Hexagonal / Square Jali",
      "Sun Exposure": "UV Stabilized outdoor grade"
    },
    applications: ["Poultry", "Gardening", "Agriculture"],
    faqs: [
      { question: "Is the height customizable?", answer: "The roll has a fixed height of 5 feet, but we can cut the length (meters) to perfectly match your garden or poultry boundary." },
      { question: "Does it sag in high winds?", answer: "If properly tensioned and secured on strong bamboo or metal stakes every 5-6 feet, it retains its straight, rigid structure." },
      { question: "Is it safe for chicken poultry farms?", answer: "Yes, it is widely used in Bihar for poultry setups because it has no sharp metal wires that can injure chickens." }
    ]
  },
  {
    id: "thermocol-sheets",
    name: "Construction Thermocol Sheets (EPS Blocks & Sheets)",
    category: "Construction & Curing",
    division: "polyware",
    saleType: "Retail & Wholesale Available",
    description: "High-quality EPS Thermocol sheets suitable for construction, insulation, packaging, false ceilings, and household applications. Available in retail single pieces and wholesale bundles directly at our Maharajganj store.",
    images: [
      "https://tiimg.tistatic.com/fp/1/003/087/thermocol-blocks-870.jpg",
      "https://www.epackindia.com/wp-content/uploads/2023/07/Largest-Thermocol-Sheets-Manufacturer-in-India-e1688211124714.jpg"
    ],
    features: [
      "Retail & Wholesale Available",
      "Thermal Insulation",
      "Moisture Resistant",
      "Easy to Cut",
      "Lightweight"
    ],
    detailedDescription: "Our high-grade Expanded Polystyrene (EPS) Thermocol sheets provide outstanding structural insulation and load-bearing performance. From false ceilings to under-slab roof insulation, cold storage, and heavy-duty product packaging, these sheets offer superior moisture resistance, thermal damping, and are incredibly simple to cut and position.",
    benefits: [
      "Highly effective thermal barrier reduces indoor temperatures naturally.",
      "Extremely lightweight structure decreases structural loads in ceilings.",
      "Moisture-proof and water-resistant chemistry prevents dampness or rotting.",
      "Easy to shape and cut with standard hot-wire or manual cutters."
    ],
    specs: {
      "Availability": "Retail & Wholesale Available (Single Sheets to Bulk Bundles)",
      "Thickness Available": "0.5 inch, 1 inch, 1.5 inch, 2 inch",
      "Material": "EPS (Expanded Polystyrene)",
      "Density": "Standard High-Density Grade",
      "Thermal Conductivity": "Low (Superior Insulation)",
      "Moisture Resistance": "High",
      "Sizes Available": "Multiple sizes and blocks customizable upon request"
    },
    applications: [
      "Roof insulation",
      "Wall insulation",
      "Construction",
      "Cold storage",
      "Packaging",
      "False ceiling"
    ],
    video: {
      url: "https://theps.edgeone.dev/",
      title: "Construction Thermocol (EPS) Sheets & Blocks Demonstration Video",
      defaultRotate: 0
    },
    videos: [
      {
        url: "https://theps.edgeone.dev/",
        title: "Construction Thermocol (EPS) Sheets & Blocks Demonstration Video",
        defaultRotate: 0
      }
    ],
    faqs: [
      { question: "Can I buy EPS Thermocol sheets in retail (single sheet)?", answer: "Yes! Hum EPS Thermocol sheets retail aur wholesale dono mein bechte hain. You can purchase single sheets for home projects, model crafts, or packaging directly from our Maharajganj counter, or order bulk commercial bundles at factory rates." },
      { question: "What sizes and thicknesses of Thermocol sheets are available?", answer: "We keep standard thicknesses of 0.5 inch, 1 inch, 1.5 inch, and 2 inch in stock. Custom block sizes can also be ordered for large-scale insulation requirements." },
      { question: "Are EPS Thermocol sheets effective for soundproofing?", answer: "Yes, they provide sound dampening and are frequently used in home theaters, studio walls, and partition barriers to lower ambient sound transmission." },
      { question: "Does this material degrade under high humidity?", answer: "Not at all. Expanded Polystyrene is highly moisture-resistant and does not promote mold, rot, or mildew, making it ideal for ceiling and underground insulation." },
      { question: "Can these sheets be used for heavy cargo packaging?", answer: "Absolutely. Due to their high shock-absorption properties, these EPS sheets are highly preferred for industrial packaging and safeguarding fragile appliances during transport." },
      { question: "How do I install these sheets on a ceiling or roof?", answer: "They can be fixed easily using specialized non-solvent adhesives, screws with washers, or slotted into standard false-ceiling metal grids." }
    ]
  },
  {
    id: "plastic-mat-chatai",
    name: "Premium Plastic Mat (Chatai)",
    category: "Household & Outdoor",
    division: "polyware",
    saleType: "Retail & Wholesale Available",
    description: "Premium-quality plastic mats suitable for home, travel, picnics, sleeping, prayer, and everyday household use. Available in single retail pieces for home use and bulk wholesale orders.",
    images: [
      "https://m.media-amazon.com/images/I/A1AtzXGSRiL._SL1500_.jpg",
      "https://m.media-amazon.com/images/I/914EanHR8-L._AC_UF350,350_QL80_.jpg",
      "https://m.media-amazon.com/images/I/A1LZHQRsvvL.jpg",
      "https://m.media-amazon.com/images/I/81LDq2IS-pL._SL1169_.jpg"
    ],
    features: [
      "Retail & Wholesale Available",
      "Foldable",
      "Waterproof",
      "Washable",
      "Durable"
    ],
    detailedDescription: "Our Premium Plastic Chatai (Mats) are woven using high-quality virgin polymers for unmatched strength, flexibility, and vibrant designs. Designed for multipurpose use across Bihar homes, these mats are perfect for household sitting, sleeping, religious prayers, gardens, travel, and picnic getaways. Fully waterproof, washable, and easy to fold, they are built to last.",
    benefits: [
      "Folds into a highly compact size for easy storage and travel portability.",
      "100% waterproof woven plastic wipes clean of mud, dust, or food instantly.",
      "Tightly woven structure avoids unraveling and supports heavy everyday usage.",
      "Vibrant patterns and double-sided patterns fit both indoor and outdoor settings."
    ],
    specs: {
      "Availability": "Retail & Wholesale Available (Single Mat to Bulk Quantity)",
      "Available Sizes": "Single Bed, Double Bed, Large Family Size",
      "Material": "Premium woven virgin plastic / Polypropylene",
      "Properties": "Waterproof, Foldable, Washable, Lightweight",
      "Edges": "Reinforced heat-sealed border bindings",
      "Texture": "Soft, comfortable, and skin-friendly weave",
      "Cleaning": "Wipe with damp cloth or wash with water hose"
    },
    applications: [
      "Sleeping",
      "Picnic",
      "Prayer",
      "Home",
      "Garden",
      "Travel",
      "Camping",
      "Floor sitting"
    ],
    video: {
      url: "https://polymat.edgeone.dev/",
      title: "Premium Plastic Floor Mat (Chatai) Demonstration Video",
      defaultRotate: 0
    },
    videos: [
      {
        url: "https://polymat.edgeone.dev/",
        title: "Premium Plastic Floor Mat (Chatai) Demonstration Video",
        defaultRotate: 0
      }
    ],
    faqs: [
      { question: "Can I buy plastic mats (chatai) in retail (single piece)?", answer: "Yes! Hum plastic mats retail aur wholesale dono mein bechte hain. Single pieces are readily available at our retail counter in Maharajganj, and bulk quantities are provided for retail traders and event organizers." },
      { question: "Is this plastic mat fully washable?", answer: "Yes! You can wash it directly with running water from a pipe or wipe it down with a damp cloth and mild soap. It dries very quickly in the air." },
      { question: "What sizes are available in your Maharajganj store?", answer: "We supply three main sizes: Single Bed mat, Double Bed mat, and Extra-Large Family size mat. All are available in various colorful patterns." },
      { question: "Is the material safe for kids to sit and play on?", answer: "Absolutely. Our premium mats are woven from non-toxic, virgin polypropylene threads that are soft, smooth, and fully safe for children and family use." },
      { question: "Can I use this Chatai for outdoor camping and picnics?", answer: "Yes, it is extremely lightweight, easy to fold, and acts as a barrier against damp soil or grass, making it the perfect outdoor companion." },
      { question: "Will the colors fade under direct sunlight?", answer: "Our mats are made using UV-resistant plastic dyes, which helps them maintain their vibrant colors and patterns even during regular outdoor use." }
    ]
  },
  {
    id: "waterproof-table-cover",
    name: "Waterproof Table Cover (6 Seater)",
    category: "Household & Outdoor",
    division: "polyware",
    saleType: "Retail & Wholesale Available",
    description: "Premium waterproof table covers that protect dining tables from spills, stains, scratches, and heat while enhancing home décor. Available in single pieces for retail home use and wholesale packs for traders.",
    images: [
      "https://rukmini1.flixcart.com/image/1500/1500/xif0q/table-cover/6/9/z/pink-green-flower-jaal-pattern-digital-print-polyester-stitched-original-imah7gnbqszyfbzg.jpeg?q=70",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSra4FykmHGsPqzxxBcZMdRwjff5RkGg0Lhbom4mnHqVg&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQGE9of_AcH9nq0463Ut85x9LBHr9gj8c6hRywqb024g&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQu10QLVFX0paOsU5nzvrpcVkKyy84M7QmxXMd6PDsqw&s=10"
    ],
    features: [
      "Retail & Wholesale Available",
      "Waterproof",
      "Easy Clean",
      "Stylish",
      "Durable"
    ],
    detailedDescription: "Transform your dining experience with our Premium Waterproof Table Cover, designed specifically for standard 6-seater dining tables. Fabricated with a high-durability liquid-proof protective barrier, this cover protects your valuable wood, glass, or marble tables from accidental food spills, coffee stains, cutlery scratches, and warm dishes while elevating your home dining aesthetics.",
    benefits: [
      "100% waterproof surface completely repels oils, gravies, and beverages.",
      "Stain-resistant layer wipes clean with a single stroke of a dry or damp sponge.",
      "Soft under-layer prevents scratches and reduces the clatter of plates and cups.",
      "Premium digital prints and elegant edge borders complement any modern home décor."
    ],
    specs: {
      "Availability": "Retail & Wholesale Available (Single Piece to Bulk Supply)",
      "Size": "6 Seater",
      "Waterproof": "Yes (100% Liquid Proof)",
      "Washable": "Yes (Hand-wash or easy wipe clean)",
      "Reusable": "Highly Durable and Reusable",
      "Fabric Material": "Heavy-duty premium polyester / PVC composite",
      "Designs": "Multiple floral, geometric, and digital prints available"
    },
    applications: [
      "Dining table",
      "Kitchen",
      "Restaurants",
      "Hotels",
      "Cafeteria",
      "Home décor"
    ],
    faqs: [
      { question: "Can I buy dining table covers in retail (single piece)?", answer: "Yes! Hum dining table covers retail aur wholesale dono mein bechte hain. You can choose individual designer prints for your home dining table directly from our Maharajganj store or order wholesale packs." },
      { question: "How do I clean food or grease stains from this table cover?", answer: "You don't need to wash it in a machine. Simply use a damp cloth, sponge, or kitchen tissue with a tiny drop of dish soap to wipe away oil, tea, or gravy instantly." },
      { question: "Is this table cover heat resistant?", answer: "It easily withstands warm food plates, tea cups, and soup bowls. However, placing hot-off-the-stove pots or sizzling baking trays directly on it is not recommended; always use a trivet." },
      { question: "Will it fit my 4-seater or 8-seater dining table?", answer: "This specific range is custom-sized for standard 6-seater dining tables. For 4-seater or 8-seater tables, please visit our Maharajganj store or message us on WhatsApp for specialized sizes!" },
      { question: "Is the print durable, or will it fade after washing?", answer: "We use premium digital printing technology with high-grade pigment binding, ensuring the vibrant floral and geometric prints remain bright and colorful for years of daily use." },
      { question: "Does the table cover slide off easily?", answer: "No, our table covers are engineered with a slip-resistant matte backing that grips the table surface firmly, preventing accidental slips or shifts during dining." }
    ]
  },
  {
    id: "cosmetics-shringar",
    name: "Premium Cosmetics & Shringar Range",
    category: "Cosmetics & Beauty",
    division: "general-store",
    description: "A premium retail collection of beauty products, makeup, bridal shringar accessories, and personal care items directly available at our Maharajganj store.",
    images: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&auto=format&fit=crop&q=60"
    ],
    features: [
      "Complete Bridal Kits",
      "Premium Brand Makeup",
      "Daily Skincare Range",
      "Exclusive Retail Selection"
    ],
    detailedDescription: "As our business name 'Om Shringar Tirpal Store' proudly represents, we house a dedicated, beautifully curated retail section for high-quality Cosmetics and Bridal Shringar products. Please note: For our cosmetics and beauty range, we operate exclusively as a retail store (not a wholesaler). We welcome individual walk-ins, brides-to-be, and families to visit our Maharajganj store to explore genuine products ranging from vermilion (Sindoor), bangles, bindis, and bridal kits to top national beauty and skincare brands.",
    benefits: [
      "Genuine, branded cosmetics with complete quality assurance at the best retail prices.",
      "100% skin-safe, authentic products sourced directly from authorized brand distributors.",
      "Personalized assistance in-store to find your perfect shades and complete bridal requirements.",
      "Regularly updated stock featuring the latest beauty trends and festive collections."
    ],
    specs: {
      "Services Offered": "Retail Sale Only (Direct Store Walk-ins)",
      "Products Available": "Sindoor, Bindis, Bangles, Lipstick, Kajal, Foundations, Creams, Hair Oils, & Complete Bridal Shringar Sets",
      "Brands Offered": "Lakme, L'Oreal, Lotus, Blue Heaven, and Premium Local Traditional Brands",
      "Quality Standard": "100% Skin-safe, Authentic and Fresh Stocks",
      "Occasion Kits": "Bridal Special, Karwa Chauth, Teej, Chhath Pooja, & Diwali combos"
    },
    applications: [
      "Personal everyday use",
      "Bridal and wedding makeup",
      "Festive occasions & pooja gifting",
      "Local parlor walk-ins"
    ],
    faqs: [
      { question: "Do you supply cosmetics in wholesale or bulk?", answer: "No, for our Cosmetics and Shringar range, we operate strictly as a premium retailer. We offer highly attractive retail prices for single items and personal kits, but we do not supply bulk wholesale cartons to other shops." },
      { question: "Are your cosmetics genuine and fresh?", answer: "Absolutely. We strictly source from official and authorized distributor channels for major national brands, guaranteeing 100% authentic products with long expiry dates." },
      { question: "Can we get customized bridal shringar sets in-store?", answer: "Yes! Walk into our Maharajganj store, and our staff will happily help you curate a custom wedding set featuring bangles, bindis, premium sindoor, and branded cosmetics matched to your choice and budget." }
    ]
  },
  {
    id: "plastic-ropes-packaging",
    name: "Plastic Ropes & Packaging Materials",
    category: "Packaging Materials",
    division: "polyware",
    description: "Heavy-duty virgin PP plastic ropes, box strapping rolls, and industrial packaging materials designed for agricultural bundling, cargo tying, and secure transit.",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAkiy8QKTQwbA4ZeI6LtlLzl5WsNco8JtQVomgVgNZBw&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxtqDRExh39Jw8Auu2EjVxtT177vUl56LmMNxFEom5pQ&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgJ7TMhyiFJzjm7eKHG97hC3O1NdG_hlXoZND2qguK-w&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1afyaK5sunzQxs2PWdmPx81R4ctVvrD9iw2pcjybaoA&s=10"
    ],
    features: [
      "High Tensile Polypropylene",
      "Weather & Chemical Proof",
      "Anti-Slip Grip Twist",
      "Bulk Bundles & Rolls"
    ],
    detailedDescription: "Our industrial plastic ropes and packaging materials are manufactured from top-grade virgin polypropylene resins. Engineered specifically to withstand severe outdoor stress, tension, and moisture, they serve farmers, transport operators, and commercial warehouses across Bihar for heavy freight binding, sack stitching, and cargo tying.",
    benefits: [
      "Outstanding tensile strength prevents sudden breaks under heavy cargo load.",
      "Completely unaffected by water, rot, oil, or soil chemicals.",
      "Lightweight yet remarkably strong, lowering shipping tie-down effort.",
      "Available in continuous coils and custom-weight bundles for wholesale buyers."
    ],
    specs: {
      "Material": "100% Virgin Polypropylene (PP)",
      "Diameters": "4mm to 20mm Industrial Gauge",
      "Form Factor": "Twisted 3-Strand Coils & Compact Spools",
      "UV Resistance": "High UV Stabilized for outdoor exposure",
      "Supply Mode": "Wholesale Coils (by Kg) and Retail Rolls"
    },
    applications: [
      "Truck & Trailer Cargo Tying",
      "Crop Bundling & Field Trellising",
      "Warehouse Box Strapping",
      "Scaffold & Tarp Anchor Lines"
    ],
    faqs: [
      { question: "Are these plastic ropes weather resistant for rainy seasons?", answer: "Yes, our polypropylene ropes do not absorb water, resist mildew, and stay strong in monsoons without rotting." },
      { question: "Can I purchase plastic ropes by kilogram in wholesale?", answer: "Yes! We supply complete wholesale bundles and coils weighed precisely by kilogram at direct factory distributor rates." }
    ]
  },
  {
    id: "safari-backpack",
    name: "Safari Backpack",
    category: "Backpacks & Luggage",
    division: "general-store",
    description: "Ergonomic, water-resistant Safari casual and travel backpack engineered with padded laptop sleeve, multiple organizer compartments, and rugged SBS zippers.",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFBDpOpaiYIJWNe5X9niMnBZzboGBhyS5rwrx5YbtXuQ&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUcQGTe0BW1AH-tVEkEKMssv2hskoSl4zXVyLv0sR_tw&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGoPbwN3wAlojKsFPpGZvK9m574z0XPbgW2ijPKoF78A&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQipfrP_rFEBEiQpxRUEuLo1EsZNZC2npMDHd6_FxLjA&s=10"
    ],
    features: [
      "Padded Laptop Pocket",
      "Rain & Water Resistant",
      "Breathable Back Mesh",
      "Heavy-Duty Zippers"
    ],
    detailedDescription: "Designed for modern commuters, college students, and active travelers, this genuine Safari backpack delivers ultimate storage organization and spine ergonomics. Built with premium water-resistant fabric, heavy-duty stitching, and ventilated back padding for all-day carrying comfort.",
    benefits: [
      "Cushioned laptop sleeve safeguards devices up to 15.6 inches.",
      "Air-mesh back panel provides superior ventilation on hot commutes.",
      "Multiple organized pockets keep stationery, water bottles, and chargers tidy.",
      "Iconic Safari build quality backed by official national warranty."
    ],
    specs: {
      "Brand": "Safari",
      "Capacity": "32 Liters (3 Spacious Compartments)",
      "Material": "High-Density Water-Resistant Polyester",
      "Laptop Fit": "Up to 15.6 Inch Laptops",
      "Warranty": "Official National Manufacturer Warranty"
    },
    applications: [
      "College & University",
      "Daily Office Commute",
      "Weekend Short Trips",
      "Tech & Gadget Carrying"
    ],
    faqs: [
      { question: "Is this genuine Safari brand?", answer: "Yes, 100% original Safari merchandise sourced through authorized distribution channels." },
      { question: "Does it have a dedicated rain cover?", answer: "The outer fabric is water-resistant against light to moderate rain showers, keeping internal books and gadgets dry." }
    ]
  },
  {
    id: "aristocrat-backpack",
    name: "Aristocrat Backpack",
    category: "Backpacks & Luggage",
    division: "general-store",
    description: "Sleek and sturdy Aristocrat multi-utility daypack with reinforced stitching, ergonomic shoulder straps, and spacious dual-compartment organizer.",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxfPe9dkNqyLBG_J7KzrTGeUFlXn_EVNXpqI1AfNOQiw&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4FS4r8I4HV-7KTIT6hv2Hg8HP8b9aeI-vYhKziM0l3w&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtByj47rLZeg_XDvyEWPZ2sGLYHUsAYftl86IcwM32Ww&s=10"
    ],
    features: [
      "Dual Deep Compartments",
      "Reinforced Base Panel",
      "Quick-Access Front Pocket",
      "Ergonomic Shoulder Straps"
    ],
    detailedDescription: "The Aristocrat backpack brings legendary VIP Industries durability to daily commuting. Engineered with tear-resistant micro-weave fabric and reinforced load-bearing seams, it easily handles heavy books, textbooks, and accessories.",
    benefits: [
      "Reinforced bottom panel resists wear from rough floors and benches.",
      "Even weight distribution cushions shoulders and neck muscles.",
      "Front easy-access stash pocket for wallet, keys, and transit passes.",
      "Sophisticated clean aesthetic suitable for school, college, or workplace."
    ],
    specs: {
      "Brand": "Aristocrat (VIP Industries)",
      "Capacity": "30 Liters",
      "Fabric": "Heavy Duty Ripstop Polyester",
      "Shoulder Straps": "High-Density Cushioned Foam",
      "Weight": "Super Lightweight (approx. 420g)"
    },
    applications: [
      "High School & College Students",
      "Daily Office Carry",
      "Coaching & Tuition Classes",
      "Overnight Trips"
    ],
    faqs: [
      { question: "Is Aristocrat an original VIP brand?", answer: "Yes! Aristocrat is the popular, trusted brand from VIP Industries Ltd." }
    ]
  },
  {
    id: "kids-bags",
    name: "Kids Bags",
    category: "Backpacks & Luggage",
    division: "general-store",
    description: "Vibrant cartoon, superhero, and lightweight ergonomic school bags designed specifically for nursery, primary, and elementary school children.",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu1ANiTjkR23GOvBZs2sw--w9u63PXrALdTFQ6-8-X2Q&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMkFuF7X72ACiCI3hbnKrEmI-qAoBDMIZ33BAUXEAesw&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7x7USuCP5oXgY0SnyJ9aBSE-BvD38DcccMqNxoQe34Q&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9FRiSZNL1GhnfYJyu5e_Bph97qCdbTNG9ONLzQxHxVQ&s"
    ],
    features: [
      "Spine-Friendly Lightweight",
      "Popular 3D Cartoon Prints",
      "Dual Water Bottle Pockets",
      "Durable Child-Safe Materials"
    ],
    detailedDescription: "Bright, fun, and ultra-comfortable kids school bags featuring exciting cartoon graphics, 3D embossed designs, and soft padded shoulder straps that protect young growing spines. Built with child-friendly non-toxic fabrics and durable smooth-glide zips.",
    benefits: [
      "Extremely light empty weight prevents unnecessary strain on children.",
      "Exciting colors and character designs make kids look forward to school.",
      "Spacious main compartment easily accommodates lunch boxes, pencil kits, and books.",
      "Wipe-clean exterior makes cleaning accidental juice spills effortless."
    ],
    specs: {
      "Target Age": "3 to 12 Years (Nursery to 6th Grade)",
      "Themes": "Spiderman, Barbie, Avengers, Unicorn, Cartoons",
      "Material": "Non-toxic Oxford Fabric & EVA Embossing",
      "Pockets": "2 Main Compartments + 1 Front Organizer + 2 Mesh Pockets"
    },
    applications: [
      "Nursery & Primary School",
      "Kids Tuition & Drawing Classes",
      "Picnics & Family Outings",
      "Birthday Gifts"
    ],
    faqs: [
      { question: "Are these bags washable if stained by food or ink?", answer: "Yes, you can easily hand wash them in lukewarm soapy water or wipe them down with a damp cloth." }
    ]
  },
  {
    id: "tour-backpack",
    name: "Tour Backpack (Rucksack)",
    category: "Backpacks & Luggage",
    division: "general-store",
    description: "Heavy-duty expedition and trekking rucksack featuring internal back support, sleeping mat attachments, rain cover, and load-bearing hip belts.",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_NN1CZlgSToMHHrk79YtxcydoQt1WgC_WtOJoKMiujg&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIJc9j5tb0s5o6_KL_MiEBHLlFmBhRmIfK1VuGG_9QmA&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS08ZrAIYboP4jZ6OyXH7FNENZeWr_KQTdLSaPlh5rZpg&s"
    ],
    features: [
      "55L to 75L High Capacity",
      "Integrated Rain Cover",
      "Padded Lumbar & Hip Belts",
      "Trekking Pole & Mat Straps"
    ],
    detailedDescription: "For long-haul travelers, pilgrims, and outdoor trekkers, this heavy-duty tour rucksack delivers expansive packing room, modular gear loops, and an ergonomic load-transfer suspension system. The padded hip belt transfers heavy pack weight directly to your legs, preventing back fatigue.",
    benefits: [
      "Massive storage volume accommodates clothing, sleeping gear, and supplies for weeks.",
      "Separate bottom zipper shoe/laundry compartment keeps clean clothes fresh.",
      "Heavy-duty compression straps secure the load tight to your center of gravity.",
      "Tear-proof ripstop nylon survives rough baggage handling and bus luggage roofs."
    ],
    specs: {
      "Capacity": "55 Liters to 75 Liters",
      "Material": "Water-Repellent Ripstop Nylon & Cordura reinforcement",
      "Frame": "Internal Ergonomic Back Support Sheet",
      "Buckles": "High-Impact ABS Quick-Release Clips"
    },
    applications: [
      "Long-Distance Touring & Pilgrimages",
      "Mountain Trekking & Camping",
      "Railway & Overnight Travel",
      "Youth Hostels & Backpacking"
    ],
    faqs: [
      { question: "Is this backpack suitable for trains and flights?", answer: "Yes, it fits easily into overhead luggage racks, under train berths, or checked flight baggage." }
    ]
  },
  {
    id: "handbags",
    name: "Handbags & Travel Holdall",
    category: "Handbags & Totes",
    division: "general-store",
    description: "Elegant women's shoulder bags, chic totes, and lightweight airline cabin-underseat travel holdalls crafted for fashion, versatility, and everyday elegance.",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsnUF6HteWb9Eg3o4JGODj3g90nthnx5jq78Q87zYzNg&s",
      "https://i5.walmartimages.com/seo/Carry-Hand-Cabin-Luggage-Bag-Travel-Holdall-Small-Under-Lightw-new-Seat-H3Z6_71d2c7fb-5322-45e1-9563-f2c4b89e14aa.97b47b47f54edfbda1b5ceb5a2e5455d.jpeg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3XbvevsR8Yyvr9dBfoTbrjIhwCiHdptZLg2XHkUYOmw&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPOk-WK74J1L2HKgGs0f3tJ890jKRqZufDhJ7Jt-yj7Q&s=10"
    ],
    features: [
      "Multi-Zip Organizer",
      "Premium Metallic Hardware",
      "Detachable Crossbody Strap",
      "Cabin Luggage Compatible"
    ],
    detailedDescription: "Discover an exquisite collection of women's lifestyle bags ranging from sophisticated structured work totes to featherlight cabin holdalls. Designed with spacious interiors, secure zip dividers, and luxurious metallic accents that elevate your everyday style.",
    benefits: [
      "Ample room for cosmetics, wallet, tablet, umbrella, and daily essentials.",
      "Dual carrying style: hand carry using rolled handles or sling over shoulder.",
      "Water-repellent lining protects your valuables from unexpected weather.",
      "Perfect match for sarees, salwar suits, and modern western outfits."
    ],
    specs: {
      "Varieties": "Structured Handbags, Shoulder Totes, Travel Holdall Duffle",
      "Material": "Premium Vegan Leather & High-Density Oxford Canvas",
      "Hardware": "Golden & Silver Finish Anti-Rust Zippers",
      "Inner Compartments": "Main zippered compartment + 2 slip pockets + 1 security zip"
    },
    applications: [
      "Weddings & Festive Gatherings",
      "Daily Office & Shopping",
      "Cabin Flight Travel & Weekend Stays",
      "Bridal Gifts"
    ],
    faqs: [
      { question: "Can the holdall fit under airline passenger seats?", answer: "Yes, our travel holdall bag is specially sized to meet airline personal under-seat luggage standards." }
    ]
  },
  {
    id: "leather-belts",
    name: "Leather Belts",
    category: "Belts & Accessories",
    division: "general-store",
    description: "Handcrafted formal and casual leather belts featuring scratch-resistant alloy buckles, burnished edges, and micro-adjustable holes.",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQta7RoRL7UjeSi5ivC43DJzqztq5oSi3z5Sxt6DREZmg&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQek2J-_p6bgoAo-BlfYkU017mAe7ktvlYMCciSBxTF3Q&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ68iJdkPmfIcjAoEBxYMtpJ6eQ0ysN5Htg2w9m0QZalw&s"
    ],
    features: [
      "Solid Alloy Metal Buckle",
      "Reinforced Dual Edge Stitching",
      "Supple Flexibility Without Cracking",
      "Formal & Casual Double Appeal"
    ],
    detailedDescription: "Engineered for executive sophistication and long-lasting performance, our classic leather belts are crafted with smooth edge finishing, deep pigmentation, and a sturdy alloy buckle. Pairs effortlessly with formal trousers, suits, and everyday denim.",
    benefits: [
      "Never cracks or peels under normal daily use.",
      "Classic modern buckle complements both formal shoes and office attire.",
      "Customizable waist size with easy screw-detachable buckle trim.",
      "Reinforced prong hole design prevents tearing over time."
    ],
    specs: {
      "Material": "Top-Grain Split Leather Composite",
      "Width": "35 mm (Standard Trouser Loop Width)",
      "Waist Sizes": "28 to 44 Inches (Adjustable)",
      "Colors Available": "Formal Jet Black, Dark Tan, Chocolate Brown"
    },
    applications: [
      "Office & Corporate Wear",
      "Suits & Wedding Receptions",
      "Casual Denim & Chinos",
      "Men's Gift Combos"
    ],
    faqs: [
      { question: "Can I shorten the belt length if it is too long?", answer: "Yes, the buckle is attached with an easily unscrewable metal rivet so you can cut the strap to your exact waist length at home." }
    ]
  },
  {
    id: "genuine-belts",
    name: "Genuine Belts",
    category: "Belts & Accessories",
    division: "general-store",
    description: "100% Genuine full-grain and oil-tanned leather belts with designer antique-brass pin buckles, built to develop a rich vintage patina over years of wear.",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLeD-yokQ_cbBwBbiyChMmOx9UzNR8rGeR3B2kBc4U6Q&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ93wIOn3jOw_n2cNshcYmZIow0XxCdMb_4ktV8teHa-A&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDWivpGmAs1jr_EkFDfD41OFN6Yty9yOo3O64_HhUWBw&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTCOSs8jxNyldIC0dIxKN3upL0aUG3qe_WIJ3-NISebw&s=10"
    ],
    features: [
      "100% Genuine Solid Leather Hide",
      "Heavy Antique Pin Buckles",
      "Unbreakable Solid Construction",
      "Rich Natural Leather Grain"
    ],
    detailedDescription: "For connoisseurs of authentic leather craftsmanship, our Genuine Leather Belts are sliced from single solid pieces of premium hide without synthetic fillers. Finished with hand-dyed edges and rugged metal prongs, these belts only look better as they age.",
    benefits: [
      "Genuine full hide will never separate or delaminate like bonded imitations.",
      "Develops a handsome personalized patina with wear.",
      "Extremely robust hold suited for heavy workwear, denim, and outdoor gear.",
      "Hypoallergenic nickel-free solid metal hardware."
    ],
    specs: {
      "Purity": "100% Pure Genuine Leather",
      "Thickness": "3.8 mm to 4.2 mm Heavy Gauge",
      "Buckle Material": "Solid Brass / Gunmetal Pin Buckle",
      "Durability": "Tested for 5+ years of daily use"
    },
    applications: [
      "Heavy Denim Jeans",
      "Rugged Outdoor & Biker Wear",
      "Casual Weekend Styling",
      "Heritage Collector Wear"
    ],
    faqs: [
      { question: "How do I know this is 100% genuine leather?", answer: "You can feel the natural hide texture, authentic leather scent, and raw back fibers with zero plastic film coating." }
    ]
  },
  {
    id: "crystal-scenary",
    name: "Crystal Scenary (All Available Sizes)",
    category: "Home Decor & Art",
    division: "general-store",
    description: "Stunning 3D crystal glass scenic wall photo frames, devotional art, natural waterfall panoramas, and modern glitter frames in all sizes.",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsCkUOMcItw7gwq1r98X-4ZyWIeUhpXJd7n5sJUCyM7A&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGoly2Ovw0GqiYGdKC8iiVAaHjLlqr-NAwlpZD7cOLfw&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBY6HEZpJt7BzZxVsffRMZaCntYPcdqP7hlEzHikxG9A&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFc9k5JT5LVHQN6ICL4Mb7Pw-CfkrAT9BS9rxKh-V33A&s=10"
    ],
    features: [
      "All Standard & Custom Sizes",
      "High-Definition 3D Crystal Gloss",
      "Sturdy Moulded Synthetic Frame",
      "Dust & Moisture-Proof Seal"
    ],
    availableSizes: "12x18 inch, 18x24 inch, 20x30 inch, 24x36 inch & 3x5 ft Panorama",
    detailedDescription: "Elevate your home and temple walls with our mesmerizing Crystal Scenary collection. Each picture is sealed under high-clarity crystal glaze giving brilliant optical depth, radiant light reflection, and vibrant colors that never fade over decades.",
    benefits: [
      "3D crystal coating creates a lifelike, luminous depth effect.",
      "Sealed front surface wipes dust and smudge-free with a dry microfibre cloth.",
      "Pre-installed heavy-duty hanging hooks for secure wall mounting.",
      "Wide choice of spiritual deities, tranquil waterfalls, and lush landscapes."
    ],
    specs: {
      "Glass Finish": "High-Gloss Toughened Crystal Glaze",
      "Themes": "Radha Krishna, Shiv Parvati, Ram Darbar, Cascading Waterfalls, Nature Landscapes",
      "Frame": "High-Grade Moulded Polymer Frame with Gold & Wood Filigree",
      "Sizes Stocked": "Compact 1x1.5 ft up to Expansive 4x2 ft Showpieces"
    },
    applications: [
      "Living Room Wall Feature",
      "Home Mandir & Pooja Room",
      "Office Receptions & Hotels",
      "Griha Pravesh (Housewarming) Gifts"
    ],
    faqs: [
      { question: "Are large wall sizes available in stock?", answer: "Yes, we stock all standard sizes from 12x18 inches up to large 4x2 feet panoramic wall frames." }
    ]
  },
  {
    id: "ropes-all-kinds",
    name: "Ropes (All Kinds - Nylon, Cotton & Jute)",
    category: "Ropes & Utility",
    division: "general-store",
    description: "Complete inventory of high-tensile nylon braided ropes, twisted polypropylene ropes, pure cotton clothesline ropes, and natural jute cords in all gauges and cut lengths.",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAkiy8QKTQwbA4ZeI6LtlLzl5WsNco8JtQVomgVgNZBw&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxtqDRExh39Jw8Auu2EjVxtT177vUl56LmMNxFEom5pQ&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgJ7TMhyiFJzjm7eKHG97hC3O1NdG_hlXoZND2qguK-w&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1afyaK5sunzQxs2PWdmPx81R4ctVvrD9iw2pcjybaoA&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKYQ05c-0s7GcL_-y4NMkOjlar4uWAogPh244qVydbsw&s=10"
    ],
    features: [
      "All Kinds & Gauges (4mm to 24mm)",
      "High Breaking Strength",
      "UV & Weather Rot Resistant",
      "Sold by Weight or Custom Length"
    ],
    detailedDescription: "As Maharajganj's primary hardware and utility depot, we stock every kind of rope required for domestic, agricultural, and commercial operations: smooth braided nylon ropes, tough polypropylene coils, soft pure cotton clotheslines, and eco-friendly natural jute sutli.",
    benefits: [
      "Unmatched variety covering every conceivable tying and lifting requirement.",
      "Nylon and PP varieties boast supreme tensile load capacity without snapping.",
      "Soft cotton ropes are gentle on hands and ideal for indoor clothes drying.",
      "Competitive prices by kilogram for wholesale bundles or by meter for retail."
    ],
    specs: {
      "Varieties Stocked": "Virgin Polypropylene, Braided Nylon, Pure Cotton Niwar & Sutli, Jute Burlap",
      "Thickness Range": "4mm, 6mm, 8mm, 10mm, 12mm, 16mm, 20mm, 24mm",
      "Sales Format": "Pre-cut bundles, complete roll coils, or cut-to-measure by meter"
    },
    applications: [
      "Truck & Tractor Cargo Tying",
      "Cattle & Livestock Tethering",
      "Household Clothes Drying Lines",
      "Well & Water Pulley Cords",
      "Construction Scaffolding"
    ],
    faqs: [
      { question: "Which rope is best for daily clothesline use?", answer: "Our braided nylon or pure cotton ropes are perfect: nylon resists sun rot for years, while cotton offers a firm non-slip grip on clothes pegs." }
    ]
  },
  {
    id: "pataka-jhanda",
    name: "Pataka / Jhanda (Religious & Festive Flags)",
    category: "Pooja & Festivities",
    division: "general-store",
    description: "Sacred, vibrant religious flags (Pataka & Jhanda) for temples, house roof tops, Mahavir Mandir, Mataji Jagran, Chhath Pooja, Ram Navami, and national celebrations.",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_BFuQvGRmokIRW35YH2rl01ddVwW33j32N84s9_TH2w&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtVfRxNYZmpfnQ5dJG2yKH2ijlcRJn2eBI9O7trUxJiw&s=10",
      "https://5.imimg.com/data5/SELLER/Default/2024/4/412859297/AN/ZF/CA/59797262/mataji-flag-and-hanuman-ji-flag-500x500.jpg"
    ],
    features: [
      "Golden Zari Lace Borders",
      "Weatherproof Satin & Velvet",
      "Reinforced Pole Sleeves",
      "Sun-Fast Sacred Colors"
    ],
    detailedDescription: "Celebrate divine festivals with honor and devotion with our sacred religious flags. Crafted with rich satin fabrics, intricate embroidery, and reinforced double-stitched pole sleeves that fly proudly atop temple spires, rooftops, and ceremonial processions.",
    benefits: [
      "Heavy fabric and reinforced seams withstand strong high-altitude winds.",
      "Vibrant sacred kesariya (saffron) and deep red colors resist sun fading.",
      "Complete with golden tassels and zari borders for an auspicious look.",
      "Available in multiple standard and extra-large sizes for temples."
    ],
    specs: {
      "Flag Deities": "Mahavir Bajrangbali Flag, Mata Ji Sherawali Pataka, Om Trishul, National Tiranga",
      "Material": "Lustrous Weatherproof Satin & Velvet Blend",
      "Sizes": "1.5 ft, 2.5 ft, 3.5 ft, 5 ft, and Grand 7 ft Temple Flags",
      "Border": "Embossed Golden Zari Lace with Corner Tassels"
    },
    applications: [
      "House Rooftop Auspicious Flags",
      "Mahavir Mandir & Temple Spires",
      "Ram Navami & Mahaviri Jhanda Processions",
      "Navratri, Chhath Pooja & Jagrans",
      "Motorcycle & Tractor Mounts"
    ],
    faqs: [
      { question: "Will the colors wash out in heavy rain?", answer: "No, our festive flags are made from weather-fast synthetic satin that repels rain and holds its vibrant holy colors." }
    ]
  },
  {
    id: "kids-toys",
    name: "Kids Toys",
    category: "Toys & Gifts",
    division: "general-store",
    description: "Exciting collection of battery-operated toy cars, musical interactive toys, plush dolls, friction monster trucks, and educational puzzles for kids of all age groups.",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKbJEHl1oUxOuneIxVd4w_akNtpWC0H8gE7GoVgP59KQ&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8OWiLNfirCDnEHFGEqm-MKxgkpPeTncAGw5rh28Kbag&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ7tDgLTywK_be245feAlpx3feoiG-ru_r5gJh1-7RqA&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThbzMdZ60WWrOHxdLleEpOcyTcZXTr3m_BJRAvWOUmSw&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd9xew_hDYkGJXWE5Db2qWwbuQ9kE2rtpQ7af24hvOog&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGmOinSEPACLJe_N8wdlr9Yvd-GpaATl7eHS0SKD9Bfw&s=10"
    ],
    features: [
      "100% Non-Toxic Child Safe",
      "Smooth Rounded Edges",
      "Bright LED Lights & Sound",
      "Durable Impact-Resistant Shell"
    ],
    detailedDescription: "Bring boundless joy to your little ones with our colorful and engaging kids toy collection. From speedy friction-powered monster trucks and stunt cars to delightful musical toys and educational blocks, every toy is crafted with safety, durability, and imaginative fun in mind.",
    benefits: [
      "Zero sharp edges or harmful plastic chemicals ensures complete safety.",
      "High-impact plastic construction withstands rough toddler play and drops.",
      "Stimulates hand-eye coordination, curiosity, and creative roleplay.",
      "Delightful presentation boxes ready for birthday and festival gifting."
    ],
    specs: {
      "Age Group": "1 Year to 10 Years",
      "Toy Categories": "Friction Vehicles, Battery Powered Stunt Cars, Musical Animals, Dolls, Kitchen Sets",
      "Safety Standards": "BIS Non-Toxic Certified Polymer",
      "Power Modes": "Battery Operated / Friction Push-and-Go"
    },
    applications: [
      "Birthday & Festive Gifting",
      "Toddler Sensory & Motor Skill Growth",
      "Indoor & Outdoor Play",
      "Party Return Gifts"
    ],
    faqs: [
      { question: "Are these toys safe for 2-3 year old toddlers?", answer: "Yes, our toddler range features smooth, curved edges and no small detachable choke hazards." }
    ]
  },
  {
    id: "traditional-gamcha",
    name: "Traditional Desi Gamcha (Pure Cotton)",
    category: "Traditional Clothing & Cotton",
    division: "general-store",
    description: "Authentic, handloom 100% pure cotton traditional desi Gamcha (towel / scarf). Super absorbent, featherlight, breathable, and designed for tough summers, agriculture, and daily bathing.",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF1FdFhQ7ySyzbZT3f6FeilU9tRHkhGxzbz63Z_IXTWg&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyVBOs4WXJdtg6kQN-3CDFVOzWByU6wRfFYKswYAFPKw&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGDbF1wXWUQEsISDx_cLdtRzDgnWsB15GzmE7xiF3n6g&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmwtv3Hib8EUaQFS87OcDwn1a8YkCRwMxhfhoN_eX6kg&s"
    ],
    features: [
      "100% Pure Virgin Cotton",
      "Maximum Sweat & Water Absorption",
      "Rapid Air-Drying Weave",
      "Classic Red & Multi Checkers"
    ],
    detailedDescription: "The quintessence of comfort and tradition in Bihar: our authentic Desi Gamcha is woven from 100% pure breathable cotton yarns. Whether used as an ultra-absorbent bath towel, a summer headwrap against the scorching sun (Loo), or for agricultural work, it stays soft on the skin and dries in minutes.",
    benefits: [
      "Instant moisture and sweat absorption keeps skin cool and rash-free.",
      "Dries 3x faster than heavy terrycloth towels in open breeze.",
      "Softens with every wash while retaining tensile fabric strength.",
      "Multipurpose utility: bath towel, sun paghdi, scarf, or travel companion."
    ],
    specs: {
      "Material": "100% Pure Organic Handloom/Powerloom Cotton",
      "Dimensions": "Generous 1.8 to 2.2 Meters Full Cut",
      "Patterns": "Traditional Red-White Check, Blue Check, Yellow Border",
      "Wash Care": "Color-fast, hand or machine washable"
    },
    applications: [
      "Daily Bath & Shower Towel",
      "Summer Sun & Dust Head Wrap (Paghdi)",
      "Agriculture, Farming & Field Labor",
      "Morning Walking, Yoga & Gym",
      "Traditional Rituals & Pujas"
    ],
    faqs: [
      { question: "Does the color bleed when washed?", answer: "Our gamchas are dyed with color-fast textile pigments. We recommend a mild first wash separately, after which colors remain vivid." }
    ]
  }
];

export const SPECIAL_PURPOSE_SHEETS: SpecialSheet[] = [
  { title: "Heavy Duty Construction", description: "Waterproof barrier for road layings, cement curing, and ceiling underlays.", iconName: "HardHat" },
  { title: "Truck & Vehicle Covers", description: "Excellent weather shields for transport logistics, trailers, and cargo.", iconName: "Truck" },
  { title: "Table Cloths & Screens", description: "Beautiful crystal-clear sheets for dust protection on household surfaces.", iconName: "Grid" },
  { title: "Agricultural Covers", description: "Silage wraps, crop drying sheets, and organic farming mulch films.", iconName: "Sprout" },
  { title: "Temporary Sheds", description: "Quick roofing sheets for vendors, shelters, and monsoon shielding.", iconName: "Home" },
  { title: "Roof Waterproofing", description: "Excellent instant fix for leaks on brick, wood, and concrete roof structures.", iconName: "ShieldAlert" }
];

export const SIZE_MATRIX = [
  { category: "12 ft Width Options", sizes: ["12 × 0.5", "12 × 0.75", "12 × 1", "12 × 2", "12 × 3", "12 × 5", "12 × 10"] },
  { category: "15 ft Width Options", sizes: ["15 × 0.5", "15 × 0.75", "15 × 1", "15 × 2", "15 × 3", "15 × 5", "15 × 10"] },
  { category: "18 ft Width Options", sizes: ["18 × 0.5", "18 × 0.75", "18 × 1", "18 × 2", "18 × 3", "18 × 5"] },
  { category: "24 ft Width Options", sizes: ["24 × 0.5", "24 × 0.75", "24 × 1", "24 × 2", "24 × 5"] },
  { category: "Heavy Duty Continuous", sizes: ["30 ft Width Rolls", "36 ft Width Rolls"] }
];

export const WHY_CHOOSE_US = [
  { title: "Since 2000", description: "Serving Siwan, Maharajganj and nearby districts for over 26 glorious years with trust and transparency.", iconName: "CalendarDays" },
  { title: "Wholesale & Retail", description: "We offer unbeatable prices for single purchases as well as bulk commercial orders.", iconName: "TrendingUp" },
  { title: "Genuine Brands", description: "Authorized partner with top-tier brands like Shalimar, Silpaulin, and Capstone.", iconName: "Award" },
  { title: "Bulk & Fast Delivery", description: "Ready stocks for immediate supply. Fast delivery across the region.", iconName: "Zap" },
  { title: "24x7 Customer Support", description: "Unrivaled support. Our experts guide you on sizes, thicknesses, and grades anytime.", iconName: "PhoneCall" },
  { title: "Uncompromised Quality", description: "High-tensile strength, tear-resistant, and premium finish guarantees on all plastics.", iconName: "ShieldCheck" }
];

export const FAQS: FAQItem[] = [
  {
    question: "Who is the leading tarpaulin supplier in Maharajganj and Siwan?",
    answer: "Om Shringar Tirpal Store (Estd. 2000, formerly Goyal Traders) managed by Mr. Vinod Kumar Varnawal is a primary tarpaulin supplier in Maharajganj and Siwan. Located in Kazi Bazar (Meetha Hatti Road), Maharajganj, Siwan, Bihar – 841238, we provide heavy-duty waterproof tarpaulins, Shalimar, Silpaulin, and Capstone Cheetah products at factory wholesale rates."
  },
  {
    question: "Where can I find a reliable polythene sheet supplier in Siwan and Bihar?",
    answer: "Om Shringar Tirpal Store is a prominent polythene sheet supplier in Siwan and Bihar. We stock heavy-duty blue and black construction polythene rolls, transparent shisha plastic rolls, and agricultural curing sheets."
  },
  {
    question: "Do you operate as a plastic sheet wholesale and retail supplier?",
    answer: "Yes, we are a comprehensive plastic sheet wholesale and retail supplier. We cater to bulk construction contractors, hardware retailers, and individual homeowners across Maharajganj, Siwan, and neighboring districts in Bihar."
  },
  {
    question: "Are you a fencing net supplier in Bihar?",
    answer: "Yes, we are a leading fencing net supplier in Bihar. We stock high-tensile green and black Resham fencing nets (Jali) for crop protection, boundary security, and garden enclosures."
  },
  {
    question: "What is the maximum and minimum size available for tarpaulin sheets in Bihar?",
    answer: "Our heavy-duty tarpaulin sheets in Bihar range from 6x6 ft up to 60x100 ft. We also customize roll lengths and heavy gauge specifications for agricultural, industrial, and transport requirements."
  },
  {
    question: "What was the previous name of your business and when was it established?",
    answer: "We were established in the year 2000 as Goyal Traders and later rebranded as Om Shringar Tirpal Store under Mr. Vinod Kumar Varnawal to reflect our expanded inventory in plastic sheets, tarpaulins, and fencing nets."
  },
  {
    question: "How can I place an order or get a bulk wholesale quote?",
    answer: "You can call Mr. Vinod Kumar Varnawal directly at +91 8210625483 or click the WhatsApp button on our website for immediate wholesale price quotes and delivery details."
  }
];

// Product slug mappings for clean, SEO-friendly URLs
export const PRODUCT_SLUG_MAP: Record<string, { slug: string; aliases: string[] }> = {
  "stretch-film": { slug: "transparent-plastic-sheet", aliases: ["transparent-stretch-film-roll"] },
  "blue-polythene": { slug: "blue-polythene-roll", aliases: ["construction-blue-polythene-roll"] },
  "black-polythene": { slug: "pond-liner", aliases: ["construction-black-polythene-roll"] },
  "transparent-shisha": { slug: "transparent-shisha-roll", aliases: [] },
  "tarpaulins": { slug: "blue-tarpaulin", aliases: ["waterproof-premium-tarpaulins"] },
  "capstone-cheetah": { slug: "hdpe-tarpaulin", aliases: ["hdpe-capstone-cheetah"] },
  "fencing-net": { slug: "shade-net", aliases: ["resham-fencing-net"] },
  "fencing-net-jali": { slug: "fencing-net-jali", aliases: [] },
  "thermocol-sheets": { slug: "construction-thermocol-sheets", aliases: ["construction-thermocol-sheets-eps-blocks-sheets"] },
  "plastic-mat-chatai": { slug: "premium-plastic-mat-chatai", aliases: [] },
  "waterproof-table-cover": { slug: "waterproof-table-cover", aliases: ["waterproof-table-cover-6-seater"] },
  "cosmetics-shringar": { slug: "premium-cosmetics-shringar", aliases: ["premium-cosmetics-shringar-range"] },
  "plastic-ropes-packaging": { slug: "plastic-ropes-packaging-materials", aliases: ["industrial-plastic-ropes"] },
  "safari-backpack": { slug: "safari-backpack", aliases: ["safari-travel-backpack"] },
  "aristocrat-backpack": { slug: "aristocrat-backpack", aliases: ["aristocrat-smart-backpack"] },
  "kids-bags": { slug: "kids-bags", aliases: ["cartoon-school-bags"] },
  "tour-backpack": { slug: "tour-backpack", aliases: ["hiking-rucksack-tour-backpack"] },
  "handbags": { slug: "handbags", aliases: ["womens-handbags-travel-holdall"] },
  "leather-belts": { slug: "leather-belts", aliases: ["mens-leather-belts"] },
  "genuine-belts": { slug: "genuine-belts", aliases: ["genuine-leather-pin-buckle-belts"] },
  "crystal-scenary": { slug: "crystal-scenary", aliases: ["crystal-scenary-all-sizes", "3d-crystal-scenery-photo-frame"] },
  "ropes-all-kinds": { slug: "ropes-all-kinds", aliases: ["ropes-nylon-cotton-jute"] },
  "pataka-jhanda": { slug: "pataka-or-jhanda", aliases: ["religious-flags-pataka-jhanda"] },
  "kids-toys": { slug: "kids-toys", aliases: ["children-toys-and-games"] },
  "traditional-gamcha": { slug: "traditional-gamcha", aliases: ["desi-pure-cotton-gamcha"] },
};

// Helper to get slug for a product
export function getProductSlug(productId: string): string {
  return PRODUCT_SLUG_MAP[productId]?.slug || productId;
}

// Helper to find a product by slug or alias
export function findProductBySlug(slug: string): Product | undefined {
  if (!slug) return undefined;
  
  // Normalize slug by converting to lowercase, trimming whitespace, and stripping leading/trailing slashes
  let normalized = slug.toLowerCase().trim();
  normalized = normalized.replace(/^\/+|\/+$/g, "");
  
  // Find in mapping
  const foundEntry = Object.entries(PRODUCT_SLUG_MAP).find(([prodId, mapData]) => {
    return mapData.slug === normalized || mapData.aliases.includes(normalized) || prodId === normalized;
  });
  
  const targetId = foundEntry ? foundEntry[0] : normalized;
  return PRODUCTS.find(p => p.id === targetId || p.id === normalized || getProductSlug(p.id) === normalized);
}


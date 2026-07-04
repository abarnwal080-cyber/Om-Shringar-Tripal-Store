export interface Product {
  id: string;
  name: string;
  category: string;
  images: string[];
  description: string;
  features: string[];
  availableSizes?: string;
  commonSizes?: string[];
  isBestSeller?: boolean;
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
  phone: "+91 9852076197",
  phoneFormatted: "tel:+919852076197",
  whatsappLink: "https://wa.me/919852076197",
  ctaText: "Call for Bulk Orders & Wholesale Inquiries",
  supportBadge: "24×7 Customer Support",
  address: "Om Shringar Tirpal Store, Meetha Hatti, Kazi Bazar, Maharajganj, Siwan, Bihar – 841238",
  landmark: "Near Kazi Bazar, Meetha Hatti Road",
  googleMapsUrl: "https://maps.app.goo.gl/Q9wgEEfekCoRW3Tr9?g_st=aw",
  hours: "Monday – Saturday: 6:00 AM – 9:00 PM",
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
  }
];

export const PRODUCTS: Product[] = [
  {
    id: "stretch-film",
    name: "Transparent Stretch Film Roll",
    category: "Industrial Packaging",
    description: "High-stretchability transparent wrap roll designed for secure pallet wrapping, product bundling, and temporary surface shielding during transit and storage.",
    images: [
      "https://cpimg.tistatic.com/09389722/b/4/Transparent-Plastic-Films.jpg",
      "https://tiimg.tistatic.com/fp/1/010/266/transparent-stretch-wrap-film-411.jpg",
      "https://images.meesho.com/images/products/668665923/hst3n_512.avif?width=512",
      "https://5.imimg.com/data5/KW/EX/JH/SELLER-50282900/stretch-film-500x500.jpg",
      "https://img.magnific.com/premium-vector/big-roll-transparent-stretch-film-packaging_98402-214967.jpg?semt=ais_hybrid&w=740&q=80"
    ],
    features: [
      "Excellent cling strength for secure, adhesive-free wrapping",
      "Superior puncture and tear resistance for sharp corners",
      "Dust, water, and moisture protection for stored goods",
      "Uniform thickness and high clarity for label scanning"
    ]
  },
  {
    id: "blue-polythene",
    name: "Construction Blue Polythene Roll",
    category: "Construction & Curing",
    description: "Premium heavy-duty blue polythene rolls engineered specifically for highway roads, concrete curing, roofing underlayment, and robust weather shields.",
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
      "Waterproof and moisture locking for pristine cement hydration",
      "Highly resilient to thermal expansion and abrasion",
      "UV-treated to withstand prolonged direct sunlight exposure",
      "Available in continuous roll form for large-scale surface laying"
    ]
  },
  {
    id: "black-polythene",
    name: "Construction Black Polythene Roll",
    category: "Moisture & Damp Proofing",
    description: "Multi-layered high-density black polythene sheet rolls serving as a robust foundation moisture barrier, agricultural cover, and heavy-duty dust shield.",
    images: [
      "https://cpimg.tistatic.com/10847398/b/4/LDPE-Sheet.jpeg",
      "https://plain-apac-prod-public.komododecks.com/202607/03/eckT9KEMGbavrebTJwPJ/image.png",
      "https://cpimg.tistatic.com/07558039/b/4/Road-Construction-Polyethylene-Sheet.jpg",
      "https://cpimg.tistatic.com/07558039/b/4/Road-Construction-Polyethylene-Sheet.jpg", // Note: duplicated in prompt, keeping it exactly as requested!
      "https://5.imimg.com/data5/SELLER/Default/2025/3/497555378/HO/NI/NS/8078121/ldpe-black-plastic-roll-500x500.jpg"
    ],
    features: [
      "Zero water permeability for effective damp proof course (DPC)",
      "High chemical resistance against acidic or alkaline soil",
      "Total opacity, perfect for silage, silage-baling, and solar weed-killing",
      "Resistant to degradation under heavy concrete loads"
    ]
  },
  {
    id: "transparent-shisha",
    name: "Transparent Shisha Roll",
    category: "Clear Covering",
    description: "Glass-like transparent flexible LDPE rolls widely used for table covers, custom temporary window panelings, clean partitions, and retail product wrapping.",
    images: [
      "https://5.imimg.com/data5/ANDROID/Default/2024/9/449619383/UL/CG/RW/25980061/product-jpeg-500x500.jpg",
      "https://d91ztqmtx7u1k.cloudfront.net/ClientContent/Images/ExtraLarge/ldpe-transparent-polythene-she-20260408102254913.webp",
      "https://m.media-amazon.com/images/I/41LHMFhdQHL.jpg",
      "https://m.media-amazon.com/images/I/41gR1A-TXpL._AC_UF1000,1000_QL80_.jpg",
      "https://www.singhalmart.com/cdn/shop/files/10_18b97978-aa7d-414d-9250-46cb1a1fc668.jpg?v=1740376713&width=1214"
    ],
    features: [
      "Crystal clear transparent material with excellent light transmission",
      "Flexible and easy to trim into specific shapes or dimensions",
      "Stain-resistant and highly washable with standard soap and water",
      "Soft texture that drapes smoothly over furniture and counters"
    ]
  },
  {
    id: "tarpaulins",
    name: "Waterproof Premium Tarpaulins",
    category: "All-Weather Protection",
    description: "Multilayered, cross-laminated, super heavy-duty waterproof tarpaulins (Tirpal) for high-performance vehicle covering, grain shielding, and temporary structural tents.",
    images: [
      "https://5.imimg.com/data5/SELLER/Default/2023/4/301281309/FL/MC/FC/123837/waterproof-tarpaulins.webp",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMnKRYsLO4-_dEvoXIbHeNHj318r5xTIn_NU6K6kP-qg&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdDU6nw67_n3nYfJG-sm__4Shap_KWkczVDA0LU92Psw&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL3qnwqOQoCT7Un7Zev_Du5vQ0pfv5IualSuyDYL418Q&s=10",
      "https://images.jdmagicbox.com/quickquotes/images_main/vinyl-tarpaulin-300-gsm-p9rt7wzr.jpg"
    ],
    availableSizes: "6×6 ft up to 60×100 ft",
    features: [
      "100% waterproof and double-sided heat-sealed joints",
      "Reinforced corner grommets and robust eyelets at every 3 feet",
      "Mildew-proof, wind-proof, and exceptionally tear-resistant",
      "Highly durable multi-layer construction for multi-season usage"
    ]
  },
  {
    id: "fencing-net",
    name: "Fencing Resham Net",
    category: "Security & Fencing",
    description: "Heavy-gauge woven nylon-composite Resham threads netting, popular for perimeter fencing, farm boundaries, and plant nurseries.",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8otM4gDSej31PTKee3zdt5B88vQWGKmkwAg9GpDdUv8OPxBkiqVGsJ5B8&s=10"
    ],
    isBestSeller: true,
    features: [
      "Ultra-tough resilient Resham threads that resist weathering",
      "Optimized mesh design for standard light transmission and high airflow",
      "Perfect boundary shield for poultry cages, fisheries, and nurseries",
      "Rust-proof alternative to traditional metal barbed wire fences"
    ]
  }
];

export const SPECIAL_PURPOSE_SHEETS: SpecialSheet[] = [
  { title: "For Grain Drying (Sattering)", description: "Safe and hygienic solar drying of harvested grains without soil contamination.", iconName: "Wheat" },
  { title: "Heavy Duty Construction", description: "Waterproof barrier for road layings, cement curing, and ceiling underlays.", iconName: "HardHat" },
  { title: "Truck & Vehicle Covers", description: "Excellent weather shields for transport logistics, trailers, and cargo.", iconName: "Truck" },
  { title: "Pond Lining", description: "Extremely low-leakage water reservoir and aquaculture pond under-liners.", iconName: "Waves" },
  { title: "Chinese Grade Economy", description: "Affordable lightweight plastic covers for temporary household and shop sheds.", iconName: "BadgePercent" },
  { title: "Table Cloths & Screens", description: "Beautiful crystal-clear sheets for dust protection on household surfaces.", iconName: "Grid" },
  { title: "Agricultural Covers", description: "Silage wraps, crop drying sheets, and organic farming mulch films.", iconName: "Sprout" },
  { title: "Warehouse Storage", description: "Extra-large heavy-duty sheets to safeguard stockpiles against rain & dust.", iconName: "Warehouse" },
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
    question: "Where is Om Shringar Tirpal Store located?",
    answer: "Our store is located in Kazi Bazar (Meetha Hatti Road), Maharajganj, Siwan, Bihar – 841238. Landmark: Near Kazi Bazar, Meetha Hatti Road. You can find our exact location using the Google Maps link integrated throughout our website."
  },
  {
    question: "What was the previous name of your business?",
    answer: "We were originally established in the year 2000 and were widely known as Goyal Traders. We upgraded our name to Om Shringar Tirpal Store, under the leadership of Mr. Vinod Kumar Varnawal, to better serve our growing customer base in plastics and tarpaulins."
  },
  {
    question: "What is the maximum and minimum size available for Tarpaulins?",
    answer: "Our premium waterproof tarpaulins are available from standard small sizes of 6×6 feet up to extra-large coverage sizes of 60×100 feet. We also cater to custom wholesale sizing specifications upon order request."
  },
  {
    question: "Do you supply building construction contractors and farmers directly?",
    answer: "Absolutely. We are specialized wholesale suppliers. We regularly supply heavy-duty blue/black polythene rolls for highway development, building slabs, pond lining, agricultural mulch, and grain drying (sattering)."
  },
  {
    question: "How can I place an order or get a bulk wholesale quote?",
    answer: "You can click any of our 'Call Now' or 'WhatsApp' CTA buttons to immediately connect with Mr. Vinod Kumar Varnawal. You can also fill out the contact form below, and we will get back to you with custom prices instantly!"
  },
  {
    question: "Which brands do you deal in?",
    answer: "We are official and highly trusted dealers for premium brands including Shalimar, Silpaulin, Greatpaulin, Capstone Cheetah, Vision, and Goldpaulin."
  }
];

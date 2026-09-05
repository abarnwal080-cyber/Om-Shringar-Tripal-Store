import { ProductReview } from "../types/productDetails";

const LOCAL_STORAGE_KEY_PREFIX = "om_shringar_reviews_";

// Customer profiles restricted specifically to the 7 requested regions:
// Maharajganj, Basantpur, Ekma, Chhapra, Patna, Siwan, Gopalganj
export const REGIONAL_CUSTOMERS: { name: string; area: string }[] = [
  { name: "Rameshwar Singh", area: "Maharajganj" },
  { name: "Sunil Kumar", area: "Basantpur" },
  { name: "Amitabh Verma", area: "Ekma" },
  { name: "Rakesh Yadav", area: "Chhapra" },
  { name: "Pankaj Sharma", area: "Patna" },
  { name: "Vikram Barnwal", area: "Siwan" },
  { name: "Mohd. Tariq", area: "Gopalganj" },
  { name: "Dharmendra Shah", area: "Maharajganj" },
  { name: "Santosh Ray", area: "Basantpur" },
  { name: "Rajesh Tiwari", area: "Siwan" },
];

export interface ProductReviewTemplate {
  targetAvg: 4.8 | 4.9;
  reviews: { text: string; rating: number; daysAgo: number }[];
}

// Exactly 10 reviews per product with ratings totaling 4.8 or 4.9 average
const PRODUCT_REVIEW_TEMPLATES: Record<string, ProductReviewTemplate> = {
  "blue-polythene": {
    targetAvg: 4.9,
    reviews: [
      { text: "Chhat dhalai ke liye best blue polythene roll hai. Concrete water bilkul lock kar deta hai aur curing perfect hui.", rating: 5, daysAgo: 2 },
      { text: "Heavy duty thickness and very good tensile strength. Maharajganj store se factory wholesale rate mila.", rating: 5, daysAgo: 4 },
      { text: "Basantpur road project me use kiya. Roll width aur length bilkul accurate thi. 100% genuine quality.", rating: 5, daysAgo: 7 },
      { text: "Slab casting ke liye 24 ft roll liya tha. Boots aur sharp gravel se ek bhi jagah se leak ya tear nahi hua.", rating: 5, daysAgo: 11 },
      { text: "UV-stabilized hone ki wajah se dhoop me bilkul crack nahi hua. Very satisfied with Om Shringar quality.", rating: 4, daysAgo: 16 },
      { text: "Dhalai curing speed aur cement hydration kafi behtar hui. Chhapra me bhi supply mangwayi thi, timely delivery mili.", rating: 5, daysAgo: 20 },
      { text: "Best construction polythene supplier in Siwan & Saran region. Phone enquiry pe immediate rate mila.", rating: 5, daysAgo: 26 },
      { text: "Continuous roll format cuts down joint leakage significantly on large ground foundation works.", rating: 5, daysAgo: 31 },
      { text: "Reliable quality pure virgin polymer sheet. Water lock and vapor barrier me 10 out of 10.", rating: 5, daysAgo: 38 },
      { text: "Gopalganj site par roof curing ke liye liya tha. 100 meter roll ki packaging aur thickness top-notch thi.", rating: 5, daysAgo: 45 },
    ],
  },
  "tarpaulins": {
    targetAvg: 4.9,
    reviews: [
      { text: "Original multi-layer waterproof tarpaulin sheet. Heavy rainfall me bhi wheat aur tractor bilkul dry rahe.", rating: 5, daysAgo: 1 },
      { text: "Maharajganj store se pickup kiya tha. Cross-laminated texture provides immense tear strength.", rating: 5, daysAgo: 3 },
      { text: "Brass rust-proof eyelets aur double-welded corners are very durable. High wind me bhi hold kiya.", rating: 5, daysAgo: 6 },
      { text: "Basantpur warehouse ke open grain storage ke liye 40x50 ft liya. Zero water leakage even in torrential monsoon.", rating: 5, daysAgo: 10 },
      { text: "Ekma side transport truck cover me 1 saal se chal raha hai. Color aur flexibility perfectly maintained hai.", rating: 5, daysAgo: 15 },
      { text: "Chhapra me itna authentic Shalimar & Silpaulin tarpaulin dealer milna mushkil hai. Genuine rate.", rating: 5, daysAgo: 21 },
      { text: "Very good GSM quality, light to carry but extremely resilient to rough outdoor handling.", rating: 4, daysAgo: 27 },
      { text: "Patna bypass highway par transport cargo shield ke liye use kiya. 100% waterproof guaranteed.", rating: 5, daysAgo: 33 },
      { text: "Siwan wholesale market me best price mila. Store staff helped choose the exact size required.", rating: 5, daysAgo: 40 },
      { text: "Gopalganj farm shelter ke liye durable sheet. UV resistance is super effective against harsh summer sun.", rating: 5, daysAgo: 49 },
    ],
  },
  "capstone-cheetah": {
    targetAvg: 4.9,
    reviews: [
      { text: "Official Capstone Cheetah tarpaulin. The cheetah logo and high-tensile HDPE weave ensure premium strength.", rating: 5, daysAgo: 2 },
      { text: "Maharajganj store se direct retail pickup kiya. Both sides dual-color coating is 100% leak proof.", rating: 5, daysAgo: 5 },
      { text: "Basantpur poultry farm cover ke liye 30 ft roll fit kiya. Heavy stormy winds me bhi perfectly tight raha.", rating: 5, daysAgo: 9 },
      { text: "Double heat-welded joints make it impossible for water to seep through. Ekma market me sabse strong tirpal hai.", rating: 5, daysAgo: 14 },
      { text: "Chhapra construction material protection ke liye perfect. Cement bags were fully protected during rain.", rating: 5, daysAgo: 18 },
      { text: "Solid corner reinforcements and heavy grommets every 3 feet. Worth every single rupee.", rating: 5, daysAgo: 24 },
      { text: "High durability and flexibility. Tough material but folds easily for storage when not in use.", rating: 4, daysAgo: 30 },
      { text: "Patna commercial project me boundary aur heavy machinery shading ke liye best sheet.", rating: 5, daysAgo: 36 },
      { text: "Genuine Cheetah brand quality. Siwan district ke authorized dealer se lene ka bharosa alag hai.", rating: 5, daysAgo: 42 },
      { text: "Gopalganj road works par sand aur asphalt covering ke liye heavy-duty performance mili.", rating: 5, daysAgo: 50 },
    ],
  },
  "stretch-film": {
    targetAvg: 4.8,
    reviews: [
      { text: "Superb cling strength. Pallet packaging and carton wrapping ke liye 300% stretch deta hai.", rating: 5, daysAgo: 3 },
      { text: "Crystal clear optical transparency. Barcode scanner through packaging easily scan kar leta hai.", rating: 5, daysAgo: 6 },
      { text: "Maharajganj store se regular dispatch rolls lete hain. Unwinding is totally noiseless and smooth.", rating: 5, daysAgo: 11 },
      { text: "Basantpur hardware shop shipping ke liye cartons pack kiye. Dust aur moisture se 100% safety mili.", rating: 5, daysAgo: 16 },
      { text: "Ekma factory batch dispatch me boxes bind karne me time aur tape dono bachte hain.", rating: 4, daysAgo: 22 },
      { text: "High puncture resistance against sharp carton corners. Tear nahi hota tension lagane par.", rating: 5, daysAgo: 29 },
      { text: "Roll weight and core size are accurate. No cheating in net plastic weight. Very honest store.", rating: 5, daysAgo: 35 },
      { text: "Patna logistics warehouse me roz 50 pallets pack hote hain isi stretch film se. Excellent grip.", rating: 4, daysAgo: 41 },
      { text: "Siwan wholesale price is unmatched. Bulk discount on full carton boxes.", rating: 5, daysAgo: 47 },
      { text: "Gopalganj distribution unit ke electronic goods wrapping ke liye safe aur moisture proof film.", rating: 5, daysAgo: 53 },
    ],
  },
  "black-polythene": {
    targetAvg: 4.8,
    reviews: [
      { text: "Heavy duty black polythene roll. Foundation DPC damp proofing ke liye ground moisture completely block karta hai.", rating: 5, daysAgo: 2 },
      { text: "100% opaque black color. Solar weed mulching aur silage covering me agriculture field me zabardast result.", rating: 5, daysAgo: 7 },
      { text: "Maharajganj godown se 200 micron roll liya tha. High density polymer does not tear easily.", rating: 5, daysAgo: 13 },
      { text: "Basantpur road project me base lining ke liye best choice. Concrete pouring directly on top was seamless.", rating: 5, daysAgo: 19 },
      { text: "Ekma canal earthwork underlay me use kiya. Soil acids and groundwater penetration zero hai.", rating: 4, daysAgo: 25 },
      { text: "Continuous roll width avoids unnecessary joints and saves labor on large warehouse foundations.", rating: 5, daysAgo: 32 },
      { text: "Chhapra cold storage floor moisture insulation me use hua. Highly recommended for damp protection.", rating: 5, daysAgo: 38 },
      { text: "UV-treated black sheet resists degradation under intense Bihar sun. Long-lasting quality.", rating: 5, daysAgo: 44 },
      { text: "Very economical price per meter compared to other local suppliers. Good customer support.", rating: 4, daysAgo: 51 },
      { text: "Gopalganj farm silage storage ke liye best air-tight and light-tight seal.", rating: 5, daysAgo: 58 },
    ],
  },
  "transparent-shisha": {
    targetAvg: 4.9,
    reviews: [
      { text: "Glass-like crystal transparency. Dining table cover aur shop front counter shield ke liye no.1 plastic roll.", rating: 5, daysAgo: 2 },
      { text: "Soft, flexible material easily drapes over table corners without curling. Wipes clean in seconds.", rating: 5, daysAgo: 5 },
      { text: "Maharajganj shop se 1.0mm thick shisha sheet li thi. Scratches aur hot water spills se wood table safe hai.", rating: 5, daysAgo: 9 },
      { text: "Basantpur sweets shop counter par display shield banaya. Full visual clarity with hygienic protection.", rating: 5, daysAgo: 14 },
      { text: "Ekma home dining table par lagaya hai, print and wood grain bilkul clear dikhta hai.", rating: 5, daysAgo: 18 },
      { text: "Chhapra office work desks par glass ki jagah ye sheet daal di, budget friendly and unbreakable.", rating: 5, daysAgo: 24 },
      { text: "Stain proof and easy to cut with scissors. Oil and tea stains wipe off with simple damp cloth.", rating: 4, daysAgo: 31 },
      { text: "Patna clinic reception shield ke liye custom meter length cut karwaya tha. High quality finish.", rating: 5, daysAgo: 37 },
      { text: "Siwan me itna clear transparent shisha roll pehli baar mila. No yellow tint or cloudy smell.", rating: 5, daysAgo: 43 },
      { text: "Gopalganj restaurant tables ke liye multiple rolls liye. Highly durable and premium look.", rating: 5, daysAgo: 50 },
    ],
  },
  "fencing-net": {
    targetAvg: 4.9,
    reviews: [
      { text: "Woven Resham nylon fencing net. Extremely strong tensile strength, will never rust like iron wire mesh.", rating: 5, daysAgo: 3 },
      { text: "Farm boundary aur poultry yard fencing ke liye best. Airflow aur dhoop dono aati hai.", rating: 5, daysAgo: 6 },
      { text: "Maharajganj store se 6 ft height roll liya. Easy to tie on bamboo poles and corners.", rating: 5, daysAgo: 10 },
      { text: "Basantpur vegetable garden me monkeys aur stray cattle se crops ko bachane me 100% effective.", rating: 5, daysAgo: 15 },
      { text: "Ekma poultry farm boundary mesh. Birds and chickens are safe without any sharp cutting edges.", rating: 5, daysAgo: 21 },
      { text: "Chhapra nursery plants coverage ke liye green shade Resham net liya tha. Very durable mesh weave.", rating: 5, daysAgo: 28 },
      { text: "Monsoon me water absorb nahi karta, isliye rot ya fungal decay hone ka koi chance nahi hai.", rating: 4, daysAgo: 34 },
      { text: "Patna farmhouse boundary fencing. 2 saal se lagi hai, sunlight se weave bilkul loose nahi hua.", rating: 5, daysAgo: 40 },
      { text: "Siwan local rate was very budget friendly for 150 ft length. Fast enquiry support.", rating: 5, daysAgo: 46 },
      { text: "Gopalganj agricultural plot boundary secured easily in single afternoon with this flexible net.", rating: 5, daysAgo: 54 },
    ],
  },
  "fencing-net-jali": {
    targetAvg: 4.8,
    reviews: [
      { text: "5 ft tall rigid polymer fencing jali. Perfect alternative to costly metal chicken wire.", rating: 5, daysAgo: 2 },
      { text: "Extruded plastic hexagonal structure stands upright without sagging between support poles.", rating: 5, daysAgo: 7 },
      { text: "Maharajganj store se meter cut length li thi garden boundary ke liye. Very neat and sturdy.", rating: 5, daysAgo: 12 },
      { text: "Basantpur poultry farm enclosure ke liye safe and hygienic. Does not injure chickens at all.", rating: 5, daysAgo: 17 },
      { text: "Ekma side home lawn fence banaya. Green color looks very aesthetic and natural.", rating: 4, daysAgo: 23 },
      { text: "UV-stabilized thick plastic resists sun brittleness. Retains its rigidity season after season.", rating: 5, daysAgo: 30 },
      { text: "Chhapra dairy farm boundary partition me use kiya. Simple to wash clean with water pipe.", rating: 5, daysAgo: 36 },
      { text: "Lightweight to carry and transport in auto or bike. Installation was remarkably fast.", rating: 4, daysAgo: 42 },
      { text: "Siwan me wholesale roll rates available hain. 100 meter rolls offer great cost savings.", rating: 5, daysAgo: 48 },
      { text: "Gopalganj boundary wall height extension ke liye reliable green jali.", rating: 5, daysAgo: 55 },
    ],
  },
  "thermocol-sheets": {
    targetAvg: 4.8,
    reviews: [
      { text: "High-density EPS Thermocol sheets. Used for roof under-slab insulation, indoor temperature drop kafi noticeable hai.", rating: 5, daysAgo: 3 },
      { text: "False ceiling panels and room sound dampening ke liye clean 1-inch sheets mili.", rating: 5, daysAgo: 8 },
      { text: "Maharajganj store se pickup kiya. Sheets were completely flat, un-chipped, and sturdy.", rating: 5, daysAgo: 13 },
      { text: "Basantpur cold storage wall lining ke liye bulk blocks order kiye the. Moisture-proof insulation.", rating: 5, daysAgo: 19 },
      { text: "Ekma commercial packing unit ke fragile electronic items packaging me excellent shock absorption.", rating: 4, daysAgo: 25 },
      { text: "Very easy to cut with cutter blade without crumbling into messy dust. Good compaction.", rating: 5, daysAgo: 31 },
      { text: "Chhapra home theater room acoustics me ceiling panels me install kiya. Sound echo kafi reduce ho gaya.", rating: 5, daysAgo: 37 },
      { text: "Lightweight nature reduces overhead load significantly. Easy to affix with non-solvent glue.", rating: 4, daysAgo: 43 },
      { text: "Siwan construction projects ke liye continuous ready stock available rahta hai Om Shringar me.", rating: 5, daysAgo: 50 },
      { text: "Gopalganj godown roof insulation completed economically. Heat transmission kafi kam ho gayi.", rating: 5, daysAgo: 57 },
    ],
  },
  "plastic-mat-chatai": {
    targetAvg: 4.9,
    reviews: [
      { text: "Premium virgin polymer woven Chatai. Super soft to sit on and colors are very vibrant.", rating: 5, daysAgo: 1 },
      { text: "100% waterproof and washable. Mud aur food spills direct pipe ke pani se dhul jate hain.", rating: 5, daysAgo: 4 },
      { text: "Maharajganj shop se double-bed size liya. Edge binding and stitching are very sturdy.", rating: 5, daysAgo: 8 },
      { text: "Basantpur pooja aur festive gatherings me floor sitting ke liye durable mat. Easily folds compact.", rating: 5, daysAgo: 12 },
      { text: "Ekma family picnic ke liye le gaye the. Damp grass aur soil ka moisture bilkul pass nahi hota.", rating: 5, daysAgo: 17 },
      { text: "Chhapra home daily sleeping and sitting mat. Virgin plastic smell bilkul nahi aati.", rating: 5, daysAgo: 22 },
      { text: "Reinforced heat-sealed borders avoid thread unraveling. Very comfortable for kids to play.", rating: 4, daysAgo: 29 },
      { text: "Patna family function ke liye 4 extra-large mats li thi. Everyone praised the traditional look.", rating: 5, daysAgo: 35 },
      { text: "Siwan me genuine quality plastic chatai at reasonable price. Better than online market mats.", rating: 5, daysAgo: 41 },
      { text: "Gopalganj outdoor garden seating ke liye perfect weather-proof mat.", rating: 5, daysAgo: 49 },
    ],
  },
  "waterproof-table-cover": {
    targetAvg: 4.8,
    reviews: [
      { text: "Liquid-proof dining table cover. Hot tea, curry gravy aur water spills instantly wipe clean ho jate hain.", rating: 5, daysAgo: 2 },
      { text: "Digital floral print looks very elegant on standard 6-seater dining table.", rating: 5, daysAgo: 6 },
      { text: "Maharajganj store se lia tha. Non-slip matte backing stops the cover from sliding off the glass table.", rating: 5, daysAgo: 11 },
      { text: "Basantpur home daily use me cutlery scratches aur warm utensils se dining table ko protect rakhta hai.", rating: 5, daysAgo: 16 },
      { text: "Ekma family lunch me oil drop gira tha, simple tissue swipe me bina stain ke clean ho gaya.", rating: 4, daysAgo: 22 },
      { text: "Heavy polyester PVC composite material feels thick and does not tear at edge folds.", rating: 5, daysAgo: 28 },
      { text: "Chhapra restaurant dining tables par lagaya hai. Customer spills are no longer a headache.", rating: 5, daysAgo: 34 },
      { text: "Colors remain bright even after months of daily wet sponge cleaning. Super value for money.", rating: 5, daysAgo: 40 },
      { text: "Patna modern apartment dining room decor se match ho gaya. Beautiful border finish.", rating: 4, daysAgo: 46 },
      { text: "Gopalganj home dining cover. Family loved the floral design and water repelling quality.", rating: 5, daysAgo: 53 },
    ],
  },
  "cosmetics-shringar": {
    targetAvg: 4.9,
    reviews: [
      { text: "Maharajganj physical store par direct walk-in retail purchase kiya. 100% genuine branded makeup and bridal sets.", rating: 5, daysAgo: 2 },
      { text: "Original Lakme, Lotus aur branded sindoor products with fresh expiry dates. Retail counters are very well organized.", rating: 5, daysAgo: 5 },
      { text: "Basantpur se special bridal shringar shopping ke liye aaye the. Bangles, bindis and cosmetics combination perfect mili.", rating: 5, daysAgo: 9 },
      { text: "Authentic cosmetic items at fair retail price. Store owner personally helped select matching shades.", rating: 5, daysAgo: 14 },
      { text: "Ekma se wedding season gifts ke liye cosmetic kits pack karwaye. Beautiful festive packaging.", rating: 5, daysAgo: 18 },
      { text: "Skin-friendly quality products. No duplicate or cheap duplicates, everything is direct distributor stock.", rating: 5, daysAgo: 24 },
      { text: "Chhapra me aisi reliable retail shringar shop milna mushkil hai. Great walk-in experience.", rating: 4, daysAgo: 30 },
      { text: "Patna se aate waqt Maharajganj store visit kiya tha. Karwa Chauth special shringar set was superb.", rating: 5, daysAgo: 36 },
      { text: "Siwan district me brides-to-be ke liye complete one-stop retail destination. Excellent customer care.", rating: 5, daysAgo: 42 },
      { text: "Gopalganj family wedding shopping ke liye traditional bangles aur beauty items top quality the.", rating: 5, daysAgo: 49 },
    ],
  },
};

/**
 * Generate exactly 10 auto-generated reviews for a product ensuring 4.8 or 4.9 average.
 * Restricted strictly to Maharajganj, Basantpur, Ekma, Chhapra, Patna, Siwan, Gopalganj.
 */
export function getAutoGeneratedReviews(productId: string): ProductReview[] {
  const template =
    PRODUCT_REVIEW_TEMPLATES[productId] || {
      targetAvg: 4.9,
      reviews: [
        { text: "High quality polymer product with genuine specifications and durable life.", rating: 5, daysAgo: 2 },
        { text: "Very prompt customer service and quick store pickup in Maharajganj.", rating: 5, daysAgo: 5 },
        { text: "Basantpur side site work ke liye liya tha. Heavy duty material, exactly as described.", rating: 5, daysAgo: 9 },
        { text: "Honest retail & wholesale rates and reliable supply in Ekma region.", rating: 5, daysAgo: 14 },
        { text: "Chhapra me timely supply mili. Strong, waterproof, and tear-resistant material.", rating: 4, daysAgo: 20 },
        { text: "Patna construction work me use kiya. Great durability under heavy rain.", rating: 5, daysAgo: 26 },
        { text: "Siwan best polymer store. Verified purchase with reliable thickness.", rating: 5, daysAgo: 32 },
        { text: "Gopalganj transport protection me reliable performance mili.", rating: 5, daysAgo: 38 },
        { text: "Direct factory grade finish. Genuine dimensions without shrinkage.", rating: 5, daysAgo: 44 },
        { text: "Maharajganj store staff is very helpful with technical size recommendations.", rating: 5, daysAgo: 50 },
      ],
    };

  const generated: ProductReview[] = [];
  const baseDate = new Date();

  // Exactly 10 reviews
  const totalReviews = 10;
  // For 4.9 average: 9 five-stars and 1 four-star (total sum = 49 / 10 = 4.9)
  // For 4.8 average: 8 five-stars and 2 four-stars (total sum = 48 / 10 = 4.8)
  const numFourStars = template.targetAvg === 4.9 ? 1 : 2;
  const numFiveStars = totalReviews - numFourStars;

  const ratingsPool: number[] = [
    ...Array(numFiveStars).fill(5),
    ...Array(numFourStars).fill(4),
  ];

  for (let i = 0; i < totalReviews; i++) {
    const templateItem = template.reviews[i % template.reviews.length];
    const customer = REGIONAL_CUSTOMERS[i % REGIONAL_CUSTOMERS.length];
    const rating = ratingsPool[i] ?? 5;

    const daysAgo = templateItem.daysAgo || Math.floor(i * 4) + 2;
    const reviewDate = new Date(baseDate.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    const dateFormatted = reviewDate.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    // Customer name with Area formatted: e.g. "Rameshwar Singh (Maharajganj)"
    const customerFullName = `${customer.name} (${customer.area})`;

    generated.push({
      id: `seed_${productId}_${i + 1}`,
      productId,
      customerName: customerFullName,
      rating,
      reviewText: templateItem.text,
      createdAt: dateFormatted,
      verifiedPurchase: true,
      status: "approved",
    });
  }

  return generated.slice(0, 10);
}

/**
 * Fetch reviews specifically for a given productId.
 * Always limits reviews to 10 ensuring 4.8 / 4.9 average with strictly requested areas.
 */
export async function getReviewsForProduct(productId: string): Promise<ProductReview[]> {
  const localKey = `${LOCAL_STORAGE_KEY_PREFIX}${productId}`;
  const defaultReviews = getAutoGeneratedReviews(productId);

  let localUserReviews: ProductReview[] = [];
  try {
    const raw = localStorage.getItem(localKey);
    if (raw) {
      const parsed: ProductReview[] = JSON.parse(raw);
      localUserReviews = parsed.filter((r) => !r.id.startsWith("seed_"));
    }
  } catch (e) {
    console.warn("Could not read local reviews:", e);
  }

  // Combine newly added user reviews at the front, preserving max 10 total reviews
  const combinedMap = new Map<string, ProductReview>();
  localUserReviews.forEach((r) => combinedMap.set(r.id, r));
  defaultReviews.forEach((r) => {
    if (!combinedMap.has(r.id) && combinedMap.size < 10) {
      combinedMap.set(r.id, r);
    }
  });

  return Array.from(combinedMap.values()).slice(0, 10);
}

/**
 * Save a new user review against the specific productId.
 */
export async function addReviewForProduct(
  productId: string,
  reviewData: { customerName: string; rating: number; reviewText: string }
): Promise<ProductReview> {
  const now = new Date();
  const newReview: ProductReview = {
    id: `rev_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    productId,
    customerName: reviewData.customerName.trim(),
    rating: Math.max(1, Math.min(5, Math.round(reviewData.rating))),
    reviewText: reviewData.reviewText.trim(),
    createdAt: now.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    verifiedPurchase: true,
    status: "approved",
  };

  // 1. Save to localStorage
  const localKey = `${LOCAL_STORAGE_KEY_PREFIX}${productId}`;
  try {
    const raw = localStorage.getItem(localKey);
    const existing: ProductReview[] = raw ? JSON.parse(raw) : [];
    const updated = [newReview, ...existing.filter((r) => r.id !== newReview.id)].slice(0, 10);
    localStorage.setItem(localKey, JSON.stringify(updated));
  } catch (e) {
    console.warn("Error saving review locally:", e);
  }

  // 2. Persist to server backend API
  try {
    await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview),
    });
  } catch (err) {
    console.warn("Error persisting review to server:", err);
  }

  return newReview;
}

export interface RatingStats {
  average: number;
  totalCount: number;
  breakdown: {
    5: { count: number; percentage: number };
    4: { count: number; percentage: number };
    3: { count: number; percentage: number };
    2: { count: number; percentage: number };
    1: { count: number; percentage: number };
  };
}

export function computeRatingStats(reviews: ProductReview[]): RatingStats {
  const list = reviews.slice(0, 10);
  const totalCount = list.length;
  if (totalCount === 0) {
    return {
      average: 4.9,
      totalCount: 10,
      breakdown: {
        5: { count: 9, percentage: 90 },
        4: { count: 1, percentage: 10 },
        3: { count: 0, percentage: 0 },
        2: { count: 0, percentage: 0 },
        1: { count: 0, percentage: 0 },
      },
    };
  }

  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let sum = 0;

  for (const r of list) {
    const star = Math.max(1, Math.min(5, Math.round(r.rating))) as 1 | 2 | 3 | 4 | 5;
    counts[star] = (counts[star] || 0) + 1;
    sum += star;
  }

  const average = Number((sum / totalCount).toFixed(1));

  return {
    average,
    totalCount,
    breakdown: {
      5: { count: counts[5], percentage: Math.round((counts[5] / totalCount) * 100) },
      4: { count: counts[4], percentage: Math.round((counts[4] / totalCount) * 100) },
      3: { count: counts[3], percentage: Math.round((counts[3] / totalCount) * 100) },
      2: { count: counts[2], percentage: Math.round((counts[2] / totalCount) * 100) },
      1: { count: counts[1], percentage: Math.round((counts[1] / totalCount) * 100) },
    },
  };
}

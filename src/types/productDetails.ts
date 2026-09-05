export interface ProductReview {
  id: string;
  productId: string;
  customerName: string;
  rating: number; // 1 to 5
  reviewText: string;
  createdAt: string; // Formatted date or ISO
  verifiedPurchase?: boolean;
  status?: "approved" | "pending";
}

export interface CustomerEnquiry {
  id: string;
  customerName: string;
  state: string;
  city: string;
  productName: string;
  productId: string;
  date: string;
  time: string;
  enquirySource: string;
  status: "New" | "Contacted" | "Completed";
}

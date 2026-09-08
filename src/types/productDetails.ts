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

import { CustomerEnquiry } from "../types/productDetails";

const LOCAL_STORAGE_KEY = "om_shringar_customer_enquiries";

/**
 * Saves customer enquiry record to local persistence and server database.
 */
export async function saveCustomerEnquiry(params: {
  customerName: string;
  state: string;
  city: string;
  productName: string;
  productId: string;
  enquirySource?: string;
}): Promise<CustomerEnquiry> {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const timeStr = now.toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const enquiry: CustomerEnquiry = {
    id: `enq_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    customerName: params.customerName.trim(),
    state: params.state.trim(),
    city: params.city.trim(),
    productName: params.productName.trim(),
    productId: params.productId,
    date: dateStr,
    time: timeStr,
    enquirySource: params.enquirySource || "Product Detail Page",
    status: "New",
  };

  // 1. Save to localStorage
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    const list: CustomerEnquiry[] = raw ? JSON.parse(raw) : [];
    list.unshift(enquiry);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    console.warn("Failed to store enquiry in localStorage:", err);
  }

  // 2. Persist to server backend API
  try {
    await fetch("/api/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enquiry),
    });
  } catch (err) {
    console.warn("Failed to post enquiry to backend:", err);
  }

  return enquiry;
}

export function getLocalEnquiries(): CustomerEnquiry[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

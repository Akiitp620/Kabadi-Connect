// --- KABADIWALA SCRAP MARKETPLACE SEED DATA & LOCALSTORAGE HELPERS ---

export const SCRAP_CATEGORIES = [
  "Newspaper",
  "Cardboard",
  "Paper",
  "Plastic",
  "Iron",
  "Steel",
  "Aluminium",
  "Copper",
  "Other metals",
  "Books",
  "E-waste"
];

export const DEMO_USERS = [
  {
    id: "USR-SELLER-1",
    name: "Sunil Sharma",
    email: "seller@kabadiwala.com",
    role: "seller",
    phone: "+91 98765 11111",
    city: "Patna",
    address: "Plot 42, Industrial Area, Boring Road",
    businessName: "Sharma Scrap Traders",
    password: "password123"
  },
  {
    id: "USR-BUYER-1",
    name: "Vikram Recyclers",
    email: "buyer@kabadiwala.com",
    role: "buyer",
    phone: "+91 98765 22222",
    city: "Patna",
    address: "Bypass Warehousing Hub, Gate 3",
    businessName: "Vikram Metals & Polymer Recycling Pvt Ltd",
    password: "password123"
  },
  // Legacy demo support
  {
    id: "USR-SELLER-2",
    name: "Ayush Kumar (Seller)",
    email: "customer@kabadiwala.com",
    role: "seller",
    phone: "+91 98765 43210",
    city: "Patna",
    address: "Hostel Road, Kankarbagh",
    businessName: "Eco Household Cleaners",
    password: "password123"
  },
  {
    id: "USR-BUYER-2",
    name: "Ramesh Dealer (Buyer)",
    email: "agent@kabadiwala.com",
    role: "buyer",
    phone: "+91 98765 43211",
    city: "Patna",
    address: "Transport Nagar, Sector 4",
    businessName: "Ramesh Kabadi Mart",
    password: "password123"
  }
];

export const SEED_LISTINGS = [
  {
    id: "LST-101",
    sellerId: "USR-SELLER-1",
    sellerName: "Sunil Sharma",
    sellerPhone: "+91 98765 11111",
    title: "Heavy Corrugated Cardboard Boxes (Baled)",
    category: "Cardboard",
    description: "Clean, dry double-wall corrugated cartons from logistics packaging. Baled and strapped, 100% moisture-free. Ready for instant container or truck loading.",
    quantity: 500,
    availableQuantity: 420,
    unit: "kg",
    pricePerUnit: 14,
    imageUrl: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80",
    condition: "Clean & Sorted",
    preference: "Doorstep Pickup by Buyer",
    address: "Plot 42, Industrial Area, Boring Road",
    city: "Patna",
    status: "Available",
    createdAt: "15 Oct 2026",
    badge: "Verified Lot"
  },
  {
    id: "LST-102",
    sellerId: "USR-SELLER-1",
    sellerName: "Sunil Sharma",
    sellerPhone: "+91 98765 11111",
    title: "Old Office Newspapers & White Records",
    category: "Newspaper",
    description: "Bundled daily newspapers (Dainik Jagran, TOI, HT) along with shred-free office archives. Zero plastic contamination.",
    quantity: 350,
    availableQuantity: 350,
    unit: "kg",
    pricePerUnit: 18,
    imageUrl: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=600&q=80",
    condition: "Clean & Sorted",
    preference: "Doorstep Pickup by Buyer",
    address: "Plot 42, Industrial Area, Boring Road",
    city: "Patna",
    status: "Available",
    createdAt: "15 Oct 2026",
    badge: "Dry Storage"
  },
  {
    id: "LST-103",
    sellerId: "USR-SELLER-2",
    sellerName: "Ayush Kumar (Seller)",
    sellerPhone: "+91 98765 43210",
    title: "High-Grade Copper Wire Scrap (Stripped)",
    category: "Copper",
    description: "Bright clean stripped copper wire scrap (Millberry grade). No insulation, solder, or grease residue. Tested 99.8% purity.",
    quantity: 85,
    availableQuantity: 85,
    unit: "kg",
    pricePerUnit: 640,
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    condition: "Industrial Grade",
    preference: "Flexible",
    address: "Hostel Road, Kankarbagh",
    city: "Patna",
    status: "Available",
    createdAt: "14 Oct 2026",
    badge: "High Value"
  },
  {
    id: "LST-104",
    sellerId: "USR-SELLER-1",
    sellerName: "Sunil Sharma",
    sellerPhone: "+91 98765 11111",
    title: "Heavy Melting Steel & Rebar Scrap (HMS 1&2)",
    category: "Steel",
    description: "Construction rebar ends, beams, and machine scrap. Cut to 1-meter lengths for easy handling and furnace loading.",
    quantity: 1200,
    availableQuantity: 1000,
    unit: "kg",
    pricePerUnit: 34,
    imageUrl: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80",
    condition: "Industrial Grade",
    preference: "Doorstep Pickup by Buyer",
    address: "Plot 42, Industrial Area, Boring Road",
    city: "Patna",
    status: "Available",
    createdAt: "13 Oct 2026",
    badge: "Bulk Stock"
  },
  {
    id: "LST-105",
    sellerId: "USR-SELLER-2",
    sellerName: "Ayush Kumar (Seller)",
    sellerPhone: "+91 98765 43210",
    title: "Crushed Industrial PET Bottles & Flakes",
    category: "Plastic",
    description: "Clear and light blue beverage bottles, pre-washed, caps separated, compacted in 40 kg bags.",
    quantity: 450,
    availableQuantity: 450,
    unit: "kg",
    pricePerUnit: 25,
    imageUrl: "https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=600&q=80",
    condition: "Clean & Sorted",
    preference: "Doorstep Pickup by Buyer",
    address: "Boring Canal Road",
    city: "Patna",
    status: "Available",
    createdAt: "12 Oct 2026",
    badge: "Washed"
  },
  {
    id: "LST-106",
    sellerId: "USR-SELLER-1",
    sellerName: "Sunil Sharma",
    sellerPhone: "+91 98765 11111",
    title: "Aluminium Section & Window Frame Scrap",
    category: "Aluminium",
    description: "Commercial architectural aluminium profiles with hardware removed. Clean extrusion 6063 scrap.",
    quantity: 280,
    availableQuantity: 280,
    unit: "kg",
    pricePerUnit: 145,
    imageUrl: "https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=600&q=80",
    condition: "Clean & Sorted",
    preference: "Doorstep Pickup by Buyer",
    address: "Plot 42, Industrial Area, Boring Road",
    city: "Patna",
    status: "Available",
    createdAt: "11 Oct 2026",
    badge: "Alloy 6063"
  },
  {
    id: "LST-107",
    sellerId: "USR-SELLER-2",
    sellerName: "Ayush Kumar (Seller)",
    sellerPhone: "+91 98765 43210",
    title: "Decommissioned Desktop Motherboards & Telecom PCBs",
    category: "E-waste",
    description: "Complete telecom server cards and computer motherboards. Intact gold-plated contacts and IC chips. Lead-safe handled.",
    quantity: 45,
    availableQuantity: 45,
    unit: "kg",
    pricePerUnit: 220,
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    condition: "Intact E-waste",
    preference: "Seller Will Deliver",
    address: "Rajendra Nagar, Sector 2",
    city: "Patna",
    status: "Available",
    createdAt: "10 Oct 2026",
    badge: "Certified Recycling"
  },
  {
    id: "LST-108",
    sellerId: "USR-SELLER-1",
    sellerName: "Sunil Sharma",
    sellerPhone: "+91 98765 11111",
    title: "Discarded Textbooks & Hardbound Novels",
    category: "Books",
    description: "School and college library discards. Good pulp quality, covers present, zero mold or dampness.",
    quantity: 220,
    availableQuantity: 220,
    unit: "kg",
    pricePerUnit: 16,
    imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80",
    condition: "Clean & Sorted",
    preference: "Doorstep Pickup by Buyer",
    address: "Plot 42, Industrial Area, Boring Road",
    city: "Patna",
    status: "Available",
    createdAt: "09 Oct 2026",
    badge: "Dry Pulp"
  }
];

export const SEED_OFFERS = [
  {
    id: "OFR-501",
    listingId: "LST-101",
    listingTitle: "Heavy Corrugated Cardboard Boxes (Baled)",
    sellerId: "USR-SELLER-1",
    sellerName: "Sunil Sharma",
    buyerId: "USR-BUYER-1",
    buyerName: "Vikram Recyclers",
    buyerPhone: "+91 98765 22222",
    offeredPrice: 12.5,
    listedPrice: 14,
    quantity: 300,
    unit: "kg",
    totalOfferValue: 3750,
    date: "16 Oct 2026",
    message: "We have an open truck in Boring Road tomorrow morning. Can lift 300 kg immediately at ₹12.5/kg cash.",
    status: "Pending", // Pending, Accepted, Rejected, Countered
    counterPrice: null,
    counterNote: null
  },
  {
    id: "OFR-502",
    listingId: "LST-103",
    listingTitle: "High-Grade Copper Wire Scrap (Stripped)",
    sellerId: "USR-SELLER-2",
    sellerName: "Ayush Kumar (Seller)",
    buyerId: "USR-BUYER-1",
    buyerName: "Vikram Recyclers",
    buyerPhone: "+91 98765 22222",
    offeredPrice: 620,
    listedPrice: 640,
    quantity: 85,
    unit: "kg",
    totalOfferValue: 52700,
    date: "15 Oct 2026",
    message: "Ready to pick up complete lot of 85 kg. Can do on-the-spot digital payment.",
    status: "Accepted",
    counterPrice: null,
    counterNote: "Accepted. Please call ahead before visiting warehouse."
  },
  {
    id: "OFR-503",
    listingId: "LST-104",
    listingTitle: "Heavy Melting Steel & Rebar Scrap (HMS 1&2)",
    sellerId: "USR-SELLER-1",
    sellerName: "Sunil Sharma",
    buyerId: "USR-BUYER-2",
    buyerName: "Ramesh Dealer (Buyer)",
    buyerPhone: "+91 98765 43211",
    offeredPrice: 30,
    listedPrice: 34,
    quantity: 500,
    unit: "kg",
    totalOfferValue: 15000,
    date: "14 Oct 2026",
    message: "Looking for regular weekly steel supply. Offering ₹30/kg for initial batch.",
    status: "Countered",
    counterPrice: 32.5,
    counterNote: "We can do ₹32.5/kg if you take at least 500 kg."
  }
];

export const SEED_ORDERS = [
  {
    id: "ORD-901",
    listingId: "LST-101",
    listingTitle: "Heavy Corrugated Cardboard Boxes (Baled)",
    category: "Cardboard",
    sellerId: "USR-SELLER-1",
    sellerName: "Sunil Sharma",
    sellerPhone: "+91 98765 11111",
    buyerId: "USR-BUYER-1",
    buyerName: "Vikram Recyclers",
    buyerPhone: "+91 98765 22222",
    quantity: 80,
    unit: "kg",
    pricePerUnit: 14,
    totalAmount: 1120,
    date: "Today, 10:30 AM",
    pickupAddress: "Plot 42, Industrial Area, Boring Road, Patna",
    pickupSlot: "Tomorrow, 10:00 AM – 1:00 PM",
    preference: "Doorstep Pickup by Buyer",
    status: "Accepted", // Pending, Accepted, Ready for pickup, Completed, Cancelled
    paymentStatus: "Cash / UPI on Collection"
  },
  {
    id: "ORD-902",
    listingId: "LST-104",
    listingTitle: "Heavy Melting Steel & Rebar Scrap (HMS 1&2)",
    category: "Steel",
    sellerId: "USR-SELLER-1",
    sellerName: "Sunil Sharma",
    sellerPhone: "+91 98765 11111",
    buyerId: "USR-BUYER-1",
    buyerName: "Vikram Recyclers",
    buyerPhone: "+91 98765 22222",
    quantity: 200,
    unit: "kg",
    pricePerUnit: 34,
    totalAmount: 6800,
    date: "14 Oct 2026",
    pickupAddress: "Plot 42, Industrial Area, Boring Road, Patna",
    pickupSlot: "Completed Slot",
    preference: "Doorstep Pickup by Buyer",
    status: "Completed",
    paymentStatus: "Paid (Demo Record)"
  },
  {
    id: "ORD-903",
    listingId: "LST-102",
    listingTitle: "Old Office Newspapers & White Records",
    category: "Newspaper",
    sellerId: "USR-SELLER-1",
    sellerName: "Sunil Sharma",
    sellerPhone: "+91 98765 11111",
    buyerId: "USR-BUYER-2",
    buyerName: "Ramesh Dealer (Buyer)",
    buyerPhone: "+91 98765 43211",
    quantity: 120,
    unit: "kg",
    pricePerUnit: 18,
    totalAmount: 2160,
    date: "16 Oct 2026",
    pickupAddress: "Plot 42, Industrial Area, Boring Road, Patna",
    pickupSlot: "Today, 3:00 PM – 5:00 PM",
    preference: "Doorstep Pickup by Buyer",
    status: "Pending",
    paymentStatus: "Cash on Delivery"
  }
];

export const SEED_RATES = [
  { id: 1, material: "Newspaper", rate: 18, unit: "kg", trend: "+2.5%" },
  { id: 2, material: "Cardboard", rate: 14, unit: "kg", trend: "Stable" },
  { id: 3, material: "Mixed plastic", rate: 22, unit: "kg", trend: "+1.2%" },
  { id: 4, material: "Iron / metal", rate: 32, unit: "kg", trend: "+3.8%" },
  { id: 5, material: "Steel scrap", rate: 36, unit: "kg", trend: "+2.0%" },
  { id: 6, material: "Copper wire", rate: 640, unit: "kg", trend: "+4.5%" },
  { id: 7, material: "Aluminium scrap", rate: 145, unit: "kg", trend: "+1.8%" },
  { id: 8, material: "Books", rate: 16, unit: "kg", trend: "Stable" },
  { id: 9, material: "E-waste (PCBs)", rate: 220, unit: "kg", trend: "High demand" }
];

export const SEED_PICKUPS = [
  {
    id: "KC-2041",
    material: "Cardboard cartons",
    weight: "25–30 kg",
    date: "Tomorrow · 10:00 AM – 12:00 PM",
    status: "Confirmed",
    amount: "₹380",
    address: "Plot 42, Industrial Area, Boring Road, Patna"
  },
  {
    id: "KC-1988",
    material: "Newspapers & white records",
    weight: "14.2 kg",
    date: "14 Oct 2026 · 3:30 PM",
    status: "Completed",
    amount: "₹255",
    address: "Hostel Road, Kankarbagh, Patna"
  },
  {
    id: "KC-1940",
    material: "Aluminium beverage cans",
    weight: "8.5 kg",
    date: "11 Oct 2026 · 11:00 AM",
    status: "Completed",
    amount: "₹1,230",
    address: "Boring Canal Road, Patna"
  }
];

// --- LOCAL STORAGE HELPERS ---

export function loadStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

export function saveStorage(key, value) {
  try {
    if (value === null || value === undefined) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (e) {
    console.error("Failed to write to localStorage for key", key, e);
  }
}

// Format a clean display name from an email address
export function formatNameFromEmail(email) {
  const prefix = (email || "").split("@")[0] || "User";
  return prefix
    .split(/[._-]/)
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join(" ");
}

// Determine role based on email conventions or default
export function detectRole(email) {
  const lower = (email || "").toLowerCase().trim();
  if (lower.includes("buyer") || lower.includes("dealer") || lower.includes("agent")) {
    return "buyer";
  }
  return "seller";
}

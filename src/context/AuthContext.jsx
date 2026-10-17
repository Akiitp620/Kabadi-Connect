import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DEMO_USERS,
  SEED_LISTINGS,
  SEED_OFFERS,
  SEED_ORDERS,
  SEED_PICKUPS,
  SEED_RATES,
  loadStorage,
  saveStorage,
  formatNameFromEmail,
  detectRole
} from "../utils/demoAuth";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => loadStorage("kw_user", loadStorage("kc_user", null)));
  const [registeredUsers, setRegisteredUsers] = useState(() =>
    loadStorage("kw_registered_users", DEMO_USERS)
  );
  const [listings, setListings] = useState(() =>
    loadStorage("kw_listings", SEED_LISTINGS)
  );
  const [offers, setOffers] = useState(() =>
    loadStorage("kw_offers", SEED_OFFERS)
  );
  const [orders, setOrders] = useState(() =>
    loadStorage("kw_orders", SEED_ORDERS)
  );
  const [savedListings, setSavedListings] = useState(() =>
    loadStorage("kw_saved_listings", ["LST-101", "LST-103"])
  );
  const [rates, setRates] = useState(() =>
    loadStorage("kw_rates", SEED_RATES)
  );
  const [pickups, setPickups] = useState(() =>
    loadStorage("kw_pickups", loadStorage("kc_pickups", SEED_PICKUPS))
  );

  // Sync state changes with localStorage
  useEffect(() => {
    saveStorage("kw_user", user);
  }, [user]);

  useEffect(() => {
    saveStorage("kw_registered_users", registeredUsers);
  }, [registeredUsers]);

  useEffect(() => {
    saveStorage("kw_listings", listings);
  }, [listings]);

  useEffect(() => {
    saveStorage("kw_offers", offers);
  }, [offers]);

  useEffect(() => {
    saveStorage("kw_orders", orders);
  }, [orders]);

  useEffect(() => {
    saveStorage("kw_saved_listings", savedListings);
  }, [savedListings]);

  useEffect(() => {
    saveStorage("kw_rates", rates);
  }, [rates]);

  useEffect(() => {
    saveStorage("kw_pickups", pickups);
  }, [pickups]);

  // --- AUTHENTICATION HANDLERS ---

  const login = ({ email, password, role }) => {
    const cleanEmail = (email || "").trim().toLowerCase();
    const cleanPassword = (password || "").trim();

    if (!cleanEmail || !cleanPassword) {
      return { success: false, error: "Please enter both your email address and password." };
    }
    if (!cleanEmail.includes("@") || !cleanEmail.includes(".")) {
      return { success: false, error: "Please enter a valid email address." };
    }
    if (cleanPassword.length < 6) {
      return { success: false, error: "Password must be at least 6 characters long." };
    }

    // Check if user exists in registered list
    const existing = registeredUsers.find(
      (u) => u.email.toLowerCase() === cleanEmail
    );

    const userRole = role || existing?.role || detectRole(cleanEmail);
    const name = existing?.name || formatNameFromEmail(cleanEmail);
    const phone = existing?.phone || "+91 98765 00000";
    const city = existing?.city || "Patna";
    const address = existing?.address || "Station Road, Patna";
    const businessName = existing?.businessName || (userRole === "seller" ? `${name} Scrap Works` : `${name} Recyclers`);

    const userProfile = {
      id: existing?.id || "USR-" + Math.floor(1000 + Math.random() * 9000),
      name,
      email: cleanEmail,
      role: userRole,
      phone,
      city,
      address,
      businessName
    };

    saveStorage("kw_user", userProfile);
    setUser(userProfile);

    return { success: true, user: userProfile };
  };

  const signup = ({ name, email, password, phone, role = "seller", city = "Patna", address = "", businessName = "" }) => {
    const cleanName = (name || "").trim();
    const cleanEmail = (email || "").trim().toLowerCase();
    const cleanPassword = (password || "").trim();
    const cleanPhone = (phone || "").trim();

    if (!cleanName) {
      return { success: false, error: "Please enter your full name." };
    }
    if (!cleanEmail || !cleanEmail.includes("@") || !cleanEmail.includes(".")) {
      return { success: false, error: "Please enter a valid email address." };
    }
    if (!cleanPassword || cleanPassword.length < 6) {
      return { success: false, error: "Password must be at least 6 characters long." };
    }
    if (!cleanPhone) {
      return { success: false, error: "Please enter your contact phone number." };
    }

    const newUser = {
      id: "USR-" + Math.floor(1000 + Math.random() * 9000),
      name: cleanName,
      email: cleanEmail,
      role: role.toLowerCase() === "buyer" ? "buyer" : "seller",
      phone: cleanPhone,
      city: (city || "Patna").trim(),
      address: (address || "").trim(),
      businessName: (businessName || `${cleanName} Enterprises`).trim()
    };

    const updatedCatalog = [
      ...registeredUsers.filter((u) => u.email.toLowerCase() !== cleanEmail),
      newUser
    ];
    setRegisteredUsers(updatedCatalog);
    saveStorage("kw_registered_users", updatedCatalog);

    saveStorage("kw_user", newUser);
    setUser(newUser);

    return { success: true, user: newUser };
  };

  const logout = () => {
    saveStorage("kw_user", null);
    saveStorage("kc_user", null);
    setUser(null);
    navigate("/", { replace: true });
  };

  const updateUserProfile = (updatedFields) => {
    if (!user) return;
    const updated = { ...user, ...updatedFields };
    setUser(updated);
    saveStorage("kw_user", updated);

    const updatedCatalog = registeredUsers.map((u) =>
      u.email.toLowerCase() === updated.email.toLowerCase() ? updated : u
    );
    setRegisteredUsers(updatedCatalog);
    saveStorage("kw_registered_users", updatedCatalog);
  };

  // --- MARKETPLACE LISTING HANDLERS ---

  const addListing = (listingData) => {
    const id = "LST-" + Math.floor(200 + Math.random() * 800);
    const qty = Math.max(1, Number(listingData.quantity) || 1);
    const price = Math.max(0.1, Number(listingData.pricePerUnit) || 1);

    const newListing = {
      id,
      sellerId: user?.id || "USR-SELLER-1",
      sellerName: user?.name || "Sunil Sharma",
      sellerPhone: user?.phone || "+91 98765 11111",
      title: (listingData.title || "").trim(),
      category: listingData.category || "Cardboard",
      description: (listingData.description || "").trim(),
      quantity: qty,
      availableQuantity: qty,
      unit: listingData.unit || "kg",
      pricePerUnit: price,
      imageUrl: listingData.imageUrl || null,
      condition: listingData.condition || "Clean & Sorted",
      preference: listingData.preference || "Doorstep Pickup by Buyer",
      address: listingData.address || user?.address || "Industrial Area",
      city: listingData.city || user?.city || "Patna",
      status: "Available",
      createdAt: "Today",
      badge: "Newly Listed"
    };

    setListings((prev) => [newListing, ...prev]);
    return newListing;
  };

  const updateListing = (id, updatedFields) => {
    setListings((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updated = { ...item, ...updatedFields };
          // Keep status consistent with availability
          if (updated.availableQuantity !== undefined) {
            if (updated.availableQuantity <= 0) {
              updated.status = "Sold Out";
            } else if (updated.status === "Sold Out" && updated.availableQuantity > 0) {
              updated.status = "Available";
            }
          }
          return updated;
        }
        return item;
      })
    );
  };

  const deleteListing = (id) => {
    setListings((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleListingStatus = (id) => {
    setListings((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStatus = item.status === "Available" ? "Unavailable" : "Available";
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
  };

  // --- ORDER HANDLERS ---

  const createOrder = ({
    listingId,
    quantity,
    pickupSlot,
    preference,
    notes,
    buyerContact,
    customPrice
  }) => {
    const listing = listings.find((l) => l.id === listingId);
    if (!listing) return { success: false, error: "Listing not found" };

    if (listing.status === "Unavailable" || listing.status === "Sold Out") {
      return { success: false, error: "This scrap lot is currently unavailable or sold out." };
    }

    const orderQty = Number(quantity);
    if (!orderQty || orderQty <= 0 || orderQty > listing.availableQuantity) {
      return {
        success: false,
        error: `Quantity must be between 1 and ${listing.availableQuantity} ${listing.unit}`
      };
    }

    const effectiveUnitPrice =
      Number(customPrice) > 0 ? Number(customPrice) : listing.pricePerUnit;
    const orderId = "ORD-" + Math.floor(1000 + Math.random() * 9000);
    const totalAmount = orderQty * effectiveUnitPrice;

    const newOrder = {
      id: orderId,
      listingId: listing.id,
      listingTitle: listing.title,
      category: listing.category,
      sellerId: listing.sellerId,
      sellerName: listing.sellerName,
      sellerPhone: listing.sellerPhone,
      buyerId: user?.id || "USR-BUYER-1",
      buyerName: user?.name || "Vikram Recyclers",
      buyerPhone: buyerContact || user?.phone || "+91 98765 22222",
      quantity: orderQty,
      unit: listing.unit,
      pricePerUnit: effectiveUnitPrice,
      totalAmount,
      date: "Today, Just now",
      pickupAddress: `${listing.address}, ${listing.city}`,
      pickupSlot: pickupSlot || "Tomorrow, 10:00 AM – 1:00 PM",
      preference: preference || listing.preference,
      status: "Pending", // Pending, Accepted, Ready for pickup, Completed, Cancelled
      paymentStatus: "Cash / UPI on Collection",
      notes: notes || ""
    };

    // Update listing available quantity to prevent overselling
    const remainingQty = listing.availableQuantity - orderQty;
    updateListing(listing.id, {
      availableQuantity: remainingQty,
      status: remainingQty === 0 ? "Sold Out" : listing.status
    });

    setOrders((prev) => [newOrder, ...prev]);
    return { success: true, order: newOrder };
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const target = orders.find((o) => o.id === orderId);

    // If cancelling an active order, restore inventory back to listing
    if (target && newStatus === "Cancelled" && target.status !== "Cancelled") {
      setListings((prevListings) =>
        prevListings.map((l) => {
          if (l.id === target.listingId) {
            const restored = (l.availableQuantity || 0) + (target.quantity || 0);
            return {
              ...l,
              availableQuantity: restored,
              status: l.status === "Sold Out" ? "Available" : l.status
            };
          }
          return l;
        })
      );
    }

    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
  };

  // --- OFFER HANDLERS ---

  const makeOffer = ({ listingId, offeredPrice, quantity, message }) => {
    const listing = listings.find((l) => l.id === listingId);
    if (!listing) return { success: false, error: "Listing not found" };

    const offerQty = Number(quantity) || listing.availableQuantity;
    const price = Number(offeredPrice);

    if (!price || price <= 0) {
      return { success: false, error: "Please enter a valid positive offer price per unit." };
    }
    if (!offerQty || offerQty <= 0 || offerQty > listing.availableQuantity) {
      return {
        success: false,
        error: `Quantity must be between 1 and ${listing.availableQuantity} ${listing.unit}.`
      };
    }

    const offerId = "OFR-" + Math.floor(600 + Math.random() * 400);
    const newOffer = {
      id: offerId,
      listingId: listing.id,
      listingTitle: listing.title,
      sellerId: listing.sellerId,
      sellerName: listing.sellerName,
      buyerId: user?.id || "USR-BUYER-1",
      buyerName: user?.name || "Vikram Recyclers",
      buyerPhone: user?.phone || "+91 98765 22222",
      offeredPrice: price,
      listedPrice: listing.pricePerUnit,
      quantity: offerQty,
      unit: listing.unit,
      totalOfferValue: price * offerQty,
      date: "Today",
      message: message || "Interested in purchasing this scrap lot.",
      status: "Pending", // Pending, Accepted, Rejected, Countered
      counterPrice: null,
      counterNote: null
    };

    setOffers((prev) => [newOffer, ...prev]);
    return { success: true, offer: newOffer };
  };

  const respondToOffer = (offerId, responseStatus, counterPrice = null, counterNote = "") => {
    const validCounterPrice =
      counterPrice !== null && counterPrice !== undefined && Number(counterPrice) > 0
        ? Number(counterPrice)
        : null;

    setOffers((prev) =>
      prev.map((o) => {
        if (o.id === offerId) {
          return {
            ...o,
            status: responseStatus,
            counterPrice: validCounterPrice !== null ? validCounterPrice : o.counterPrice,
            counterNote: counterNote ? counterNote.trim() : o.counterNote
          };
        }
        return o;
      })
    );
  };

  // --- SAVED LISTINGS HANDLER ---

  const toggleSaveListing = (listingId) => {
    setSavedListings((prev) =>
      prev.includes(listingId)
        ? prev.filter((id) => id !== listingId)
        : [...prev, listingId]
    );
  };

  const value = {
    user,
    setUser,
    login,
    signup,
    logout,
    updateUserProfile,
    demoUsers: DEMO_USERS,
    registeredUsers,
    listings,
    addListing,
    updateListing,
    deleteListing,
    toggleListingStatus,
    orders,
    createOrder,
    updateOrderStatus,
    offers,
    makeOffer,
    respondToOffer,
    savedListings,
    toggleSaveListing,
    rates,
    setRates,
    pickups,
    setPickups
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Aliased as useData for backward compatibility across the app
export const useData = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useData must be used within an AuthProvider");
  }
  return context;
};

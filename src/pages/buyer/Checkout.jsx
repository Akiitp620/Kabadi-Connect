import React, { useState } from "react";
import { useParams, useNavigate, useSearchParams, Link } from "react-router-dom";
import {
  Package,
  MapPin,
  Calendar,
  Phone,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Truck,
  Info
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, listings, createOrder } = useAuth();

  const listing = listings.find((l) => l.id === id);

  const paramPrice = searchParams.get("price");
  const paramQuantity = searchParams.get("quantity");
  const paramOfferId = searchParams.get("offerId");
  const isNegotiated = Number(paramPrice) > 0;
  const unitPrice = isNegotiated ? Number(paramPrice) : (Number(listing?.pricePerUnit) || 0);

  const initialQuantity = paramQuantity && Number(paramQuantity) > 0
    ? Math.min(Number(paramQuantity), listing?.availableQuantity || 1)
    : (listing ? Math.min(100, listing.availableQuantity || 1) : 1);

  const [quantity, setQuantity] = useState(initialQuantity);
  const [buyerPhone, setBuyerPhone] = useState(user?.phone || "+91 98765 22222");
  const [pickupSlot, setPickupSlot] = useState("Tomorrow, 10:00 AM – 1:00 PM");
  const [preference, setPreference] = useState(
    listing?.preference || "Doorstep Pickup by Buyer"
  );
  const [notes, setNotes] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successOrder, setSuccessOrder] = useState(null);

  if (!listing) {
    return (
      <div className="page">
        <div className="panel glass empty" style={{ maxWidth: "500px", margin: "60px auto" }}>
          <Package />
          <h2>Listing Not Found</h2>
          <p>The requested scrap lot could not be loaded for checkout.</p>
          <Link to="/buyer/marketplace" className="btn primary">
            Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  const isAvailable = listing.status === "Available" && listing.availableQuantity > 0;
  const numQuantity = Number(quantity) || 0;
  const subtotal = numQuantity * unitPrice;
  const platformFee = 0; // Free demo
  const estimatedTotal = subtotal + platformFee;

  const handleQuantityChange = (val) => {
    const parsed = Math.max(1, Math.min(listing.availableQuantity, Number(val) || 1));
    setQuantity(parsed);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!isAvailable) {
      setErrorMessage("This scrap lot is currently unavailable or sold out.");
      return;
    }

    if (numQuantity <= 0 || numQuantity > listing.availableQuantity) {
      setErrorMessage(
        `Quantity must be between 1 and ${listing.availableQuantity} ${listing.unit}.`
      );
      return;
    }

    if (!buyerPhone.trim()) {
      setErrorMessage("Please provide a valid buyer contact phone number.");
      return;
    }

    const res = createOrder({
      listingId: listing.id,
      quantity: numQuantity,
      customPrice: isNegotiated ? unitPrice : null,
      pickupSlot,
      preference,
      notes,
      buyerContact: buyerPhone
    });

    if (res.success) {
      setSuccessOrder(res.order);
    } else {
      setErrorMessage(res.error || "Failed to create order.");
    }
  };

  return (
    <div className="page">
      <div style={{ marginBottom: "18px" }}>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="back"
          style={{ cursor: "pointer" }}
        >
          <ArrowLeft size={16} /> Back to Details
        </button>
      </div>

      <div className="page-head">
        <div>
          <span className="eyebrow">
            <i /> SECURE PROCUREMENT CHECKOUT
          </span>
          <h1>Confirm Purchase Order</h1>
          <p>
            Verify scrap quantities, schedule physical collection, and generate the digital procurement receipt.
          </p>
        </div>
      </div>

      {/* Success Order Confirmation View */}
      {successOrder ? (
        <div className="confirm glass" style={{ margin: "20px auto", maxWidth: "620px" }}>
          <CheckCircle size={54} style={{ color: "var(--green)", margin: "0 auto 16px" }} />
          <span className="eyebrow" style={{ justifyContent: "center" }}>
            ORDER PLACED SUCCESSFULLY
          </span>
          <h1 style={{ fontSize: "28px", margin: "12px 0 8px" }}>
            Purchase Confirmed: #{successOrder.id}
          </h1>
          <p style={{ color: "#92a295", fontSize: "12px", lineHeight: "1.7", marginBottom: "22px" }}>
            Your order for <b>{successOrder.quantity} {successOrder.unit}</b> of <b>{successOrder.listingTitle}</b> has been received by <b>{successOrder.sellerName}</b>. The lot inventory has been updated automatically.
          </p>

          <div
            style={{
              padding: "16px 20px",
              borderRadius: "14px",
              background: "#ffffff04",
              border: "1px solid var(--line)",
              textAlign: "left",
              marginBottom: "24px",
              display: "grid",
              gap: "8px",
              fontSize: "11px"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#849588" }}>Total Order Amount:</span>
              <b style={{ color: "var(--green)", fontSize: "14px" }}>
                ₹{successOrder.totalAmount?.toLocaleString("en-IN")}
              </b>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#849588" }}>Payment Terms:</span>
              <b>{successOrder.paymentStatus}</b>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#849588" }}>Seller Phone:</span>
              <b>{successOrder.sellerPhone}</b>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#849588" }}>Collection Address:</span>
              <b style={{ textAlign: "right", maxWidth: "60%" }}>{successOrder.pickupAddress}</b>
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <Link to="/buyer/orders" className="btn primary">
              Track in My Orders
            </Link>
            <Link to="/buyer/marketplace" className="btn ghost">
              Browse More Scrap
            </Link>
          </div>
        </div>
      ) : (
        /* Checkout 2-Column Split View */
        <div className="checkout-grid">
          {/* Left Form: Buyer Preferences & Contacts */}
          <form onSubmit={handlePlaceOrder} className="checkout-card glass">
            <div className="form-title">
              <i>1</i>
              <div>
                <b>Collection & Buyer Details</b>
                <small>Where and when your transport vehicle will collect the consignment</small>
              </div>
            </div>

            {errorMessage && (
              <div
                className="error"
                style={{ marginBottom: "16px", display: "flex", gap: "8px", alignItems: "center" }}
              >
                <AlertCircle size={16} />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="form-grid">
              <div className="field">
                <span>Buyer Contact Phone *</span>
                <div className="inputbox">
                  <Phone size={16} />
                  <input
                    type="text"
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <span>Fulfillment Type</span>
                <div className="inputbox">
                  <Truck size={16} />
                  <select
                    value={preference}
                    onChange={(e) => setPreference(e.target.value)}
                  >
                    <option value="Doorstep Pickup by Buyer">Doorstep Pickup by Buyer</option>
                    <option value="Seller Delivery">Seller Delivers to Warehouse</option>
                  </select>
                </div>
              </div>

              <div className="field full">
                <span>Pickup Time Slot *</span>
                <div className="inputbox">
                  <Calendar size={16} />
                  <select
                    value={pickupSlot}
                    onChange={(e) => setPickupSlot(e.target.value)}
                  >
                    <option value="Tomorrow, 10:00 AM – 1:00 PM">Tomorrow, 10:00 AM – 1:00 PM</option>
                    <option value="Tomorrow, 2:00 PM – 5:00 PM">Tomorrow, 2:00 PM – 5:00 PM</option>
                    <option value="Day After Tomorrow, Morning">Day After Tomorrow, Morning</option>
                    <option value="Immediate Today Pickup (Within 3 Hours)">
                      Immediate Today Pickup (Within 3 Hours)
                    </option>
                  </select>
                </div>
              </div>

              <div className="field full">
                <span>Special Instructions or Vehicle Type</span>
                <div className="inputbox" style={{ height: "auto" }}>
                  <textarea
                    rows={2}
                    placeholder="e.g., Bringing Tata Ace 407 truck with electronic scale; need forklift assistance..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <hr />

            {/* Payment Disclosure Alert */}
            <div className="checkout-demo-alert">
              <Info size={20} />
              <div>
                <b style={{ display: "block", marginBottom: "4px" }}>
                  Demo B2B Settlement Protocol
                </b>
                Payment is not deducted now. This frontend demo generates a confirmed procurement order in both your Buyer Portal and the Seller's Order Dashboard. Cash, RTGS, or UPI will be settled on-site following digital scale weighing.
              </div>
            </div>

            <button
              type="submit"
              className="btn primary full large"
              style={{ marginTop: "10px" }}
              disabled={!isAvailable}
            >
              <CheckCircle size={18} /> Confirm & Place Order (₹{estimatedTotal.toLocaleString("en-IN")})
            </button>
          </form>

          {/* Right Summary: Quantity Stepper & Price Calculation */}
          <div className="aside-stack">
            <div className="checkout-card glass">
              <span className="eyebrow">
                <Package size={12} /> ORDER SUMMARY
              </span>

              {/* Item Snapshot */}
              <div className="checkout-order-item" style={{ marginTop: "14px" }}>
                <div className="checkout-order-item-thumb">
                  {listing.imageUrl ? (
                    <img
                      src={listing.imageUrl}
                      alt={listing.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }}
                    />
                  ) : (
                    <Package size={28} />
                  )}
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <b style={{ display: "block", fontSize: "13px", color: "#edf6ef", lineHeight: 1.3 }}>
                    {listing.title}
                  </b>
                  <span style={{ fontSize: "10px", color: "var(--green)", fontWeight: 700 }}>
                    {listing.category}
                  </span>
                  <small style={{ display: "block", color: "#819185", marginTop: "3px" }}>
                    Seller: {listing.sellerName} • {listing.city}
                  </small>
                </div>
              </div>

              {/* Quantity Stepper */}
              <div style={{ margin: "16px 0", padding: "14px 0", borderTop: "1px solid #ffffff0a", borderBottom: "1px solid #ffffff0a" }}>
                <span style={{ fontSize: "11px", color: "#8ba093", display: "block", marginBottom: "8px" }}>
                  Select Purchase Quantity (Max {listing.availableQuantity} {listing.unit}):
                </span>

                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div className="qty-stepper">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(numQuantity - 10)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      min="1"
                      max={listing.availableQuantity}
                      onChange={(e) => handleQuantityChange(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(numQuantity + 10)}
                    >
                      +
                    </button>
                  </div>
                  <span style={{ fontSize: "12px", color: "#c0cec4", fontWeight: 700 }}>
                    {listing.unit}
                  </span>

                  <button
                    type="button"
                    className="btn ghost small"
                    style={{ marginLeft: "auto", fontSize: "10px" }}
                    onClick={() => handleQuantityChange(listing.availableQuantity)}
                  >
                    Buy Entire Lot
                  </button>
                </div>
              </div>

              {/* Financial Calculation Lines */}
              <div style={{ display: "grid", gap: "10px", fontSize: "11px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#8a9b8f" }}>
                  <span>Price Rate:</span>
                  <b style={{ color: isNegotiated ? "var(--green)" : "#edf6ef" }}>
                    ₹{unitPrice} / {listing.unit}
                    {isNegotiated && (
                      <span style={{ marginLeft: "6px", fontSize: "10px", background: "#b7f66a20", color: "var(--green)", padding: "1px 6px", borderRadius: "4px" }}>
                        Negotiated {paramOfferId ? `(#${paramOfferId})` : "Deal"}
                      </span>
                    )}
                  </b>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", color: "#8a9b8f" }}>
                  <span>Calculated Subtotal:</span>
                  <b>₹{subtotal.toLocaleString("en-IN")}</b>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", color: "#8a9b8f" }}>
                  <span>Platform Verification Fee:</span>
                  <b style={{ color: "var(--green)" }}>FREE (Demo)</b>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: "12px",
                    borderTop: "1px solid #ffffff0d",
                    marginTop: "6px"
                  }}
                >
                  <strong style={{ fontSize: "13px", color: "#edf6ef" }}>Estimated Total:</strong>
                  <strong style={{ font: "800 22px Manrope, sans-serif", color: "var(--green)" }}>
                    ₹{estimatedTotal.toLocaleString("en-IN")}
                  </strong>
                </div>
              </div>

              {/* Seller Location Snapshot */}
              <div
                style={{
                  marginTop: "18px",
                  padding: "12px",
                  borderRadius: "10px",
                  background: "#ffffff03",
                  border: "1px solid var(--line)",
                  fontSize: "10px",
                  color: "#839386",
                  lineHeight: "1.5"
                }}
              >
                <MapPin size={12} style={{ color: "var(--green)", display: "inline", marginRight: "4px" }} />
                Collection Yard: {listing.address}, {listing.city}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;

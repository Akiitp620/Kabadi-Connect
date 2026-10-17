import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Tag,
  IndianRupee,
  Package,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  MessageSquare,
  Sparkles
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export function MakeOffer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, listings, makeOffer } = useAuth();

  const listing = listings.find((l) => l.id === id);

  const [offeredPrice, setOfferedPrice] = useState(
    listing ? Math.max(1, listing.pricePerUnit - 2) : 10
  );
  const [quantity, setQuantity] = useState(
    listing ? listing.availableQuantity || 50 : 50
  );
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [successOffer, setSuccessOffer] = useState(null);

  if (!listing) {
    return (
      <div className="page">
        <div className="panel glass empty" style={{ maxWidth: "500px", margin: "60px auto" }}>
          <Package />
          <h2>Listing Not Found</h2>
          <p>The requested scrap lot could not be located to make an offer.</p>
          <Link to="/buyer/marketplace" className="btn primary">
            Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  const numOfferedPrice = Number(offeredPrice) || 0;
  const numQuantity = Number(quantity) || 0;
  const totalOfferedValue = numOfferedPrice * numQuantity;
  const listedTotal = (listing.pricePerUnit || 0) * numQuantity;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (numOfferedPrice <= 0) {
      setError("Please specify a valid offered price per unit.");
      return;
    }
    if (numQuantity <= 0 || numQuantity > listing.availableQuantity) {
      setError(`Quantity must be between 1 and ${listing.availableQuantity} ${listing.unit}.`);
      return;
    }

    const res = makeOffer({
      listingId: listing.id,
      offeredPrice: numOfferedPrice,
      quantity: numQuantity,
      message
    });

    if (res.success) {
      setSuccessOffer(res.offer);
    } else {
      setError(res.error || "Failed to submit offer.");
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
            <i /> NEGOTIATE SCRAP PURCHASE
          </span>
          <h1>Make a Purchase Offer</h1>
          <p>
            Submit a competitive bulk procurement price to the seller. Sellers usually respond within 2 to 4 business hours.
          </p>
        </div>
      </div>

      {successOffer ? (
        <div className="confirm glass" style={{ margin: "20px auto", maxWidth: "620px" }}>
          <CheckCircle size={54} style={{ color: "var(--green)", margin: "0 auto 16px" }} />
          <span className="eyebrow" style={{ justifyContent: "center" }}>
            OFFER TRANSMITTED
          </span>
          <h1 style={{ fontSize: "28px", margin: "12px 0 8px" }}>
            Offer Submitted: #{successOffer.id}
          </h1>
          <p style={{ color: "#92a295", fontSize: "12px", lineHeight: "1.7", marginBottom: "22px" }}>
            Your proposal of <b>₹{successOffer.offeredPrice}/{successOffer.unit}</b> for{" "}
            <b>{successOffer.quantity} {successOffer.unit}</b> has been sent to <b>{successOffer.sellerName}</b>.
            You can monitor their response or counter-offer in your offers tab.
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
              <span style={{ color: "#849588" }}>Total Proposed Amount:</span>
              <b style={{ color: "var(--green)", fontSize: "14px" }}>
                ₹{successOffer.totalOfferValue?.toLocaleString("en-IN")}
              </b>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#849588" }}>Seller:</span>
              <b>{successOffer.sellerName}</b>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#849588" }}>Status:</span>
              <span className="status-badge pending">Pending Decision</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <Link to="/buyer/offers" className="btn primary">
              View My Sent Offers
            </Link>
            <Link to="/buyer/marketplace" className="btn ghost">
              Browse More Lots
            </Link>
          </div>
        </div>
      ) : (
        <div className="checkout-grid">
          {/* Left: Offer Form */}
          <form onSubmit={handleSubmit} className="checkout-card glass">
            <div className="form-title">
              <i>₹</i>
              <div>
                <b>Propose Your Terms</b>
                <small>Fair bids aligned with current scrap rates have a 92% acceptance rate</small>
              </div>
            </div>

            {error && (
              <div
                className="error"
                style={{ marginBottom: "16px", display: "flex", gap: "8px", alignItems: "center" }}
              >
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <div className="form-grid">
              <div className="field">
                <span>Proposed Price per {listing.unit} (₹) *</span>
                <div className="inputbox">
                  <IndianRupee size={16} />
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    value={offeredPrice}
                    onChange={(e) => setOfferedPrice(e.target.value)}
                    required
                  />
                </div>
                <small style={{ color: "#748679", fontSize: "10px" }}>
                  Listed asking rate is ₹{listing.pricePerUnit}/{listing.unit}
                </small>
              </div>

              <div className="field">
                <span>Quantity to Procure ({listing.unit}) *</span>
                <div className="inputbox">
                  <Package size={16} />
                  <input
                    type="number"
                    min="1"
                    max={listing.availableQuantity}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                  />
                </div>
                <small style={{ color: "#748679", fontSize: "10px" }}>
                  Available in stock: {listing.availableQuantity} {listing.unit}
                </small>
              </div>

              <div className="field full">
                <span>Message or Terms to Seller</span>
                <div className="inputbox" style={{ height: "auto" }}>
                  <textarea
                    rows={3}
                    placeholder="e.g., We have a dedicated pickup vehicle in Boring Road tomorrow morning. Can pay digital UPI on spot if accepted..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <hr />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ fontSize: "10px", color: "#859789" }}>Total Proposed Deal:</span>
                <strong style={{ display: "block", font: "800 24px Manrope, sans-serif", color: "var(--green)" }}>
                  ₹{totalOfferedValue.toLocaleString("en-IN")}
                </strong>
              </div>

              <button type="submit" className="btn primary large">
                <Tag size={17} /> Send Offer to Seller
              </button>
            </div>
          </form>

          {/* Right: Lot Target Context */}
          <div className="aside-stack">
            <div className="checkout-card glass">
              <span className="eyebrow">
                <Package size={12} /> TARGET LOT
              </span>

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

              <div style={{ display: "grid", gap: "10px", fontSize: "11px", marginTop: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#8a9b8f" }}>
                  <span>Seller Asking Rate:</span>
                  <b>₹{listing.pricePerUnit} / {listing.unit}</b>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", color: "#8a9b8f" }}>
                  <span>Your Offered Rate:</span>
                  <b style={{ color: "var(--green)" }}>₹{numOfferedPrice} / {listing.unit}</b>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", color: "#8a9b8f" }}>
                  <span>Variance per Unit:</span>
                  <b style={{ color: numOfferedPrice < listing.pricePerUnit ? "#ffd080" : "var(--green)" }}>
                    {numOfferedPrice < listing.pricePerUnit
                      ? `-₹${(listing.pricePerUnit - numOfferedPrice).toFixed(1)}/unit`
                      : `+₹${(numOfferedPrice - listing.pricePerUnit).toFixed(1)}/unit`}
                  </b>
                </div>
              </div>

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
                <Sparkles size={13} style={{ color: "var(--green)", display: "inline", marginRight: "4px" }} />
                If the seller rejects or counters your proposal, you can revise the bid anytime without penalty.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MakeOffer;

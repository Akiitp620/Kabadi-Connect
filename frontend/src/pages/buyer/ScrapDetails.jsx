import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Package,
  MapPin,
  Phone,
  Bookmark,
  ArrowLeft,
  Tag,
  ShieldCheck
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export function ScrapDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { listings, savedListings, toggleSaveListing } = useAuth();

  const listing = listings.find((l) => l.id === id);

  if (!listing) {
    return (
      <div className="page">
        <div className="panel glass empty" style={{ maxWidth: "500px", margin: "60px auto" }}>
          <Package />
          <h2>Scrap Lot Not Found</h2>
          <p>The requested scrap consignment does not exist or may have been deleted.</p>
          <Link to="/buyer/marketplace" className="btn primary">
            Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  const isSaved = savedListings?.includes(listing.id);
  const isAvailable = listing.status === "Available" && (listing.availableQuantity || 0) > 0;
  const totalEstLotValue = (listing.availableQuantity || 0) * (listing.pricePerUnit || 0);

  return (
    <div className="page">
      {/* Back button */}
      <div style={{ marginBottom: "18px" }}>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="back"
          style={{ cursor: "pointer" }}
        >
          <ArrowLeft size={16} /> Back to Listings
        </button>
      </div>

      {/* Main 2-Column Hero & Details */}
      <div className="listing-hero">
        {/* Left Column: Image Gallery & Highlights */}
        <div className="listing-gallery glass">
          <div className="listing-gallery-main">
            {listing.imageUrl ? (
              <img src={listing.imageUrl} alt={listing.title} />
            ) : (
              <div className="thumb-placeholder" style={{ padding: "60px 20px" }}>
                <Package size={54} />
                <span style={{ fontSize: "14px" }}>{listing.category} Lot</span>
              </div>
            )}
          </div>
          <span
            className="thumb-badge"
            style={{ position: "absolute", top: "18px", left: "18px", fontSize: "11px" }}
          >
            {listing.category}
          </span>
          <button
            type="button"
            className={`thumb-save ${isSaved ? "saved" : ""}`}
            style={{ position: "absolute", top: "18px", right: "18px" }}
            onClick={() => toggleSaveListing(listing.id)}
            title={isSaved ? "Saved" : "Save Listing"}
          >
            <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Right Column: Title, Pricing & Procurement Actions */}
        <div className="listing-summary-box glass">
          <div className="listing-tags">
            <span className="listing-tag accent">{listing.condition || "Clean & Sorted"}</span>
            <span
              className={`status-badge ${
                isAvailable ? "available" : "unavailable"
              }`}
            >
              {isAvailable ? "Available in Stock" : "Sold Out / Reserved"}
            </span>
            <span className="listing-tag">ID: {listing.id}</span>
          </div>

          <h1 style={{ font: "800 24px/1.25 Manrope, sans-serif", margin: "10px 0 12px" }}>
            {listing.title}
          </h1>

          <p style={{ color: "#95a89b", fontSize: "12px", lineHeight: "1.7", margin: "0 0 16px" }}>
            {listing.description}
          </p>

          {/* Pricing Banner */}
          <div className="listing-price-banner">
            <div>
              <span>Official Selling Rate</span>
              <strong style={{ display: "block" }}>
                ₹{listing.pricePerUnit}
                <small style={{ fontSize: "13px", color: "#8da093" }}> / {listing.unit}</small>
              </strong>
            </div>

            <div style={{ textAlign: "right" }}>
              <span>Est. Full Lot Value</span>
              <b style={{ display: "block", fontSize: "16px", color: "#edf6ef" }}>
                ₹{totalEstLotValue.toLocaleString("en-IN")}
              </b>
            </div>
          </div>

          {/* Lot Specifications Grid */}
          <div className="listing-detail-grid">
            <div className="detail-item">
              <small>Available Stock</small>
              <strong>
                {listing.availableQuantity} {listing.unit}
              </strong>
            </div>

            <div className="detail-item">
              <small>Fulfillment Type</small>
              <strong>{listing.preference || "Doorstep Pickup"}</strong>
            </div>

            <div className="detail-item">
              <small>Location & City</small>
              <strong>{listing.city || "Patna"}</strong>
            </div>

            <div className="detail-item">
              <small>Weighing Certification</small>
              <strong style={{ color: "var(--green)" }}>Digital Scales Ready</strong>
            </div>
          </div>

          {/* Seller Snapshot Box */}
          <div className="seller-box">
            <div className="seller-avatar">
              {(listing.sellerName || "S")[0].toUpperCase()}
            </div>
            <div className="seller-details" style={{ flex: 1 }}>
              <b>{listing.sellerName}</b>
              <small>
                <MapPin size={11} style={{ display: "inline", marginRight: "3px" }} />
                {listing.address || "Industrial Area"}, {listing.city}
              </small>
              <small style={{ color: "#748579" }}>
                <Phone size={11} style={{ display: "inline", marginRight: "3px" }} />
                Verified Phone: {listing.sellerPhone}
              </small>
            </div>
          </div>

          {/* Two Main Call-to-Actions */}
          {isAvailable ? (
            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "12px", marginTop: "auto" }}>
              <Link
                to={`/buyer/checkout/${listing.id}`}
                className="btn primary large"
                style={{ justifyContent: "center" }}
              >
                <Package size={18} /> Buy Now (Full / Part)
              </Link>

              <Link
                to={`/buyer/offers/new/${listing.id}`}
                className="btn ghost large"
                style={{ justifyContent: "center" }}
              >
                <Tag size={18} /> Make an Offer
              </Link>
            </div>
          ) : (
            <div
              style={{
                padding: "16px",
                borderRadius: "12px",
                background: "#ffffff04",
                border: "1px solid var(--line)",
                textAlign: "center",
                color: "#91a093",
                fontSize: "12px"
              }}
            >
              This scrap lot has been completely sold out or marked unavailable by the seller.
            </div>
          )}
        </div>
      </div>

      {/* Safety & Quality Assurance Guarantee */}
      <div className="panel glass" style={{ marginTop: "24px" }}>
        <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
          <ShieldCheck size={28} style={{ color: "var(--green)", flexShrink: 0 }} />
          <div>
            <h3 style={{ margin: "0 0 6px", fontSize: "14px", color: "#edf6ef" }}>
              KabadiWala Buyer Guarantee
            </h3>
            <p style={{ margin: 0, fontSize: "11px", color: "#8a9b8e", lineHeight: "1.6" }}>
              All transactions on KabadiWala support physical on-site inspection. Inspect moisture content, purity grades, and supervise weight calculation before initiating settlement. Demo payments are handled securely without external fees.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScrapDetails;

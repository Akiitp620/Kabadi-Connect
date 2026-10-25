import React from "react";
import { Link } from "react-router-dom";
import {
  Bookmark,
  Package,
  MapPin
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export function BuyerSaved() {
  const { listings, savedListings, toggleSaveListing } = useAuth();

  const savedItems = listings.filter((l) => savedListings?.includes(l.id));

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <span className="eyebrow">
            <i /> CURATED PROCUREMENT WATCHLIST
          </span>
          <h1>Saved Scrap Lots</h1>
          <p>
            Monitor price movements and available quantities of bookmarked consignments before executing purchase orders.
          </p>
        </div>
        <div className="head-action">
          <Link to="/buyer/marketplace" className="btn primary">
            <Package size={16} /> Explore Marketplace
          </Link>
        </div>
      </div>

      {savedItems.length === 0 ? (
        <div className="panel glass empty">
          <Bookmark />
          <h3>No saved scrap lots</h3>
          <p>
            You haven't bookmarked any listings yet. Tap the bookmark icon on any marketplace card to save it for quick review.
          </p>
          <Link to="/buyer/marketplace" className="btn primary small">
            Browse Scrap Marketplace
          </Link>
        </div>
      ) : (
        <div className="market-grid">
          {savedItems.map((item) => {
            const isAvailable = item.status === "Available" && item.availableQuantity > 0;

            return (
              <div key={item.id} className="market-card glass">
                <div className="market-card-thumb">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.title} />
                  ) : (
                    <div className="thumb-placeholder">
                      <Package />
                      <span>{item.category}</span>
                    </div>
                  )}

                  <span className="thumb-badge">{item.category}</span>

                  <button
                    type="button"
                    className="thumb-save saved"
                    onClick={() => toggleSaveListing(item.id)}
                    title="Remove from saved"
                  >
                    <Bookmark size={16} fill="currentColor" />
                  </button>

                  <span className="thumb-qty">
                    {item.availableQuantity} {item.unit} available
                  </span>
                </div>

                <div className="market-card-body">
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span className="market-card-category">{item.condition}</span>
                    <span
                      className={`status-badge ${
                        isAvailable ? "available" : "unavailable"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <h3 className="market-card-title">{item.title}</h3>
                  <p className="market-card-desc">{item.description}</p>

                  <div className="market-card-meta">
                    <span>
                      <MapPin size={13} /> {item.city}
                    </span>
                    <span>By {item.sellerName}</span>
                  </div>

                  <div className="market-card-foot">
                    <div className="market-card-price">
                      <small>Rate</small>
                      <strong>
                        ₹{item.pricePerUnit}
                        <small>/{item.unit}</small>
                      </strong>
                    </div>

                    <div className="market-card-actions">
                      <Link to={`/buyer/listing/${item.id}`} className="btn ghost small">
                        Details
                      </Link>
                      {isAvailable ? (
                        <Link to={`/buyer/checkout/${item.id}`} className="btn primary small">
                          Buy Now
                        </Link>
                      ) : (
                        <button
                          type="button"
                          className="btn ghost small"
                          disabled
                          style={{ opacity: 0.5, cursor: "not-allowed" }}
                        >
                          Sold Out
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BuyerSaved;

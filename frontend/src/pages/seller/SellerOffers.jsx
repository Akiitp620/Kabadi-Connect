import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Tag,
  CheckCircle,
  XCircle,
  MessageSquare,
  IndianRupee,
  RotateCcw
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export function SellerOffers() {
  const { user, offers, respondToOffer } = useAuth();

  const [counteringOfferId, setCounteringOfferId] = useState(null);
  const [counterPrice, setCounterPrice] = useState("");
  const [counterNote, setCounterNote] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Offers received for listings belonging to this seller
  const sellerOffers = offers.filter(
    (o) => o.sellerId === user?.id || o.sellerName === user?.name
  );

  const filteredOffers = sellerOffers.filter((o) => {
    if (filterStatus === "All") return true;
    return o.status === filterStatus;
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const handleAccept = (offerId, buyerName) => {
    respondToOffer(offerId, "Accepted");
    showToast(`Accepted offer from ${buyerName}! You can now coordinate pickup.`);
  };

  const handleReject = (offerId, buyerName) => {
    respondToOffer(offerId, "Rejected");
    showToast(`Declined offer from ${buyerName}.`);
  };

  const handleSendCounter = (offerId) => {
    if (!counterPrice || Number(counterPrice) <= 0) {
      alert("Please enter a valid counter price per unit.");
      return;
    }
    respondToOffer(offerId, "Countered", counterPrice, counterNote);
    setCounteringOfferId(null);
    setCounterPrice("");
    setCounterNote("");
    showToast("Counter offer sent back to buyer!");
  };

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <span className="eyebrow">
            <i /> NEGOTIATIONS & DEALS
          </span>
          <h1>Buyer Offers</h1>
          <p>
            Review price proposals from bulk scrap recyclers and commercial dealers. Accept, counter, or decline bids in real time.
          </p>
        </div>
      </div>

      {toastMessage && (
        <div className="feedback-toast">
          <CheckCircle size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="toolbar" style={{ marginBottom: "20px" }}>
        <div className="tabs">
          {["All", "Pending", "Accepted", "Countered", "Rejected"].map((st) => {
            const count =
              st === "All"
                ? sellerOffers.length
                : sellerOffers.filter((o) => o.status === st).length;
            return (
              <button
                key={st}
                type="button"
                className={filterStatus === st ? "selected" : ""}
                onClick={() => setFilterStatus(st)}
              >
                {st} <i>{count}</i>
              </button>
            );
          })}
        </div>
      </div>

      {/* Offers List */}
      {filteredOffers.length === 0 ? (
        <div className="panel glass empty">
          <Tag />
          <h3>No offers in this section</h3>
          <p>
            {sellerOffers.length === 0
              ? "You haven't received any buyer proposals yet. Make sure your scrap lots are listed as 'Available'."
              : `There are currently no offers marked as '${filterStatus}'.`}
          </p>
          <Link to="/seller/listings" className="btn primary small">
            View My Listings
          </Link>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "16px" }}>
          {filteredOffers.map((offer) => {
            const isPending = offer.status === "Pending";
            const isCountered = offer.status === "Countered";
            const difference = (offer.offeredPrice || 0) - (offer.listedPrice || 0);

            return (
              <div key={offer.id} className="offer-card glass">
                <div className="offer-header">
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span className="id">{offer.id}</span>
                    <span
                      className={`status-badge ${
                        offer.status === "Accepted"
                          ? "accepted"
                          : offer.status === "Pending"
                          ? "pending"
                          : offer.status === "Countered"
                          ? "countered"
                          : "rejected"
                      }`}
                    >
                      {offer.status}
                    </span>
                    <span style={{ fontSize: "10px", color: "#77877c" }}>
                      Received {offer.date}
                    </span>
                  </div>

                  <span style={{ fontSize: "11px", color: "#8a9a8f" }}>
                    Lot: <b style={{ color: "#edf6ef" }}>{offer.listingTitle}</b>
                  </span>
                </div>

                {/* Main Offer Body */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.2fr 1fr",
                    gap: "20px",
                    alignItems: "start"
                  }}
                >
                  <div>
                    {/* Buyer Info */}
                    <div className="seller-box" style={{ margin: "6px 0 14px", padding: "10px 14px" }}>
                      <div className="seller-avatar" style={{ width: "36px", height: "36px", fontSize: "12px" }}>
                        {(offer.buyerName || "B")[0].toUpperCase()}
                      </div>
                      <div className="seller-details">
                        <b>{offer.buyerName}</b>
                        <small>Registered Bulk Recycler • Phone: {offer.buyerPhone}</small>
                      </div>
                    </div>

                    {/* Buyer Note / Message */}
                    {offer.message && (
                      <div className="offer-note">
                        <MessageSquare size={14} style={{ color: "var(--green)", display: "inline", marginRight: "6px" }} />
                        "{offer.message}"
                      </div>
                    )}

                    {/* Counter Note Display if already countered */}
                    {isCountered && offer.counterPrice && (
                      <div
                        style={{
                          padding: "10px 14px",
                          borderRadius: "10px",
                          background: "#c2a1ff14",
                          border: "1px solid #c2a1ff30",
                          fontSize: "11px",
                          color: "#dfd2f8",
                          marginTop: "8px"
                        }}
                      >
                        <b>Your Counter Offer:</b> ₹{offer.counterPrice}/{offer.unit}
                        {offer.counterNote && <p style={{ margin: "4px 0 0", color: "#c1b2dd" }}>"{offer.counterNote}"</p>}
                      </div>
                    )}
                  </div>

                  {/* Pricing Comparison Box */}
                  <div
                    style={{
                      background: "#ffffff04",
                      border: "1px solid var(--line)",
                      borderRadius: "14px",
                      padding: "14px 18px"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <span style={{ fontSize: "10px", color: "#829286" }}>Requested Quantity:</span>
                      <b style={{ fontSize: "11px" }}>{offer.quantity} {offer.unit}</b>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <span style={{ fontSize: "10px", color: "#829286" }}>Your Listed Price:</span>
                      <span style={{ fontSize: "11px", color: "#b0c2b4" }}>₹{offer.listedPrice}/{offer.unit}</span>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <span style={{ fontSize: "10px", color: "#829286" }}>Buyer's Offered Price:</span>
                      <b style={{ fontSize: "14px", color: "var(--green)" }}>
                        ₹{offer.offeredPrice}/{offer.unit}
                      </b>
                    </div>

                    <div
                      style={{
                        paddingTop: "10px",
                        borderTop: "1px solid #ffffff0a",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}
                    >
                      <span style={{ fontSize: "10px", color: "#829286" }}>Total Deal Value:</span>
                      <strong style={{ font: "800 18px Manrope, sans-serif", color: "#edf6ef" }}>
                        ₹{offer.totalOfferValue?.toLocaleString("en-IN")}
                      </strong>
                    </div>

                    <small
                      style={{
                        display: "block",
                        marginTop: "6px",
                        textAlign: "right",
                        color: difference < 0 ? "#ffd080" : "var(--green)",
                        fontSize: "9px"
                      }}
                    >
                      {difference < 0 ? `₹${Math.abs(difference)} below listed rate` : "At or above listed rate"}
                    </small>
                  </div>
                </div>

                {/* Countering Drawer */}
                {counteringOfferId === offer.id && (
                  <div className="counter-box">
                    <b style={{ fontSize: "12px", display: "block", marginBottom: "8px" }}>
                      Propose Counter Offer to {offer.buyerName}
                    </b>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr auto", gap: "10px", alignItems: "center" }}>
                      <div className="inputbox" style={{ minHeight: "38px" }}>
                        <IndianRupee size={15} />
                        <input
                          type="number"
                          placeholder={`Price / ${offer.unit}`}
                          step="0.5"
                          value={counterPrice}
                          onChange={(e) => setCounterPrice(e.target.value)}
                        />
                      </div>
                      <div className="inputbox" style={{ minHeight: "38px" }}>
                        <input
                          type="text"
                          placeholder="Optional counter note (e.g., Will accept if you pick up today)"
                          value={counterNote}
                          onChange={(e) => setCounterNote(e.target.value)}
                        />
                      </div>
                      <div style={{ display: "flex", gap: "6px" }}>
                        <button
                          type="button"
                          className="btn primary small"
                          onClick={() => handleSendCounter(offer.id)}
                        >
                          Submit Counter
                        </button>
                        <button
                          type="button"
                          className="btn ghost small"
                          onClick={() => setCounteringOfferId(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                {isPending && counteringOfferId !== offer.id && (
                  <div className="offer-actions">
                    <button
                      type="button"
                      className="btn primary small"
                      onClick={() => handleAccept(offer.id, offer.buyerName)}
                    >
                      <CheckCircle size={14} /> Accept Offer (₹{offer.offeredPrice}/{offer.unit})
                    </button>
                    <button
                      type="button"
                      className="btn ghost small"
                      onClick={() => {
                        setCounteringOfferId(offer.id);
                        setCounterPrice(offer.listedPrice);
                      }}
                    >
                      <RotateCcw size={14} /> Counter Offer
                    </button>
                    <button
                      type="button"
                      className="btn ghost small"
                      style={{ color: "#f38b8b" }}
                      onClick={() => handleReject(offer.id, offer.buyerName)}
                    >
                      <XCircle size={14} /> Decline
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SellerOffers;

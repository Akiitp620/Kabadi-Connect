import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tag } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export function BuyerOffers() {
  const { user, offers } = useAuth();
  const [filterStatus, setFilterStatus] = useState("All");

  // Offers placed by this logged-in buyer
  const buyerOffers = offers.filter(
    (o) => o.buyerId === user?.id || o.buyerName === user?.name
  );

  const filteredOffers = buyerOffers.filter((o) => {
    if (filterStatus === "All") return true;
    return o.status === filterStatus;
  });

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <span className="eyebrow">
            <i /> OUTGOING NEGOTIATION PROPOSALS
          </span>
          <h1>My Sent Offers</h1>
          <p>
            Track purchase bids sent to sellers. If a seller counters your rate, review and proceed to checkout with the negotiated terms.
          </p>
        </div>
        <div className="head-action">
          <Link to="/buyer/marketplace" className="btn primary">
            <Tag size={16} /> Explore Marketplace
          </Link>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="toolbar" style={{ marginBottom: "20px" }}>
        <div className="tabs">
          {["All", "Pending", "Accepted", "Countered", "Rejected"].map((st) => {
            const count =
              st === "All"
                ? buyerOffers.length
                : buyerOffers.filter((o) => o.status === st).length;
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

      {/* Offers Cards */}
      {filteredOffers.length === 0 ? (
        <div className="panel glass empty">
          <Tag />
          <h3>No offers found</h3>
          <p>
            {buyerOffers.length === 0
              ? "You haven't submitted any offers yet. When you make a price proposal on any scrap lot, it will appear here."
              : `You don't have any offers with status '${filterStatus}'.`}
          </p>
          <Link to="/buyer/marketplace" className="btn primary small">
            Browse Marketplace
          </Link>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "16px" }}>
          {filteredOffers.map((offer) => {
            const isCountered = offer.status === "Countered";
            const isAccepted = offer.status === "Accepted";
            const isPending = offer.status === "Pending";

            return (
              <div key={offer.id} className="offer-card glass">
                <div className="offer-header">
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span className="id">{offer.id}</span>
                    <span
                      className={`status-badge ${
                        isAccepted
                          ? "accepted"
                          : isPending
                          ? "pending"
                          : isCountered
                          ? "countered"
                          : "rejected"
                      }`}
                    >
                      {offer.status}
                    </span>
                    <span style={{ fontSize: "10px", color: "#77877c" }}>
                      Sent on {offer.date}
                    </span>
                  </div>

                  <span style={{ fontSize: "11px", color: "#8a9a8f" }}>
                    Seller: <b style={{ color: "#edf6ef" }}>{offer.sellerName}</b>
                  </span>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.3fr 1fr",
                    gap: "20px",
                    alignItems: "start"
                  }}
                >
                  <div>
                    <h3 style={{ margin: "0 0 6px", fontSize: "15px", color: "#edf6ef" }}>
                      {offer.listingTitle}
                    </h3>
                    <p style={{ margin: "0 0 10px", fontSize: "11px", color: "#8da093" }}>
                      Quantity Proposed: <b>{offer.quantity} {offer.unit}</b>
                    </p>

                    {offer.message && (
                      <div className="offer-note">
                        <b>Your Note:</b> "{offer.message}"
                      </div>
                    )}

                    {/* Counter Offer Box */}
                    {isCountered && (
                      <div
                        style={{
                          padding: "12px 16px",
                          borderRadius: "12px",
                          background: "#c2a1ff14",
                          border: "1px solid #c2a1ff35",
                          marginTop: "12px"
                        }}
                      >
                        <b style={{ color: "#d6c2fa", fontSize: "12px", display: "block" }}>
                          Seller Counter Offer: ₹{offer.counterPrice}/{offer.unit}
                        </b>
                        {offer.counterNote && (
                          <p style={{ margin: "4px 0 0", color: "#c3b1e3", fontSize: "11px" }}>
                            Seller Note: "{offer.counterNote}"
                          </p>
                        )}
                        <div style={{ marginTop: "10px" }}>
                          <Link
                            to={`/buyer/checkout/${offer.listingId}?price=${offer.counterPrice}&quantity=${offer.quantity}&offerId=${offer.id}`}
                            className="btn primary small"
                          >
                            Accept Counter & Checkout (₹{offer.counterPrice}/{offer.unit})
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Price Box */}
                  <div
                    style={{
                      background: "#ffffff04",
                      border: "1px solid var(--line)",
                      borderRadius: "14px",
                      padding: "14px 18px"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <span style={{ fontSize: "10px", color: "#829286" }}>Original List Price:</span>
                      <span style={{ fontSize: "11px", color: "#b0c2b4" }}>₹{offer.listedPrice}/{offer.unit}</span>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <span style={{ fontSize: "10px", color: "#829286" }}>Your Offered Price:</span>
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
                      <span style={{ fontSize: "10px", color: "#829286" }}>Total Offer Value:</span>
                      <strong style={{ font: "800 18px Manrope, sans-serif", color: "#edf6ef" }}>
                        ₹{offer.totalOfferValue?.toLocaleString("en-IN")}
                      </strong>
                    </div>

                    {isAccepted && (
                      <div style={{ marginTop: "12px" }}>
                        <Link
                          to={`/buyer/checkout/${offer.listingId}?price=${offer.offeredPrice}&quantity=${offer.quantity}&offerId=${offer.id}`}
                          className="btn primary full small"
                        >
                          Proceed to Order Fulfillment (₹{offer.offeredPrice}/{offer.unit})
                        </Link>
                      </div>
                    )}
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

export default BuyerOffers;

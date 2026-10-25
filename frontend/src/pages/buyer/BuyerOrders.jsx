import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Calendar,
  MapPin,
  Phone,
  CheckCircle,
  XCircle
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export function BuyerOrders() {
  const { user, orders, updateOrderStatus } = useAuth();
  const [filterStatus, setFilterStatus] = useState("All");
  const [toastMessage, setToastMessage] = useState("");

  // Orders placed by this logged in buyer
  const buyerOrders = orders.filter(
    (o) => o.buyerId === user?.id || o.buyerName === user?.name
  );

  const filteredOrders = buyerOrders.filter((ord) => {
    if (filterStatus === "All") return true;
    return ord.status === filterStatus;
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const handleCancelOrder = (orderId) => {
    if (window.confirm(`Are you sure you want to cancel order #${orderId}?`)) {
      updateOrderStatus(orderId, "Cancelled");
      showToast(`Order #${orderId} was cancelled.`);
    }
  };

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <span className="eyebrow">
            <i /> PROCUREMENT TRACKING
          </span>
          <h1>My Purchase Orders</h1>
          <p>
            Track your scheduled consignments, seller warehouse locations, pickup slots, and on-site settlement status.
          </p>
        </div>
        <div className="head-action">
          <Link to="/buyer/marketplace" className="btn primary">
            <Package size={16} /> Procure More Scrap
          </Link>
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
          {["All", "Pending", "Accepted", "Ready for pickup", "Completed", "Cancelled"].map(
            (status) => {
              const count =
                status === "All"
                  ? buyerOrders.length
                  : buyerOrders.filter((o) => o.status === status).length;
              return (
                <button
                  key={status}
                  type="button"
                  className={filterStatus === status ? "selected" : ""}
                  onClick={() => setFilterStatus(status)}
                >
                  {status} <i>{count}</i>
                </button>
              );
            }
          )}
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="panel glass empty">
          <Package />
          <h3>No purchase orders found</h3>
          <p>
            {buyerOrders.length === 0
              ? "You haven't placed any scrap orders yet. Browse our marketplace to purchase verified scrap lots."
              : `No purchase orders found with status '${filterStatus}'.`}
          </p>
          <Link to="/buyer/marketplace" className="btn primary small">
            Browse Marketplace
          </Link>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "16px" }}>
          {filteredOrders.map((ord) => {
            const isPending = ord.status === "Pending";
            const isAccepted = ord.status === "Accepted";
            const isReady = ord.status === "Ready for pickup";
            const isCompleted = ord.status === "Completed";
            const isCancelled = ord.status === "Cancelled";

            return (
              <div key={ord.id} className="panel glass" style={{ padding: "22px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "12px",
                    borderBottom: "1px solid #ffffff0a",
                    paddingBottom: "14px",
                    marginBottom: "16px"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span className="id" style={{ fontSize: "13px" }}>
                      {ord.id}
                    </span>
                    <span
                      className={`status-badge ${
                        isCompleted
                          ? "completed"
                          : isAccepted
                          ? "accepted"
                          : isPending
                          ? "pending"
                          : isReady
                          ? "available"
                          : "cancelled"
                      }`}
                    >
                      {ord.status}
                    </span>
                    <span style={{ fontSize: "10px", color: "#849488" }}>
                      Ordered: {ord.date}
                    </span>
                  </div>

                  <div style={{ fontSize: "13px" }}>
                    Amount:{" "}
                    <b style={{ color: "var(--green)", fontSize: "16px" }}>
                      ₹{ord.totalAmount?.toLocaleString("en-IN")}
                    </b>{" "}
                    <small style={{ color: "#77887b", fontSize: "10px" }}>({ord.paymentStatus})</small>
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.4fr 1fr",
                    gap: "24px",
                    alignItems: "start"
                  }}
                >
                  {/* Left: Material & Seller Info */}
                  <div>
                    <h3 style={{ margin: "0 0 6px", fontSize: "15px", color: "#edf6ef" }}>
                      {ord.listingTitle}
                    </h3>
                    <p style={{ margin: "0 0 14px", fontSize: "11px", color: "#8fa093" }}>
                      Category: <b>{ord.category}</b> • Purchased:{" "}
                      <b>
                        {ord.quantity} {ord.unit}
                      </b>{" "}
                      @ ₹{ord.pricePerUnit}/{ord.unit}
                    </p>

                    <div className="seller-box" style={{ margin: "10px 0", padding: "12px 14px" }}>
                      <div className="seller-avatar" style={{ width: "36px", height: "36px", fontSize: "12px" }}>
                        {(ord.sellerName || "S")[0].toUpperCase()}
                      </div>
                      <div className="seller-details">
                        <b>Seller: {ord.sellerName}</b>
                        <small>
                          <Phone size={11} style={{ display: "inline", marginRight: "4px" }} />
                          {ord.sellerPhone || "+91 98765 11111"}
                        </small>
                      </div>
                    </div>
                  </div>

                  {/* Right: Pickup Slot & Collection Address */}
                  <div
                    style={{
                      background: "#ffffff03",
                      borderRadius: "14px",
                      padding: "14px",
                      border: "1px solid var(--line)"
                    }}
                  >
                    <div style={{ display: "flex", gap: "8px", marginBottom: "10px", fontSize: "11px" }}>
                      <Calendar size={15} style={{ color: "var(--green)", flexShrink: 0 }} />
                      <div>
                        <b style={{ color: "#edf6ef", display: "block" }}>Scheduled Pickup Slot:</b>
                        <span style={{ color: "#8a9a8f", fontSize: "10px" }}>{ord.pickupSlot}</span>
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "8px", fontSize: "11px" }}>
                      <MapPin size={15} style={{ color: "var(--green)", flexShrink: 0 }} />
                      <div>
                        <b style={{ color: "#edf6ef", display: "block" }}>Seller Yard Location:</b>
                        <span style={{ color: "#8a9a8f", fontSize: "10px" }}>{ord.pickupAddress}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cancel Action if Pending */}
                {isPending && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "16px",
                      paddingTop: "12px",
                      borderTop: "1px solid #ffffff0a"
                    }}
                  >
                    <button
                      type="button"
                      className="btn ghost small"
                      style={{ color: "#f38b8b" }}
                      onClick={() => handleCancelOrder(ord.id)}
                    >
                      <XCircle size={14} /> Cancel Order
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

export default BuyerOrders;

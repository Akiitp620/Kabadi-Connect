import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Truck,
  Package,
  CheckCircle,
  XCircle,
  MapPin,
  Calendar,
  Phone
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export function SellerOrders() {
  const { user, orders, updateOrderStatus } = useAuth();

  const [filterStatus, setFilterStatus] = useState("All");
  const [toastMessage, setToastMessage] = useState("");

  // Orders for this seller
  const sellerOrders = orders.filter(
    (o) => o.sellerId === user?.id || o.sellerName === user?.name
  );

  const filteredOrders = sellerOrders.filter((ord) => {
    if (filterStatus === "All") return true;
    return ord.status === filterStatus;
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    showToast(`Order #${orderId} status updated to "${newStatus}"`);
  };

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <span className="eyebrow">
            <i /> ORDER FULFILLMENT WORKSPACE
          </span>
          <h1>Seller Orders</h1>
          <p>
            Process orders received from registered recyclers. Confirm pickup availability, coordinate weighing, and complete transactions.
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
          {["All", "Pending", "Accepted", "Ready for pickup", "Completed", "Cancelled"].map(
            (status) => {
              const count =
                status === "All"
                  ? sellerOrders.length
                  : sellerOrders.filter((o) => o.status === status).length;
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
          <Truck />
          <h3>No orders found</h3>
          <p>
            {sellerOrders.length === 0
              ? "You have not received any buyer orders yet. As soon as a dealer buys your scrap lot, the order will appear here."
              : `There are no orders matching status '${filterStatus}'.`}
          </p>
          <Link to="/seller/listings" className="btn primary small">
            Check My Listings
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
                      Placed: {ord.date}
                    </span>
                  </div>

                  <div style={{ fontSize: "13px" }}>
                    Total Value:{" "}
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
                  {/* Item and Buyer Details */}
                  <div>
                    <h3 style={{ margin: "0 0 6px", fontSize: "15px", color: "#edf6ef" }}>
                      {ord.listingTitle}
                    </h3>
                    <p style={{ margin: "0 0 14px", fontSize: "11px", color: "#8fa093" }}>
                      Category: <b>{ord.category}</b> • Order Quantity:{" "}
                      <b>
                        {ord.quantity} {ord.unit}
                      </b>{" "}
                      @ ₹{ord.pricePerUnit}/{ord.unit}
                    </p>

                    <div className="seller-box" style={{ margin: "10px 0", padding: "12px 14px" }}>
                      <div className="seller-avatar" style={{ width: "36px", height: "36px", fontSize: "12px" }}>
                        {(ord.buyerName || "B")[0].toUpperCase()}
                      </div>
                      <div className="seller-details">
                        <b>Buyer: {ord.buyerName}</b>
                        <small>
                          <Phone size={11} style={{ display: "inline", marginRight: "4px" }} />
                          {ord.buyerPhone}
                        </small>
                      </div>
                    </div>

                    {ord.notes && (
                      <p
                        style={{
                          fontSize: "11px",
                          color: "#9db0a1",
                          background: "#ffffff04",
                          padding: "8px 12px",
                          borderRadius: "8px",
                          margin: "8px 0 0"
                        }}
                      >
                        <b>Buyer Instructions:</b> "{ord.notes}"
                      </p>
                    )}
                  </div>

                  {/* Pickup & Slot Info */}
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
                        <b style={{ color: "#edf6ef", display: "block" }}>Collection Address:</b>
                        <span style={{ color: "#8a9a8f", fontSize: "10px" }}>{ord.pickupAddress}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Update Actions */}
                {!isCompleted && !isCancelled && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "12px",
                      marginTop: "18px",
                      paddingTop: "14px",
                      borderTop: "1px solid #ffffff0a",
                      flexWrap: "wrap"
                    }}
                  >
                    <span style={{ fontSize: "11px", color: "#839387" }}>
                      Update order lifecycle status:
                    </span>

                    <div style={{ display: "flex", gap: "8px" }}>
                      {isPending && (
                        <>
                          <button
                            type="button"
                            className="btn primary small"
                            onClick={() => handleStatusChange(ord.id, "Accepted")}
                          >
                            <CheckCircle size={14} /> Accept Order
                          </button>
                          <button
                            type="button"
                            className="btn ghost small"
                            style={{ color: "#f38b8b" }}
                            onClick={() => handleStatusChange(ord.id, "Cancelled")}
                          >
                            <XCircle size={14} /> Decline Order
                          </button>
                        </>
                      )}

                      {isAccepted && (
                        <>
                          <button
                            type="button"
                            className="btn primary small"
                            onClick={() => handleStatusChange(ord.id, "Ready for pickup")}
                          >
                            <Package size={14} /> Mark Ready for Pickup
                          </button>
                          <button
                            type="button"
                            className="btn ghost small"
                            onClick={() => handleStatusChange(ord.id, "Completed")}
                          >
                            <CheckCircle size={14} /> Mark Completed
                          </button>
                        </>
                      )}

                      {isReady && (
                        <button
                          type="button"
                          className="btn primary small"
                          onClick={() => handleStatusChange(ord.id, "Completed")}
                        >
                          <CheckCircle size={14} /> Confirm Pickup & Completed
                        </button>
                      )}
                    </div>
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

export default SellerOrders;

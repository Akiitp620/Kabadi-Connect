import React from "react";
import { Link } from "react-router-dom";
import {
  Package,
  PlusCircle,
  Truck,
  Tag,
  IndianRupee,
  Clock,
  ArrowUpRight,
  ChevronRight
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export function SellerDashboard() {
  const { user, listings, orders, offers } = useAuth();

  // Filter items belonging to this logged in seller
  const sellerListings = listings.filter(
    (l) => l.sellerId === user?.id || l.sellerName === user?.name
  );

  const sellerOrders = orders.filter(
    (o) => o.sellerId === user?.id || o.sellerName === user?.name
  );

  const sellerOffers = offers.filter(
    (o) => o.sellerId === user?.id || o.sellerName === user?.name
  );

  // Computed metrics
  const activeListings = sellerListings.filter((l) => l.status === "Available").length;
  const pendingOrders = sellerOrders.filter((o) => o.status === "Pending").length;
  const acceptedOrders = sellerOrders.filter((o) => o.status === "Accepted" || o.status === "Ready for pickup").length;
  const completedOrders = sellerOrders.filter((o) => o.status === "Completed");
  const totalSalesValue = completedOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const pendingOffersCount = sellerOffers.filter((o) => o.status === "Pending").length;

  const recentOrders = sellerOrders.slice(0, 4);
  const recentListings = sellerListings.slice(0, 4);

  return (
    <div className="page">
      {/* Page Header */}
      <div className="page-head">
        <div>
          <span className="eyebrow">
            <i /> SELLER CONTROL CENTER
          </span>
          <h1>Welcome, {user?.name || "Seller"}</h1>
          <p>
            Monitor real-time scrap listings, respond to bulk dealer offers, and fulfill pickup orders across {user?.city || "your region"}.
          </p>
        </div>
        <div className="head-action" style={{ display: "flex", gap: "10px" }}>
          <Link to="/seller/add-scrap" className="btn primary">
            <PlusCircle size={16} /> List Scrap for Sale
          </Link>
          <Link to="/seller/listings" className="btn ghost">
            Manage Listings
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="stats">
        <div className="stat glass">
          <div className="stat-icon">
            <Package size={20} />
          </div>
          <span className="stat-label">ACTIVE LISTINGS</span>
          <strong>{activeListings}</strong>
          <small>
            <b>{sellerListings.length}</b> total scrap lots created
          </small>
        </div>

        <div className="stat glass">
          <div className="stat-icon amber">
            <Clock size={20} />
          </div>
          <span className="stat-label">PENDING ORDERS</span>
          <strong>{pendingOrders}</strong>
          <small>
            <b>{pendingOffersCount}</b> pending dealer offers
          </small>
        </div>

        <div className="stat glass">
          <div className="stat-icon blue">
            <Truck size={20} />
          </div>
          <span className="stat-label">ACCEPTED & READY</span>
          <strong>{acceptedOrders}</strong>
          <small>Awaiting buyer pickup</small>
        </div>

        <div className="stat glass">
          <div className="stat-icon">
            <IndianRupee size={20} />
          </div>
          <span className="stat-label">TOTAL SALES VALUE</span>
          <strong>₹{totalSalesValue.toLocaleString("en-IN")}</strong>
          <small>
            <b>{completedOrders.length}</b> completed transactions
          </small>
        </div>
      </div>

      {/* Quick Action Alerts */}
      {(pendingOrders > 0 || pendingOffersCount > 0) && (
        <div className="rate-notice" style={{ marginBottom: "22px" }}>
          <Tag size={20} />
          <div style={{ flex: 1 }}>
            <b>Action Required: You have pending requests!</b>
            <small>
              {pendingOrders > 0 && `${pendingOrders} order(s) waiting for acceptance. `}
              {pendingOffersCount > 0 && `${pendingOffersCount} purchase offer(s) from registered buyers waiting for response.`}
            </small>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            {pendingOrders > 0 && (
              <Link to="/seller/orders" className="btn primary small">
                Review Orders
              </Link>
            )}
            {pendingOffersCount > 0 && (
              <Link to="/seller/offers" className="btn ghost small">
                Review Offers
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Two-Column Workspace Layout */}
      <div className="dash-grid">
        {/* Left Column: Recent Orders */}
        <div className="panel glass">
          <div className="section-head">
            <div>
              <h2>Recent Buyer Orders</h2>
              <p>Direct purchase orders placed by registered recyclers and scrap dealers</p>
            </div>
            <Link to="/seller/orders" className="text-link">
              View all orders <ArrowUpRight size={14} />
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="empty">
              <Truck />
              <h3>No buyer orders yet</h3>
              <p>When buyers purchase your listed scrap lots, their orders will appear here immediately.</p>
              <Link to="/seller/add-scrap" className="btn primary small">
                Add a New Listing
              </Link>
            </div>
          ) : (
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Scrap Item</th>
                    <th>Buyer</th>
                    <th>Quantity</th>
                    <th>Total (₹)</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((ord) => (
                    <tr key={ord.id}>
                      <td className="id">{ord.id}</td>
                      <td>
                        <div className="material">
                          <i>
                            <Package size={15} />
                          </i>
                          <span>
                            <b>{ord.listingTitle}</b>
                            <small>{ord.category}</small>
                          </span>
                        </div>
                      </td>
                      <td>
                        <b>{ord.buyerName}</b>
                        <br />
                        <small style={{ color: "#77877b" }}>{ord.buyerPhone}</small>
                      </td>
                      <td>
                        {ord.quantity} {ord.unit}
                      </td>
                      <td>
                        <b style={{ color: "var(--green)" }}>
                          ₹{ord.totalAmount?.toLocaleString("en-IN")}
                        </b>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            ord.status === "Completed"
                              ? "completed"
                              : ord.status === "Accepted"
                              ? "confirmed"
                              : ord.status === "Pending"
                              ? "requested"
                              : "cancelled"
                          }`}
                        >
                          <i /> {ord.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right Column: Quick Status & Recent Listings */}
        <div className="aside-stack">
          {/* Quick Actions Panel */}
          <div className="panel glass">
            <div className="section-head">
              <h2>Quick Actions</h2>
            </div>
            <div style={{ display: "grid", gap: "10px" }}>
              <Link
                to="/seller/add-scrap"
                className="btn primary full"
                style={{ justifyContent: "flex-start" }}
              >
                <PlusCircle size={17} /> List New Scrap Lot
              </Link>
              <Link
                to="/seller/listings"
                className="btn ghost full"
                style={{ justifyContent: "flex-start" }}
              >
                <Package size={17} /> View & Edit My Listings
              </Link>
              <Link
                to="/seller/offers"
                className="btn ghost full"
                style={{ justifyContent: "flex-start" }}
              >
                <Tag size={17} /> Manage Buyer Offers ({pendingOffersCount})
              </Link>
              <Link
                to="/rates"
                className="btn ghost full"
                style={{ justifyContent: "flex-start" }}
              >
                <IndianRupee size={17} /> Check Indicative Mandi Rates
              </Link>
            </div>
          </div>

          {/* Active Listings Preview */}
          <div className="panel glass">
            <div className="section-head">
              <div>
                <h2>My Recent Listings</h2>
                <p>Status of scrap posted to the buyer marketplace</p>
              </div>
              <Link to="/seller/listings" className="text-link">
                All ({sellerListings.length}) <ChevronRight size={14} />
              </Link>
            </div>

            {recentListings.length === 0 ? (
              <p style={{ fontSize: "11px", color: "#839388" }}>
                You have not posted any scrap lots yet. Click "List New Scrap Lot" above to create your first listing.
              </p>
            ) : (
              <div style={{ display: "grid", gap: "10px" }}>
                {recentListings.map((lst) => (
                  <div
                    key={lst.id}
                    style={{
                      padding: "12px",
                      borderRadius: "12px",
                      background: "#ffffff04",
                      border: "1px solid var(--line)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "10px"
                    }}
                  >
                    <div style={{ minWidth: 0 }}>
                      <b
                        style={{
                          display: "block",
                          fontSize: "11px",
                          color: "#edf6ef",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap"
                        }}
                      >
                        {lst.title}
                      </b>
                      <small style={{ color: "#819186", fontSize: "9px" }}>
                        {lst.availableQuantity} {lst.unit} left • ₹{lst.pricePerUnit}/{lst.unit}
                      </small>
                    </div>
                    <span
                      className={`status-badge ${
                        lst.status === "Available" ? "available" : "unavailable"
                      }`}
                    >
                      {lst.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;

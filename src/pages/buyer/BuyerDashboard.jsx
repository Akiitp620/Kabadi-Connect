import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Store,
  Package,
  Tag,
  Bookmark,
  IndianRupee,
  Search,
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Sparkles
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export function BuyerDashboard() {
  const { user, listings, orders, offers, savedListings, toggleSaveListing } = useAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  // Buyer metrics
  const availableListings = listings.filter((l) => l.status === "Available");
  const myOrders = orders.filter((o) => o.buyerId === user?.id || o.buyerName === user?.name);
  const myOffers = offers.filter((o) => o.buyerId === user?.id || o.buyerName === user?.name);

  const activeOrdersCount = myOrders.filter(
    (o) => o.status !== "Completed" && o.status !== "Cancelled"
  ).length;
  const pendingOffersCount = myOffers.filter((o) => o.status === "Pending").length;
  const completedPurchasesCount = myOrders.filter((o) => o.status === "Completed").length;

  const recentListings = availableListings.slice(0, 4);
  const recentOrders = myOrders.slice(0, 3);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/buyer/marketplace?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/buyer/marketplace");
    }
  };

  return (
    <div className="page">
      {/* Page Header */}
      <div className="page-head">
        <div>
          <span className="eyebrow">
            <i /> BUYER PROCUREMENT PORTAL
          </span>
          <h1>Welcome, {user?.name || "Vikram Recyclers"}</h1>
          <p>
            Source verified industrial, commercial, and household scrap lots directly from sellers with certified scale verification.
          </p>
        </div>
        <div className="head-action" style={{ display: "flex", gap: "10px" }}>
          <Link to="/buyer/marketplace" className="btn primary">
            <Store size={16} /> Explore Marketplace
          </Link>
          <Link to="/buyer/orders" className="btn ghost">
            My Orders
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="stats">
        <div className="stat glass">
          <div className="stat-icon">
            <Store size={20} />
          </div>
          <span className="stat-label">AVAILABLE SCRAP LOTS</span>
          <strong>{availableListings.length}</strong>
          <small>
            <b>{listings.length}</b> total listings indexed
          </small>
        </div>

        <div className="stat glass">
          <div className="stat-icon amber">
            <Package size={20} />
          </div>
          <span className="stat-label">ACTIVE ORDERS</span>
          <strong>{activeOrdersCount}</strong>
          <small>In pickup or awaiting dispatch</small>
        </div>

        <div className="stat glass">
          <div className="stat-icon purple">
            <Tag size={20} />
          </div>
          <span className="stat-label">PENDING OFFERS</span>
          <strong>{pendingOffersCount}</strong>
          <small>Bids awaiting seller decision</small>
        </div>

        <div className="stat glass">
          <div className="stat-icon blue">
            <Bookmark size={20} />
          </div>
          <span className="stat-label">SAVED LOTS</span>
          <strong>{savedListings?.length || 0}</strong>
          <small>Bookmarked for procurement</small>
        </div>
      </div>

      {/* Search & Quick Category Shortcuts Bar */}
      <div className="market-filter-bar glass" style={{ marginBottom: "26px" }}>
        <form onSubmit={handleSearchSubmit} style={{ display: "flex", gap: "10px", flex: 1, minWidth: "280px" }}>
          <div className="market-search" style={{ flex: 1 }}>
            <Search size={16} />
            <input
              type="text"
              placeholder="Search materials (e.g. Copper wire, Cardboard, Steel, PET bottles)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button type="submit" className="btn primary small">
            Search
          </button>
        </form>

        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontSize: "10px", color: "#819185", fontWeight: 700 }}>Quick:</span>
          {["Cardboard", "Copper", "Steel", "Plastic", "E-waste"].map((cat) => (
            <Link
              key={cat}
              to={`/buyer/marketplace?category=${cat}`}
              className="listing-tag accent"
              style={{ textDecoration: "none" }}
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Available Listings Grid */}
      <div style={{ marginBottom: "32px" }}>
        <div className="section-head">
          <div>
            <h2>Fresh Scrap Consignments</h2>
            <p>Recently listed bulk materials available for immediate procurement</p>
          </div>
          <Link to="/buyer/marketplace" className="text-link">
            View all ({availableListings.length}) <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="market-grid">
          {recentListings.map((item) => {
            const isSaved = savedListings?.includes(item.id);

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
                    className={`thumb-save ${isSaved ? "saved" : ""}`}
                    onClick={() => toggleSaveListing(item.id)}
                    aria-label="Save listing"
                    title={isSaved ? "Remove from saved" : "Save lot"}
                  >
                    <Bookmark size={16} fill={isSaved ? "currentColor" : "none"} />
                  </button>
                  <span className="thumb-qty">
                    {item.availableQuantity} {item.unit} available
                  </span>
                </div>

                <div className="market-card-body">
                  <span className="market-card-category">{item.condition}</span>
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
                      <Link to={`/buyer/checkout/${item.id}`} className="btn primary small">
                        Buy Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two-Column: My Recent Orders & Quick Rates */}
      <div className="dash-grid">
        <div className="panel glass">
          <div className="section-head">
            <div>
              <h2>My Recent Purchase Orders</h2>
              <p>Status of your ongoing and completed scrap pickups</p>
            </div>
            <Link to="/buyer/orders" className="text-link">
              All Orders <ArrowRight size={14} />
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="empty">
              <Package />
              <h3>No purchases made yet</h3>
              <p>Browse our verified scrap lots and place your first buy order or make an offer.</p>
              <Link to="/buyer/marketplace" className="btn primary small">
                Explore Marketplace
              </Link>
            </div>
          ) : (
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Order Ref</th>
                    <th>Scrap Lot</th>
                    <th>Seller</th>
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
                        <b>{ord.listingTitle}</b>
                        <small style={{ display: "block", color: "#748679" }}>{ord.category}</small>
                      </td>
                      <td>
                        <b>{ord.sellerName}</b>
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

        {/* Quick Shortcuts Aside */}
        <div className="aside-stack">
          <div className="aside-card glass">
            <span className="eyebrow">
              <Sparkles size={12} /> BUYER ADVANTAGE
            </span>
            <h3 style={{ fontSize: "16px", marginTop: "10px" }}>Certified Weighing & Escrow</h3>
            <p>
              All listed lots are backed by digital weight slip verification at seller facilities. Payment is released upon physical confirmation.
            </p>
            <div style={{ marginTop: "16px", display: "grid", gap: "8px" }}>
              <Link to="/buyer/marketplace" className="btn primary full">
                <Store size={16} /> Browse All Scrap Lots
              </Link>
              <Link to="/buyer/offers" className="btn ghost full">
                <Tag size={16} /> Track My Offers ({pendingOffersCount})
              </Link>
              <Link to="/buyer/saved" className="btn ghost full">
                <Bookmark size={16} /> Saved Lots ({savedListings?.length || 0})
              </Link>
              <Link to="/buyer/rates" className="btn ghost full">
                <IndianRupee size={16} /> Today's Mandi Scrap Rates
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyerDashboard;

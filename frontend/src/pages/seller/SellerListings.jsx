import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  PlusCircle,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Search,
  CheckCircle,
  X
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export function SellerListings() {
  const { user, listings, updateListing, deleteListing, toggleListingStatus } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [editingItem, setEditingItem] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  // Filter listings by logged in seller
  const sellerListings = listings.filter(
    (l) => l.sellerId === user?.id || l.sellerName === user?.name
  );

  const filteredListings = sellerListings.filter((l) => {
    const matchesSearch =
      l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = filterCategory === "All" || l.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  const categories = ["All", ...new Set(sellerListings.map((l) => l.category))];

  const handleToggle = (id, currentStatus) => {
    toggleListingStatus(id);
    const next = currentStatus === "Available" ? "Unavailable" : "Available";
    showToast(`Listing marked as ${next}`);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete listing "${title}"?`)) {
      deleteListing(id);
      showToast("Listing deleted successfully");
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingItem) return;

    const qty = Number(editingItem.availableQuantity);
    updateListing(editingItem.id, {
      title: editingItem.title,
      pricePerUnit: Number(editingItem.pricePerUnit),
      availableQuantity: qty,
      status: qty === 0 ? "Sold Out" : (editingItem.status === "Sold Out" ? "Available" : editingItem.status),
      description: editingItem.description,
      condition: editingItem.condition
    });

    setEditingItem(null);
    showToast("Listing updated successfully");
  };

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <span className="eyebrow">
            <i /> INVENTORY & CATALOG
          </span>
          <h1>My Scrap Listings</h1>
          <p>
            Manage your scrap inventory, toggle marketplace availability, update pricing, and audit available stock.
          </p>
        </div>
        <div className="head-action">
          <Link to="/seller/add-scrap" className="btn primary">
            <PlusCircle size={16} /> Add Scrap Lot
          </Link>
        </div>
      </div>

      {toastMessage && (
        <div className="feedback-toast">
          <CheckCircle size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Filter Toolbar */}
      <div className="market-filter-bar glass">
        <div className="filter-group">
          <div className="market-search">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search by scrap title or material..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="market-select"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                Category: {c}
              </option>
            ))}
          </select>
        </div>

        <div style={{ fontSize: "11px", color: "#8ca092" }}>
          Showing <b>{filteredListings.length}</b> of <b>{sellerListings.length}</b> lots
        </div>
      </div>

      {/* Listings Table / Cards */}
      {filteredListings.length === 0 ? (
        <div className="panel glass empty">
          <Package />
          <h3>No listings found</h3>
          <p>
            {sellerListings.length === 0
              ? "You haven't listed any scrap lots yet. Add your first scrap lot to start receiving buyer orders!"
              : "No scrap lots match your current search or category filter."}
          </p>
          <Link to="/seller/add-scrap" className="btn primary small">
            <PlusCircle size={15} /> Create First Listing
          </Link>
        </div>
      ) : (
        <div className="panel glass" style={{ padding: "0" }}>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th style={{ paddingLeft: "20px" }}>Scrap Lot</th>
                  <th>Category</th>
                  <th>Quantity Left</th>
                  <th>Unit Price</th>
                  <th>Est. Value</th>
                  <th>Status</th>
                  <th>Location</th>
                  <th style={{ textAlign: "right", paddingRight: "20px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredListings.map((item) => {
                  const isAvailable = item.status === "Available";
                  const totalEst = (item.availableQuantity || 0) * (item.pricePerUnit || 0);

                  return (
                    <tr key={item.id}>
                      <td style={{ paddingLeft: "20px" }}>
                        <div className="material">
                          <i>
                            <Package size={17} />
                          </i>
                          <div>
                            <b>{item.title}</b>
                            <small>{item.condition || "Sorted"} • Added {item.createdAt}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="listing-tag accent" style={{ margin: 0 }}>
                          {item.category}
                        </span>
                      </td>
                      <td>
                        <b style={{ color: item.availableQuantity === 0 ? "#f38b8b" : "#edf6ef" }}>
                          {item.availableQuantity} {item.unit}
                        </b>
                        {item.quantity !== item.availableQuantity && (
                          <small style={{ display: "block", color: "#748579", fontSize: "9px" }}>
                            orig. {item.quantity} {item.unit}
                          </small>
                        )}
                      </td>
                      <td>
                        <b style={{ color: "var(--green)" }}>
                          ₹{item.pricePerUnit}
                        </b>
                        <small style={{ color: "#7e9083" }}>/{item.unit}</small>
                      </td>
                      <td>
                        <b>₹{totalEst.toLocaleString("en-IN")}</b>
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleToggle(item.id, item.status)}
                          className={`status-badge ${
                            item.status === "Available"
                              ? "available"
                              : item.status === "Sold Out"
                              ? "sold"
                              : "unavailable"
                          }`}
                          style={{ cursor: "pointer", border: "1px solid currentColor" }}
                          title="Click to toggle availability"
                        >
                          {isAvailable ? <Eye size={12} /> : <EyeOff size={12} />}
                          {item.status}
                        </button>
                      </td>
                      <td>
                        <small style={{ color: "#8d9e92" }}>{item.city}</small>
                      </td>
                      <td style={{ textAlign: "right", paddingRight: "20px" }}>
                        <div style={{ display: "inline-flex", gap: "6px" }}>
                          <button
                            type="button"
                            className="btn ghost small"
                            onClick={() => setEditingItem(item)}
                            title="Edit Price & Quantity"
                            style={{ padding: "6px 9px" }}
                          >
                            <Edit2 size={14} /> Edit
                          </button>
                          <button
                            type="button"
                            className="btn ghost small"
                            onClick={() => handleDelete(item.id, item.title)}
                            title="Delete Listing"
                            style={{ padding: "6px 9px", color: "#f38b8b" }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Listing Modal */}
      {editingItem && (
        <div
          className="scrim"
          style={{ display: "grid", placeItems: "center", zIndex: 100 }}
          onClick={() => setEditingItem(null)}
        >
          <div
            className="panel glass"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "90%",
              maxWidth: "520px",
              padding: "26px",
              borderRadius: "20px",
              boxShadow: "0 25px 60px #0009"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "18px"
              }}
            >
              <h3 style={{ margin: 0, font: "800 18px Manrope, sans-serif" }}>
                Edit Scrap Listing
              </h3>
              <button
                type="button"
                className="close-menu"
                style={{ display: "grid" }}
                onClick={() => setEditingItem(null)}
              >
                <X size={17} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} style={{ display: "grid", gap: "14px" }}>
              <div className="field">
                <span>Listing Title</span>
                <div className="inputbox">
                  <input
                    type="text"
                    value={editingItem.title}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, title: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div className="field">
                  <span>Price per {editingItem.unit} (₹)</span>
                  <div className="inputbox">
                    <input
                      type="number"
                      min="1"
                      step="0.5"
                      value={editingItem.pricePerUnit}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, pricePerUnit: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="field">
                  <span>Available Quantity ({editingItem.unit})</span>
                  <div className="inputbox">
                    <input
                      type="number"
                      min="0"
                      value={editingItem.availableQuantity}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, availableQuantity: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="field">
                <span>Condition</span>
                <div className="inputbox">
                  <select
                    value={editingItem.condition}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, condition: e.target.value })
                    }
                  >
                    <option value="Clean & Sorted">Clean & Sorted</option>
                    <option value="Industrial Grade">Industrial Grade</option>
                    <option value="Mixed Scrap">Mixed Scrap</option>
                    <option value="Intact E-waste">Intact E-waste</option>
                  </select>
                </div>
              </div>

              <div className="field">
                <span>Description</span>
                <div className="inputbox" style={{ height: "auto" }}>
                  <textarea
                    rows={2}
                    value={editingItem.description}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, description: e.target.value })
                    }
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "flex-end",
                  marginTop: "10px"
                }}
              >
                <button
                  type="button"
                  className="btn ghost"
                  onClick={() => setEditingItem(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default SellerListings;

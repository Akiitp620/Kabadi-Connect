import React, { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Search,
  MapPin,
  IndianRupee,
  Package,
  Bookmark,
  RotateCcw
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { SCRAP_CATEGORIES } from "../../utils/demoAuth";

export function BrowseMarketplace() {
  const { listings, savedListings, toggleSaveListing } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  // Query params initial states
  const initialCategory = searchParams.get("category") || "All";
  const initialSearch = searchParams.get("search") || "";

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedCity, setSelectedCity] = useState("All");
  const [priceSort, setPriceSort] = useState("newest"); // newest, price-asc, price-desc
  const [maxPrice, setMaxPrice] = useState("");

  // Extract unique cities
  const cities = useMemo(() => {
    const list = listings.map((l) => l.city).filter(Boolean);
    return ["All", ...new Set(list)];
  }, [listings]);

  // Filtered and sorted listings
  const filteredListings = useMemo(() => {
    return listings
      .filter((item) => {
        // Keyword match
        const matchesQuery =
          !searchTerm.trim() ||
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase());

        // Category filter
        const matchesCat =
          selectedCategory === "All" || item.category === selectedCategory;

        // City filter
        const matchesCity =
          selectedCity === "All" || item.city === selectedCity;

        // Max price filter
        const matchesPrice =
          !maxPrice || Number(item.pricePerUnit) <= Number(maxPrice);

        return matchesQuery && matchesCat && matchesCity && matchesPrice;
      })
      .sort((a, b) => {
        if (priceSort === "price-asc") {
          return a.pricePerUnit - b.pricePerUnit;
        }
        if (priceSort === "price-desc") {
          return b.pricePerUnit - a.pricePerUnit;
        }
        // default newest
        return b.id.localeCompare(a.id);
      });
  }, [listings, searchTerm, selectedCategory, selectedCity, maxPrice, priceSort]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedCity("All");
    setPriceSort("newest");
    setMaxPrice("");
    setSearchParams({});
  };

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <span className="eyebrow">
            <i /> REAL-TIME B2B SCRAP TRADING
          </span>
          <h1>Browse Marketplace</h1>
          <p>
            Explore verified bulk scrap lots posted directly by certified sellers, factories, and commercial collection centers.
          </p>
        </div>
      </div>

      {/* Main Filter & Search Control Bar */}
      <div className="market-filter-bar glass">
        <div className="filter-group">
          {/* Keyword Search */}
          <div className="market-search">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search by title, scrap type, or material grade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Dropdown */}
          <select
            className="market-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            {SCRAP_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Location Dropdown */}
          <select
            className="market-select"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city === "All" ? "All Locations" : city}
              </option>
            ))}
          </select>

          {/* Max Price Input */}
          <div className="market-search" style={{ minWidth: "130px", flex: "none" }}>
            <IndianRupee size={15} />
            <input
              type="number"
              placeholder="Max ₹/unit"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>

          {/* Sorting */}
          <select
            className="market-select"
            value={priceSort}
            onChange={(e) => setPriceSort(e.target.value)}
          >
            <option value="newest">Sort: Newest Listings</option>
            <option value="price-asc">Sort: Price (Low to High)</option>
            <option value="price-desc">Sort: Price (High to Low)</option>
          </select>

          {(searchTerm || selectedCategory !== "All" || selectedCity !== "All" || maxPrice) && (
            <button
              type="button"
              className="btn ghost small"
              onClick={handleResetFilters}
              title="Reset all filters"
            >
              <RotateCcw size={14} /> Clear
            </button>
          )}
        </div>

        <div style={{ fontSize: "11px", color: "#859789" }}>
          Showing <b>{filteredListings.length}</b> scrap lot{filteredListings.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Category Pills Navigation */}
      <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "14px", marginBottom: "16px" }}>
        <button
          type="button"
          onClick={() => setSelectedCategory("All")}
          className={`listing-tag ${selectedCategory === "All" ? "accent" : ""}`}
          style={{ cursor: "pointer", padding: "6px 12px" }}
        >
          All Categories
        </button>
        {SCRAP_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`listing-tag ${selectedCategory === cat ? "accent" : ""}`}
            style={{ cursor: "pointer", padding: "6px 12px", whiteSpace: "nowrap" }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Marketplace Product Cards Grid */}
      {filteredListings.length === 0 ? (
        <div className="panel glass empty">
          <Package />
          <h3>No matching scrap listings found</h3>
          <p>
            Try adjusting your search query, increasing maximum price filter, or clearing selected categories.
          </p>
          <button type="button" className="btn primary small" onClick={handleResetFilters}>
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="market-grid">
          {filteredListings.map((item) => {
            const isSaved = savedListings?.includes(item.id);
            const isAvailable = item.status === "Available";
            const isSoldOut = item.availableQuantity <= 0 || item.status === "Sold Out";

            return (
              <div key={item.id} className="market-card glass">
                {/* Card Thumbnail */}
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
                    aria-label="Bookmark listing"
                    title={isSaved ? "Remove from saved" : "Bookmark this lot"}
                  >
                    <Bookmark size={16} fill={isSaved ? "currentColor" : "none"} />
                  </button>

                  <span
                    className="thumb-qty"
                    style={{
                      background: isSoldOut ? "#f38b8b22" : "#080d0bcc",
                      color: isSoldOut ? "#f38b8b" : "var(--green)"
                    }}
                  >
                    {isSoldOut ? "Sold Out" : `${item.availableQuantity} ${item.unit} available`}
                  </span>
                </div>

                {/* Card Body */}
                <div className="market-card-body">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <span className="market-card-category">{item.condition}</span>
                    <span
                      className={`status-badge ${
                        isAvailable && !isSoldOut ? "available" : "unavailable"
                      }`}
                    >
                      {isSoldOut ? "Sold Out" : item.status}
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

                  {/* Card Footer: Price & Direct Actions */}
                  <div className="market-card-foot">
                    <div className="market-card-price">
                      <small>Price</small>
                      <strong>
                        ₹{item.pricePerUnit}
                        <small>/{item.unit}</small>
                      </strong>
                    </div>

                    <div className="market-card-actions">
                      <Link to={`/buyer/listing/${item.id}`} className="btn ghost small">
                        Details
                      </Link>

                      {isAvailable && !isSoldOut ? (
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

export default BrowseMarketplace;

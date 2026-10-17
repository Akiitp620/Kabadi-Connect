import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  PlusCircle,
  Package,
  Upload,
  CheckCircle,
  MapPin,
  Building,
  IndianRupee,
  Sparkles,
  Info
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { SCRAP_CATEGORIES } from "../../utils/demoAuth";

// Curated realistic demo scrap photos for quick selection
const SAMPLE_SCRAP_PHOTOS = [
  {
    name: "Cardboard Bales",
    url: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Copper Wires",
    url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Steel & Rebars",
    url: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Plastic Flakes & Bottles",
    url: "https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Newspaper Bundles",
    url: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "E-waste Motherboards",
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80"
  }
];

export function AddScrap() {
  const { user, addListing } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    category: "Cardboard",
    description: "",
    quantity: "",
    unit: "kg",
    pricePerUnit: "",
    imageUrl: SAMPLE_SCRAP_PHOTOS[0].url,
    address: user?.address || "Plot 42, Industrial Area, Boring Road",
    city: user?.city || "Patna",
    condition: "Clean & Sorted",
    preference: "Doorstep Pickup by Buyer"
  });

  const [errors, setErrors] = useState({});
  const [successListing, setSuccessListing] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSelectSampleImage = (url) => {
    setFormData((prev) => ({ ...prev, imageUrl: url }));
  };

  const handleCustomImage = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Please enter a descriptive scrap title";
    if (!formData.description.trim()) newErrors.description = "Please describe the scrap materials";
    if (!formData.quantity || Number(formData.quantity) <= 0) {
      newErrors.quantity = "Please enter a valid positive quantity";
    }
    if (!formData.pricePerUnit || Number(formData.pricePerUnit) <= 0) {
      newErrors.pricePerUnit = "Please enter an expected price per unit";
    }
    if (!formData.address.trim()) newErrors.address = "Pickup address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newListing = addListing({
      title: formData.title,
      category: formData.category,
      description: formData.description,
      quantity: Number(formData.quantity),
      unit: formData.unit,
      pricePerUnit: Number(formData.pricePerUnit),
      imageUrl: formData.imageUrl,
      address: formData.address,
      city: formData.city,
      condition: formData.condition,
      preference: formData.preference
    });

    setSuccessListing(newListing);
  };

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <span className="eyebrow">
            <i /> NEW MARKETPLACE LISTING
          </span>
          <h1>List Scrap for Sale</h1>
          <p>
            Publish your scrap lot directly to verified recyclers and scrap dealers across the KabadiWala B2B network.
          </p>
        </div>
        <div className="head-action">
          <Link to="/seller/listings" className="btn ghost">
            View My Listings
          </Link>
        </div>
      </div>

      {successListing && (
        <div className="feedback-toast" style={{ marginBottom: "24px", padding: "16px 20px" }}>
          <CheckCircle size={22} style={{ color: "var(--green)" }} />
          <div style={{ flex: 1 }}>
            <b style={{ color: "#edf6ef", fontSize: "13px" }}>
              Listing published successfully!
            </b>
            <div style={{ color: "#a5c4ab", fontSize: "11px", marginTop: "4px" }}>
              "{successListing.title}" is now live in the Buyer Marketplace ({successListing.availableQuantity} {successListing.unit} @ ₹{successListing.pricePerUnit}/{successListing.unit}).
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Link to="/seller/listings" className="btn primary small">
              My Listings
            </Link>
            <button
              type="button"
              className="btn ghost small"
              onClick={() => {
                setSuccessListing(null);
                setFormData({
                  title: "",
                  category: "Cardboard",
                  description: "",
                  quantity: "",
                  unit: "kg",
                  pricePerUnit: "",
                  imageUrl: SAMPLE_SCRAP_PHOTOS[0].url,
                  address: user?.address || "Plot 42, Industrial Area, Boring Road",
                  city: user?.city || "Patna",
                  condition: "Clean & Sorted",
                  preference: "Doorstep Pickup by Buyer"
                });
              }}
            >
              List Another
            </button>
          </div>
        </div>
      )}

      <div className="booking-layout">
        {/* Form Container */}
        <form onSubmit={handleSubmit} className="booking-form glass">
          <div className="form-title">
            <i>1</i>
            <div>
              <b>Scrap Lot Specifications</b>
              <small>Provide accurate lot titles, category, and grading</small>
            </div>
          </div>

          <div className="form-grid">
            <div className="field full">
              <span>Scrap Title *</span>
              <div className="inputbox">
                <Package size={17} />
                <input
                  type="text"
                  name="title"
                  placeholder="e.g., Heavy Corrugated Cardboard Boxes (Baled, 500 kg)"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              {errors.title && <small style={{ color: "#ffaaaa", fontSize: "10px" }}>{errors.title}</small>}
            </div>

            <div className="field">
              <span>Category *</span>
              <div className="inputbox">
                <select name="category" value={formData.category} onChange={handleChange}>
                  {SCRAP_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="field">
              <span>Condition & Grading *</span>
              <div className="inputbox">
                <select name="condition" value={formData.condition} onChange={handleChange}>
                  <option value="Clean & Sorted">Clean & Sorted (Standard Grade)</option>
                  <option value="Industrial Grade">Industrial Grade (Heavy / Commercial)</option>
                  <option value="Mixed Scrap">Mixed Scrap (Needs Sorting)</option>
                  <option value="Intact E-waste">Intact E-waste (Safe Storage)</option>
                  <option value="Dry Pulp">Dry Pulp / Paper</option>
                </select>
              </div>
            </div>

            <div className="field full">
              <span>Material Description *</span>
              <div className="inputbox" style={{ height: "auto" }}>
                <textarea
                  name="description"
                  rows={3}
                  placeholder="Mention packaging, moisture level, contamination notes, and loading assistance..."
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              {errors.description && <small style={{ color: "#ffaaaa", fontSize: "10px" }}>{errors.description}</small>}
            </div>
          </div>

          <hr />

          <div className="form-title">
            <i>2</i>
            <div>
              <b>Quantity & Expected Pricing</b>
              <small>Set fair wholesale rates based on current mandi scrap trends</small>
            </div>
          </div>

          <div className="form-grid">
            <div className="field">
              <span>Total Available Quantity *</span>
              <div className="inputbox">
                <input
                  type="number"
                  name="quantity"
                  placeholder="e.g., 250"
                  min="1"
                  value={formData.quantity}
                  onChange={handleChange}
                />
              </div>
              {errors.quantity && <small style={{ color: "#ffaaaa", fontSize: "10px" }}>{errors.quantity}</small>}
            </div>

            <div className="field">
              <span>Unit of Measurement *</span>
              <div className="inputbox">
                <select name="unit" value={formData.unit} onChange={handleChange}>
                  <option value="kg">Kilogram (kg)</option>
                  <option value="quintal">Quintal (100 kg)</option>
                  <option value="ton">Metric Ton (1,000 kg)</option>
                  <option value="piece">Piece (Pcs)</option>
                  <option value="lot">Complete Lot</option>
                </select>
              </div>
            </div>

            <div className="field">
              <span>Expected Price per {formData.unit} (₹) *</span>
              <div className="inputbox">
                <IndianRupee size={17} />
                <input
                  type="number"
                  name="pricePerUnit"
                  placeholder="e.g., 18"
                  min="0.5"
                  step="0.5"
                  value={formData.pricePerUnit}
                  onChange={handleChange}
                />
              </div>
              {errors.pricePerUnit && <small style={{ color: "#ffaaaa", fontSize: "10px" }}>{errors.pricePerUnit}</small>}
            </div>

            <div className="field">
              <span>Est. Total Lot Value</span>
              <div
                className="inputbox"
                style={{
                  background: "#b7f66a0a",
                  borderColor: "#b7f66a33",
                  color: "var(--green)",
                  fontWeight: "700"
                }}
              >
                ₹
                {formData.quantity && formData.pricePerUnit
                  ? (Number(formData.quantity) * Number(formData.pricePerUnit)).toLocaleString("en-IN")
                  : "0"}
              </div>
            </div>
          </div>

          <hr />

          <div className="form-title">
            <i>3</i>
            <div>
              <b>Location & Fulfillment Preference</b>
              <small>Where the buyer will collect the materials</small>
            </div>
          </div>

          <div className="form-grid">
            <div className="field">
              <span>City *</span>
              <div className="inputbox">
                <Building size={17} />
                <input
                  type="text"
                  name="city"
                  placeholder="e.g., Patna"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              {errors.city && <small style={{ color: "#ffaaaa", fontSize: "10px" }}>{errors.city}</small>}
            </div>

            <div className="field">
              <span>Fulfillment Preference *</span>
              <div className="inputbox">
                <select name="preference" value={formData.preference} onChange={handleChange}>
                  <option value="Doorstep Pickup by Buyer">Doorstep Pickup by Buyer (Recommended)</option>
                  <option value="Seller Will Deliver">Seller Will Deliver to Buyer Warehouse</option>
                  <option value="Flexible / Negotiable">Flexible / Open to Discussion</option>
                </select>
              </div>
            </div>

            <div className="field full">
              <span>Pickup Address / Warehouse Landmark *</span>
              <div className="inputbox">
                <MapPin size={17} />
                <input
                  type="text"
                  name="address"
                  placeholder="e.g., Shed 4, Transport Nagar Industrial Area, Bypass Road"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              {errors.address && <small style={{ color: "#ffaaaa", fontSize: "10px" }}>{errors.address}</small>}
            </div>
          </div>

          <hr />

          <div className="form-title">
            <i>4</i>
            <div>
              <b>Scrap Photo & Preview</b>
              <small>Upload your own picture or pick from verified scrap presets</small>
            </div>
          </div>

          {/* Preset image selection */}
          <div style={{ marginBottom: "16px" }}>
            <span style={{ fontSize: "10px", color: "#87988c", display: "block", marginBottom: "8px" }}>
              Quick Preset Photos:
            </span>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(65px, 1fr))", gap: "8px" }}>
              {SAMPLE_SCRAP_PHOTOS.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectSampleImage(sample.url)}
                  style={{
                    position: "relative",
                    height: "60px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    border: formData.imageUrl === sample.url ? "2px solid var(--green)" : "1px solid #ffffff15",
                    padding: 0,
                    cursor: "pointer"
                  }}
                  title={sample.name}
                >
                  <img src={sample.url} alt={sample.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <label className="btn ghost small" style={{ cursor: "pointer" }}>
              <Upload size={14} /> Upload Custom Image
              <input type="file" accept="image/*" onChange={handleCustomImage} style={{ display: "none" }} />
            </label>
            <span style={{ fontSize: "10px", color: "#748679" }}>PNG, JPG or WEBP up to 5MB</span>
          </div>

          <div className="booking-footer">
            <span>
              <Info size={16} />
              Listings appear instantly to verified buyers. Buyer contact details will be shared upon checkout or offer acceptance.
            </span>
            <button type="submit" className="btn primary large">
              <PlusCircle size={18} /> Publish Scrap Listing
            </button>
          </div>
        </form>

        {/* Live Preview Aside Card */}
        <div className="aside-stack">
          <div className="aside-card glass">
            <span className="eyebrow">
              <Sparkles size={12} /> LIVE BUYER PREVIEW
            </span>
            <h3 style={{ fontSize: "16px", marginTop: "10px" }}>How Buyers Will See This</h3>
            <p>Your listing will be formatted as an interactive marketplace card with instant buy and offer actions.</p>

            <div
              className="market-card glass"
              style={{ marginTop: "16px", borderColor: "var(--line)" }}
            >
              <div className="market-card-thumb" style={{ height: "140px" }}>
                {formData.imageUrl ? (
                  <img src={formData.imageUrl} alt="Preview" />
                ) : (
                  <div className="thumb-placeholder">
                    <Package />
                    <span>{formData.category}</span>
                  </div>
                )}
                <span className="thumb-badge">{formData.category}</span>
                <span className="thumb-qty">
                  {formData.quantity || "0"} {formData.unit} Available
                </span>
              </div>
              <div className="market-card-body">
                <span className="market-card-category">{formData.condition}</span>
                <h4 style={{ margin: "0 0 6px", fontSize: "13px", color: "#edf6ef" }}>
                  {formData.title || "Scrap Listing Title"}
                </h4>
                <div className="market-card-meta" style={{ padding: "8px 0", fontSize: "9px" }}>
                  <span>
                    <MapPin size={12} /> {formData.city || "Patna"}
                  </span>
                  <span>{user?.name || "Sunil Sharma"}</span>
                </div>
                <div className="market-card-foot" style={{ marginTop: "10px" }}>
                  <div className="market-card-price">
                    <small>Price</small>
                    <strong style={{ fontSize: "17px" }}>
                      ₹{formData.pricePerUnit || "0"}
                      <small>/{formData.unit}</small>
                    </strong>
                  </div>
                  <span className="btn primary small" style={{ pointerEvents: "none" }}>
                    Buy Now
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="panel glass">
            <div className="section-head" style={{ marginBottom: "10px" }}>
              <h2>Pricing Tips for Sellers</h2>
            </div>
            <p style={{ fontSize: "11px", color: "#8a9b8e", lineHeight: "1.6" }}>
              • Cardboard bales typically trade at ₹12 - ₹15/kg for loads above 300 kg.
              <br />
              • Clean stripped copper commands ₹620 - ₹660/kg in the Patna-Bihar belt.
              <br />
              • Doorstep collection by buyer helps you close deals within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddScrap;

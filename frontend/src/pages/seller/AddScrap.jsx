import React, { useEffect, useRef, useState } from "react";
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
  Info,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { SCRAP_CATEGORIES } from "../../utils/demoAuth";
import { addscrap } from "../../api/seller.api";

export function AddScrap() {
  const { user } = useAuth();

  const chooseImg = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    quantity: "",
    unit: "",
    price: "",
    address: user?.address || "",
    city: user?.city || "",
    condition: "Clean & Sorted",
    preference: "Doorstep Pickup by Buyer",
  });

  const [errors, setErrors] = useState({});
  const [successListing, setSuccessListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Create a local preview whenever a new image is selected.
  useEffect(() => {
    if (!selectedImage) {
      setPreview("");
      return;
    }

    const imageUrl = URL.createObjectURL(selectedImage);
    setPreview(imageUrl);

    // Clean up the previous preview URL.
    return () => URL.revokeObjectURL(imageUrl);
  }, [selectedImage]);

  // Handle text fields and dropdowns.
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Handle real image uploads.
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setSubmitError("");

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        image: "Please select a valid image file.",
      }));
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        image: "Image size must be 5 MB or less.",
      }));
      e.target.value = "";
      return;
    }

    setSelectedImage(file);
    setErrors((prev) => ({
      ...prev,
      image: "",
    }));
  };

  const removeImage = () => {
    setSelectedImage(null);

    if (chooseImg.current) {
      chooseImg.current.value = "";
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Please enter a descriptive scrap title";
    }

    if (!formData.category) {
      newErrors.category = "Please select a scrap category";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Please describe the scrap materials";
    }

    if (!formData.quantity || Number(formData.quantity) <= 0) {
      newErrors.quantity = "Please enter a valid positive quantity";
    }

    if (
      formData.price === "" ||
      Number(formData.price) <= 0
    ) {
      newErrors.price = "Please enter an expected price per unit";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Pickup address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!selectedImage) {
      newErrors.image = "Please upload a scrap image";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      description: "",
      quantity: "",
      unit: "kg",
      price: "",
      address: user?.address || "",
      city: user?.city || "",
      condition: "Clean & Sorted",
      preference: "Doorstep Pickup by Buyer",
    });

    setSelectedImage(null);
    setErrors({});
    setSubmitError("");

    if (chooseImg.current) {
      chooseImg.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitError("");
    setSuccessListing(null);

    if (!validate()) return;

    try {
      setLoading(true);

      // FormData is required to send the actual image file.
      const payload = new FormData();

      payload.append("title", formData.title.trim());
      payload.append("category", formData.category);
      payload.append("description", formData.description.trim());
      payload.append("quantity", String(Number(formData.quantity)));
      payload.append("unit", formData.unit);
      payload.append(
        "price",
        String(Number(formData.price))
      );
      payload.append("address", formData.address.trim());
      payload.append("city", formData.city.trim());
      payload.append("condition", formData.condition);
      payload.append("preference", formData.preference);

      // IMPORTANT: this name must match upload.single("image")
      // in your backend route.
      payload.append("image", selectedImage);

      const response = await addscrap(payload);

      // Support common API response formats.
      const responseData = response?.data ?? response;
      const listing =
        responseData?.listing ??
        responseData?.data?.listing ??
        responseData?.data ??
        responseData;

      setSuccessListing({
        ...listing,
        title: listing?.title || formData.title,
        availableQuantity:
          listing?.availableQuantity ??
          listing?.quantity ??
          Number(formData.quantity),
        unit: listing?.unit || formData.unit,
        price:
          listing?.price?? Number(formData.price),
      });

      resetForm();
    } catch (err) {
      setSubmitError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          "Unable to publish the listing. Please try again."
      );
    } finally {
      setLoading(false);
    }
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
            Publish your scrap lot directly to verified recyclers and scrap
            dealers across the KabadiWala B2B network.
          </p>
        </div>

        <div className="head-action">
          <Link to="/seller/listings" className="btn ghost">
            View My Listings
          </Link>
        </div>
      </div>

      {submitError && (
        <div
          role="alert"
          className="feedback-toast"
          style={{ marginBottom: "24px", padding: "16px 20px", color: "#ffaaaa" }}
        >
          {submitError}
        </div>
      )}

      {successListing && (
        <div
          className="feedback-toast"
          style={{ marginBottom: "24px", padding: "16px 20px" }}
        >
          <CheckCircle size={22} style={{ color: "var(--green)" }} />

          <div style={{ flex: 1 }}>
            <b style={{ color: "#edf6ef", fontSize: "13px" }}>
              Listing published successfully!
            </b>

            <div
              style={{
                color: "#a5c4ab",
                fontSize: "11px",
                marginTop: "4px",
              }}
            >
              "{successListing.title}" is now live in the Buyer Marketplace (
              {successListing.availableQuantity} {successListing.unit} @ ₹
              {successListing.price}/{successListing.unit}).
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <Link to="/seller/listings" className="btn primary small">
              My Listings
            </Link>

            <button
              type="button"
              className="btn ghost small"
              onClick={() => setSuccessListing(null)}
            >
              Close
            </button>

            <button
              type="button"
              className="btn ghost small"
              onClick={() => setSuccessListing(null)}
            >
              List Another
            </button>
          </div>
        </div>
      )}

      <div className="booking-layout">
        <form onSubmit={handleSubmit} className="booking-form glass">
          <div className="form-title">
            <i>1</i>
            <div>
              <b>Scrap Lot Specifications</b>
              <small>
                Provide accurate lot titles, category, and grading
              </small>
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
              {errors.title && (
                <small style={{ color: "#ffaaaa", fontSize: "10px" }}>
                  {errors.title}
                </small>
              )}
            </div>

            <div className="field">
              <span>Category *</span>
              <div className="inputbox">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Select category</option>
                  {SCRAP_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              {errors.category && (
                <small style={{ color: "#ffaaaa", fontSize: "10px" }}>
                  {errors.category}
                </small>
              )}
            </div>

            <div className="field">
              <span>Condition & Grading *</span>
              <div className="inputbox">
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                >
                  <option value="Clean & Sorted">
                    Clean & Sorted (Standard Grade)
                  </option>
                  <option value="Industrial Grade">
                    Industrial Grade (Heavy / Commercial)
                  </option>
                  <option value="Mixed Scrap">
                    Mixed Scrap (Needs Sorting)
                  </option>
                  <option value="Intact E-waste">
                    Intact E-waste (Safe Storage)
                  </option>
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
              {errors.description && (
                <small style={{ color: "#ffaaaa", fontSize: "10px" }}>
                  {errors.description}
                </small>
              )}
            </div>
          </div>

          <hr />

          <div className="form-title">
            <i>2</i>
            <div>
              <b>Quantity & Expected Pricing</b>
              <small>
                Set fair wholesale rates based on current mandi scrap trends
              </small>
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
                  min="0.01"
                  step="any"
                  value={formData.quantity}
                  onChange={handleChange}
                />
              </div>
              {errors.quantity && (
                <small style={{ color: "#ffaaaa", fontSize: "10px" }}>
                  {errors.quantity}
                </small>
              )}
            </div>

            <div className="field">
              <span>Unit of Measurement *</span>
              <div className="inputbox">
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                >
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
                  name="price"
                  placeholder="e.g., 18"
                  min="0.01"
                  step="any"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
              {errors.price && (
                <small style={{ color: "#ffaaaa", fontSize: "10px" }}>
                  {errors.price}
                </small>
              )}
            </div>

            <div className="field">
              <span>Est. Total Lot Value</span>
              <div
                className="inputbox"
                style={{
                  background: "#b7f66a0a",
                  borderColor: "#b7f66a33",
                  color: "var(--green)",
                  fontWeight: "700",
                }}
              >
                ₹
                {formData.quantity && formData.price
                  ? (
                      Number(formData.quantity) *
                      Number(formData.price)
                    ).toLocaleString("en-IN")
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
              {errors.city && (
                <small style={{ color: "#ffaaaa", fontSize: "10px" }}>
                  {errors.city}
                </small>
              )}
            </div>

            <div className="field">
              <span>Fulfillment Preference *</span>
              <div className="inputbox">
                <select
                  name="preference"
                  value={formData.preference}
                  onChange={handleChange}
                >
                  <option value="Doorstep Pickup by Buyer">
                    Doorstep Pickup by Buyer (Recommended)
                  </option>
                  <option value="Seller Will Deliver">
                    Seller Will Deliver to Buyer Warehouse
                  </option>
                  <option value="Flexible / Negotiable">
                    Flexible / Open to Discussion
                  </option>
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
              {errors.address && (
                <small style={{ color: "#ffaaaa", fontSize: "10px" }}>
                  {errors.address}
                </small>
              )}
            </div>
          </div>

          <hr />

          <div className="form-title">
            <i>4</i>
            <div>
              <b>Scrap Photo & Preview</b>
              <small>Upload a real picture of your scrap</small>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
            <button
              type="button"
              className="btn ghost small"
              onClick={() => chooseImg.current?.click()}
            >
              <Upload size={14} /> Upload Custom Image
            </button>

            <input
              ref={chooseImg}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />

            <span style={{ fontSize: "10px", color: "#748679" }}>
              PNG, JPG or WEBP up to 5MB
            </span>
          </div>

          {errors.image && (
            <small style={{ display: "block", color: "#ffaaaa", fontSize: "10px", marginTop: "8px" }}>
              {errors.image}
            </small>
          )}

          {preview && (
            <div style={{ marginTop: "16px" }}>
              <img
                src={preview}
                alt="Selected scrap"
                style={{
                  width: "100%",
                  maxWidth: "320px",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  border: "1px solid #ffffff20",
                }}
              />

              <div style={{ marginTop: "8px", fontSize: "11px", color: "#a5c4ab" }}>
                {selectedImage?.name}
              </div>

              <button
                type="button"
                className="btn ghost small"
                style={{ marginTop: "8px" }}
                onClick={removeImage}
              >
                Remove image
              </button>
            </div>
          )}

          <div className="booking-footer">
            <span>
              <Info size={16} />
              Listings appear instantly to verified buyers. Buyer contact
              details will be shared upon checkout or offer acceptance.
            </span>

            <button
              type="submit"
              className="btn primary large"
              disabled={loading}
            >
              <PlusCircle size={18} />
              {loading ? "Publishing..." : "Publish Scrap Listing"}
            </button>
          </div>
        </form>

        {/* Live Buyer Preview */}
        <div className="aside-stack">
          <div className="aside-card glass">
            <span className="eyebrow">
              <Sparkles size={12} /> LIVE BUYER PREVIEW
            </span>

            <h3 style={{ fontSize: "16px", marginTop: "10px" }}>
              How Buyers Will See This
            </h3>

            <p>
              Your listing will be formatted as an interactive marketplace
              card with instant buy and offer actions.
            </p>

            <div
              className="market-card glass"
              style={{ marginTop: "16px", borderColor: "var(--line)" }}
            >
              <div className="market-card-thumb" style={{ height: "140px" }}>
                {preview ? (
                  <img
                    src={preview}
                    alt="Scrap preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div className="thumb-placeholder">
                    <Package />
                    <span>{formData.category || "Scrap Category"}</span>
                  </div>
                )}

                <span className="thumb-badge">
                  {formData.category || "Category"}
                </span>

                <span className="thumb-qty">
                  {formData.quantity || "0"} {formData.unit} Available
                </span>
              </div>

              <div className="market-card-body">
                <span className="market-card-category">
                  {formData.condition || "Condition"}
                </span>

                <h4
                  style={{
                    margin: "0 0 6px",
                    fontSize: "13px",
                    color: "#edf6ef",
                  }}
                >
                  {formData.title || "Scrap Listing Title"}
                </h4>

                <div
                  className="market-card-meta"
                  style={{ padding: "8px 0", fontSize: "9px" }}
                >
                  <span>
                    <MapPin size={12} /> {formData.city || "City"}
                  </span>
                  <span>{user?.name || "Seller"}</span>
                </div>

                <div className="market-card-foot" style={{ marginTop: "10px" }}>
                  <div className="market-card-price">
                    <small>Price</small>
                    <strong style={{ fontSize: "17px" }}>
                      ₹{formData.price || "0"}
                      <small>/{formData.unit}</small>
                    </strong>
                  </div>

                  <span
                    className="btn primary small"
                    style={{ pointerEvents: "none" }}
                  >
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
              • Cardboard bales typically trade at ₹12 - ₹15/kg for loads
              above 300 kg.
              <br />
              • Clean stripped copper commands ₹620 - ₹660/kg in the
              Patna-Bihar belt.
              <br />
              • Doorstep collection by buyer helps you close deals within
              24 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddScrap;

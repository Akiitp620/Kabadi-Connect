import React, { useState } from "react";
import {
  User,
  Building,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Save,
  ShieldCheck,
  FileText
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export function SellerProfile() {
  const { user, updateUserProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    businessName: user?.businessName || "",
    city: user?.city || "Patna",
    address: user?.address || "",
    gstin: user?.gstin || "10AAAAA0000A1Z5",
    description: user?.description || "Wholesale supplier of industrial scrap and sorted corrugated material."
  });

  const [toastMessage, setToastMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile({
      name: formData.name,
      phone: formData.phone,
      businessName: formData.businessName,
      city: formData.city,
      address: formData.address,
      gstin: formData.gstin,
      description: formData.description
    });

    setToastMessage("Seller profile details updated successfully!");
    setTimeout(() => setToastMessage(""), 3500);
  };

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <span className="eyebrow">
            <i /> ACCOUNT & BUSINESS DETAILS
          </span>
          <h1>Seller Profile</h1>
          <p>
            Keep your business credentials, contact phone, and collection warehouse address updated for verified buyers.
          </p>
        </div>
      </div>

      {toastMessage && (
        <div className="feedback-toast">
          <CheckCircle size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="details-grid">
        <form onSubmit={handleSubmit} className="panel glass" style={{ padding: "26px" }}>
          <div className="form-title" style={{ marginBottom: "20px" }}>
            <i>✓</i>
            <div>
              <b>Business Information</b>
              <small>Visible to buyers on lot listings and deal invoices</small>
            </div>
          </div>

          <div className="form-grid">
            <div className="field">
              <span>Full Contact Name *</span>
              <div className="inputbox">
                <User size={16} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="field">
              <span>Business / Shop Name *</span>
              <div className="inputbox">
                <Building size={16} />
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="field">
              <span>Primary Phone Number *</span>
              <div className="inputbox">
                <Phone size={16} />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="field">
              <span>Registered Email (Read-only)</span>
              <div className="inputbox" style={{ opacity: 0.7, cursor: "not-allowed" }}>
                <Mail size={16} />
                <input type="email" value={formData.email} disabled />
              </div>
            </div>

            <div className="field">
              <span>Operating City *</span>
              <div className="inputbox">
                <MapPin size={16} />
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="field">
              <span>GSTIN / Business Registration</span>
              <div className="inputbox">
                <FileText size={16} />
                <input
                  type="text"
                  name="gstin"
                  value={formData.gstin}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field full">
              <span>Warehouse / Yard Address *</span>
              <div className="inputbox">
                <MapPin size={16} />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="field full">
              <span>About Your Scrap Facility</span>
              <div className="inputbox" style={{ height: "auto" }}>
                <textarea
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end" }}>
            <button type="submit" className="btn primary large">
              <Save size={16} /> Save Profile Changes
            </button>
          </div>
        </form>

        {/* Verification & Trust Aside */}
        <div className="aside-stack">
          <div className="aside-card glass">
            <span className="eyebrow">
              <ShieldCheck size={14} /> TRUST BADGE
            </span>
            <h3 style={{ fontSize: "17px", marginTop: "10px" }}>Verified Seller Tier</h3>
            <p>
              Your account is marked as a <b>Verified Industrial Seller</b> on the KabadiWala B2B Network.
            </p>

            <div
              style={{
                marginTop: "16px",
                padding: "14px",
                borderRadius: "12px",
                background: "#ffffff04",
                border: "1px solid var(--line)",
                display: "grid",
                gap: "10px",
                fontSize: "11px"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#809284" }}>Account ID:</span>
                <b>{user?.id || "USR-SELLER-1"}</b>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#809284" }}>Role:</span>
                <span className="badge completed" style={{ margin: 0 }}>
                  Seller Account
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#809284" }}>Weight Certification:</span>
                <b style={{ color: "var(--green)" }}>Digital Scales Calibrated</b>
              </div>
            </div>
          </div>

          <div className="panel glass">
            <h3 style={{ fontSize: "14px", margin: "0 0 8px" }}>Demo Authentication Note</h3>
            <p style={{ fontSize: "11px", color: "#8a9b8e", lineHeight: "1.6", margin: 0 }}>
              This profile data is safely synchronized in your browser's <code>localStorage</code> (demo mode). Any changes made here persist across reloads and appear in your listings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerProfile;

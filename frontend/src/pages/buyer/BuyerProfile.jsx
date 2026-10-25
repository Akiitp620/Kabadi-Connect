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
  FileCheck
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export function BuyerProfile() {
  const { user, updateUserProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || "Vikram Recyclers",
    email: user?.email || "buyer@kabadiwala.com",
    phone: user?.phone || "+91 98765 22222",
    businessName: user?.businessName || "Vikram Metals & Polymer Recycling Pvt Ltd",
    city: user?.city || "Patna",
    address: user?.address || "Bypass Warehousing Hub, Gate 3, Patna",
    gstin: user?.gstin || "10BBBBB1111B2Z8",
    recyclingLicense: user?.recyclingLicense || "PCB-BIH-REC-2024-8849",
    description: user?.description || "Authorized scrap aggregation and recycling facility dealing in cardboard, PET, copper, and ferrous metals."
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
      recyclingLicense: formData.recyclingLicense,
      description: formData.description
    });

    setToastMessage("Buyer profile updated successfully!");
    setTimeout(() => setToastMessage(""), 3500);
  };

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <span className="eyebrow">
            <i /> BUYER PROCUREMENT ACCOUNT
          </span>
          <h1>Buyer Recycler Profile</h1>
          <p>
            Manage your registered corporate identity, pollution control board licenses, and collection fleet contacts.
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
              <b>Procurement Entity Details</b>
              <small>Included on seller pickup receipts and gate passes</small>
            </div>
          </div>

          <div className="form-grid">
            <div className="field">
              <span>Authorized Representative Name *</span>
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
              <span>Recycling Company / Dealer Firm *</span>
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
              <span>Official Phone Number *</span>
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
              <span>Operating City / Hub *</span>
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
              <span>GSTIN / Corporate Reg</span>
              <div className="inputbox">
                <FileCheck size={16} />
                <input
                  type="text"
                  name="gstin"
                  value={formData.gstin}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field full">
              <span>State Pollution Control Board (SPCB) Recycling Reg #</span>
              <div className="inputbox">
                <ShieldCheck size={16} />
                <input
                  type="text"
                  name="recyclingLicense"
                  value={formData.recyclingLicense}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field full">
              <span>Processing Facility / Warehouse Address *</span>
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
              <span>Procurement Needs & Materials Required</span>
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

        {/* Aside Verification */}
        <div className="aside-stack">
          <div className="aside-card glass">
            <span className="eyebrow">
              <ShieldCheck size={14} /> CERTIFIED RECYCLER
            </span>
            <h3 style={{ fontSize: "17px", marginTop: "10px" }}>Bulk Buyer Tier 1</h3>
            <p>
              Your account has full trading privileges to bid on all lots and schedule direct vehicle pickups.
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
                <span style={{ color: "#809284" }}>Buyer ID:</span>
                <b>{user?.id || "USR-BUYER-1"}</b>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#809284" }}>Role:</span>
                <span className="badge confirmed" style={{ margin: 0 }}>
                  Bulk Buyer
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#809284" }}>Verification:</span>
                <b style={{ color: "var(--green)" }}>KYC & SPCB Approved</b>
              </div>
            </div>
          </div>

          <div className="panel glass">
            <h3 style={{ fontSize: "14px", margin: "0 0 8px" }}>Client Session Storage</h3>
            <p style={{ fontSize: "11px", color: "#8a9b8e", lineHeight: "1.6", margin: 0 }}>
              All buyer profile preferences are cached locally in your browser's demo storage. In production, this syncs with an authorized enterprise identity provider.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyerProfile;

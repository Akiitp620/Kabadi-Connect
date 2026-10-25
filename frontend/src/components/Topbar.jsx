import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Bell } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function getPageTitle(pathname) {
  const map = {
    "/seller/dashboard": "Seller Dashboard",
    "/seller/add-scrap": "Add Scrap Lot",
    "/seller/listings": "My Scrap Listings",
    "/seller/offers": "Received Buyer Offers",
    "/seller/orders": "Seller Orders Fulfillment",
    "/seller/sales": "Sales History & Analytics",
    "/seller/profile": "Seller Profile",
    "/buyer/dashboard": "Buyer Dashboard",
    "/buyer/marketplace": "B2B Scrap Marketplace",
    "/buyer/offers": "My Sent Offers",
    "/buyer/orders": "Purchase Orders",
    "/buyer/saved": "Saved Scrap Lots",
    "/buyer/rates": "Market Scrap Rates",
    "/buyer/profile": "Buyer Profile",
    "/rates": "Scrap Rates",
    "/dashboard": "Overview",
    "/agent": "Agent Workspace",
    "/admin": "Admin Console"
  };

  if (map[pathname]) return map[pathname];
  if (pathname.startsWith("/buyer/listing/")) return "Scrap Lot Details";
  if (pathname.startsWith("/buyer/checkout/")) return "Checkout & Order";
  if (pathname.startsWith("/buyer/offers/new/")) return "Make Purchase Offer";
  return "Workspace";
}

export function Topbar() {
  const { user } = useAuth();
  const location = useLocation();

  const isSeller = user?.role === "seller";
  const isBuyer = user?.role === "buyer";

  // Dynamic profile destination based on authenticated role
  const profilePath =
    user?.role === "seller"
      ? "/seller/profile"
      : user?.role === "buyer"
      ? "/buyer/profile"
      : "/login";

  const profileLabel =
    user?.role === "seller"
      ? "Seller Profile"
      : user?.role === "buyer"
      ? "Buyer Profile"
      : "Profile";

  return (
    <header className="topbar">
      <div className="crumb">
        <span className="crumb-role">
          {isSeller ? "Seller Portal" : isBuyer ? "Buyer Marketplace" : "Workspace"}
        </span>{" "}
        <ChevronRight size={14} /> <b>{getPageTitle(location.pathname)}</b>
      </div>
      <div className="top-actions">
        <span className="live">
          <i /> {isSeller ? "Seller Mode" : isBuyer ? "Buyer Mode" : "Demo Session"}
        </span>
        <button
          type="button"
          className="bell"
          aria-label="Notifications"
          title="Notifications"
        >
          <Bell size={18} />
        </button>
        <Link
          to={profilePath}
          className="avatar small avatar-link"
          aria-label={`Go to ${profileLabel}`}
          title={`Go to ${profileLabel}`}
        >
          {(user?.name || "U")[0].toUpperCase()}
        </Link>
      </div>
    </header>
  );
}

export default Topbar;

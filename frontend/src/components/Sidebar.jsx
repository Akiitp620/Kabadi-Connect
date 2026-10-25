import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  Package,
  IndianRupee,
  Truck,
  Store,
  Tag,
  TrendingUp,
  Bookmark,
  ShieldCheck,
  ChevronRight,
  LogOut,
  X
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Brand from "./Brand";

function NavItem({ to, icon, badge, children, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) => "navitem " + (isActive ? "active" : "")}
    >
      {icon}
      <span>{children}</span>
      {badge && <span className="nav-badge">{badge}</span>}
      {children === "Add Scrap" && <b className="plus">+</b>}
    </NavLink>
  );
}

export function Sidebar({ open, onClose }) {
  const { user, logout, offers, orders, savedListings } = useAuth();

  const handleLogout = () => {
    if (onClose) onClose();
    logout();
  };

  const isSeller = user?.role === "seller";
  const isBuyer = user?.role === "buyer";

  // Counts for badges
  const sellerPendingOrders = orders?.filter(
    (o) => o.sellerId === user?.id && o.status === "Pending"
  )?.length;
  const sellerPendingOffers = offers?.filter(
    (o) => o.sellerId === user?.id && o.status === "Pending"
  )?.length;
  const buyerActiveOrders = orders?.filter(
    (o) => o.buyerId === user?.id && o.status !== "Completed" && o.status !== "Cancelled"
  )?.length;
  const buyerPendingOffers = offers?.filter(
    (o) => o.buyerId === user?.id && o.status === "Pending"
  )?.length;

  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <div className="side-brand">
        <Brand onClick={onClose} />
        <button
          type="button"
          className="close-menu"
          onClick={onClose}
          aria-label="Close navigation"
        >
          <X />
        </button>
      </div>

      <div className="role-workspace-indicator">
        <span className="role-pill">
          {isSeller ? "SELLER WORKSPACE" : isBuyer ? "BUYER WORKSPACE" : "WORKSPACE"}
        </span>
      </div>

      <div className="label">MENU</div>

      <nav className="side-nav">
        {isSeller ? (
          <>
            <NavItem to="/seller/dashboard" icon={<LayoutDashboard size={18} />} onClick={onClose}>
              Dashboard
            </NavItem>
            <NavItem to="/seller/add-scrap" icon={<PlusCircle size={18} />} onClick={onClose}>
              Add Scrap
            </NavItem>
            <NavItem to="/seller/listings" icon={<Package size={18} />} onClick={onClose}>
              My Listings
            </NavItem>
            <NavItem
              to="/seller/offers"
              icon={<Tag size={18} />}
              badge={sellerPendingOffers > 0 ? sellerPendingOffers : null}
              onClick={onClose}
            >
              Buyer Offers
            </NavItem>
            <NavItem
              to="/seller/orders"
              icon={<Truck size={18} />}
              badge={sellerPendingOrders > 0 ? sellerPendingOrders : null}
              onClick={onClose}
            >
              Seller Orders
            </NavItem>
            <NavItem to="/seller/sales" icon={<TrendingUp size={18} />} onClick={onClose}>
              Sales History
            </NavItem>
          </>
        ) : isBuyer ? (
          <>
            <NavItem to="/buyer/dashboard" icon={<LayoutDashboard size={18} />} onClick={onClose}>
              Dashboard
            </NavItem>
            <NavItem to="/buyer/marketplace" icon={<Store size={18} />} onClick={onClose}>
              Marketplace
            </NavItem>
            <NavItem
              to="/buyer/offers"
              icon={<Tag size={18} />}
              badge={buyerPendingOffers > 0 ? buyerPendingOffers : null}
              onClick={onClose}
            >
              My Offers
            </NavItem>
            <NavItem
              to="/buyer/orders"
              icon={<Package size={18} />}
              badge={buyerActiveOrders > 0 ? buyerActiveOrders : null}
              onClick={onClose}
            >
              My Orders
            </NavItem>
            <NavItem
              to="/buyer/saved"
              icon={<Bookmark size={18} />}
              badge={savedListings?.length > 0 ? savedListings.length : null}
              onClick={onClose}
            >
              Saved Lots
            </NavItem>
            <NavItem to="/buyer/rates" icon={<IndianRupee size={18} />} onClick={onClose}>
              Scrap Rates
            </NavItem>
          </>
        ) : (
          <>
            <NavItem to="/seller/dashboard" icon={<LayoutDashboard size={18} />} onClick={onClose}>
              Seller View
            </NavItem>
            <NavItem to="/buyer/dashboard" icon={<Store size={18} />} onClick={onClose}>
              Buyer View
            </NavItem>
          </>
        )}

        {(user?.role === "agent" || user?.role === "admin") && (
          <NavItem to="/agent" icon={<Truck size={18} />} onClick={onClose}>
            Agent workspace
          </NavItem>
        )}

        {user?.role === "admin" && (
          <NavItem to="/admin" icon={<ShieldCheck size={18} />} onClick={onClose}>
            Admin console
          </NavItem>
        )}
      </nav>

      <div className="side-bottom">
        <div className="help">
          <ShieldCheck size={20} />
          <span>
            <b>B2B Scrap Support</b>
            <small>Direct WhatsApp & Phone</small>
          </span>
          <ChevronRight size={16} />
        </div>

        <div className="profile">
          <Link
            to={isSeller ? "/seller/profile" : isBuyer ? "/buyer/profile" : "/login"}
            onClick={onClose}
            style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", color: "inherit", flex: 1, minWidth: 0 }}
            title="View Profile"
          >
            <span className="avatar">
              {(user?.name || "U")[0].toUpperCase()}
            </span>
            <span style={{ minWidth: 0, overflow: "hidden" }}>
              <b style={{ display: "block", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                {user?.name || "KabadiWala User"}
              </b>
              <small>{isSeller ? "Verified Seller" : isBuyer ? "Bulk Buyer" : user?.role || "Member"}</small>
            </span>
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            aria-label="Sign out"
            title="Sign out of demo session"
          >
            <LogOut size={17} />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;

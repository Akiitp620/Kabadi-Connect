import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Brand from "./Brand";

export function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const getDashboardPath = () => {
    if (!user) return "/login";
    if (user.role === "buyer") return "/buyer/dashboard";
    if (user.role === "seller") return "/seller/dashboard";
    if (user.role === "admin") return "/admin";
    if (user.role === "agent") return "/agent";
    return "/seller/dashboard";
  };

  return (
    <header className="public-head">
      <Brand />
      <nav>
        <Link to="/buyer/marketplace">Browse Marketplace</Link>
        <Link to={user?.role === "seller" ? "/seller/add-scrap" : "/login"}>Sell Scrap</Link>
        <Link to="/rates">Scrap Rates</Link>
        <a href="/#how">How It Works</a>
      </nav>
      <div className="head-actions">
        {user ? (
          <>
            <Link className="btn ghost" to={getDashboardPath()}>
              {user.role === "seller" ? "Seller Dashboard" : user.role === "buyer" ? "Buyer Portal" : "Workspace"}
            </Link>
            <button
              type="button"
              className="btn primary"
              onClick={handleLogout}
            >
              Sign out
            </button>
          </>
        ) : (
          <>
            <Link className="btn ghost" to="/login">
              Log in
            </Link>
            <Link className="btn primary" to="/signup">
              Get started <ArrowUpRight size={16} />
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;

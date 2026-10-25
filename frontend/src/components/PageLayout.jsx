import React, { useState, useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export function PageLayout({ children }) {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const publicRoutes = ["/", "/login", "/signup", "/forgot-password", "/rates"];
  const isPublicPage = publicRoutes.includes(location.pathname);

  // Close mobile drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <div className="app">
      <div className="glow g1" />
      <div className="glow g2" />

      {isPublicPage ? (
        <Navbar />
      ) : (
        <>
          <button
            type="button"
            className="mobile-menu"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          {open && (
            <button
              type="button"
              className="scrim"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            />
          )}
          <Sidebar open={open} onClose={() => setOpen(false)} />
        </>
      )}

      <main className={isPublicPage ? "public-main" : "main"}>
        {!isPublicPage && <Topbar />}
        {children || <Outlet />}
      </main>
    </div>
  );
}

export default PageLayout;

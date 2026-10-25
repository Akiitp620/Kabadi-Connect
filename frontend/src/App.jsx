import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

// Central Context Provider
import { AuthProvider, useAuth } from "./context/AuthContext";

// Layout & Route Guard Components
import PageLayout from "./components/PageLayout";
import { ProtectedRoute, PublicOnlyRoute } from "./components/ProtectedRoute";

// Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ScrapRates from "./pages/ScrapRates";
import NotFound from "./pages/NotFound";

// Seller Section Pages
import SellerDashboard from "./pages/seller/SellerDashboard";
import AddScrap from "./pages/seller/AddScrap";
import SellerListings from "./pages/seller/SellerListings";
import SellerOffers from "./pages/seller/SellerOffers";
import SellerOrders from "./pages/seller/SellerOrders";
import SellerSales from "./pages/seller/SellerSales";
import SellerProfile from "./pages/seller/SellerProfile";

// Buyer Section Pages
import BuyerDashboard from "./pages/buyer/BuyerDashboard";
import BrowseMarketplace from "./pages/buyer/BrowseMarketplace";
import ScrapDetails from "./pages/buyer/ScrapDetails";
import Checkout from "./pages/buyer/Checkout";
import MakeOffer from "./pages/buyer/MakeOffer";
import BuyerOffers from "./pages/buyer/BuyerOffers";
import BuyerOrders from "./pages/buyer/BuyerOrders";
import BuyerSaved from "./pages/buyer/BuyerSaved";
import BuyerProfile from "./pages/buyer/BuyerProfile";

// Legacy Pages (Preserved for compatibility)
import BookPickup from "./pages/BookPickup";
import PickupHistory from "./pages/PickupHistory";
import PickupDetails from "./pages/PickupDetails";
import AgentDashboard from "./pages/AgentDashboard";
import AdminDashboard from "./pages/AdminDashboard";

/**
 * RoleBasedDashboardRedirect
 * Intelligently redirects users landing on generic /dashboard
 * to their dedicated Seller or Buyer workspace.
 */
function RoleBasedDashboardRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === "buyer") return <Navigate to="/buyer/dashboard" replace />;
  if (user.role === "admin") return <Navigate to="/admin" replace />;
  if (user.role === "agent") return <Navigate to="/agent" replace />;
  return <Navigate to="/seller/dashboard" replace />;
}

/**
 * Main Application Component
 * Sets up centralized routing with strict role permissions and dark glassmorphic styling.
 */
export function App() {
  return (
    <AuthProvider>
      <PageLayout>
        <Routes>
          {/* ========================================================================= */}
          {/* 1. PUBLIC MARKETING & AUTHENTICATION ROUTES                               */}
          {/* ========================================================================= */}

          {/* Landing page */}
          <Route path="/" element={<Home />} />

          {/* Login with Seller or Buyer tab selection */}
          <Route
            path="/login"
            element={
              <PublicOnlyRoute>
                <Login />
              </PublicOnlyRoute>
            }
          />

          {/* Registration with role selection (Seller vs Buyer) */}
          <Route
            path="/signup"
            element={
              <PublicOnlyRoute>
                <Signup />
              </PublicOnlyRoute>
            }
          />

          {/* Password recovery interface */}
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Public Scrap Rates Guide */}
          <Route path="/rates" element={<ScrapRates />} />

          {/* ========================================================================= */}
          {/* 2. SELLER WORKSPACE ROUTES (Restricted to 'seller' role)                   */}
          {/* ========================================================================= */}

          <Route
            path="/seller/dashboard"
            element={
              <ProtectedRoute allowedRoles={["seller", "admin"]}>
                <SellerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/seller/add-scrap"
            element={
              <ProtectedRoute allowedRoles={["seller", "admin"]}>
                <AddScrap />
              </ProtectedRoute>
            }
          />

          <Route
            path="/seller/listings"
            element={
              <ProtectedRoute allowedRoles={["seller", "admin"]}>
                <SellerListings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/seller/offers"
            element={
              <ProtectedRoute allowedRoles={["seller", "admin"]}>
                <SellerOffers />
              </ProtectedRoute>
            }
          />

          <Route
            path="/seller/orders"
            element={
              <ProtectedRoute allowedRoles={["seller", "admin"]}>
                <SellerOrders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/seller/sales"
            element={
              <ProtectedRoute allowedRoles={["seller", "admin"]}>
                <SellerSales />
              </ProtectedRoute>
            }
          />

          <Route
            path="/seller/profile"
            element={
              <ProtectedRoute allowedRoles={["seller", "admin"]}>
                <SellerProfile />
              </ProtectedRoute>
            }
          />

          {/* ========================================================================= */}
          {/* 3. BUYER WORKSPACE ROUTES (Restricted to 'buyer' role)                     */}
          {/* ========================================================================= */}

          <Route
            path="/buyer/dashboard"
            element={
              <ProtectedRoute allowedRoles={["buyer", "admin"]}>
                <BuyerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/buyer/marketplace"
            element={
              <ProtectedRoute allowedRoles={["buyer", "seller", "admin"]}>
                <BrowseMarketplace />
              </ProtectedRoute>
            }
          />

          <Route
            path="/buyer/listing/:id"
            element={
              <ProtectedRoute allowedRoles={["buyer", "seller", "admin"]}>
                <ScrapDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/buyer/checkout/:id"
            element={
              <ProtectedRoute allowedRoles={["buyer", "admin"]}>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/buyer/offers/new/:id"
            element={
              <ProtectedRoute allowedRoles={["buyer", "admin"]}>
                <MakeOffer />
              </ProtectedRoute>
            }
          />

          <Route
            path="/buyer/offers"
            element={
              <ProtectedRoute allowedRoles={["buyer", "admin"]}>
                <BuyerOffers />
              </ProtectedRoute>
            }
          />

          <Route
            path="/buyer/orders"
            element={
              <ProtectedRoute allowedRoles={["buyer", "admin"]}>
                <BuyerOrders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/buyer/saved"
            element={
              <ProtectedRoute allowedRoles={["buyer", "admin"]}>
                <BuyerSaved />
              </ProtectedRoute>
            }
          />

          <Route
            path="/buyer/rates"
            element={
              <ProtectedRoute allowedRoles={["buyer", "admin"]}>
                <ScrapRates />
              </ProtectedRoute>
            }
          />

          <Route
            path="/buyer/profile"
            element={
              <ProtectedRoute allowedRoles={["buyer", "admin"]}>
                <BuyerProfile />
              </ProtectedRoute>
            }
          />

          {/* ========================================================================= */}
          {/* 4. LEGACY / SHARED ROUTES (Preserved for compatibility)                    */}
          {/* ========================================================================= */}

          <Route path="/dashboard" element={<RoleBasedDashboardRedirect />} />

          <Route
            path="/book-pickup"
            element={
              <ProtectedRoute allowedRoles={["seller", "customer", "agent", "admin"]}>
                <BookPickup />
              </ProtectedRoute>
            }
          />

          <Route
            path="/pickups"
            element={
              <ProtectedRoute allowedRoles={["seller", "customer", "agent", "admin"]}>
                <PickupHistory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/pickup/:id"
            element={
              <ProtectedRoute allowedRoles={["seller", "customer", "agent", "admin"]}>
                <PickupDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/agent"
            element={
              <ProtectedRoute allowedRoles={["agent", "admin"]}>
                <AgentDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* ========================================================================= */}
          {/* 5. 404 CATCH-ALL ROUTE                                                    */}
          {/* ========================================================================= */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageLayout>
    </AuthProvider>
  );
}

export default App;

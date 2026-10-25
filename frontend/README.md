# KabadiWala — B2B & Household Two-Role Scrap Marketplace

Professional React.js + Vite frontend for the **KabadiWala** scrap marketplace. Redesigned into a two-sided circular economy platform connecting **Sellers** (households, shops, commercial collection centers, and factories) with **Buyers** (licensed scrap dealers, recycling plants, and bulk aggregators).

The design preserves the signature dark charcoal glassmorphism UI (`#080d0b`), neon-green accents (`#b7f66a`), Lucide iconography, responsive layouts, and 100% frontend-only client-side demonstration state.

---

## Architecture & Role Management

The marketplace isolates views and permissions based on user roles:
- **Sellers:** Post scrap lots, manage inventory, receive dealer bids/offers, accept/reject purchase orders, track sales revenue, and manage warehouse details.
- **Buyers:** Browse verified marketplace lots, search & filter materials, purchase via instant checkout, submit counter/custom offers, track collection pickups, and save lots to a procurement watchlist.

---

## Pages & Routes Directory

### Public & Authentication
- **Landing Page (`/`)**: Dual-sided hero showcasing marketplace benefits for both Sellers and Buyers, categories, 3-step procurement workflow, trust metrics, and live rates.
- **Login (`/login`)**: Role selection tabs (Seller Login vs Buyer Login), 1-click demo auto-fill chips, form validation, and role-based redirects.
- **Signup (`/signup`)**: Registration with explicit role selection (Seller vs Buyer), business name, contact phone, and operating city.
- **Forgot Password (`/forgot-password`)**: Client-side simulated password recovery interface.
- **Public Scrap Rates (`/rates`)**: Material search and indicative mandi scrap rates catalog.

### Seller Section (Restricted to `seller` role)
- **Seller Dashboard (`/seller/dashboard`)**: KPI metric cards (active listings, pending orders, accepted orders, completed sales, total revenue), recent buyer orders, inventory preview, and quick action shortcuts.
- **Add Scrap (`/seller/add-scrap`)**: Comprehensive listing creation form with title, category, description, quantity/unit, price per unit, image selection with realistic scrap presets, warehouse address, condition, and fulfillment preferences. Synchronizes immediately to the buyer marketplace.
- **My Listings (`/seller/listings`)**: Inventory catalog to view, toggle availability status (Available <-> Unavailable), edit prices/quantities via modal, and delete listings.
- **Buyer Offers (`/seller/offers`)**: Received buyer price proposals with 1-click Accept, Decline, and Counter Offer capabilities.
- **Seller Orders (`/seller/orders`)**: Order fulfillment tracker with status lifecycle actions (Pending → Accepted → Ready for pickup → Completed / Cancelled).
- **Sales History (`/seller/sales`)**: Financial archive of completed transactions, quantities cleared, selling rates, and receipts.
- **Seller Profile (`/seller/profile`)**: Manage facility address, GSTIN, contact numbers, and trust verification credentials.

### Buyer Section (Restricted to `buyer` role)
- **Buyer Dashboard (`/buyer/dashboard`)**: Procurement overview with available listings count, active pickups, pending offers, saved lots, and quick material shortcuts.
- **Browse Marketplace (`/buyer/marketplace`)**: B2B product catalog with keyword search, category filter pills, city filter, price range slider/input, and sorting (newest, price low-to-high, price high-to-low).
- **Scrap Details (`/buyer/listing/:id`)**: High-resolution lot view, seller yard details, specifications, total lot value, and dual action buttons (**Buy Now** and **Make an Offer**).
- **Buy Now / Checkout (`/buyer/checkout/:id`)**: Quantity selector, live subtotal calculator, pickup time slot picker, buyer notes, and automatic inventory deduction to prevent overselling.
- **Make an Offer (`/buyer/offers/new/:id`)**: Propose custom pricing per unit or total lot value with negotiable terms sent directly to the seller.
- **My Offers (`/buyer/offers`)**: Track outgoing proposals, seller counter-offers, and 1-click checkout with negotiated terms.
- **Buyer Orders (`/buyer/orders`)**: Status tracker for scheduled vehicle pickups, collection addresses, and order cancellation.
- **Saved Listings (`/buyer/saved`)**: Personal procurement watchlist with 1-click bookmarking.
- **Market Rates (`/buyer/rates`)**: Real-time indicative price index for scrap commodities.
- **Buyer Profile (`/buyer/profile`)**: SPCB recycling registration, company profile, and transport fleet info.

---

## 1-Click Demo Accounts

The login interface features quick auto-fill chips for instant evaluation:

| Role | Demo User Name | Demo Email | Demo Password | Default Redirect |
|---|---|---|---|---|
| **Seller** | Sunil Sharma (Sharma Scrap Traders) | `seller@kabadiwala.com` | `password123` | `/seller/dashboard` |
| **Buyer** | Vikram Recyclers (Vikram Metals Pvt Ltd) | `buyer@kabadiwala.com` | `password123` | `/buyer/dashboard` |
| **Seller (Household)** | Ayush Kumar | `customer@kabadiwala.com` | `password123` | `/seller/dashboard` |
| **Buyer (Dealer)** | Ramesh Dealer | `agent@kabadiwala.com` | `password123` | `/buyer/dashboard` |

*You can also register any new custom account on the `/signup` page selecting either "Seller" or "Buyer".*

---

## Client-Side Architecture & Security Disclaimer

- **Zero Backend Dependencies:** The application runs entirely in the browser using React 18, React Router v6, and Vite.
- **Local Persistence:** Data is synchronized in browser `localStorage` under the `kw_` prefix (`kw_user`, `kw_listings`, `kw_orders`, `kw_offers`, `kw_saved_listings`, `kw_registered_users`, `kw_rates`). Any listing added by a seller immediately appears in the buyer marketplace across browser tabs and page refreshes.
- **Route Isolation:** `ProtectedRoute` enforces strict role boundaries: Sellers navigating to `/buyer/*` are redirected to `/seller/dashboard`, and Buyers navigating to `/seller/*` are redirected to `/buyer/dashboard`. Unauthenticated visitors are routed to `/login`.
- **Disclaimer:** `localStorage` authentication is implemented for demonstration, rapid prototyping, and UI evaluation. It is not intended for production-grade security.

---

## How to Run

```bash
# 1. Install dependencies
npm install

# 2. Start Vite dev server
npm run dev

# 3. Build for production
npm run build
```

Open `http://localhost:5173` to test the application.

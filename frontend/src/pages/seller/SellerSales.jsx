import React from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  IndianRupee,
  Package
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export function SellerSales() {
  const { user, orders } = useAuth();

  // Completed sales for this seller
  const completedSales = orders.filter(
    (o) =>
      (o.sellerId === user?.id || o.sellerName === user?.name) &&
      o.status === "Completed"
  );

  const totalRevenue = completedSales.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);
  const totalQuantityKg = completedSales.reduce((acc, curr) => {
    // simple estimate assuming kg
    return acc + (curr.quantity || 0);
  }, 0);

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <span className="eyebrow">
            <i /> FINANCIAL ARCHIVE & SETTLEMENTS
          </span>
          <h1>Sales History & Reports</h1>
          <p>
            Review all completed scrap consignments, payment receipts, and historical selling prices.
          </p>
        </div>
      </div>

      {/* Sales Summary Metrics */}
      <div className="stats three">
        <div className="stat glass">
          <div className="stat-icon">
            <IndianRupee size={20} />
          </div>
          <span className="stat-label">TOTAL COMPLETED REVENUE</span>
          <strong>₹{totalRevenue.toLocaleString("en-IN")}</strong>
          <small>
            <b>100%</b> on-the-spot settled
          </small>
        </div>

        <div className="stat glass">
          <div className="stat-icon blue">
            <Package size={20} />
          </div>
          <span className="stat-label">SCRAP VOLUME CLEARED</span>
          <strong>{totalQuantityKg} units</strong>
          <small>Across all completed deals</small>
        </div>

        <div className="stat glass">
          <div className="stat-icon purple">
            <TrendingUp size={20} />
          </div>
          <span className="stat-label">FULFILLED ORDERS</span>
          <strong>{completedSales.length}</strong>
          <small>Zero cancellation rate</small>
        </div>
      </div>

      {/* Completed Sales Table */}
      <div className="panel glass" style={{ padding: 0 }}>
        <div
          style={{
            padding: "20px 22px 14px",
            borderBottom: "1px solid #ffffff0a",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <div>
            <h2 style={{ fontSize: "16px", margin: 0 }}>Completed Sales Transactions</h2>
            <p style={{ fontSize: "11px", color: "#819186", margin: "4px 0 0" }}>
              Permanent audit log of verified handovers to licensed recyclers
            </p>
          </div>
          <span className="live">
            <i /> Verified Records
          </span>
        </div>

        {completedSales.length === 0 ? (
          <div className="empty">
            <TrendingUp />
            <h3>No completed sales yet</h3>
            <p>
              Once your accepted orders are marked as "Completed" after pickup, their financial settlement details will show here.
            </p>
            <Link to="/seller/orders" className="btn primary small">
              View Ongoing Orders
            </Link>
          </div>
        ) : (
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th style={{ paddingLeft: "22px" }}>Order Ref</th>
                  <th>Scrap Item</th>
                  <th>Buyer Name</th>
                  <th>Quantity Sold</th>
                  <th>Price Rate</th>
                  <th>Total Amount</th>
                  <th>Date & Payment</th>
                  <th style={{ paddingRight: "22px" }}>Receipt Status</th>
                </tr>
              </thead>
              <tbody>
                {completedSales.map((sale) => (
                  <tr key={sale.id}>
                    <td className="id" style={{ paddingLeft: "22px" }}>
                      {sale.id}
                    </td>
                    <td>
                      <div className="material">
                        <i>
                          <Package size={15} />
                        </i>
                        <span>
                          <b>{sale.listingTitle}</b>
                          <small>{sale.category}</small>
                        </span>
                      </div>
                    </td>
                    <td>
                      <b>{sale.buyerName}</b>
                      <small style={{ display: "block", color: "#77877c" }}>{sale.buyerPhone}</small>
                    </td>
                    <td>
                      <b>
                        {sale.quantity} {sale.unit}
                      </b>
                    </td>
                    <td>₹{sale.pricePerUnit}/{sale.unit}</td>
                    <td>
                      <b style={{ color: "var(--green)", fontSize: "13px" }}>
                        ₹{sale.totalAmount?.toLocaleString("en-IN")}
                      </b>
                    </td>
                    <td>
                      <span>{sale.date}</span>
                      <small style={{ display: "block", color: "#788a7e" }}>{sale.paymentStatus}</small>
                    </td>
                    <td style={{ paddingRight: "22px" }}>
                      <span className="badge completed">
                        <i /> Completed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default SellerSales;

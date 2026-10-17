import React from "react";
import { Link } from "react-router-dom";
import { Package, Recycle, ChevronRight } from "lucide-react";
import { Badge } from "./UI";

export function PickupTable({ pickups }) {
  if (!pickups || !pickups.length) {
    return (
      <div className="empty">
        <Package />
        <h3>No pickups yet</h3>
        <p>Your collections will appear here.</p>
        <Link className="btn primary" to="/book-pickup">
          Book your first pickup
        </Link>
      </div>
    );
  }

  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>Pickup ID</th>
            <th>Materials</th>
            <th>Scheduled for</th>
            <th>Status</th>
            <th>Amount</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {pickups.map((p) => (
            <tr key={p.id}>
              <td>
                <Link className="id" to={`/pickup/${p.id}`}>
                  {p.id}
                </Link>
              </td>
              <td>
                <span className="material">
                  <i>
                    <Recycle />
                  </i>
                  <span>
                    <b>{p.material}</b>
                    <small>{p.weight}</small>
                  </span>
                </span>
              </td>
              <td>{p.date}</td>
              <td>
                <Badge status={p.status} />
              </td>
              <td>
                <b>{p.amount}</b>
              </td>
              <td>
                <Link
                  to={`/pickup/${p.id}`}
                  aria-label={`View details for pickup ${p.id}`}
                >
                  <ChevronRight />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PickupTable;

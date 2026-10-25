import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Header } from "../components/UI";
import PickupTable from "../components/PickupTable";

export function PickupHistory() {
  const { pickups } = useAuth();
  const [filter, setFilter] = useState("All");
  const [q, setQ] = useState("");

  const filtered = pickups.filter(
    (p) =>
      (filter === "All" || p.status === filter) &&
      `${p.id} ${p.material} ${p.address}`.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="page">
      <Header
        eyebrow="YOUR COLLECTION HISTORY"
        heading="My pickups"
        desc="Track your requests, upcoming collections, and completed pickups."
        action={
          <Link className="btn primary" to="/book-pickup">
            <Plus size={16} /> New pickup
          </Link>
        }
      />
      <div className="toolbar">
        <div className="tabs">
          {["All", "Requested", "Confirmed", "Completed", "Cancelled"].map(
            (t) => (
              <button
                type="button"
                className={filter === t ? "selected" : ""}
                key={t}
                onClick={() => setFilter(t)}
              >
                {t}
                <i>
                  {t === "All"
                    ? pickups.length
                    : pickups.filter((p) => p.status === t).length}
                </i>
              </button>
            )
          )}
        </div>
        <label className="search">
          <Search size={17} />
          <input
            placeholder="Search pickups…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </label>
      </div>

      <div className="glass panel">
        <PickupTable pickups={filtered} />
      </div>

      <div className="fineprint">
        <ShieldCheck size={16} /> Pickups are persisted locally in browser localStorage for this frontend demonstration.
      </div>
    </div>
  );
}

export default PickupHistory;

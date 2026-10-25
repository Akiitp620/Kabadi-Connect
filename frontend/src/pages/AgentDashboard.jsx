import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  CheckCircle2,
  Wallet,
  Check,
  ChevronRight,
  MapPin,
  ShieldCheck
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Header, Section, Stat, Badge } from "../components/UI";

export function AgentDashboard() {
  const { pickups, setPickups } = useAuth();
  const [tab, setTab] = useState("Active");
  const navigate = useNavigate();

  const openPickups = pickups.filter(
    (p) => !["Completed", "Cancelled"].includes(p.status)
  );
  const donePickups = pickups.filter((p) => p.status === "Completed");
  const list = tab === "Active" ? openPickups : donePickups;

  const updateStatus = (id, newStatus) => {
    setPickups((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );
  };

  return (
    <div className="page">
      <Header
        eyebrow="PICKUP PARTNER WORKSPACE"
        heading="Good evening, partner."
        desc="Your route and collection tasks for today."
        action={<span className="live">● Available for pickups</span>}
      />

      <div className="stats three">
        <Stat
          icon={<Package />}
          label="Open requests"
          value={openPickups.length}
          delta=""
          note="awaiting action"
        />
        <Stat
          icon={<CheckCircle2 />}
          label="Completed"
          value={donePickups.length + 14}
          delta="↗ 3"
          note="this week"
          tone="blue"
        />
        <Stat
          icon={<Wallet />}
          label="Today’s earnings"
          value="₹860"
          delta="↗ 18%"
          note="vs. yesterday"
          tone="amber"
        />
      </div>

      <div className="glass panel">
        <Section
          title="Collection queue"
          sub="Accept, update, and complete pickups."
          action={
            <div className="tabs compact">
              {["Active", "Completed"].map((t) => (
                <button
                  type="button"
                  className={tab === t ? "selected" : ""}
                  key={t}
                  onClick={() => setTab(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          }
        />

        {!list.length ? (
          <div className="empty">
            <Package />
            <h3>All caught up</h3>
            <p>No pickups in this queue right now.</p>
          </div>
        ) : (
          <div className="queue">
            {list.map((p) => (
              <div className="task" key={p.id}>
                <i>
                  <Package />
                </i>
                <div className="task-main">
                  <div>
                    <b>{p.material}</b> <Badge status={p.status} />
                  </div>
                  <small>
                    {p.id} · {p.date}
                  </small>
                  <p>
                    <MapPin size={14} /> {p.address || "Address not provided"}
                  </p>
                  <small>
                    {p.weight} · {p.amount}
                  </small>
                </div>
                <div className="task-actions">
                  {p.status === "Requested" && (
                    <button
                      type="button"
                      className="btn primary small"
                      onClick={() => updateStatus(p.id, "Confirmed")}
                    >
                      Accept <Check size={14} />
                    </button>
                  )}
                  {p.status === "Confirmed" && (
                    <button
                      type="button"
                      className="btn primary small"
                      onClick={() => updateStatus(p.id, "Completed")}
                    >
                      Complete <CheckCircle2 size={14} />
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn ghost small"
                    onClick={() => navigate(`/pickup/${p.id}`)}
                  >
                    Details <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rate-notice">
        <ShieldCheck size={19} />
        <span>
          <b>Safety reminder</b>
          <small>
            Confirm material and weight with the customer before marking a
            collection complete.
          </small>
        </span>
      </div>
    </div>
  );
}

export default AgentDashboard;

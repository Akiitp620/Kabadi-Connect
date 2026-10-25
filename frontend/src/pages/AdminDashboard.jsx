import React from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Settings2,
  Users,
  Truck,
  Wallet,
  Activity,
  IndianRupee,
  Package,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Header, Section, Stat } from "../components/UI";
import PickupTable from "../components/PickupTable";

export function AdminDashboard() {
  const { pickups } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="page">
      <Header
        eyebrow="OPERATIONS OVERVIEW"
        heading="Admin console"
        desc="A high-level view of platform activity and operations."
        action={
          <button
            type="button"
            className="btn ghost"
            onClick={() => navigate("/rates")}
          >
            <Settings2 size={16} /> Manage rates
          </button>
        }
      />

      <div className="stats">
        <Stat
          icon={<Users />}
          label="Registered customers"
          value="248"
          delta="↗ 16.4%"
          note="this month"
        />
        <Stat
          icon={<Truck />}
          label="Pickup requests"
          value={pickups.length + 186}
          delta="↗ 9.1%"
          note="all time"
          tone="blue"
        />
        <Stat
          icon={<Wallet />}
          label="Total payout value"
          value="₹48.2k"
          delta="↗ 6.7%"
          note="this month"
          tone="purple"
        />
        <Stat
          icon={<Activity />}
          label="Completion rate"
          value="94.8%"
          delta="↗ 2.1%"
          note="last 30 days"
          tone="amber"
        />
      </div>

      <div className="dash-grid admin-grid">
        <div className="glass panel">
          <Section
            title="Pickup operations"
            sub="Latest requests across the platform"
          />
          <PickupTable pickups={pickups.slice(0, 4)} />
        </div>

        <div className="glass panel">
          <Section title="Platform health" />
          {[
            ["Pickup fulfilment", "94.8%", "94.8%"],
            ["Partner availability", "88%", "88%"],
            ["Customer satisfaction", "4.9/5", "98%"]
          ].map((r) => (
            <div className="health" key={r[0]}>
              <span>
                {r[0]}
                <b>{r[1]}</b>
              </span>
              <i>
                <b style={{ width: r[2] }} />
              </i>
            </div>
          ))}
          <hr />
          <Link className="admin-link" to="/rates">
            <IndianRupee size={17} />
            <span>
              <b>Manage scrap rates</b>
              <small>View current material pricing</small>
            </span>
            <ChevronRight size={16} />
          </Link>
          <Link className="admin-link" to="/pickups">
            <Package size={17} />
            <span>
              <b>Review pickups</b>
              <small>Inspect pickup history</small>
            </span>
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>

      <p className="fineprint">
        <ShieldCheck size={16} /> Platform figures and operations run entirely within the frontend demo state.
      </p>
    </div>
  );
}

export default AdminDashboard;

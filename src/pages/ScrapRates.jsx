import React, { useState } from "react";
import {
  BookOpen,
  Box,
  Recycle,
  Layers3,
  Cpu,
  ShieldCheck,
  Search,
  Filter
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Header } from "../components/UI";

export function ScrapRates() {
  const { rates } = useAuth();
  const [q, setQ] = useState("");
  const icons = [
    <BookOpen key="1" />,
    <Box key="2" />,
    <Recycle key="3" />,
    <Layers3 key="4" />,
    <BookOpen key="5" />,
    <Cpu key="6" />
  ];

  const filtered = rates.filter((r) =>
    r.material.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="page">
      <Header
        eyebrow="CLEAR PRICING, NO SURPRISES"
        heading="Today’s scrap rates"
        desc="Use these indicative rates to understand what your materials may be worth."
        action={<span className="live">● Demo rates · indicative</span>}
      />

      <div className="rate-notice">
        <ShieldCheck size={19} />
        <span>
          <b>Fair pricing starts with transparency.</b>
          <small>
            Sample values for this project. Final amount depends on actual weight,
            quality, and confirmed rate.
          </small>
        </span>
      </div>

      <div className="rate-toolbar">
        <label className="search">
          <Search size={17} />
          <input
            placeholder="Find a material…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </label>
        <span className="fineprint">
          <Filter size={16} /> {filtered.length} materials
        </span>
      </div>

      <div className="rates-grid">
        {filtered.map((r, i) => (
          <div className="glass rate-card" key={r.id}>
            <div className="rate-top">
              <span className="cat-icon">{icons[i % icons.length]}</span>
              <small className={r.trend.includes("+") ? "green" : ""}>
                {r.trend}
              </small>
            </div>
            <h3>{r.material}</h3>
            <p>Clean, sorted material</p>
            <strong>
              ₹{r.rate}
              <small> / {r.unit}</small>
            </strong>
            <div className="rate-bottom">
              <span>Indicative rate</span>
              <b>
                <i /> Available
              </b>
            </div>
          </div>
        ))}
      </div>

      <p className="fineprint">
        <ShieldCheck size={16} /> Always confirm final weight and rate with the pickup
        partner before handing over materials.
      </p>
    </div>
  );
}

export default ScrapRates;

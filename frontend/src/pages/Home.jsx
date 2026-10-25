import React from "react";
import { Link } from "react-router-dom";
import {
  Recycle,
  ArrowRight,
  ArrowUpRight,
  Leaf,
  BookOpen,
  Layers3,
  Cpu,
  ShieldCheck,
  IndianRupee,
  Sparkles,
  Store,
  Package,
  Scale
} from "lucide-react";
import { Eyebrow } from "../components/UI";
import Footer from "../components/Footer";

export function Home() {

  const categories = [
    {
      title: "Cardboard & Packaging",
      desc: "Corrugated boxes, baled cartons, kraft sheets",
      rate: "₹14 - ₹16/kg",
      icon: <Layers3 key="l" />
    },
    {
      title: "Copper & High Alloys",
      desc: "Stripped wire, armature, busbars, heavy copper",
      rate: "₹620 - ₹660/kg",
      icon: <Sparkles key="s" />
    },
    {
      title: "Steel & Heavy Metal",
      desc: "Construction rebar, beam cut-offs, casting scrap",
      rate: "₹32 - ₹36/kg",
      icon: <Recycle key="r" />
    },
    {
      title: "Industrial Polymers",
      desc: "PET flakes, HDPE drums, PP woven sacks",
      rate: "₹22 - ₹28/kg",
      icon: <Package key="p" />
    },
    {
      title: "Newspaper & White Records",
      desc: "Daily dailies, office records, text archives",
      rate: "₹16 - ₹18/kg",
      icon: <BookOpen key="b" />
    },
    {
      title: "Approved E-waste",
      desc: "Telecom PCBs, motherboards, electrical scrap",
      rate: "₹200 - ₹350/kg",
      icon: <Cpu key="c" />
    }
  ];

  const marketplaceSteps = [
    {
      number: "01",
      icon: <Package key="1" />,
      title: "Sellers List Scrap Consignments",
      desc: "Households, shops, and factories list scrap with category, condition, expected rates, and lot photos."
    },
    {
      number: "02",
      icon: <Store key="2" />,
      title: "Recyclers Browse & Negotiate",
      desc: "Licensed scrap dealers inspect available lots, purchase immediately, or submit custom price offers."
    },
    {
      number: "03",
      icon: <Scale key="3" />,
      title: "Certified Weighing & Settlement",
      desc: "Buyer transports vehicles for on-site weighing using calibrated digital scales with instant on-the-spot payment."
    }
  ];

  return (
    <div className="landing">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-copy">
          <Eyebrow>INDIA'S PREMIER B2B & HOUSEHOLD SCRAP MARKETPLACE</Eyebrow>
          <h1>
            Connecting Scrap <em>Sellers</em> & Verified <em>Buyers.</em>
          </h1>
          <p>
            The two-role circular economy platform. Sellers get top mandi rates for their industrial and household scrap. Buyers and recyclers secure reliable, pre-graded bulk supply with zero intermediaries.
          </p>
          <div className="hero-actions">
            <Link className="btn primary large" to="/buyer/marketplace">
              <Store size={18} /> Browse Marketplace
            </Link>
            <Link className="btn glass-btn large" to="/signup">
              <Package size={18} /> Sell Your Scrap
            </Link>
          </div>
          <div className="trust">
            <span className="faces">
              <i>S</i>
              <i>V</i>
              <i>R</i>
              <i>+</i>
            </span>
            <span>
              <b className="stars">
                ★★★★★ <strong>4.9/5 Rating</strong>
              </b>
              <small>Trusted by 1,200+ verified scrap traders & recyclers</small>
            </span>
          </div>
        </div>

        <div className="hero-art">
          <div className="orbit o1" />
          <div className="orbit o2" />
          <div className="hero-card glass">
            <div className="card-top">
              <span>
                <i /> MARKETPLACE CONSIGNMENT
              </span>
              <b>LIVE LOT</b>
            </div>
            <div className="recycle-art">
              <div>
                <Scale size={66} />
              </div>
              <span className="leaf-float">
                <Leaf />
              </span>
              <span className="spark-float">
                <Sparkles />
              </span>
            </div>
            <div className="earn">
              <span>
                <small>Average Deal Value</small>
                <b>₹ 18,450</b>
              </span>
              <i>
                <IndianRupee size={18} />
              </i>
            </div>
            <div className="bars">
              {Array.from({ length: 18 }).map((_, i) => (
                <i key={i} />
              ))}
            </div>
            <div className="card-foot">
              <span>
                <ShieldCheck /> Certified Calibrated Scales
              </span>
              <span>100% Direct Settlement</span>
            </div>
          </div>

          <div className="float-chip chip1">
            <span className="chipicon">
              <Package />
            </span>
            <span>
              <b>For Sellers</b>
              <small>List in 60s • Receive dealer bids</small>
            </span>
            <ArrowUpRight />
          </div>

          <div className="float-chip chip2">
            <span className="chipicon">
              <Store />
            </span>
            <span>
              <b>For Buyers & Dealers</b>
              <small>Bulk tons • Transparent mandi rates</small>
            </span>
            <i />
          </div>
        </div>
      </section>

      {/* Trust Metrics Strip */}
      <div className="trust-strip">
        <div>
          <b>500+ Metric Tons</b>
          <span>Monthly scrap volume traded</span>
        </div>
        <div>
          <b>100% Digital Weighing</b>
          <span>Zero disputes with calibrated scales</span>
        </div>
        <div>
          <b>Verified Recyclers</b>
          <span>State Pollution Control Board compliant</span>
        </div>
        <div>
          <b>Direct Settlement</b>
          <span>Immediate RTGS, UPI or cash on collection</span>
        </div>
      </div>

      {/* Marketplace Materials Section */}
      <section className="section" id="materials">
        <div className="center">
          <Eyebrow>WHAT YOU CAN TRADE</Eyebrow>
          <h2>High-demand scrap categories</h2>
          <p>
            From factory production waste to municipal recyclables, browse categorized scrap lots with real-time price trends.
          </p>
        </div>

        <div className="category-grid">
          {categories.map((c, i) => (
            <div className="category glass" key={i}>
              <span className="cat-icon">{c.icon}</span>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
              <div>
                <span>{c.rate}</span>
                <Link to={`/buyer/marketplace`} style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  Trade <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section how" id="how">
        <div>
          <Eyebrow>STREAMLINED PROCUREMENT</Eyebrow>
          <h2>
            How the <em>marketplace</em> works
          </h2>
          <p>
            We eliminate multiple middlemen margins so sellers get higher earnings and industrial recyclers pay lower acquisition costs.
          </p>
          <div style={{ marginTop: "24px", display: "flex", gap: "12px" }}>
            <Link to="/signup" className="btn primary">
              Join as Seller
            </Link>
            <Link to="/buyer/marketplace" className="btn ghost">
              Explore Lots
            </Link>
          </div>
        </div>

        <div className="steps">
          {marketplaceSteps.map((s) => (
            <div className="step" key={s.number}>
              <span>{s.number}</span>
              <i>{s.icon}</i>
              <div>
                <b>{s.title}</b>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Role Dual-Card CTA */}
      <section className="section">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "22px" }}>
          {/* Seller Card */}
          <div className="panel glass" style={{ padding: "34px", borderRadius: "22px" }}>
            <span className="eyebrow">
              <Package size={14} /> SELLERS & GENERATORS
            </span>
            <h2 style={{ fontSize: "24px", margin: "14px 0 10px" }}>
              Have scrap taking up warehouse or yard space?
            </h2>
            <p style={{ color: "#92a496", fontSize: "12px", lineHeight: "1.7", margin: "0 0 22px" }}>
              List your packaging boxes, discarded metals, copper wire, or plastic flakes. Compare offers from verified recyclers and clear lots on your schedule.
            </p>
            <Link to="/signup" className="btn primary">
              Start Selling Scrap <ArrowRight size={16} />
            </Link>
          </div>

          {/* Buyer Card */}
          <div className="panel glass" style={{ padding: "34px", borderRadius: "22px" }}>
            <span className="eyebrow">
              <Store size={14} /> BUYERS & RECYCLERS
            </span>
            <h2 style={{ fontSize: "24px", margin: "14px 0 10px" }}>
              Looking for reliable, pre-graded scrap supply?
            </h2>
            <p style={{ color: "#92a496", fontSize: "12px", lineHeight: "1.7", margin: "0 0 22px" }}>
              Source continuous feedstock directly from industrial suppliers. Lock in orders or propose bids with transparent digital weight slips.
            </p>
            <Link to="/buyer/marketplace" className="btn ghost">
              Browse Active Marketplace <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Environmental & Economic Impact Strip */}
      <section className="impact">
        <div>
          <Eyebrow>SUSTAINABLE CIRCULAR ECONOMY</Eyebrow>
          <h2>Recycling at industrial velocity</h2>
          <p>
            Every ton of recycled scrap reduces landfill pressure, cuts virgin ore mining, and saves up to 75% manufacturing energy.
          </p>
          <Link to="/buyer/marketplace" className="btn primary">
            Participate in the Market <ArrowRight size={16} />
          </Link>
        </div>

        <div className="impact-metrics">
          <div>
            <b>4,200+ Tons</b>
            <span>CO₂ emissions averted</span>
          </div>
          <div>
            <b>18,000+ kg</b>
            <span>Plastics diverted from oceans</span>
          </div>
          <div>
            <b>₹ 2.8 Cr+</b>
            <span>Value disbursed to generators</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;

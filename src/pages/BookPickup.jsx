import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  BookOpen,
  Box,
  Recycle,
  Layers3,
  Cpu,
  Package,
  CalendarDays,
  Clock3,
  Phone,
  MapPin,
  MessageCircle,
  ShieldCheck,
  ArrowRight,
  Check,
  CheckCircle2,
  IndianRupee
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Header, Eyebrow, Field } from "../components/UI";

export function BookPickup() {
  const { setPickups, rates, user } = useAuth();
  const navigate = useNavigate();
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    material: "Newspaper",
    quantity: "5–10 kg",
    date: "",
    time: "10:00 AM – 12:00 PM",
    address: "Hostel Road, Patna",
    phone: user?.phone || "+91 98765 43210",
    notes: ""
  });

  const update = (key, value) => setForm((x) => ({ ...x, [key]: value }));

  const rate =
    rates.find((r) =>
      form.material
        .toLowerCase()
        .includes(r.material.toLowerCase().split(" ")[0])
    )?.rate || 12;

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = "KC-" + Math.floor(2100 + Math.random() * 700);
    const newPickup = {
      id,
      material: form.material,
      weight: form.quantity,
      date: (form.date || "Tomorrow") + " · " + form.time,
      status: "Requested",
      amount: "To be confirmed",
      address: form.address
    };

    setPickups((prev) => [newPickup, ...prev]);
    setDone(true);
  };

  if (done) {
    return (
      <div className="page">
        <div className="glass confirm">
          <CheckCircle2 />
          <Eyebrow>REQUEST RECEIVED</Eyebrow>
          <h1>Your pickup is in motion.</h1>
          <p>
            Your request has been added to your local session history. A pickup
            partner can now view and confirm it in their workspace.
          </p>
          <button
            type="button"
            className="btn primary"
            onClick={() => navigate("/pickups")}
          >
            View my pickups <ArrowRight />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <Header
        eyebrow="CONVENIENT COLLECTION"
        heading="Book a pickup"
        desc="Tell us what you have. We’ll handle the rest."
      />
      <div className="booking-layout">
        <form className="glass booking-form" onSubmit={handleSubmit}>
          <div className="form-title">
            <i>01</i>
            <span>
              <b>What are we picking up?</b>
              <small>Select the materials you’d like to recycle.</small>
            </span>
          </div>
          <div className="materials">
            {[
              ["Newspaper", <BookOpen key="b" />, "Paper & books"],
              ["Cardboard", <Box key="c" />, "Boxes & cartons"],
              ["Plastic", <Recycle key="p" />, "Bottles & containers"],
              ["Metal", <Layers3 key="m" />, "Iron & aluminium"],
              ["E-waste", <Cpu key="e" />, "Small electronics"]
            ].map((m) => (
              <button
                type="button"
                key={m[0]}
                className={form.material === m[0] ? "chosen" : ""}
                onClick={() => update("material", m[0])}
              >
                {m[1]}
                <b>{m[0]}</b>
                <small>{m[2]}</small>
                {form.material === m[0] && (
                  <i>
                    <Check />
                  </i>
                )}
              </button>
            ))}
          </div>

          <hr />

          <div className="form-title">
            <i>02</i>
            <span>
              <b>Pickup details</b>
              <small>Choose a suitable time and tell us where to come.</small>
            </span>
          </div>

          <div className="form-grid">
            <Field label="Approximate quantity" icon={<Package />}>
              <select
                name="quantity"
                id="booking-quantity"
                value={form.quantity}
                onChange={(e) => update("quantity", e.target.value)}
              >
                <option>Under 5 kg</option>
                <option>5–10 kg</option>
                <option>10–20 kg</option>
                <option>20+ kg</option>
              </select>
            </Field>

            <Field label="Preferred date" icon={<CalendarDays />}>
              <input
                type="date"
                name="date"
                id="booking-date"
                required
                min={new Date().toISOString().slice(0, 10)}
                value={form.date}
                onChange={(e) => update("date", e.target.value)}
              />
            </Field>

            <Field label="Time slot" icon={<Clock3 />}>
              <select
                name="time"
                id="booking-time"
                value={form.time}
                onChange={(e) => update("time", e.target.value)}
              >
                <option>10:00 AM – 12:00 PM</option>
                <option>12:00 PM – 2:00 PM</option>
                <option>2:00 PM – 4:00 PM</option>
                <option>4:00 PM – 6:00 PM</option>
              </select>
            </Field>

            <Field label="Contact number" icon={<Phone />}>
              <input
                type="tel"
                name="phone"
                id="booking-phone"
                autoComplete="tel"
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
            </Field>

            <div className="full">
              <Field label="Pickup address" icon={<MapPin />}>
                <textarea
                  name="address"
                  id="booking-address"
                  autoComplete="street-address"
                  required
                  rows="2"
                  placeholder="House / flat, street, area, city"
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                />
              </Field>
            </div>

            <div className="full">
              <Field
                label="Notes for pickup partner (optional)"
                icon={<MessageCircle />}
              >
                <textarea
                  name="notes"
                  id="booking-notes"
                  rows="2"
                  placeholder="Landmark, sorting notes…"
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                />
              </Field>
            </div>
          </div>

          <div className="booking-footer">
            <span>
              <ShieldCheck /> No obligation. Final weight and rate confirmed at
              doorstep pickup.
            </span>
            <button className="btn primary large" type="submit">
              Request pickup <ArrowRight />
            </button>
          </div>
        </form>

        <aside className="aside-stack">
          <div className="glass aside-card">
            <div className="rate-head">
              <span className="cat-icon">
                <IndianRupee />
              </span>
              <small className="pill">RATE GUIDE</small>
            </div>
            <h3>Know your value.</h3>
            <p>Indicative rates help you estimate the value of your scrap.</p>
            <div className="rate-line">
              <span>{form.material}</span>
              <b>
                ₹{rate}
                <small> / kg</small>
              </b>
            </div>
            <p className="note">
              ⚡ Final amount depends on material quality and actual weight.
            </p>
            <Link className="text-link" to="/rates">
              View all scrap rates <ArrowRight />
            </Link>
          </div>

          <div className="glass aside-card">
            <h3>Before we arrive</h3>
            {[
              "Keep materials reasonably sorted",
              "Keep paper dry and away from rain",
              "Have your pickup reference ready"
            ].map((x) => (
              <p className="checkline" key={x}>
                <CheckCircle2 />
                {x}
              </p>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default BookPickup;

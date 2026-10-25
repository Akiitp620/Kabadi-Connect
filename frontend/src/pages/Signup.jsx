import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Mail,
  UserRound,
  Phone,
  ShieldCheck,
  Eye,
  EyeOff,
  AlertCircle,
  Package,
  Store,
  Building,
  MapPin
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Brand from "../components/Brand";
import { Eyebrow, Field } from "../components/UI";
import { signupUser } from "../api/auth.api";

export function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [role, setRole] = useState("seller"); // "seller" or "buyer"
  const [showPassword, setShowPassword] = useState(false);
  // const [loading , setLoading]=useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    businessName: "",
    city: ""
  });
  const [error, setError] = useState("");

  const updateField = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (error) setError("");
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // setLoading(true);

      const userData = {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        phone: form.phone.trim(),
        businessName: form.businessName.trim(),
        city: form.city.trim(),
        role,
      };

      // Send signup data to your Express backend using Axios
      const res = await signupUser(userData);

      console.log("Signup successful:", res);

      // Navigate only after the API request succeeds
      const target =
        role === "buyer"
          ? "/buyer/dashboard"
          : "/seller/dashboard";

      navigate(target, { replace: true });
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Signup failed. Please try again.";

      setError(message);
    } finally {
      // setLoading(false);
    }
  };
  return (
    <div className="auth">
      <aside className="auth-story">
        <Brand />
        <div>
          <Eyebrow>JOIN THE CIRCULAR ECONOMY</Eyebrow>
          <h1>
            Turn excess scrap
            <br />
            into liquid <em>capital.</em>
          </h1>
          <p>
            Whether you are selling warehouse cardboard or purchasing metric tons of metal, KabadiWala gives you verified partners and real-time prices.
          </p>
          <blockquote>
            “Creating an account took 30 seconds. We listed 400 kg of packaging boxes and had an authorized buyer pick it up the next morning.”
            <small>— Rajesh K. · Commercial Trader</small>
            <span className="stars">★★★★★</span>
          </blockquote>
        </div>
        <small>◈ Local storage session · Client-side demonstration only (not production security)</small>
      </aside>

      <div className="auth-side">
        <Link className="back" to="/">
          <ArrowRight /> Back to home
        </Link>
        <div className="auth-form">
          <div className="mobile-brand">
            <Brand />
          </div>
          <Eyebrow>START TRADING</Eyebrow>
          <h2>Create your account</h2>
          <p>Choose your primary role to access dedicated marketplace tools.</p>

          {/* Role Choice Switcher */}
          <div className="role-tabs">
            <button
              type="button"
              className={`role-tab ${role === "seller" ? "active" : ""}`}
              onClick={() => setRole("seller")}
            >
              <Package size={16} /> I Want to Sell Scrap
            </button>
            <button
              type="button"
              className={`role-tab ${role === "buyer" ? "active" : ""}`}
              onClick={() => setRole("buyer")}
            >
              <Store size={16} /> I Want to Buy Scrap
            </button>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <Field label="Full name / Representative" icon={<UserRound />}>
              <input
                type="text"
                name="name"
                id="auth-name"
                autoComplete="name"
                required
                placeholder="e.g. Sunil Sharma"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
              />
            </Field>

            <Field label="Business or Trading Name" icon={<Building />}>
              <input
                type="text"
                name="businessName"
                placeholder={role === "seller" ? "e.g. Sharma Scrap Traders" : "e.g. Bihar Polymer Recyclers"}
                value={form.businessName}
                onChange={(e) => updateField("businessName", e.target.value)}
              />
            </Field>

            <Field label="Email address" icon={<Mail />}>
              <input
                type="email"
                name="email"
                id="auth-email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
              />
            </Field>

            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "10px" }}>
              <Field label="Contact phone" icon={<Phone />}>
                <input
                  type="tel"
                  name="phone"
                  id="auth-phone"
                  autoComplete="tel"
                  required
                  placeholder="+91 98765 00000"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                />
              </Field>

              <Field label="City" icon={<MapPin />}>
                <input
                  type="text"
                  name="city"
                  placeholder="Patna"
                  value={form.city}
                  onChange={(e) => updateField("city", e.target.value)}
                />
              </Field>
            </div>

            <Field label="Password" icon={<ShieldCheck />}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="auth-password"
                autoComplete="new-password"
                required
                placeholder="At least 6 characters"
                value={form.password}
                onChange={(e) => updateField("password", e.target.value)}
              />
              <button
                type="button"
                className="reveal"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </Field>

            {error && (
              <div className="error" role="alert">
                <AlertCircle size={14} style={{ marginRight: 6, verticalAlign: "middle" }} />
                {error}
              </div>
            )}

            <button className="btn primary full" type="submit">
              Register as {role === "seller" ? "Seller" : "Buyer"} <ArrowRight />
            </button>

            <div className="safe" style={{ lineHeight: "1.4", padding: "4px 0" }}>
              <ShieldCheck style={{ flexShrink: 0 }} />
              <span>
                Frontend demonstration mode: Credentials and role states are managed via browser <code>localStorage</code>.
              </span>
            </div>
          </form>

          <div className="switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>
        <small className="copyright">
          © 2026 KabadiWala · Two-Role Scrap Marketplace
        </small>
      </div>
    </div>
  );
}

export default Signup;

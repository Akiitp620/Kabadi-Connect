import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  ArrowRight,
  Mail,
  ShieldCheck,
  Eye,
  EyeOff,
  AlertCircle,
  Package,
  Store
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Brand from "../components/Brand";
import { Eyebrow, Field } from "../components/UI";

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, demoUsers } = useAuth();

  // Selected role tab: "seller" | "buyer"
  const [selectedRole, setSelectedRole] = useState("seller");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "seller@kabadiwala.com",
    password: "password123"
  });
  const [error, setError] = useState("");

  const updateField = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (error) setError("");
  };

  const handleRoleTabChange = (role) => {
    setSelectedRole(role);
    if (role === "seller") {
      setForm({
        email: "seller@kabadiwala.com",
        password: "password123"
      });
    } else {
      setForm({
        email: "buyer@kabadiwala.com",
        password: "password123"
      });
    }
    setError("");
  };

  const fillDemoAccount = (demo) => {
    setSelectedRole(demo.role);
    setForm({
      email: demo.email,
      password: demo.password
    });
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const res = login({
      email: form.email,
      password: form.password,
      role: selectedRole
    });

    if (!res.success) {
      setError(res.error);
      return;
    }

    // Role-based target navigation with strict permission verification
    const userRole = res.user.role;
    const defaultDashboard =
      userRole === "buyer"
        ? "/buyer/dashboard"
        : userRole === "admin"
        ? "/admin"
        : userRole === "agent"
        ? "/agent"
        : "/seller/dashboard";

    const destination = location.state?.from?.pathname;
    let target = defaultDashboard;

    if (destination) {
      const isRolePermitted =
        (userRole === "seller" && (destination.startsWith("/seller") || destination.startsWith("/listings") || destination.startsWith("/pickups"))) ||
        (userRole === "buyer" && (destination.startsWith("/buyer") || destination.startsWith("/marketplace") || destination.startsWith("/orders") || destination.startsWith("/scrap"))) ||
        (userRole === "admin" && destination.startsWith("/admin")) ||
        (userRole === "agent" && destination.startsWith("/agent"));

      if (isRolePermitted) {
        target = destination;
      }
    }

    navigate(target, { replace: true });
  };

  return (
    <div className="auth">
      <aside className="auth-story">
        <Brand />
        <div>
          <Eyebrow>B2B SCRAP TRADING ECOSYSTEM</Eyebrow>
          <h1>
            Connect directly.
            <br />
            Trade scrap with <em>transparency.</em>
          </h1>
          <p>
            The two-role marketplace bridging industrial scrap sellers, households, and authorized recyclers across India.
          </p>
          <blockquote>
            “As a scrap dealer, having verified weight slips and direct access to factory cardboard and copper saves us 10+ hours every week.”
            <small>— Vikram P. · Industrial Recycler</small>
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
          <Eyebrow>MARKETPLACE ACCESS</Eyebrow>
          <h2>Sign in to KabadiWala</h2>
          <p>Select your marketplace account role to continue.</p>

          {/* Role Selection Tabs */}
          <div className="role-tabs">
            <button
              type="button"
              className={`role-tab ${selectedRole === "seller" ? "active" : ""}`}
              onClick={() => handleRoleTabChange("seller")}
            >
              <Package size={16} /> Seller Login
            </button>
            <button
              type="button"
              className={`role-tab ${selectedRole === "buyer" ? "active" : ""}`}
              onClick={() => handleRoleTabChange("buyer")}
            >
              <Store size={16} /> Buyer / Dealer Login
            </button>
          </div>

          <form onSubmit={handleSubmit} noValidate>
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

            <Field label="Password" icon={<ShieldCheck />}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="auth-password"
                autoComplete="current-password"
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

            <div className="between">
              <label>
                <input type="checkbox" defaultChecked /> Remember me
              </label>
              <Link to="/forgot-password">Forgot password?</Link>
            </div>

            {error && (
              <div className="error" role="alert">
                <AlertCircle size={14} style={{ marginRight: 6, verticalAlign: "middle" }} />
                {error}
              </div>
            )}

            <button className="btn primary full" type="submit">
              Sign in as {selectedRole === "seller" ? "Seller" : "Buyer"} <ArrowRight />
            </button>

            {/* Quick Demo Credentials Helper */}
            <div className="demo-helper">
              <div className="demo-helper-title">
                <span>1-CLICK DEMO ACCOUNTS</span>
                <small>Click to auto-fill</small>
              </div>
              <div className="demo-chips">
                {demoUsers.map((demo) => (
                  <button
                    key={demo.id}
                    type="button"
                    className="demo-chip"
                    onClick={() => fillDemoAccount(demo)}
                    title={`Fill ${demo.name} (${demo.role})`}
                  >
                    <span className="demo-badge">{demo.role}</span>
                    <span>{demo.name.split(" ")[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Demo Notice */}
            <div className="safe" style={{ lineHeight: "1.4", padding: "4px 0" }}>
              <ShieldCheck style={{ flexShrink: 0 }} />
              <span>
                Demonstration mode: Authentication is simulated locally via <code>localStorage</code> without a backend server.
              </span>
            </div>
          </form>

          <div className="switch">
            New to KabadiWala? <Link to="/signup">Register as Seller or Buyer</Link>
          </div>
        </div>
        <small className="copyright">
          © 2026 KabadiWala · Two-Sided Scrap Marketplace
        </small>
      </div>
    </div>
  );
}

export default Login;

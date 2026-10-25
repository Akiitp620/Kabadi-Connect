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
  Store,
} from "lucide-react";

import Brand from "../components/Brand";
import { Eyebrow, Field } from "../components/UI";
import { userLogin } from "../api/auth.api";
import { useAuth } from "../context/AuthContext";

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [selectedRole, setSelectedRole] = useState("seller");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const updateField = (key, value) => {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));

    if (error) setError("");
  };

  const handleRoleTabChange = (role) => {
    setSelectedRole(role);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.email.trim() || !form.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await userLogin({
        email: form.email.trim(),
        password: form.password,
        role: selectedRole,
      });

      // Supports either a full Axios response or response.data.
      const data = response?.data ?? response;
      const user = data?.user;
      const token = data?.token;

      if (!user) {
        setError(data?.message || "Login failed. User data was not returned.");
        return;
      }

      if (user.role !== selectedRole) {
        setError("Your account does not match the selected role.");
        return;
      }

      // Save the backend session.
      if (token) {
        localStorage.setItem("token", token);
      }

      localStorage.setItem("user", JSON.stringify(user));

      // Update the application's authentication context.
      // This assumes AuthContext.login accepts a user object.
      if (typeof login === "function") {
        login(user);
      }

      const defaultDashboard =
        user.role === "buyer"
          ? "/buyer/dashboard"
          : user.role === "admin"
            ? "/admin"
            : user.role === "agent"
              ? "/agent"
              : "/seller/dashboard";

      const requestedPath = location.state?.from?.pathname;

      const permittedPath =
        requestedPath &&
        (
          (user.role === "seller" &&
            ["/seller", "/listings", "/pickups"].some(
              (path) =>
                requestedPath === path ||
                requestedPath.startsWith(`${path}/`)
            )) ||
          (user.role === "buyer" &&
            ["/buyer", "/marketplace", "/orders", "/scrap"].some(
              (path) =>
                requestedPath === path ||
                requestedPath.startsWith(`${path}/`)
            )) ||
          (user.role === "admin" &&
            (requestedPath === "/admin" ||
              requestedPath.startsWith("/admin/"))) ||
          (user.role === "agent" &&
            (requestedPath === "/agent" ||
              requestedPath.startsWith("/agent/")))
        );

      const target = permittedPath ? requestedPath : defaultDashboard;

      navigate(target, { replace: true });
    } catch (err) {
      console.error("Login error:", err.response?.data || err);

      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Unable to log in. Please try again."
      );
    } finally {
      setLoading(false);
    }
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
            The two-role marketplace bridging industrial scrap sellers,
            households, and authorized recyclers across India.
          </p>

          <blockquote>
            “As a scrap dealer, having verified weight slips and direct access
            to factory cardboard and copper saves us 10+ hours every week.”
            <small>— Vikram P. · Industrial Recycler</small>
            <span className="stars">★★★★★</span>
          </blockquote>
        </div>

        <small>◈ Secure marketplace access</small>
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

          <div className="role-tabs">
            <button
              type="button"
              className={`role-tab ${
                selectedRole === "seller" ? "active" : ""
              }`}
              onClick={() => handleRoleTabChange("seller")}
              disabled={loading}
            >
              <Package size={16} /> Seller Login
            </button>

            <button
              type="button"
              className={`role-tab ${
                selectedRole === "buyer" ? "active" : ""
              }`}
              onClick={() => handleRoleTabChange("buyer")}
              disabled={loading}
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
                onChange={(event) =>
                  updateField("email", event.target.value)
                }
                disabled={loading}
              />
            </Field>

            <Field label="Password" icon={<ShieldCheck />}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="auth-password"
                autoComplete="current-password"
                required
                placeholder="Enter your password"
                value={form.password}
                onChange={(event) =>
                  updateField("password", event.target.value)
                }
                disabled={loading}
              />

              <button
                type="button"
                className="reveal"
                onClick={() => setShowPassword((previous) => !previous)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={loading}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </Field>

            <div className="between">
              <label>
                <input type="checkbox" defaultChecked />
                Remember me
              </label>

              <Link to="/forgot-password">Forgot password?</Link>
            </div>

            {error && (
              <div className="error" role="alert">
                <AlertCircle
                  size={14}
                  style={{
                    marginRight: 6,
                    verticalAlign: "middle",
                  }}
                />
                {error}
              </div>
            )}

            <button
              className="btn primary full"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Signing in..."
                : `Sign in as ${
                    selectedRole === "seller" ? "Seller" : "Buyer"
                  }`}
              {!loading && <ArrowRight />}
            </button>
          </form>

          <div className="safe" style={{ lineHeight: "1.4", padding: "8px 0" }}>
            <ShieldCheck style={{ flexShrink: 0 }} />
            <span>
              Sign in with your registered KabadiWala account.
            </span>
          </div>

          <div className="switch">
            New to KabadiWala?{" "}
            <Link to="/signup">Register as Seller or Buyer</Link>
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

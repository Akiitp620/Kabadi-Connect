import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Mail, CheckCircle2 } from "lucide-react";
import { Eyebrow, Field } from "../components/UI";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="forgot">
      <Link to="/" className="back">
        <ArrowRight /> Back to home
      </Link>
      <div className="glass forgot-card">
        <span className="cat-icon">
          <Mail />
        </span>
        <Eyebrow>ACCOUNT RECOVERY</Eyebrow>
        <h1>Forgot your password?</h1>
        <p>
          Enter the email address associated with your account and we’ll show you
          the next step.
        </p>
        {sent ? (
          <div className="notice">
            <CheckCircle2 /> Demo password reset link simulated. You can return
            to sign in with any demo credentials.
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <Field label="Email address" icon={<Mail />}>
              <input
                type="email"
                name="email"
                id="forgot-email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>
            <button className="btn primary full" type="submit">
              Continue <ArrowRight />
            </button>
          </form>
        )}
        <div className="switch">
          <Link to="/login">Return to sign in</Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;

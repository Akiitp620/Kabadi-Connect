import React from "react";
import { Link } from "react-router-dom";
import Brand from "./Brand";

export function Footer() {
  return (
    <footer className="footer">
      <Brand />
      <span>© 2026 KabadiWala. Built for a cleaner tomorrow.</span>
      <div>
        <a href="#how">How it works</a>
        <Link to="/login">Sign in</Link>
      </div>
    </footer>
  );
}

export default Footer;

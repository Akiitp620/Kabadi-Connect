import React from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";

export function NotFound() {
  return (
    <div className="page">
      <div className="glass confirm">
        <Search size={45} />
        <h1>We couldn’t find that page.</h1>
        <p>The page may have moved or the link may be incorrect.</p>
        <Link className="btn primary" to="/dashboard">
          Go to overview <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export default NotFound;

import React from "react";
import { Link } from "react-router-dom";
import { Recycle } from "lucide-react";

export function Brand({ onClick }) {
  return (
    <Link to="/" className="brand" onClick={onClick}>
      <span className="brand-mark">
        <Recycle />
      </span>
      <span>
        Kabadi<span className="green">Wala</span>
        <small>RECYCLING, REIMAGINED</small>
      </span>
    </Link>
  );
}

export default Brand;

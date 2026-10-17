import React from "react";

export function Eyebrow({ children }) {
  return (
    <div className="eyebrow">
      <i />
      {children}
    </div>
  );
}

export function Header({ eyebrow, heading, desc, action }) {
  return (
    <div className="page-head">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>{heading}</h1>
        <p>{desc}</p>
      </div>
      {action && <div className="head-action">{action}</div>}
    </div>
  );
}

export function Section({ title, sub, action }) {
  return (
    <div className="section-head">
      <div>
        <h2>{title}</h2>
        {sub && <p>{sub}</p>}
      </div>
      {action}
    </div>
  );
}

export function Stat({ icon, label, value, delta, note, tone = "" }) {
  return (
    <div className="glass stat">
      <span className={"stat-icon " + tone}>{icon}</span>
      <div className="stat-label">{label}</div>
      <strong>{value}</strong>
      <small>
        <b>{delta}</b> {note}
      </small>
    </div>
  );
}

export function Badge({ status }) {
  const norm = (status || "").toLowerCase();
  return (
    <span className={"badge " + norm}>
      <i />
      {status}
    </span>
  );
}

export function Field({ label, icon, children }) {
  return (
    <label className="field">
      <span>{label}</span>
      <div className="inputbox">
        {icon}
        {children}
      </div>
    </label>
  );
}

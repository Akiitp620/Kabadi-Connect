import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Recycle,
  MessageCircle
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Header, Section, Badge } from "../components/UI";

export function PickupDetails() {
  const { pickups, setPickups } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const p = pickups.find((x) => x.id === id);

  if (!p) {
    return (
      <div className="page">
        <Header
          eyebrow="PICKUP DETAILS"
          heading="Pickup not found"
          desc="This pickup may have been removed or does not exist in local demo data."
          action={
            <Link className="btn ghost" to="/pickups">
              Back to pickups
            </Link>
          }
        />
      </div>
    );
  }

  const activeStep =
    p.status === "Completed"
      ? 4
      : p.status === "Confirmed"
      ? 2
      : p.status === "Cancelled"
      ? 0
      : 1;

  const handleCancel = () => {
    setPickups((list) =>
      list.map((x) => (x.id === p.id ? { ...x, status: "Cancelled" } : x))
    );
  };

  return (
    <div className="page">
      <button
        type="button"
        className="back"
        onClick={() => navigate("/pickups")}
      >
        <ArrowRight size={16} /> Back to all pickups
      </button>

      <Header
        eyebrow={"PICKUP REFERENCE · " + p.id}
        heading="Pickup details"
        desc="Review the collection details and current progress."
        action={<Badge status={p.status} />}
      />

      <div className="details-grid">
        <div className="glass panel">
          <Section title="Pickup progress" sub="Your request at a glance" />
          <div className="timeline">
            {[
              "Request created",
              "Partner assigned",
              "Collection",
              "Completed"
            ].map((s, i) => {
              const isDone = i < activeStep;
              return (
                <div
                  className={isDone ? "timeline-row done" : "timeline-row"}
                  key={s}
                >
                  <i>{isDone ? <Check size={15} /> : i + 1}</i>
                  <span>
                    <b>{s}</b>
                    <small>
                      {[
                        "Your pickup request has been recorded.",
                        "A pickup partner will confirm the schedule.",
                        "Materials are weighed and verified.",
                        "Pickup is marked as completed."
                      ][i]}
                    </small>
                  </span>
                  <em>{isDone ? "Updated" : "Pending"}</em>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass panel">
          <Section title="Pickup summary" />
          <div className="summary-material">
            <Recycle size={40} />
            <span>
              <b>{p.material}</b>
              <small>{p.weight}</small>
            </span>
          </div>

          {[
            ["Pickup ID", p.id],
            ["Scheduled for", p.date],
            ["Pickup address", p.address],
            ["Estimated amount", p.amount]
          ].map((r) => (
            <div className="pair" key={r[0]}>
              <span>{r[0]}</span>
              <b>{r[1]}</b>
            </div>
          ))}

          {!["Completed", "Cancelled"].includes(p.status) && (
            <button
              type="button"
              className="btn ghost full"
              onClick={handleCancel}
              style={{ marginTop: 15 }}
            >
              Cancel demo request
            </button>
          )}

          <p className="fineprint">
            <MessageCircle size={16} /> Status changes update your client-side demo state immediately.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PickupDetails;

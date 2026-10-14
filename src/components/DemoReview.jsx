import { useState } from "react";
import { ApplicationSummary } from "./MembershipSection";

export default function DemoReview({ store }) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(store.state.lastSubmittedId);
  const [note, setNote] = useState(
    store.state.applications.find((a) => a.id === store.state.lastSubmittedId)
      ?.reviewNote ?? "",
  );
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [resetConfirm, setResetConfirm] = useState(false);
  const applications = store.state.applications;
  const selected = applications.find((a) => a.id === selectedId);
  const visible = applications.filter(
    (a) =>
      (filter === "all" || a.status === filter) &&
      `${a.fullName} ${a.email} ${a.id}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  function review(status) {
    try {
      store.review(selected.id, status, note);
      setMessage(`Application ${selected.id} is now ${status}.`);
      setError("");
    } catch (err) {
      setError(err.message);
      setMessage("");
    }
  }
  function reset() {
    try {
      store.reset();
      setSelectedId(null);
      setNote("");
      setMessage("Demo data and draft cleared from this device.");
      setResetConfirm(false);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }
  return (
    <div className="review-screen">
      <p className="notice">
        Demo reviewer view · Changes apply only to this browser’s sample
        applications. This screen has no real club admin permissions.
      </p>
      <div className="review-stats">
        {["pending", "approved", "rejected"].map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setFilter(status)}
            className={`review-stat ${filter === status ? "selected" : ""}`}
          >
            <strong>
              {applications.filter((a) => a.status === status).length}
            </strong>
            <span>{status[0].toUpperCase() + status.slice(1)}</span>
          </button>
        ))}
      </div>
      <div className="review-controls">
        <label>
          Search applications
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Name, email or reference"
          />
        </label>
        <label>
          Status
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All applications</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </label>
      </div>
      {message && (
        <p role="status" className="success-message">
          {message}
        </p>
      )}
      {(error || store.error) && (
        <p role="alert" className="error-summary">
          {error || store.error}
        </p>
      )}
      <div className="review-layout">
        <div className="review-list">
          {visible.length ? (
            visible.map((a) => (
              <button
                type="button"
                key={a.id}
                className={`review-row ${selectedId === a.id ? "selected" : ""}`}
                onClick={() => {
                  setSelectedId(a.id);
                  setNote(a.reviewNote);
                  setMessage("");
                  setError("");
                }}
              >
                <span>
                  <strong>{a.fullName}</strong>
                  <small>
                    {a.id} · {a.plan}
                  </small>
                </span>
                <span className={`status-pill status-${a.status}`}>
                  {a.status}
                </span>
              </button>
            ))
          ) : (
            <p className="empty-state">
              {applications.length
                ? "No applications match this filter."
                : "No demo applications yet. Close this screen and apply to join."}
            </p>
          )}
        </div>
        <div className="review-detail">
          {selected ? (
            <>
              <div className="status-card-heading">
                <h3>{selected.fullName}</h3>
                <span className={`status-pill status-${selected.status}`}>
                  {selected.status}
                </span>
              </div>
              <p className="draft-note">{selected.id} · Demo application</p>
              <ApplicationSummary application={selected} />
              <label className="field">
                Reviewer note (optional)
                <textarea
                  id="review-note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  maxLength={500}
                  rows={3}
                  placeholder="Add a short note for the applicant"
                />
              </label>
              <div className="review-actions">
                <button
                  className="dark-button"
                  type="button"
                  onClick={() => review("approved")}
                  disabled={selected.status === "approved"}
                >
                  Approve
                </button>
                <button
                  className="outline-dark-button"
                  type="button"
                  onClick={() => review("rejected")}
                  disabled={selected.status === "rejected"}
                >
                  Reject
                </button>
                <button
                  className="outline-dark-button"
                  type="button"
                  onClick={() => review(selected.status)}
                  disabled={note.trim() === selected.reviewNote}
                >
                  Save note
                </button>
                <button
                  className="text-button"
                  type="button"
                  onClick={() => review("pending")}
                  disabled={selected.status === "pending"}
                >
                  Return to pending
                </button>
              </div>
            </>
          ) : (
            <p className="empty-state">
              Select an application to review its details.
            </p>
          )}
        </div>
      </div>
      <div className="review-reset">
        {resetConfirm ? (
          <>
            <p>Delete all applications and the saved draft on this device?</p>
            <button type="button" className="danger-button" onClick={reset}>
              Yes, clear demo data
            </button>
            <button
              type="button"
              className="text-button"
              onClick={() => setResetConfirm(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            type="button"
            className="text-button"
            onClick={() => setResetConfirm(true)}
          >
            Reset demo
          </button>
        )}
      </div>
    </div>
  );
}

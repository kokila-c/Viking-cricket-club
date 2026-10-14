import { useState } from "react";
import fixtures from "../data/fixtures";

export default function FixturesSection() {
  const [filter, setFilter] = useState("all");
  const visible = fixtures.filter((f) => filter === "all" || f.kind === filter);
  return (
    <section
      className="fixtures-section"
      id="fixtures"
      aria-labelledby="fixtures-title"
    >
      <div className="fixtures-header">
        <div>
          <p className="eyebrow">MATCHDAY</p>
          <h2 id="fixtures-title">Around the boundary.</h2>
          <p className="fixtures-intro">
            Explore the fixture and results view.
          </p>
        </div>
        <span className="small-tag">SAMPLE SCHEDULE</span>
      </div>
      <div className="filter-buttons" role="group" aria-label="Filter fixtures">
        {[
          ["all", "All matches"],
          ["upcoming", "Upcoming"],
          ["result", "Results"],
        ].map(([value, label]) => (
          <button
            type="button"
            key={value}
            aria-pressed={filter === value}
            onClick={() => setFilter(value)}
          >
            {label}
          </button>
        ))}
      </div>
      <p className="content-note">
        Illustrative fixtures and scores for this portfolio. Check with the club
        for the confirmed schedule.
      </p>
      <div className="fixtures-list" aria-live="polite">
        {visible.map((f) => (
          <article className="fixture-row" key={f.id}>
            <div className="fixture-date">
              <small>{f.kind === "result" ? "RESULT" : "UPCOMING"}</small>
              <strong>{f.date}</strong>
            </div>
            <div className="fixture-match">
              <div className="fixture-teams">
                <strong>{f.homeTeam}</strong>
                <span className="fixture-vs">VS</span>
                <strong>{f.awayTeam}</strong>
              </div>
              <p>
                {f.venue} · {f.competition}
              </p>
            </div>
            <div className="fixture-time">
              {f.kind === "result" ? (
                <>
                  <strong>{f.score}</strong>
                  <small>{f.result}</small>
                </>
              ) : (
                <>
                  <strong>{f.time}</strong>
                  <small>Local time · Norway</small>
                </>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

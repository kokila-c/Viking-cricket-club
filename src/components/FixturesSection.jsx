import fixtures from "../data/fixtures";

function FixturesSection() {
  return (
    <section className="fixtures-section" id="fixtures">
      <div className="fixtures-header">
        <div>
          <p className="eyebrow">MATCHDAY</p>
          <h2>Upcoming Fixtures</h2>
          <p className="fixtures-intro">
            Follow Viking Cricket Club and see what's coming up next.
          </p>
        </div>

        <a href="#fixtures" className="fixtures-view-all">
          View All Fixtures →
        </a>
      </div>

      <div className="fixtures-list">
        {fixtures.map((fixture) => (
          <article className="fixture-row" key={fixture.id}>
            <div className="fixture-date">
              <span>{fixture.date}</span>
            </div>

            <div className="fixture-match">
              <div className="fixture-teams">
                <strong>{fixture.homeTeam}</strong>

                <span className="fixture-vs">VS</span>

                <strong>{fixture.awayTeam}</strong>
              </div>

              <p>
                {fixture.venue} · {fixture.competition}
              </p>
            </div>

            <div className="fixture-time">{fixture.time}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default FixturesSection;

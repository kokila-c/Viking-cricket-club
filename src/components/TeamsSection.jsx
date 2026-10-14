import teams from "../data/teams";
import CricketIllustration from "./CricketIllustration";

export default function TeamsSection({ onJoin, onDetails }) {
  return (
    <section className="teams-section" id="teams" aria-labelledby="teams-title">
      <div className="teams-header">
        <p className="eyebrow">OUR TEAMS</p>
        <h2 id="teams-title">Cricket for Everyone</h2>
        <p>
          From competitive cricket to learning the game, there’s a team and a
          community for every stage of your journey.
        </p>
      </div>
      <div className="teams-grid">
        {teams.map((team, i) => (
          <article className="team-card" key={team.id}>
            <div className="team-art">
              <span className="team-number">0{i + 1}</span>
              <CricketIllustration
                scene={i === 1 ? "ball" : i === 2 ? "community" : "wicket"}
              />
              <span className="art-caption">
                {
                  [
                    "TRAIN · COMPETE · EXCEL",
                    "STRONGER TOGETHER",
                    "PLAY · LEARN · GROW",
                  ][i]
                }
              </span>
            </div>
            <div className="team-card-content">
              <h3>{team.name}</h3>
              <p>{team.description}</p>
              <div className="team-actions">
                <button
                  type="button"
                  className="team-link"
                  onClick={() => onDetails(team)}
                >
                  About this team ↗
                </button>
                <a
                  href="#membership"
                  className="team-link"
                  onClick={() => onJoin(team.name)}
                >
                  Join this team →
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
      <p className="social-cricket-note">
        Here for a friendly game?{" "}
        <a href="#membership" onClick={() => onJoin("Social Cricket")}>
          Explore social cricket →
        </a>
      </p>
    </section>
  );
}

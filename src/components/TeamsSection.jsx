import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

function TeamsSection() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const teamsQuery = query(collection(db, "teams"), orderBy("order", "asc"));

    const unsubscribe = onSnapshot(teamsQuery, (snapshot) => {
      const teamsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTeams(teamsData);
    });

    return () => unsubscribe();
  }, []);
  return (
    <section className="teams-section" id="teams">
      <div className="teams-header">
        <p className="eyebrow">OUR TEAMS</p>
        <h2>Cricket for Everyone</h2>
        <p>
          From competitive cricket to learning the game, Viking Cricket Club
          offers opportunities for players of different ages and experience
          levels.
        </p>
      </div>

      <div className="teams-grid">
        {teams.map((team) => (
          <article className="team-card" key={team.id}>
            <div className="team-image-placeholder">
              <span>{team.name}</span>
            </div>

            <div className="team-card-content">
              <h3>{team.name}</h3>
              <p>{team.description}</p>

              <a href="#contact" className="team-link">
                Learn More →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default TeamsSection;

import sponsors from "../data/sponsors";

function SponsorsSection() {
  return (
    <section className="sponsors-section" id="sponsors">
      <div className="sponsors-container">
        <div className="sponsors-heading">
          <p className="section-eyebrow">OUR PARTNERS</p>
          <h2>Backing the Game</h2>
          <p>
            Proudly supported by partners who help Viking Cricket Club grow on
            and off the field.
          </p>
        </div>

        <div className="sponsors-grid">
          {sponsors.map((sponsor) => (
            <div className="sponsor-card" key={sponsor.id}>
              <div className="sponsor-logo-placeholder">Sponsor Logo</div>

              <h3>{sponsor.name}</h3>
              <span>{sponsor.level}</span>
            </div>
          ))}
        </div>

        <div className="become-sponsor">
          <p>Interested in supporting Viking Cricket Club?</p>
          <a href="#contact">Become a Sponsor →</a>
        </div>
      </div>
    </section>
  );
}

export default SponsorsSection;

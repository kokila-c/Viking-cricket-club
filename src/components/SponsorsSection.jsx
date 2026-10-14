export default function SponsorsSection() {
  return (
    <section className="sponsors-section" id="sponsors">
      <div className="sponsors-container">
        <div className="sponsors-heading">
          <p className="section-eyebrow">OUR PARTNERS</p>
          <h2>Backing the Game</h2>
          <p>
            Help create more opportunities for cricket, connection and community
            in Stavanger.
          </p>
        </div>
        <div className="partner-grid">
          <article>
            <span>01 / DEVELOPMENT</span>
            <h3>Grow the game</h3>
            <p>
              Support equipment, training and the next generation of players.
            </p>
          </article>
          <article>
            <span>02 / COMMUNITY</span>
            <h3>Bring people together</h3>
            <p>Be part of a welcoming local sporting community.</p>
          </article>
          <article>
            <span>03 / OPPORTUNITY</span>
            <h3>Make a difference</h3>
            <p>
              Talk to the club about a partnership that fits your organisation.
            </p>
          </article>
        </div>
        <div className="become-sponsor">
          <p>Interested in supporting Viking Cricket Club?</p>
          <a href="#contact">Get in touch →</a>
        </div>
        <p className="content-note">
          Partner logos will be added when confirmed by the club.
        </p>
      </div>
    </section>
  );
}

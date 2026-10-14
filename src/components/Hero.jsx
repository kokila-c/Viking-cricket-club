function Hero() {
  return (
    <>
      <section className="hero" id="home">
        <div className="hero-left">
          <p className="eyebrow">MORE THAN A GAME</p>

          <h1>
            VIKING
            <span>CRICKET CLUB</span>
          </h1>

          <h2>Play · Learn · Belong</h2>

          <p className="hero-text">
            A welcoming cricket community in Stavanger for all ages and
            backgrounds. On and off the field, we grow together.
          </p>

          <div className="hero-buttons">
            <a href="#membership" className="primary-button">
              Join Our Club →
            </a>
            <a href="#about" className="secondary-button">
              Discover Viking ↗
            </a>
          </div>
        </div>

        <div className="hero-right">
          <img
            src={`${import.meta.env.BASE_URL}hero-lineart.png`}
            alt="Cricket batsman illustration"
            className="hero-image"
            width="245"
            height="168"
          />
        </div>
      </section>

      <section className="benefits" aria-label="Our club values">
        <div>
          <strong>Inclusive</strong>
          <span>All are welcome</span>
        </div>

        <div>
          <strong>Development</strong>
          <span>Learn. Improve. Excel.</span>
        </div>

        <div>
          <strong>Community</strong>
          <span>Friendships for life</span>
        </div>

        <div>
          <strong>Opportunities</strong>
          <span>Local & international</span>
        </div>
      </section>
    </>
  );
}

export default Hero;

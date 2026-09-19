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
            <a href="#contact" className="primary-button">
              Join Our Club →
            </a>
            <button className="secondary-button">Watch Our Story</button>
          </div>
        </div>

        <div className="hero-right">
          <img
            src="/hero-lineart.png"
            alt="Cricket batsman illustration"
            className="hero-image"
          />
        </div>
      </section>

      <section className="benefits">
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

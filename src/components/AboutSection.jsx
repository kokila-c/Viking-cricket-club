function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="about-content">
        <p className="eyebrow dark-text">ABOUT VIKING</p>

        <h2>A Club for Everyone</h2>

        <p>
          Viking Cricket Club is a welcoming cricket community in Stavanger,
          bringing together players of all ages, backgrounds and experience
          levels.
        </p>

        <p>
          Whether you want to compete, learn the game, make friends or simply be
          part of the cricket community, there is a place for you here.
        </p>

        <a className="about-button" href="#teams">
          Discover Our Club →
        </a>
      </div>

      <div className="about-image">
        <figure className="about-community">
          <img
            src={`${import.meta.env.BASE_URL}about-community-lineart.png`}
            alt="Off-white cricket line art of adults encouraging two children on a navy background"
            width="1448"
            height="1086"
            loading="lazy"
            decoding="async"
          />
          <figcaption>Community cricket · Prototype illustration</figcaption>
        </figure>
      </div>

      <div className="about-quote">
        <p>
          “Different People.
          <br />
          Same Passion.”
        </p>
      </div>
    </section>
  );
}

export default AboutSection;

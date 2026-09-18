function JoinSection() {
  return (
    <section className="join-section" id="contact">
      <div className="join-container">
        <p className="section-eyebrow">JOIN VIKING</p>

        <h2>Ready to Play?</h2>

        <p className="join-intro">
          Whether you're an experienced player or completely new to cricket,
          there's a place for you at Viking Cricket Club.
        </p>

        <div className="join-options">
          <div className="join-option">
            <span>01</span>
            <h3>Join the Club</h3>
            <p>
              Become part of Viking Cricket Club and play, learn and grow with
              our cricket community.
            </p>
          </div>

          <div className="join-option">
            <span>02</span>
            <h3>Try Cricket</h3>
            <p>
              New to cricket? Come along to a training session and experience
              the game before joining.
            </p>
          </div>

          <div className="join-option">
            <span>03</span>
            <h3>Get in Touch</h3>
            <p>
              Have questions about teams, training or membership? We'd be happy
              to hear from you.
            </p>
          </div>
        </div>

        <a className="join-contact-button" href="mailto:YOUR-CLUB-EMAIL">
          Contact Us →
        </a>
      </div>
    </section>
  );
}

export default JoinSection;

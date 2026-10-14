import { demoContact } from "../data/contact";

export default function JoinSection({ onDemoContact }) {
  return (
    <section
      className="contact-section"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="contact-container">
        <div>
          <p className="section-eyebrow">LET’S TALK CRICKET</p>
          <h2 id="contact-title">See you at the boundary.</h2>
          <p>
            Questions about joining, trying cricket or supporting the club?
            Explore the contact experience and find your place in the game.
          </p>
          <p className="contact-demo-label">
            Portfolio demo · Contact details below are fictional.
          </p>
        </div>
        <div className="contact-details">
          <button
            type="button"
            className="contact-card"
            onClick={() => onDemoContact("email")}
          >
            <small>DEMO EMAIL</small>
            <strong>{demoContact.email} ↗</strong>
          </button>
          <button
            type="button"
            className="contact-card"
            onClick={() => onDemoContact("phone")}
          >
            <small>DEMO PHONE</small>
            <strong>{demoContact.phone} ↗</strong>
          </button>
          <p>Stavanger, Norway · All ages and experience levels welcome.</p>
          <a href="#membership" className="primary-button">
            Explore membership →
          </a>
        </div>
      </div>
    </section>
  );
}

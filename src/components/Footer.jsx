export default function Footer({ onPrivacy, onReview }) {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <a className="footer-brand" href="#home">
            <img
              src={`${import.meta.env.BASE_URL}viking-logo-transparent.png`}
              alt="Viking Cricket Club"
              className="footer-logo"
              width="76"
              height="58"
            />
            <div>
              <h3>Viking Cricket Club</h3>
              <p>Play · Learn · Belong</p>
            </div>
          </a>
          <p className="footer-motto">
            Different People.
            <br />
            Same Passion.
          </p>
        </div>
        <div className="footer-links">
          <div>
            <h4>Club</h4>
            <a href="#about">About</a>
            <a href="#teams">Teams</a>
            <a href="#fixtures">Fixtures & results</a>
            <a href="#news">News</a>
          </div>
          <div>
            <h4>Get involved</h4>
            <a href="#membership">Membership</a>
            <a href="#gallery">Gallery</a>
            <a href="#sponsors">Partners</a>
            <a href="#contact">Contact</a>
          </div>
          <div>
            <h4>Portfolio demo</h4>
            <button type="button" onClick={onReview}>
              Review applications
            </button>
            <button type="button" onClick={onPrivacy}>
              Demo privacy notice
            </button>
            <span>Browser-local demo data</span>
            <span>Built by Kokila Chandramohan</span>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Viking Cricket Club · Portfolio prototype</p>
          <p>Stavanger, Norway · Version 1</p>
        </div>
      </div>
    </footer>
  );
}

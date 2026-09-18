function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <img
            src="/viking-logo.png"
            alt="Viking Cricket Club"
            className="footer-logo"
          />

          <div>
            <h3>Viking Cricket Club</h3>
            <p>Play · Learn · Belong</p>
          </div>
        </div>

        <div className="footer-links">
          <div>
            <h4>Club</h4>
            <a href="#about">About</a>
            <a href="#teams">Teams</a>
            <a href="#fixtures">Fixtures</a>
            <a href="#news">News</a>
          </div>

          <div>
            <h4>Get Involved</h4>
            <a href="#contact">Membership</a>
            <a href="#contact">Join Us</a>
            <a href="#sponsors">Sponsors</a>
            <a href="#contact">Contact</a>
          </div>

          <div>
            <h4>Follow Us</h4>
            <span>Facebook</span>
            <span>Instagram</span>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Viking Cricket Club. All rights reserved.</p>
          <p>Stavanger, Norway</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

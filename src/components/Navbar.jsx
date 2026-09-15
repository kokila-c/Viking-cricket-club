function Navbar() {
  return (
    <header className="navbar">
      <div className="logo-area">
        <img
          src="/viking-logo.png"
          alt="Viking Cricket Club logo"
          className="club-logo"
        />

        <div>
          <p className="club-name">Viking Cricket Club</p>
          <span className="club-tagline">Play · Learn · Belong</span>
        </div>
      </div>

      <nav className="nav-links">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#teams">Teams</a>
        <a href="#fixtures">Fixtures</a>
        <a href="#news">News</a>
        <a href="#membership">Membership</a>
        <a href="#gallery">Gallery</a>
        <a href="#contact">Contact</a>
      </nav>

      <a className="join-button" href="#membership">
        Join Us
      </a>
    </header>
  );
}

export default Navbar;

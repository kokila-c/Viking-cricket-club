import { useEffect, useRef, useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navbarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="navbar" ref={navbarRef}>
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

      <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
        <a href="#home" onClick={() => setMenuOpen(false)}>
          Home
        </a>
        <a href="#about" onClick={() => setMenuOpen(false)}>
          About
        </a>
        <a href="#teams" onClick={() => setMenuOpen(false)}>
          Teams
        </a>
        <a href="#fixtures" onClick={() => setMenuOpen(false)}>
          Fixtures
        </a>
        <a href="#news" onClick={() => setMenuOpen(false)}>
          News
        </a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>
          Membership
        </a>
        <a href="#gallery" onClick={() => setMenuOpen(false)}>
          Gallery
        </a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>
          Contact
        </a>
      </nav>

      <button
        className="menu-button"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        ☰
      </button>

      <a
        className="join-button"
        href="#contact"
        onClick={() => setMenuOpen(false)}
      >
        Join Us
      </a>
    </header>
  );
}

export default Navbar;

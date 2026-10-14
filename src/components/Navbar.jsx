import { useEffect, useRef, useState } from "react";
import WavingFlag from "./WavingFlag";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navbarRef = useRef(null);
  const toggleRef = useRef(null);
  useEffect(() => {
    function outside(event) {
      if (!navbarRef.current?.contains(event.target)) setMenuOpen(false);
    }
    function escape(event) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, []);
  const links = [
    ["Home", "home"],
    ["About", "about"],
    ["Teams", "teams"],
    ["Fixtures", "fixtures"],
    ["News", "news"],
    ["Membership", "membership"],
    ["Gallery", "gallery"],
    ["Contact", "contact"],
  ];
  return (
    <header className="navbar" ref={navbarRef}>
      <a
        className="logo-area"
        href="#home"
        aria-label="Viking Cricket Club home"
      >
        <img
          src={`${import.meta.env.BASE_URL}viking-logo-transparent.png`}
          alt="Viking Cricket Club logo"
          className="club-logo"
          width="76"
          height="58"
        />
        <div>
          <p className="club-name">Viking Cricket Club</p>
          <span className="club-tagline">Play · Learn · Belong</span>
        </div>
      </a>
      <span className="header-flag">
        <WavingFlag />
      </span>
      <nav
        id="primary-navigation"
        className={`nav-links ${menuOpen ? "nav-open" : ""}`}
        aria-label="Main navigation"
      >
        {links.map(([label, id]) => (
          <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
      <div className="navbar-actions">
        <a
          className="join-button"
          href="#membership"
          onClick={() => setMenuOpen(false)}
        >
          Join Us <span aria-hidden="true">↗</span>
        </a>
        <button
          ref={toggleRef}
          className="menu-button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
        >
          {menuOpen ? "×" : "☰"}
        </button>
      </div>
    </header>
  );
}

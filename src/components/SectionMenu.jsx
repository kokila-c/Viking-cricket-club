import { useEffect, useState } from "react";

const sections = [
  ["home", "Home"],
  ["about", "About"],
  ["teams", "Teams"],
  ["fixtures", "Fixtures"],
  ["news", "News"],
  ["gallery", "Gallery"],
  ["sponsors", "Partners"],
  ["membership", "Membership"],
  ["contact", "Contact"],
];

export default function SectionMenu() {
  const [active, setActive] = useState(() => {
    const hash = window.location.hash.slice(1);
    return sections.some(([id]) => id === hash) ? hash : "home";
  });
  useEffect(() => {
    let frame = null;
    function update() {
      frame = null;
      const threshold = Math.min(window.innerHeight * 0.3, 240);
      let current = "home";
      for (const [id] of sections) {
        const rect = document.getElementById(id)?.getBoundingClientRect();
        if (rect && rect.height > 0 && rect.top <= threshold) current = id;
      }
      setActive(current);
    }
    function schedule() {
      if (frame !== null) return;
      if (window.requestAnimationFrame)
        frame = window.requestAnimationFrame(update);
      else update();
    }
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame !== null) window.cancelAnimationFrame?.(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <nav className="section-menu" aria-label="Desktop section navigation">
      <ul>
        {sections.map(([id, label]) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
              onClick={() => setActive(id)}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

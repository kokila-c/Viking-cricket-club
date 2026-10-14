import { useEffect, useId, useState } from "react";

const width = 82;
const height = (width * 16) / 22;
const phases = [0, Math.PI / 2, Math.PI, Math.PI * 1.5, Math.PI * 2];

function clothRect(x0, x1, y0, y1, phase) {
  const point = (x, y) => {
    const progress = x / width;
    const ripple =
      Math.sin(progress * Math.PI * 2 - phase) *
      progress *
      (1.5 + 4.5 * progress);
    return `${(20 + x).toFixed(2)},${(18 + y + ripple).toFixed(2)}`;
  };
  const top = Array.from({ length: 17 }, (_, i) =>
    point(x0 + ((x1 - x0) * i) / 16, y0),
  );
  const bottom = Array.from({ length: 17 }, (_, i) =>
    point(x1 - ((x1 - x0) * i) / 16, y1),
  );
  return `M${top.join("L")}L${bottom.join("L")}Z`;
}

const cloth = phases.map((p) => clothRect(0, width, 0, height, p));
const whiteCross = phases.map(
  (p) =>
    clothRect((width * 6) / 22, (width * 10) / 22, 0, height, p) +
    clothRect(0, width, (height * 6) / 16, (height * 10) / 16, p),
);
const blueCross = phases.map(
  (p) =>
    clothRect((width * 7) / 22, (width * 9) / 22, 0, height, p) +
    clothRect(0, width, (height * 7) / 16, (height * 9) / 16, p),
);

function FabricPath({ values, fill, still }) {
  return (
    <path d={values[0]} fill={fill}>
      {!still && (
        <animate
          attributeName="d"
          values={values.join(";")}
          dur="4s"
          repeatCount="indefinite"
          keyTimes="0;0.25;0.5;0.75;1"
          calcMode="spline"
          keySplines=".45 0 .55 1;.45 0 .55 1;.45 0 .55 1;.45 0 .55 1"
        />
      )}
    </path>
  );
}

export default function WavingFlag() {
  const [still, setStill] = useState(
    () =>
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false,
  );
  const id = `flag-folds-${useId().replaceAll(":", "")}`;
  useEffect(() => {
    const preference = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!preference) return;
    const change = (event) => setStill(event.matches);
    preference.addEventListener("change", change);
    return () => preference.removeEventListener("change", change);
  }, []);

  return (
    <svg
      className="waving-flag"
      viewBox="0 0 112 94"
      role="img"
      aria-label="Norwegian flag"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="white" stopOpacity=".18" />
          <stop offset=".24" stopColor="black" stopOpacity=".19" />
          <stop offset=".47" stopColor="white" stopOpacity=".2" />
          <stop offset=".7" stopColor="black" stopOpacity=".18" />
          <stop offset="1" stopColor="white" stopOpacity=".12" />
        </linearGradient>
      </defs>
      <path
        d="M17 13V90"
        stroke="#9cadb9"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="17" cy="11" r="2.3" fill="#d7e0e6" />
      <FabricPath values={cloth} fill="#ba0c2f" still={still} />
      <FabricPath values={whiteCross} fill="#fff" still={still} />
      <FabricPath values={blueCross} fill="#00205b" still={still} />
      <FabricPath values={cloth} fill={`url(#${id})`} still={still} />
    </svg>
  );
}

export default function CricketIllustration({ scene = "wicket" }) {
  return (
    <svg
      viewBox="0 0 340 230"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`cricket-illustration illustration-${scene}`}
    >
      <path
        d="M15 210C90 195 231 195 326 210M38 219C116 209 245 216 290 220"
        stroke="currentColor"
        opacity=".24"
      />
      {scene === "ball" ? (
        <>
          <circle
            cx="170"
            cy="120"
            r="64"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M144 61C112 99 125 164 189 181M154 60C122 101 135 164 199 181"
            stroke="#f28c28"
            strokeWidth="3"
            strokeDasharray="5 5"
          />
          <path
            d="M85 95L32 91M91 147L44 158M88 119L16 122"
            stroke="currentColor"
            opacity=".35"
          />
        </>
      ) : scene === "community" ? (
        <>
          <circle
            cx="170"
            cy="75"
            r="22"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M134 178V132C134 97 206 97 206 132V178M151 133V199M189 133V199"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="85" cy="98" r="17" stroke="currentColor" />
          <path
            d="M58 187V147C58 117 112 117 112 147V187M69 146V201M100 146V201"
            stroke="currentColor"
          />
          <circle cx="255" cy="98" r="17" stroke="#f28c28" />
          <path
            d="M228 187V147C228 117 282 117 282 147V187M239 146V201M270 146V201"
            stroke="#f28c28"
          />
        </>
      ) : (
        <>
          <path
            d="M162 196V80M176 196V80M190 196V80M154 75H171M177 75H198"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <g transform="rotate(22 111 120)">
            <rect
              x="86"
              y="81"
              width="30"
              height="113"
              rx="6"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M94 81V29H108V81M94 38H108M94 45H108M94 52H108M94 59H108M94 66H108"
              stroke="currentColor"
            />
            <path d="M92 107V162" stroke="currentColor" opacity=".4" />
          </g>
          <circle cx="231" cy="179" r="22" stroke="#f28c28" strokeWidth="2" />
          <path
            d="M218 161C214 178 229 195 244 196M223 160C219 176 234 190 249 190"
            stroke="#f28c28"
            strokeDasharray="3 3"
          />
          <path
            d="M230 99L303 72M236 111L310 96"
            stroke="currentColor"
            opacity=".25"
          />
        </>
      )}
    </svg>
  );
}

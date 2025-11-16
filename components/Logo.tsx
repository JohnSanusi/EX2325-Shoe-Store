import Link from "next/link";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" aria-label="EX2325 home" className={className}>
      <svg
        width="140"
        height="36"
        viewBox="0 0 280 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="logoTitle"
      >
        <title id="logoTitle">EX2325</title>
        <defs>
          <linearGradient id="g" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#ff7a18" />
            <stop offset="100%" stopColor="#ffb347" />
          </linearGradient>
        </defs>

        <rect width="280" height="72" rx="10" fill="transparent" />

        <text
          x="20"
          y="50"
          fontFamily="Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
          fontWeight="700"
          fontSize="42"
          fill="url(#g)"
        >
          EX2325
        </text>
      </svg>
    </Link>
  );
};

export default Logo;

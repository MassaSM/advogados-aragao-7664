type LogoProps = {
  className?: string;
  compact?: boolean;
};

/** Monograma A&V + assinatura tipográfica do escritório. */
export function Logo({ className = "", compact = false }: LogoProps) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 48 48"
        aria-hidden="true"
        className="h-9 w-9 shrink-0 md:h-10 md:w-10"
      >
        <defs>
          <linearGradient id="av-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8C6B14" />
            <stop offset="45%" stopColor="#E8CE7A" />
            <stop offset="75%" stopColor="#C9A227" />
            <stop offset="100%" stopColor="#F5E6B8" />
          </linearGradient>
        </defs>
        <path
          d="M24 2.5 43.5 12v24L24 45.5 4.5 36V12Z"
          fill="none"
          stroke="url(#av-gold)"
          strokeWidth="1.1"
          opacity="0.85"
        />
        <path
          d="M16.4 31.6 22.1 16h3.9l5.7 15.6h-3.5l-1.2-3.6h-6l-1.2 3.6Zm5.6-6.4h4.2L24.1 19Z"
          fill="url(#av-gold)"
        />
        <path d="M24 34.5h9" stroke="url(#av-gold)" strokeWidth="0.9" opacity="0.7" />
      </svg>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="whitespace-nowrap font-display text-[0.98rem] font-medium tracking-[0.16em] text-bone md:text-[1.05rem]">
            ARAGÃO <span className="text-gold">&</span> VASCONCELOS
          </span>
          <span className="mt-1 whitespace-nowrap font-body text-[0.5rem] font-medium uppercase tracking-[0.44em] text-muted">
            Sociedade de Advogados
          </span>
        </span>
      )}
    </span>
  );
}

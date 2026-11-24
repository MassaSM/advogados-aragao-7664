import { useEffect, useRef, useState } from "react";
import { getGsap, prefersReducedMotion } from "../../lib/motion";
import { Logo } from "./logo";

type PreloaderProps = {
  onComplete: () => void;
};

/** Abertura cinematográfica: logotipo, varredura de luz dourada e contador. */
export function Preloader({ onComplete }: PreloaderProps) {
  const root = useRef<HTMLDivElement | null>(null);
  const counter = useRef<HTMLSpanElement | null>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    document.body.classList.add("is-locked");

    const finish = () => {
      document.body.classList.remove("is-locked");
      setHidden(true);
      onComplete();
    };

    if (prefersReducedMotion()) {
      finish();
      return;
    }

    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const progress = { value: 0 };
      const tl = gsap.timeline({ onComplete: finish });

      tl.from(".pl-logo", { opacity: 0, y: 24, duration: 1.1, ease: "power3.out" })
        .to(".pl-sweep", { xPercent: 220, duration: 1.5, ease: "power2.inOut" }, 0.35)
        .to(".pl-line", { scaleX: 1, duration: 1.5, ease: "power2.inOut" }, 0.4)
        .to(
          progress,
          {
            value: 100,
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counter.current) {
                counter.current.textContent = String(Math.round(progress.value)).padStart(2, "0");
              }
            },
          },
          0.4,
        )
        .to(".pl-fade", { opacity: 0, duration: 0.5, ease: "power2.out" }, "+=0.15")
        .to(el, { yPercent: -100, duration: 1.05, ease: "expo.inOut" }, "-=0.15");
    }, el);

    return () => {
      ctx.revert();
      document.body.classList.remove("is-locked");
    };
  }, [onComplete]);

  if (hidden) return null;

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-ink"
    >
      <div className="pl-sweep pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-[linear-gradient(90deg,transparent,rgba(233,206,122,0.16),transparent)] blur-2xl" />
      <div className="pl-fade flex flex-col items-center gap-8">
        <div className="pl-logo">
          <Logo />
        </div>
        <div className="relative h-px w-[min(52vw,340px)] overflow-hidden bg-white/8">
          <span className="pl-line absolute inset-0 origin-left scale-x-0 bg-[var(--metal)]" />
        </div>
        <span className="font-body text-[0.65rem] font-medium tracking-[0.4em] text-muted">
          <span ref={counter}>00</span>
          <span className="text-gold">%</span>
        </span>
      </div>
    </div>
  );
}

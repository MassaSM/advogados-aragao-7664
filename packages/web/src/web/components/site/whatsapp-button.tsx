import { useEffect, useState } from "react";
import { whatsappLink } from "../../lib/site";

/** Botão flutuante de WhatsApp, revelado depois do hero. */
export function WhatsappButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={whatsappLink(
        "Olá! Vim pelo site e gostaria de falar com um advogado do escritório.",
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com o escritório pelo WhatsApp"
      className="group fixed bottom-5 right-5 z-90 grid h-14 w-14 place-items-center rounded-full border border-gold/45 bg-ink/85 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:border-gold hover:shadow-[0_16px_50px_-14px_rgba(201,162,39,0.9)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light md:bottom-8 md:right-8 md:h-16 md:w-16"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.85)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <span className="absolute inset-0 rounded-full bg-gold/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="relative h-7 w-7 fill-gold transition-transform duration-500 group-hover:scale-110 md:h-8 md:w-8"
      >
        <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.86 1.21 3.06c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35Z" />
        <path d="M12.04 2.5c-5.24 0-9.5 4.26-9.5 9.5 0 1.67.44 3.3 1.27 4.74L2.5 21.5l4.9-1.28a9.46 9.46 0 0 0 4.64 1.2h.01c5.24 0 9.5-4.26 9.5-9.5s-4.27-9.42-9.51-9.42Zm0 17.24h-.01a7.9 7.9 0 0 1-4.02-1.1l-.29-.17-2.91.76.78-2.84-.19-.29a7.87 7.87 0 0 1-1.21-4.2 7.9 7.9 0 1 1 7.85 7.84Z" />
      </svg>
    </a>
  );
}

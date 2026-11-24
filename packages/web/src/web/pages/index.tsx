import { Suspense, lazy, useEffect, useState } from "react";
import { Preloader } from "../components/site/preloader";
import { Nav } from "../components/site/nav";
import { Hero } from "../components/site/hero";
import { WhatsappButton } from "../components/site/whatsapp-button";
import { Cursor } from "../components/site/cursor";
import { useSmoothScroll } from "../hooks/use-smooth-scroll";
import { getGsap } from "../lib/motion";

// Seções abaixo da dobra: carregadas sob demanda (code splitting).
const Manifesto = lazy(() =>
  import("../components/site/manifesto").then((m) => ({ default: m.Manifesto })),
);
const PracticeAreas = lazy(() =>
  import("../components/site/practice-areas").then((m) => ({
    default: m.PracticeAreas,
  })),
);
const Strategy = lazy(() =>
  import("../components/site/strategy").then((m) => ({ default: m.Strategy })),
);
const Differentials = lazy(() =>
  import("../components/site/differentials").then((m) => ({
    default: m.Differentials,
  })),
);
const Insights = lazy(() =>
  import("../components/site/insights").then((m) => ({ default: m.Insights })),
);
const Faq = lazy(() =>
  import("../components/site/faq").then((m) => ({ default: m.Faq })),
);
const Contact = lazy(() =>
  import("../components/site/contact").then((m) => ({ default: m.Contact })),
);
const Footer = lazy(() =>
  import("../components/site/footer").then((m) => ({ default: m.Footer })),
);

function SectionFallback() {
  return <div className="min-h-[60vh] bg-ink" aria-hidden="true" />;
}

function Index() {
  const [ready, setReady] = useState(false);
  useSmoothScroll();

  // Quando as seções lazy montam, os triggers precisam recalcular posições.
  useEffect(() => {
    if (!ready) return;
    const { ScrollTrigger } = getGsap();
    const timeouts = [300, 900, 1800].map((ms) =>
      window.setTimeout(() => ScrollTrigger.refresh(), ms),
    );
    return () => timeouts.forEach(window.clearTimeout);
  }, [ready]);

  return (
    <>
      <Preloader onComplete={() => setReady(true)} />
      <Nav />

      <main id="conteudo">
        <Hero ready={ready} />
        <Suspense fallback={<SectionFallback />}>
          <Manifesto />
          <PracticeAreas />
          <Strategy />
          <Differentials />
          <Insights />
          <Faq />
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      <WhatsappButton />
      <Cursor />
    </>
  );
}

export default Index;

import { useEffect, useState } from "react";
import { About } from "@/components/About";
import { Constellation } from "@/components/Constellation";
import { Craft } from "@/components/Craft";
import { Dock } from "@/components/Dock";
import { Hero } from "@/components/Hero";
import { Lab } from "@/components/Lab";
import { Letterbox } from "@/components/Letterbox";
import { MatrixField } from "@/components/MatrixField";
import { Signal } from "@/components/Signal";
import { Work } from "@/components/Work";
import { navItems, type SectionId } from "@/data/content";

function isSectionId(value: string): value is SectionId {
  return navItems.some((item) => item.id === value);
}

export default function App() {
  const [active, setActive] = useState<SectionId>("home");

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => node !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id && isSectionId(visible.target.id)) {
          setActive(visible.target.id);
        }
      },
      { threshold: [0.25, 0.45, 0.7], rootMargin: "-20% 0px -35% 0px" },
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const goTo = (id: SectionId) => {
    const node = document.getElementById(id);
    if (!node) {
      return;
    }
    const top = window.scrollY + node.getBoundingClientRect().top;
    window.scrollTo({ top, behavior: "smooth" });
    setActive(id);
  };

  return (
    <div className="relative min-h-screen bg-void">
      <MatrixField />
      <Constellation />
      <div className="vignette" />
      <div className="grain" />
      <Letterbox />
      <main className="relative z-10">
        <Hero onWork={() => goTo("work")} onSignal={() => goTo("signal")} />
        <About />
        <Craft />
        <Lab />
        <Work />
        <Signal />
      </main>
      <Dock active={active} onNavigate={goTo} />
    </div>
  );
}

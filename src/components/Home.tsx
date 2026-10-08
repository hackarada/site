import { useEffect } from "react";
import { About } from "@/components/About";
import { Craft } from "@/components/Craft";
import { Hero } from "@/components/Hero";
import { Lab } from "@/components/Lab";
import { Notes } from "@/components/Notes";
import { Signal } from "@/components/Signal";
import { Work } from "@/components/Work";
import { isSectionId, navItems, type SectionId } from "@/data/content";

type HomeProps = {
  onNavigate: (id: SectionId) => void;
  onOpenNote: (slug: string) => void;
  setActive: (id: SectionId) => void;
};

export function Home({ onNavigate, onOpenNote, setActive }: HomeProps) {
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
  }, [setActive]);

  return (
    <main className="relative z-10 pl-[3.75rem] md:pl-[12.75rem]">
      <Hero onWork={() => onNavigate("work")} onSignal={() => onNavigate("signal")} />
      <About />
      <Craft />
      <Lab />
      <Notes onOpen={onOpenNote} />
      <Work />
      <Signal onOpenNote={onOpenNote} />
    </main>
  );
}

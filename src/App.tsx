import { useEffect, useLayoutEffect, useState } from "react";
import { Constellation } from "@/components/Constellation";
import { Dock } from "@/components/Dock";
import { Home } from "@/components/Home";
import { Letterbox } from "@/components/Letterbox";
import { MatrixField } from "@/components/MatrixField";
import { MissingNote, NotePage } from "@/components/NotePage";
import { isSectionId, type SectionId } from "@/data/content";
import { findNote } from "@/data/notes";
import { noteSlugFromPath, useRoute } from "@/lib/route";

function activeFromLocation(path: string, hash: string): SectionId {
  if (path.startsWith("/notes")) {
    return "notes";
  }
  if (isSectionId(hash)) {
    return hash;
  }
  return "home";
}

function withoutSmoothScroll(scroll: () => void) {
  const root = document.documentElement;
  const previous = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  scroll();
  root.style.scrollBehavior = previous;
}

function scrollToTopInstant() {
  withoutSmoothScroll(() => {
    window.scrollTo({ top: 0 });
  });
}

export default function App() {
  const { path, hash, go } = useRoute();
  const noteSlug = noteSlugFromPath(path);
  const note = noteSlug ? findNote(noteSlug) : undefined;
  const onArticle = noteSlug !== null;
  const [active, setActive] = useState<SectionId>(() => activeFromLocation(path, hash));

  useEffect(() => {
    setActive(activeFromLocation(path, hash));
  }, [path, hash]);

  useEffect(() => {
    if (note) {
      document.title = `${note.title} | Ermias W.`;
      return;
    }
    if (onArticle) {
      document.title = "Note | Ermias W.";
      return;
    }
    document.title = "Ermias W. | Security Architecture";
  }, [note, onArticle]);

  useLayoutEffect(() => {
    if (onArticle) {
      const heading = hash ? document.getElementById(hash) : null;
      if (heading) {
        withoutSmoothScroll(() => {
          heading.scrollIntoView();
        });
        return;
      }
      scrollToTopInstant();
      return;
    }
    const section = path === "/notes" ? "notes" : hash;
    if (section && isSectionId(section)) {
      document.getElementById(section)?.scrollIntoView();
      return;
    }
    scrollToTopInstant();
  }, [onArticle, path, hash]);

  const goTo = (id: SectionId) => {
    const targetHash = id === "home" ? "" : id;
    const alreadyHere = !onArticle && (path === "/" || path === "/notes") && hash === targetHash;
    go(id === "home" ? "/" : `/#${id}`);
    if (!alreadyHere) {
      return;
    }
    if (id === "home") {
      scrollToTopInstant();
      return;
    }
    document.getElementById(id)?.scrollIntoView();
  };

  const openNote = (slug: string) => {
    go(`/notes/${slug}`);
  };

  return (
    <div className="relative min-h-screen bg-void">
      <MatrixField />
      <Constellation />
      <div className="vignette" />
      <div className="grain" />
      <Letterbox />
      {onArticle ? (
        note ? (
          <NotePage note={note} onBack={() => go("/#notes")} />
        ) : (
          <MissingNote onBack={() => go("/#notes")} />
        )
      ) : (
        <Home onNavigate={goTo} onOpenNote={openNote} setActive={setActive} />
      )}
      <Dock active={active} onNavigate={goTo} />
    </div>
  );
}

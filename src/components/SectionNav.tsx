import { useEffect, useRef, useState } from "react";
import { headingOffsetClass, type NoteHeading } from "@/lib/noteHeadings";

function headingUrl(id: string): string {
  return `${window.location.pathname}${window.location.search}#${id}`;
}

function scrollWithoutAnimation(scroll: () => void) {
  const root = document.documentElement;
  const previous = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  scroll();
  root.style.scrollBehavior = previous;
}

function replaceHeadingHash(id: string) {
  const next = id ? headingUrl(id) : `${window.location.pathname}${window.location.search}`;
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (next !== current) {
    window.history.replaceState({}, "", next);
  }
}

export function useEssaySections(headings: NoteHeading[]) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const marker = 112;
      let nextId = "";
      for (const heading of headings) {
        const node = document.getElementById(heading.id);
        if (!node) {
          continue;
        }
        if (node.getBoundingClientRect().top <= marker) {
          nextId = heading.id;
        }
      }
      setActiveId(nextId);
      replaceHeadingHash(nextId);
    };

    const onScroll = () => {
      if (frame) {
        return;
      }
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [headings]);

  const activeIndex = headings.findIndex((heading) => heading.id === activeId);
  const current = activeIndex >= 0 ? headings[activeIndex] : undefined;
  const previous = activeIndex > 0 ? headings[activeIndex - 1] : undefined;
  const next =
    activeIndex >= 0 && activeIndex < headings.length - 1
      ? headings[activeIndex + 1]
      : activeIndex < 0
        ? headings[0]
        : undefined;

  const moveTo = (id: string) => {
    const node = document.getElementById(id);
    if (!node) {
      return;
    }
    setActiveId(id);
    window.history.pushState({}, "", headingUrl(id));
    scrollWithoutAnimation(() => {
      node.scrollIntoView();
    });
  };

  const moveToStart = () => {
    setActiveId("");
    window.history.pushState({}, "", `${window.location.pathname}${window.location.search}`);
    scrollWithoutAnimation(() => {
      window.scrollTo({ top: 0 });
    });
  };

  return { headings, activeId, activeIndex, current, previous, next, moveTo, moveToStart };
}

type EssaySections = ReturnType<typeof useEssaySections>;

function revealActiveLink(rail: HTMLElement, id: string) {
  const link = rail.querySelector<HTMLElement>(`[data-section="${id}"]`);
  if (!link) {
    return;
  }
  const top = link.offsetTop;
  const bottom = top + link.offsetHeight;
  if (top < rail.scrollTop) {
    rail.scrollTop = top;
  } else if (bottom > rail.scrollTop + rail.clientHeight) {
    rail.scrollTop = bottom - rail.clientHeight;
  }
}

export function SectionRail({ headings, activeId, moveTo }: EssaySections) {
  const railRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail || !activeId) {
      return;
    }
    revealActiveLink(rail, activeId);
  }, [activeId]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <aside className="sticky top-16 hidden max-h-[calc(100vh-6rem)] self-start xl:block">
      <p className="font-mono text-[11px] tracking-[0.22em] text-phosphor uppercase">On this page</p>
      <nav
        ref={railRef}
        aria-label="On this page"
        className="relative mt-4 max-h-[calc(100vh-9rem)] overflow-y-auto pr-2"
      >
        <ul className="border-l border-line">
          {headings.map((heading) => {
            const selected = heading.id === activeId;
            return (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  data-section={heading.id}
                  aria-current={selected ? "location" : undefined}
                  onClick={(event) => {
                    event.preventDefault();
                    moveTo(heading.id);
                  }}
                  className={`-ml-px block border-l py-1.5 text-[13px] leading-snug ${
                    heading.depth === 3 ? "pl-6" : "pl-3"
                  } ${
                    selected
                      ? "border-phosphor text-phosphor"
                      : "border-transparent text-mist hover:text-silver"
                  }`}
                >
                  {heading.text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export function SectionBar({
  headings,
  activeId,
  activeIndex,
  current,
  previous,
  next,
  moveTo,
  moveToStart,
}: EssaySections) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (headings.length === 0) {
    return null;
  }

  const position = current
    ? `${String(activeIndex + 1).padStart(2, "0")} / ${String(headings.length).padStart(2, "0")}`
    : `00 / ${String(headings.length).padStart(2, "0")}`;

  const go = (id: string) => {
    setOpen(false);
    moveTo(id);
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] xl:hidden">
      <div className="h-10 bg-gradient-to-b from-transparent to-void" />
      <div className="pointer-events-auto border-t border-line bg-void py-3 pl-[3.75rem] md:pl-[12.75rem]">
        <div className="px-6 sm:px-10 lg:px-16">
          <nav aria-label="Essay sections" className="mx-auto w-full max-w-3xl">
            {open ? (
              <ul className="mb-3 max-h-64 overflow-auto border border-line bg-panel">
                {headings.map((heading, index) => {
                  const selected = heading.id === activeId;
                  return (
                    <li key={heading.id}>
                      <button
                        type="button"
                        onClick={() => go(heading.id)}
                        className={`flex w-full items-baseline gap-3 px-3 py-2 text-left ${headingOffsetClass(heading.depth)} ${
                          selected ? "bg-phosphor/10 text-phosphor" : "text-mist hover:text-silver"
                        }`}
                      >
                        <span className="font-mono text-[10px] tracking-[0.14em] text-ash">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="truncate text-sm">{heading.text}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : null}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  if (previous) {
                    go(previous.id);
                    return;
                  }
                  if (activeIndex === 0) {
                    setOpen(false);
                    moveToStart();
                  }
                }}
                disabled={activeIndex < 0}
                className="shrink-0 font-mono text-[11px] tracking-[0.16em] text-phosphor uppercase disabled:text-ash"
              >
                Prev
              </button>
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpen((value) => !value)}
                className="flex min-w-0 flex-1 items-baseline gap-3 text-left"
              >
                <span className="shrink-0 font-mono text-[10px] tracking-[0.14em] text-ash">{position}</span>
                <span className="truncate text-sm text-silver">{current ? current.text : "Opening"}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (next) {
                    go(next.id);
                  }
                }}
                disabled={!next}
                className="shrink-0 font-mono text-[11px] tracking-[0.16em] text-phosphor uppercase disabled:text-ash"
              >
                Next
              </button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

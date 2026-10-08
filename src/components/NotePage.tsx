import { useMemo } from "react";
import { formatNoteDate, type Note } from "@/data/notes";
import { NoteBody } from "@/components/NoteBody";
import { SectionBar, SectionRail, useEssaySections } from "@/components/SectionNav";
import { noteHeadings } from "@/lib/noteHeadings";

type NotePageProps = {
  note: Note;
  onBack: () => void;
};

export function NotePage({ note, onBack }: NotePageProps) {
  const headings = useMemo(() => noteHeadings(note.body), [note.body]);
  const sections = useEssaySections(headings);

  return (
    <main className="relative z-10 min-h-screen pl-[3.75rem] md:pl-[12.75rem]">
      <div className="mx-auto w-full max-w-6xl px-6 pt-20 pb-36 sm:px-10 xl:grid xl:max-w-[76rem] xl:grid-cols-[minmax(0,42rem)_13.5rem] xl:items-start xl:justify-center xl:gap-14 xl:px-12 xl:pb-24">
        <article className="min-w-0">
          <button
            type="button"
            onClick={onBack}
            className="font-mono text-[11px] tracking-[0.22em] text-phosphor uppercase"
          >
            All notes
          </button>
          <p className="mt-8 font-mono text-[11px] tracking-[0.22em] text-tungsten uppercase">
            Essay
          </p>
          <h1 className="mt-4 font-display text-4xl leading-[1.05] font-bold tracking-tight text-silver sm:text-5xl">
            {note.title}
          </h1>
          <p className="mt-6 font-mono text-xs tracking-[0.08em] text-ash">
            Ermias W.
            <span className="mx-2 text-line">/</span>
            <time dateTime={note.date}>{formatNoteDate(note.date)}</time>
          </p>
          <div className="mt-10 border-t border-line pt-10">
            <NoteBody body={note.body} headings={headings} />
          </div>
        </article>
        <SectionRail {...sections} />
      </div>
      <SectionBar {...sections} />
    </main>
  );
}

type MissingNoteProps = {
  onBack: () => void;
};

export function MissingNote({ onBack }: MissingNoteProps) {
  return (
    <main className="relative z-10 flex min-h-screen items-center pl-[3.75rem] md:pl-[12.75rem]">
      <div className="px-6 py-24 sm:px-10">
        <p className="font-mono text-[11px] tracking-[0.28em] text-phosphor uppercase">Notes</p>
        <h1 className="mt-4 max-w-xl font-display text-4xl font-bold tracking-tight text-silver">
          This note is not on the site.
        </h1>
        <button
          type="button"
          onClick={onBack}
          className="mt-8 font-mono text-[11px] tracking-[0.18em] text-phosphor uppercase"
        >
          All notes
        </button>
      </div>
    </main>
  );
}

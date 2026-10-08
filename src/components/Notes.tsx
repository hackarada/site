import { formatNoteDate, notes } from "@/data/notes";
import { appHref, isModifiedClick } from "@/lib/route";

type NotesProps = {
  onOpen: (slug: string) => void;
};

export function Notes({ onOpen }: NotesProps) {
  return (
    <section id="notes" className="relative scroll-mt-8 px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] tracking-[0.28em] text-phosphor uppercase">
              04  /  Notes
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-silver sm:text-5xl">
              Notes from the work.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ash">
            Longer writing on security, models, and the systems around them.
          </p>
        </div>

        {notes.length === 0 ? (
          <p className="mt-12 border-t border-line pt-8 text-sm text-ash">No notes published yet.</p>
        ) : (
          <ul className="mt-12 border-t border-line">
            {notes.map((note) => (
              <li key={note.slug} className="border-b border-line">
                <a
                  href={appHref(`/notes/${note.slug}`)}
                  onClick={(event) => {
                    if (isModifiedClick(event)) {
                      return;
                    }
                    event.preventDefault();
                    onOpen(note.slug);
                  }}
                  className="group grid gap-3 py-8 text-left md:grid-cols-[11rem_1fr] md:gap-8"
                >
                  <time
                    dateTime={note.date}
                    className="font-mono text-[11px] tracking-[0.16em] text-ash uppercase"
                  >
                    {formatNoteDate(note.date)}
                  </time>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-silver transition group-hover:text-phosphor sm:text-3xl">
                      {note.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mist">{note.dek}</p>
                    <p className="mt-5 font-mono text-[11px] tracking-[0.18em] text-phosphor uppercase">
                      Read the note
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

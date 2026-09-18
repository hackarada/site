import { productions } from "@/data/content";

export function Work() {
  return (
    <section id="work" className="relative scroll-mt-8 px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-6xl">
        <p className="font-mono text-[11px] tracking-[0.28em] text-phosphor uppercase">
          04  /  Productions
        </p>
        <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight text-silver sm:text-5xl">
          Credits from the studio, the cloud, and the red team.
        </h2>

        <ol className="mt-14 space-y-0">
          {productions.map((item, index) => (
            <li
              key={item.venue}
              className="grid gap-6 border-t border-line py-10 md:grid-cols-[8rem_1fr]"
            >
              <p className="font-mono text-sm text-tungsten">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-silver">{item.role}</h3>
                    <p className="mt-1 text-sm text-mist">{item.venue}</p>
                  </div>
                  <p className="shrink-0 font-mono text-[11px] tracking-[0.16em] text-ash uppercase">
                    {item.period}
                    {item.status ? (
                      <span className="ml-3 text-phosphor">{item.status}</span>
                    ) : null}
                  </p>
                </div>
                <ul className="mt-5 max-w-3xl space-y-3 text-sm leading-relaxed text-mist">
                  {item.beats.map((beat) => (
                    <li key={beat}>{beat}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

import { craft } from "@/data/content";

export function Craft() {
  return (
    <section id="craft" className="relative scroll-mt-8 px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] tracking-[0.28em] text-phosphor uppercase">
              02  /  Attack surfaces, by craft
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-silver sm:text-5xl">
              Product. Cloud. Content. Agents. Pipeline.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ash">
            Four rooms on the same lot, and a pipeline that connects them before an attacker does.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {craft.map((area) => (
            <article
              key={area.code}
              className={`group border border-line bg-panel/50 p-7 transition hover:border-phosphor/35 hover:bg-panel ${
                area.wide ? "md:col-span-2 md:grid md:grid-cols-[1.2fr_0.8fr] md:items-end md:gap-10" : ""
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] tracking-[0.28em] text-tungsten">
                    {area.code}
                  </span>
                  <span className="h-px w-16 bg-line transition group-hover:bg-phosphor/40" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold text-silver">{area.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{area.summary}</p>
              </div>
              <ul className="mt-6 space-y-2 md:mt-0">
                {area.points.map((point) => (
                  <li key={point} className="font-mono text-[12px] text-ash">
                    <span className="mr-2 text-phosphor">/</span>
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

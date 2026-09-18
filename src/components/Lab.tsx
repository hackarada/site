import { artifactActionLabel, artifacts } from "@/data/content";

export function Lab() {
  return (
    <section id="lab" className="relative scroll-mt-8 px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] tracking-[0.28em] text-phosphor uppercase">
              03  /  Lab
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-silver sm:text-5xl">
              Artifacts, not a dump of forks.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ash">
            Public work that still maps to how I operate: local-first capture, research loops,
            and agent tooling.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {artifacts.map((item) => (
            <a
              key={item.code}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col border border-line bg-panel/50 p-7 transition hover:border-phosphor/35 hover:bg-panel"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[11px] tracking-[0.28em] text-tungsten">
                  {item.code}
                </span>
                <span className="font-mono text-[11px] text-ash">{item.year}</span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold text-silver group-hover:text-phosphor">
                {item.title}
              </h3>
              <p className="mt-1 font-mono text-[11px] tracking-[0.08em] text-ash">{item.stack}</p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-mist">{item.summary}</p>
              <p className="mt-6 font-mono text-[11px] tracking-[0.18em] text-phosphor uppercase">
                {artifactActionLabel(item.kind)}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

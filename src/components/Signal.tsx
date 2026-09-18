import { profile, signals } from "@/data/content";

export function Signal() {
  return (
    <section id="signal" className="relative scroll-mt-8 px-6 pt-24 pb-24 sm:px-10 lg:px-16">
      <div className="mx-auto grid w-full max-w-6xl gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="font-mono text-[11px] tracking-[0.28em] text-phosphor uppercase">
            05  /  Channel
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-silver sm:text-5xl">
            Ready when the next scene needs a security architect.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-mist">
            I work with engineering, platform, product, and legal teams on systems that cannot
            afford a leaky trust model. If you are building something high-stakes, find me on
            LinkedIn or GitHub.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-phosphor px-6 py-3 text-sm font-medium text-void transition hover:bg-silver"
            >
              LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-line px-6 py-3 text-sm text-silver transition hover:border-phosphor/50 hover:text-phosphor"
            >
              GitHub
            </a>
          </div>
          <p className="mt-8 font-mono text-xs tracking-[0.18em] text-ash uppercase">
            {profile.location}
          </p>
        </div>

        <div className="space-y-4">
          {signals.map((item) => (
            <article key={item.title} className="border border-line bg-panel/50 p-6">
              <p className="font-mono text-[10px] tracking-[0.24em] text-tungsten uppercase">
                {item.kind}
              </p>
              <h3 className="mt-3 font-display text-xl font-bold text-silver">{item.title}</h3>
              <p className="mt-1 text-sm text-phosphor">{item.place}</p>
              <p className="mt-3 text-sm leading-relaxed text-mist">{item.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

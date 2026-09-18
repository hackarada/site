import { about, stack } from "@/data/content";

export function About() {
  return (
    <section id="about" className="relative scroll-mt-8 scroll-mb-28 px-6 py-28 sm:px-10 lg:px-16">
      <div className="mx-auto grid w-full max-w-6xl gap-14 lg:grid-cols-[0.9fr_1.2fr]">
        <div>
          <p className="font-mono text-[11px] tracking-[0.28em] text-phosphor uppercase">
            {about.kicker}
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-silver sm:text-5xl">
            {about.title}
          </h2>
          <ul className="mt-10 space-y-4">
            {about.facts.map((fact) => (
              <li
                key={fact.label}
                className="flex items-baseline justify-between gap-4 border-b border-line pb-3"
              >
                <span className="font-mono text-[11px] tracking-[0.18em] text-ash uppercase">
                  {fact.label}
                </span>
                <span className="text-sm text-silver">{fact.value}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="space-y-5 text-[1.05rem] leading-relaxed text-mist">
            {about.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-10">
            <p className="font-mono text-[11px] tracking-[0.22em] text-tungsten uppercase">
              Working set
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-line px-3 py-1.5 font-mono text-[11px] text-silver"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

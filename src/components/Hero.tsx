import { profile } from "@/data/content";

type HeroProps = {
  onWork: () => void;
  onSignal: () => void;
};

export function Hero({ onWork, onSignal }: HeroProps) {
  return (
    <section
      id="home"
      className="relative flex min-h-screen scroll-mt-8 scroll-mb-28 items-center overflow-hidden px-6 pb-40 pt-24 sm:px-10 lg:px-16"
    >
      <div className="construct-floor" />
      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
        <div className="fade-up">
          <p className="font-mono text-[11px] tracking-[0.32em] text-tungsten uppercase">
            Prod. / Security / {profile.location}
          </p>
          <h1 className="mt-6 font-display text-[clamp(3.4rem,12vw,8.4rem)] leading-[0.86] font-extrabold tracking-tight text-silver">
            {profile.first}
            <span className="block text-phosphor">{profile.last}</span>
          </h1>
          <p className="mt-8 max-w-xl text-xl font-light text-mist sm:text-2xl">
            {profile.headline}
          </p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ash sm:text-[1.05rem]">
            {profile.lede}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onWork}
              className="rounded-full bg-phosphor px-6 py-3 text-sm font-medium text-void transition hover:bg-silver"
            >
              View the work
            </button>
            <button
              type="button"
              onClick={onSignal}
              className="rounded-full border border-line px-6 py-3 text-sm text-silver transition hover:border-phosphor/50 hover:text-phosphor"
            >
              Open a channel
            </button>
          </div>
        </div>

        <aside className="fade-up min-w-0 border border-line bg-panel/70 p-6 backdrop-blur-md lg:mb-4">
          <p className="font-mono text-[10px] tracking-[0.28em] text-phosphor uppercase">
            Now rolling
          </p>
          <dl className="mt-5 space-y-4 font-mono text-xs">
            <div className="border-b border-line pb-3">
              <dt className="text-ash">Role</dt>
              <dd className="mt-1 text-silver">{profile.role}</dd>
            </div>
            <div className="border-b border-line pb-3">
              <dt className="text-ash">Lot</dt>
              <dd className="mt-1 text-silver">{profile.studio}</dd>
            </div>
            <div className="border-b border-line pb-3">
              <dt className="text-ash">Scene</dt>
              <dd className="mt-1 text-silver">Zero Trust · Pipeline · Content</dd>
            </div>
            <div>
              <dt className="text-ash">Take</dt>
              <dd className="mt-1 text-tungsten">Architecture, not theater</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}

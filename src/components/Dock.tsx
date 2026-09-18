import { navItems, type SectionId } from "@/data/content";

type DockProps = {
  active: SectionId;
  onNavigate: (id: SectionId) => void;
};

export function Dock({ active, onNavigate }: DockProps) {
  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-5 left-1/2 z-[70] w-[min(96vw,42rem)] -translate-x-1/2"
    >
      <div className="flex items-center justify-between gap-1 rounded-full border border-line bg-void/75 px-2 py-2 shadow-glow backdrop-blur-xl">
        {navItems.map((item) => {
          const isActive = item.id === active;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`flex min-w-0 flex-1 flex-col items-center rounded-full px-2 py-2 transition ${
                isActive
                  ? "bg-phosphor/12 text-phosphor"
                  : "text-mist hover:text-silver"
              }`}
            >
              <span className="font-mono text-[10px] tracking-[0.18em]">{item.short}</span>
              <span className="mt-0.5 truncate font-sans text-[9px] leading-none sm:text-[11px]">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

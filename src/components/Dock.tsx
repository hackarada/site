import { navItems, type SectionId } from "@/data/content";

type DockProps = {
  active: SectionId;
  onNavigate: (id: SectionId) => void;
};

export function Dock({ active, onNavigate }: DockProps) {
  return (
    <nav
      aria-label="Primary"
      className="fixed top-1/2 left-3 z-[70] -translate-y-1/2 md:left-5"
    >
      <div className="flex flex-col gap-0.5 rounded-3xl border border-line bg-void/80 p-1.5 shadow-glow backdrop-blur-xl md:min-w-[10.25rem] md:p-2">
        {navItems.map((item) => {
          const isActive = item.id === active;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`flex items-center justify-center gap-2 rounded-2xl px-2.5 py-2.5 transition md:justify-start md:px-3 ${
                isActive
                  ? "bg-phosphor/12 text-phosphor"
                  : "text-mist hover:text-silver"
              }`}
            >
              <span className="font-mono text-[10px] tracking-[0.18em]">{item.short}</span>
              <span className="hidden font-sans text-[12px] md:inline">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

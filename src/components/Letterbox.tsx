const TICKER = [
  "ZERO TRUST",
  "DEVSECOPS",
  "PRODUCT SECURITY",
  "CI/CD",
  "SAST",
  "CONTENT SECURITY",
  "DRM",
  "AI RED TEAM",
  "CLOUD ARCHITECTURE",
  "THE CONSTRUCT",
  "STUDIO SYSTEMS",
  "LEAST PRIVILEGE",
];

export function Letterbox() {
  const line = [...TICKER, ...TICKER].join("   ·   ");

  return (
    <>
      <div className="letterbox top-0 flex items-center overflow-hidden">
        <div className="ticker flex whitespace-nowrap font-mono text-[9px] tracking-[0.28em] text-phosphor-dim">
          <span className="px-4">{line}</span>
          <span className="px-4">{line}</span>
        </div>
      </div>
    </>
  );
}

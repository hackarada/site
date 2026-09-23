import { useEffect, useRef } from "react";

const LATIN = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIGITS = "0123456789";
const GEEZ = [
  0x1200, 0x1208, 0x1210, 0x1218, 0x1228, 0x1230, 0x1238, 0x1240, 0x1260, 0x1270, 0x1278,
  0x1290, 0x1298, 0x12a0, 0x12a8, 0x12b8, 0x12c8, 0x12d8, 0x12e8, 0x12f0, 0x1308, 0x1320,
  0x1328, 0x1348, 0x1350, 0x1201, 0x1209, 0x1219, 0x1229, 0x1231, 0x1261, 0x1271, 0x1291,
  0x12a1, 0x12a9, 0x12c9, 0x12e9, 0x12f1, 0x1309, 0x1349, 0x1202, 0x120a, 0x121a, 0x1232,
  0x1262, 0x1272, 0x1292, 0x12a2, 0x12aa, 0x12ea, 0x12f2, 0x130a, 0x1203, 0x120b, 0x121b,
  0x1233, 0x1263, 0x1273, 0x1293, 0x12a3, 0x12ab, 0x12eb, 0x12f3, 0x130b, 0x1205, 0x120d,
  0x121d, 0x1235, 0x1265, 0x1275, 0x1295, 0x12a5, 0x12ad, 0x12cd, 0x12ed, 0x12f5, 0x130d,
  0x134d, 0x1206, 0x120e, 0x121e, 0x1236, 0x1266, 0x1276, 0x1296, 0x12a6, 0x12ae, 0x12ee,
  0x12f6, 0x130e, 0x1369, 0x136a, 0x136b, 0x136c, 0x136d, 0x136e, 0x136f, 0x1370, 0x1371,
  0x1372,
]
  .map((code) => String.fromCodePoint(code))
  .join("");
const CELL = 18;

function pick(set: string): string {
  return set[Math.floor(Math.random() * set.length)] ?? "0";
}

type Stream = {
  y: number;
  speed: number;
  length: number;
  glyphs: string[];
};

function randomGlyph(): string {
  const roll = Math.random();
  if (roll < 0.38) {
    return pick(LATIN);
  }
  if (roll < 0.56) {
    return pick(DIGITS);
  }
  return pick(GEEZ);
}

function createStream(): Stream {
  const length = 8 + Math.floor(Math.random() * 10);
  return {
    y: Math.random() * -80,
    speed: 0.1 + Math.random() * 0.16,
    length,
    glyphs: Array.from({ length }, randomGlyph),
  };
}

export function MatrixField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    let animationId = 0;
    let started = false;
    let cancelled = false;
    let width = 0;
    let height = 0;
    let streams: Stream[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const columns = Math.floor(width / CELL);
      streams = Array.from({ length: columns }, createStream);
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      context.font = "700 15px 'Noto Sans Ethiopic', 'IBM Plex Mono', sans-serif";

      for (let i = 0; i < streams.length; i += 1) {
        const stream = streams[i];
        const x = i * CELL;
        if (!reduced) {
          stream.y += stream.speed;
        }

        const head = Math.floor(stream.y);
        for (let t = 0; t < stream.length; t += 1) {
          const row = head - t;
          if (row < 0) {
            continue;
          }
          const y = row * CELL;
          if (y > height + CELL) {
            continue;
          }
          if (Math.random() > 0.965) {
            stream.glyphs[t] = randomGlyph();
          }
          const alpha = t === 0 ? 0.78 : Math.max(0.16, 0.55 * (1 - t / stream.length));
          context.fillStyle = `rgba(21, 122, 54, ${alpha})`;
          context.fillText(stream.glyphs[t] ?? randomGlyph(), x, y);
        }

        if (head - stream.length > height / CELL + 4 && Math.random() > 0.95) {
          streams[i] = createStream();
        }
      }

      if (!reduced) {
        animationId = window.requestAnimationFrame(draw);
      }
    };

    const boot = () => {
      if (cancelled || started) {
        return;
      }
      started = true;
      resize();
      if (reduced) {
        draw();
      } else {
        animationId = window.requestAnimationFrame(draw);
      }
    };

    void document.fonts.ready.then(boot);
    const fallback = window.setTimeout(boot, 1200);

    window.addEventListener("resize", resize);
    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-60"
    />
  );
}

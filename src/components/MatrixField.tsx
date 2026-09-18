import { useEffect, useRef } from "react";

const GLYPHS =
  "アカサタナハマヤラワガザダバパキシシチニヒミリギジビピウクスツヌフムユルグズブプケセテネヘメレゲゼデベペコソトノホモヨロゴゾドボポ0123456789ABCDEF<>/[]#*";

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

    let frame = 0;
    let animationId = 0;
    let width = 0;
    let height = 0;
    let columns = 0;
    let drops: number[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.floor(width / 22);
      drops = Array.from({ length: columns }, () => Math.random() * -40);
    };

    const draw = () => {
      context.fillStyle = "rgba(5, 6, 5, 0.18)";
      context.fillRect(0, 0, width, height);
      context.font = "13px 'IBM Plex Mono', monospace";

      for (let i = 0; i < drops.length; i += 1) {
        const x = i * 22;
        const y = drops[i] * 18;
        const head = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        context.fillStyle = "rgba(180, 255, 190, 0.55)";
        context.fillText(head, x, y);
        context.fillStyle = "rgba(63, 138, 76, 0.18)";
        context.fillText(GLYPHS[Math.floor(Math.random() * GLYPHS.length)], x, y - 18);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        } else {
          drops[i] += Math.random() > 0.4 ? 1 : 0;
        }
      }

      frame += 1;
      if (!reduced) {
        animationId = window.requestAnimationFrame(draw);
      }
    };

    resize();
    if (reduced) {
      draw();
    } else {
      animationId = window.requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);
    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      void frame;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-40"
    />
  );
}

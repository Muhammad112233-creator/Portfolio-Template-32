"use client";
import { useEffect, useRef } from "react";

/**
 * A small ink dot that trails the pointer. Over anything clickable it opens
 * into a hollow ring; over images marked data-cursor-label it shows a word.
 * Hidden on touch screens.
 */
export default function Cursor() {
  const wrap = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLSpanElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const html = document.documentElement;
    html.classList.add("has-cursor");
    const el = wrap.current!;
    let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y, raf = 0, shown = false;

    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      if (!shown) { shown = true; cx = x; cy = y; el.dataset.visible = ""; }
      const t = e.target as HTMLElement;
      const labelled = t.closest<HTMLElement>("[data-cursor-label]");
      const hot = t.closest("a, button, [role='button'], input, textarea, select, label, [data-hot]");
      el.dataset.state = labelled ? "label" : hot ? "ring" : "dot";
      if (label.current) label.current.textContent = labelled?.dataset.cursorLabel || "";
    };
    const down = () => (el.dataset.down = "");
    const up = () => delete el.dataset.down;
    const leave = () => { delete el.dataset.visible; shown = false; };
    const loop = () => {
      cx += (x - cx) * 0.2; cy += (y - cy) * 0.2;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    addEventListener("pointermove", move, { passive: true });
    addEventListener("pointerdown", down);
    addEventListener("pointerup", up);
    document.addEventListener("mouseleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      html.classList.remove("has-cursor");
      removeEventListener("pointermove", move);
      removeEventListener("pointerdown", down);
      removeEventListener("pointerup", up);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div ref={wrap} className="zm-cursor" data-cursor aria-hidden="true" data-state="dot">
      <span ref={dot} className="zm-cursor-dot" />
      <span ref={label} className="zm-cursor-label" />
      <style>{`
        .zm-cursor{position:fixed;left:0;top:0;z-index:2147483600;pointer-events:none;opacity:0;transition:opacity .3s}
        .zm-cursor[data-visible]{opacity:1}
        .zm-cursor-dot{position:absolute;left:0;top:0;display:block;width:9px;height:9px;margin:-4.5px 0 0 -4.5px;border-radius:50%;
          background:var(--accent);border:0 solid var(--accent);box-sizing:border-box;
          transition:width .38s var(--ease-out),height .38s var(--ease-out),margin .38s var(--ease-out),background-color .38s var(--ease-out),border-width .38s var(--ease-out),transform .2s}
        .zm-cursor[data-state="ring"] .zm-cursor-dot{width:34px;height:34px;margin:-17px 0 0 -17px;background:transparent;border-width:1px}
        .zm-cursor[data-state="label"] .zm-cursor-dot{width:84px;height:84px;margin:-42px 0 0 -42px;background:var(--accent)}
        .zm-cursor[data-down] .zm-cursor-dot{transform:scale(.8)}
        .zm-cursor-label{position:absolute;left:0;top:0;transform:translate(-50%,-50%);font-family:var(--f-caps);font-size:10px;letter-spacing:.2em;
          text-transform:uppercase;color:var(--paper);white-space:nowrap;opacity:0;transition:opacity .3s}
        .zm-cursor[data-state="label"] .zm-cursor-label{opacity:1}
      `}</style>
    </div>
  );
}

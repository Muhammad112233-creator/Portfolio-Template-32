"use client";
import { useRef } from "react";
import { person, hero } from "@/data/site";
import Monogram from "./Monogram";
import c from "./card.module.css";

/** A library catalogue card that tilts toward the pointer with a moving sheen. */
export default function CatalogueCard({ tilt = false }: { tilt?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    if (!tilt || e.pointerType !== "mouse") return;
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-py * 10).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(px * 14).toFixed(2)}deg`);
    el.style.setProperty("--gx", `${(px + 0.5) * 100}%`);
    el.style.setProperty("--gy", `${(py + 0.5) * 100}%`);
  };
  const onLeave = () => {
    const el = ref.current!;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div className={c.wrap} onPointerMove={onMove} onPointerLeave={onLeave} data-hot={tilt ? "" : undefined}>
      <div className={c.shadow} aria-hidden="true" />
      <div ref={ref} className={c.card} data-card>
        <span className={c.gloss} aria-hidden="true" />
        <span className={c.rules} aria-hidden="true" />
        <span className={c.margin} aria-hidden="true" />
        <span className={c.hole} aria-hidden="true" />

        <div className={c.top}>
          <span className={c.call} data-card-el>
            <span className={c.callLabel}>Call no.</span>
            {hero.callNo}
          </span>
          <span className={c.corner} data-card-el>{person.role}</span>
          <Monogram className={c.mono} size={44} />
        </div>

        <div className={c.body}>
          <div className={c.name} data-card-el>{person.name.toUpperCase()}</div>
          <div className={c.rule} data-card-rule />
          <div className={c.title} data-card-el>{person.line}</div>
          <div className={c.foot} data-card-el>
            <span className={c.city}>{person.city.toUpperCase()}</span>
            <span>{person.email}</span>
            <span className={c.stampMini}>Available</span>
          </div>
        </div>
      </div>
    </div>
  );
}

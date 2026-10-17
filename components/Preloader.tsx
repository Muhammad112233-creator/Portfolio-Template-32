"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";
import CatalogueCard from "./CatalogueCard";
import s from "./shell.module.css";

/** First-visit loader: a blank catalogue card fills in while a counter runs to 100. */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current!;
    const o = { v: 0 };
    const items = el.querySelectorAll("[data-card-el]");
    const tl = gsap.timeline({ onComplete: onDone });
    tl.from(el.querySelector("[data-card]"), { y: 40, rotateX: 18, opacity: 0, duration: 1.1, ease: "expo.out" })
      .to(o, { v: 100, duration: 1.9, ease: "power2.inOut", onUpdate: () => { if (num.current) num.current.textContent = String(Math.round(o.v)).padStart(3, "0"); } }, 0.1)
      .from(items, { opacity: 0, y: 8, stagger: 0.12, duration: 0.6, ease: "power2.out" }, 0.5)
      .from(el.querySelector("[data-card-rule]"), { scaleX: 0, duration: 1, ease: "expo.inOut" }, 0.7)
      .to(el.querySelector("[data-card]"), { y: -24, scale: 0.96, duration: 0.6, ease: "power2.in" }, "+=0.15")
      .to(el, { clipPath: "inset(0 0 100% 0)", duration: 0.95, ease: "expo.inOut" }, "-=0.2");
    return () => { tl.kill(); };
  }, [onDone]);

  return (
    <div ref={root} className={s.preloader} aria-hidden="true">
      <div className={s.preloaderCard}><CatalogueCard /></div>
      <div className={s.preloaderFoot}>
        <span>Fetching from the stacks</span>
        <span ref={num} className={s.preloaderNum}>000</span>
      </div>
    </div>
  );
}

"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export { gsap, ScrollTrigger };

const reduced = () => document.documentElement.classList.contains("reduced");

/**
 * Wires every declarative animation hook inside `root`:
 *   [data-split]   heading: words rise out of masked lines
 *   [data-reveal]  fade + lift
 *   [data-rule]    hairline draws from the left
 *   [data-count]   number counts up (data-group="on" adds thousands separators)
 *   [data-stagger] children fade in one after another
 *   [data-parallax] gentle vertical drift (value = strength)
 */
export function initMotion(root: HTMLElement) {
  const ctx = gsap.context(() => {
    if (reduced()) {
      gsap.set(root.querySelectorAll("[data-reveal],[data-rule],[data-split]"), { clearProps: "all", opacity: 1, visibility: "visible" });
      return;
    }

    root.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
      const split = new SplitText(el, { type: "lines,words", linesClass: "split-line", wordsClass: "split-word" });
      gsap.set(el, { visibility: "visible" });
      gsap.from(split.words, {
        yPercent: 110, rotate: 2, duration: 1.15, ease: "expo.out", stagger: 0.045,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });

    root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      gsap.to(el, {
        opacity: 1, y: 0, duration: 1.1, ease: "expo.out",
        delay: parseFloat(el.dataset.delay || "0"),
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    });

    root.querySelectorAll<HTMLElement>("[data-rule]").forEach((el) => {
      gsap.to(el, {
        scaleX: 1, duration: 1.4, ease: "expo.inOut",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      });
    });

    root.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
      const end = parseFloat(el.dataset.count || "0");
      const group = el.dataset.group === "on";
      const pad = parseInt(el.dataset.pad || "0", 10);
      const o = { v: 0 };
      const fmt = (n: number) => {
        let s = group ? Math.round(n).toLocaleString("en-GB") : String(Math.round(n));
        if (pad) s = s.padStart(pad, "0");
        return s;
      };
      el.textContent = fmt(0);
      gsap.to(o, {
        v: end, duration: 2.2, ease: "power3.out",
        onUpdate: () => { el.textContent = fmt(o.v); },
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });

    root.querySelectorAll<HTMLElement>("[data-stagger]").forEach((el) => {
      gsap.from(el.children, {
        opacity: 0, y: 22, duration: 0.9, ease: "expo.out", stagger: 0.08,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    });

    root.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
      const s = parseFloat(el.dataset.parallax || "8");
      gsap.fromTo(el, { yPercent: -s }, {
        yPercent: s, ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      });
    });
  }, root);

  requestAnimationFrame(() => ScrollTrigger.refresh());
  return () => ctx.revert();
}

"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/motion";
import { hero, person } from "@/data/site";
import { asset } from "@/lib/base";
import { useShell } from "../SiteShell";
import CatalogueCard from "../CatalogueCard";
import Magnet from "../Magnet";
import Roll from "../Roll";
import h from "./home.module.css";

export default function Hero() {
  const { ready } = useShell();
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ready || !root.current) return;
    const el = root.current;
    if (document.documentElement.classList.contains("reduced")) {
      gsap.set(el.querySelectorAll("[data-hero-in],[data-line]"), { opacity: 1, y: 0, yPercent: 0, transform: "none" });
      return;
    }
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.from(el.querySelector("[data-hero-card]"), { y: 60, rotateX: 20, rotateZ: -3, opacity: 0, duration: 1.6 })
      .from(el.querySelectorAll("[data-card-el]"), { opacity: 0, y: 6, stagger: 0.08, duration: 0.8 }, 0.4)
      .from(el.querySelector("[data-card-rule]"), { scaleX: 0, duration: 1.2, ease: "expo.inOut" }, 0.5)
      .fromTo(el.querySelectorAll("[data-line]"), { y: 0, yPercent: 115 }, { y: 0, yPercent: 0, duration: 1.3, stagger: 0.12 }, 0.25)
      .fromTo(el.querySelectorAll("[data-hero-in]"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.1, stagger: 0.1 }, 0.55);
    return () => { tl.kill(); };
  }, [ready]);

  return (
    <section id="hero" ref={root} className={h.hero}>
      <div className={`shell ${h.heroGrid}`}>
        <div className={h.heroCardCol} data-hero-card>
          <CatalogueCard tilt />
          <p className={h.cardHint} data-hero-in data-touch-hide>Card 1 of 1 · move your cursor over it</p>
        </div>

        <div className={h.heroCopy}>
          <span className="eyebrow" data-hero-in><span className="eyebrow-rule" />{hero.eyebrow}</span>
          <h1 className={h.heroStatement}>
            {hero.lines.map((l) => (
              <span key={l} className={h.heroLine}><span data-line>{l}</span></span>
            ))}
          </h1>
          <p className={h.heroStand} data-hero-in>{hero.stand}</p>

          <div className={h.heroFoot} data-hero-in>
            <figure className={h.portrait}>
              <div className={h.portraitFrame} data-cursor-label="Hello">
                <img src={asset("/images/portrait.jpg")} alt={`Portrait of ${person.name}`} width={540} height={720} />
              </div>
              <figcaption className={h.portraitCap}><span>{person.name}</span><span>{person.city}</span></figcaption>
            </figure>
            <div className={h.heroActions}>
              <Magnet href="/contact/" className="cta"><Roll>Start a conversation</Roll></Magnet>
              <Link href="/#work" className="cta cta-ghost"><Roll>Selected work</Roll></Link>
              <span className={h.avail}><span className={h.availDot} />{person.availability}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="shell" data-hero-in>
        <div className={h.scrollCue}><span className={h.scrollRule} aria-hidden="true" />Scroll to read on</div>
      </div>
    </section>
  );
}

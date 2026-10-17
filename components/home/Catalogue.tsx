"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/motion";
import { catalogue } from "@/data/site";
import SectionHead from "./SectionHead";
import h from "./home.module.css";

/** I — The Catalogue: capabilities filed like library records, then stamped. */
export default function Catalogue() {
  const stamp = useRef<HTMLDivElement>(null);
  const table = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(0);
  const total = catalogue.reduce((a, c) => a + c.vol, 0);
  const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase();

  useEffect(() => {
    if (document.documentElement.classList.contains("reduced")) return;
    const ctx = gsap.context(() => {
      gsap.from(table.current!.querySelectorAll("[data-row]"), {
        opacity: 0, x: -20, duration: 0.9, ease: "expo.out", stagger: 0.09,
        scrollTrigger: { trigger: table.current, start: "top 80%", once: true },
      });
      gsap.fromTo(stamp.current, { scale: 2.4, rotate: -24, opacity: 0 }, {
        scale: 1, rotate: -9, opacity: 1, duration: 0.5, ease: "back.out(2.2)",
        scrollTrigger: { trigger: stamp.current, start: "top 85%", once: true },
      });
    });
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section id="catalogue" className={h.section}>
      <div className="shell">
        <SectionHead numeral="I" label="The Catalogue" title="What I do, filed against what it made" index={`Drawer A · ${String(catalogue.length).padStart(2, "0")} records`} />

        <div className={h.drawer} ref={table}>
          <div className={h.drawerHead} aria-hidden="true">
            <span>Call no.</span><span>Subject · and what it produced</span><span>Shelved</span><span>Vols.</span>
          </div>
          <ol>
            {catalogue.map((c, i) => {
              const isOpen = open === i;
              return (
                <li key={c.call} className={h.record} data-row data-open={isOpen ? "" : undefined}>
                  <button type="button" className={h.recordBtn} aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)}>
                    <span className={h.recordCall}>{c.call}</span>
                    <span className={h.recordSubject}>{c.subject}</span>
                    <span className={h.recordYear}>{c.year}</span>
                    <span className={h.recordVol}>{String(c.vol).padStart(2, "0")}</span>
                    <span className={h.recordPlus} aria-hidden="true" />
                  </button>
                  <div className={h.recordMore}>
                    <div>
                      <p className={h.recordSee}><em>See also</em>{c.produced}</p>
                      <p className={h.recordNote}>({c.note})</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <div className={h.drawerFoot}>
            <span className={h.drawerTotalLabel}>Volumes on the shelf</span>
            <span className={h.drawerTotal}><span data-count={total} data-pad="3">{total}</span></span>
          </div>
          <div className={h.stampRow}>
            <div ref={stamp} className={h.stamp} aria-label={`Catalogued ${today}`}>
              <span>Catalogued</span>
              <strong>{today}</strong>
              <span>Checked &amp; shelved</span>
            </div>
            <p className={h.drawerNote}>Every record here points at work you can look at further down the page. Open a record to see what it produced.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

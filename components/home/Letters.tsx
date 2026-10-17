import { letters } from "@/data/site";
import SectionHead from "./SectionHead";
import h from "./home.module.css";

/** IV — Correspondence: client words as letters, each with a postmark. */
export default function Letters() {
  return (
    <section id="letters" className={`${h.section} ${h.sheetPaper}`}>
      <div className="shell">
        <SectionHead numeral="IV" label="Correspondence" title="Letters from clients" index={`${String(letters.length).padStart(2, "0")} letters · kept in the order they arrived`} />
        <div className={h.letterGrid}>
          {letters.map((l, i) => (
            <figure key={l.n} className={`${h.letter} ${i < 2 ? h.letterWide : ""}`} data-reveal data-delay={String((i % 3) * 0.08)}>
              <span className={h.letterNo}>{l.n}</span>
              <svg className={h.postmark} viewBox="0 0 80 80" aria-hidden="true">
                <circle cx="40" cy="40" r="30" fill="none" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="40" cy="40" r="24" fill="none" stroke="currentColor" strokeWidth=".6" />
                <text x="40" y="37" textAnchor="middle" fontSize="10" fill="currentColor" letterSpacing="1">{l.stamp}</text>
                <text x="40" y="50" textAnchor="middle" fontSize="7" fill="currentColor" letterSpacing="1">2026</text>
                <path d="M68 30h12M68 36h12M68 42h12M68 48h12" stroke="currentColor" strokeWidth=".8" />
              </svg>
              <blockquote className={h.letterQuote}>“{l.quote}”</blockquote>
              <figcaption className={h.letterWho}>
                <span className={h.letterName}>{l.name}</span>
                <span className={h.letterRole}>{l.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

import { recognition as r } from "@/data/site";
import SectionHead from "./SectionHead";
import h from "./home.module.css";

function Seal({ tone, label }: { tone: string; label: string }) {
  return (
    <svg className={h.seal} viewBox="0 0 100 100" aria-hidden="true" style={{ color: tone }}>
      <path fill="currentColor" d={Array.from({ length: 24 }).map((_, i) => {
        const a = (i / 24) * Math.PI * 2, rr = i % 2 ? 44 : 48;
        return `${i ? "L" : "M"}${(50 + Math.cos(a) * rr).toFixed(2)} ${(50 + Math.sin(a) * rr).toFixed(2)}`;
      }).join(" ") + "Z"} />
      <circle cx="50" cy="50" r="36" fill="none" stroke="#fff" strokeWidth="1" opacity=".7" />
      <circle cx="50" cy="50" r="32" fill="none" stroke="#fff" strokeWidth=".5" strokeDasharray="1 2" opacity=".7" />
      <text x="50" y="47" textAnchor="middle" fill="#fff" fontSize="8" letterSpacing="1.5" style={{ fontFamily: "var(--f-caps)" }}>{label.split(" ")[0].toUpperCase()}</text>
      <text x="50" y="59" textAnchor="middle" fill="#fff" fontSize="6" letterSpacing="1.2" style={{ fontFamily: "var(--f-mono)" }}>{r.year}</text>
    </svg>
  );
}

function Mark({ i }: { i: number }) {
  const shapes = [
    <g key="a"><rect x="4" y="6" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M8 20l6-10 6 10" fill="none" stroke="currentColor" strokeWidth="1.6" /></g>,
    <g key="b"><circle cx="14" cy="16" r="10" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M9 16h10M14 11v10" stroke="currentColor" strokeWidth="1.6" /></g>,
    <g key="c"><path d="M4 26L14 6l10 20z" fill="none" stroke="currentColor" strokeWidth="1.6" /><circle cx="14" cy="19" r="2.5" fill="currentColor" /></g>,
  ];
  return <svg viewBox="0 0 28 32" className={h.mark} aria-hidden="true">{shapes[i % 3]}</svg>;
}

export default function Recognition() {
  return (
    <section id="recognition" className={h.section}>
      <div className="shell">
        <SectionHead numeral="V" label="Recognition" title="Mentions and talks" index={`${r.features} features and ${r.talks} talks in ${r.year}`} />
        <div className={h.honours}>
          <div className={h.honoursPlate} data-reveal>
            <h3 className={h.honoursHead}>Recognition, {r.year}</h3>
            <svg className={h.laurel} viewBox="0 0 120 40" aria-hidden="true">
              <path d="M60 36c-14-2-28-10-34-26M60 36c14-2 28-10 34-26" fill="none" stroke="currentColor" strokeWidth=".9" />
              {[0, 1, 2, 3, 4].map((i) => (
                <g key={i}>
                  <ellipse cx={30 + i * 5.5} cy={14 + i * 4.4} rx="4" ry="1.8" transform={`rotate(${40 - i * 8} ${30 + i * 5.5} ${14 + i * 4.4})`} fill="currentColor" opacity=".6" />
                  <ellipse cx={90 - i * 5.5} cy={14 + i * 4.4} rx="4" ry="1.8" transform={`rotate(${-40 + i * 8} ${90 - i * 5.5} ${14 + i * 4.4})`} fill="currentColor" opacity=".6" />
                </g>
              ))}
            </svg>
            <div className={h.honoursFig}><span className={h.honoursCount} data-count={r.features} data-pad="2">{String(r.features).padStart(2, "0")}</span><span className={h.honoursCountLabel}>Features</span></div>
            <div className={`${h.honoursFig} ${h.honoursFigMinor}`}><span className={h.honoursCount} data-count={r.talks} data-pad="2">{String(r.talks).padStart(2, "0")}</span><span className={h.honoursCountLabel}>Talks</span></div>
            <p className={h.honoursNote}>{r.note}</p>
          </div>

          <div className={h.honoursRoll}>
            <h4 className={h.rollHead}>Featured</h4>
            <ol className={h.wonList} data-stagger>
              {r.won.map((w) => (
                <li key={w.title} className={h.won}>
                  <Seal tone={w.tone} label={w.title} />
                  <span className={h.wonTitle}>{w.title}</span>
                  <span className={h.wonBody}>{w.body}</span>
                  <span className={h.wonDate}>{w.date}</span>
                </li>
              ))}
            </ol>
            <h4 className={h.rollHead}>Talks &amp; writing<span className={h.rollNote}>{r.year}</span></h4>
            <ol className={h.honourList}>
              {r.listed.map((l, i) => (
                <li key={l.body} className={h.honour} data-reveal>
                  <span className={h.honourNo}>{String(i + 1).padStart(3, "0")}</span>
                  <Mark i={i} />
                  <span className={h.honourText}><span className={h.honourBody}>{l.body}</span><span className={h.honourAward}>{l.award}</span></span>
                  <span className={h.honourStanding}>{l.standing}<span>{l.year}</span></span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <h3 className={h.noticeHeadline}>In print<span>Press and interviews, newest first.</span></h3>
        <div className={h.noticeList}>
          {r.notices.map((n) => (
            <div key={n.title} className={h.noticeRow} data-reveal>
              <span className={h.noticeLeft}>{n.left}</span>
              <span className={h.noticeRowTitle}>{n.title}</span>
              <span className={h.noticeRight}>{n.right}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { figures } from "@/data/site";
import SectionHead from "./SectionHead";
import h from "./home.module.css";

export default function Figures() {
  return (
    <section id="figures" className={h.section}>
      <div className="shell">
        <SectionHead numeral="III" label="Figures" title="A few honest numbers" index="Counted from finished work" />
        <div className={h.figures}>
          {figures.map((f) => (
            <div key={f.label} className={h.figureRow}>
              <span className={h.figureLabelWrap}>
                <span className={h.figureLabel}>{f.label}</span>
                <span className={h.figureNote}>{f.note}</span>
              </span>
              <span className={h.figureLeader} data-rule aria-hidden="true" />
              <span className={h.figureValue}><span data-count={f.value}>{f.value}</span><span className={h.figureSuffix}>{f.suffix}</span></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import h from "./home.module.css";

export default function SectionHead({ numeral, label, title, index }: {
  numeral: string; label: string; title: string; index: string;
}) {
  return (
    <div className={h.sectionHead}>
      <div className={h.sectionHeadMain}>
        <span className="eyebrow"><span className="eyebrow-rule" data-rule />{numeral} — {label}</span>
        <span className={h.headRule} data-rule aria-hidden="true" />
        <h2 className={h.sectionTitle} data-split>{title}</h2>
      </div>
      <p className={h.sectionIndex} data-reveal>{index}</p>
    </div>
  );
}

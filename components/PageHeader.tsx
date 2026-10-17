import p from "./inner.module.css";

export default function PageHeader({ eyebrow, title, lead, aside }: {
  eyebrow: string; title: string; lead?: string; aside?: React.ReactNode;
}) {
  return (
    <header className={p.header}>
      <div className={`shell ${p.headerGrid}`}>
        <div>
          <span className="eyebrow" data-reveal><span className="eyebrow-rule" data-rule />{eyebrow}</span>
          <h1 className={p.title} data-split>{title}</h1>
          {lead && <p className={p.lead} data-reveal>{lead}</p>}
        </div>
        {aside && <div className={p.aside} data-reveal>{aside}</div>}
      </div>
      <div className="shell"><span className={p.rule} data-rule aria-hidden="true" /></div>
    </header>
  );
}

import type { Metadata } from "next";
import InnerPage from "@/components/InnerPage";
import PageHeader from "@/components/PageHeader";
import { biography, person } from "@/data/site";
import { asset } from "@/lib/base";
import p from "@/components/inner.module.css";

export const metadata: Metadata = { title: "Biography" };

export default function About() {
  return (
    <InnerPage>
      <PageHeader eyebrow="Biography" title="An architect who builds websites" lead={biography.intro}
        aside={<figure className={p.asideFig}><img src={asset("/images/portrait.jpg")} alt={`${person.name}`} /><figcaption>{person.name} · {person.city}</figcaption></figure>} />
      <section className={p.body}>
        <div className={`shell ${p.cols}`}>
          <div className={p.prose}>
            {biography.paragraphs.map((t, i) => <p key={i} data-reveal className={i === 0 ? p.dropcap : undefined}>{t}</p>)}
          </div>
          <aside className={p.timeline}>
            <h2 className={p.smallHead} data-reveal>Chronology</h2>
            <ol>
              {biography.timeline.map((t) => (
                <li key={t.year} data-reveal><span className={p.tYear}>{t.year}</span><span>{t.text}</span></li>
              ))}
            </ol>
          </aside>
        </div>
        <div className="shell">
          <figure className={p.wideFig} data-reveal>
            <div className={p.wideImg} data-cursor-label="Desk"><img src={asset("/images/desk.jpg")} alt="Pencil wireframes and a laptop on the studio desk" data-parallax="6" /></div>
            <figcaption><span>Plate</span>Every project starts here: paper, pencil and a cup of chai.</figcaption>
          </figure>
        </div>
      </section>
    </InnerPage>
  );
}

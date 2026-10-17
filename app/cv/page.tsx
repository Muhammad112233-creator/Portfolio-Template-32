import type { Metadata } from "next";
import InnerPage from "@/components/InnerPage";
import PageHeader from "@/components/PageHeader";
import PrintButton from "@/components/PrintButton";
import { person, resume } from "@/data/site";
import p from "@/components/inner.module.css";

export const metadata: Metadata = { title: "Résumé" };

export default function CV() {
  return (
    <InnerPage>
      <PageHeader eyebrow="Résumé" title={person.name} lead={resume.summary}
        aside={<div className={p.cvAside}><span>{person.email}</span><span>{person.phone}</span><span>{person.city}, {person.country}</span><PrintButton /></div>} />
      <section className={p.body}>
        <div className="shell">
          <div className={p.cvBlock}>
            <h2 className={p.smallHead} data-reveal>Experience</h2>
            <div>
              {resume.experience.map((e) => (
                <article key={e.title} className={p.cvItem} data-reveal>
                  <span className={p.cvWhen}>{e.when}</span>
                  <div>
                    <h3 className={p.cvTitle}>{e.title}</h3>
                    <p className={p.cvWhere}>{e.where}</p>
                    <ul className={p.cvPoints}>{e.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className={p.cvBlock}>
            <h2 className={p.smallHead} data-reveal>Education</h2>
            <div>
              {resume.education.map((e) => (
                <article key={e.title} className={p.cvItem} data-reveal>
                  <span className={p.cvWhen}>{e.when}</span>
                  <div><h3 className={p.cvTitle}>{e.title}</h3><p className={p.cvWhere}>{e.where}</p></div>
                </article>
              ))}
            </div>
          </div>
          <div className={p.cvBlock}>
            <h2 className={p.smallHead} data-reveal>Skills</h2>
            <dl className={p.skills}>
              {resume.skills.map(([k, v]) => <div key={k} data-reveal><dt>{k}</dt><dd>{v}</dd></div>)}
            </dl>
          </div>
        </div>
      </section>
    </InnerPage>
  );
}

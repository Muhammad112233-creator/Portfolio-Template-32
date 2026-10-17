"use client";
import Link from "next/link";
import { useState } from "react";
import { projects, practice } from "@/data/site";
import { asset } from "@/lib/base";
import SectionHead from "./SectionHead";
import h from "./home.module.css";

/** II — On exhibition: delivered work as gallery plates, then practice areas. */
export default function Work() {
  const [fanned, setFanned] = useState<string | null>(null);
  return (
    <section id="work" className={`${h.section} ${h.sheetBone}`}>
      <div className="shell">
        <SectionHead numeral="II" label="On exhibition" title="Selected work, hung at eye level" index="Six areas of practice · case files in preparation" />

        <div className={h.register}>
          <p className={h.registerHead}>
            <span>Register of exhibited work</span>
            <span className={h.registerRule} data-rule aria-hidden="true" />
            <span className={h.registerNote}>{String(projects.length).padStart(2, "0")} on view · newest first</span>
          </p>

          <ol reversed className={h.plates}>
            {projects.map((p) => (
              <li key={p.slug}>
                <article className={h.notice} data-reveal aria-labelledby={`p-${p.slug}`}>
                  <div className={h.noticeHead}>
                    <span className={h.onView}><span className={h.onViewDot} />On view</span>
                    <span className={h.noticeNo}>No. {p.no}</span>
                    <span className={h.noticeRule} aria-hidden="true" />
                    <span className={h.noticeNote}>Opened {p.year} · <span className={h.nowrap}>live at {p.live}</span></span>
                  </div>
                  <div className={h.noticeBody}>
                    <div className={h.plateSet}>
                      <figure className={h.plate}>
                        <div className={h.mat} data-cursor-label="View">
                          <div className={h.screen}>
                            <span className={h.screenBar} aria-hidden="true"><i /><i /><i /></span>
                            <img className={h.shot} src={asset(p.shots.desktop)} alt={`${p.name}: the home page on a desktop`} loading="lazy" />
                            <img className={h.shotAlt} src={asset(p.shots.desktopAlt)} alt="" loading="lazy" />
                          </div>
                        </div>
                        <figcaption className={h.plateLabel}><span>Plate I</span><em>The desktop</em></figcaption>
                      </figure>
                      <figure className={`${h.plate} ${h.platePhone}`}>
                        <div className={h.mat}>
                          <div className={h.phone}><img className={h.shot} src={asset(p.shots.phone)} alt={`${p.name} on a phone`} loading="lazy" /></div>
                        </div>
                        <figcaption className={h.plateLabel}><span>Plate II</span><em>The phone</em></figcaption>
                      </figure>
                    </div>
                    <div className={h.noticeText}>
                      <span className={h.kicker}>Exhibition note · {p.sector}</span>
                      <h3 id={`p-${p.slug}`} className={h.noticeTitle}>{p.name}</h3>
                      <p className={h.noticeKind}>{p.kind}</p>
                      <dl className={h.facts}>
                        <div><dt>Client</dt><dd>{p.client}</dd></div>
                        <div><dt>Built with</dt><dd>{p.stack}</dd></div>
                        <div className={h.factWide}><dt>Delivered</dt><dd>{p.delivered}</dd></div>
                      </dl>
                      <figure className={h.pull}>
                        <blockquote>{p.quote}</blockquote>
                        <figcaption>{p.quoteBy}</figcaption>
                      </figure>
                      <div className={h.noticeActions}>
                        <Link className={h.readLink} href={`/work/${p.slug}/`}>Read the exhibition note <span aria-hidden="true">→</span></Link>
                        <a className={h.outLink} href={p.url} target="_blank" rel="noopener noreferrer">
                          <span>{p.live} <span aria-hidden="true">↗</span></span>
                          <small>Opens the live site in a new tab</small>
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>

        <div className={h.practice}>
          {practice.map((p) => {
            const on = fanned === p.n;
            return (
              <div key={p.n} className={h.practiceRow} data-reveal>
                <span className={h.practiceNumeral} aria-hidden="true">{p.n}</span>
                <span className={h.practiceMain}>
                  <span className={h.practiceTitle}>{p.title}</span>
                  <span className={h.practiceSummary}>{p.summary}</span>
                </span>
                <span className={h.practiceSide}>
                  <span className={h.practiceDisc}>{p.discipline}</span>
                  <span className={h.practiceOut}>{p.outcome}</span>
                  <span className={h.caseFoot}>
                    <span className="tag">In preparation</span>
                    <button type="button" className={h.folder} aria-pressed={on} onClick={() => setFanned(on ? null : p.n)}
                      aria-label={`${p.title}: case file, in preparation`}>
                      <span className={h.folderCard} /><span className={h.folderCard} /><span className={h.folderCard} />
                      <span className={h.folderFront}>{p.n}</span>
                    </button>
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import InnerPage from "@/components/InnerPage";
import PageHeader from "@/components/PageHeader";
import { projects } from "@/data/site";
import { asset } from "@/lib/base";
import p from "@/components/inner.module.css";

export const dynamicParams = false;
export function generateStaticParams() { return projects.map((x) => ({ slug: x.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const pr = projects.find((x) => x.slug === slug);
  return { title: pr ? pr.name : "Work" };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pr = projects.find((x) => x.slug === slug);
  if (!pr) notFound();
  const i = projects.indexOf(pr);
  const next = projects[(i + 1) % projects.length];

  return (
    <InnerPage>
      <PageHeader eyebrow={`Exhibition note · No. ${pr.no} · ${pr.sector}`} title={pr.name} lead={pr.kind}
        aside={<dl className={p.metaList}><div><dt>Client</dt><dd>{pr.client}</dd></div><div><dt>Year</dt><dd>{pr.year}</dd></div><div><dt>Built with</dt><dd>{pr.stack}</dd></div><div><dt>Live</dt><dd><a className="ulink" href={pr.url} target="_blank" rel="noopener noreferrer">{pr.live} ↗</a></dd></div></dl>} />
      <section className={p.body}>
        <div className="shell">
          <figure className={p.wideFig} data-reveal>
            <div className={p.browser} data-cursor-label="Live"><span className={p.browserBar}><i /><i /><i /><b>{pr.live}</b></span><img src={asset(pr.shots.desktop)} alt={`${pr.name}, home page`} /></div>
            <figcaption><span>Plate I</span>The home page, as it opens on a desktop.</figcaption>
          </figure>

          <div className={p.cols}>
            <div className={p.prose}>
              <h2 className={p.smallHead} data-reveal>The brief</h2>
              <p data-reveal className={p.dropcap}>{pr.brief}</p>
              <h2 className={p.smallHead} data-reveal>The approach</h2>
              <ol className={p.steps}>
                {pr.approach.map((a, k) => <li key={k} data-reveal><span>{String(k + 1).padStart(2, "0")}</span><p>{a}</p></li>)}
              </ol>
              <blockquote className={p.bigQuote} data-reveal>{pr.quote}<cite>{pr.quoteBy}</cite></blockquote>
            </div>
            <aside className={p.timeline}>
              <h2 className={p.smallHead} data-reveal>The outcome</h2>
              <ol className={p.outcomes}>
                {pr.outcome.map((o) => <li key={o.label} data-reveal><strong>{o.value}</strong><span>{o.label}</span></li>)}
              </ol>
              <figure className={p.phoneFig} data-reveal>
                <div className={p.phoneFrame}><img src={asset(pr.shots.phone)} alt={`${pr.name} on a phone`} /></div>
                <figcaption>Plate II · The phone</figcaption>
              </figure>
            </aside>
          </div>

          <figure className={p.wideFig} data-reveal>
            <div className={p.browser}><span className={p.browserBar}><i /><i /><i /><b>{pr.live}</b></span><img src={asset(pr.shots.desktopAlt)} alt={`${pr.name}, an inner page`} /></div>
            <figcaption><span>Plate III</span>An inner page.</figcaption>
          </figure>

          <Link href={`/work/${next.slug}/`} className={p.nextProject} data-reveal>
            <span className={p.tYear}>Next exhibition</span>
            <span className={p.nextTitle}>{next.name} <span aria-hidden="true">→</span></span>
          </Link>
        </div>
      </section>
    </InnerPage>
  );
}

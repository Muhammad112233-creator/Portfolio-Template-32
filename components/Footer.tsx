"use client";
import Link from "next/link";
import { navLinks, person } from "@/data/site";
import { useShell } from "./SiteShell";
import Monogram from "./Monogram";
import Roll from "./Roll";
import f from "./footer.module.css";

export default function Footer() {
  const { openEditions, lenis } = useShell();
  const year = new Date().getFullYear();
  const toTop = () => { const l = lenis(); l ? l.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: "smooth" }); };
  return (
    <footer className={f.footer}>
      <div className={`shell ${f.inner}`}>
        <div className={f.top}>
          <div className={f.card}>
            <Monogram className={f.mono} size={46} />
            <div>
              <div className={f.name}>{person.name.toUpperCase()}</div>
              <div className={f.sub}>{person.role} · {person.line}<br />{person.city}, {person.country} · <a className="ulink" href={`mailto:${person.email}`}>{person.email}</a></div>
            </div>
          </div>
          <button type="button" className={f.top_btn} onClick={toTop} aria-label="Back to the top">
            <span aria-hidden="true">↑</span><Roll>Back to top</Roll>
          </button>
        </div>
        <div className={f.links}>
          <Link href="/"><Roll>Home</Roll></Link>
          {navLinks.map((l) => <Link key={l.href} href={l.href}><Roll>{l.label}</Roll></Link>)}
          <Link href="/contact/"><Roll>Contact</Roll></Link>
          <Link href="/privacy/"><Roll>Privacy</Roll></Link>
          <a href="#editions" role="button" data-no-curtain onClick={(e) => { e.preventDefault(); openEditions(); }}><Roll>Editions</Roll></a>
          {person.socials.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"><Roll>{`${s.label} ↗`}</Roll></a>)}
        </div>
        <div className={f.fine}>
          <p>© {year} {person.name}. Drawn in {person.city}, set in Cormorant, Cinzel and Plex Mono.</p>
          <p>Every figure on this site comes from finished work. Client names appear with permission.</p>
          <p>Built with Next.js, GSAP and Lenis. No cookies and no trackers.</p>
        </div>
        <div className={f.big} aria-hidden="true">{person.name}</div>
      </div>
    </footer>
  );
}

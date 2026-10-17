"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { navLinks, person } from "@/data/site";
import { useShell } from "./SiteShell";
import Monogram from "./Monogram";
import Roll from "./Roll";
import n from "./nav.module.css";

export default function Nav() {
  const { openEditions, lenis } = useShell();
  const [collapsed, setCollapsed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setCollapsed(y > 60);
      setHidden(y > 420 && y > last + 2);
      if (y < last - 2) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (open) lenis()?.stop(); else lenis()?.start();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, lenis]);

  const editions = (e: React.MouseEvent) => { e.preventDefault(); setOpen(false); openEditions(); };

  return (
    <>
      <nav className={n.nav} data-collapsed={collapsed ? "" : undefined} data-hidden={hidden && !open ? "" : undefined} data-open={open ? "" : undefined} aria-label="Main">
        <Link className={n.brand} href="/" aria-label={`${person.name}, home`}>
          <Monogram className={n.brandMono} size={34} />
          <span className={n.brandWord}>{person.name.toUpperCase()}</span>
        </Link>
        <div className={n.links}>
          {navLinks.map((l) => (
            <Link key={l.href} className={n.link} href={l.href}><Roll>{l.label}</Roll></Link>
          ))}
          <a className={n.link} href="#editions" role="button" aria-haspopup="dialog" data-no-curtain onClick={editions}><Roll>Editions</Roll></a>
        </div>
        <Link className={n.cta} href="/contact/"><Roll>Start a conversation</Roll></Link>
        <button type="button" className={n.toggle} aria-expanded={open} aria-controls="zm-index" onClick={() => setOpen(!open)}>
          <span>{open ? "Close" : "Index"}</span>
          <span className={n.toggleRules} aria-hidden="true"><span /><span /></span>
        </button>
      </nav>

      <div id="zm-index" className={n.menu} data-open={open ? "" : undefined} aria-hidden={!open}>
        <div className={n.menuCard}>
          <span className={n.menuHead}>Index of contents</span>
          <ol className={n.menuList}>
            {[{ label: "Home", href: "/" }, ...navLinks, { label: "Start a conversation", href: "/contact/" }].map((l, i) => (
              <li key={l.href} style={{ transitionDelay: open ? `${0.12 + i * 0.05}s` : "0s" }}>
                <Link href={l.href} tabIndex={open ? 0 : -1}>
                  <span className={n.menuNo}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={n.menuLabel}>{l.label}</span>
                  <span className={n.menuDots} aria-hidden="true" />
                  <span className={n.menuPage}>p. {(i + 1) * 7}</span>
                </Link>
              </li>
            ))}
            <li style={{ transitionDelay: open ? "0.42s" : "0s" }}>
              <a href="#editions" data-no-curtain onClick={editions} tabIndex={open ? 0 : -1}>
                <span className={n.menuNo}>06</span>
                <span className={n.menuLabel}>Editions</span>
                <span className={n.menuDots} aria-hidden="true" />
                <span className={n.menuPage}>p. 42</span>
              </a>
            </li>
          </ol>
          <div className={n.menuFoot}>
            <a href={`mailto:${person.email}`}>{person.email}</a>
            <span>{person.city}, {person.country}</span>
          </div>
        </div>
      </div>
    </>
  );
}

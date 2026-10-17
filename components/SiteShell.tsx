"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger, initMotion } from "@/lib/motion";
import { initSound, tick } from "@/lib/sound";
import { DEFAULT_EDITION, STORE_KEY } from "@/lib/editions";
import { BASE } from "@/lib/base";
import Cursor from "./Cursor";
import Preloader from "./Preloader";
import EditionDial from "./EditionDial";
import s from "./shell.module.css";

type ShellCtx = {
  edition: string;
  setEdition: (id: string) => void;
  openEditions: () => void;
  ready: boolean;
  lenis: () => Lenis | null;
};
const Ctx = createContext<ShellCtx>({
  edition: DEFAULT_EDITION, setEdition: () => {}, openEditions: () => {}, ready: true, lenis: () => null,
});
export const useShell = () => useContext(Ctx);

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const lenisRef = useRef<Lenis | null>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const [edition, setEditionState] = useState(DEFAULT_EDITION);
  const [dialOpen, setDialOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [needsLoader, setNeedsLoader] = useState<boolean | null>(null);

  /* ---- boot: edition, sound, first-visit dial ---- */
  useEffect(() => {
    initSound();
    const d = document.documentElement;
    setEditionState(d.getAttribute("data-edition") || DEFAULT_EDITION);
    const first = d.hasAttribute("data-first-visit");
    const loaded = d.hasAttribute("data-loaded");
    const params = new URLSearchParams(window.location.search);
    if (first || params.has("editions")) setDialOpen(true);
    setNeedsLoader(!loaded && !first && !params.has("editions"));
    if (loaded || first) setReady(true);
    if (!window.matchMedia("(pointer: fine)").matches) d.classList.add("touch");
  }, []);

  /* ---- smooth scroll (Lenis) driving GSAP's ticker ---- */
  useEffect(() => {
    if (document.documentElement.classList.contains("reduced")) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(raf); lenis.destroy(); lenisRef.current = null; };
  }, []);

  /* ---- pause scrolling while the dial is open ---- */
  useEffect(() => {
    if (dialOpen) lenisRef.current?.stop(); else lenisRef.current?.start();
    document.documentElement.style.overflow = dialOpen ? "hidden" : "";
  }, [dialOpen]);

  /* ---- per-route animations ---- */
  useEffect(() => {
    if (!ready || !mainRef.current) return;
    const kill = initMotion(mainRef.current);
    // anchor on arrival (e.g. /#work)
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) setTimeout(() => lenisRef.current ? lenisRef.current.scrollTo(el as HTMLElement, { offset: -40, immediate: true }) : el.scrollIntoView(), 60);
    }
    return kill;
  }, [pathname, ready]);

  /* ---- curtain transition for internal links ---- */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download") || a.hasAttribute("data-no-curtain")) return;
      const href = a.getAttribute("href") || "";
      if (!href.startsWith("/") && !href.startsWith(BASE + "/")) return;
      const url = new URL(a.href);
      if (url.origin !== window.location.origin) return;
      const rel = url.pathname.replace(BASE, "") || "/";
      const same = rel === pathname || rel === pathname + "/" || rel + "/" === pathname;
      e.preventDefault();
      if (same && url.hash) {
        const el = document.querySelector(url.hash);
        if (el) lenisRef.current ? lenisRef.current.scrollTo(el as HTMLElement, { offset: -40 }) : el.scrollIntoView({ behavior: "smooth" });
        return;
      }
      if (same) { lenisRef.current?.scrollTo(0); return; }
      tick(600, 0.05);
      const c = curtainRef.current;
      if (!c || document.documentElement.classList.contains("reduced")) { router.push(rel + url.hash); return; }
      gsap.timeline()
        .set(c, { display: "flex" })
        .fromTo(c, { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 0.7, ease: "expo.inOut" })
        .fromTo(c.querySelector("[data-curtain-label]"), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, "-=0.3")
        .add(() => {
          router.push(rel + url.hash);
          if (!url.hash) { lenisRef.current?.scrollTo(0, { immediate: true }); window.scrollTo(0, 0); }
        })
        .to(c, { clipPath: "inset(0 0 100% 0)", duration: 0.8, ease: "expo.inOut", delay: 0.35 })
        .set(c, { display: "none" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname, router]);

  const setEdition = useCallback((id: string) => {
    document.documentElement.setAttribute("data-edition", id);
    document.documentElement.removeAttribute("data-first-visit");
    try { localStorage.setItem(STORE_KEY, id); } catch {}
    setEditionState(id);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);

  const onLoaderDone = useCallback(() => {
    try { sessionStorage.setItem("zm-loaded", "1"); } catch {}
    document.documentElement.setAttribute("data-loaded", "");
    setReady(true);
  }, []);

  const closeDial = useCallback(() => {
    setDialOpen(false);
    try { sessionStorage.setItem("zm-loaded", "1"); } catch {}
    document.documentElement.setAttribute("data-loaded", "");
    setReady(true);
  }, []);

  return (
    <Ctx.Provider value={{ edition, setEdition, openEditions: () => setDialOpen(true), ready, lenis: () => lenisRef.current }}>
      <div className="grain" aria-hidden="true" />
      <Cursor />
      {needsLoader && !ready && <Preloader onDone={onLoaderDone} />}
      <div ref={mainRef} className={s.page} data-ready={ready ? "" : undefined}>
        {children}
      </div>
      <div ref={curtainRef} className={s.curtain} aria-hidden="true">
        <span data-curtain-label className={s.curtainLabel}>Turning the page</span>
      </div>
      {dialOpen && <EditionDial current={edition} onChoose={setEdition} onClose={closeDial} />}
    </Ctx.Provider>
  );
}

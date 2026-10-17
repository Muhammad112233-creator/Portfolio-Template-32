"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/motion";
import { EDITIONS } from "@/lib/editions";
import { person } from "@/data/site";
import { setSound, soundOn, tick, thunk } from "@/lib/sound";
import d from "./dial.module.css";

const N = EDITIONS.length;
const STEP = 360 / N;
const mod = (n: number, m: number) => ((n % m) + m) % m;

function Icon({ name }: { name: string }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "card": return <g {...p}><rect x="-13" y="-9" width="26" height="18" rx="1.5" /><path d="M-8 -3h10M-8 2h16M-8 6h7" /><circle cx="0" cy="11" r="1" /></g>;
    case "moon": return <g {...p}><path d="M5 -11a11 11 0 1 0 6 18a9 9 0 1 1 -6 -18z" /><path d="M-9 -9l1 2l2 1l-2 1l-1 2l-1 -2l-2 -1l2 -1z" /></g>;
    case "paper": return <g {...p}><rect x="-12" y="-11" width="24" height="22" /><path d="M-8 -6h16M-8 -1h7M-8 3h7M-8 7h7M3 -1h5v8h-5z" /></g>;
    case "prompt": return <g {...p}><rect x="-13" y="-10" width="26" height="20" rx="2" /><path d="M-8 -3l4 3l-4 3M0 4h7" /></g>;
    case "grid": return <g {...p}><path d="M-12 -12h24v24h-24zM-12 0h24M0 -12v24" /><circle cx="0" cy="0" r="6" /></g>;
    default: return <g {...p}><path d="M-10 10c3 -1 4 -4 4 -6l12 -14l4 4l-14 12c-2 0 -5 1 -6 4z" /><path d="M2 -6l4 4" /></g>;
  }
}

export default function EditionDial({ current, onChoose, onClose }: {
  current: string; onChoose: (id: string) => void; onClose: () => void;
}) {
  const startIndex = Math.max(0, EDITIONS.findIndex((e) => e.id === current));
  const [index, setIndex] = useState(startIndex);
  const [rot, setRot] = useState(-startIndex * STEP);
  const [snd, setSnd] = useState(false);
  const [dragging, setDragging] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const rotRef = useRef(rot);
  const drag = useRef<{ a0: number; r0: number; last: number; moved: boolean } | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const leaving = useRef(false);

  useEffect(() => { setSnd(soundOn()); }, []);
  useEffect(() => { rotRef.current = rot; }, [rot]);

  /* entrance */
  useEffect(() => {
    const el = root.current!;
    const tl = gsap.timeline();
    tl.from(el, { opacity: 0, duration: 0.5 })
      .from(el.querySelector("[data-disc]"), { rotate: -120, scale: 0.85, opacity: 0, duration: 1.4, ease: "expo.out", transformOrigin: "50% 50%" }, 0.1)
      .from(el.querySelectorAll("[data-in]"), { y: 18, opacity: 0, stagger: 0.07, duration: 0.8, ease: "expo.out" }, 0.25);
    return () => { tl.kill(); };
  }, []);

  /* title swap animation when selection changes */
  useEffect(() => {
    if (!titleRef.current) return;
    gsap.fromTo(titleRef.current, { yPercent: 35, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, ease: "expo.out" });
  }, [index]);

  const go = useCallback((next: number) => {
    const cur = mod(Math.round(-rotRef.current / STEP), N);
    let diff = mod(next, N) - cur;
    if (diff > N / 2) diff -= N;
    if (diff < -N / 2) diff += N;
    const r = Math.round(rotRef.current / STEP) * STEP - diff * STEP;
    setRot(r); setIndex(mod(next, N)); tick();
  }, []);

  const enter = useCallback(() => {
    if (leaving.current) return;
    leaving.current = true;
    thunk();
    const ed = EDITIONS[index];
    const el = root.current!;
    gsap.timeline()
      .to(el.querySelector("[data-hub]"), { scale: 0.9, duration: 0.12, yoyo: true, repeat: 1 })
      .add(() => onChoose(ed.id))
      .to(el, { clipPath: "circle(0% at 50% 62%)", duration: 0.9, ease: "expo.inOut" }, "+=0.05")
      .add(onClose);
  }, [index, onChoose, onClose]);

  const random = useCallback(() => {
    let n = index;
    while (n === index) n = Math.floor(Math.random() * N);
    const spins = 360 * (1 + Math.floor(Math.random() * 2));
    const base = rotRef.current - spins;
    const target = base - (n - index) * STEP;
    setRot(target); setIndex(n);
    for (let i = 0; i < 8; i++) setTimeout(() => tick(1200 + i * 60), i * 70);
  }, [index]);

  /* keyboard */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); go(index + 1); }
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); go(index - 1); }
      else if (e.key === "Enter") { e.preventDefault(); enter(); }
      else if (e.key.toLowerCase() === "r") random();
      else if (e.key === "Escape") enter();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go, enter, random]);

  /* dragging the disc */
  const angleAt = (e: React.PointerEvent) => {
    const r = svgRef.current!.getBoundingClientRect();
    return (Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180) / Math.PI;
  };
  const onDown = (e: React.PointerEvent) => {
    if ((e.target as Element).closest("[data-hub]")) return;
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    drag.current = { a0: angleAt(e), r0: rotRef.current, last: mod(Math.round(-rotRef.current / STEP), N), moved: false };
    setDragging(true);
  };
  const onMove = (e: React.PointerEvent) => {
    const g = drag.current; if (!g) return;
    let delta = angleAt(e) - g.a0;
    delta = ((delta + 180) % 360 + 360) % 360 - 180;
    if (Math.abs(delta) > 2) g.moved = true;
    const r = g.r0 + delta;
    g.a0 = angleAt(e); g.r0 = r;
    setRot(r);
    const i = mod(Math.round(-r / STEP), N);
    if (i !== g.last) { g.last = i; setIndex(i); tick(); }
  };
  const onUp = () => {
    const g = drag.current; drag.current = null; setDragging(false);
    if (!g) return;
    const snapped = Math.round(rotRef.current / STEP) * STEP;
    setRot(snapped); setIndex(mod(Math.round(-snapped / STEP), N));
  };

  const ed = EDITIONS[index];

  return (
    <div
      ref={root}
      className={d.root}
      role="dialog"
      aria-modal="true"
      aria-label={`${person.name}: choose an edition`}
      style={{ ["--ed-bg" as string]: ed.bg, ["--ed-glow" as string]: ed.glow }}
    >
      <div className={d.backdrop} aria-hidden="true" />

      <header className={d.head}>
        <div className={d.intro} data-in>
          <span className={d.brand}><span className={d.brandDot} />{person.name}</span>
          <p>{person.role} in {person.city}. One portfolio, printed in {N} editions. Turn the dial to pick one, then press the label in the middle.</p>
        </div>
        <div className={d.tools} data-in>
          <button type="button" className={d.tool} onClick={random} aria-label="Pick a random edition">
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3" /><circle cx="8" cy="8" r="1.4" /><circle cx="16" cy="16" r="1.4" /><circle cx="12" cy="12" r="1.4" /></svg>
            <span>Random</span>
          </button>
          <button type="button" className={d.tool} aria-pressed={snd} onClick={() => { setSound(!snd); setSnd(!snd); }}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" />{snd ? <path d="M16 8a5 5 0 0 1 0 8M18.5 5.5a8.5 8.5 0 0 1 0 13" /> : <path d="M16 9l5 6M21 9l-5 6" />}</svg>
            <span>{snd ? "Sound on" : "Sound off"}</span>
          </button>
          <p className={d.keys}>drag the dial or ← → to turn · ↵ enter · r for random</p>
        </div>
      </header>

      <div className={d.titleBlock} aria-live="polite">
        <span className={d.count} data-in>Edition {String(index + 1).padStart(2, "0")} of {String(N).padStart(2, "0")}</span>
        <h2 ref={titleRef} className={d.title}>{ed.name}</h2>
        <p className={d.tagline} data-in>{ed.tagline}</p>
      </div>

      <div className={d.stage}>
        <div className={d.arrows} data-in>
          <button type="button" className={d.arrow} onClick={() => go(index - 1)} aria-label="Previous edition">‹</button>
          <span className={d.hint}>↻ drag to spin</span>
          <button type="button" className={d.arrow} onClick={() => go(index + 1)} aria-label="Next edition">›</button>
        </div>

        <svg
          ref={svgRef}
          className={d.dial}
          data-dragging={dragging ? "" : undefined}
          viewBox="-210 -210 420 420"
          onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}
        >
          <defs>
            <radialGradient id="discFill" cx="40%" cy="30%" r="80%">
              <stop offset="0" stopColor="#3a3530" />
              <stop offset="0.6" stopColor="#1c1916" />
              <stop offset="1" stopColor="#0e0c0b" />
            </radialGradient>
            <radialGradient id="hubFill" cx="40%" cy="35%" r="70%">
              <stop offset="0" stopColor="#fbf7ee" />
              <stop offset="1" stopColor="#d8cfbe" />
            </radialGradient>
          </defs>

          {/* fixed outer bezel with tick marks */}
          <circle r="204" className={d.bezel} />
          {Array.from({ length: 120 }).map((_, i) => (
            <line key={i} x1="0" y1={-200} x2="0" y2={i % 5 === 0 ? -191 : -195} className={d.tickMark} transform={`rotate(${i * 3})`} />
          ))}

          {/* rotating disc */}
          <g data-disc className={d.disc} style={{ transform: `rotate(${rot}deg)`, transition: dragging ? "none" : undefined }}>
            <circle r="186" fill="url(#discFill)" className={d.discFace} />
            <circle r="182" className={d.discRim} />
            {EDITIONS.map((e, i) => {
              const a = i * STEP - 90;
              const active = i === index;
              return (
                <g key={e.id} transform={`rotate(${a + 90})`}>
                  <g transform="translate(0,-128)">
                    <circle r="44" className={d.hole} data-active={active ? "" : undefined} style={{ ["--glow" as string]: e.glow }} />
                    <circle r="44" className={d.holeRing} />
                    <g className={d.holeIcon} data-active={active ? "" : undefined} style={{ ["--glow" as string]: e.glow }} transform={`rotate(${-(a + 90) - rot})`}>
                      <g transform="translate(0,-6) scale(1.1)"><Icon name={e.icon} /></g>
                      <text y="26" textAnchor="middle" className={d.holeText}>{String(i + 1).padStart(2, "0")}</text>
                    </g>
                  </g>
                </g>
              );
            })}
          </g>

          {/* finger stop / pointer (fixed) */}
          <g className={d.stop}>
            <path d="M0 -206 L9 -186 L-9 -186 Z" />
          </g>

          {/* hub — press to enter */}
          <g data-hub className={d.hub} role="button" tabIndex={0} aria-label={`Enter ${ed.name}`}
             onClick={enter} onKeyDown={(e) => { if (e.key === " ") { e.preventDefault(); enter(); } }}>
            <circle r="70" fill="url(#hubFill)" className={d.hubFace} />
            <circle r="62" className={d.hubRing} />
            {Array.from({ length: 48 }).map((_, i) => (
              <line key={i} x1="0" y1={-66} x2="0" y2={-61} className={d.hubTick} transform={`rotate(${i * 7.5})`} />
            ))}
            <text y="-18" textAnchor="middle" className={d.hubSmall}>{String(index + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}</text>
            <text y="8" textAnchor="middle" className={d.hubBig}>ENTER</text>
            <text y="30" textAnchor="middle" className={d.hubSmall}>↵</text>
          </g>
        </svg>

        <ol className={d.legend} data-in>
          {EDITIONS.map((e, i) => (
            <li key={e.id}>
              <button type="button" data-active={i === index ? "" : undefined} onClick={() => go(i)}>
                <span>{String(i + 1).padStart(2, "0")}</span>{e.name}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

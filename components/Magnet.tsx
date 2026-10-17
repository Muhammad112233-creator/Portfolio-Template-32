"use client";
import Link from "next/link";
import { useRef } from "react";
import { gsap } from "@/lib/motion";

/** A link that leans toward the pointer and springs back when it leaves. */
export default function Magnet({ href, className, children, strength = 0.35 }: {
  href: string; className?: string; children: React.ReactNode; strength?: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const r = ref.current!.getBoundingClientRect();
    gsap.to(ref.current, {
      x: (e.clientX - (r.left + r.width / 2)) * strength,
      y: (e.clientY - (r.top + r.height / 2)) * strength,
      duration: 0.6, ease: "power3.out",
    });
  };
  const leave = () => gsap.to(ref.current, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)" });
  return (
    <Link ref={ref} href={href} className={className} onPointerMove={move} onPointerLeave={leave}>
      {children}
    </Link>
  );
}

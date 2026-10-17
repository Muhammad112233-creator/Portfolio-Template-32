import { person } from "@/data/site";

/** A seal-style monogram: double ring, initials set in the caps face. */
export default function Monogram({ className, size = 36 }: { className?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="0.9" />
      <circle cx="32" cy="32" r="26.5" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1.2 2.2" opacity="0.7" />
      <text x="32" y="38.5" textAnchor="middle" fontSize="17" letterSpacing="1"
        style={{ fontFamily: "var(--f-caps)", fill: "currentColor" }}>{person.initials}</text>
    </svg>
  );
}

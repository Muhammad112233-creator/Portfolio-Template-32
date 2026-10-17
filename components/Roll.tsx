/** Text that rolls upward on hover (the duplicate line slides in from below). */
export default function Roll({ children }: { children: string }) {
  return (
    <span className="roll">
      <span className="roll-inner">
        <span className="roll-line">{children}</span>
        <span className="roll-line" aria-hidden="true">{children}</span>
      </span>
    </span>
  );
}

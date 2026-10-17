import Link from "next/link";
import InnerPage from "@/components/InnerPage";
import Roll from "@/components/Roll";
import p from "@/components/inner.module.css";

export default function NotFound() {
  return (
    <InnerPage board={false}>
      <section className={p.lost}>
        <div className="shell">
          <span className="eyebrow"><span className="eyebrow-rule" />Error 404 · Misfiled</span>
          <h1 className={p.lostTitle}>This card is missing from the drawer.</h1>
          <p className={p.lead}>Someone may have borrowed it. Or it was never written. Either way, the catalogue is a better place to start.</p>
          <div className="cta-row"><Link href="/" className="cta"><Roll>Back to the catalogue</Roll></Link></div>
        </div>
      </section>
    </InnerPage>
  );
}

import type { Metadata } from "next";
import InnerPage from "@/components/InnerPage";
import PageHeader from "@/components/PageHeader";
import { person } from "@/data/site";
import p from "@/components/inner.module.css";

export const metadata: Metadata = { title: "Privacy" };

const items = [
  ["What is collected", "Nothing, unless you write to me. This site sets no cookies, runs no analytics and loads no third-party trackers."],
  ["Stored on your device", "Two small preferences are kept in your browser: the edition you chose and whether sound is on. They never leave your device, and clearing your browser data removes them."],
  ["When you write", `Messages sent through the form or to ${person.email} are read by me alone. I use them to reply to you and for nothing else.`],
  ["How long", "Correspondence is kept for as long as we are working together, and for two years after that. Ask and I will delete it sooner."],
  ["Your rights", "You can ask to see, correct or delete anything I hold about you. Write to the address above and I will reply within two working days."],
];

export default function Privacy() {
  return (
    <InnerPage board={false}>
      <PageHeader eyebrow="Notice" title="Privacy, plainly" lead="A short notice, because there isn't much to tell." />
      <section className={p.body}>
        <div className="shell">
          <ol className={p.privacy}>
            {items.map(([h, t], i) => (
              <li key={h} data-reveal><span className={p.tYear}>§ {i + 1}</span><div><h2>{h}</h2><p>{t}</p></div></li>
            ))}
          </ol>
          <p className={p.updated} data-reveal>Last updated October 2026</p>
        </div>
      </section>
    </InnerPage>
  );
}

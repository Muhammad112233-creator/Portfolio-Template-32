import type { Metadata } from "next";
import InnerPage from "@/components/InnerPage";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import { person } from "@/data/site";
import p from "@/components/inner.module.css";

export const metadata: Metadata = { title: "Contact" };

export default function Contact() {
  return (
    <InnerPage board={false}>
      <PageHeader eyebrow="Correspondence" title="Start a conversation"
        lead="A few lines are enough to begin: what you are making, who it is for, and roughly when you need it."
        aside={<div className={p.cvAside}><a className="ulink" href={`mailto:${person.email}`}>{person.email}</a><span>{person.city}, {person.country}</span><span>{person.reply}</span><span>{person.availability}</span></div>} />
      <section className={p.body}>
        <div className="shell"><ContactForm /></div>
      </section>
    </InnerPage>
  );
}

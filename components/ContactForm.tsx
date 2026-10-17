"use client";
import { useState } from "react";
import { person } from "@/data/site";
import Roll from "./Roll";
import p from "./inner.module.css";

/**
 * Works without a server. Two options:
 *  1. Put a Formspree (or similar) endpoint in FORM_ENDPOINT and messages arrive by email.
 *  2. Leave it empty: the form opens the visitor's email app with everything filled in.
 */
const FORM_ENDPOINT = "";

const budgets = ["Under PKR 300k", "PKR 300k – 800k", "PKR 800k+", "Not sure yet"];

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [budget, setBudget] = useState(budgets[1]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    data.budget = budget;
    if (!FORM_ENDPOINT) {
      const body = `Name: ${data.name}\nEmail: ${data.email}\nOrganisation: ${data.org || "-"}\nBudget: ${data.budget}\n\n${data.message}`;
      window.location.href = `mailto:${person.email}?subject=${encodeURIComponent("New project enquiry")}&body=${encodeURIComponent(body)}`;
      setState("sent");
      return;
    }
    setState("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) });
      setState(res.ok ? "sent" : "error");
      if (res.ok) form.reset();
    } catch { setState("error"); }
  };

  if (state === "sent") {
    return (
      <div className={p.sent} role="status">
        <span className={p.sentStamp}>Received</span>
        <h2>Thank you. Your letter is on my desk.</h2>
        <p>{person.reply}. If it is urgent, write to <a className="ulink" href={`mailto:${person.email}`}>{person.email}</a>.</p>
        <button type="button" className="cta cta-ghost" onClick={() => setState("idle")}><Roll>Write another</Roll></button>
      </div>
    );
  }

  return (
    <form className={p.form} onSubmit={submit} noValidate>
      <div className={p.formGrid}>
        <label className={p.field} data-reveal>
          <span>Your name</span>
          <input name="name" required autoComplete="name" placeholder="Ayesha Khan" />
        </label>
        <label className={p.field} data-reveal>
          <span>Email</span>
          <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" />
        </label>
        <label className={`${p.field} ${p.fieldWide}`} data-reveal>
          <span>Organisation <em>(optional)</em></span>
          <input name="org" autoComplete="organization" placeholder="Studio, restaurant, school…" />
        </label>
        <fieldset className={`${p.field} ${p.fieldWide}`} data-reveal>
          <span>Budget</span>
          <div className={p.chips}>
            {budgets.map((b) => (
              <button type="button" key={b} aria-pressed={budget === b} onClick={() => setBudget(b)}>{b}</button>
            ))}
          </div>
        </fieldset>
        <label className={`${p.field} ${p.fieldWide}`} data-reveal>
          <span>What are you making?</span>
          <textarea name="message" required rows={6} placeholder="A few lines about the project, the audience and the timing." />
        </label>
      </div>
      <div className={p.formFoot} data-reveal>
        <button type="submit" className="cta" disabled={state === "sending"}><Roll>{state === "sending" ? "Sending…" : "Send the letter"}</Roll></button>
        <p>{state === "error" ? "Something went wrong. Please email me directly." : "No newsletters, no tracking. Your message goes to one inbox."}</p>
      </div>
    </form>
  );
}

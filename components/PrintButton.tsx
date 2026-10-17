"use client";
import Roll from "./Roll";
export default function PrintButton() {
  return <button type="button" className="cta cta-ghost no-print" onClick={() => window.print()}><Roll>Print or save as PDF</Roll></button>;
}

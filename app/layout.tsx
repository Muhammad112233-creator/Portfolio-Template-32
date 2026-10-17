import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontVars } from "./fonts";
import SiteShell from "@/components/SiteShell";
import { person } from "@/data/site";
import { STORE_KEY, DEFAULT_EDITION } from "@/lib/editions";

export const metadata: Metadata = {
  title: { default: `${person.name} · Drawn by hand, built in code`, template: `%s · ${person.name}` },
  description: `${person.name}: ${person.role.toLowerCase()} in ${person.city}. ${person.line}.`,
  openGraph: { title: person.name, description: person.line, type: "website" },
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/favicon.svg` },
};

export const viewport: Viewport = { themeColor: "#efe8da", width: "device-width", initialScale: 1 };

/* Runs before paint: applies the saved edition and flags JS, so nothing flashes. */
const boot = `(function(){try{var d=document.documentElement;d.classList.add('js');var e=localStorage.getItem('${STORE_KEY}');d.setAttribute('data-edition',e||'${DEFAULT_EDITION}');if(!e)d.setAttribute('data-first-visit','');if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('reduced');if(sessionStorage.getItem('zm-loaded'))d.setAttribute('data-loaded','');}catch(_){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={fontVars} data-edition={DEFAULT_EDITION} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}

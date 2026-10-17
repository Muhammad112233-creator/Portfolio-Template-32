import {
  Cormorant_Garamond, Cinzel, EB_Garamond, IBM_Plex_Mono,
  Bodoni_Moda, Anton, Source_Serif_4, JetBrains_Mono, Space_Grotesk, Fraunces, Karla,
} from "next/font/google";

/* The Archive (default edition) — preloaded */
export const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-cormorant", display: "swap" });
export const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-cinzel", display: "swap" });
export const ebg = EB_Garamond({ subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"], variable: "--font-ebg", display: "swap" });
export const plex = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex", display: "swap" });

/* Other editions — loaded on demand */
export const bodoni = Bodoni_Moda({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-bodoni", display: "swap", preload: false });
export const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton", display: "swap", preload: false });
export const sourceSerif = Source_Serif_4({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-sourceserif", display: "swap", preload: false });
export const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains", display: "swap", preload: false });
export const grotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-grotesk", display: "swap", preload: false });
export const fraunces = Fraunces({ subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"], variable: "--font-fraunces", display: "swap", preload: false });
export const karla = Karla({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-karla", display: "swap", preload: false });

export const fontVars = [cormorant, cinzel, ebg, plex, bodoni, anton, sourceSerif, jetbrains, grotesk, fraunces, karla]
  .map((f) => f.variable)
  .join(" ");

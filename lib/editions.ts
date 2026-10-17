export type Edition = {
  id: string;
  name: string;
  tagline: string;
  icon: "card" | "moon" | "paper" | "prompt" | "grid" | "brush";
  /** colours used on the dial preview */
  bg: string;
  glow: string;
};

export const EDITIONS: Edition[] = [
  { id: "archive",    name: "The Archive",   tagline: "Cream stock, oxblood ink. The house style.", icon: "card",   bg: "#1b1714", glow: "#7b2323" },
  { id: "midnight",   name: "Midnight",      tagline: "Gold leaf on deep ink. For late readers.",   icon: "moon",   bg: "#0c1430", glow: "#c9a45a" },
  { id: "broadsheet", name: "Broadsheet",    tagline: "Hot metal headlines. Read all about it.",    icon: "paper",  bg: "#151515", glow: "#d4231b" },
  { id: "terminal",   name: "Terminal",      tagline: "Phosphor green, blinking cursor, no mouse.", icon: "prompt", bg: "#050a06", glow: "#3cff7a" },
  { id: "blueprint",  name: "Blueprint",     tagline: "White line on cyanotype. Measured twice.",   icon: "grid",   bg: "#0d2c5c", glow: "#9fd0ff" },
  { id: "atelier",    name: "Atelier",       tagline: "Terracotta, sage and soft clay light.",      icon: "brush",  bg: "#2a1a12", glow: "#d07a4e" },
];

export const DEFAULT_EDITION = "archive";
export const STORE_KEY = "zm-edition";

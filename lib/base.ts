/** Prefix a public asset with the deploy sub-folder (GitHub Pages). */
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const asset = (p: string) => `${BASE}${p}`;

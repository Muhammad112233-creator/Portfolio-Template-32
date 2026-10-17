/* Tiny Web Audio click synth — no audio files needed. */
let ctx: AudioContext | null = null;
let enabled = false;

export const soundOn = () => enabled;
export function setSound(on: boolean) {
  enabled = on;
  try { localStorage.setItem("zm-sound", on ? "1" : "0"); } catch {}
  if (on) tick(880, 0.05);
}
export function initSound() {
  try { enabled = localStorage.getItem("zm-sound") === "1"; } catch {}
}

export function tick(freq = 1400, dur = 0.025, gain = 0.06) {
  if (!enabled || typeof window === "undefined") return;
  try {
    ctx = ctx || new (window.AudioContext || (window as any).webkitAudioContext)();
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "triangle";
    o.frequency.setValueAtTime(freq, t);
    o.frequency.exponentialRampToValueAtTime(freq * 0.5, t + dur);
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(ctx.destination);
    o.start(t);
    o.stop(t + dur + 0.01);
  } catch {}
}

export const thunk = () => { tick(220, 0.14, 0.12); setTimeout(() => tick(660, 0.06, 0.05), 60); };

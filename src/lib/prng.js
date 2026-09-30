// Deterministic string hash (Java-style). Every step is coerced to a 32-bit
// int via `|= 0`, so unlike naive LCGs this can't silently lose precision.
export function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// Small, overflow-safe PRNG (mulberry32) for deterministic mock data.
// Uses Math.imul so every multiplication stays true 32-bit integer math —
// plain `a * b` on two ~31-bit numbers loses precision above
// Number.MAX_SAFE_INTEGER and can settle into a fixed point, repeating the
// same value forever (this bit us once, in the seat-map generator).
export function mulberry32(seed) {
  let t = seed;
  return function next() {
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

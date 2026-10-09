const FLAG_KEY = "bazardor_hasVisited";

export function markVisited() {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(FLAG_KEY, "1");
  } catch {}
}

export function hasVisited(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(FLAG_KEY) === "1";
  } catch {
    return false;
  }
}

export function clearVisited() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(FLAG_KEY);
  } catch {}
}
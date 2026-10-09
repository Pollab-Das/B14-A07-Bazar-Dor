const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBn(n: number | string): string {
  return String(n).replace(/\d/g, (d) => bnDigits[Number(d)]);
}

export function formatTaka(n: number): string {
  const withComma = n.toLocaleString("en-IN");
  return toBn(withComma);
}

export function formatPct(pct: number): string {
  const sign = pct > 0 ? "+" : pct < 0 ? "-" : "";
  return `${sign}${toBn(Math.abs(pct).toFixed(1))}%`;
}

export function unitLabel(unit: string): string {
  switch (unit) {
    case "kg":
      return "প্রতি কেজি";
    case "litre":
      return "প্রতি লিটার";
    case "dozen":
      return "প্রতি ডজন";
    case "piece":
      return "প্রতি পিস";
    default:
      return `প্রতি ${unit}`;
  }
}

export function todayBn(): string {
  const d = new Date();
  const days = [
    "রবিবার",
    "সোমবার",
    "মঙ্গলবার",
    "বুধবার",
    "বৃহস্পতিবার",
    "শুক্রবার",
    "শনিবার",
  ];
  const months = [
    "জানুয়ারি",
    "ফেব্রুয়ারি",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
  ];
  return `${days[d.getDay()]}, ${toBn(d.getDate())} ${months[d.getMonth()]}, ${toBn(
    d.getFullYear()
  )}`;
}
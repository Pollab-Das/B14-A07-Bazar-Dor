import Link from "next/link";
import type { Product } from "@/types/bazardor";
import { formatTaka, formatPct, unitLabel } from "@/lib/format";

export default function ProductCard({ p }: { p: Product }) {
  const dirClass =
    p.change.dir === "up"
      ? "text-red-600 bg-red-50"
      : p.change.dir === "down"
      ? "text-green-600 bg-green-50"
      : "text-gray-600 bg-gray-100";

  const arrow =
    p.change.dir === "up" ? "▲" : p.change.dir === "down" ? "▼" : "—";

  return (
    <Link
      href={`/product/${p.id}`}
      className="block bg-white rounded-2xl border border-gray-200 p-4 hover:shadow-md hover:-translate-y-0.5 transition"
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl bg-gray-50 grid place-items-center text-2xl shrink-0">
          {p.image}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-gray-900 truncate">
            {p.nameBn}
          </div>
          <div className="text-xs text-gray-500">{unitLabel(p.unit)}</div>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <div className="text-xs text-gray-500 mb-0.5">আজকের দাম</div>
          <div className="text-xl font-bold text-gray-900">
            {formatTaka(p.today)} টাকা
          </div>
        </div>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${dirClass}`}
        >
          {arrow} {formatPct(p.change.pct)}
        </span>
      </div>
    </Link>
  );
}
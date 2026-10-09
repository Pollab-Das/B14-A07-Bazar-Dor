"use client";

import type { Product } from "@/types/bazardor";
import { formatTaka, formatPct, unitLabel } from "@/lib/format";

export default function PriceTicker({ items }: { items: Product[] }) {
  if (!items.length) {
    return <div className="h-10 bg-white border-b border-gray-200" />;
  }

  const loop = [...items, ...items];

  return (
    <div className="bg-white border-b border-gray-200 overflow-hidden">
      <div className="flex animate-ticker gap-6 py-2 whitespace-nowrap w-max">
        {loop.map((p, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <span>{p.image}</span>
            <span className="font-medium text-gray-900">{p.nameBn}</span>
            <span className="text-gray-700">
              {formatTaka(p.today)} টাকা / {unitLabel(p.unit)}
            </span>
            <span
              className={
                p.change.dir === "up"
                  ? "text-red-600 font-semibold"
                  : p.change.dir === "down"
                  ? "text-green-600 font-semibold"
                  : "text-gray-500 font-semibold"
              }
            >
              {p.change.dir === "up"
                ? "▲"
                : p.change.dir === "down"
                ? "▼"
                : "—"}
              {formatPct(p.change.pct)}
            </span>
            <span className="text-gray-300">|</span>
          </div>
        ))}
      </div>
    </div>
  );
}
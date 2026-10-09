"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/shared/ProductCard";
import SortDropdown, { type SortKey } from "./SortDropdown";
import type { Product } from "@/types/bazardor";
import { toBn } from "@/lib/format";

export default function CategoryClient({
  category,
  products,
}: {
  category: { slug: string; nameBn: string; icon: string };
  products: Product[];
}) {
  const [sort, setSort] = useState<SortKey>("default");

  const sorted = useMemo(() => {
    if (sort === "default") return products;
    const copy = [...products];
    copy.sort((a, b) =>
      sort === "price-asc" ? a.today - b.today : b.today - a.today
    );
    return copy;
  }, [products, sort]);

  return (
    <>
      {/* Header card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-5 flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gray-50 grid place-items-center text-2xl">
          {category.icon}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {category.nameBn}
          </h1>
          <p className="text-gray-500 text-sm">
            এই পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      {/* Sort bar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-5 flex justify-between items-center flex-wrap gap-3">
        <span className="text-sm text-gray-600">
          মোট {toBn(products.length)} টি পণ্য দেখানো হচ্ছে
        </span>
        <SortDropdown value={sort} onChange={setSort} />
      </div>

      {/* Grid */}
      {sorted.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <div className="text-5xl mb-3">🔍</div>
          <h2 className="font-bold text-xl mb-1 text-gray-900">
            কোনো পণ্য পাওয়া যায়নি
          </h2>
          <p className="text-gray-500 mb-5">
            এই ক্যাটাগরিতে এখনো কোনো পণ্য যোগ করা হয়নি।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sorted.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      )}
    </>
  );
}
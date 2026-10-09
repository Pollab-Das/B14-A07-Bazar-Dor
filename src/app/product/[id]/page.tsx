import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { api } from "@/lib/api";
import { formatTaka, unitLabel, toBn } from "@/lib/format";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 🔒 Protected — লগইন ছাড়া /signin এ redirect
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect(`/signin?next=/product/${id}`);
  }

  // API থেকে product details আনো
  let product;
  try {
    product = await api.getProductById(id);
  } catch {
    notFound();
  }

  // দাম হিসাব
  const mins = product.markets.map((m) => m.min);
  const maxs = product.markets.map((m) => m.max);
  const minPrice = Math.min(...mins);
  const maxPrice = Math.max(...maxs);
  const avgPrice = Math.round(mins.reduce((a, b) => a + b, 0) / mins.length);

  const arrow =
    product.change.dir === "up" ? "▲" : product.change.dir === "down" ? "▼" : "—";

  const changeClass =
    product.change.dir === "up"
      ? "text-red-600"
      : product.change.dir === "down"
      ? "text-green-600"
      : "text-gray-500";

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500">
        হোম / {product.categoryNameBn} / {product.nameBn}
      </div>

      {/* Summary card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-gray-50 grid place-items-center text-4xl shrink-0">
            {product.image}
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {product.nameBn}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {unitLabel(product.unit)} · {product.categoryNameBn}
            </p>
            <div className="mt-2">
              <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
                {product.categoryIcon} {product.categoryNameBn}
              </span>
            </div>
          </div>
        </div>

        {/* Price box */}
        <div className="bg-gray-50 rounded-xl p-4 text-center min-w-[170px] w-full md:w-auto">
          <div className="text-xs text-gray-500 mb-1">আজকের দাম</div>
          <div className="text-3xl font-bold text-gray-900">
            {formatTaka(product.today)}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            টাকা / {product.unit}
          </div>
          <div className={`mt-2 text-sm font-semibold ${changeClass}`}>
            {arrow} {toBn(Math.abs(product.change.pct).toFixed(1))}%
          </div>
        </div>
      </div>

      {/* ✅ দামের সারসংক্ষেপ + বাজারভিত্তিক আজকের দাম — একটা box এ */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        {/* দামের সারসংক্ষেপ heading */}
        <h2 className="font-bold text-lg mb-4 text-gray-900">
          দামের সারসংক্ষেপ
        </h2>

        {/* 3 Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <SummaryCard
            label="সর্বনিম্ন দাম"
            value={formatTaka(minPrice)}
            sub="সবচেয়ে কম দামের বাজার"
            color="text-green-600"
          />
          <SummaryCard
            label="সর্বোচ্চ দাম"
            value={formatTaka(maxPrice)}
            sub="সবচেয়ে বেশি দামের বাজার"
            color="text-red-600"
          />
          <SummaryCard
            label="গড় দাম"
            value={formatTaka(avgPrice)}
            sub={`${unitLabel(product.unit)}-এর হিসাব`}
            color="text-gray-900"
          />
        </div>

        {/* বাজারভিত্তিক আজকের দাম heading */}
        <h3 className="font-bold text-base mb-4 text-gray-900">
          বাজারভিত্তিক আজকের দাম
        </h3>

        {/* Table */}
        <div className="rounded-xl border border-gray-300 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="py-3 px-5 font-medium border-b border-gray-300">
                    বাজার
                  </th>
                  <th className="py-3 px-5 font-medium border-b border-gray-300">
                    বিভাগ
                  </th>
                  <th className="py-3 px-5 font-medium text-right border-b border-gray-300">
                    সর্বনিম্ন
                  </th>
                  <th className="py-3 px-5 font-medium text-right border-b border-gray-300">
                    সর্বোচ্চ
                  </th>
                  <th className="py-3 px-5 font-medium text-right border-b border-gray-300">
                    গড়
                  </th>
                </tr>
              </thead>
              <tbody>
                {product.markets.map((m, i) => (
                  <tr
                    key={i}
                    className={`${
                      i % 2 === 1 ? "bg-[#F0F5F0]" : "bg-white"
                    } ${
                      i !== product.markets.length - 1
                        ? "border-b border-gray-900"
                        : ""
                    }`}
                  >
                    <td className="py-3 px-5 font-medium text-gray-900">
                      {m.market}
                    </td>
                    <td className="py-3 px-5 text-gray-600">
                      {m.division}
                    </td>
                    <td className="py-3 px-5 text-right text-gray-900">
                      {toBn(m.min)} টাকা
                    </td>
                    <td className="py-3 px-5 text-right text-gray-900">
                      {toBn(m.max)} টাকা
                    </td>
                    <td className="py-3 px-5 text-right font-semibold text-gray-900">
                      {toBn(Math.round((m.min + m.max) / 2))} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: string;
  sub: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5">
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className={`text-2xl font-bold ${color}`}>{value} টাকা</div>
      <div className="text-xs text-gray-400 mt-1">{sub}</div>
    </div>
  );
}